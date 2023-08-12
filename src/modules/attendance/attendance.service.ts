import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Between, Equal, LessThanOrEqual, Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import { endOfDay, startOfDay } from 'date-fns';
import { CourseStudentsService } from '../course-students/course-students.service';
import { CreateQrDto } from './dto/create-qr.dto';
import { CreateAttendanceForStudentDto } from './dto/create-attendance-student.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AttendanceService {
  @Inject(CourseStudentsService)
  private readonly courseStudentService: CourseStudentsService

  @Inject(AuthService)
  private readonly authService: AuthService
  
  constructor(@InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepository.save(createAttendanceDto);
  }

  async createQr(dto: CreateQrDto) {
    return this.authService.createJwt(dto);
  }

  async createForStudent(studentId: number, createAttendanceDto: CreateAttendanceForStudentDto) {
    const data = await this.authService.validateJwt(createAttendanceDto.qr);    
    const courses = await this.courseStudentService.findByStudentAndCourse(studentId, data.courseId);
    if (courses.length > 0) {
      return this.attendanceRepository.save({
        attendanceDate: data.attendanceDate,
        courseId: data.courseId,
        lesson: data.lessonId,
        studentId: studentId
      });
    }
    else {
      throw new HttpException({ message: [EErrors.NO_COURSE_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    const attendance = await this.attendanceRepository.findOne({ where: { id }, relations: ["course", "student"] });
    if (attendance) {
      return attendance;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findByDate(date: any, courseId: number) {
    const attendances = await this.attendanceRepository.find({ where: { attendanceDate: Between(startOfDay(date).toISOString(), endOfDay(date).toISOString()), courseId: courseId }, relations: ["course", "student"] });
    if (attendances.length > 0) {
      return attendances;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findByStudent(student: number, courseId: number) {
    const attendances = await this.attendanceRepository.find({ where: { studentId: student, courseId: courseId }, relations: ["course", "student"] });
    if (attendances.length > 0) {
      return attendances;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findByStudentForStudent(studentId: number) {
    const attendances = await this.attendanceRepository.find({ where: { studentId }, relations: ["lesson", "course", "course.danceType", "course.danceLevel"] });

    if (attendances.length > 0) {
      return attendances;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateAttendanceDto: UpdateAttendanceDto) {
    const lesson = await this.findOne(updateAttendanceDto.id);
    const updated = Object.assign(lesson, updateAttendanceDto);
    delete updated.id;
    return this.attendanceRepository.update(updateAttendanceDto.id, updated);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    return this.attendanceRepository.remove(lesson);
  }
}

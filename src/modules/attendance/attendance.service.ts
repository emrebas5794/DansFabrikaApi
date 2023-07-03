import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Between, Equal, LessThanOrEqual, Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import { endOfDay, startOfDay } from 'date-fns';
import { groupBy } from 'rxjs';
import { CourseService } from '../course/course.service';
import { CourseStudentsService } from '../course-students/course-students.service';

@Injectable()
export class AttendanceService {
  @Inject(CourseStudentsService)
  private readonly courseStudentService: CourseStudentsService
  
  constructor(@InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepository.save(createAttendanceDto);
  }

  async createForStudent(studentId: number, createAttendanceDto: CreateAttendanceDto) {
    if (studentId !== createAttendanceDto.studentId) { throw new ForbiddenException(); }
    const courses = await this.courseStudentService.findByStudentAndCourse(studentId, createAttendanceDto.courseId);
    if (courses.length > 0) {
      return this.attendanceRepository.save(createAttendanceDto);
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

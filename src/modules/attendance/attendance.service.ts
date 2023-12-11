import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Between, Equal, LessThanOrEqual, Repository } from 'typeorm';
import { EErrors, getCourseTypeName } from 'src/common/enums';
import { endOfDay, startOfDay } from 'date-fns';
import { CourseStudentsService } from '../course-students/course-students.service';
import { CreateQrDto } from './dto/create-qr.dto';
import { CreateAttendanceForStudentDto } from './dto/create-attendance-student.dto';
import { AuthService } from 'src/auth/auth.service';
import { IsTheStudentOwnerOfTheCourse } from './dto/IsTheStudentOwnerOfTheCourse';
import { Sales } from '../sales/entities/sales.entity';

@Injectable()
export class AttendanceService {
  @Inject(CourseStudentsService)
  private readonly courseStudentService: CourseStudentsService

  @Inject(AuthService)
  private readonly authService: AuthService
  
  constructor(@InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>, @InjectRepository(Sales) private salesRepository: Repository<Sales>) {}

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


  async isTheStudentOwnerOfTheCourse (isTheStudentOwnerOfTheCourseDto: IsTheStudentOwnerOfTheCourse) {
   try {

    const studentId = isTheStudentOwnerOfTheCourseDto.studentId
    const courseId = isTheStudentOwnerOfTheCourseDto.courseId
    const invoice = await this.salesRepository.findOne({
      where : {
        studentId: studentId,
        courseId: courseId
      },
      relations: ['student', 'course', 'packages']
    })
    // console.log(getCourseTypeName(invoice.course.courseType))
    // if the invoice if for a workshop means the student wants to enter a workshop
    // so get the count of invoices that the user has for this particular workshop
    // and get the count of times that the user has attended the workshop 
    // if the attendanceCount is smaller of equal to the boughtTimes then 
    // then the user can attend again.
    if(!invoice){return new HttpException('no such invoice' , HttpStatus.BAD_REQUEST) }
    if(getCourseTypeName(invoice?.course?.courseType) == 'Workshop'){
      console.log('it is workshop')
      const theWorshopBought = await this.salesRepository.find({
        where : {
          courseId: courseId
        }
      })

    const theWorshopBuyCount = theWorshopBought?.length

      const attendanceToTheWorkshop = await this.attendanceRepository.find({
        where: {
          studentId: studentId
        }
      })

      const attendanceToTheWorkshopCount = attendanceToTheWorkshop?.length

      console.log('theWorshopBuyCount', theWorshopBuyCount,'attendanceToTheWorkshopCount',attendanceToTheWorkshopCount)
    }
    return invoice

   } catch (err) {
    console.log(err)
    return new HttpException(err , HttpStatus.BAD_REQUEST)
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

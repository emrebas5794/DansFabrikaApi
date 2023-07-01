import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { EErrors } from 'src/common/enums';
import { SmsService } from 'src/common/sms/sms.service';
import { ENotificationStatus, ENotificationType } from 'src/common/enums/notification.enum';
import { CourseStudentsService } from '../course-students/course-students.service';
import { StudentService } from '../student/student.service';
import { BulkEmail, SMS } from 'src/common/models/notification.interface';
import { MailService } from 'src/common/mail/mail.service';

@Injectable()
export class NotificationService {

  @Inject(CourseStudentsService)
  private readonly courseStudentService: CourseStudentsService

  @Inject(forwardRef(() => StudentService))
  private readonly studentService: StudentService

  constructor(private mailService: MailService, private smsService: SmsService, @InjectRepository(Notification) private notificationRepository: Repository<Notification>) { }

  async create(createNotificationDto: CreateNotificationDto) {
    if (createNotificationDto.courseId !== undefined) {
      const students = await this.courseStudentService.findCourseStudentsByCourse(createNotificationDto.courseId);
      switch (createNotificationDto.type) {
        case ENotificationType.SMS:
          if (students.length > 0) {
            const sms: SMS[] = [];
            students.forEach(async (student) => {
              const notification = new Notification();
              notification.type = createNotificationDto.type;
              notification.title = createNotificationDto.title;
              notification.message = createNotificationDto.message;
              notification.studentId = student.studentId;
              sms.push({ message: notification.message, phone: student.student.phone });
              await this.notificationRepository.save(notification);
            });
            await this.smsService.sendBulkSms(sms);
            throw new HttpException({}, HttpStatus.CREATED);
          }
          break;
        case ENotificationType.EMAIL:
          if (students.length > 0) {
            const email: BulkEmail = { emails: [], message: "", title: "" };
            students.forEach(async (student) => {
              const notification = new Notification();
              notification.type = createNotificationDto.type;
              notification.title = createNotificationDto.title;
              notification.message = createNotificationDto.message;
              notification.studentId = student.studentId;
              email.emails.push(student.student.email);
              email.message = createNotificationDto.message;
              email.title = createNotificationDto.title;
              await this.notificationRepository.save(notification);
            });
            await this.mailService.sendBulkMail(email);
            throw new HttpException({}, HttpStatus.CREATED);
          }
          break;
        case ENotificationType.NOTIFICATION:
          if (students.length > 0) {
            students.forEach(async (student) => {
              const notification = new Notification();
              notification.type = createNotificationDto.type;
              notification.title = createNotificationDto.title;
              notification.message = createNotificationDto.message;
              notification.studentId = student.studentId;
              await this.notificationRepository.save(notification);
            });
            throw new HttpException({}, HttpStatus.CREATED);
          }
          break;

        default:
          throw new HttpException({ message: [EErrors.TYPE_REQUIRED] }, HttpStatus.BAD_REQUEST);
          break;
      }
    }
    else {
      if (createNotificationDto.studentId !== undefined) {
        const student = await this.studentService.findOne(createNotificationDto.studentId);
        switch (createNotificationDto.type) {
          case ENotificationType.SMS:
            await this.notificationRepository.save(createNotificationDto);
            await this.smsService.sendSms({ message: createNotificationDto.message, phone: student.phone })
            throw new HttpException({}, HttpStatus.CREATED);
            break;
          case ENotificationType.EMAIL:
            await this.notificationRepository.save(createNotificationDto);
            await this.mailService.sendMail({ email: student.email, message: createNotificationDto.message, title: createNotificationDto.title });
            throw new HttpException({}, HttpStatus.CREATED);
            break;
          case ENotificationType.NOTIFICATION:
            return this.notificationRepository.save(createNotificationDto);
            break;

          default:
            throw new HttpException({ message: [EErrors.TYPE_REQUIRED] }, HttpStatus.BAD_REQUEST);
            break;
        }
      }
      else {
        createNotificationDto.studentId = null;
        return this.notificationRepository.save(createNotificationDto);        
      }
    }

  }

  async findByStudentIdForStudent(studentId) {
    return this.notificationRepository.find({ where: [{ studentId: studentId, type: ENotificationType.NOTIFICATION }, { studentId: IsNull(), type: ENotificationType.NOTIFICATION }] });
  }

  async findByStudentId(studentId) {
    return this.notificationRepository.find({ where: [{ studentId: studentId }, { studentId: IsNull() }] });
  }

  async findByCourseId(id: number) {
    const students = await this.courseStudentService.findCourseStudentsByCourse(id);
    if (students.length > 0) {
      const wheres = [];
      students.forEach((student) => {
        wheres.push({ studentId: student.studentId });
      });
      return this.notificationRepository.find({ where: wheres, relations: ['student'] });
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async setStatus(userId, notificationId) {
    console.log(userId, notificationId);
    
    const notification = await this.notificationRepository.findOne({ where: [{ studentId: userId, id: notificationId }, { studentId: null, id: notificationId }] });
    console.log(notification);
    
    if (notification) {
      notification.status = ENotificationStatus.READED;
      return this.notificationRepository.update(notification.id, notification);
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (notification) {
      return notification;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.findOne(updateNotificationDto.id);
    const updated = Object.assign(notification, updateNotificationDto);
    delete updated.id;
    return this.notificationRepository.update({ id: updateNotificationDto.id }, updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.notificationRepository.delete({ id });
  }
}

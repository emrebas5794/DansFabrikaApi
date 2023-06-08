import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { SmsModule } from 'src/common/sms/sms.module';
import { CourseStudentsModule } from '../course-students/course-students.module';
import { StudentModule } from '../student/student.module';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    SmsModule,
    MailModule,
    CourseStudentsModule,
    forwardRef(() => StudentModule)
  ],
  controllers: [NotificationController],
  providers: [NotificationService, TypeOrmModule],
  exports: [NotificationService]
})
export class NotificationModule {}

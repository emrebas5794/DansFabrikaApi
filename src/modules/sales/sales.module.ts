import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entities/sales.entity';
import { HttpModule } from '@nestjs/axios';
import { PackagesModule } from '../packages/packages.module';
import { CourseModule } from '../course/course.module';
import { SipayModule } from '../sipay/sipay.module';
import { StudentModule } from '../student/student.module';
import { CourseStudentsModule } from '../course-students/course-students.module';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sales]),
    HttpModule,
    PackagesModule,
    CourseModule,
    SipayModule,
    StudentModule,
    CourseStudentsModule,
    MailModule
  ],
  controllers: [SalesController],
  providers: [SalesService, TypeOrmModule]
})
export class SalesModule {}

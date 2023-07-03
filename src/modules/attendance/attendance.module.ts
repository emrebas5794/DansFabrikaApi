import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { CourseStudentsModule } from '../course-students/course-students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    CourseStudentsModule
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, TypeOrmModule]
})
export class AttendanceModule {}

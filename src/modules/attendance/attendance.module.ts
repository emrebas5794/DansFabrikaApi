import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { CourseStudentsModule } from '../course-students/course-students.module';
import { AuthModule } from 'src/auth/auth.module';
import { Sales } from '../sales/entities/sales.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, Sales]),
    CourseStudentsModule,
    AuthModule
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, TypeOrmModule]
})
export class AttendanceModule {}

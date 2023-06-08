import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    NotificationModule
  ],
  controllers: [StudentController],
  providers: [StudentService, TypeOrmModule],
  exports: [StudentService]
})
export class StudentModule {}

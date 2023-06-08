import { Module } from '@nestjs/common';
import { CourseStudentsService } from './course-students.service';
import { CourseStudentsController } from './course-students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseStudent } from './entities/course-student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseStudent])
  ],
  controllers: [CourseStudentsController],
  providers: [CourseStudentsService, TypeOrmModule],
  exports: [CourseStudentsService]
})
export class CourseStudentsModule {}

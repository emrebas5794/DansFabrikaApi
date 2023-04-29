import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseStudentDto } from './dto/create-course-student.dto';
import { UpdateCourseStudentDto } from './dto/update-course-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseStudent } from './entities/course-student.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class CourseStudentsService {
  constructor(@InjectRepository(CourseStudent) private courseStudentRepository: Repository<CourseStudent>) {}

  create(createCourseStudentDto: CreateCourseStudentDto) {
    return this.courseStudentRepository.save(createCourseStudentDto);
  }

  findAll() {
    return this.courseStudentRepository.find();
  }

  async findOne(id: number) {
    const courseStudent = await this.courseStudentRepository.findOne({ where: { id } });
    if (courseStudent) {
      return courseStudent;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findByStudent(studentId: number) {
    const courseStudent = await this.courseStudentRepository.find({ where: { studentId } });
    if (courseStudent) {
      return courseStudent;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findByCourse(courseId: number) {
    const courseStudent = await this.courseStudentRepository.find({ where: { courseId } });
    if (courseStudent) {
      return courseStudent;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateCourseStudentDto: UpdateCourseStudentDto) {
    console.log(updateCourseStudentDto);
    const courseStudent = await this.findOne(updateCourseStudentDto.id);
    const updated = Object.assign(courseStudent, updateCourseStudentDto);
    delete updated.id;
    console.log(updated);
    return this.courseStudentRepository.update(updateCourseStudentDto.id, updated);
  }

  async remove(id: number) {
    const courseStudent = await this.findOne(id);
    return this.courseStudentRepository.update(courseStudent.id, { status: -1 });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) {  }

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return this.courseRepository.find({ relations: ["danceType", "danceLevel", "trainer"] });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({ where: { id }, relations: ["danceType", "danceLevel", "trainer"] });
    if (course) {
      return course;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO Course tablosunun image kısmını yapmamışsın

  async update(updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(updateCourseDto.id);
    const updated = Object.assign(course, updateCourseDto);
    delete updated.id;
    return this.courseRepository.update(updateCourseDto.id, updated);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    return this.courseRepository.update(lesson.id, { status: -1 });
  }
}

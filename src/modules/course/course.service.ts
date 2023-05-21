import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Between, Repository } from 'typeorm';
import { EErrors, EStatus } from 'src/common/enums';
import { ECourseTypes } from 'src/common/enums/course-type.enum';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) {  }

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return this.courseRepository.find({ relations: ["danceType", "danceLevel", "trainer"] });
  }

  async findAllForStudent() {
    const courses = await this.courseRepository.find({ where: [ { courseType: ECourseTypes.KIDS, status: EStatus.ACTIVE }, { courseType: ECourseTypes.ACADEMY, status: EStatus.ACTIVE } ], relations: ["danceType", "danceLevel", "trainer"] });
    if (courses.length > 0) {
      return courses;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllForWorkShop(date: Date) {    
    const courses = await this.courseRepository.find({ where: { startDate: Between(startOfDay(date).toISOString(), endOfDay(date).toISOString()) }, relations: ["danceType", "danceLevel", "trainer"] });
    if (courses.length > 0) {
      return courses;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
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

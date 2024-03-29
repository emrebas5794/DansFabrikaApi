import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Between, Repository } from 'typeorm';
import { EErrors, EStatus } from 'src/common/enums';
import { ECourseTypes } from 'src/common/enums/course-type.enum';
import { startOfDay, endOfDay } from 'date-fns';
import { UpdateCourseImageDto } from './dto/course-image.dto';
import * as fs from 'fs';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) {  }

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return this.courseRepository.find({ relations: ["danceType", "danceLevel", "trainer", "lesson"] });
  }

  async findAllForStudent() {
    const courses = await this.courseRepository.find({ where: { status: EStatus.ACTIVE }, relations: ["danceType", "danceLevel", "trainer", "lesson"] });
    if (courses.length > 0) {
      return courses;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllForWorkShop(day: number) {    
    const courses = await this.courseRepository.find({ where: { lesson: { day } }, relations: ["danceType", "danceLevel", "trainer", "lesson"] });
    if (courses.length > 0) {
      return courses;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number, withRelations = true) {
    const course = await this.courseRepository.findOne({ where: { id }, relations: withRelations ? ["danceType", "danceLevel", "trainer", "lesson"] : [] });
    if (course) {
      return course;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }


  async update(updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(updateCourseDto.id, false);
    const updated = Object.assign(course, updateCourseDto);
    delete updated.id;
    return this.courseRepository.update(updateCourseDto.id, updated);
  }

  async updateImage(updateCourseImageDto: UpdateCourseImageDto, file: Express.Multer.File) {
    const course = await this.findOne(updateCourseImageDto.id);
    if (course.image) {
      fs.unlink(`${process.env.IMAGES_URL}${course.image}`, (err) => {
        console.log(err); // Log sistemi kurulunca buraya da bak 
      })
    }
    return this.courseRepository.update(updateCourseImageDto.id, { image: file.filename });
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    return this.courseRepository.update(lesson.id, { status: -1 });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) {}

  create(createLessonDto: CreateLessonDto) {
    return this.lessonRepository.save(createLessonDto);
  }

  findAll() {
    return this.lessonRepository.find();
  }

  async findOne(id: number) {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (lesson) {
      return lesson;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findByCourse(courseId: number) {
    const lessons = await this.lessonRepository.find({ where: { courseId } });
    if (lessons.length > 0) {
      return lessons;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  

  async update(updateLessonDto: UpdateLessonDto) {
    const lesson = await this.findOne(updateLessonDto.id);
    const updated = Object.assign(lesson, updateLessonDto);
    delete updated.id;
    return this.lessonRepository.update(updateLessonDto.id, updated);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    return this.lessonRepository.update(lesson.id, { status: -1 });
  }
}

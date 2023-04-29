import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller({ path: 'lessons', version: '1' })
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Get('course/:id')
  findByCourse(@Param('id') id: string) {
    return this.lessonsService.findByCourse(+id);
  }

  @Put()
  update(@Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}

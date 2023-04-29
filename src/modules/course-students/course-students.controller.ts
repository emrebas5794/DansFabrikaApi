import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CourseStudentsService } from './course-students.service';
import { CreateCourseStudentDto } from './dto/create-course-student.dto';
import { UpdateCourseStudentDto } from './dto/update-course-student.dto';

@Controller({ path: 'course-students', version: '1' })
export class CourseStudentsController {
  constructor(private readonly courseStudentsService: CourseStudentsService) {}

  @Post()
  create(@Body() createCourseStudentDto: CreateCourseStudentDto) {
    return this.courseStudentsService.create(createCourseStudentDto);
  }

  @Get()
  findAll() {
    return this.courseStudentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseStudentsService.findOne(+id);
  }

  @Get('student/:id')
  findByStudent(@Param('id') id: string) {
    return this.courseStudentsService.findByStudent(+id);
  }

  @Get('course/:id')
  findByCourse(@Param('id') id: string) {
    return this.courseStudentsService.findByCourse(+id);
  }

  @Put()
  update(@Body() updateCourseStudentDto: UpdateCourseStudentDto) {
    return this.courseStudentsService.update(updateCourseStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseStudentsService.remove(+id);
  }
}

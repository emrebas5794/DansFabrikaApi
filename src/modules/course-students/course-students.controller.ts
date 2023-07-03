import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { CourseStudentsService } from './course-students.service';
import { CreateCourseStudentDto } from './dto/create-course-student.dto';
import { UpdateCourseStudentDto } from './dto/update-course-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller({ path: 'course-students', version: '1' })
export class CourseStudentsController {
  constructor(private readonly courseStudentsService: CourseStudentsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createCourseStudentDto: CreateCourseStudentDto) {
    return this.courseStudentsService.create(createCourseStudentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get()
  findAll(@Req() req) {
    if (req.user.role === undefined) {
      return this.courseStudentsService.findAllForStudent();
    }
    return this.courseStudentsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseStudentsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('student/:id')
  findByStudent(@Param('id') id: string) {
    return this.courseStudentsService.findByStudent(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('course/:id')
  findByCourse(@Param('id') id: string) {
    return this.courseStudentsService.findByCourse(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateCourseStudentDto: UpdateCourseStudentDto) {
    return this.courseStudentsService.update(updateCourseStudentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseStudentsService.remove(+id);
  }
}

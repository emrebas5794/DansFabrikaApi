import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller({ path: 'lessons', version: '1' })
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('course/:id')
  findByCourse(@Param('id') id: string) {
    return this.lessonsService.findByCourse(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(updateLessonDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}

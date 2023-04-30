import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller({ path: 'attendance', version: '1' })
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Get('date/:course/:date')
  findByDate(@Param('date') id: string, @Param('course') course: string) {
    const date: Date = new Date(id);
    return this.attendanceService.findByDate(date, +course);
  }

  @Get('student/:course/:student')
  findByStudent(@Param('student') student: string, @Param('course') course: string) {
    return this.attendanceService.findByStudent(+student, +course);
  }

  @Put()
  update(@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}

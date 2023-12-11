import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { CreateQrDto } from './dto/create-qr.dto';
import { CreateAttendanceForStudentDto } from './dto/create-attendance-student.dto';
import { IsTheStudentOwnerOfTheCourse } from './dto/IsTheStudentOwnerOfTheCourse';

@Controller({ path: 'attendance', version: '1' })
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.STUDENT)
  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto | CreateAttendanceForStudentDto, @Req() req) {
    if (req.user.role === undefined) {
      return this.attendanceService.createForStudent(req.user.id, createAttendanceDto as CreateAttendanceForStudentDto);
    }
    return this.attendanceService.create(createAttendanceDto as CreateAttendanceDto);
  }



  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.STUDENT)
  @Post('isTheStudentOwnerOfTheCourse')
  isTheStudentOwnerOfTheCourse(@Body() isTheStudentOwnerOfTheCourseDto: IsTheStudentOwnerOfTheCourse){
    return this.attendanceService.isTheStudentOwnerOfTheCourse(isTheStudentOwnerOfTheCourseDto)
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post('qr')
  createQr(@Body() dto: CreateQrDto) {
    return this.attendanceService.createQr(dto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Get()
  findOneByStudent(@Req() req) {
    return this.attendanceService.findByStudentForStudent(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('date/:course/:date')
  findByDate(@Param('date') id: string, @Param('course') course: string) {
    const date: Date = new Date(id);
    return this.attendanceService.findByDate(date, +course);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('student/:course/:student')
  findByStudent(@Param('student') student: string, @Param('course') course: string) {
    return this.attendanceService.findByStudent(+student, +course);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(updateAttendanceDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}

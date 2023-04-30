import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Between, Equal, LessThanOrEqual, Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class AttendanceService {
  constructor(@InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepository.save(createAttendanceDto);
  }

  async findOne(id: number) {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    if (attendance) {
      return attendance;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findByDate(date: any, courseId: number) {
    const attendances = await this.attendanceRepository.find({ where: { attendanceDate: Between(startOfDay(date).toISOString(), endOfDay(date).toISOString()) } });
    if (attendances.length > 0) {
      return attendances;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findByStudent(student: number, courseId: number) {
    const attendances = await this.attendanceRepository.find({ where: { studentId: student, courseId: courseId } });
    if (attendances.length > 0) {
      return attendances;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateAttendanceDto: UpdateAttendanceDto) {
    const lesson = await this.findOne(updateAttendanceDto.id);
    const updated = Object.assign(lesson, updateAttendanceDto);
    delete updated.id;
    return this.attendanceRepository.update(updateAttendanceDto.id, updated);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    return this.attendanceRepository.remove(lesson);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import * as fs from 'fs';
import { UpdateCalendarImageDto } from './dto/update-calendar-image.dto';

@Injectable()
export class CalendarService {
  constructor(@InjectRepository(Calendar) private calendarRepository: Repository<Calendar>) { }

  async create(createCalendarDto: CreateCalendarDto) {
    return await this.calendarRepository.save(createCalendarDto);
  }

  findAll() {
    return this.calendarRepository.find();
  }

  async findOne(id: number) {
    const calendar = await this.calendarRepository.findOne({ where: { id } });
    if (calendar) {
      return calendar
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateCalendarDto: UpdateCalendarDto) {
    const calendar = await this.findOne(updateCalendarDto.id);
    if (calendar) {
      const updated = Object.assign(calendar, updateCalendarDto);
      return this.calendarRepository.update({ id: updateCalendarDto.id }, updated);
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async updateImage(updateCalendarImageDto: UpdateCalendarImageDto, file: Express.Multer.File) {
    const calendar = await this.findOne(updateCalendarImageDto.id);
    if (calendar.image) {
      fs.unlink(`${process.env.IMAGES_URL}${calendar.image}`, (err) => {
        console.log(err); // Log sistemi kurulunca buraya da bak
      })
    }
    return this.calendarRepository.update(updateCalendarImageDto.id, { image: file.filename });
  }

  async remove(id: number) {
    const calendar = await this.findOne(id);
    if (calendar) {
      return this.calendarRepository.update(id, { status: -1 })
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
}

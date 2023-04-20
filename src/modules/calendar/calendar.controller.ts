import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Put } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateCalendarImageDto } from './dto/update-calendar-image.dto';

@Controller({ path: 'calendar', version: '1' })
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  create(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.create(createCalendarDto);
  }

  @Get()
  findAll() {
    return this.calendarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findOne(+id);
  }

  @Put()
  update(@Body() updateCalendarDto: UpdateCalendarDto) {
    return this.calendarService.update(updateCalendarDto);
  }
  
  @Patch()
  @UseInterceptors(FileInterceptor('image', { storage: diskStorage({ destination: 'images/', filename(req, file, callback) {
    callback(null, `${v4()}.${file.originalname.split(".").at(-1)}`);
  }, }) }))
  async updateImage(@Body() updateImageDto: UpdateCalendarImageDto, @UploadedFile(new ParseFilePipe({ validators: [
    new MaxFileSizeValidator({ maxSize: 1048576 * 100  }), // maxSize olayı byte cinsinden çalışıyor. (1048576 byte = 1 mb)
    new FileTypeValidator({ fileType: 'image\/png|image\/jpeg|image\/svg\+xml|image\/gif|image\/svg' })
  ] })) image: Express.Multer.File) {
    return this.calendarService.updateImage(updateImageDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(+id);
  }
}

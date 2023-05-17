import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Put, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateCalendarImageDto } from './dto/update-calendar-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller({ path: 'calendar', version: '1' })
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.create(createCalendarDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get()
  findAll() {
    return this.calendarService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateCalendarDto: UpdateCalendarDto) {
    return this.calendarService.update(updateCalendarDto);
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(+id);
  }
}

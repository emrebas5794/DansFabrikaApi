import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateCourseImageDto } from './dto/course-image.dto';

@Controller({ path: 'course', version: '1' })
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT, ERoles.ADMIN)
  @Get()
  findAll(@Req() req) {
    if (req.user.role === undefined) {
      return this.courseService.findAllForStudent();
    }
    return this.courseService.findAll();
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT, ERoles.ADMIN)
  @Get('workshop/:day')
  findAllForWorkShop(@Param('day') day: number) {
    return this.courseService.findAllForWorkShop(day);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(updateCourseDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Patch()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: 'images/', filename(req, file, callback) {
        callback(null, `${v4()}.${file.originalname.split(".").at(-1)}`);
      },
    })
  }))
  async updateImage(@Body() updateImageDto: UpdateCourseImageDto, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1048576 * 100 }), // maxSize olayı byte cinsinden çalışıyor. (1048576 byte = 1 mb)
      new FileTypeValidator({ fileType: 'image\/png|image\/jpeg|image\/svg\+xml|image\/gif|image\/svg' })
    ]
  })) image: Express.Multer.File) {
    return this.courseService.updateImage(updateImageDto, image);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}

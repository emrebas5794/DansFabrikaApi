import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors, MaxFileSizeValidator, UploadedFile, FileTypeValidator, ParseFilePipe, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateStudentImageDto } from './dto/update-image.dto';
import { DtoCleaningPipe } from 'src/common/pipes/dto-cleaning/dto-cleaning.pipe';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { ERoles } from 'src/common/enums';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: 'student', version: '1' })
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.studentService.findAll(pageOptionsDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(updateStudentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put('password')
  updatePassword(@Body() updateStudentDto: UpdatePasswordDto) {
    return this.studentService.updatePassword(updateStudentDto);
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Patch()
  @UseInterceptors(FileInterceptor('image', { storage: diskStorage({ destination: 'images/', filename(req, file, callback) {
    callback(null, `${v4()}.${file.originalname.split(".").at(-1)}`);
  }, }) }))
  async updateImage(@Body() updateImageDto: UpdateStudentImageDto, @UploadedFile(new ParseFilePipe({ validators: [
    new MaxFileSizeValidator({ maxSize: 1048576 * 100  }), // maxSize olayı byte cinsinden çalışıyor. (1048576 byte = 1 mb)
    new FileTypeValidator({ fileType: 'image\/png|image\/jpeg|image\/svg\+xml|image\/gif|image\/svg' })
  ] })) image: Express.Multer.File) {
    return this.studentService.updateImage(updateImageDto, image);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}

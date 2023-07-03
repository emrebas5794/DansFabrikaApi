import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Put, UseGuards, Req } from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateSliderImageDto } from './dto/update-slider-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller({ path: 'slider', version: '1' })
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  async create(@Body() createSliderDto: CreateSliderDto) {
    return await this.sliderService.create(createSliderDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.STUDENT)
  @Get()
  findAll(@Req() req) {
    if (req.user.role === undefined) {
      return this.sliderService.findAllForStudent();
    }
    return this.sliderService.findAll();
  } 

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateSliderDto: UpdateSliderDto) {
    return this.sliderService.update(updateSliderDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Patch()
  @UseInterceptors(FileInterceptor('image', { storage: diskStorage({ destination: 'images/', filename(req, file, callback) {
    callback(null, `${v4()}.${file.originalname.split(".").at(-1)}`);
  }, }) }))
  async updateImage(@Body() updateImageDto: UpdateSliderImageDto, @UploadedFile(new ParseFilePipe({ validators: [
    new MaxFileSizeValidator({ maxSize: 1048576 * 100  }), // maxSize olayı byte cinsinden çalışıyor. (1048576 byte = 1 mb)
    new FileTypeValidator({ fileType: 'image\/png|image\/jpeg|image\/svg\+xml|image\/gif|image\/svg' })
  ] })) image: Express.Multer.File) {
    console.log(image);
    return this.sliderService.updateImage(updateImageDto, image);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderService.remove(+id);
  }
}

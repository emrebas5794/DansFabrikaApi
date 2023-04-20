import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Put } from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateSliderImageDto } from './dto/update-slider-image.dto';

@Controller({ path: 'slider', version: '1' })
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  async create(@Body() createSliderDto: CreateSliderDto) {
    return await this.sliderService.create(createSliderDto);
  }
  

  @Get()
  findAll() {
    return this.sliderService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(+id);
  }

  @Put()
  update(@Body() updateSliderDto: UpdateSliderDto) {
    return this.sliderService.update(updateSliderDto);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderService.remove(+id);
  }
}

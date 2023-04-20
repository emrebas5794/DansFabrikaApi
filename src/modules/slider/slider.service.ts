import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import * as fs from 'fs';
import { UpdateSliderImageDto } from './dto/update-slider-image.dto';

@Injectable()
export class SliderService {
  constructor(@InjectRepository(Slider) private sliderRepository: Repository<Slider>) {}
  
  async create(createSliderDto: CreateSliderDto) {
    return await this.sliderRepository.save(createSliderDto);
  }

  findAll() {
    return this.sliderRepository.find();
  }

  async findOne(id: number) {
    const slider = await this.sliderRepository.findOne({ where: { id } })
    if (slider) {
      return slider;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateSliderDto: UpdateSliderDto) {
    const slider = await this.findOne(updateSliderDto.id);
    if (slider) {
      const updated = Object.assign(slider, updateSliderDto);
      return this.sliderRepository.update({ id: updateSliderDto.id }, updated);
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async updateImage(updateSliderImageDto: UpdateSliderImageDto, file: Express.Multer.File){
    const slider = await this.findOne(updateSliderImageDto.id);
    if (slider) {
      await fs.unlinkSync(`${process.env.IMAGES_URL}${slider.image}`)
    }
    return this.sliderRepository.update(updateSliderImageDto.id, { image: file.filename });
  }

  async remove(id: number) {
    const slider = await this.findOne(id);
    if (slider) {
      return this.sliderRepository.update(id, { status: -1 })
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
}

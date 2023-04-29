import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateTrainerImageDto } from './dto/update-image.dto';
import * as fs from 'fs';

@Injectable()
export class TrainerService {
  constructor(@InjectRepository(Trainer) private trainerRepository: Repository<Trainer>) {  }

  async create(createTrainerDto: CreateTrainerDto) {
    const exisEmail = await this.trainerRepository.findOne({ where: { email: createTrainerDto.email } });
    if (exisEmail) {
      throw new HttpException({ message: [EErrors.EMAIL_UNIQUE] }, HttpStatus.BAD_REQUEST);
    }
    createTrainerDto.password = await bcrypt.hash(createTrainerDto.password, 10);
    return this.trainerRepository.save(createTrainerDto);
  }

  findAll() {
    return this.trainerRepository.find();
  }

  async findOne(id: number) {
    const trainer = await this.trainerRepository.findOne({ where: { id } });
    if (trainer) {
      return trainer;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateTrainerDto: UpdateTrainerDto) {
    const trainer = await this.findOne(updateTrainerDto.id);
    const updated = Object.assign(trainer, updateTrainerDto);
    delete updated.password;
    return await this.trainerRepository.update(updated.id, updated);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    await this.findOne(updatePasswordDto.id);
    updatePasswordDto.password = await bcrypt.hash(updatePasswordDto.password, 10);
    return this.trainerRepository.update(updatePasswordDto.id, { password: updatePasswordDto.password });
  }
  
  async updateImage(updateTrainerImageDto: UpdateTrainerImageDto, file: Express.Multer.File){
    const trainer = await this.findOne(updateTrainerImageDto.id);
    if (trainer.image) {
      await fs.unlinkSync(`${process.env.IMAGES_URL}${trainer.image}`)
    }
    return this.trainerRepository.update(updateTrainerImageDto.id, { image: file.filename });
  }

  async remove(id: number) {
    const slider = await this.findOne(id);
    return this.trainerRepository.update(slider.id, { status: -1 });
  }
}

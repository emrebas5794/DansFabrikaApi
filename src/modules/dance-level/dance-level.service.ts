import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDanceLevelDto } from './dto/create-dance-level.dto';
import { UpdateDanceLevelDto } from './dto/update-dance-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DanceLevel } from './entities/dance-level.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class DanceLevelService {
  constructor(@InjectRepository(DanceLevel) private danceLevelRepository: Repository<DanceLevel>) {}

  create(createDanceLevelDto: CreateDanceLevelDto) {
    return this.danceLevelRepository.save(createDanceLevelDto);
  }

  findAll() {
    return this.danceLevelRepository.find();
  }

  async findOne(id: number) {
    const danceLevel = await this.danceLevelRepository.findOne({ where: { id } });
    if (danceLevel) {
      return danceLevel;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateDanceLevelDto: UpdateDanceLevelDto) {
    const danceLevel = await this.findOne(updateDanceLevelDto.id);
    if (danceLevel) {
      const updated = Object.assign(danceLevel, updateDanceLevelDto);
      return this.danceLevelRepository.update({ id: updateDanceLevelDto.id }, updated);
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const danceLevel = await this.findOne(id);
    if (danceLevel) {
      return this.danceLevelRepository.update(id, { status: -1 });
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
}

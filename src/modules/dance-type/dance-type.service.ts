import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDanceTypeDto } from './dto/create-dance-type.dto';
import { UpdateDanceTypeDto } from './dto/update-dance-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DanceType } from './entities/dance-type.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class DanceTypeService {
  constructor(@InjectRepository(DanceType) private danceTypeRepository: Repository<DanceType>) { }

  create(createDanceTypeDto: CreateDanceTypeDto) {
    return this.danceTypeRepository.save(createDanceTypeDto);
  }

  findAll() {
    return this.danceTypeRepository.find();
  }

  async findOne(id: number) {
    const danceType = await this.danceTypeRepository.findOne({ where: { id } });
    if (danceType) {
      return danceType;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateDanceTypeDto: UpdateDanceTypeDto) {
    const danceType = await this.findOne(updateDanceTypeDto.id);
    const updated = Object.assign(danceType, updateDanceTypeDto);
    delete updated.id;
    return this.danceTypeRepository.update({ id: updateDanceTypeDto.id }, updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.danceTypeRepository.update(id, { status: -1 });
  }
}

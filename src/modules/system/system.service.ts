import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System } from './entities/system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IConfig } from 'src/common/models/config.model';

@Injectable()
export class SystemService {
  
  constructor(@InjectRepository(System) private systemRepository: Repository<System>) { }

  async findAll() {
    return this.systemRepository.findOne({ where: { id: 1 } });
  }

  async status() {
    const conf = await this.findAll();
    if (conf.sale) {
      throw new HttpException({ system: true }, HttpStatus.OK);
    }
    else {
      throw new HttpException({ system: false }, HttpStatus.ACCEPTED);
    }
  }

  update(updateSystemDto: UpdateSystemDto) {
    return this.systemRepository.update(updateSystemDto.id, updateSystemDto);
  }

}

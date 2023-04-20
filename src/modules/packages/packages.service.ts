import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class PackagesService {
  constructor(@InjectRepository(Package) private packageRepository: Repository<Package>) {  }

  create(createPackageDto: CreatePackageDto) {
    return this.packageRepository.save(createPackageDto);
  }

  findAll() {
    return this.packageRepository.find();
  }

  async findOne(id: number) {
    const pk = await this.packageRepository.findOne({ where: { id } });
    if (pk) {
      return pk;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updatePackageDto: UpdatePackageDto) {
    const pk = await this.findOne(updatePackageDto.id);
    if (pk) {
      const updated = Object.assign(pk, updatePackageDto);
      return this.packageRepository.update({ id: updatePackageDto.id }, updated);
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const pk = await this.findOne(id);
    if (pk) {
      return this.packageRepository.update(id, { status: -1 })
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sales } from './entities/sales.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class SalesService {
  constructor(@InjectRepository(Sales) private salesRepository: Repository<Sales>) { }

  create(createSaleDto: CreateSaleDto) {
    return this.salesRepository.save(createSaleDto);
  }

  findAll() {
    return this.salesRepository.find({ relations: ['student'] });
  }

  async findOne(id: number) {
    const sale = await this.salesRepository.findOne({ where: { id }, relations: ['student'] });
    if (sale) {
      return sale;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findByStudent(studentId: number) {
    const sale = await this.salesRepository.findOne({ where: { studentId } });
    if (sale) {
      return sale;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateSaleDto: UpdateSaleDto) {
    const sale = await this.findOne(updateSaleDto.id);
    const updated = Object.assign(sale, updateSaleDto);
    delete updated.id;
    return this.salesRepository.update(updateSaleDto.id, updated);
  }

  async remove(id: number) {
    const sale = await this.findOne(id);
    return this.salesRepository.remove(sale);
  }
}

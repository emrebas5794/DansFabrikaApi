import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';

@Injectable()
export class BillsService {
  constructor(@InjectRepository(Bill) private billRepository: Repository<Bill>) {}

  create(createBillDto: CreateBillDto) {
    return this.billRepository.save(createBillDto);
  }

  findAll() {
    return this.billRepository.find();
  }

  async findOne(id: number) {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (bill) {
      return bill;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateBillDto: UpdateBillDto) {
    const bill = await this.findOne(updateBillDto.id);
    const updated = Object.assign(bill, updateBillDto);
    delete updated.id;
    return this.billRepository.update({ id: updateBillDto.id }, updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.billRepository.delete({ id });
  }
}

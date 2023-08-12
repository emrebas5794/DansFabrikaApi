import { Injectable } from '@nestjs/common';
import { CreateSipayDto } from './dto/create-sipay.dto';
import { UpdateSipayDto } from './dto/update-sipay.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sipay } from './entities/sipay.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SipayService {

  constructor(@InjectRepository(Sipay) private sipayRepository: Repository<Sipay>) { }

  async create(createSipayDto: any) {
    return this.sipayRepository.save(createSipayDto);
  }

  async findByInvoiceId(invoiceId: string) {
    const invoice = await this.sipayRepository.findOne({ where: { invoiceId } });
    if (invoice) {
      return invoice;
    }
    
  }

  async update(sipayDto: any) {
    return this.sipayRepository.update(sipayDto.id, sipayDto);
  }

}

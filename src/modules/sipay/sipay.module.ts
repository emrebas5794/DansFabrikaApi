import { Module } from '@nestjs/common';
import { SipayService } from './sipay.service';
import { SipayController } from './sipay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sipay } from './entities/sipay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sipay])],
  controllers: [SipayController],
  providers: [SipayService],
  exports: [SipayService]
})
export class SipayModule {}

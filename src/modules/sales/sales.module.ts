import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entities/sales.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sales])
  ],
  controllers: [SalesController],
  providers: [SalesService, TypeOrmModule]
})
export class SalesModule {}

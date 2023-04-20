import { Module } from '@nestjs/common';
import { DanceTypeService } from './dance-type.service';
import { DanceTypeController } from './dance-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanceType } from './entities/dance-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanceType])
  ],
  controllers: [DanceTypeController],
  providers: [DanceTypeService, TypeOrmModule]
})
export class DanceTypeModule {}

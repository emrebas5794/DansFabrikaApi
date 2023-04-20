import { Module } from '@nestjs/common';
import { DanceLevelService } from './dance-level.service';
import { DanceLevelController } from './dance-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanceLevel } from './entities/dance-level.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanceLevel])
  ],
  controllers: [DanceLevelController],
  providers: [DanceLevelService, TypeOrmModule]
})
export class DanceLevelModule {}

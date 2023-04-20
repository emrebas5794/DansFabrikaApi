import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calendar])
  ],
  controllers: [CalendarController],
  providers: [CalendarService, TypeOrmModule]
})
export class CalendarModule {}

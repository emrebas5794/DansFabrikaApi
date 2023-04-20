import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DanceLevelService } from './dance-level.service';
import { CreateDanceLevelDto } from './dto/create-dance-level.dto';
import { UpdateDanceLevelDto } from './dto/update-dance-level.dto';

@Controller({ path: 'dance-level', version: '1' })
export class DanceLevelController {
  constructor(private readonly danceLevelService: DanceLevelService) {}

  @Post()
  create(@Body() createDanceLevelDto: CreateDanceLevelDto) {
    return this.danceLevelService.create(createDanceLevelDto);
  }

  @Get()
  findAll() {
    return this.danceLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danceLevelService.findOne(+id);
  }

  @Put()
  update(@Body() updateDanceLevelDto: UpdateDanceLevelDto) {
    return this.danceLevelService.update(updateDanceLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danceLevelService.remove(+id);
  }
}

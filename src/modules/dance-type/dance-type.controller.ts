import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DanceTypeService } from './dance-type.service';
import { CreateDanceTypeDto } from './dto/create-dance-type.dto';
import { UpdateDanceTypeDto } from './dto/update-dance-type.dto';

@Controller({ path: 'dance-type', version: '1' })
export class DanceTypeController {
  constructor(private readonly danceTypeService: DanceTypeService) {}

  @Post()
  create(@Body() createDanceTypeDto: CreateDanceTypeDto) {
    return this.danceTypeService.create(createDanceTypeDto);
  }

  @Get()
  findAll() {
    return this.danceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danceTypeService.findOne(+id);
  }

  @Put()
  update(@Body() updateDanceTypeDto: UpdateDanceTypeDto) {
    return this.danceTypeService.update(updateDanceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danceTypeService.remove(+id);
  }
}

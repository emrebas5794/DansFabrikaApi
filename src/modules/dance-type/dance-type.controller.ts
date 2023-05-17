import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DanceTypeService } from './dance-type.service';
import { CreateDanceTypeDto } from './dto/create-dance-type.dto';
import { UpdateDanceTypeDto } from './dto/update-dance-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';

@Controller({ path: 'dance-type', version: '1' })
export class DanceTypeController {
  constructor(private readonly danceTypeService: DanceTypeService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createDanceTypeDto: CreateDanceTypeDto) {
    return this.danceTypeService.create(createDanceTypeDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get()
  findAll() {
    return this.danceTypeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danceTypeService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateDanceTypeDto: UpdateDanceTypeDto) {
    return this.danceTypeService.update(updateDanceTypeDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danceTypeService.remove(+id);
  }
}

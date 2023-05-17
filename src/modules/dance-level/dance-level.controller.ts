import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DanceLevelService } from './dance-level.service';
import { CreateDanceLevelDto } from './dto/create-dance-level.dto';
import { UpdateDanceLevelDto } from './dto/update-dance-level.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller({ path: 'dance-level', version: '1' })
export class DanceLevelController {
  constructor(private readonly danceLevelService: DanceLevelService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createDanceLevelDto: CreateDanceLevelDto) {
    return this.danceLevelService.create(createDanceLevelDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get()
  findAll() {
    return this.danceLevelService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danceLevelService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateDanceLevelDto: UpdateDanceLevelDto) {
    return this.danceLevelService.update(updateDanceLevelDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danceLevelService.remove(+id);
  }
}

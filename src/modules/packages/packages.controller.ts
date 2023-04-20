import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller({ path: 'package', version: '1' })
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packagesService.create(createPackageDto);
  }

  @Get()
  findAll() {
    return this.packagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(+id);
  }

  @Put()
  update(@Body() updatePackageDto: UpdatePackageDto) {
    return this.packagesService.update(updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }
}

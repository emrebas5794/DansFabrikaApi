import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import { UpdatePasswordDto } from './dto/update-password.dto';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const password = require("node-php-password");

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

  create(createAdminDto: CreateAdminDto) {
    createAdminDto.password = password.hash(createAdminDto.password);
    return this.adminRepository.save(createAdminDto);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (admin) {
      return admin;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneForAuth(email) {
    return this.adminRepository.findOne({ where: { email }, select: ['id', 'name', 'role', 'password', 'email', 'status'] });
  }

  async update(updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(updateAdminDto.id);
    if (admin) {
      const updated = Object.assign(admin, updateAdminDto);
      return this.adminRepository.update({ id: updateAdminDto.id }, updated);
    }
    else{
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
  

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    await this.findOne(updatePasswordDto.id);
    updatePasswordDto.password = password.hash(updatePasswordDto.password);
    return this.adminRepository.update(updatePasswordDto.id, { password: updatePasswordDto.password });
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    if (admin) {
      return this.adminRepository.update(id, { status: -1 })
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }
}

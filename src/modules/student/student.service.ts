import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { EErrors } from 'src/common/enums';
import * as bcrypt from 'bcrypt';
import { PageOptionsDto, VerifyOrderData } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';
import { PageMetaDto } from '../pagination/page-meta.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateStudentImageDto } from './dto/update-image.dto';
import * as fs from 'fs';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private studentRepistory: Repository<Student>) { }

  async create(createStudentDto: CreateStudentDto) {
    const exisEmail = await this.studentRepistory.findOne({ where: { email: createStudentDto.email } });
    if (exisEmail) { // TODO burayı sor hangi alanları kontrol edelim
      throw new HttpException({ message: [EErrors.EMAIL_UNIQUE] }, HttpStatus.BAD_REQUEST);
    }

    const existPhone = await this.studentRepistory.findOne({ where: { phone: createStudentDto.phone } });
    if (existPhone) { // TODO burayı sor hangi alanları kontrol edelim
      throw new HttpException({ message: [EErrors.PHONE_UNIQUE] }, HttpStatus.BAD_REQUEST);
    }

    createStudentDto.code = Math.floor(100000 + Math.random() * 900000);
    createStudentDto.reference = Math.floor(100000 + Math.random() * 900000);
    createStudentDto.password = await bcrypt.hash(createStudentDto.password, 10);
    return this.studentRepistory.save(createStudentDto);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
    const qb = this.studentRepistory.createQueryBuilder("student");
    qb.skip((pageOptionsDto.page -1) * pageOptionsDto.take).take(pageOptionsDto.take).orderBy("student.id", "DESC");
    if (pageOptionsDto.order) {
      const verifyOrderData = new VerifyOrderData(this.studentRepistory.metadata.columns.map(column => column.propertyName), pageOptionsDto.order);
      const verify = await verifyOrderData.verify();
      if (verify) {
        pageOptionsDto.order = verifyOrderData.orderData;
        qb.addOrderBy(`student.${pageOptionsDto.order.column}`, pageOptionsDto.order.type);
      }
      else {
        throw new HttpException({ message: [EErrors.BAD_REQUEST] }, HttpStatus.BAD_REQUEST);
      }
    }

    const itemCount = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);

  }

  async findOne(id: number) {
    const student = await this.studentRepistory.findOne({ where: { id } });
    if (student) {
      return student;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(updateStudentDto.id);
    if (student) {
      const updated = Object.assign(student, updateStudentDto);
      console.log(updated, updateStudentDto);
      delete updated.password;
      return await this.studentRepistory.update({ id: updated.id }, updated);
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    await this.findOne(updatePasswordDto.id);
    updatePasswordDto.password = await bcrypt.hash(updatePasswordDto.password, 10);
    return this.studentRepistory.update({ id: updatePasswordDto.id }, { password: updatePasswordDto.password });
  }
  
  async updateImage(updateStudentImageDto: UpdateStudentImageDto, file: Express.Multer.File){
    const calendar = await this.findOne(updateStudentImageDto.id);
    if (calendar.image) {
      await fs.unlinkSync(`${process.env.IMAGES_URL}${calendar.image}`)
    }
    return this.studentRepistory.update(updateStudentImageDto.id, { image: file.filename });
  }

  async remove(id: number) {
    const slider = await this.findOne(id);
    return this.studentRepistory.update(slider.id, { status: -1 });
  }
}

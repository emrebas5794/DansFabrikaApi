import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateStudenForStudenttDto } from './dto/update-student-for-student.dto';
import { ENotificationType } from 'src/common/enums/notification.enum';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class StudentService {

  @Inject(NotificationService)
  private readonly notificationService: NotificationService

  constructor(@InjectRepository(Student) private studentRepistory: Repository<Student>) { }

  async create(createStudentDto: CreateStudentDto | RegisterDto) {
    const exisEmail = await this.studentRepistory.findOne({ where: { email: createStudentDto.email } });
    if (exisEmail) { // TODO burayı sor hangi alanları kontrol edelim
      throw new HttpException({ message: [EErrors.EMAIL_UNIQUE] }, HttpStatus.BAD_REQUEST);
    }

    createStudentDto.phone = createStudentDto.phone.replace(/[\+() ]/g, (m) => {
      return '';
    });

    const existPhone = await this.studentRepistory.findOne({ where: { phone: createStudentDto.phone } });
    if (existPhone) { // TODO burayı sor hangi alanları kontrol edelim
      throw new HttpException({ message: [EErrors.PHONE_UNIQUE] }, HttpStatus.BAD_REQUEST);
    }


    const referenceUser = await this.studentRepistory.findOne({ where: { reference: createStudentDto.reference } });

    createStudentDto.code = Math.floor(100000 + Math.random() * 900000);
    createStudentDto.reference = Math.floor(100000 + Math.random() * 900000);
    createStudentDto.password = await bcrypt.hash(createStudentDto.password, 10);
    const student = await this.studentRepistory.save(createStudentDto);
    
    if (referenceUser) {
      referenceUser.credit += 1000;
      await this.studentRepistory.update(referenceUser, { credit: referenceUser.credit });
      await this.studentRepistory.update(student, { referenceId: referenceUser.id });
    }
    return student;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
    const qb = this.studentRepistory.createQueryBuilder("student");
    qb.skip((pageOptionsDto.page - 1) * pageOptionsDto.take).take(pageOptionsDto.take).orderBy("student.id", "DESC");
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


  async findOneWithNotifications(id: number) {
    const student = await this.studentRepistory.findOne({ where: { id } });
    if (student) {
      const notificaions = await this.notificationService.findByStudentId(student.id);
      student.notifications = notificaions;
      delete student.code;
      return student;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  // FIXME öğrenci datası çekilirken code sütunu gelmemeli

  async findOne(id: number) {
    const student = await this.studentRepistory.findOne({ where: { id } });
    if (student) {
      return student;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneForAuthByEmail(email) {
    return this.studentRepistory.findOne({ where: { email }, select: ['id', 'name', 'image', 'password', 'email', 'status', 'code'] });
  }

  async findOneForAuthByPhone(phone) {

    phone = phone.replace(/[\+() ]/g, (m) => {
      return '';
    });

    return this.studentRepistory.findOne({ where: { phone }, select: ['id', 'name', 'image', 'password', 'phone', 'email', 'status', 'code'] });
  }

  async matchPassword(userId: number, password: string) {
    const student = await this.studentRepistory.findOne({ where: { id: userId }, select: ['id', 'name', 'image', 'password', 'email', 'status', 'code'] });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      throw new HttpException({ message: [EErrors.AUTH_EMAIL_PASSWORD_ERROR] }, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCode(id, code) {
    return this.studentRepistory.update(id, { code });
  }

  // FIXME TÜM UPDATE İŞLEMLERİNDE, DTO İÇERİSİNDE OLMAYAN PARAMETRELERİ SİLMELİSİN
  // FIXME TÜM UPDATE İŞLEMLERİNDE, DTO İÇERİSİNDE OLMAYAN PARAMETRELERİ SİLMELİSİN
  // FIXME TÜM UPDATE İŞLEMLERİNDE, DTO İÇERİSİNDE OLMAYAN PARAMETRELERİ SİLMELİSİN
  // FIXME TÜM UPDATE İŞLEMLERİNDE, DTO İÇERİSİNDE OLMAYAN PARAMETRELERİ SİLMELİSİN

  async update(updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(updateStudentDto.id);
    // const updated = Object.assign(student, updateStudentDto);
    // Object.keys
    return await this.studentRepistory.update(student.id, updateStudentDto);
  }

  async updateCredit(studentId: number, credit: number) {
    const student = await this.findOne(studentId);
    student.credit += credit;
    return this.studentRepistory.update(student.id, student);
  }

  async updateScore(studentId: number, amount: number) {
    const student = await this.findOne(studentId);
    student.score += amount;
    return this.studentRepistory.update(student.id, student);
  }

  async updateForStudent(updateStudentForStudent: UpdateStudenForStudenttDto) {
    const student = await this.findOne(updateStudentForStudent.id);
    return await this.studentRepistory.update(student.id, updateStudentForStudent);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    await this.findOne(updatePasswordDto.id);
    updatePasswordDto.password = await bcrypt.hash(updatePasswordDto.password, 10);
    return this.studentRepistory.update(updatePasswordDto.id, { password: updatePasswordDto.password });
  }

  async updateImage(updateStudentImageDto: UpdateStudentImageDto | any, file: Express.Multer.File) {
    const student = await this.findOne(updateStudentImageDto.id);

    if (student.image) {
      fs.unlink(`${process.env.IMAGES_URL}${student.image}`, (err) => {
        console.log(err); // Log sistemi kurulunca buraya da bak
      })
    }
    return this.studentRepistory.update(updateStudentImageDto.id, { image: file.filename });
  }

  async verification(phone: string, code: number) {
    const student = await this.studentRepistory.findOne({ where: { phone } });
    if (Number(student.code) === Number(code)) {
      await this.studentRepistory.update(student.id, { status: 1 });
      await this.updateCode(student.id, Math.floor(100000 + Math.random() * 900000));
      student.status = 1;
      return student;
    }
    else {
      return false;
    }
  }

  async verificationPassword(phone: string, code: number) {
    const student = await this.studentRepistory.findOne({ where: { phone } });
    if (Number(student.code) === Number(code)) {
      await this.updateCode(student.id, Math.floor(100000 + Math.random() * 900000));
      return student;
    }
    else {
      return false;
    }
  }

  async remove(id: number) {
    const slider = await this.findOne(id);
    return this.studentRepistory.update(slider.id, { status: -1 });
  }
}

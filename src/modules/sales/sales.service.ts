/* eslint-disable no-var */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sales } from './entities/sales.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ECourseTypes, EErrors, getCourseTypeName } from 'src/common/enums';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { InstallmentDto } from './dto/installment.dto';
import { PackagesService } from '../packages/packages.service';
import { CourseService } from '../course/course.service';
import { createCipheriv, createDecipheriv, createHash, randomBytes, scrypt } from 'crypto';
import { Invoice, Item, SipayCredentials } from 'src/common/models/sales.interface';
import { PaymentDto } from './dto/payment.dto';
import { v4 as uuidv4 } from 'uuid';
import * as runner from 'child_process';
import * as crypto from 'crypto';
import { SipayService } from '../sipay/sipay.service';
import { Sipay } from '../sipay/entities/sipay.entity';
import { StudentService } from '../student/student.service';
import { CourseStudentsService } from '../course-students/course-students.service';
import { UseCreditDto } from './dto/use-credit.dto';
import { MailService } from 'src/common/mail/mail.service';




@Injectable()
export class SalesService {

  @Inject(StudentService)
  private readonly studentService: StudentService

  @Inject(CourseStudentsService)
  private readonly courseStudentsService: CourseStudentsService

  @Inject(PackagesService)
  private readonly packageService: PackagesService

  @Inject(SipayService)
  private readonly sipayService: SipayService

  @Inject(CourseService)
  private readonly courseService: CourseService

  sipayCredentials: SipayCredentials;
  constructor(private emailService: MailService, @InjectRepository(Sales) private salesRepository: Repository<Sales>, private readonly http: HttpService) {
    this.sipayCredentials = {
      appKey: process.env.APP_KEY,
      appSecret: process.env.APP_SECRET,
      merchantId: process.env.MERCHANT_ID,
      merchantKey: process.env.MERCHANT_KEY,
      apiUrl: process.env.API_URL,
      is_3d: 0
    };
  }

  create(createSaleDto: CreateSaleDto) {
    return this.salesRepository.save(createSaleDto);
  }

  findAll() {
    return this.salesRepository.find({ relations: ['student', 'packages'] });
  }

  findAllForStudent(studentId: number) {
    return this.salesRepository.find({ where: { studentId }, relations: ['packages'] });
  }

  async findOne(id: number) {
    const sale = await this.salesRepository.findOne({ where: { id }, relations: ['student', 'packages'] });
    if (sale) {
      return sale;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async findByStudent(studentId: number) {
    const sale = await this.salesRepository.findOne({ where: { studentId } });
    if (sale) {
      return sale;
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateSaleDto: UpdateSaleDto) {
    const sale = await this.findOne(updateSaleDto.id);
    const updated = Object.assign(sale, updateSaleDto);
    delete updated.id;
    return this.salesRepository.update(updateSaleDto.id, updated);
  }

  async remove(id: number) {
    const sale = await this.findOne(id);
    return this.salesRepository.remove(sale);
  }

  async getToken(): Promise<string> {
    const res = await firstValueFrom(this.http.post<any>(`${this.sipayCredentials.apiUrl}/token`, { app_id: this.sipayCredentials.appKey, app_secret: this.sipayCredentials.appSecret }).pipe(catchError((error: AxiosError) => {
      throw new HttpException({ message: [EErrors.SIPAY_SERVER_ERROR, error] }, 200);
    })));

    if (res.data.status_code === 100) {
      this.sipayCredentials.is_3d = res.data.data.is_3d;
      return res.data.data.token;
    }
    else {
      // TODO Burayı loglamak şart
      throw new HttpException({ message: [EErrors.INTERNAL_SERVER_ERROR] }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkInstallment(dto: InstallmentDto): Promise<any> {

    const data = {
      credit_card: dto.credit_card,
      amount: 0,
      currency_code: "TRY",
      merchant_key: this.sipayCredentials.merchantKey
    }

    if (dto.package) {
      const pck = await this.packageService.findOne(dto.package.id);
      data.amount = pck.price;
    }
    else {
      const course = await this.courseService.findOne(dto.course.id);
      data.amount = course.price;
      if (dto.course.courseType === ECourseTypes.WORKSHOP) {

      }
      else {
        console.log("course geldi");
      }
    }

    const token = await this.getToken();

    const res = await firstValueFrom(this.http.post<any>(`${this.sipayCredentials.apiUrl}/getpos`, data, { headers: { "Authorization": "Bearer " + token } }).pipe(catchError((error: AxiosError) => {
      throw new HttpException({ message: [EErrors.SIPAY_SERVER_ERROR, error] }, 200);
    })));

    if (res.data.status_code === 100) {
      return res.data.data;
    }
    else {
      // TODO Burayı loglamak şart
      throw new HttpException({ message: [EErrors.INTERNAL_SERVER_ERROR] }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
 
  async payment(dto: PaymentDto, user) {
    const nameLastname = dto.cardOwnerName.trim().split(" ");
    const surname = nameLastname[nameLastname.length - 1];
    delete nameLastname[nameLastname.length - 1];
    const name = nameLastname.join(" ").trim();
    const dataForPost: Invoice = {
      authorization: `Bearer ${await this.getToken()}`,
      cc_no: dto.cardNumber.trim().split(" ").join(""),
      cc_holder_name: dto.cardOwnerName,
      expiry_month: dto.expirationDate.split("/")[0],
      expiry_year: dto.expirationDate.split("/")[1],
      cvv: dto.cvv,
      currency_code: "TRY",
      installments_number: dto.installment,
      invoice_description: "TEST INVOİCE DESCRİPTİON",
      surname: surname,
      name: name,
      merchant_key: this.sipayCredentials.merchantKey,
      invoice_id: uuidv4(),
      cancel_url: "https://payment.dansfabrika.com/return.php",
      return_url: "https://payment.dansfabrika.com/return.php",
    };


    const sale = new Sales();
    console.log(user);
    
    sale.studentId = user.id;

    if (dto.package) {
      const pck = await this.packageService.findOne(dto.package.id);
      dataForPost.total = pck.price;
      // dataForPost.hash_key = this.fenerateHashKey(dataForPost.total, dataForPost.installments_number, dataForPost.currency_code, dataForPost.merchant_key, dataForPost.invoice_id, this.sipayCredentials.appSecret);
      const item: Item = {
        name: pck.name,
        price: pck.price,
        quantity: 1,
        description: "Dansfabrika Paket Satışı"
      };
      sale.packagesId = pck.id;
      sale.courseId = null;
      sale.credit = pck.credit;

      dataForPost.items = JSON.stringify([item]);
    }
    else {
      const course = await this.courseService.findOne(dto.course.id);
      dataForPost.total = course.price;
      // dataForPost.hash_key = this.fenerateHashKey(dataForPost.total, dataForPost.installments_number, dataForPost.currency_code, dataForPost.merchant_key, dataForPost.invoice_id, this.sipayCredentials.appSecret);

      const item: Item = {
        name: "",
        price: course.price,
        quantity: 1,
        description: ""
      };
      if (dto.course.courseType === ECourseTypes.WORKSHOP) {
        item.name = "Workshop";
        item.description = "Dansfabrika Workshop Satışı";
      }
      else {
        item.name = getCourseTypeName(course.courseType);
        item.description = "Dansfabrika " + getCourseTypeName(course.courseType) + " Satışı";
      }

      sale.courseId = course.id;
      sale.packagesId = null;
      sale.credit = 0;
      dataForPost.items = JSON.stringify([item]);
    }

    sale.price = dataForPost.total;

    const recordedSale = await this.salesRepository.save(sale);
    this.sipayService.create({
      salesId: recordedSale.id,
      invoiceId: dataForPost.invoice_id
    });


    return dataForPost;
  }

  async returnPayment(returnPayment: any) {
    const invoice = await this.sipayService.findByInvoiceId(returnPayment.invoice_id);
    
    if (invoice.hashKey) {
      return returnPayment;
    }

    const sale = await this.salesRepository.findOne({ where: { id: invoice.salesId }, relations: ['packages', 'course', 'student'] });
    
    if (!sale) {
      return returnPayment;
    }
    
    invoice.orderId = returnPayment.order_id;
    invoice.orderNo = returnPayment.order_no;
    invoice.data = JSON.stringify(returnPayment);
    invoice.hashKey = returnPayment.hash_key;    
    await this.sipayService.update(invoice);

    if (sale.packages) {
      await this.studentService.updateCredit(sale.studentId, sale.packages.credit);
      await this.studentService.updateScore(sale.studentId, 200);
      this.emailService.sendPackageSale(sale.student, sale.packages)
    }
    else {
      await this.courseStudentsService.create({ courseId: sale.courseId, paidPrice: sale.price, status: 1, studentId: sale.studentId, startDate: sale.course.startDate, endDate: sale.course.endDate });
      
      switch (sale.course.courseType) {
        case ECourseTypes.ACADEMY:
          await this.studentService.updateScore(sale.studentId, 2000);
          break;
        case ECourseTypes.KIDS:
          await this.studentService.updateScore(sale.studentId, 2000);
          break;
        case ECourseTypes.WORKSHOP:
          await this.studentService.updateScore(sale.studentId, 200);
          break;
        case ECourseTypes.EVENT:
          await this.studentService.updateScore(sale.studentId, 1000);
          break;
      }
    }
    
    return returnPayment;
  }

  async useCredit(dto: UseCreditDto, user) {
    const course = await this.courseService.findOne(dto.course.id);
    if (user.credit >= 10) {
      await this.studentService.updateCredit(user.id, -10);
      this.emailService.sendUsedCredit(user);
      return this.courseStudentsService.create({ courseId: course.id, paidPrice: 0, status: 1, studentId: user.id, startDate: dto.date, endDate: dto.date });
    }
    else {
      throw new HttpException({ message: [EErrors.HAVENT_CREDIT] }, HttpStatus.BAD_REQUEST);
    }
  }

  generateHashKey(total: number, installment: string, currencyCode: string, merchantKey: string, invoiceId: string, appSecret: string): any {
    const data = `${total}|${installment}|${currencyCode}|${merchantKey}|${invoiceId}`;

    const iv = randomBytes(8).toString('hex');
    const password = createHash('sha1').update(appSecret).digest('hex');

    const salt = randomBytes(2).toString('hex');
    const saltWithPassword = createHash('sha256').update(password + salt).digest('hex').slice(0, 32);

    const cipher = createCipheriv('aes-256-cbc', saltWithPassword, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    let msgEncryptedBundle = `${iv}:${salt}:${encrypted}`;
    msgEncryptedBundle = msgEncryptedBundle.replace(/\//g, '__');

    return msgEncryptedBundle;
  }

}

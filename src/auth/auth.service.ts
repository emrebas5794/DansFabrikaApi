import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { EErrors } from 'src/common/enums';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { StudentService } from 'src/modules/student/student.service';
import { AdminService } from 'src/modules/admin/admin.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UpdateStudentImageDto } from 'src/modules/student/dto/update-image.dto';
import { SmsService } from 'src/common/sms/sms.service';
import { UpdateStudenForStudenttDto } from 'src/modules/student/dto/update-student-for-student.dto';

@Injectable()
export class AuthService {
    @Inject(AdminService)
    private readonly adminService: AdminService

    @Inject(StudentService)
    private readonly studentService: StudentService

    constructor(private jwtService: JwtService, private smsService: SmsService) {

    }

    /* ----- ADMİN ----- */

    async validateAdminCredentials(loginDto: LoginDto): Promise<any> {

        const existUser = await this.adminService.findOneForAuth(loginDto.email);
        if (!existUser) {
            throw new HttpException({ message: [EErrors.AUTH_EMAIL_PASSWORD_ERROR] }, HttpStatus.BAD_REQUEST);
        }

        const isMatch = await bcrypt.compare(loginDto.password, existUser.password);
        if (!isMatch) {
            throw new HttpException({ message: [EErrors.AUTH_EMAIL_PASSWORD_ERROR] }, HttpStatus.BAD_REQUEST);
        }
        return existUser ?? null;
    }

    async adminLogin(credentials: JwtPayload) {
        console.log("hadi be");
        return { accessToken: this.jwtService.sign(credentials, { expiresIn: '1 days' }) };
    }

    /* ----- ADMİN ----- */



    /* ----- STUDENT ----- */

    /* Admin Login ile Student Login birebir aynı fonksiyondur. Ayrı ayrı kullanmamın amacı ilerideki yapılıcak değişiklikler içindir
    Yarın baktığımda anlaması kolay olsun istedim.
    */
    async studentLogin(credentials: JwtPayload) {
        return { accessToken: this.jwtService.sign({ id: credentials.id, email: credentials.email, image: credentials.image, status: credentials.status }, { expiresIn: '1 days' }) };
    }

    async validateStudentCredentials(loginDto: LoginDto): Promise<any> {
        const existUser = await this.studentService.findOneForAuth(loginDto.email);
        if (!existUser) {
            throw new HttpException({ message: [EErrors.AUTH_EMAIL_PASSWORD_ERROR] }, HttpStatus.BAD_REQUEST);
        }

        const isMatch = await bcrypt.compare(loginDto.password, existUser.password);
        if (!isMatch) {
            throw new HttpException({ message: [EErrors.AUTH_EMAIL_PASSWORD_ERROR] }, HttpStatus.BAD_REQUEST);
        }

        delete existUser.code;
        delete existUser.password;

        return existUser ?? null;
    }

    async updateImage(user: any, file: Express.Multer.File) {
        return this.studentService.updateImage(user, file);
    }

    async updateProfile(updateStudentDto: UpdateStudenForStudenttDto) {
        return this.studentService.updateForStudent(updateStudentDto);
    }

    async register(registerDto: RegisterDto) {
        const student = await this.studentService.create(registerDto);
        if (student) {
            const sms = await this.smsService.sendSms(`${student.code} Dans Fabrika için onay kodunuz. `, student.phone);
            if (sms.status === HttpStatus.OK) {
                return { accessToken: this.jwtService.sign({ phone: student.phone, type: 'register' }, { expiresIn: '2 min' }) };
            }
            else {
                throw new HttpException({ message: [EErrors.INTERNAL_SERVER_ERROR] }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            throw new HttpException({ message: [EErrors.INTERNAL_SERVER_ERROR] }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async verification(credentials: any, code: number) {
        const student = await this.studentService.verification(credentials.phone, code);
        console.log("burada => ", student);
        if (!student) { throw new UnauthorizedException(); }
        return { accessToken: this.jwtService.sign({ id: student.id, email: student.email, image: student.image, status: 1 }, { expiresIn: '1 days' }) };
    }

    /* ----- STUDENT ----- */


}

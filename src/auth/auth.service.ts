import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { EErrors } from 'src/common/enums';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { StudentService } from 'src/modules/student/student.service';
import { AdminService } from 'src/modules/admin/admin.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { SmsService } from 'src/common/sms/sms.service';
import { UpdateStudenForStudenttDto } from 'src/modules/student/dto/update-student-for-student.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { EVerificationType } from 'src/common/enums/verification-type.enum';
import { ForgotPasswordDto, VerificationPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { InviteDto } from './dto/invite-friend.dto';
import { MailService } from 'src/common/mail/mail.service';

@Injectable()
export class AuthService {
    @Inject(AdminService)
    private readonly adminService: AdminService

    @Inject(StudentService)
    private readonly studentService: StudentService

    constructor(private jwtService: JwtService, private smsService: SmsService, private emailService: MailService) {

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
        return { accessToken: this.jwtService.sign({ id: credentials.id, name: credentials.name, email: credentials.email, role: credentials.role, status: credentials.status }, { expiresIn: '1 days' }), exp: 86400 };
    }

    /* ----- ADMİN ----- */


    /* ----- STUDENT ----- */

    /* Admin Login ile Student Login birebir aynı fonksiyondur. Ayrı ayrı kullanmamın amacı ilerideki yapılıcak değişiklikler içindir
    Yarın baktığımda anlaması kolay olsun istedim.
    */
    async studentLogin(credentials: JwtPayload) {
        return { accessToken: this.jwtService.sign({ id: credentials.id, email: credentials.email, image: credentials.image, status: credentials.status }, { expiresIn: '30 days' }), exp: 86400 * 30 };
    }

    async getProfile(id: number) {
        return this.studentService.findOneWithNotifications(id);
    }

    async validateStudentCredentials(loginDto: LoginDto): Promise<any> {
        const existUser = await this.studentService.findOneForAuthByEmail(loginDto.email);
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

    createJwt(dto: any) {
        return { qr: this.jwtService.sign({ attendanceDate: dto.attendanceDate, courseId: dto.courseId, lessonId: dto.lessonId }, { expiresIn: '2 hours' }), exp: 7200 };
    }

    async validateJwt(token) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new ForbiddenException()
        }
    }

    async updateImage(user: any, file: Express.Multer.File) {
        return this.studentService.updateImage(user, file);
    }

    async updateProfile(updateStudentDto: UpdateStudenForStudenttDto) {
        return this.studentService.updateForStudent(updateStudentDto);
    }

    async inviteFriend(inviteDto: InviteDto, user) {
        const student = await this.studentService.findOne(user.id);        
        return this.emailService.sendReference(student, inviteDto.email);
    }

    async register(registerDto: RegisterDto) {
        const student = await this.studentService.create(registerDto);
        if (student) {
            const sms = await this.smsService.sendSms({ message: `${student.code} Dans Fabrika için onay kodunuz. `, phone: student.phone });
            if (sms.status === HttpStatus.OK) {
                return { accessToken: this.jwtService.sign({ phone: student.phone, type: EVerificationType.REGISTER }, { expiresIn: '2 min' }) };
            }
            else {
                throw new HttpException({ message: [EErrors.INTERNAL_SERVER_ERROR] }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            throw new HttpException({ message: [EErrors.INTERNAL_SERVER_ERROR] }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const student = await this.studentService.findOneForAuthByPhone(forgotPasswordDto.phone);
        if (student) {
            const sms = await this.smsService.sendSms({ message: `${student.code} Dans Fabrika için onay kodunuz. `, phone: student.phone });
            
            if (sms.status === HttpStatus.OK) {
                return { accessToken: this.jwtService.sign({ id: student.id, phone: student.phone, type: EVerificationType.FORGOT_PASSWORD }, { expiresIn: '2 min' }) };
            }
            else {
                throw new HttpException({ message: [EErrors.INTERNAL_SERVER_ERROR] }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            return { accessToken: this.jwtService.sign({ id: Math.floor(1000 + Math.random() * 90000), phone: forgotPasswordDto.phone, type: EVerificationType.FORGOT_PASSWORD }, { expiresIn: '2 min' }) };
        }
    }

    async verification(credentials: any, code: number) {
        const student = await this.studentService.verification(credentials.phone, code);
        if (!student) { throw new UnauthorizedException(); }
        this.emailService.sendRegister(student);
        return { accessToken: this.jwtService.sign({ id: student.id, email: student.email, image: student.image, status: student.status }, { expiresIn: '30 days' }), exp: 86400*30 };
    }

    async verificationPassword(user: any, verificationPasswordDto: VerificationPasswordDto) {
        const student = await this.studentService.verificationPassword(user.phone, verificationPasswordDto.code);
        if (!student) { throw new UnauthorizedException(); }
        return { accessToken: this.jwtService.sign({ id: student.id, email: student.email, image: student.image, status: student.status, type: EVerificationType.FORGOT_PASSWORD }, { expiresIn: '30 days' }), exp: 86400 * 30 };
    }


    async resetPassword(req: any, changePasswordDto: ResetPasswordDto) {
        if (req.user.type !== 'forgot-password') { throw new UnauthorizedException(); }

        if (changePasswordDto.password !== changePasswordDto.again) {
            throw new HttpException({ message: [EErrors.OLD_AND_NEW_DOESNT_MATCH] }, HttpStatus.BAD_REQUEST);
        }

        return this.studentService.updatePassword({ id: req.user.id, password: changePasswordDto.password });
    }

    async changePassword(req: any, changePasswordDto: ChangePasswordDto) {
        if (changePasswordDto.oldPassword !== changePasswordDto.oldPasswordAgain) {
            throw new HttpException({ message: [EErrors.OLD_AND_NEW_DOESNT_MATCH] }, HttpStatus.BAD_REQUEST);
        }

        await this.studentService.matchPassword(req.user.id, changePasswordDto.oldPassword);

        return this.studentService.updatePassword({ id: req.user.id, password: changePasswordDto.newPassword });
    }

    /* ----- STUDENT ----- */


}

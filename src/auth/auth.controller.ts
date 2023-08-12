import { Body, Controller, FileTypeValidator, ForbiddenException, Get, MaxFileSizeValidator, ParseFilePipe, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { VerificationGuard } from 'src/common/guards/verification/verification.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateStudenForStudenttDto } from 'src/modules/student/dto/update-student-for-student.dto';
import { RegisterDto } from './dto/register.dto';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ForgotPasswordGuard } from 'src/common/guards/forgot-password/forgot-password.guard';
import { ForgotPasswordDto, VerificationPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { InviteDto } from './dto/invite-friend.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('student'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.studentLogin(req.user);
  }

  @UseGuards(AuthGuard('admin'))
  @Post('/admin/login')
  async adminLogin(@Req() req) {
    const result = await this.authService.adminLogin(req.user);
    // res.cookie('token', result.accessToken, { /*secure: true, domain: process.env.FRONTEND_DOMAIN, httpOnly: true*/ });
    return result;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post('invite')
  async inviteFriend(@Body() invitedDto: InviteDto, @Req() req) {
    return this.authService.inviteFriend(invitedDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Get('profile')
  async getProfile(@Req() req) {
    console.log(req.user);
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post('profile')
  async profile(@Body() updateStudentForStudent: UpdateStudenForStudenttDto, @Req() req) {
    if (updateStudentForStudent.id !== req.user.id) { throw new ForbiddenException(); }
    return this.authService.updateProfile(updateStudentForStudent);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Patch('image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: 'images/', filename(req, file, callback) {
        callback(null, `${v4()}.${file.originalname.split(".").at(-1)}`);
      },
    })
  }))
  async updateImage(@Req() req, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1048576 * 100 }), // maxSize olayı byte cinsinden çalışıyor. (1048576 byte = 1 mb)
      new FileTypeValidator({ fileType: 'image\/png|image\/jpeg|image\/svg\+xml|image\/gif|image\/svg' })
    ]
  })) image: Express.Multer.File) {
    return this.authService.updateImage(req.user, image);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post('change-password')
  async changePassword(@Req() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req, changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post('reset-password')
  async resetPassword(@Req() req, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(req, resetPasswordDto);
  }

  @UseGuards(VerificationGuard)
  @Post('verification/register')
  async verificationRegister(@Req() req: any) {
    const result = await this.authService.verification(req.user, req.body.code);
    return result;
  }

  @UseGuards(ForgotPasswordGuard)
  @Post('verification/password')
  async verificationPassword(@Req() req: any, @Body() passwordVerificationDto: VerificationPasswordDto) {
    return this.authService.verificationPassword(req.user, passwordVerificationDto);
  }

}

import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { VerificationGuard } from 'src/common/guards/verification/verification.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from "uuid";
import { UpdateStudenForStudenttDto } from 'src/modules/student/dto/update-student-for-student.dto';
import { RegisterDto } from './dto/register.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('student'))
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    const result = await this.authService.studentLogin(req.user);
    res.cookie('token', result.accessToken, { secure: true, domain: process.env.FRONTEND_DOMAIN, httpOnly: true });
    return result;
  }

  @UseGuards(AuthGuard('admin'))
  @Post('/admin/login')
  async adminLogin(@Req() req, @Res({ passthrough: true }) res) {
    const result = await this.authService.adminLogin(req.user);
    res.cookie('token', result.accessToken, { secure: true, domain: process.env.FRONTEND_DOMAIN, httpOnly: true });
    return result;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async profile(@Body() updateStudentForStudent: UpdateStudenForStudenttDto) {
    return this.authService.updateProfile(updateStudentForStudent);
  }


  @UseGuards(AuthGuard('jwt'))
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
    console.log(req.user);
    
    return this.authService.updateImage(req.user, image);
  }


  @UseGuards(AuthGuard('local'))
  @Post('forgot-password')
  async forgotPassword(@Req() req) {
    return; 
  }

  @UseGuards(VerificationGuard)
  @Post('verification')
  async verification(@Req() req: any, @Res({ passthrough: true }) res) {
    const result = await this.authService.verification(req.user, req.body.code);
    res.cookie('token', result.accessToken, { secure: true, domain: process.env.FRONTEND_DOMAIN });
    return result;
  }

}

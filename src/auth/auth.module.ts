import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/common/mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from 'src/modules/student/student.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { SmsModule } from 'src/common/sms/sms.module';
import { StudentStrategy } from './strategies/student.strategy';
import { AdminStrategy } from './strategies/admin.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MailModule,
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1 days', algorithm: 'RS256' }
    }),
    StudentModule,
    AdminModule,
    SmsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, StudentStrategy, AdminStrategy, JwtStrategy]
})
export class AuthModule {}

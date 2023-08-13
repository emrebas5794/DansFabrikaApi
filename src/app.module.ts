import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SliderModule } from './modules/slider/slider.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { PackagesModule } from './modules/packages/packages.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student/student.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { DanceLevelModule } from './modules/dance-level/dance-level.module';
import { DanceTypeModule } from './modules/dance-type/dance-type.module';
import { TrainerModule } from './modules/trainer/trainer.module';
import { SalesModule } from './modules/sales/sales.module';
import { CourseStudentsModule } from './modules/course-students/course-students.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { CourseModule } from './modules/course/course.module';
import { SmsModule } from './common/sms/sms.module';
import { MailModule } from './common/mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { BillsModule } from './modules/bills/bills.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ServerErrorFilter } from './common/filters/server-error/server-error.filter';
import { SystemModule } from './modules/system/system.module';
import { SipayModule } from './modules/sipay/sipay.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SliderModule, CalendarModule, PackagesModule, AdminModule, StudentModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          dest: config.get("IMAGES_URL")
        }
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('DATABASE_HOST'),
          port: Number(config.get('DATABASE_PORT')),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: false
        }
      }
    }),
    RouterModule.register([
      {
        path: '',
        children: [
          AdminModule,
          CalendarModule,
          PackagesModule,
          SliderModule,
          StudentModule
        ]
      }
    ]),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          ttl: Number(config.get('THROTTLER_TTL')),
          limit: Number(config.get('THROTTLER_LIMIT'))
        }
      }
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'),
          filename: 'debug.log',
          level: 'debug',
          maxFiles: 10,
          maxsize: 10000000
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'), 
          filename: 'error.log',
          level: 'error',
          maxFiles: 10,
          maxsize: 10000000
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
          maxFiles: 10,
          maxsize: 10000000
        }),
      ],
    }),
    DanceLevelModule,
    DanceTypeModule,
    TrainerModule,
    SalesModule,
    CourseStudentsModule,
    LessonsModule,
    AttendanceModule,
    CourseModule,
    SmsModule,
    MailModule,
    AuthModule,
    BillsModule,
    NotificationModule,
    SystemModule,
    SipayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

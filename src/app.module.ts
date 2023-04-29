import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SliderModule } from './modules/slider/slider.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { PackagesModule } from './modules/packages/packages.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student/student.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { DanceLevelModule } from './modules/dance-level/dance-level.module';
import { DanceTypeModule } from './modules/dance-type/dance-type.module';
import { TrainerModule } from './modules/trainer/trainer.module';
import { SalesModule } from './modules/sales/sales.module';
import { CourseStudentsModule } from './modules/course-students/course-students.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/.development.env',
    }),
    AuthModule, SliderModule, CalendarModule, PackagesModule, AdminModule, StudentModule,
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
    DanceLevelModule,
    DanceTypeModule,
    TrainerModule,
    SalesModule,
    CourseStudentsModule,
    LessonsModule,
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI
  });  
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL
    // origin: "*"
  });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(3000);
}
bootstrap();

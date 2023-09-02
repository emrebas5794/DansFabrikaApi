import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI
  });
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: '*',
  // });

  app.enableCors({
    origin: [
      'http://localhost',
      'https://localhost',
      'http://localhost:8100',
      'https://localhost:8100',
      'http://dansfabrika.com',
      'https://dansfabrika.com',
      'http://admin.dansfabrika.com',
      'https://admin.dansfabrika.com',
      'http://payment.dansfabrika.com',
      'https://payment.dansfabrika.com',
      'http://yeniadmin.dansfabrika.com',
      'https://yeniadmin.dansfabrika.com',
      'http://*.dansfabrika.com',
      'https://*.dansfabrika.com',
      'capacitor://localhost'
    ],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
}
bootstrap();

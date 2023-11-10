import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImATeapotException, ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

const whitelist = [
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
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // cors: {
    //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    //   origin: function (origin, callback) {
    //     if (!origin) {
    //       callback(null, true);
    //       return;
    //     }
    //     if (
    //       whitelist.includes(origin) || // Checks your whitelist
    //       !!origin.match(/dansfabrika\.com$/) // Overall check for your domain
    //     ) {
    //       console.log('allowed cors for:', origin);
    //       callback(null, true);
    //     } else {
    //       console.log('blocked cors for:', origin);
    //       callback(new ImATeapotException('Not allowed by CORS'), false);
    //     }
    //   },
    // }
  });


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
      'capacitor://localhost',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
  });

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
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
}
bootstrap();

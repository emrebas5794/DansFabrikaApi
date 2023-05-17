import { Controller, ForbiddenException, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { SmsService } from './common/sms/sms.service';
import { catchError, firstValueFrom } from 'rxjs';
import { EErrors } from './common/enums';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}

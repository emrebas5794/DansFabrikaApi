import { Injectable } from '@nestjs/common';
import { SmsService } from './common/sms/sms.service';

@Injectable()
export class AppService {
  constructor(private smsService: SmsService) {
    
  }

  async getHello() {
    return "hello";
  }
}

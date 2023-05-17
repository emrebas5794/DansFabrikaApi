import { Injectable } from '@nestjs/common';
import { SmsService } from './common/sms/sms.service';

@Injectable()
export class AppService {
  constructor(private smsService: SmsService) {
    
  }

  async getHello() {
    // return this.smsService.sendSms("test", "5512708926");
    const sms = await this.smsService.sendSms("test", "5512708926");
            console.log("smsss => ", sms.data);
            return {t: sms.data}
  }
}

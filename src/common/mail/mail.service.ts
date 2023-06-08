import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { BulkEmail, Email } from '../models/notification.interface';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMail(data: Email){
        await this.mailerService.sendMail({
            to: data.email,
            subject: data.title,
            template: './2fa',
            context: {
                name: data.message,
                code: data.message
            }
        });
    }

    async sendBulkMail(data: BulkEmail){
        await this.mailerService.sendMail({
            bcc: data.emails,
            subject: data.title,
            template: './2fa',
            context: {
                name: data.message,
                code: data.message
            }
        });
    }
}

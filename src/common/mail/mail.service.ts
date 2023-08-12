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
            html: data.message
        });
    }

    async sendBulkMail(data: BulkEmail){
        await this.mailerService.sendMail({
            bcc: data.emails,
            subject: data.title,
            html: data.message
        });
    }

    async sendRegister(user) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Hoş Geldiniz",
            template: './register',
            context: {
                name: user.name
            }
        });
    }

    async sendReference(user, email) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Hoş Geldiniz",
            template: './package-sale',
            context: {
                code: user.reference,
            }
        });
    }

    async sendPackageSale(user, pck) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Hoş Geldiniz",
            template: './package-sale',
            context: {
                name: user.name,
                packageName: pck.name,
                packageDetail: pck.detail,
                packageDate: new Date(pck.sellBy).toLocaleDateString()
            }
        });
    }


    async sendUsedCredit(user) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Hoş Geldiniz",
            template: './used-credit',
            context: {
                name: user.name
            }
        });
    }
}

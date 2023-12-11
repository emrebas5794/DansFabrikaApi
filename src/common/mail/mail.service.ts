import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EErrors } from '../enums';
import { BulkEmail, Email } from '../models/notification.interface';
const SibApiV3Sdk = require('@getbrevo/brevo');

@Injectable()
export class MailService {
    apiInstance: any;
    sendSmtpEmail: any;
    constructor(private mailerService: MailerService) {
        const brevoAPIKey = process.env.BREVO_API_KEY;
        this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        this.apiInstance.authentications['apiKey'];
        let apiKey = this.apiInstance.authentications['apiKey'];
        apiKey.apiKey = brevoAPIKey;

        this.sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    }

    async sendBrevoEmail(receiverEmail: string, subject: string, invitorName: string, refrenceCode: number, receiverName?: string,) {
        this.sendSmtpEmail.subject = "{{params.subject}}";
        this.sendSmtpEmail.htmlContent = `<html><body>
            <div style="">
            <img align="center" border="0"
            src="https://dim.mcusercontent.com/cs/bc913c76bc59ef223eec4ef6d/images/02800fcd-c9fc-e060-fcd3-28dcd08fede8.jpg?w=297&amp;dpr=2"
            alt="Image" title="Image"
            style="margin: 0 auto; outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display:block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;"
            width="168.2" />
            </div>
            <h1 style="text-align: center;">Özel bir davet aldın!</h1>
            <h2>{{params.invitor}} seni DansFabrika'ya davet ediyor.</h2>
            <p>Hemen Dansfabrika uygulamayı indirip, kaydını aşağıdaki refrans kodunu kullanarak tamamla ve dans dolu anlara ortak ol.</p>
            <p>refrans kodu: {{params.refrenceCode}}</p>
            </body></html>`;
        this.sendSmtpEmail.sender = { "name": "Dans Fabrika", "email": "info@dansfabrika.com" };
        this.sendSmtpEmail.to = [{ "email": receiverEmail, "name": "Jane Doe" }];
        // this.sendSmtpEmail.cc = [{ "email": "example2@example2.com", "name": "Janice Doe" }];
        // this.sendSmtpEmail.bcc = [{ "name": "John Doe", "email": "example@example.com" }];
        // this.sendSmtpEmail.replyTo = { "email": "replyto@domain.com", "name": "John Doe" };
        this.sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        this.sendSmtpEmail.params = { "parameter": "My param value", "subject": subject, "invitor": invitorName, refrenceCode };

        this.apiInstance.sendTransacEmail(this.sendSmtpEmail).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));

        }, function (error) {
            console.error(error);
            return new HttpException({ message: error }, HttpStatus.BAD_REQUEST)
        });
    }

    async sendMail(data: Email) {
        await this.mailerService.sendMail({
            to: data.email,
            subject: data.title,
            html: data.message
        });
    }

    async sendBulkMail(data: BulkEmail) {
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
        return this.sendBrevoEmail(email, "Dans Fabrika Refrans Kodu", user?.name, user?.reference)


        // await this.mailerService.sendMail({
        //     to: email,
        //     subject: "Hoş Geldiniz",
        //     template: './package-sale',
        //     context: {
        //         code: user.reference,
        //     }
        // });
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

import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { EErrors } from '../enums';
import * as FormData from 'form-data'
import { SMS } from '../models/notification.interface';

@Injectable()
export class SmsService {
    username = "05379101039";
    password = "DansFabrikaSms";
    originator = "DansFabrika";
    smsUrl = "http://www.smspaketim.com.tr/api/mesaj_gonder";

    constructor(private readonly http: HttpService) {}

    async sendSms(sms: SMS): Promise<AxiosResponse> {
        const data = new FormData();
        data.append('data', `<SingleTextSMS>\n    <UserName>${this.username}</UserName>\n    <PassWord>${this.password}</PassWord>\n    <Action>1</Action>\n    <Mesgbody>${sms.message}</Mesgbody>\n    <Numbers>${sms.phone}</Numbers>\n    <Originator>${this.originator}</Originator>\n    <SDate></SDate>\n</SingleTextSMS>`);
        const res = await firstValueFrom(this.http.post<string>(this.smsUrl, data).pipe(catchError((error: AxiosError) => {
            throw new HttpException({ message: [EErrors.SMS_POST_ERROR, error] }, 200);
        })))
        return res;
    }

    async sendBulkSms(sms: SMS[]) {
        let sms1 = `<MultiTextSMS><UserName>${this.username}</UserName><PassWord>${this.password}</PassWord><Action>11</Action><Messages>`;
        const sms2 = `</Messages><Originator>${this.originator}</Originator><SDate></SDate></MultiTextSMS>`;
        sms.forEach(el => {
            sms1 += `<Message><Mesgbody>${el.message}</Mesgbody><Number>${el.phone}</Number></Message>`;
        })
        const data = new FormData();
        data.append('data', sms1 + sms2);
        const res = await firstValueFrom(this.http.post<string>(this.smsUrl, data).pipe(catchError((error: AxiosError) => {
            throw new HttpException({ message: [EErrors.SMS_POST_ERROR, error] }, 200);
        })))
        return res;
    }
} 

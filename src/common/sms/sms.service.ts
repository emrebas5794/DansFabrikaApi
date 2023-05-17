import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { EErrors } from '../enums';
import * as FormData from 'form-data'

@Injectable()
export class SmsService {
    username = "05379101039";
    password = "DansFabrikaSms";
    originator = "DansFabrika";
    smsUrl = "http://www.smspaketim.com.tr/api/mesaj_gonder";

    constructor(private readonly http: HttpService) {}

    async sendSms(message: string, phone: string): Promise<AxiosResponse> {
        const data = new FormData();
        data.append('data', `<SingleTextSMS>\n    <UserName>${this.username}</UserName>\n    <PassWord>${this.password}</PassWord>\n    <Action>1</Action>\n    <Mesgbody>${message}</Mesgbody>\n    <Numbers>${phone}</Numbers>\n    <Originator>${this.originator}</Originator>\n    <SDate></SDate>\n</SingleTextSMS>`);
        const res = await firstValueFrom(this.http.post<string>(this.smsUrl, data).pipe(catchError((error: AxiosError) => {
            throw new HttpException({ message: [EErrors.SMS_POST_ERROR, error] }, 200);
        })))
        return res;
    }

    findAlls(): Observable<AxiosResponse<any>> {
        return this.http.get('http://localhost:3100/cats').pipe(catchError(err => {
            throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, 200);
        }));
    }

    async findAll(): Promise<any> {
        const { data } = await firstValueFrom(
            this.http.get<any>('http://localhost:3100/cats').pipe(
                catchError((error: AxiosError) => {
                    console.log(error.message);
                    throw new HttpException({ message: [EErrors.HAVENT_RECORD] }, 200);
                }),
            ),
        );
        return data;
    }
} 

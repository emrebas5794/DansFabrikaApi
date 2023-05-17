import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateStudentDto {
    @IsString()
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.IDENTITY_REQUIRED })
    readonly identity: string;
    
    @IsEmail({}, { message: EErrors.EMAIL_INVALID })
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.PHONE_REQUIRED })
    readonly phone: string;
    
    @Length(8, 60, { message: EErrors.PASSWORD_MIN })
    @IsNotEmpty({ message: EErrors.PASSWORD_REQUIRED })
    password: string;

    @IsOptional()
    readonly country: string;
    
    @IsOptional()
    @IsNumber()
    readonly gender: number;
    
    @IsDateString()
    @IsOptional()
    readonly birthday: Date;

    @IsOptional()
    @IsNumber()
    readonly credit: number;
    
    @IsOptional()
    @IsNumber()
    readonly score: number;
    
    @IsOptional()
    @IsNumber()
    readonly referanceId: number;

    reference: number;
    

    code: number

    readonly status: number;
}

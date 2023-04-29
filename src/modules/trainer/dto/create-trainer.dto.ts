import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateTrainerDto {
    @IsString()
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsEmail({}, { message: EErrors.EMAIL_INVALID })
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.PHONE_REQUIRED })
    readonly phone: string;
    
    @Length(8, 60, { message: EErrors.PASSWORD_MIN })
    @IsNotEmpty({ message: EErrors.PASSWORD_REQUIRED })
    password: string;
    
    @IsDateString()
    @IsOptional()
    readonly birthday: Date;
    
    @IsString()
    @IsOptional()
    readonly description: string;
    
    readonly status: number;
}

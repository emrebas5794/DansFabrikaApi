import { IsString, Length, IsNotEmpty, IsEmail, IsDateString, IsOptional, IsNumber } from "class-validator";
import { EErrors } from "src/common/enums";

export class UpdateTrainerDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
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
    
    @IsDateString()
    @IsOptional()
    readonly birthday: Date;
    
    @IsString()
    @IsOptional()
    readonly description: string;
    
    readonly status: number;
}

import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class UpdateStudenForStudenttDto {

    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsString()
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsString()
    readonly identity: string;
    
    @IsEmail({}, { message: EErrors.EMAIL_INVALID })
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;

    @IsOptional()
    readonly country: string;
    
    @IsOptional()
    readonly gender: number;
    
    @IsOptional()
    @IsDateString()
    readonly birthday: Date;
}

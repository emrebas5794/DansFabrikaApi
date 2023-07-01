import { IsNotEmpty, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class RegisterDto {

    @IsString()
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.PHONE_REQUIRED })
    phone: string;

    @IsString()
    @Length(8, 60, { message: EErrors.PASSWORD_MIN })
    @IsNotEmpty({ message: EErrors.PASSWORD_REQUIRED })
    password: string;
    

    reference: number;
    

    code: number
}

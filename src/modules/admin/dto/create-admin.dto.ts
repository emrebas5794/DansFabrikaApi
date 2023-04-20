import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateAdminDto {
    
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsEmail({}, { message: EErrors.EMAIL_INVALID })
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;

    @Length(8, 60, { message: EErrors.PASSWORD_MIN })
    @IsNotEmpty({ message: EErrors.PASSWORD_REQUIRED })
    readonly password: string;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ROLE_REQUIRED })
    readonly role: number;
}

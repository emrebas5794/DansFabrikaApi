import { IsNotEmpty, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class LoginDto {
    
    @IsString()
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;

    @IsString()
    @IsNotEmpty({ message: EErrors.PASSWORD_REQUIRED })
    readonly password: string;
}

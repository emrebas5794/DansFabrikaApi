import { IsNotEmpty, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty({ message: EErrors.PASSWORD_REQUIRED })
    readonly again: string;

    @IsString()
    @Length(8, 60, { message: EErrors.PASSWORD_MIN })
    @IsNotEmpty({ message: EErrors.NEW_PASSWORD_REQUIRED })
    readonly password: string;
}

import { IsNotEmpty, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty({ message: EErrors.OLD_PASSWORD_REQUIRED })
    readonly oldPassword: string;

    @IsString()
    @IsNotEmpty({ message: EErrors.OLD_PASSWORD_AGAIN_REQUIRED })
    readonly oldPasswordAgain: string;

    @IsString()
    @Length(8, 60, { message: EErrors.PASSWORD_MIN })
    @IsNotEmpty({ message: EErrors.NEW_PASSWORD_REQUIRED })
    readonly newPassword: string;
}

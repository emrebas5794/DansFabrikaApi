import { IsNotEmpty, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class ForgotPasswordDto {
    @IsString()
    @IsNotEmpty({ message: EErrors.PHONE_REQUIRED })
    readonly phone: string;
}

export class VerificationPasswordDto {
    @IsNotEmpty({ message: EErrors.CODE_REQUIRED })
    readonly code: number;
}
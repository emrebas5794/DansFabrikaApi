import { IsNotEmpty, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class InviteDto {
    @IsString()
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;
}

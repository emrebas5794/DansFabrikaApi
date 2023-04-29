import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class UpdatePasswordDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.PASSWORD_REQUIRED })
    password: string;
}
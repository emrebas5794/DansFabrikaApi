import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class UpdateDanceLevelDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsString()
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.STATUS_REQUIRED })
    readonly status: number;
}

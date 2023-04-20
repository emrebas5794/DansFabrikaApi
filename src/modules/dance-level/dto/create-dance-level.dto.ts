import { IsNotEmpty, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateDanceLevelDto {
    @IsString()
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
}

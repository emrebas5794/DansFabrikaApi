import { IsNotEmpty, IsNumberString } from "class-validator";
import { EErrors } from "src/common/enums";

export class UpdateCourseImageDto {
    @IsNumberString()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
}

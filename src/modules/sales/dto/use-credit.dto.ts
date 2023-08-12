import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class UseCreditDto {

    @IsNotEmpty({ message: EErrors.COURSE_REQUIRED })
    readonly course: any;

    @IsNotEmpty({ message: EErrors.DATE_REQUIRED })
    readonly date: Date;
}

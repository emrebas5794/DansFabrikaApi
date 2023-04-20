import { IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateCalendarDto {
    @IsNumberString()
    @IsNotEmpty({ message: EErrors.QUEUE_REQUIRED })
    readonly queue: number;

    @IsString()
    @Length(0, 180, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;

    @IsOptional()
    image: string;
}

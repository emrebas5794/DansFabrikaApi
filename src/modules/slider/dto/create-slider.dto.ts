import { IsNumber, IsNotEmpty, IsString, Length, IsNumberString, IsOptional } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateSliderDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.QUEUE_REQUIRED })
    readonly queue: number;

    @IsString()
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.DESCRIPTION_REQUIRED })
    readonly description: string;
}

import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EErrors } from "src/common/enums";


export class UpdateCourseDto {    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.DANCE_TYPE_REQUIRED })
    readonly danceTypeId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.DANCE_LEVEL_REQUIRED })
    readonly danceLevelId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.CAPACITY_REQUIRED })
    readonly capacity: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.TRAINER_REQUIRED })
    readonly trainerId: number;

    @IsString()
    @IsNotEmpty({ message: EErrors.DESCRIPTION_REQUIRED })
    readonly description: string;

    @IsDateString()
    @IsNotEmpty({ message: EErrors.START_DATE_REQUIRED })
    readonly startDate: Date;

    @IsDateString()
    @IsNotEmpty({ message: EErrors.END_DATE_REQUIRED })
    readonly endDate: Date;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.COURSETYPE_REQUIRED })
    courseType: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.ONSALE_REQUIRED })
    onSale: number;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.PRICE_REQUIRED })
    readonly price: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.PRICE_REQUIRED })
    readonly status: number;
}

import { IsNotEmpty, IsNumber } from "class-validator";
import { EErrors } from "src/common/enums";


export class UpdateLessonDto {    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.COURSE_REQUIRED })
    readonly courseId: number;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.DAY_REQUIRED })
    readonly day: number;    

    @IsNotEmpty({ message: EErrors.START_TIME_REQUIRED })
    readonly startTime: Date;

    @IsNotEmpty({ message: EErrors.END_TIME_REQUIRED })
    readonly endTime: Date;
    
    readonly status: number;
}

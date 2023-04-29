import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateCourseStudentDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.COURSE_REQUIRED })
    readonly courseId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.STUDENT_REQUIRED })
    readonly studentId: number;

    @IsDateString()
    @IsNotEmpty({ message: EErrors.START_DATE_REQUIRED })
    readonly startDate: Date;

    @IsDateString()
    @IsNotEmpty({ message: EErrors.END_DATE_REQUIRED })
    readonly endDate: Date;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.PRICE_REQUIRED })
    readonly paidPrice: number;
    
    readonly status: number;
}

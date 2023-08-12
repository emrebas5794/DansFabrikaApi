import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateQrDto {
    @IsDateString()
    @IsNotEmpty({ message: EErrors.ATTENDANCE_DATE_REQUIRED })
    readonly attendanceDate: Date;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.COURSE_REQUIRED })
    readonly courseId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.STUDENT_REQUIRED })
    readonly lessonId: number;
}

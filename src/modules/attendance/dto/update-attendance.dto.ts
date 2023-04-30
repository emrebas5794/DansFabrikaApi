import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { EErrors } from "src/common/enums";


export class UpdateAttendanceDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsDateString()
    @IsNotEmpty({ message: EErrors.ATTENDANCE_DATE_REQUIRED })
    readonly attendanceDate: Date;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.COURSE_REQUIRED })
    readonly courseId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.LESSON_REQUIRED })
    readonly lessonId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.STUDENT_REQUIRED })
    readonly studentId: number;
}

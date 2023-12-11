import { IsNotEmpty, IsNumber } from "class-validator";
import { EErrors } from "src/common/enums";

export class IsTheStudentOwnerOfTheCourse {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.COURSE_REQUIRED })
    readonly courseId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.STUDENT_REQUIRED })
    readonly studentId: number;
}

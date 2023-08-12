import { IsNotEmpty, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateAttendanceForStudentDto {
    @IsString()
    @IsNotEmpty({ message: EErrors.QR_REQUIRED })
    readonly qr: string;
}

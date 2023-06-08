import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class UpdateNotificationDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.TYPE_REQUIRED })
    readonly type: number;

    @IsString()
    @IsNotEmpty({ message: EErrors.TITLE_REQUIRED })
    readonly title: string;

    @IsString()
    @IsNotEmpty({ message: EErrors.MESSAGE_REQUIRED })
    readonly message: string;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.STUDENT_REQUIRED })
    readonly studentId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.STATUS_REQUIRED })
    readonly status: number;
}

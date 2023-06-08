import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateNotificationDto {
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
    @IsOptional()
    studentId: number;

    @IsNumber()
    @IsOptional()
    readonly status: number;
    
    @IsNumber()
    @IsOptional()
    readonly courseId: number;
}

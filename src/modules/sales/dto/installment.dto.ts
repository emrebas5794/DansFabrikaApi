import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class InstallmentDto {

    @IsString()
    @IsNotEmpty({ message: EErrors.CREDIT_CARD_REQUIRED })
    readonly credit_card: string;
    
    @IsOptional()
    readonly package: any;

    @IsOptional()
    readonly course: any;

    @IsOptional()
    readonly date: Date;
}

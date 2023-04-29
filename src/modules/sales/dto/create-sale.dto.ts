import { IsNotEmpty, IsNumber } from "class-validator";
import { EErrors } from "src/common/enums";

export class CreateSaleDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.STUDENT_REQUIRED })
    readonly studentId: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.CREDIT_REQUIRED })
    readonly credit: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.PRICE_REQUIRED })
    readonly price: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.TYPE_REQUIRED })
    readonly type: number;

    @IsNotEmpty({ message: EErrors.SELLBY_REQUIRED })
    readonly sellBy: Date;
}

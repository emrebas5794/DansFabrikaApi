import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EErrors } from "src/common/enums";

export class PaymentDto {

    @IsString()
    @IsNotEmpty({ message: EErrors.CARD_OWNER_REQUIRED })
    readonly cardOwnerName: string;

    @IsString()
    @IsNotEmpty({ message: EErrors.CARD_NUMBER_REQUIRED })
    readonly cardNumber: string;

    @IsString()
    @IsNotEmpty({ message: EErrors.EXPIRATION_DATE_REQUIRED })
    readonly expirationDate: string;

    @IsString()
    @IsNotEmpty({ message: EErrors.CVV_REQUIRED })
    readonly cvv: string;

    @IsNotEmpty({ message: EErrors.INSTALLMENT_REQUIRED })
    readonly installment: any;

    @IsOptional()
    readonly package: any;

    @IsOptional()
    readonly course: any;

    @IsOptional()
    readonly date: Date;
}

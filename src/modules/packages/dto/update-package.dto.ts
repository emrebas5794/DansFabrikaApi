import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { EErrors } from "src/common/enums";

export class UpdatePackageDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsString()
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsString()
    @IsNotEmpty({ message: EErrors.DESCRIPTION_REQUIRED })
    readonly description: string;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.PRICE_REQUIRED })
    readonly price: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.CREDIT_REQUIRED })
    readonly credit: number;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.STATUS_REQUIRED })
    readonly status: number;
}

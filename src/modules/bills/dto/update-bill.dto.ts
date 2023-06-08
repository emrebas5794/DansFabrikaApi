import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EErrors } from 'src/common/enums';

export class UpdateBillDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.PROCESS_TYPE_REQUIRED })
    readonly processType: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.PROCESS_REQUIRED })
    readonly process: number;

    @IsString()
    @IsNotEmpty({ message: EErrors.DESCRIPTION_REQUIRED })
    readonly description: string;

    @IsDateString()
    @IsNotEmpty({ message: EErrors.PROCESS_DATE_REQUIRED })
    processDate: Date;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.PRICE_REQUIRED })
    readonly price: number;
}

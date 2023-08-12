import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemDto } from './create-system.dto';
import { IsJSON, IsNotEmpty, IsNumber } from 'class-validator';
import { IConfig } from 'src/common/models/config.model';
import { EErrors } from 'src/common/enums';

export class UpdateSystemDto extends PartialType(CreateSystemDto) {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;

    @IsJSON()
    @IsNotEmpty()
    config: boolean;
}

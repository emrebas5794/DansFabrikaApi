import { EErrors } from 'src/common/enums';
import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class UpdateAdminDto {
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ID_REQUIRED })
    readonly id: number;
    
    @Length(1, 255, { message: EErrors.NAME_MAX })
    @IsNotEmpty({ message: EErrors.NAME_REQUIRED })
    readonly name: string;
    
    @IsEmail({}, { message: EErrors.EMAIL_INVALID })
    @IsNotEmpty({ message: EErrors.EMAIL_REQUIRED })
    readonly email: string;
    
    @IsNumber()
    @IsNotEmpty({ message: EErrors.ROLE_REQUIRED })
    readonly role: number;

    @IsNumber()
    @IsNotEmpty({ message: EErrors.STATUS_REQUIRED })
    readonly status: number;
}

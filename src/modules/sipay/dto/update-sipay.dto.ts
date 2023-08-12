import { PartialType } from '@nestjs/mapped-types';
import { CreateSipayDto } from './create-sipay.dto';

export class UpdateSipayDto extends PartialType(CreateSipayDto) {}

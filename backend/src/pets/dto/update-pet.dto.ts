import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePetDto extends PartialType(
  OmitType(CreatePetDto, ['birthDate', 'breed', 'name', 'species'] as const),
) {
  @IsBoolean()
  @IsOptional()
  menuAccepted?: boolean;
}

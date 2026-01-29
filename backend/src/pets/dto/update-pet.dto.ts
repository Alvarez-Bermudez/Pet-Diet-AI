import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { $Enums, ActivityLevel } from 'generated/prisma';

export class UpdatePetDto {
  @IsNumber()
  @IsOptional()
  currentWeight?: number | undefined;

  @IsEnum(ActivityLevel)
  @IsOptional()
  activityLevel?: ActivityLevel | undefined;
}

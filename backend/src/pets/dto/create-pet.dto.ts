import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { ActivityLevel, Species } from 'generated/prisma';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsEnum(Species)
  species: Species;

  @IsString()
  breed: string;

  @IsDateString()
  birthDate: string;

  @IsNumber()
  currentWeight: number;

  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;
}

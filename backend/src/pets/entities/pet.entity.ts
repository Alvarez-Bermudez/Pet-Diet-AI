import { Expose } from 'class-transformer';
import { ActivityLevel, Species } from 'generated/prisma';

export class PetEntity {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  species: Species;

  @Expose()
  breed: string;

  @Expose()
  birthDate: Date;

  @Expose()
  currentWeigth: number;

  @Expose()
  activityLevel: ActivityLevel;

  @Expose()
  dailyNutritionalPlan?: string | null;

  @Expose()
  menu?: string | null;

  @Expose()
  menuAccepted?: boolean | null;

  constructor(partial: Partial<PetEntity>) {
    Object.assign(this, partial);
  }
}

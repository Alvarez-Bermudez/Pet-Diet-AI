import { Expose } from 'class-transformer';
import { ActivityLevel, Prisma, Species } from 'generated/prisma';

export class PetEntity2 {
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
  currentWeight: Prisma.Decimal;

  @Expose()
  activityLevel: ActivityLevel;

  @Expose()
  dailyNutritionalPlan?: string | null;

  @Expose()
  menu?: string | null;

  @Expose()
  menuAccepted?: boolean | null;

  constructor(partial: Partial<PetEntity2>) {
    Object.assign(this, partial);
  }
}

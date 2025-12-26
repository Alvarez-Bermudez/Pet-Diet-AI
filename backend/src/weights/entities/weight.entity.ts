import { Expose } from 'class-transformer';
import { Prisma } from 'generated/prisma';

export class WeightEntity {
  @Expose()
  id: string;

  @Expose()
  petId: string;

  @Expose()
  weight: Prisma.Decimal;

  @Expose()
  date: Date;

  constructor(partial: Partial<WeightEntity>) {
    Object.assign(this, partial);
  }
}

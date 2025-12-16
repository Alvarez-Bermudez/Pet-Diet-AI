import { Expose } from 'class-transformer';

export class WeightEntity {
  @Expose()
  id: string;

  @Expose()
  petId: string;

  @Expose()
  weight: number;

  @Expose()
  date: Date;

  constructor(partial: Partial<WeightEntity>) {
    Object.assign(this, partial);
  }
}

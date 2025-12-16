import { Expose } from 'class-transformer';

export class UserEntity {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone?: string | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

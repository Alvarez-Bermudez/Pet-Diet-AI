export class UserEntity {
  name: string;
  email: string;
  phone?: string | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

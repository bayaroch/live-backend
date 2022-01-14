import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;

  name: string;

  email: string;

  phone_number: string;

  type: number;

  @Exclude()
  password: string;
  @Exclude()
  balance: number;
  @Exclude()
  isConfirmed: boolean;
  @Exclude()
  confirmToken: string;
}

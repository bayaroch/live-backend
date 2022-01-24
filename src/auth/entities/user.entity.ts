export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  balance: number;
  type: number;
  isConfirmed: boolean;
  confirmToken: string;
}

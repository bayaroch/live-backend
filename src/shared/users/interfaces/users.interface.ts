export interface IUsers {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phone_number: string;
  readonly type: number;
  readonly balance: number;
  readonly isConfirmed: boolean;
  readonly confirmToken: string;
}

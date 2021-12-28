import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  readonly id: number;

  @IsString()
  @MaxLength(30)
  name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}

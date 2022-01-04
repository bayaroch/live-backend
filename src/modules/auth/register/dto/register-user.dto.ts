import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';

export class RegisterUserDto {
  readonly id: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}

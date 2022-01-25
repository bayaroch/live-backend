import { MaxLength, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UserProfileDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsBoolean()
  @IsNotEmpty()
  isConfirmed: boolean;
}

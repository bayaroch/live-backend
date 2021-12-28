import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { plainToClass } from 'class-transformer';
import { Users } from 'src/modules/users/entities/users.entity';

@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  public async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.registerService.register(registerUserDto);
    return plainToClass(Users, user);
  }
}

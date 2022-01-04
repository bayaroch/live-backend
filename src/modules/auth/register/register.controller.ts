import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { plainToClass } from 'class-transformer';
import { Users } from 'src/modules/users/entities/users.entity';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/register')
  public async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.registerService.register(registerUserDto);
    return plainToClass(Users, user);
  }

  @Get('/confirm')
  public async confirm(@Query('token') token: string) {
    const user = await this.registerService.confirm(token);
    return plainToClass(Users, user);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Users } from '../shared/users/entities/users.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.authService.register(registerUserDto);
    return plainToClass(Users, user);
  }

  @Get('/confirm')
  public async confirm(@Query('token') token: string) {
    const user = await this.authService.confirm(token);
    return plainToClass(Users, user);
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    const res = await this.authService.login(loginDto);
    return res;
  }

  @Post('/change-password')
  public async changePassword(
    @Res() res,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    try {
      await this.authService.changePassword(changePasswordDto);

      return res.status(HttpStatus.OK).json({
        message: 'Request Change Password Successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Change password failed!',
        status: 400,
      });
    }
  }
}

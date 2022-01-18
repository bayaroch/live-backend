import {
  Controller,
  Put,
  Get,
  Body,
  Res,
  Param,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from './dto/user-profile.dto';
import { IUsers } from './interfaces/users.interface';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getUserList() {
    const users = await this.usersService.getUserList();
    return users;
  }

  @Get('/:userId')
  public async getUser(@Param('userId') userId: string): Promise<IUsers> {
    const user = await this.usersService.findById(userId);
    return plainToClass(UserEntity, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:userId/profile')
  public async updateProfileUser(
    @Res() res,
    @Param('userId') userId: string,
    @Body() userProfileDto: UserProfileDto,
  ): Promise<any> {
    try {
      await this.usersService.updateProfileUser(userId, userProfileDto);

      return res.status(HttpStatus.OK).json({
        message: 'User Updated successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }
}

import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/shared/users/entities/users.entity';
import { UsersService } from 'src/shared/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [ForgotPasswordService, UsersService],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}

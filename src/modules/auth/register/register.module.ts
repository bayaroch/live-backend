import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/users.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [RegisterController],
  providers: [RegisterService, UsersService],
})
export class RegisterModule {}

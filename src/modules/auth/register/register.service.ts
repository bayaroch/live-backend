import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Users } from 'src/modules/users/entities/users.entity';
import { IUsers } from 'src/modules/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
    const confirmToken = this.jwtService.sign(registerUserDto.email);
    this.sendMailRegisterUser(registerUserDto, confirmToken);
    const user = await this.usersService
      .create({ ...registerUserDto, confirmToken })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    return user;
  }

  async confirm(confirmToken: string) {
    try {
      const payload = await this.jwtService.verify(confirmToken);
      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not Found');
      }
      this.usersService.updateProfileUser(user.id, {
        ...user,
        isConfirmed: true,
      });
    } catch (err) {
      throw new UnprocessableEntityException('invalid token');
    }
  }

  private sendMailRegisterUser(
    user: Partial<Users>,
    confirmToken: string,
  ): void {
    const url = process.env.FRONT_URL;
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'from@example.com',
        subject: 'Registration successful ✔',
        text: 'Registration successful!',
        template: './register',
        context: {
          title: 'Registration successfully',
          description:
            "You did it! You registered!, You're successfully registered.✔",
          nameUser: user.email.split('@')[0],
          url: url,
          confirmUrl: `${url}/confirm?token=${confirmToken}`,
          unsubscribeUrl: url,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('User Registration: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('User Registration: Send Mail Failed!');
      });
  }
}

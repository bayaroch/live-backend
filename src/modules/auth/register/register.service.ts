import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);

    // this.sendMailRegisterUser(registerUserDto);
    const user = await this.usersService
      .create(registerUserDto)
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    return user;
  }

  // private sendMailRegisterUser(user): void {
  //   this.mailerService
  //     .sendMail({
  //       to: user.email,
  //       from: 'from@example.com',
  //       subject: 'Registration successful ✔',
  //       text: 'Registration successful!',
  //       template: 'index',
  //       context: {
  //         title: 'Registration successfully',
  //         description:
  //           "You did it! You registered!, You're successfully registered.✔",
  //         nameUser: user.name,
  //       },
  //     })
  //     .then(response => {
  //       console.log(response);
  //       console.log('User Registration: Send Mail successfully!');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       console.log('User Registration: Send Mail Failed!');
  //     });
  // }
}

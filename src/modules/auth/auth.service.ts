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
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { IUsers } from 'src/modules/users/interfaces/users.interface';
import { plainToClass } from 'class-transformer';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(loginDto: LoginDto): Promise<IUsers> {
    return await this.usersService.findByEmail(loginDto.email);
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    return await this.validate(loginDto).then((userData) => {
      if (!userData) {
        throw new UnauthorizedException();
      }
      if (!userData.isConfirmed) {
        throw new UnprocessableEntityException('Email not confirmed');
      }

      const passwordIsValid = bcrypt.compareSync(
        loginDto.password,
        userData.password,
      );

      if (!passwordIsValid == true) {
        return {
          message: 'Authentication failed. Wrong password',
          status: 400,
        };
      }

      const payload = {
        name: userData.name,
        email: userData.email,
        id: userData.id,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        user: plainToClass(Users, userData),
        metadata: {
          accessToken: accessToken,
        },
      };
    });
  }

  public async validateUserByJwt(payload: { email: string }) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  protected createJwtPayload(user) {
    const data: { email: string } = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      token: jwt,
    };
  }

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
      if (user.isConfirmed) {
        throw new UnprocessableEntityException('Already accepted');
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
  public async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    //TODO
    // this.sendMailChangePassword(changePasswordDto);

    return await this.usersService.updateByPassword(
      changePasswordDto.email,
      changePasswordDto.password,
    );
  }

  private sendMailChangePassword(user): void {
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'from@example.com',
        subject: 'Change Password successful ✔',
        text: 'Change Password successful!',
        template: 'index',
        context: {
          title: 'Change Password successful!',
          description:
            'Change Password Successfully! ✔, This is your new password: ' +
            user.password,
          nameUser: user.name,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('Change Password: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('Change Password: Send Mail Failed!');
      });
  }
}

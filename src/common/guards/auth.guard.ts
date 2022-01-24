import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../shared/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MyAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const token = authorization.split(' ')[1];
    try {
      const res = this.jwtService.verify(token);
      const user = await this.userService.findByEmail(res.email);
      if (!user) throw new Error('user not found');
      request.user = user;
      request.jwt_decoded = res;
    } catch (e) {
      throw new UnauthorizedException(
        e.message === 'jwt expired' ? 'expired' : '',
      );
    }
    return true;
  }
}

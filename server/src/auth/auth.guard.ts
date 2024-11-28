import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization token is missing or invalid.',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const secret = 'secret';
      const decoded = jwt.verify(token, secret);

      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Invalid or expired token.',
      );
    }
  }
}

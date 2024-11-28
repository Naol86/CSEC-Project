import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SigninDto } from './dto';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signin(dto: SigninDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      const isPasswordValid = await argon.verify(user.password, dto.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, 'secret', {
        expiresIn: '72h',
      });

      return {
        success: true,
        message: 'Sign-in successful.',
        token,
      };
    } catch (error) {
      console.error('Error during signin:', error.message || error);
      throw error;
    }
  }

  async signup(dto: AuthDto) {
    try {
      const existingUser = await this.prisma.users.findUnique({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email is already in use.');
      }

      const hash = await argon.hash(dto.password);

      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          password: hash,
          name: dto.name,
        },
      });

      const { password, ...safeUser } = user;
      console.log(password);
      return {
        success: true,
        message: 'User registered successfully.',
        user: safeUser,
      };
    } catch (error) {
      console.error('Error during signup:', error.message || error);
      throw new BadRequestException(
        error.message || 'Something went wrong during signup.',
      );
    }
  }
}

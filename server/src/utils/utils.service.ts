import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

interface JwtPayload {
  userId: number;
  email: string;
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration time (timestamp)
}

@Injectable()
export class UtilsService {
  constructor(private prisma: PrismaService) {}

  getClaims(token: string): JwtPayload | null {
    if (!token) {
      return null;
    }

    const [bearer, jwtToken] = token.split(' ');
    if (bearer !== 'Bearer' || !jwtToken) {
      return null;
    }

    try {
      const claims = jwt.verify(jwtToken, 'secret') as JwtPayload;
      return claims;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return null;
    }
  }

  async getLastMessage(chatId: number) {
    return await this.prisma.chat.findMany({
      where: { chat_id: chatId },
      orderBy: { created_at: 'asc' },
      take: 10,
    });
  }
}

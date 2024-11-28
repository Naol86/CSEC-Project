import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ChatModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

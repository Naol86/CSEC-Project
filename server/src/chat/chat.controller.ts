import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UtilsService } from '../utils/utils.service';
import { ChatDto } from './dto';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private utilsService: UtilsService,
  ) {}

  @Get('list')
  list(@Headers('authorization') token: string) {
    const claims = this.utilsService.getClaims(token);
    if (!claims) {
      return { success: false, message: 'Invalid token.' };
    }
    return this.chatService.list(claims.userId);
  }

  @Post('message')
  message(@Headers('authorization') token: string, @Body() body: ChatDto) {
    const claims = this.utilsService.getClaims(token);
    if (!claims) {
      return { success: false, message: 'Invalid token.' };
    }
    return this.chatService.message(claims.userId, body);
  }
}

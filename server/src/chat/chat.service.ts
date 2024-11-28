import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto, MessageDto, Role } from './dto/chat.dto';
import OpenAI from 'openai';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private utils: UtilsService,
  ) {}

  async list(userId: number) {
    const list = await this.prisma.chatUsers.findMany({
      where: { user_id: userId },
    });
    return { success: true, data: list };
  }

  async create(userId: number) {
    const chat = await this.prisma.chatUsers.create({
      data: { user_id: userId },
    });
    return { success: true, data: chat };
  }

  async message(userId: number, body: ChatDto) {
    const message: MessageDto[] = [];

    if (!body.chatId) {
      const chat = await this.create(userId);
      body.chatId = chat.data.chat_id;
    }

    // Fetch last messages for the chatId
    const lastMessages = await this.utils.getLastMessage(body.chatId);
    console.log(lastMessages, 'last messages');

    if (lastMessages && lastMessages.length > 0) {
      lastMessages.forEach((msg) => {
        message.push({
          role: msg.sender === 'USER' ? Role.USER : Role.SYSTEM,
          content: msg.message,
        });
      });
    }

    // Add the new user message
    message.push({
      role: Role.USER, // User's role
      content: body.message,
    });

    // Send the conversation (previous + new message) to the AI
    const response = await this.ai(message);
    let mesId = 0;

    if (response.response) {
      const mes = await this.prisma.chat.create({
        data: {
          chat_id: body.chatId,
          sender: 'USER',
          message: body.message,
        },
      });
      mesId = mes.message_id;

      // Store system response
      await this.prisma.chat.create({
        data: {
          chat_id: body.chatId,
          sender: 'SYSTEM',
          message: response.response.content,
        },
      });
    }

    return {
      chatId: body.chatId,
      messageId: mesId,
      success: true,
      data: response.response.content,
    };
  }

  async ai(message: MessageDto[]) {
    console.log(message);
    const openai = new OpenAI({
      apiKey: '',
      baseURL: 'https://api.x.ai/v1',
    });

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      temperature: 0.5,
      messages: message,
    });

    return {
      response: completion.choices[0].message,
    };
  }
}

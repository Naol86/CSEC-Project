import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const openai = new OpenAI({
      apiKey: '',
      baseURL: 'https://api.x.ai/v1',
    });
    console.log('hello world');

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      messages: [
        {
          role: 'system',
          content:
            "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
        },
        {
          role: 'user',
          content: 'What is the meaning of life, the universe, and everything?',
        },
      ],
    });

    console.log(completion.choices[0].message);

    return 'Hello World!';
  }
}

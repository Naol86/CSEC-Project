import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  async getHello() {
    const openai = new OpenAI({
      apiKey:
        'xai-jzB8UEn1ZsNhxj4rfiQujkit968zgjWHjU8Zt8Bz3DnAGKeH445rWNzBZ5gEpKjI2qKfVoBqj1nmJtNd',
      baseURL: 'https://api.x.ai/v1',
    });
    console.log('hello world');

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content:
            'Create a list of 8 questions for an interview with a science fiction author.',
        },
      ],
    });

    console.log(completion);

    return {
      response: completion.choices[0].message,
    };
  }

  async testMessage(body) {
    const openai = new OpenAI({
      apiKey:
        'xai-jzB8UEn1ZsNhxj4rfiQujkit968zgjWHjU8Zt8Bz3DnAGKeH445rWNzBZ5gEpKjI2qKfVoBqj1nmJtNd',
      baseURL: 'https://api.x.ai/v1',
    });
    console.log('hello world');

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: body.message,
        },
      ],
    });

    console.log(completion);

    return {
      response: completion.choices[0].message,
    };
  }
}

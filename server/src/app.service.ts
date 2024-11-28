import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello() {
    return {
      success: true,
      message: 'hello world',
    };
  }
}

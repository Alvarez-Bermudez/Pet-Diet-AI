import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { GeminiService } from './gemini/gemini.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  // getHello(): string {
  //   return 'Hello World!';
  // }

  async testGemini() {
    return this.gemini.generateContent('Que dia es hoy?');
  }
}

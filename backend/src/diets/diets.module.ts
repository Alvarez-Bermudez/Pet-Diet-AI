import { Module } from '@nestjs/common';
import { DietsService } from './diets.service';
import { DietsController } from './diets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [PrismaModule, GeminiModule],
  controllers: [DietsController],
  providers: [DietsService],
})
export class DietsModule {}

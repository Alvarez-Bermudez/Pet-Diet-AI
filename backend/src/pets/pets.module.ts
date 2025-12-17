import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [PrismaModule, GeminiModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}

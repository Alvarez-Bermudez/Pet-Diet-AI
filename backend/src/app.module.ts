import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
import { WeightsModule } from './weights/weights.module';
import { GeminiModule } from './gemini/gemini.module';
import { DietsModule } from './diets/diets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MenuSchedulerService } from './schedule.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PetsModule,
    UsersModule,
    WeightsModule,
    GeminiModule,
    DietsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, MenuSchedulerService],
})
export class AppModule {}

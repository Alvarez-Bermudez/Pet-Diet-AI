import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
import { WeightsModule } from './weights/weights.module';

@Module({
  imports: [PrismaModule, AuthModule, PetsModule, UsersModule, WeightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

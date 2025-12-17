import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeightEntity } from './entities/weight.entity';

@Injectable()
export class WeightsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, petId: string) {
    const weights = await this.prisma.weightTrack.findMany({
      where: { id: petId },
    });

    return plainToInstance(WeightEntity, weights, {
      excludeExtraneousValues: true,
    });
  }
}

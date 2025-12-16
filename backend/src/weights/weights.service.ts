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
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId, userId },
      select: { userId: true },
    });
    if (!pet) throw new NotFoundException('Pet not found'); // Esto garantiza tambien que algun usuario no pueda acceder a la informacion de cualquier mascota, en caso de que esta pertenezca a otro usuario diferente del mismo

    const weights = await this.prisma.weightTrack.findMany({
      where: { id: petId },
    });

    return plainToInstance(WeightEntity, weights, {
      excludeExtraneousValues: true,
    });
  }
}

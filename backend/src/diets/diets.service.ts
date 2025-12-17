import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DietsService {
  constructor(private prisma: PrismaService) {}

  async getHistory(userId: string, petId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId, userId },
      select: { userId: true },
    });
    if (!pet) throw new NotFoundException('Pet not found'); // Esto garantiza tambien que algun usuario no pueda acceder a la informacion de cualquier mascota, en caso de que esta pertenezca a otro usuario diferente del mismo

    const history = await this.prisma.menuHistory.findMany({
      where: { petId },
      select: { id: true, petId: true, date: true },
    });

    return history;
  }

  async getMenuById(userId: string, petId: string, menuId: string) {}
}

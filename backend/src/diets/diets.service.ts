import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DietsService {
  constructor(private prisma: PrismaService) {}

  async getHistory(userId: string, petId: string) {
    const history = await this.prisma.menuHistory.findMany({
      where: { petId },
      select: { id: true, petId: true, date: true },
    });

    return history;
  }

  async getMenuById(userId: string, petId: string, menuId: string) {
    const menu = await this.prisma.menuHistory.findUnique({
      where: { id: menuId, petId },
    });
    if (!menu) throw new NotFoundException('Menu not found');

    return menu;
  }

  async getDailyNutritionalPlan(userId: string, petId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: {
        id: petId,
        userId,
      },
      select: { dailyNutritionalPlan: true },
    });
    if (!pet) throw new NotFoundException('Pet not found');

    return {
      dailyNutritionalPlan: pet.dailyNutritionalPlan,
    };
  }
}

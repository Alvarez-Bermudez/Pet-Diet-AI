import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getPromptGenerateMenu } from 'src/common/utils/getPromptGenerateMenu.util';
import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DietsService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

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

  async getMenu(userId, petId) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId, userId },
      select: { menu: true },
    });
    if (!pet) throw new NotFoundException('Pet not found');

    return { menu: pet.menu };
  }

  async acceptMenu(userId: string, petId: string) {
    try {
      const pet = await this.prisma.pet.findUnique({
        where: { id: petId },
        select: { menu: true },
      });

      await this.prisma.pet.update({
        where: { id: petId, userId },
        data: { menuAccepted: true },
      });

      if (pet)
        if (pet.menu)
          await this.prisma.menuHistory.create({
            data: {
              petId,
              menu: pet.menu,
            },
          });

      return { menuAccepted: true };
    } catch (e) {
      throw new InternalServerErrorException('Failed to accept menu');
    }
  }

  async generateMenu(userId: string, petId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId, userId },
    });
    if (!pet) throw new NotFoundException('Pet not found');

    const petObject = {
      species: pet.species,
      breed: pet.breed,
      birthDate: pet.birthDate,
      currentWeightKg: pet.currentWeight,
      activityLevel: pet.activityLevel,
    };

    const dailyNutritionalPlan = pet.dailyNutritionalPlan;
    if (!dailyNutritionalPlan)
      throw new InternalServerErrorException(
        'Daily Nutritional Plan not generated yet',
      );

    const prompt = getPromptGenerateMenu(
      dailyNutritionalPlan,
      JSON.stringify(petObject, null, 2),
    );

    const menu = await this.gemini.generateContent(prompt);
    // console.log(`menu:\n${menu}`);

    try {
      await this.prisma.pet.update({
        where: { id: petId, userId },
        data: {
          menu,
          menuAccepted: false,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(
        'Failed to generate menu: Failed to update database',
      );
    }

    return { menu };
  }
}

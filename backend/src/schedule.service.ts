import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { GeminiService } from './gemini/gemini.service';
import { getPromptGenerateMenu } from './common/utils/getPromptGenerateMenu.util';

@Injectable()
export class MenuSchedulerService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyMenuGeneration() {
    const pets = await this.prisma.pet.findMany({
      select: {
        id: true,
        dailyNutritionalPlan: true,
        species: true,
        breed: true,
        birthDate: true,
        currentWeight: true,
        activityLevel: true,
      },
    });

    for (const pet of pets) {
      const petObject = {
        species: pet.species,
        breed: pet.breed,
        birthDate: pet.birthDate,
        currentWeightKg: pet.currentWeight,
        activityLevel: pet.activityLevel,
      };

      const dailyNutritionalPlan = pet.dailyNutritionalPlan;
      if (!dailyNutritionalPlan) continue;

      const prompt = getPromptGenerateMenu(
        dailyNutritionalPlan,
        JSON.stringify(petObject, null, 2),
      );

      const menu = await this.gemini.generateContent(prompt);

      try {
        await this.prisma.pet.update({
          where: { id: pet.id },
          data: {
            menu,
          },
        });
      } catch (e) {
        continue;
      }

      console.log('Updated successfully all menus');
    }
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { PetEntity } from './entities/pet.entity';
import { plainToInstance } from 'class-transformer';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class PetsService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  async findAll(userId: string) {
    const pets = await this.prisma.pet.findMany({
      where: { userId: userId },
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        currentWeight: true,
      },
    });

    return plainToInstance(PetEntity, pets, { excludeExtraneousValues: true });
  }

  async create(userId: string, createPetDto: CreatePetDto) {
    try {
      const { name, species, breed, birthDate, currentWeight, activityLevel } =
        createPetDto;

      const pet = await this.prisma.pet.create({
        data: {
          userId,
          name,
          species,
          breed,
          birthDate: new Date(birthDate),
          currentWeight: Prisma.Decimal(currentWeight),
          activityLevel: activityLevel,
        },
      });

      return plainToInstance(PetEntity, pet, { excludeExtraneousValues: true });
    } catch (e) {
      throw new InternalServerErrorException('Error creating pet');
    }
  }

  async findOne(userId: string, id: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id, userId } });
    if (!pet) throw new NotFoundException('Pet not found');

    return plainToInstance(PetEntity, pet, { excludeExtraneousValues: true });
  }

  async update(userId: string, id: string, updatePetDto: UpdatePetDto) {
    const existingPet = await this.prisma.pet.findUnique({
      where: { id, userId },
    });
    if (!existingPet) throw new NotFoundException('Pet not found');

    const weightChanged =
      updatePetDto.currentWeight !== undefined &&
      updatePetDto.currentWeight != Number(existingPet.currentWeight);

    const activityLevelChanged =
      updatePetDto.activityLevel != undefined &&
      updatePetDto.activityLevel != existingPet.activityLevel;

    try {
      const pet = await this.prisma.pet.update({
        where: { userId, id },
        data: {
          currentWeight: Prisma.Decimal(updatePetDto.currentWeight ?? 0),
          activityLevel: updatePetDto.activityLevel,
        },
      });

      if (weightChanged) {
        //Track weight if changed
        await this.prisma.weightTrack.create({
          data: {
            petId: id,
            weight: Prisma.Decimal(updatePetDto.currentWeight!),
          },
        });
      }

      if (weightChanged || activityLevelChanged) {
        const petObject = {
          species: pet.species,
          breed: pet.breed,
          birthDate: pet.birthDate,
          currentWeightKg: pet.currentWeight,
          activityLevel: pet.activityLevel,
        };

        const prompt = `You are a veterinarian nutritionist. Based on the following pet information, generate a customized Daily Nutritional Plan with calories and macronutrient percentages (protein, fat, carbohydrates). The plan must be appropriate for a pet with *low weight* and intended for healthy weight gain.

Return the result in JSON format like below, but with the values calculated for you. Protein, fat and carbohydrates are a percentage of recommendedCalories:
{
  "recommendedCalories": "600 kcal/day",
  "protein": "33%",
  "fat": "33%",
  "carbohydrates": "34%"
}

Pet info:
${JSON.stringify(petObject, null, 2)}
`;
        const dailyNutritionalPlan = await this.gemini.generateContent(prompt);
        console.log(`Dailt nutr plan:\n${dailyNutritionalPlan}`);

        await this.prisma.pet.update({
          where: { id, userId },
          data: { dailyNutritionalPlan },
        });
      }
    } catch (e) {
      throw new InternalServerErrorException('Error updating pet');
    }

    return {
      message: 'Pet successfully updated',
    };
  }

  async remove(userId: string, id: string) {
    try {
      await this.prisma.pet.delete({ where: { id, userId } });

      return { message: 'Pet successfully deleted' };
    } catch (e) {
      throw new InternalServerErrorException('Error deleting pet');
    }
  }
}

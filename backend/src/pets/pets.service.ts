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

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

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
      updatePetDto.currentWeight != undefined &&
      updatePetDto.currentWeight != Number(existingPet.currentWeight);

    try {
      await this.prisma.pet.update({
        where: { userId, id },
        data: {
          currentWeight: Prisma.Decimal(updatePetDto.currentWeight ?? 0),
          activityLevel: updatePetDto.activityLevel,
          menuAccepted: updatePetDto.menuAccepted,
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
    } catch (e) {
      throw new InternalServerErrorException('Error updating pet');
    }

    return {
      message: 'Pet updated successfully',
    };
  }

  async remove(userId: string, id: string) {
    try {
      await this.prisma.pet.delete({ where: { id, userId } });

      return { message: 'Pet deleted successfully' };
    } catch (e) {
      throw new InternalServerErrorException('Error deleting pet');
    }
  }
}

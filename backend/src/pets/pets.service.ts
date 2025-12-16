import { Injectable, NotFoundException } from '@nestjs/common';
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
    const pet = await this.prisma.pet.create({
      data: {
        userId,
        name: createPetDto.name,
        species: createPetDto.species,
        breed: createPetDto.breed,
        birthDate: new Date(createPetDto.birthDate),
        currentWeight: Prisma.Decimal(createPetDto.currentWeight),
        activityLevel: createPetDto.activityLevel,
      },
    });

    return plainToInstance(PetEntity, pet, { excludeExtraneousValues: true });
  }

  async findOne(userId: string, id: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id, userId } });
    if (!pet) throw new NotFoundException('Pet not found');

    return plainToInstance(PetEntity, pet, { excludeExtraneousValues: true });
  }

  async update(userId: string, id: string, updatePetDto: UpdatePetDto) {
    const pet = await this.prisma.pet.update({
      where: { userId, id },
      data: {
        currentWeight: Prisma.Decimal(updatePetDto.currentWeight ?? 0),
        activityLevel: updatePetDto.activityLevel,
        menuAccepted: updatePetDto.menuAccepted,
      },
    });

    return plainToInstance(PetEntity, pet, { excludeExtraneousValues: true });
  }

  async remove(userId: string, id: string) {
    return 'nothing now';
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

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

    return pets;
  }

  async create(userId: string, createPetDto: CreatePetDto) {
    const pet = this.prisma.pet.create({
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

    return pet;
  }

  async findOne(userId: string, id: string) {
    const pet = this.prisma.pet.findUnique({ where: { id, userId } });

    return pet;
  }
}

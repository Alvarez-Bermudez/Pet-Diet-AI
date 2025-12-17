import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PetOwnershipGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    const petId = request.params.id;

    const pet = await this.prisma.pet.findUnique({
      where: { id: petId, userId },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found or access denied');
    }

    return true;
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMeDto } from './dto/update-me.dto';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return plainToInstance(UserEntity, user, { excludeExtraneousValues: true });
  }

  async updateMe(userId: string, updateMeDto: UpdateMeDto) {
    const cleanData = Object.fromEntries(
      Object.entries(updateMeDto).filter(([_, v]) => v !== ''),
    );

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: cleanData,
      });
    } catch (e) {
      throw new InternalServerErrorException('Error updating database');
    }

    return { message: 'Profile updated' };
  }

  async clearData(userId: string) {
    //Implement later with pets, tracks, etc.
    return { message: 'Data successfully cleaned' };
  }
}

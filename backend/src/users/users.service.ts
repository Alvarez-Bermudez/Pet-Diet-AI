import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const { email, name, phone } = user;
    return {
      name,
      email,
      phone,
    };
  }

  async updateMe(userId: string, updateMeDto: UpdateMeDto) {
    const cleanData = Object.fromEntries(
      Object.entries(updateMeDto).filter(([_, v]) => v !== ''),
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: cleanData,
    });

    return { message: 'Profile updated' };
  }
}

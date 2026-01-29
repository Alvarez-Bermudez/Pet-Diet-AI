import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMeDto } from './dto/update-me.dto';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { DeleteAccountDto } from './dto/delete-account.dto';
import * as bcrypt from 'bcrypt';

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
    try {
      await this.prisma.pet.deleteMany({ where: { userId } });
    } catch (e) {
      throw new InternalServerErrorException('Error updating database');
    }
    return { message: 'Data cleaned successfully' };
  }

  async deleteAccount(userId: string, deleteAccountDto: DeleteAccountDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const match = await bcrypt.compare(
        deleteAccountDto.password,
        user.passwordHash,
      );
      if (!match) throw new UnauthorizedException('Invalid credentials');
      await this.prisma.user.delete({ where: { id: userId } });

      return { message: 'Account succesfully deleted' };
    } catch (e) {
      throw new InternalServerErrorException('Failed to delete account');
    }
  }
}

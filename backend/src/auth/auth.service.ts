import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InvalidPasswordException } from 'src/exceptions/invalid-password.exception';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signUp(data: CreateUserDto) {
    const hash = await bcrypt.hash(data.password, 10);
    const { email, name, phone } = data;
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hash,
        phone,
      },
    });

    return this.createToken(user.id, user.email);
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return this.createToken(user.id, user.email);
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!isMatch) throw new InvalidPasswordException();

    const newHash = await bcrypt.hash(dto.newPassword, 10);

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newHash },
      });
    } catch (e) {
      throw new InternalServerErrorException(
        'Failed to change password. Failed to update database',
      );
    }

    return { message: 'Password successfully updated!' };
  }

  async deleteAccount(userId: string) {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return { message: 'Account successfully deleted' };
    } catch (e) {
      throw new InternalServerErrorException('Error deleting account');
    }
  }

  private createToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}

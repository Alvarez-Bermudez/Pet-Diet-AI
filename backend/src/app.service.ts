import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  // getHello(): string {
  //   return 'Hello World!';
  // }

  putName(): string {
    this.prisma.user.create({ data: { name: 'Pepe' } }).then();
    return 'hi2';
  }
}

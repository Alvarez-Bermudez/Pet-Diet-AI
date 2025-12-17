import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WeightsService } from './weights.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserId } from 'src/decorators/user.decorator';
import { PetOwnershipGuard } from 'src/guards/pet-ownership.guard';

@Controller('pets/:id/weights')
export class WeightsController {
  constructor(private readonly weightsService: WeightsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(PetOwnershipGuard)
  findAll(@UserId() userId: string, @Param('id') petId: string) {
    return this.weightsService.findAll(userId, petId);
  }
}

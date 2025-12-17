import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DietsService } from './diets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserId } from 'src/decorators/user.decorator';
import { PetOwnershipGuard } from 'src/guards/pet-ownership.guard';

@Controller('pets/:id/diets')
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PetOwnershipGuard)
  getHistory(@UserId() userId: string, @Param('id') petId: string) {
    return this.dietsService.getHistory(userId, petId);
  }

  @Get('history/:menu_id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PetOwnershipGuard)
  getMenuById(
    @UserId() userId: string,
    @Param('id') petId: string,
    @Param('menu_id') menuId: string,
  ) {
    return this.dietsService.getMenuById(userId, petId, menuId);
  }

  @Get('daily-nutritional-plan')
  @UseGuards(JwtAuthGuard)
  getDailyNutritionalPlan(
    @UserId() userId: string,
    @Param('id') petId: string,
  ) {
    return this.dietsService.getDailyNutritionalPlan(userId, petId);
  }

  @Get('menu')
  @UseGuards(JwtAuthGuard)
  getMenu(@UserId() userId: string, @Param('id') petId: string) {
    return this.dietsService.getMenu(userId, petId);
  }

  @Post('menu/accept')
  @UseGuards(JwtAuthGuard)
  acceptMenu(@UserId() userId: string, @Param('id') petId: string) {
    return this.dietsService.acceptMenu(userId, petId);
  }

  @Post('menu/generate')
  @UseGuards(JwtAuthGuard)
  generateMenu(@UserId() userId: string, @Param('id') petId: string) {
    return this.dietsService.generateMenu(userId, petId);
  }
}

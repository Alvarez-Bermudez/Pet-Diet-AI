import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DietsService } from './diets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserId } from 'src/decorators/user.decorator';

@Controller('pets/:id/diets')
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Get('history')
  @UseGuards(JwtAuthGuard)
  getHistory(@UserId() userId: string, @Param('id') petId: string) {
    return this.dietsService.getHistory(userId, petId);
  }

  @Get('history/:menu_id')
  @UseGuards(JwtAuthGuard)
  getMenuById(
    @UserId() userId: string,
    @Param('id') petId: string,
    @Param('menu_id') menuId: string,
  ) {
    return this.dietsService.getMenuById(userId, petId, menuId);
  }
}

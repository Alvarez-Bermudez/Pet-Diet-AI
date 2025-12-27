import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserId } from 'src/decorators/user.decorator';
import { UpdateMeDto } from './dto/update-me.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() userId: string) {
    return this.usersService.getMe(userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateMe(@UserId() userId: string, @Body() updateMeDto: UpdateMeDto) {
    return this.usersService.updateMe(userId, updateMeDto);
  }

  @Post('clear-data')
  @UseGuards(JwtAuthGuard)
  clearData(@UserId() userId: string) {
    return this.usersService.clearData(userId);
  }

  @Post('delete-account')
  @UseGuards(JwtAuthGuard)
  deleteAccount(
    @UserId() userId: string,
    @Body() deleteAccountDto: DeleteAccountDto,
  ) {
    return this.usersService.deleteAccount(userId, deleteAccountDto);
  }
}

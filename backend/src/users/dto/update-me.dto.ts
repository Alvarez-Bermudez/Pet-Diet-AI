import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class UpdateMeDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password'] as const),
) {}

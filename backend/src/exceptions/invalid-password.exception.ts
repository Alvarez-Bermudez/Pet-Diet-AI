import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPasswordException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Current password is incorrect',
        error: 'InvalidPassword',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

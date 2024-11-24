import { StatusCodes } from 'http-status-codes';

import AppError from '@/errors/app-error';

export default class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

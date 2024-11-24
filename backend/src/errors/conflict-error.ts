import { StatusCodes } from 'http-status-codes';

import AppError from '@/errors/app-error';

export default class ConflictError extends AppError {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, message);
  }
}

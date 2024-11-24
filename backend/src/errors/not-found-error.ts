import { StatusCodes } from 'http-status-codes';

import AppError from '@/errors/app-error';

export default class NotFoundError extends AppError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

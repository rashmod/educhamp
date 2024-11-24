import { StatusCodes } from 'http-status-codes';

import AppError from '@/errors/app-error';

export default class BadRequestError extends AppError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

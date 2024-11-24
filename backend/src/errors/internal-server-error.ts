import { StatusCodes } from 'http-status-codes';

import AppError from '@/errors/app-error';

export default class InternalServerError extends AppError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

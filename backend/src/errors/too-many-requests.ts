import { StatusCodes } from 'http-status-codes';

import AppError from '@/errors/app-error';

export default class TooManyRequests extends AppError {
  constructor(message: string) {
    super(StatusCodes.TOO_MANY_REQUESTS, message);
  }
}

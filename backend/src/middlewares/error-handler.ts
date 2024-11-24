import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import AppError from '@/errors/app-error';
import ApiResponse from '@/http/api-response';
import handleApiResponse from '@/http/handle-api-response';

export default function errorHandlerMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  console.info('Responding with error response');
  console.error('In Error handler middleware.\n', error);

  if (error instanceof AppError) {
    console.info('Error is an instance of AppError');
    const response = ApiResponse.failure({
      statusCode: error.statusCode,
      message: error.message,
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  } else if (error instanceof ZodError) {
    console.info('Error is an instance of ZodError');
    const response = ApiResponse.failure({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Validation Error',
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  } else {
    console.info('Error is not an instance of AppError');
    const response = ApiResponse.failure({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  }
}

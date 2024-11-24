import { Response } from 'express';

import ApiResponse from '@/http/api-response';

export default function handleApiResponse<T, U>(response: Response, apiResponse: ApiResponse<T, U>) {
  return response.status(apiResponse.statusCode).json(apiResponse.serialize());
}

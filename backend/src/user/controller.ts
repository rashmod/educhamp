import express from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from '@/http/api-response';
import handleApiResponse from '@/http/handle-api-response';
import Service from '@/user/service';

export default class Controller {
  constructor(private readonly service: Service) {}

  register = async (req: express.Request, res: express.Response) => {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    const user = await this.service.register({ name, email, password });

    const response = ApiResponse.success({
      data: user,
      message: 'User created successfully',
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };
}

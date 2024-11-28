import express from 'express';
import { StatusCodes } from 'http-status-codes';

import AuthService from '@/auth/service';
import ApiResponse from '@/http/api-response';
import handleApiResponse from '@/http/handle-api-response';
import Service from '@/user/service';

export default class Controller {
  constructor(
    private readonly service: Service,
    private readonly authService: AuthService
  ) {}

  register = async (req: express.Request, res: express.Response) => {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    const { user, accessToken, refreshToken } = await this.service.register({ name, email, password });

    const response = ApiResponse.success({
      data: { user, accessToken },
      message: 'User created successfully',
      statusCode: StatusCodes.CREATED,
    });

    this.authService.setRefreshCookie(res, refreshToken, 'default');
    handleApiResponse(res, response);
  };

  login = async (req: express.Request, res: express.Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    const { user, accessToken, refreshToken } = await this.service.login({ email, password });

    const response = ApiResponse.success({
      data: { user, accessToken },
      message: 'User logged in successfully',
      statusCode: StatusCodes.OK,
    });

    this.authService.setRefreshCookie(res, refreshToken, 'default');
    handleApiResponse(res, response);
  };

  logout = async (_req: express.Request, res: express.Response) => {
    const response = ApiResponse.success({
      data: null,
      message: 'User Logged Out',
      statusCode: StatusCodes.NO_CONTENT,
    });

    this.authService.setRefreshCookie(res, '', 'now');
    handleApiResponse(res, response);
  };
}

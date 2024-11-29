import express from 'express';
import { StatusCodes } from 'http-status-codes';

import AuthService from '@/auth/service';
import ErrorFactory from '@/errors';
import ApiResponse from '@/http/api-response';
import handleApiResponse from '@/http/handle-api-response';
import UserService from '@/user/service';

export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  register = async (req: express.Request, res: express.Response) => {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    const { user, accessToken, refreshToken } = await this.userService.register({ name, email, password });

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

    const { user, accessToken, refreshToken } = await this.userService.login({ email, password });

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

  refreshToken = async (req: express.Request, res: express.Response) => {
    const token: string | undefined = req.cookies?.refreshToken;

    if (!token) {
      throw ErrorFactory.badRequestError('Refresh Token not found');
    }

    const { accessToken, refreshToken, user } = await this.userService.refreshToken(token);

    this.authService.setRefreshCookie(res, refreshToken, 'default');

    const response = ApiResponse.success({
      data: { accessToken, user },
      message: 'Token refreshed successfully',
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };
}

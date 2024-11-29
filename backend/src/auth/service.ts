import bcrypt from 'bcrypt';
import { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '@/config/env';

const SALT_ROUNDS = 10;
const JWT_ACCESS_EXPIRATION = '30m';

export default class AuthService {
  async hashPassword(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  generateTokens(payload: object) {
    const accessToken = this.generateToken(payload, 'access');
    const refreshToken = this.generateToken(payload, 'refresh');
    return { accessToken, refreshToken };
  }

  verifyToken(token: string, tokenType: 'access' | 'refresh') {
    if (tokenType === 'refresh') {
      return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  }

  setRefreshCookie(res: Response, refreshToken: string, expires: 'now' | 'default') {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      path: '/api/user/refresh-token',
      maxAge: expires === 'now' ? 0 : 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
  }

  private generateToken(payload: object, tokenType: 'access' | 'refresh') {
    if (tokenType === 'refresh') {
      return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
  }
}

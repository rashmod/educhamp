import bcrypt from 'bcrypt';
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

  generateToken(payload: object, tokenType: 'access' | 'refresh') {
    if (tokenType === 'refresh') {
      return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
  }

  verifyToken(token: string, tokenType: 'access' | 'refresh') {
    if (tokenType === 'refresh') {
      return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  }
}

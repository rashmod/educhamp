import AuthService from '@/auth/service';
import ErrorFactory from '@/errors';
import UserRepository from '@/user/repository';

export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async register({ name, email, password }: { name: string; email: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(password);
    const user = await this.userRepository.create({ name, email, password: hashedPassword });

    if (!user) throw ErrorFactory.internalServerError('User not created');

    const { accessToken, refreshToken } = this.authService.generateTokens({ _id: user._id, email: user.email });

    return { user, accessToken, refreshToken };
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw ErrorFactory.notFoundError('User not found');

    const isValidPassword = await this.authService.verifyPassword(password, user.password);

    if (!isValidPassword) throw ErrorFactory.unauthorizedError('Invalid password or email');

    const { accessToken, refreshToken } = this.authService.generateTokens({ _id: user._id, email: user.email });

    return { user, accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const { _id, email } = this.authService.verifyToken(token, 'refresh') as { _id?: string; email?: string };

    if (!_id || !email) throw ErrorFactory.unauthorizedError('Invalid token');

    await this.findById(_id);

    const { accessToken, refreshToken } = this.authService.generateTokens({ _id, email });

    return { accessToken, refreshToken, _id };
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw ErrorFactory.notFoundError('User not found');

    return user;
  }
}

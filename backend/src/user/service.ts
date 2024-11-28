import AuthService from '@/auth/service';
import ErrorFactory from '@/errors';
import Repository from '@/user/repository';

export default class Service {
  constructor(
    private readonly repository: Repository,
    private readonly authService: AuthService
  ) {}

  async register({ name, email, password }: { name: string; email: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(password);
    const user = await this.repository.create({ name, email, password: hashedPassword });

    if (!user) throw ErrorFactory.internalServerError('User not created');

    const { accessToken, refreshToken } = this.authService.generateTokens({ _id: user._id, email: user.email });

    return { user, accessToken, refreshToken };
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.repository.findByEmail(email);

    if (!user) throw ErrorFactory.notFoundError('User not found');

    const isValidPassword = await this.authService.verifyPassword(password, user.password);

    if (!isValidPassword) throw ErrorFactory.unauthorizedError('Invalid password or email');

    const { accessToken, refreshToken } = this.authService.generateTokens({ _id: user._id, email: user.email });

    return { user, accessToken, refreshToken };
  }
}

import ErrorFactory from '@/errors';
import Repository from '@/user/repository';

export default class Service {
  constructor(private readonly repository: Repository) {}

  async register({ name, email, password }: { name: string; email: string; password: string }) {
    const user = await this.repository.create({ name, email, password });

    if (!user) throw ErrorFactory.internalServerError('User not created');

    return user;
  }
}

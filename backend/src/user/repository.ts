import User from './schema';

export default class Respository {
  async create({ name, email, password }: { name: string; email: string; password: string }) {
    return User.create({ name, email, password });
  }

  async findByEmail(email: string) {
    return User.findOne({ email });
  }
}

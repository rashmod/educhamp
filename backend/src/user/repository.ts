import User from './schema';

export default class UserRespository {
  async create({ name, email, password }: { name: string; email: string; password: string }) {
    return User.create({ name, email, password });
  }

  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async findByGoogleId(googleId: string) {
    return User.findOne({ googleId });
  }
}

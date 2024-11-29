import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
});

const User = model<IUser>('User', UserSchema);

export default User;

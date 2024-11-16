import mongoose from 'mongoose';

import env from '@/config/env';

async function connectDB() {
  try {
    await mongoose.connect(env.DB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

export default connectDB;

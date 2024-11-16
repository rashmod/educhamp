import cors from 'cors';
import express from 'express';

import env from '@/config/env';
import connectDB from '@/db';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

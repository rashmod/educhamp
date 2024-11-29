import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import '@/auth/google-strategy';
import env from '@/config/env';
import connectDB from '@/db';
import errorHandler from '@/middlewares/error-handler';
import routes from '@/routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

connectDB();

app.use('/api', routes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

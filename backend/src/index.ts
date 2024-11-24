import cors from 'cors';
import express from 'express';

import env from '@/config/env';
import connectDB from '@/db';
import errorHandler from '@/middlewares/error-handler';
import routes from '@/routes';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', routes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

import express from 'express';

import quiz from '@/quiz/route';

const router = express.Router();

router.use('/quiz', quiz);

export default router;

import express from 'express';

import quiz from '@/quiz/route';
import user from '@/user/route';

const router = express.Router();

router.use('/quiz', quiz);
router.use('/user', user);

export default router;

import express from 'express';

import asyncHandler from '@/lib/async-handler';
import Controller from '@/quiz/controller';
import Repository from '@/quiz/repository';
import Service from '@/quiz/service';

const router = express.Router();

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

router.post('/start', asyncHandler(controller.startQuiz));

router.post('/submit-answer', asyncHandler(controller.submitAnswer));

router.post('/end', asyncHandler(controller.endTest));

export default router;

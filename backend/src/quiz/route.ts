import express from 'express';

import Controller from '@/quiz/controller';
import Repository from '@/quiz/repository';
import Service from '@/quiz/service';

const router = express.Router();

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

router.post('/start', controller.startQuiz);

router.post('/submit-answer', controller.submitAnswer);

router.post('/end', controller.endTest);

export default router;

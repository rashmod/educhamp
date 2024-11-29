import express from 'express';

import asyncHandler from '@/lib/async-handler';
import QuizController from '@/quiz/controller';
import QuizRepository from '@/quiz/repository';
import QuizService from '@/quiz/service';

const router = express.Router();

const quizRepository = new QuizRepository();
const quizService = new QuizService(quizRepository);
const quizController = new QuizController(quizService);

router.post('/start', asyncHandler(quizController.startQuiz));

router.post('/submit-answer', asyncHandler(quizController.submitAnswer));

router.post('/end', asyncHandler(quizController.endTest));

router.get('/user/:userId', asyncHandler(quizController.getUserQuizzes));

router.get('/:quizId/report', asyncHandler(quizController.getReport));

export default router;

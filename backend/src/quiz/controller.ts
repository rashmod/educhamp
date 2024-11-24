import express from 'express';
import { Types } from 'mongoose';

import Service from '@/quiz/service';

export default class Controller {
  constructor(private readonly service: Service) {}

  startQuiz = async (req: express.Request, res: express.Response) => {
    const { userId, grade }: { userId: string; grade: number } = req.body;
    const maxTime = 60 * 20;
    const maxQuestions = 20;

    const quiz = await this.service.createQuiz({ userId, grade, maxTime, maxQuestions });

    res.status(200).json({ ...quiz, maxQuestions, maxTime });
  };

  submitAnswer = async (req: express.Request, res: express.Response) => {
    const { quizId, questionId, optionId }: { quizId: string; questionId: string; optionId: string } = req.body;

    await this.service.submitAnswer({ quizId, questionId, optionId });
    const nextQuestion = await this.service.getNextQuestion(quizId);
    await this.service.addQuestionToQuiz(quizId, (nextQuestion._id as Types.ObjectId).toString());

    res.status(200).json(nextQuestion);
  };

  endTest = async (req: express.Request, res: express.Response) => {
    const { quizId }: { quizId: string } = req.body;

    await this.service.endQuiz(quizId);

    res.status(200).json({});
  };
}

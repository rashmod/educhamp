import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

import ApiResponse from '@/http/api-response';
import handleApiResponse from '@/http/handle-api-response';
import Service from '@/quiz/service';

export default class Controller {
  constructor(private readonly service: Service) {}

  startQuiz = async (req: express.Request, res: express.Response) => {
    const { userId, grade }: { userId: string; grade: number } = req.body;
    const maxTime = 60 * 20;
    const maxQuestions = 20;

    const quiz = await this.service.createQuiz({ userId, grade, maxTime, maxQuestions });

    const response = ApiResponse.success({
      data: { ...quiz, maxQuestions, maxTime },
      message: 'Quiz started',
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };

  submitAnswer = async (req: express.Request, res: express.Response) => {
    const { quizId, questionId, optionId }: { quizId: string; questionId: string; optionId: string } = req.body;

    await this.service.submitAnswer({ quizId, questionId, optionId });
    const nextQuestion = await this.service.getNextQuestion(quizId);
    await this.service.addQuestionToQuiz(quizId, (nextQuestion._id as Types.ObjectId).toString());

    const response = ApiResponse.success({
      data: nextQuestion,
      message: 'Question submitted',
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };

  endTest = async (req: express.Request, res: express.Response) => {
    const { quizId }: { quizId: string } = req.body;

    await this.service.endQuiz(quizId);

    const response = ApiResponse.success({
      data: null,
      message: 'Test ended',
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };

  getReport = async (req: express.Request<{ quizId: string }>, res: express.Response) => {
    const { quizId }: { quizId: string } = req.params;

    const report = await this.service.getReport(quizId);

    const response = ApiResponse.success({
      data: report,
      message: 'Report fetched',
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };
}

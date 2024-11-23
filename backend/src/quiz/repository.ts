import { Types } from 'mongoose';

import Question from '@/quiz/schema/question';
import Quiz, { IQuiz } from '@/quiz/schema/quiz';

export default class Repository {
  async createQuiz({
    userId,
    grade,
    maxTime,
    maxQuestions,
  }: {
    userId: string;
    grade: number;
    maxTime: number;
    maxQuestions: number;
  }) {
    return Quiz.create({ userId, grade, maxTime, maxQuestions, questions: [] });
  }

  async getQuizById(quizId: string) {
    return Quiz.findById(quizId);
  }

  async getQuestionById(questionId: string) {
    return Question.findById(questionId);
  }

  async getQuestions({
    grade,
    excludedIds,
    lowerBound = 0,
    upperBound = Number.MAX_SAFE_INTEGER,
  }: {
    grade: number;
    excludedIds?: string[];
    lowerBound?: number;
    upperBound?: number;
  }) {
    const ids = excludedIds?.map((id) => new Types.ObjectId(id));
    return Question.find({ _id: { $nin: ids }, grade, difficulty: { $gte: lowerBound, $lte: upperBound } });
  }

  async saveQuiz(quiz: IQuiz) {
    await quiz.save();
  }
}

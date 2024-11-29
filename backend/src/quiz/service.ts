import { Types } from 'mongoose';

import ErrorFactory from '@/errors';
import calculateBounds from '@/quiz/lib/calculate-bounds';
import chooseRandom from '@/quiz/lib/choose-random';
import QuizRepository from '@/quiz/repository';
import { IQuestion } from '@/quiz/schema/question';

export default class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

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
    const quiz = await this.quizRepository.createQuiz({ userId, grade, maxTime, maxQuestions });
    const questions = await this.quizRepository.getQuestions({ grade });
    const randomQuestion = chooseRandom(questions);
    await this.addQuestionToQuiz(quiz.id.toString(), randomQuestion.id.toString());

    return { quizId: quiz.id, question: randomQuestion };
  }

  async endQuiz(quizId: string) {
    const quiz = await this.getQuizById(quizId);

    quiz.completed = true;
    await this.quizRepository.saveQuiz(quiz);
  }

  async addQuestionToQuiz(quizId: string, questionId: string) {
    const quiz = await this.getQuizById(quizId);

    const question = await this.getQuestionById(questionId);

    quiz.questions.push({ _id: new Types.ObjectId(questionId) });
    quiz.maxMarks += question.difficulty;
    await this.quizRepository.saveQuiz(quiz);
  }

  async submitAnswer({ quizId, questionId, optionId }: { quizId: string; questionId: string; optionId: string }) {
    const quiz = await this.getQuizById(quizId);

    const question = await this.getQuestionById(questionId);

    const questionIndex = quiz.questions.findIndex((ques) => ques._id.toString() === questionId);
    if (questionIndex === -1) {
      throw ErrorFactory.notFoundError('Question not found');
    }

    const isOptionCorrect = optionId === question.correctAnswerId;

    quiz.questions[questionIndex]!.optionId = optionId;
    quiz.marksObtained += isOptionCorrect ? question.difficulty : 0;

    await this.quizRepository.saveQuiz(quiz);
  }

  async getNextQuestion(quizId: string) {
    const quiz = await this.getQuizById(quizId);

    const { grade, marksObtained, maxMarks, questions } = quiz;

    const efficiency = marksObtained / maxMarks;
    const averageDifficulty = maxMarks / questions.length;
    const delta = 1;
    const { lowerBound, upperBound } = calculateBounds({ difficulty: averageDifficulty, efficiency, delta });

    let possibleQuestions = await this.quizRepository.getQuestions({
      grade,
      lowerBound,
      upperBound,
      excludedIds: questions.map((question) => question._id.toString()),
    });

    if (possibleQuestions.length === 0) {
      possibleQuestions = await this.quizRepository.getQuestions({
        grade,
        excludedIds: questions.map((question) => question._id.toString()),
      });
    }

    if (possibleQuestions.length === 0) {
      possibleQuestions = await this.quizRepository.getQuestions({ grade });
    }

    const randomQuestion = chooseRandom(possibleQuestions);

    return randomQuestion;
  }

  async getReport(quizId: string) {
    const quiz = await this.getQuizById(quizId);
    if (!quiz.completed) {
      throw ErrorFactory.notFoundError('Quiz not completed');
    }

    const quizWithQuestions = (await this.quizRepository.getPopulatedQuiz(quizId))!;
    const report = [];

    for (const question of quizWithQuestions.questions) {
      const { optionId, _id } = question;

      report.push({ question: _id, optionId });
    }

    return { ...quizWithQuestions, questions: report };
  }

  private async getQuizById(quizId: string) {
    const quiz = await this.quizRepository.getQuizById(quizId);
    if (!quiz) {
      throw ErrorFactory.notFoundError('Quiz not found');
    }
    return quiz;
  }

  private async getQuestionById(questionId: string) {
    const question = await this.quizRepository.getQuestionById(questionId);
    if (!question) {
      throw ErrorFactory.notFoundError('Question not found');
    }
    return question;
  }

  async getUserQuizzes(userId: string) {
    const quizzes = await this.quizRepository.getUserQuizzes(userId);

    const res = [];

    for (const quiz of quizzes) {
      // @ts-ignore
      const { _id, grade, questions, maxMarks, createdAt } = quiz;

      const score = questions.reduce((acc, question) => {
        const ques = question._id as unknown as IQuestion;
        const optionId = question.optionId;

        if (!optionId) return acc;
        else if (ques.correctAnswerId === optionId) return acc + ques.difficulty;
        else return acc;
      }, 0);

      res.push({ _id, grade, score, maxMarks, createdAt });
    }

    return res;
  }
}

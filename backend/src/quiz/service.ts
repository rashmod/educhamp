import { Types } from 'mongoose';

import ErrorFactory from '@/errors';
import calculateBounds from '@/quiz/lib/calculate-bounds';
import chooseRandom from '@/quiz/lib/choose-random';
import Repository from '@/quiz/repository';

export default class Service {
  constructor(private readonly repository: Repository) {}

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
    const quiz = await this.repository.createQuiz({ userId, grade, maxTime, maxQuestions });
    const questions = await this.repository.getQuestions({ grade });
    const randomQuestion = chooseRandom(questions);
    await this.addQuestionToQuiz(quiz.id.toString(), randomQuestion.id.toString());

    return { quizId: quiz.id, question: randomQuestion };
  }

  async endQuiz(quizId: string) {
    const quiz = await this.getQuizById(quizId);

    quiz.completed = true;
    await this.repository.saveQuiz(quiz);
  }

  async addQuestionToQuiz(quizId: string, questionId: string) {
    const quiz = await this.getQuizById(quizId);

    const question = await this.getQuestionById(questionId);

    quiz.questions.push({ _id: new Types.ObjectId(questionId) });
    quiz.maxMarks += question.difficulty;
    await this.repository.saveQuiz(quiz);
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

    await this.repository.saveQuiz(quiz);
  }

  async getNextQuestion(quizId: string) {
    const quiz = await this.getQuizById(quizId);

    const { grade, marksObtained, maxMarks, questions } = quiz;

    const efficiency = marksObtained / maxMarks;
    const averageDifficulty = maxMarks / questions.length;
    const delta = 1;
    const { lowerBound, upperBound } = calculateBounds({ difficulty: averageDifficulty, efficiency, delta });

    let possibleQuestions = await this.repository.getQuestions({
      grade,
      lowerBound,
      upperBound,
      excludedIds: questions.map((question) => question._id.toString()),
    });

    if (possibleQuestions.length === 0) {
      possibleQuestions = await this.repository.getQuestions({
        grade,
        excludedIds: questions.map((question) => question._id.toString()),
      });
    }

    if (possibleQuestions.length === 0) {
      possibleQuestions = await this.repository.getQuestions({ grade });
    }

    const randomQuestion = chooseRandom(possibleQuestions);

    return randomQuestion;
  }

  async getReport(quizId: string) {
    const quiz = await this.getQuizById(quizId);
    console.log(quiz);
    if (!quiz.completed) {
      throw ErrorFactory.notFoundError('Quiz not completed');
    }

    const quizWithQuestions = (await this.repository.getPopulatedQuiz(quizId))!;
    const report = [];

    for (const question of quizWithQuestions.questions) {
      const { optionId, _id } = question;

      report.push({ question: _id, optionId });
    }

    return { ...quizWithQuestions, questions: report };
  }

  private async getQuizById(quizId: string) {
    const quiz = await this.repository.getQuizById(quizId);
    if (!quiz) {
      throw ErrorFactory.notFoundError('Quiz not found');
    }
    return quiz;
  }

  private async getQuestionById(questionId: string) {
    const question = await this.repository.getQuestionById(questionId);
    if (!question) {
      throw ErrorFactory.notFoundError('Question not found');
    }
    return question;
  }
}

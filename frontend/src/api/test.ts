import axios from 'axios';

export async function startTestApi(
  userId: string,
  grade: number
): Promise<SuccessResponse<{ quizId: string; maxTime: number; maxQuestions: number; question: Question }>> {
  const response = await axios.post('http://localhost:3000/api/quiz/start', {
    userId,
    grade,
  });

  return response.data;
}

export async function submitAnswerApi(
  testId: string,
  questionId: string,
  optionId: string
): Promise<SuccessResponse<Question>> {
  const response = await axios.post('http://localhost:3000/api/quiz/submit-answer', {
    quizId: testId,
    questionId,
    optionId,
  });

  return response.data;
}

export async function endTestApi(testId: string): Promise<SuccessResponse<null>> {
  const response = await axios.post('http://localhost:3000/api/quiz/end', {
    quizId: testId,
  });

  return response.data;
}

type Question = {
  _id: string;
  question: string;
  image?: string;
  options: {
    text: string;
    id: string;
  }[];
  correctAnswerId: string;
  difficulty: number;
  grade: number;
};

type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  statusCode: number;
};

type ErrorResponse<T> = {
  success: false;
  message: string;
  error: T;
  statusCode: number;
};

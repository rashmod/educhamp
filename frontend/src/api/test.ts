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

export async function getReportApi(testId: string): Promise<SuccessResponse<QuizWithQuestions>> {
  const response = await axios.get(`http://localhost:3000/api/quiz/${testId}/report`);

  return response.data;
}

export async function getUserTestsApi(userId: string): Promise<SuccessResponse<QuizSummary[]>> {
  const response = await axios.get(`http://localhost:3000/api/quiz/user/${userId}`);

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

type Quiz = {
  userId: string;
  questions: { _id: string; optionId?: string }[];
  maxQuestions: number;
  maxTime: number;
  maxMarks: number;
  marksObtained: number;
  completed: boolean;
  grade: number;
  createdAt: string;
  updatedAt: string;
};

type QuizWithQuestions = Omit<Quiz, 'questions'> & { questions: { question: Question; optionId?: string }[] };

type QuizSummary = {
  _id: string;
  grade: number;
  score: number;
  maxMarks: number;
  createdAt: string;
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

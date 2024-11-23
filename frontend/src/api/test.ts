import axios from 'axios';

export async function startTestApi(userId: string, grade: number) {
  const response = await axios.post('http://localhost:3000/api/quiz/start', {
    userId,
    grade,
  });

  return response.data;
}

export async function submitAnswerApi(testId: string, questionId: string, optionId: string) {
  const response = await axios.post('http://localhost:3000/api/quiz/submit-answer', {
    quizId: testId,
    questionId,
    optionId,
  });

  return response.data;
}

export async function endTestApi(testId: string) {
  const response = await axios.post('http://localhost:3000/api/quiz/end', {
    quizId: testId,
  });

  return response.data;
}

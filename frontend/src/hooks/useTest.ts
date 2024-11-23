import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export default function useTest<T extends { _id: string }>({
  startTestApi,
  submitAnswerApi,
  endTestApi,
  maxQuestions = 20,
}: {
  startTestApi: () => Promise<{ quizId: string; question: T }>;
  submitAnswerApi: (testId: string, questionId: string, optionId: string) => Promise<T>;
  endTestApi: (quizId: string) => Promise<void>;
  maxQuestions?: number;
}) {
  const [testId, setTestId] = useState<string | null>(null);
  const hasStarted = useRef(false);

  const [responses, setResponses] = useState<{ questionId: string; optionId: string }[]>([]);
  const [questions, setQuestions] = useState<T[]>([]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data: startData, isLoading: isStarting } = useQuery({
    queryKey: ['start-test'],
    queryFn: () => startTestApi(),
  });

  const { mutate: submitQuestion, isPending: isSubmitting } = useMutation({
    mutationFn: (args: Parameters<typeof submitAnswerApi>) => submitAnswerApi(...args),
    onSuccess: (data) => addQuestion(data),
  });

  const { mutate: endTest, isPending: isEnding } = useMutation({
    mutationFn: endTestApi,
  });

  useEffect(() => {
    if (!hasStarted.current && startData) {
      setTestId(startData.quizId);
      addQuestion(startData.question);
      hasStarted.current = true;
    }
  }, [startData]);

  const question = questions[currentQuestionIdx]!;
  const option = selectedOption || responses[currentQuestionIdx]?.optionId || '';

  const isFirst = currentQuestionIdx === 0;
  const isLast = currentQuestionIdx === maxQuestions - 1;
  const canSubmit = selectedOption !== null;
  const canGoToNext = Boolean(responses[currentQuestionIdx]?.optionId);

  function handleSubmit() {
    if (!selectedOption || !question || !responses[currentQuestionIdx]) return;
    if (!testId) return;

    responses[currentQuestionIdx].optionId = selectedOption;

    submitQuestion([testId, question._id, selectedOption]);
    handleNextQuestion();
  }

  function handleNextQuestion() {
    if (isLast) return;
    setCurrentQuestionIdx((prev) => prev + 1);
    setSelectedOption(null);
  }

  function handlePreviousQuestion() {
    if (isFirst) return;
    setCurrentQuestionIdx((prev) => prev - 1);
    setSelectedOption(null);
  }

  function selectOption(answerId: string) {
    if (Boolean(responses[currentQuestionIdx]?.optionId)) return;
    setSelectedOption(answerId);
  }

  function addQuestion(question: T) {
    setQuestions((prev) => [...prev, question]);
    setResponses((prev) => [...prev, { questionId: question._id, optionId: '' }]);
  }

  return {
    question,
    questionIdx: currentQuestionIdx,
    option,

    isLoading: isStarting || isSubmitting || isEnding,
    isFirst,
    isLast,
    canSubmit,
    canGoToNext,

    selectOption,
    handleSubmit,
    handleNextQuestion,
    handlePreviousQuestion,
    endTest: () => endTest(testId!),
  };
}

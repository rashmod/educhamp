import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function useTest<T extends { id: string }>(
  fetchQuestion: (index: number) => Promise<T>,
  maxQuestions = 20
) {
  const [responses, setResponses] = useState<{ questionId: string; optionId: string }[]>([]);
  const [questions, setQuestions] = useState<T[]>([]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['test', 'question', currentQuestionIdx],
    queryFn: () => fetchQuestion(currentQuestionIdx),
    enabled: currentQuestionIdx < maxQuestions,
  });

  if (data && !questions[currentQuestionIdx]) {
    setQuestions((prev) => [...prev, data]);
    setResponses((prev) => [...prev, { questionId: '', optionId: '' }]);
  }

  const question = questions[currentQuestionIdx]!;
  const option = selectedOption || responses[currentQuestionIdx]?.optionId || '';

  const isFirst = currentQuestionIdx === 0;
  const isLast = currentQuestionIdx === maxQuestions - 1;
  const canSubmit = selectedOption !== null;
  const canGoToNext = Boolean(responses[currentQuestionIdx]?.optionId);

  function handleSubmit() {
    if (!selectedOption || !question || !responses[currentQuestionIdx]) return;

    responses[currentQuestionIdx].questionId = question.id;
    responses[currentQuestionIdx].optionId = selectedOption;

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

  function endTest() {
    alert('test ended');
  }

  return {
    question,
    questionIdx: currentQuestionIdx,
    option,

    isLoading,
    isFirst,
    isLast,
    canSubmit,
    canGoToNext,

    selectOption,
    handleSubmit,
    handleNextQuestion,
    handlePreviousQuestion,
    endTest,
  };
}

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import ActionBar from '@/components/custom/action-bar';
import TestHeader from '@/components/custom/test-head';
import TestOptions from '@/components/custom/test-options';
import TestQuestion from '@/components/custom/test-question';
import test from '@/data/test';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

const testDuration = 60 * 10;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchQuestion(index: number) {
  await sleep(100);
  return test[index];
}

function RouteComponent() {
  const [responses, setResponses] = useState<{ questionId: string; answerId: string }[]>([]);
  const [questions, setQuestions] = useState<typeof test>([]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['test', currentQuestionIdx],
    queryFn: () => fetchQuestion(currentQuestionIdx),
  });

  if (data && !questions[currentQuestionIdx]) {
    setQuestions((prev) => [...prev, data]);
    setResponses((prev) => [...prev, { questionId: '', answerId: '' }]);
  }

  const question = questions[currentQuestionIdx];

  function handleSubmit() {
    if (!selectedOption || !question || !responses[currentQuestionIdx]) return;

    responses[currentQuestionIdx].questionId = question.id;
    responses[currentQuestionIdx].answerId = selectedOption;

    handleNextQuestion();
  }

  function handleNextQuestion() {
    if (currentQuestionIdx === test.length - 1) return;
    setCurrentQuestionIdx((prev) => prev + 1);
    setSelectedOption(null);
  }

  function handlePreviousQuestion() {
    if (currentQuestionIdx === 0) return;
    setCurrentQuestionIdx((prev) => prev - 1);
    setSelectedOption(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <TestHeader
        title="Test"
        timeLeft={testDuration}
        currentQuestion={currentQuestionIdx + 1}
        totalQuestions={test.length}
        endTest={() => {}}
      />

      {isLoading && <div className="text-center text-2xl grid h-full place-items-center bg-red-100">Loading...</div>}

      {data && question && responses[currentQuestionIdx] && (
        <>
          <div className="grid grow grid-cols-2 gap-4">
            <TestQuestion question={question.question} topic={question.topic} image={question.image} />

            <TestOptions
              options={question.options}
              selectedOption={selectedOption || responses[currentQuestionIdx].answerId}
              setSelectedOption={setSelectedOption}
            />
          </div>

          <ActionBar
            isFirst={currentQuestionIdx === 0}
            isLast={currentQuestionIdx === test.length - 1}
            canSubmit={selectedOption !== null}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}

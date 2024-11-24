import { createFileRoute } from '@tanstack/react-router';

import { endTestApi, startTestApi, submitAnswerApi } from '@/api/test';
import ActionBar from '@/components/custom/action-bar';
import TestHeader from '@/components/custom/test-head';
import TestOptions from '@/components/custom/test-options';
import TestQuestion from '@/components/custom/test-question';
import useTest from '@/hooks/useTest';
import useTimer from '@/hooks/useTimer';

export const Route = createFileRoute('/test/')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    maxTime,
    maxQuestions,
    question,
    questionIdx,
    option,
    isStarting,
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
  } = useTest({
    startTestApi: () => startTestApi('67419665614314f4845e645b', 7),
    submitAnswerApi,
    endTestApi,
  });

  const timeLeft = useTimer(maxTime, endTest, !isStarting);

  return (
    <div className="flex flex-col gap-4">
      <TestHeader
        title="Test"
        timeLeft={timeLeft}
        currentQuestion={questionIdx + 1}
        totalQuestions={maxQuestions}
        endTest={endTest}
      />

      {isLoading && <div className="grid h-full place-items-center bg-red-100 text-center text-2xl">Loading...</div>}

      {question && (
        <>
          <div className="grid grow grid-cols-2 gap-4">
            <TestQuestion question={question.question} topic={question.topic} image={question.image} />

            <TestOptions options={question.options} selectedOption={option} setSelectedOption={selectOption} />
          </div>

          <ActionBar
            disablePrevious={isFirst}
            disableNext={isLast || !canGoToNext}
            disableSubmit={!canSubmit}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}

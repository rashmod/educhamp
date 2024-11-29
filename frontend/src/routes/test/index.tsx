import { createFileRoute, useRouter } from '@tanstack/react-router';

import { endTestApi, startTestApi, submitAnswerApi } from '@/api/test';
import ActionBar from '@/components/custom/action-bar';
import TestHeader from '@/components/custom/test-head';
import TestOptions from '@/components/custom/test-options';
import TestQuestion from '@/components/custom/test-question';
import useAuth from '@/contexts/auth/use-auth';
import useTest from '@/hooks/use-test';
import useTimer from '@/hooks/use-timer';

export const Route = createFileRoute('/test/')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    session: { user },
  } = useAuth();

  const {
    maxTime,
    maxQuestions,
    testId,
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
    startTestApi: () => startTestApi(user!._id, user!.grade).then((res) => res.data),
    submitAnswerApi: (...args: Parameters<typeof submitAnswerApi>) => submitAnswerApi(...args).then((res) => res.data),
    endTestApi: (...args: Parameters<typeof endTestApi>) => endTestApi(...args).then((res) => res.data),
  });

  const timeLeft = useTimer(maxTime, () => endTest({}), !isStarting);

  const { navigate } = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <TestHeader
        title="Test"
        timeLeft={timeLeft}
        currentQuestion={questionIdx + 1}
        totalQuestions={maxQuestions}
        endTest={() => {
          endTest({
            onSuccess: () =>
              navigate({
                to: '/test/report/$testId',
                params: { testId: testId! },
              }),
          });
        }}
      />

      {isLoading && <div className="grid h-full place-items-center bg-red-100 text-center text-2xl">Loading...</div>}

      {question && (
        <>
          <div className="grid grow grid-cols-2 gap-4">
            <TestQuestion question={question.question} topic={''} image={question.image} />

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

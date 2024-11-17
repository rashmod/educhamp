import { createFileRoute } from '@tanstack/react-router';

import ActionBar from '@/components/custom/action-bar';
import TestHeader from '@/components/custom/test-head';
import TestOptions from '@/components/custom/test-options';
import TestQuestion from '@/components/custom/test-question';
import test from '@/data/test';
import useTest from '@/hooks/useTest';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

const testDuration = 60 * 10;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchQuestion(index: number) {
  await sleep(100);
  return test[index % test.length]!;
}

function RouteComponent() {
  const maxQuestions = 4;

  const {
    question,
    questionIdx,
    option,
    isLoading,
    isFirst,
    isLast,
    canSubmit,
    selectOption,
    handleSubmit,
    handleNextQuestion,
    handlePreviousQuestion,
  } = useTest(fetchQuestion, maxQuestions);

  return (
    <div className="flex flex-col gap-4">
      <TestHeader
        title="Test"
        timeLeft={testDuration}
        currentQuestion={questionIdx + 1}
        totalQuestions={maxQuestions}
        endTest={() => {}}
      />

      {isLoading && <div className="text-center text-2xl grid h-full place-items-center bg-red-100">Loading...</div>}

      {question && (
        <>
          <div className="grid grow grid-cols-2 gap-4">
            <TestQuestion question={question.question} topic={question.topic} image={question.image} />

            <TestOptions options={question.options} selectedOption={option} setSelectedOption={selectOption} />
          </div>

          <ActionBar
            isFirst={isFirst}
            isLast={isLast}
            canSubmit={canSubmit}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

import { getReportApi } from '@/api/test';
import TestOptions from '@/components/custom/test-options';
import TestQuestion from '@/components/custom/test-question';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import formatDuration from '@/lib/format-duration';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/test/report/$testId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { testId } = useParams({
    from: '/test/report/$testId',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['test-report', testId],
    queryFn: () => getReportApi(testId),
  });

  if (isLoading) return <div className="h-full bg-red-50 text-center">Loading...</div>;

  if (!data) return <div className="h-full bg-red-50 text-center">Error: {error?.message}</div>;

  let attempted = 0;
  let score = 0;
  let correct = 0;
  let incorrect = 0;

  for (const question of data.data.questions) {
    if (question.optionId) {
      attempted++;
      if (question.optionId === question.question.correctAnswerId) {
        score++;
        correct++;
      } else {
        incorrect++;
      }
    }
  }

  const timeTaken = Math.floor(
    (new Date(data.data.updatedAt).getTime() - new Date(data.data.createdAt).getTime()) / 1000
  );

  return (
    <div className="flex flex-col">
      <Card className="mb-4">
        <CardHeader className="text-center">
          <CardTitle className="font-bold">Test Report</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-2">
          <div className="[&>div]:grid [&>div]:grid-cols-2">
            <div>
              <span>Grade:</span>
              <span>{data.data.grade}</span>
            </div>

            <div>
              <span>Attempted on:</span>
              <span className="text-nowrap">{new Date(data.data.updatedAt).toLocaleString()}</span>
            </div>

            <div>
              <span>Attempted:</span>
              <span>
                {attempted} / {data.data.questions.length}
              </span>
            </div>

            <div>
              <span>Max Questions:</span>
              <span>{data.data.maxQuestions}</span>
            </div>

            <div>
              <span>Max Time:</span>
              <span>{formatDuration(data.data.maxTime)}</span>
            </div>
          </div>

          <div className="col-start-4 [&>div]:grid [&>div]:grid-cols-2">
            <div>
              <span>Time taken:</span>
              <span>{formatDuration(timeTaken)}</span>
            </div>

            <div>
              <span>Correct:</span>
              <span>
                {correct} / {data.data.questions.length}
              </span>
            </div>

            <div>
              <span>Incorrect:</span>
              <span>
                {incorrect} / {data.data.questions.length}
              </span>
            </div>

            <div>
              <span>Percentage:</span>
              <span>{((score / data.data.maxMarks) * 100).toFixed(2)}%</span>
            </div>

            <div>
              <span>Score:</span>
              <span>
                {score} / {data.data.maxMarks}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grow gap-4">
        {data.data.questions.map(({ question, optionId }, index) => (
          <Card key={index}>
            <CardHeader className="grid grid-cols-2 gap-4">
              <TestQuestion question={question.question} topic={question.topic} image={question.image} />
              <TestOptions
                options={question.options}
                selectedOption={optionId ?? ''}
                correctOptionId={question.correctAnswerId}
              />
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Your answer:
                    <span className="ml-2 font-medium">
                      {optionId ? question.options.find((option) => option.id === optionId)!.text : 'Not submitted'}
                    </span>
                  </p>
                  <p>
                    Correct answer:
                    <span className="ml-2 font-medium">
                      {question.options.find((option) => option.id === question.correctAnswerId)!.text}
                    </span>
                  </p>
                  <p>
                    Score:
                    <span
                      className={cn('ml-2 font-bold', {
                        'text-chart-2': question.correctAnswerId === optionId,
                        'text-chart-1': question.correctAnswerId !== optionId,
                      })}
                    >
                      {question.correctAnswerId === optionId ? question.difficulty : '0'}
                    </span>
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

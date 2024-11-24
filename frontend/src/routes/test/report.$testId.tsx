import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

import { getReportApi } from '@/api/test';
import TestOptions from '@/components/custom/test-options';
import TestQuestion from '@/components/custom/test-question';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/test/report/$testId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { testId } = useParams({
    from: '/test/report/$testId',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['test-report', testId],
    queryFn: () => getReportApi(testId),
  });

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-center text-2xl font-bold">Test Report</h2>
        <p className="text-center text-muted-foreground">Test taken on {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grow gap-4">
        {isLoading && <div className="h-full bg-red-50 text-center">Loading...</div>}
        {data &&
          data.data.questions.map(({ question, optionId }, index) => (
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

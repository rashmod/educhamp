import { createFileRoute } from '@tanstack/react-router';

import TestOptions from '@/components/custom/test-options';
import TestQuestion from '@/components/custom/test-question';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import test from '@/data/test';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/test/report/$testId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-center text-2xl font-bold">Test Report</h2>
        <p className="text-center text-muted-foreground">Test taken on {new Date().toLocaleString()}</p>
      </div>

      <div className="grid gap-4">
        {test.map((question, index) => (
          <Card key={index}>
            <CardHeader className="grid grid-cols-2 gap-4">
              <TestQuestion question={question.question} topic={question.topic} image={question.image} />
              <TestOptions
                options={question.options}
                selectedOption={question.selectedAnswerId ?? ''}
                correctOptionId={question.correctAnswerId}
              />
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your answer: {question.selectedAnswerId ?? 'Not submitted'}</p>
                  <p>Correct answer: {question.correctAnswerId}</p>
                  <p>
                    Score:
                    <span
                      className={cn('ml-2 font-bold', {
                        'text-chart-2': question.correctAnswerId === question.selectedAnswerId,
                        'text-chart-1': question.correctAnswerId !== question.selectedAnswerId,
                      })}
                    >
                      {question.correctAnswerId === question.selectedAnswerId ? '2' : '0'}
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

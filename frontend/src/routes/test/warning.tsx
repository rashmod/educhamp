import { Link, createFileRoute } from '@tanstack/react-router';
import { CircleAlert, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/test/warning')({
  component: RouteComponent,
});

function RouteComponent() {
  const maxQuestions = 20;
  const testDuration = 60 * 20;
  const instructions = getInstructions(maxQuestions, testDuration);

  return (
    <div>
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle>Before starting the test</CardTitle>
          <CardDescription>Read the instruction carefully</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className={cn('grid grid-cols-12', { 'text-destructive': instruction.type === 'warning' })}
            >
              {instruction.type === 'warning' && <CircleAlert className="w-10" />}
              {instruction.type === 'info' && <Info className="w-10" />}
              <p className="col-span-11">{instruction.text}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to="/">
            <Button variant="secondary">Go back</Button>
          </Link>
          <Link to="/test">
            <Button>Begin the test</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

function getInstructions(maxQuestions: number, testDuration: number) {
  return [
    { text: `The test will have ${maxQuestions} questions.`, type: 'info' },
    { text: `You have ${Math.floor(testDuration / 60)} minutes to complete the test.`, type: 'info' },
    { text: 'You cannot go to next question without submitting the current question.', type: 'info' },
    { text: 'You can submit the test at any time.', type: 'info' },
    { text: 'The questions are randomized.', type: 'info' },
    {
      text: 'This is a computerized adaptive test. The difficulty level of the questions will change as per your performance.',
      type: 'info',
    },
    { text: 'You cannot change your answer once submitted.', type: 'warning' },
    { text: 'The test will automatically end once the time is up.', type: 'warning' },
  ] as const;
}

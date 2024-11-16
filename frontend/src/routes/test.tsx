import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import ActionBar from '@/components/custom/action-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import test from '@/data/test';
import formatDuration from '@/lib/format-duration';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

const testDuration = 60 * 10;

function RouteComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = test[currentQuestion];

  function handleNextQuestion() {
    if (currentQuestion === test.length - 1) return;
    setCurrentQuestion((prev) => prev + 1);
  }

  function handlePreviousQuestion() {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="col-span-2 h-min">
        <CardHeader>
          <CardTitle className="flex justify-between ">
            <div className="text-2xl">Test</div>
            <Button variant="destructive" size="sm">
              End test
            </Button>
          </CardTitle>
          <CardDescription className="flex items-end justify-between">
            <div>Question 1 of {test.length}</div>
            <div>
              Time left:
              <span className={cn('ml-2 text-3xl font-mono', { 'text-red-600': testDuration <= 60 })}>
                {formatDuration(testDuration)}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grow grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-xl">{question.question}</CardTitle>
            <CardDescription>
              <Badge>{question.topic}</Badge>
            </CardDescription>
          </CardHeader>
          {question.image && (
            <CardContent className="flex justify-center items-center">
              <img src={question.image} alt="Placeholder" className="w-full" />
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-lg">Choose an option</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <RadioGroup>
              {question.options.map((option) => (
                <Label
                  htmlFor={`option-${option.id}`}
                  className="flex items-center gap-4 cursor-pointer border rounded px-4 py-2"
                >
                  <RadioGroupItem value={`option-${option.id}`} id={`option-${option.id}`} />
                  <div className="text-base">{option.text}</div>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <ActionBar
        isFirst={currentQuestion === 0}
        isLast={currentQuestion === test.length - 1}
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
      />
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import formatDuration from '@/lib/format-duration';
import { cn } from '@/lib/utils';

export default function TestHeader({
  title,
  currentQuestion,
  totalQuestions,
  timeLeft,
  endTest,
}: {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  endTest: () => void;
}) {
  return (
    <Card className="col-span-2 h-min">
      <CardHeader>
        <CardTitle className="flex justify-between ">
          <div className="text-2xl">{title}</div>
          <Button variant="destructive" size="sm" onClick={endTest}>
            End test
          </Button>
        </CardTitle>
        <CardDescription className="flex items-end justify-between">
          <div>
            Question {currentQuestion} of {totalQuestions}
          </div>
          <div>
            Time left:
            <span className={cn('ml-2 text-3xl font-mono', { 'text-red-600': timeLeft <= 60 })}>
              {formatDuration(timeLeft)}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
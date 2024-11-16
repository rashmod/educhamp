import { createFileRoute } from '@tanstack/react-router';

import ActionBar from '@/components/custom/action-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
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
          <CardDescription className="flex justify-between">
            <div>Question 1 of 10</div>
            <div>Time left: 1:00</div>
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grow grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-xl">find x if 2x + 3 = 5</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-lg">Choose an option</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <RadioGroup>
              {new Array(4).fill(0).map((_, index) => (
                <Label
                  htmlFor={`option-${index + 1}`}
                  className="flex items-center gap-4 cursor-pointer border rounded px-4 py-2"
                >
                  <RadioGroupItem value={`option-${index + 1}`} id={`option-${index + 1}`} />
                  <div className="text-base">
                    Option {index + 1} lorem ipsum dolor sit amet consectetur adipiscing elitOption {index + 1} lorem
                    ipsum dolor sit amet consectetur adipiscing elit Option {index + 1} lorem ipsum dolor sit amet
                    consectetur adipiscing elit{' '}
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <ActionBar isFirst isLast />
    </div>
  );
}

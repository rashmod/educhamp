import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export default function TestOptions({
  options,
  selectedOption,
  setSelectedOption,
  correctOptionId,
}: {
  options: { id: string; text: string; image?: string }[];
  selectedOption: string;
  setSelectedOption?: (optionId: string) => void;
  correctOptionId?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">Choose an option</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <RadioGroup
          onValueChange={(e) => {
            if (setSelectedOption) setSelectedOption(e);
          }}
          value={selectedOption}
        >
          {options.map((option) => (
            <Label
              key={option.id}
              htmlFor={`option-${option.id}`}
              className={cn('flex cursor-pointer items-center gap-4 rounded-md border px-4 py-2', {
                outline: selectedOption === option.id,
                'bg-chart-1': correctOptionId && correctOptionId !== option.id && selectedOption === option.id,
                'bg-chart-2': correctOptionId && correctOptionId === option.id,
              })}
            >
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <div className="flex flex-col gap-2">
                <div
                  className={cn('text-base', {
                    'text-primary-foreground':
                      correctOptionId && (correctOptionId === option.id || selectedOption === option.id),
                  })}
                >
                  {option.text}
                </div>
                <img src={option.image} className="max-w-40" />
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

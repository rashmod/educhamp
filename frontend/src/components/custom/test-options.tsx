import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export default function TestOptions({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: { id: string; text: string; image?: string }[];
  selectedOption: string;
  setSelectedOption: (optionId: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-lg">Choose an option</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <RadioGroup onValueChange={(e) => setSelectedOption(e)} value={selectedOption}>
          {options.map((option) => (
            <Label
              key={option.id}
              htmlFor={`option-${option.id}`}
              className={cn('flex items-center gap-4 cursor-pointer border rounded-md px-4 py-2', {
                outline: selectedOption === option.id,
              })}
            >
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <div className="flex flex-col gap-2">
                <div className="text-base">{option.text}</div>
                <img src={option.image} className="max-w-40" />
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

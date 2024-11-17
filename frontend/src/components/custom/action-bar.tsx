import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ActionBar({
  className,
  disablePrevious,
  disableNext,
  disableSubmit,
  onNext,
  onPrevious,
  onSubmit,
}: {
  className?: string;
  disablePrevious: boolean;
  disableNext: boolean;
  disableSubmit: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}) {
  return (
    <div
      className={cn(
        'sticky grid grid-cols-3 gap-8 mx-auto bottom-5 z-50 justify-self-center rounded-md border px-10 py-3 shadow-lg bg-background',
        className
      )}
    >
      <Button variant="outline" size="sm" disabled={disablePrevious} onClick={onPrevious}>
        Previous
      </Button>

      <Button variant="default" size="sm" disabled={disableSubmit} onClick={onSubmit}>
        Submit
      </Button>

      <Button variant="outline" size="sm" disabled={disableNext} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

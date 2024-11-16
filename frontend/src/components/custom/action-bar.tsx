import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ActionBar({
  className,
  isFirst,
  isLast,
  onNext,
  onPrevious,
}: {
  className?: string;
  isFirst: boolean;
  isLast: boolean;
  onNext: () => void;
  onPrevious: () => void;
}) {
  return (
    <div
      className={cn(
        'sticky grid grid-cols-3 gap-8 mx-auto bottom-5 z-50 justify-self-center rounded-md border px-10 py-3 shadow-lg bg-background',
        className
      )}
    >
      <Button variant="outline" size="sm" disabled={isFirst} onClick={onPrevious}>
        Previous
      </Button>

      <Button variant="default" size="sm">
        Submit
      </Button>

      <Button variant="outline" size="sm" disabled={isLast} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

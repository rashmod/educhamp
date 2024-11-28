import { useEffect, useState } from 'react';

export default function useTimer(duration: number | undefined, handleEnd: () => void, start: boolean) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!start) return;
    if (duration === undefined) return;
    if (timeLeft === undefined) {
      setTimeLeft(duration);
      return;
    }

    if (timeLeft <= 0) {
      handleEnd();
      return;
    }

    const interval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft((prev) => prev! - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, start, duration]);

  return timeLeft;
}

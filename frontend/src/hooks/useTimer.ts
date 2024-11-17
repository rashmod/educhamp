import { useEffect, useState } from 'react';

export default function useTimer(duration: number, handleEnd: () => void) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleEnd();
      return;
    }

    const interval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return timeLeft;
}

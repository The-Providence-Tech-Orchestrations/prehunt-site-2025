// src/components/CountdownTimer.tsx
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  endText: string;
  className: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, endText, className }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time: number) => String(time).padStart(2, "0");

  return (
    <div className={className}>
      {timeLeft ? (
        <p className="font-mono">
          {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
          {formatTime(timeLeft.seconds)}
        </p>
      ) : (
        <a
          href="puzzles"
          className="px-4 py-2 font-bold rounded-md transition-all duration-300 ease-in-out hover:border-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:text-[4rem]"
        >
          LET'S HEIST!!
        </a>
      )}
    </div>
  );
};

export default CountdownTimer;

// src/components/CountdownTimer.tsx
import React, { useEffect, useState } from 'react';

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

  const formatTime = (time: number) => String(time).padStart(2, '0');

  return (
    <div className={className}>
      {timeLeft ? (
        <p className='font-mono'>
          {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </p>
      ) : (
        <p>{endText}</p>
      )}
    </div>
  );
};

export default CountdownTimer;

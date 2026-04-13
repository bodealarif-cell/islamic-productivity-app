import React, { useState, useEffect, useRef } from 'react';

const FlipClock = ({ timeInSeconds, onTimeUpdate }) => {
  const [displayTime, setDisplayTime] = useState(timeInSeconds);
  const prevTimeRef = useRef(timeInSeconds);

  useEffect(() => {
    setDisplayTime(timeInSeconds);
  }, [timeInSeconds]);

  const getTimeComponents = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: String(hrs).padStart(2, '0'),
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = getTimeComponents(displayTime);

  const FlipDigit = ({ value, prevValue }) => {
    const [isFlipping, setIsFlipping] = useState(false);
    const digitRef = useRef(null);

    useEffect(() => {
      if (value !== prevValue) {
        setIsFlipping(true);
        const timer = setTimeout(() => setIsFlipping(false), 300);
        return () => clearTimeout(timer);
      }
    }, [value, prevValue]);

    return (
      <div className="relative inline-block">
        <div
          ref={digitRef}
          className={`font-mono font-bold text-5xl md:text-7xl text-white neon-text transition-all duration-300 ${
            isFlipping ? 'animate-flip' : ''
          }`}
        >
          {value}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 p-6 bg-gradient-to-br from-secondary/50 to-primary/30 rounded-2xl">
      <div className="text-center">
        <FlipDigit value={hours} prevValue={getTimeComponents(prevTimeRef.current).hours} />
        <p className="text-textSecondary text-xs mt-2">ساعات</p>
      </div>
      <span className="text-5xl md:text-7xl text-accent font-bold animate-pulse">:</span>
      <div className="text-center">
        <FlipDigit value={minutes} prevValue={getTimeComponents(prevTimeRef.current).minutes} />
        <p className="text-textSecondary text-xs mt-2">دقائق</p>
      </div>
      <span className="text-5xl md:text-7xl text-accent font-bold animate-pulse">:</span>
      <div className="text-center">
        <FlipDigit value={seconds} prevValue={getTimeComponents(prevTimeRef.current).seconds} />
        <p className="text-textSecondary text-xs mt-2">ثواني</p>
      </div>
    </div>
  );
};

export default FlipClock;

import React, { useState, useEffect, useRef } from 'react';

const FlipClock = ({ timeInSeconds, onTimeUpdate }) => {
  const [displayTime, setDisplayTime] = useState(timeInSeconds);
  const prevTimeRef = useRef(timeInSeconds);

  useEffect(() => {
    setDisplayTime(timeInSeconds);
    prevTimeRef.current = timeInSeconds;
  }, [timeInSeconds]);

  const getTimeComponents = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours: String(hrs % 12 || 12).padStart(2, '0'),
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0'),
    };
  };

  const currentTime = getTimeComponents(displayTime);
  const prevTime = getTimeComponents(prevTimeRef.current);
  
  prevTimeRef.current = displayTime;

  const FlipDigit = ({ value, prevValue, isChanging }) => {
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
      if (isChanging) {
        setIsFlipping(true);
        const timer = setTimeout(() => setIsFlipping(false), 400);
        return () => clearTimeout(timer);
      }
    }, [isChanging]);

    return (
      <div className="relative inline-block w-20 h-24 md:w-32 md:h-40 perspective">
        <div
          className={`font-mono font-bold text-5xl md:text-7xl text-accent flex items-center justify-center h-full transition-all duration-400 ${
            isFlipping ? 'transform -rotate-360 opacity-70' : 'transform rotate-0 opacity-100'
          }`}
          style={isFlipping ? {
            transform: 'rotateX(90deg)',
            transitionProperty: 'transform, opacity'
          } : {
            transform: 'rotateX(0deg)',
            transitionProperty: 'transform, opacity'
          }}
        >
          {value}
        </div>
      </div>
    );
  };

  const isHourChanging = currentTime.hours !== prevTime.hours;
  const isMinuteChanging = currentTime.minutes !== prevTime.minutes;
  const isSecondChanging = currentTime.seconds !== prevTime.seconds;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 p-6 bg-gradient-to-br from-secondary/50 to-primary/30 rounded-2xl">
      {/* Hours */}
      <div className="text-center">
        <FlipDigit 
          value={currentTime.hours} 
          prevValue={prevTime.hours}
          isChanging={isHourChanging}
        />
        <p className="text-textSecondary text-xs mt-2">ساعات</p>
      </div>

      {/* Separator */}
      <span className="text-5xl md:text-7xl text-accent font-bold animate-pulse">:</span>

      {/* Minutes */}
      <div className="text-center">
        <FlipDigit 
          value={currentTime.minutes} 
          prevValue={prevTime.minutes}
          isChanging={isMinuteChanging}
        />
        <p className="text-textSecondary text-xs mt-2">دقائق</p>
      </div>

      {/* Separator */}
      <span className="text-5xl md:text-7xl text-accent font-bold animate-pulse">:</span>

      {/* Seconds */}
      <div className="text-center">
        <FlipDigit 
          value={currentTime.seconds} 
          prevValue={prevTime.seconds}
          isChanging={isSecondChanging}
        />
        <p className="text-textSecondary text-xs mt-2">ثواني</p>
      </div>
    </div>
  );
};

export default FlipClock;

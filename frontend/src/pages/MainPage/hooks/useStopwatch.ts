import { useRef, useState } from 'react';

export const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStopwatch = () => {
    // 시작
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      // 정지
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  // 시간 형식 변환
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000); // 1시간 = 3600초
    const minutes = Math.floor((time % 3600000) / 60000); // 1분 = 60초
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')}`;
  };

  return { startStopwatch, formatTime, time };
};

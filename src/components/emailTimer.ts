import React, { useState, useEffect } from "react";

export const EmailTimer = ({ initialTime }: { initialTime: number }) => {
  const [remainingTime, setRemainingTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, remainingTime]);

  const startTimer = () => {
    setIsActive(true);
    setRemainingTime(initialTime);
  };

  const stopTimer = () => {
    setIsActive(false);
    setRemainingTime(initialTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return {
    remainingTime,
    startTimer,
    stopTimer,
    formatTime,
  };
};

export default EmailTimer;

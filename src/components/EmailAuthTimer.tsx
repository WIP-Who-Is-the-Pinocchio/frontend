import React, { useState, useEffect } from "react";

const EmailAuthTimer = () => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          setSeconds(0);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 타이머 kill
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <p className="text-red-500">{formatTime(seconds)}</p>
    </div>
  );
};

export default EmailAuthTimer;

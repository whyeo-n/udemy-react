import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("Setting timeout");
    const timer  = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    console.log("Setting Interval");
    const interval = setInterval(() => {
      setRemainingTime((preRemaningTime) => preRemaningTime - 100);
    }, 100);

    // 현재 interval을 지워서, 다음 interval이 새롭게 시작되도록 하는 함수
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}

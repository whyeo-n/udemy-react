import { useState, useEffect } from "react";

// Interval이 설정된 항목은 계속 렌더링되기 때문에, 성능을 위해서 분리하는 것이 좋다.
export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval activated");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}

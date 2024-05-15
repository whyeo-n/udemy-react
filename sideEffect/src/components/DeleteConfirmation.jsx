import { useEffect } from "react";

import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log("Set Timer");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      console.log("Clear Timer");
      clearTimeout(timer);
    };
    // 함수는 함수의 결과값인 객체로 취급함.
    // 함수는 App이 실행될 때마다 다시 동작함.
    // 다시 생성된 함수는 이전 함수와 동일하지 않음.
    // 함수를 의존성으로 넣는 경우 useCallback을 사용해야 함.
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}

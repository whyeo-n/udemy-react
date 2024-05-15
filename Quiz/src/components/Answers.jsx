import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        // 이번에 선택한 답이 현재 답변이 맞는지 체크
        const isSelected = selectedAnswer === answer;
        // cssClass 초기화
        let cssClass = "";

        // 답변 상태가 답변함이고 선택한 항목이 맞는 경우
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        // 답변 상태가 정답이거나, 오답이고 선택한 항목인 경우
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

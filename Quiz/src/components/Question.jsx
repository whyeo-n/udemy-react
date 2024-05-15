import { useState } from "react";

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: true,
      });
    }, 1000);
  }
  return (
    <div id="question">
      {/* Timeout되면, 어떠한 답도 입력되지 않도록 Null을 넣어줌. */}
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

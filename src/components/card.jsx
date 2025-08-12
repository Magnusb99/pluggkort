import { useState, useEffect } from "react";

function Card({ courseName, questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [rotateY, setRotateY] = useState(false);
  const [next, setNext] = useState(false);

  const currentQuestion = questions[currentIndex];
  const key = Object.keys(currentQuestion)[0];
  const value = currentQuestion[key];

  function showAnswer() {
    setRotateY(true); // start fade out
    setTimeout(() => {
      setShow((prev) => !prev); // byt innehåll
      setRotateY(false); // fade in
    }, 300); // matcha transition-tid
  }

  function nextQuestion() {
    setNext(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % questions.length);
      setShow(false);
      setNext(false);
    }, 300);
  }
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        nextQuestion();
      } else if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        showAnswer();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [questions.length]);

  return (
    <div className="cardWrap">
      <h2>{courseName}</h2>

      <div
        className={`card fade ${rotateY ? "out" : ""} ${next ? "next" : ""}`}
        onClick={showAnswer}
      >
        {show ? (
          <p className="answer">
            Svar:
            <br />
            <br />
            {value}
          </p>
        ) : (
          <p className="question">
            Fråga:
            <br />
            <br />
            {key}
          </p>
        )}
      </div>

      <button className="btn cardBtn" onClick={nextQuestion}>
        Nästa fråga
      </button>
    </div>
  );
}

export default Card;

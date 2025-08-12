import { useState, useEffect } from "react";

function Card({ courseName, questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);

  const currentQuestion = questions[currentIndex];
  const key = Object.keys(currentQuestion)[0];
  const value = currentQuestion[key];

  function showAnswer() {
    setShow(!show);
  }

  function nextQuestion() {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
    setShow(false);
  }
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        nextQuestion();
      } else if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        setShow((prev) => !prev);
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

      <div className="card" onClick={showAnswer}>
        {show ? (
          <p>
            Svar:
            <br />
            {value}
          </p>
        ) : (
          <p className="question">
            Fråga:
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

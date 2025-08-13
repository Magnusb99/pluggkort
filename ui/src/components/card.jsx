import { useState, useEffect } from "react";

function Card({ courseName, questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [rotateY, setRotateY] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

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
  function prevQuestion() {
    setPrev(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + questions.length) % questions.length
      );
      setShow(false);
      setPrev(false);
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
        className={`card fade ${rotateY ? "out" : ""} ${next ? "next" : ""} ${
          prev ? "prev" : ""
        }`}
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
      <div className="arrowWrap">
        <button className="btn cardBtn" onClick={prevQuestion}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#000000"
          >
            <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
          </svg>
        </button>
        <button className="btn cardBtn" onClick={nextQuestion}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#000000"
          >
            <path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;

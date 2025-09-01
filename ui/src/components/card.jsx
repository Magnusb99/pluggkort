import { useState, useEffect } from "react";

function Card({ courseName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [rotateY, setRotateY] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [questions, setQuestions] = useState([]);
  const width = (currentIndex / questions.length) * 100;
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
  }, []);
  useEffect(() => {
    if (!courseName) return;

    async function fetchQuestions() {
      try {
        const response = await fetch(
          `https://ezplugg.onrender.com/${courseName}`,
          {
            method: "POST",
          }
        );
        if (!response.ok) throw new Error("Nätverksfel: " + response.status);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Fel vid hämtning av frågor:", error);
      }
    }

    fetchQuestions();
  }, [courseName]);
  return (
    <div className="cardWrap">
      <h2>{courseName}</h2>
      <div className="progressBar">
        <div className="bar" style={{ width: `${width}%` }}></div>
      </div>
      <div
        className={`card fade ${rotateY ? "out" : ""} ${next ? "next" : ""} ${
          prev ? "prev" : ""
        }`}
        onClick={showAnswer}
      >
        {questions.length === 0 ? (
          <p>Laddar frågor...</p>
        ) : show ? (
          <p className="answer">{questions[currentIndex].answer}</p>
        ) : (
          <p className="question">{questions[currentIndex].question}</p>
        )}
      </div>
      <div className="arrowWrap">
        <button className="btn cardBtn" onClick={prevQuestion}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
        <button className="btn cardBtn" onClick={nextQuestion}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;

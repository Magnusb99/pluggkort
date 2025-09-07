import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
function Questionadder() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [courseCode, setCourseCode] = useState("");

  const handleSubmit = async (e) => {
    const payload = {
      course: courseCode,
      questions: questions,
    };
    try {
      const response = await fetch("https://ezplugg.onrender.com/addQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Nätverksfel: " + response.status);
      const data = await response.json();

      navigate("/");
    } catch (error) {
      console.error("Fel vid hämtning av frågor:", error);
    }
  };

  function removeQuestion(index) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }
  function addQuestion(e) {
    e.preventDefault();
    setQuestions((prev) => [...prev, { question: "", answer: "" }]);
  }
  function handleChange(index, field, value) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  }
  return (
    <>
      <div className="addForm">
        <div className="Course">
          <h3>Kurskod</h3>
          <input
            className="input"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="questionWrap">
            <div className="input">
              <textarea
                value={q.question}
                onChange={(e) =>
                  handleChange(index, "question", e.target.value)
                }
                placeholder="Fråga"
              />
            </div>
            <div className="input">
              <textarea
                value={q.answer}
                onChange={(e) => handleChange(index, "answer", e.target.value)}
                placeholder="Svar"
              />
            </div>
            <button
              className="btn removeQ"
              onClick={(e) => {
                e.preventDefault();
                removeQuestion(index);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                className="svg"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>{" "}
              Ta bort
            </button>
          </div>
        ))}
        <button className="btn newQ" onClick={addQuestion}>
          <svg
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          Ny fråga
        </button>
        <button onClick={handleSubmit} className="btn submit">
          <svg
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m600-200-56-57 143-143H300q-75 0-127.5-52.5T120-580q0-75 52.5-127.5T300-760h20v80h-20q-42 0-71 29t-29 71q0 42 29 71t71 29h387L544-624l56-56 240 240-240 240Z" />
          </svg>
          Klar
        </button>
      </div>
    </>
  );
}
export default Questionadder;

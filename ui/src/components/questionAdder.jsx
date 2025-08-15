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
      const response = await fetch("http://localhost:3001/addQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Nätverksfel: " + response.status);
      const data = await response.json();

      if (data != "") {
        console.log(data);
      }
      redirect("/");
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
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                removeQuestion(index);
              }}
            >
              Ta bort
            </button>
          </div>
        ))}
        <button className="btn newQ" onClick={addQuestion}>
          Lägg till ny fråga
        </button>
        <button onClick={handleSubmit} className="btn">
          Klar
        </button>
      </div>
    </>
  );
}
export default Questionadder;

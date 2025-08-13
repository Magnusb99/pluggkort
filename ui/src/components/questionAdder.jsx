import { useState } from "react";
function Questionadder() {
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      course: courseCode,
      questions: questions,
    };

    fetch("http://localhost:3000/api/add-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Svar från server:", data);
      })
      .catch((err) => console.error("Fel vid skick:", err));
  }
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
      <form className="addForm" onSubmit={handleSubmit}>
        <div className="Course">
          <h3>Kurskod</h3>
          <input
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
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
        <button className="btn" onClick={addQuestion}>
          Lägg till ny fråga
        </button>
        <button type="submit" className="btn">
          Klar
        </button>
      </form>
    </>
  );
}
export default Questionadder;

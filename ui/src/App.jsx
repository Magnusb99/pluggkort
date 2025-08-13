import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import kurser from "./assets/kurser.json";
import Card from "./components/card";
import CourseChooser from "./components/courseChooser";
import QuestionAdder from "./components/questionAdder";
import "./App.css";

function App() {
  const kursKoder = Object.keys(kurser);
  const [valdKurs, setValdKurs] = useState(kursKoder[0]);

  return (
    <Router>
      <header className="NAVBAR">
        <h1>Ezplugg</h1>
        <nav>
          <Link className="btn" to="/">
            Hem
          </Link>

          <Link className="btn" to="/add">
            Lägg in frågor
          </Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CourseChooser
                  courses={kursKoder}
                  selectedCourse={valdKurs}
                  onCourseChange={setValdKurs}
                />
                <Card courseName={valdKurs} questions={kurser[valdKurs]} />
              </>
            }
          />
          <Route path="/add" element={<QuestionAdder />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

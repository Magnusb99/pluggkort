import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "./components/card";
import CourseChooser from "./components/courseChooser";
import QuestionAdder from "./components/questionAdder";
import "./App.css";

function App() {
  const [kursKoder, setkursKoder] = useState([]);
  const [valdKurs, setValdKurs] = useState([]);

  useEffect(() => {
    async function fetchKurser() {
      try {
        const response = await fetch("https://ezplugg.onrender.com/kursKoder");
        if (!response.ok) {
          throw new Error("Nätverksfel: " + response.status);
        }
        const data = await response.json();
        setkursKoder(data);
        if (valdKurs == "") {
          setValdKurs(data[0]);
        }
      } catch (error) {
        console.error("Fel vid hämtning av kurskoder:", error);
      }
    }

    fetchKurser();
  }, []);
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
                {kursKoder.length === 0 && (
                  <p className="loadingWrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                      className="loadingIcon"
                    >
                      <path d="M420-680v-120h120v120H420Zm0 520v-120h120v120H420Z" />
                    </svg>
                    Laddar
                  </p> // eller null
                )}
                {kursKoder.length > 0 && (
                  <CourseChooser
                    courses={kursKoder}
                    selectedCourse={valdKurs}
                    onCourseChange={setValdKurs}
                  />
                )}{" "}
                {kursKoder.length > 0 && valdKurs !== "" && (
                  <Card courseName={valdKurs} />
                )}
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

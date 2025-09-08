import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "./components/card";
import CourseChooser from "./components/courseChooser";
import QuestionAdder from "./components/questionAdder";
import Test from "./components/test";
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
        <div className="titelWrap">
          <a href="/">
            <h1>Ezplugg</h1>
          </a>

          <p>
            Powered by
            <a href="https://wolkano.se" target="_blank">
              <i>WOLKANO</i>
            </a>
          </p>
        </div>

        <nav>
          <Link className="btn linkBtn" to="/">
            <span class="material-symbols-outlined">home</span>
          </Link>

          <Link className="btn linkBtn" to="/add">
            <span class="material-symbols-outlined">upload</span>
          </Link>
          <Link className="btn linkBtn" to="/test">
            <span class="material-symbols-outlined">genetics</span>
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
                  <div className="loadingWrap">
                    <div className="ruta"></div>
                  </div>
                )}
                {kursKoder.length > 0 && (
                  <CourseChooser
                    courses={kursKoder}
                    selectedCourse={valdKurs}
                    onCourseChange={setValdKurs}
                  />
                )}
                {kursKoder.length > 0 && valdKurs !== "" && (
                  <Card courseName={valdKurs} />
                )}
              </>
            }
          />
          <Route path="/add" element={<QuestionAdder />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

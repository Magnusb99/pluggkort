import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "./components/card";
import CourseChooser from "./components/courseChooser";
import QuestionAdder from "./components/questionAdder";
import "./App.css";

import musik from "./assets/krunegard.mp3";
function App() {
  const [kursKoder, setkursKoder] = useState([]);
  const [valdKurs, setValdKurs] = useState([]);
  const [showMarkus, setMarkus] = useState(true);
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

        <audio controls>
          <source src={musik} type="audio/mp3"></source>
        </audio>

        <nav>
          <Link className="btn linkBtn" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </Link>

          <Link className="btn linkBtn" to="/add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
            </svg>
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
                    <p className="loadingText">Laddar</p>
                  </p>
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

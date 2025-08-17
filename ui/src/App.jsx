import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "./components/card";
import CourseChooser from "./components/courseChooser";
import QuestionAdder from "./components/questionAdder";
import "./App.css";

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

  function ShowMarkus() {
    setMarkus(!showMarkus);
  }

  return (
    <Router>
      <header className="NAVBAR">
        <h1>Ezplugg</h1>
        <div className="mp3Player">
          {showMarkus && (
            <div className="imgWrap">
              <img src="/src/assets/markus/krunegard.jpg" />
            </div>
          )}
          <audio controls>
            <source
              src="/src/assets/markus/krunegard.mp3"
              type="audio/mp3"
            ></source>
          </audio>
          <button className="" onClick={ShowMarkus}>
            {showMarkus ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            )}
          </button>
        </div>
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

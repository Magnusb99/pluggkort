import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "./components/card";
import CourseChooser from "./components/courseChooser";
import QuestionAdder from "./components/questionAdder";
import Test from "./components/test";
import "./App.css";

import musik from "./assets/krunegard.mp3";
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
              <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
          </Link>
          <Link className="btn linkBtn" to="/test">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Zm-80 40h560L520-492v-268h-80v268L200-200Zm280-280Z" />
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
                  <div className="loadingWrap">
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
                  </div>
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
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

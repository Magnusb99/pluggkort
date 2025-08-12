import { useState } from "react";
import kurser from "./assets/kurser.json";
import Card from "./components/card";
import CourseChooser from "./components/courseChooser";
import "./App.css";

function App() {
  const kursKoder = Object.keys(kurser);
  const [valdKurs, setValdKurs] = useState(kursKoder[0]);

  return (
    <main className="main">
      <CourseChooser
        courses={kursKoder}
        selectedCourse={valdKurs}
        onCourseChange={setValdKurs}
      />

      <Card courseName={valdKurs} questions={kurser[valdKurs]} />
    </main>
  );
}

export default App;

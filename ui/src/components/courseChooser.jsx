function CourseChooser({ courses, selectedCourse, onCourseChange }) {
  return (
    <div className="kursknappar">
      {courses.map((kurs) => (
        <button
          className="btn "
          key={kurs}
          onClick={() => onCourseChange(kurs)}
        >
          {kurs}
        </button>
      ))}
    </div>
  );
}

export default CourseChooser;

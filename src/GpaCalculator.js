import React, { useState, useMemo } from "react";
import allSheetsData from "./data/all_sheets.json";
import "./GpaCalculator.css";

const GpaCalculator = () => {
  const [department, setDepartment] = useState("ME");
  const [semester, setSemester] = useState("4");
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState({});
  const [selectedCredits, setSelectedCredits] = useState({});
  const [gpa, setGpa] = useState(null);

  const gradePoints = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    RA: 0,
  };

  const filteredCourses = useMemo(() => {
    const semNumber = parseInt(semester);
    return allSheetsData[department]?.filter(
      (course) => course.Semester === semNumber && course.Code && course.Course
    ) || [];
  }, [department, semester]);

  const handleLoadCourses = () => {
    setCourses(filteredCourses);
    const newGrades = {};
    const newCredits = {};
    filteredCourses.forEach((course) => {
      newGrades[course.Code] = "";
      newCredits[course.Code] = "";
    });
    setGrades(newGrades);
    setSelectedCredits(newCredits);
    setGpa(null);
  };

  const handleCalculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    
    courses.forEach((course) => {
      const grade = grades[course.Code];
      const credits = selectedCredits[course.Code] || 0;
      if (grade && credits) {
        totalCredits += parseInt(credits);
        totalPoints += gradePoints[grade] * parseInt(credits);
      }
    });
    
    setGpa(totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0);
  };

  return (
    <div className="cgpa-container">
      <div className="cgpa-header">
        <h1>CGPA Calculator</h1>
        
        <div className="cgpa-selection">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="cgpa-department-select"
          >
            {Object.keys(allSheetsData).map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="cgpa-semester-select"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>Sem {sem}</option>
            ))}
          </select>
          
          <button
            onClick={handleLoadCourses}
            className="cgpa-load-btn"
          >
            Load Courses
          </button>
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="cgpa-courses">
          {courses.map((course) => (
            <div key={course.Code} className="cgpa-course">
              <h3>{course.Code} - {course.Course}</h3>
              
              <div className="cgpa-inputs">
                <select
                  value={selectedCredits[course.Code] || ""}
                  onChange={(e) => setSelectedCredits({...selectedCredits, [course.Code]: e.target.value})}
                  className="cgpa-credit-select"
                >
                  <option value="">Credits</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((credit) => (
                    <option key={credit} value={credit}>{credit}</option>
                  ))}
                </select>
                
                <select
                  value={grades[course.Code] || ""}
                  onChange={(e) => setGrades({...grades, [course.Code]: e.target.value})}
                  className="cgpa-grade-select"
                >
                  <option value="">Grade</option>
                  {Object.keys(gradePoints).map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          
          <button
            onClick={handleCalculateGPA}
            className="cgpa-calculate-btn"
          >
            Calculate CGPA
          </button>
        </div>
      ) : (
        <div className="cgpa-empty">
          <p>Select department and semester, then click "Load Courses"</p>
        </div>
      )}

      {gpa !== null && (
        <div className="cgpa-result">
          <h3>Your CGPA</h3>
          <p>{gpa}</p>
        </div>
      )}
    </div>
  );
};

export default GpaCalculator;
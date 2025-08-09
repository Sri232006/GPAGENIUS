import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './GpaCalculator.css';

const MyCgpaCalculator = () => {
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const gpaHistory = data.gpaHistory || [];

      const defaultCredits = 20;

      const semestersWithCredits = gpaHistory.map((entry) => ({
        gpa: parseFloat(entry.gpa) || 0,
        credits: entry.totalCredits || defaultCredits,
        date: entry.date ? new Date(entry.date) : null, 
      }));

      setSemesters(semestersWithCredits);

      let totalWeightedGpa = 0;
      let totalCredits = 0;

      semestersWithCredits.forEach((sem) => {
        totalWeightedGpa += sem.gpa * sem.credits;
        totalCredits += sem.credits;
      });

      const calculatedCgpa =
        totalCredits > 0 ? (totalWeightedGpa / totalCredits).toFixed(2) : "0.00";
      setCgpa(calculatedCgpa);

      // Save CGPA to Firebase
      await updateDoc(userRef, { cgpa: calculatedCgpa });
    };

    fetchData();
  }, []);

  return (
    <div className="cgpa-container">
      <div className="cgpa-header">
        <h1>📊 My CGPA History</h1>
      </div>

      {semesters.length > 0 ? (
        <ul className="cgpa-history">
          {semesters.map((sem, index) => (
            <li key={index} className="cgpa-history-item">
              📅 <strong>
                {sem.date
                  ? sem.date.toLocaleDateString()
                  : "Date Not Available"}
              </strong>
              {" — "}GPA: {sem.gpa}, Credits: {sem.credits}
            </li>
          ))}
        </ul>
      ) : (
        <div className="cgpa-empty">
          <p>No GPA data found.</p>
        </div>
      )}

      {cgpa !== null && (
        <div className="cgpa-result">
          <h3>⭐ Your CGPA</h3>
          <p>{cgpa}</p>
        </div>
      )}
    </div>
  );
};

export default MyCgpaCalculator;
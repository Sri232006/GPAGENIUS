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
      if (docSnap.exists()) {
        const data = docSnap.data();
        const gpaHistory = data.gpaHistory || [];

        const defaultCredits = 20; 

        const semestersWithCredits = gpaHistory.map((entry) => ({
          gpa: parseFloat(entry.gpa),
          credits: entry.totalCredits || defaultCredits,
          date: entry.date,
        }));

        setSemesters(semestersWithCredits);

        let totalWeightedGpa = 0;
        let totalCredits = 0;

        semestersWithCredits.forEach((sem) => {
          totalWeightedGpa += sem.gpa * sem.credits;
          totalCredits += sem.credits;
        });

        const calculatedCgpa = totalCredits > 0 ? (totalWeightedGpa / totalCredits).toFixed(2) : 0;
        setCgpa(calculatedCgpa);

        // Save CGPA to Firebase
        await updateDoc(userRef, { cgpa: calculatedCgpa });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">🎓 CGPA Calculator</h2>

      {semesters.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {semesters.map((sem, index) => (
            <li key={index} style={{ marginBottom: '10px', textAlign: 'center' }}>
              📅 <strong>{new Date(sem.date).toLocaleDateString()}</strong> – GPA: {sem.gpa}, Credits: {sem.credits}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>No GPA data found.</p>
      )}

      {cgpa !== null && (
        <h3 style={{ textAlign: 'center', marginTop: '20px' }}>⭐ Your CGPA: {cgpa}</h3>
      )}
    </div>
  );
};

export default MyCgpaCalculator;
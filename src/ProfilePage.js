import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import GpaCalculator from "./GpaCalculator";
import MyCgpaCalculator from "./MyCgpaCalculator";
import GpaChart from "./GpaChart";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [showGpaCalculator, setShowGpaCalculator] = useState(false);
  const [showCgpaCalculator, setShowCgpaCalculator] = useState(false);
  const [tempData, setTempData] = useState({
    name: "",
    gender: "",
    dob: "",
    department: "",
    regulation: "",
    semester: "",
    university: "",
    college: "",
    currentYear: "",
    passingYear: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
        setTempData(userSnap.data());
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const userRef = doc(db, "users", uid);
    await setDoc(userRef, tempData);

    setUserData(tempData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>👤 My Profile</h2>

        {userData.photoURL && (
          <img src={userData.photoURL} alt="Profile" style={styles.pic} />
        )}

        {isEditing ? (
          <>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={tempData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Gender</label>
            <input
              type="text"
              value={tempData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Date of Birth</label>
            <input
              type="date"
              value={tempData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Department</label>
            <input
              type="text"
              value={tempData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Regulation</label>
            <input
              type="text"
              value={tempData.regulation}
              onChange={(e) => handleChange("regulation", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Semester</label>
            <input
              type="number"
              value={tempData.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>University</label>
            <input
              type="text"
              value={tempData.university}
              onChange={(e) => handleChange("university", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>College</label>
            <input
              type="text"
              value={tempData.college}
              onChange={(e) => handleChange("college", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Current Year</label>
            <input
              type="text"
              value={tempData.currentYear}
              onChange={(e) => handleChange("currentYear", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Passing Year</label>
            <input
              type="text"
              value={tempData.passingYear}
              onChange={(e) => handleChange("passingYear", e.target.value)}
              style={styles.input}
            />

            <div style={styles.buttonGroup}>
              <button style={styles.saveBtn} onClick={handleSave}>
                💾 Save
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>DOB:</strong> {userData.dob}</p>
            <p><strong>Department:</strong> {userData.department}</p>
            <p><strong>Regulation:</strong> {userData.regulation}</p>
            <p><strong>Semester:</strong> {userData.semester}</p>
            <p><strong>University:</strong> {userData.university}</p>
            <p><strong>College:</strong> {userData.college}</p>
            <p><strong>Current Year:</strong> {userData.currentYear}</p>
            <p><strong>Passing Year:</strong> {userData.passingYear}</p>

            <div style={styles.buttonGroup}>
              <button
                style={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                ✏ Edit Profile
              </button>
              <button
                style={styles.gpaBtn}
                onClick={() => setShowGpaCalculator(!showGpaCalculator)}
              >
                {showGpaCalculator ? "🎓 Hide GPA Genius" : "🎓 Show GPA Genius"}
              </button>
              <button
                style={styles.gpaBtn}
                onClick={() => setShowCgpaCalculator(!showCgpaCalculator)}
              >
                {showCgpaCalculator ? "🎯 Hide CGPA Genius" : "🎯 Show CGPA Genius"}
              </button>
            </div>
          </>
        )}

        {showGpaCalculator && (
          <>
            <GpaCalculator />
            <GpaChart />
          </>
        )}
        {showCgpaCalculator && <MyCgpaCalculator />}
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "500px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#fff",
    textShadow: "1px 1px 2px #000",
  },
  label: {
    display: "block",
    marginTop: "15px",
    fontWeight: "bold",
    color: "#f0f0f0",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#333",
  },
  pic: {
    display: "block",
    margin: "0 auto 20px",
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    border: "3px solid white",
  },
  buttonGroup: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  saveBtn: {
    background: "#4caf50",
    color: "white",
    padding: "12px 20px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#f44336",
    color: "white",
    padding: "12px 20px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
  editBtn: {
    background: "#2196f3",
    color: "white",
    padding: "12px 20px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
  gpaBtn: {
    background: "linear-gradient(45deg, #667eea, #764ba2)",
    color: "white",
    padding: "12px 20px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
  },
};

export default ProfilePage;
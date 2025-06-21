import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import ProfilePage from "./ProfilePage";
import MyCgpaCalculator from "./MyCgpaCalculator";
import GpaCalculator from "./GpaCalculator";
import ForgotPassword from "./ForgetPassword";
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                background: "linear-gradient(to right, #4568dc, #b06ab3)",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "2rem 3rem",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  color: "white",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  🎓 Welcome to GPA Genius
                </h1>
                <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#f0f0f0" }}>
                  ✨ Easy to track your GPA & CGPA
                </p>
                <div>
                  <Link
                    to="/signup"
                    style={{
                      marginRight: "15px",
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      padding: "10px 20px",
                      background: "#1e3c72",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    Signup
                  </Link>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      padding: "10px 20px",
                      background: "#2a5298",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cgpa" element={<MyCgpaCalculator />} />
        <Route path="/gpa" element={<GpaCalculator />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
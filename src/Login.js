import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
      navigate("/profile");
    } catch (error) {
      alert("❌ Login failed: " + error.message);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #4568dc, #b06ab3)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "2rem 3rem",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        color: "white",
        maxWidth: "400px",
        width: "100%",
      }}>
        <h2 style={{ marginBottom: "1rem" }}>🔐 Login</h2>
        <p style={{ fontSize: "1rem", color: "#f0f0f0", marginBottom: "1.5rem" }}>
          🎓 Welcome back to GPA Genius!
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Don't have an account? <Link to="/signup" style={{ color: "#fff", textDecoration: "underline" }}>Signup</Link>
        </p>
        <p style={{ marginTop: "10px"}}>
          <Link to="/forgot-password" style={{color:"#fff", textDecoration:"underline"}}>
          Forgot Password?
          </Link>
          </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#2a5298",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
};

export default Login;
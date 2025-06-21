import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Reset link sent! Check your email.");
      setTimeout(() => navigate("/login"), 3000); 
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">🔑 Forgot Password</h2>

        <input
          type="email"
          placeholder="📧 Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <button onClick={handleReset} className="auth-button">
          📩 Send Reset Link
        </button>

        <p style={{ color: "#fff", marginTop: "10px" }}>{message}</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
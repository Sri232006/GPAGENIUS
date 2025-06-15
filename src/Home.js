import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function Home({ user }) {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div style={{
      minHeight: '100vh',
      margin: 0,
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* 🌟 GPA Genius Banner */}
      <div style={{
        width: '100%',
        padding: '30px 0',
        background: 'linear-gradient(90deg, #667eea, #764ba2)',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h1
          style={{
            color: '#fff',
            fontSize: '40px',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 1s ease-out'
          }}
        >
          GPA Genius
        </h1>
      </div>

      {/* 💬 Main Card */}
      <div style={{
        background: '#fff',
        padding: '40px 30px',
        borderRadius: '20px',
        marginTop: '60px',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          Welcome, <span style={{ color: '#667eea' }}>{user?.email || 'User'}</span>!
        </h2>

        <button
          onClick={() => navigate('/profile')}
          style={mainButtonStyle}
          onMouseOver={hoverEffect}
          onMouseOut={resetEffect}
        >
          👤 Go to Profile
        </button>

        <button
          onClick={handleLogout}
          style={{ ...mainButtonStyle, background: '#d32f2f', marginTop: '15px' }}
          onMouseOver={hoverEffect}
          onMouseOut={resetEffect}
        >
          🔒 Logout
        </button>
      </div>
    </div>
  );
}

// 🎨 Button styles
const mainButtonStyle = {
  background: '#667eea',
  color: 'white',
  padding: '14px 20px',
  border: 'none',
  borderRadius: '15px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const hoverEffect = (e) => {
  e.target.style.transform = 'translateY(-2px)';
  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
};

const resetEffect = (e) => {
  e.target.style.transform = 'translateY(0)';
  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
};

export default Home;
// src/Assessment.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const physicalControls = [...Array(25)].map((_, i) => `SBSS.Physical.${i + 1}: Question about physical control ${i + 1}`);
  const infosecControls = [...Array(25)].map((_, i) => `SBSS.InfoSec.${i + 1}: Question about information security control ${i + 1}`);

  const controls = type === 'physical' ? physicalControls : infosecControls;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (response) => {
    setAnswers((prev) => [...prev, response]);
    setIndex(index + 1);
  };

  const handleBack = () => {
    if (index > 0) {
      const updatedAnswers = [...answers];
      updatedAnswers.pop();
      setAnswers(updatedAnswers);
      setIndex(index - 1);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setAnswers([]);
  };

  const getScore = () => {
    const yesCount = answers.filter((a) => a === 'yes').length;
    const percentage = (yesCount / controls.length) * 100;
    if (percentage >= 85) return 'Secure';
    if (percentage >= 60) return 'Needs Improvement';
    return 'At-Risk';
  };

  const getColor = (score) => {
    switch (score) {
      case 'Secure': return 'lightgreen';
      case 'Needs Improvement': return 'yellow';
      case 'At-Risk': return 'red';
      default: return 'white';
    }
  };

  return (
    <div style={styles.container}>
      {index < controls.length ? (
        <div style={styles.card}>
          <h3 style={{ color: '#aaa', marginBottom: '0.5rem' }}>{controls[index].split(':')[0]}</h3>
          <p style={{ fontSize: '1.1rem' }}>{controls[index].split(': ')[1]}</p>
          <div style={{ margin: '1rem 0' }}>
            <progress value={index + 1} max={controls.length} style={{ width: '100%' }}></progress>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{index + 1} of {controls.length}</p>
          </div>
          <div style={styles.buttonRow}>
            <button onClick={() => handleAnswer('yes')} style={styles.button}>Yes</button>
            <button onClick={() => handleAnswer('no')} style={styles.button}>No</button>
          </div>
          {index > 0 && <button onClick={handleBack} style={{ ...styles.button, marginTop: '1rem' }}>Back</button>}
        </div>
      ) : (
        <div style={styles.card}>
          <h2>Assessment Complete</h2>
          <p style={{ color: getColor(getScore()), fontSize: '1.3rem' }}>
            Result: <strong>{getScore()}</strong>
          </p>
          {getScore() === 'Secure' ? (
            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
              ✅ Your business meets the SBSS Secure standard!
              <br />Display this: <code>SBSS Certified Secure Business</code>
            </p>
          ) : (
            <p style={{ marginTop: '1rem' }}>
              Consider scheduling a consultation to improve your score.
            </p>
          )}
          <div style={styles.buttonRow}>
            <button onClick={handleRestart} style={styles.button}>Restart</button>
            <button onClick={() => navigate('/')} style={styles.button}>Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0c0c0e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: "'Segoe UI', sans-serif",
    color: 'white'
  },
  card: {
    backgroundColor: '#111',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    zIndex: 2
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1.5rem'
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

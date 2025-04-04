import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const questions = [
  { id: 'SBSS.Physical.1', question: 'Are all entrances secured with commercial-grade locks?' },
  { id: 'SBSS.Physical.2', question: 'Are security cameras actively monitored or reviewed?' },
  { id: 'SBSS.Physical.3', question: 'Is visitor access controlled and logged?' },
  { id: 'SBSS.Physical.4', question: 'Are emergency exits clearly marked, unobstructed, and regularly inspected?' },
  { id: 'SBSS.Physical.5', question: 'Is there a regularly updated access control list for sensitive areas?' }
];

export default function Assessment() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState('');

  const handleAnswer = (value) => {
    const q = questions[current];
    setAnswers(prev => ({ ...prev, [q.id]: value }));
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateScore({ ...answers, [q.id]: value });
      setSubmitted(true);
    }
  };

  const calculateScore = (allAnswers) => {
    const yesCount = Object.values(allAnswers).filter(val => val === 'yes').length;
    const percent = (yesCount / questions.length) * 100;
    if (percent >= 85) setScore('Secure');
    else if (percent >= 60) setScore('Needs Improvement');
    else setScore('At-Risk');
  };

  if (submitted) {
    const color = score === 'Secure' ? 'green' : score === 'Needs Improvement' ? 'gold' : 'red';
    return (
      <div style={{ backgroundColor: '#0c0c0e', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ border: `2px solid ${color}`, padding: '2rem', borderRadius: '12px', maxWidth: '90%', textAlign: 'center' }}>
          <h2 style={{ color }}>{score}</h2>
          {score === 'Secure' ? (
            <>
              <p>✅ SBSS Certified Secure Business</p>
              <textarea readOnly value='<div class="sbss-certified">✅ Certified by SBSS Framework</div>' style={{ width: '100%', height: '60px' }} />
            </>
          ) : (
            <p>📆 Consider scheduling a consult to improve your security posture.</p>
          )}
          <br /><br />
          <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ backgroundColor: '#0c0c0e', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '12px', boxShadow: '0 0 20px rgba(255,255,255,0.1)', maxWidth: '500px', width: '100%', color: 'white', textAlign: 'center' }}>
        <p style={{ color: 'gray', marginBottom: '0.5rem' }}>Question {current + 1} of {questions.length}</p>
        <h3 style={{ marginBottom: '2rem' }}>{q.id}: {q.question}</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <button onClick={() => handleAnswer('yes')} style={{ background: 'green', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 'bold' }}>Yes</button>
          <button onClick={() => handleAnswer('no')} style={{ background: 'red', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 'bold' }}>No</button>
        </div>
      </div>
    </div>
  );
}

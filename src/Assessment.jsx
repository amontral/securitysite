import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const disclaimerInfo = JSON.parse(localStorage.getItem('sbss_disclaimer')) || {};

  const physicalControls = [...]; // add your control strings
  const infosecControls = [...];  // add your control strings
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

  const getMessage = (score) => {
    switch (score) {
      case 'Secure':
        return "Your environment appears secure! Consider applying for SBSS Certification to officially validate and showcase your strong security posture.";
      case 'Needs Improvement':
        return "Your environment shows promise, but improvements are needed. Consider reviewing the controls you answered 'No' to and building a roadmap.";
      case 'At-Risk':
        return "Your environment is at risk. We recommend scheduling a consultation to address key security gaps and develop a resilience strategy.";
      default:
        return "";
    }
  };

  const getColor = (score) => {
    switch (score) {
      case 'Secure': return 'lightgreen';
      case 'Needs Improvement': return 'yellow';
      case 'At-Risk': return 'red';
      default: return 'white';
    }
  };

  const sendResultsByEmail = () => {
    fetch("https://formspree.io/f/mpwpyvkr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: disclaimerInfo.name,
        email: disclaimerInfo.email,
        business: disclaimerInfo.business,
        type,
        score: getScore(),
        timestamp: disclaimerInfo.timestamp,
        answers: answers.map((a, i) => `${controls[i]} - ${a}`).join('\n')
      })
    }).then(res => {
      if (!res.ok) console.error("Email not sent");
    });
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Silex Strategic Group", 20, 30);
    pdf.setFontSize(12);
    pdf.text("Email: silexstrategicgroup@gmail.com | Phone: 501-952-7172", 20, 40);
    pdf.text(`Business Name: ${disclaimerInfo.business || 'N/A'}`, 20, 50);
    pdf.text(`Contact Email: ${disclaimerInfo.email || 'N/A'}`, 20, 60);
    pdf.text(`Disclaimer Acknowledged: ${new Date(disclaimerInfo.timestamp).toLocaleString() || 'N/A'}`, 20, 70);
    pdf.text(`Assessment Type: ${type === 'physical' ? 'Physical Security' : 'Information Security'}`, 20, 80);
    pdf.text(`Score: ${getScore()}`, 20, 90);
    pdf.text(`Disclaimer: This is a self-assessment. SBSS certification is subject to validation and audit.`, 20, 100, { maxWidth: 170 });

    let y = 120;
    controls.forEach((control, i) => {
      const answer = answers[i] || 'No Response';
      const lines = pdf.splitTextToSize(`${control} - Answer: ${answer}`, 170);
      lines.forEach(line => {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, 20, y);
        y += 10;
      });
    });

    pdf.save('sbss-assessment-results.pdf');
    sendResultsByEmail();
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
          <p style={{ marginTop: '1rem' }}>{getMessage(getScore())}</p>
          <div style={styles.buttonRow}>
            <button onClick={handleRestart} style={styles.button}>Restart</button>
            <button onClick={() => navigate('/')} style={styles.button}>Back to Home</button>
            <button onClick={downloadPDF} style={styles.button}>Download Report</button>
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
    marginTop: '1.5rem',
    flexWrap: 'wrap'
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

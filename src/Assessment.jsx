import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const disclaimerInfo = JSON.parse(localStorage.getItem('sbss_disclaimer')) || {};

  const physicalControls = [
    "Entry points are secured with commercial-grade locks.",
    "Security cameras monitor entry and exit points.",
    "Alarm systems are in place and regularly tested.",
    "Visitors are required to sign in and be escorted.",
    "Access to sensitive areas is restricted.",
    "Doors and windows are inspected for tampering.",
    "Exterior lighting is adequate during night hours.",
    "Employees wear visible ID badges.",
    "Security incidents are logged and reviewed.",
    "Trash is disposed securely to prevent data leaks.",
    "Building has secure emergency exits.",
    "Access logs are reviewed monthly.",
    "Contractors undergo background checks.",
    "Cleaning crews are supervised or vetted.",
    "Motion sensors are installed in key areas.",
    "Reception area is monitored or staffed.",
    "Physical server rooms are locked.",
    "Equipment is secured to prevent theft.",
    "Deliveries are screened before entry.",
    "Locks are changed after key personnel leave.",
    "Master keys are stored securely.",
    "CCTV footage is retained per policy.",
    "Security drills are conducted yearly.",
    "Security policies are visible to staff.",
    "Staff are trained on physical security protocols."
  ];

  const infosecControls = [
    "Strong passwords are enforced across systems.",
    "Multi-factor authentication is required.",
    "Antivirus software is installed and updated.",
    "Backups are taken regularly and stored securely.",
    "Firewall settings are reviewed monthly.",
    "Employee access is role-based.",
    "Vendors are vetted for security compliance.",
    "Incident response plans are documented.",
    "Old data is archived or deleted securely.",
    "Sensitive emails are encrypted.",
    "Security training is provided annually.",
    "Software updates are applied promptly.",
    "Admin privileges are restricted.",
    "Removable media is controlled or blocked.",
    "Systems are monitored for unusual activity.",
    "Cloud services follow security best practices.",
    "Wi-Fi is secured with strong encryption.",
    "New users are onboarded with least privilege.",
    "Departed users are deactivated promptly.",
    "Devices are auto-locked when idle.",
    "Data access is logged and audited.",
    "USB ports are disabled or monitored.",
    "Phishing tests are run periodically.",
    "Security policies are acknowledged annually.",
    "Third-party apps are reviewed before use."
  ];

  const controls = type === 'physical' ? physicalControls : infosecControls;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (current >= controls.length) {
      const score = answers.filter(Boolean).length;
      const percentage = score / controls.length;

      if (percentage >= 0.9) setResult('Secure');
      else if (percentage >= 0.6) setResult('Needs Improvement');
      else setResult('At Risk');
    }
  }, [current]);

  const handleAnswer = (value) => {
    setAnswers([...answers, value]);
    setCurrent(current + 1);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Small Business Security Assessment", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${disclaimerInfo.name || ''}`, 20, 30);
    doc.text(`Business: ${disclaimerInfo.business || ''}`, 20, 36);
    doc.text(`Email: ${disclaimerInfo.email || ''}`, 20, 42);
    doc.text(`Type: ${type === 'physical' ? 'Physical Security' : 'Information Security'}`, 20, 48);
    doc.text(`Result: ${result}`, 20, 54);

    const rows = controls.map((question, index) => [
      `${type === 'physical' ? 'SBSS.Physical' : 'SBSS.InfoSec'}.${index + 1}`,
      question,
      answers[index] ? 'Yes' : 'No'
    ]);

    doc.autoTable({
      head: [['Control ID', 'Control Description', 'Answer']],
      body: rows,
      startY: 60
    });

    doc.save('sbss-assessment.pdf');
  };

  const renderResultMessage = () => {
    if (result === 'Secure') {
      return (
        <>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
            Your environment appears secure! Consider applying for <strong>SBSS Certification</strong> to officially validate and showcase your strong security posture.
          </p>
          <a href="https://calendly.com/silexstrategicgroup-oek" target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
            Schedule Certification Consultation
          </a>
        </>
      );
    } else {
      return (
        <>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
            There are areas needing improvement. Schedule a free consultation to discuss your security posture and next steps.
          </p>
          <a href="https://calendly.com/silexstrategicgroup-oek" target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
            Schedule a Consultation
          </a>
        </>
      );
    }
  };

  return (
    <div style={styles.container}>
      {result === null ? (
        <div style={styles.card}>
          <h2 style={styles.controlTitle}>{type === 'physical' ? `SBSS.Physical.${current + 1}` : `SBSS.InfoSec.${current + 1}`}</h2>
          <p style={styles.questionText}>{controls[current]}</p>
          <progress value={current} max={controls.length} style={{ width: '100%', marginBottom: '1rem' }}></progress>
          <p>{current + 1} of {controls.length}</p>
          <div style={styles.buttonRow}>
            <button onClick={() => handleAnswer(true)} style={styles.button}>Yes</button>
            <button onClick={() => handleAnswer(false)} style={styles.button}>No</button>
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <h2>Assessment Complete</h2>
          <p style={{ color: result === 'Secure' ? 'lightgreen' : result === 'Needs Improvement' ? 'gold' : 'red', fontSize: '1.1rem' }}>
            Result: {result}
          </p>
          {renderResultMessage()}
          <div style={styles.buttonRow}>
            <button onClick={restart} style={styles.button}>Restart</button>
            <button onClick={() => navigate('/')} style={styles.button}>Back to Home</button>
            <button onClick={generatePDF} style={styles.button}>Download Report</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0c0c0e',
    minHeight: '100vh',
    color: 'white',
    padding: '2rem',
    fontFamily: "'Segoe UI', sans-serif"
  },
  card: {
    backgroundColor: '#111',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'center'
  },
  controlTitle: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    color: '#aadfff'
  },
  questionText: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem'
  },
  button: {
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '1rem'
  },
  actionButton: {
    marginTop: '1rem',
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

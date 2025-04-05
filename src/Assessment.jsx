import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const physicalControls = [
    "SBSS.Physical.1: Is facility access restricted to authorized personnel?",
    "SBSS.Physical.2: Are visitor logs maintained at all access points?",
    "SBSS.Physical.3: Is video surveillance installed and operational?",
    "SBSS.Physical.4: Are emergency exits clearly marked and unlocked?",
    "SBSS.Physical.5: Are access control systems audited regularly?",
    "SBSS.Physical.6: Is there perimeter fencing or security barriers?",
    "SBSS.Physical.7: Are fire extinguishers clearly visible and inspected?",
    "SBSS.Physical.8: Are sensitive areas (server rooms, HR) under extra lock?",
    "SBSS.Physical.9: Is lighting adequate for all access points?",
    "SBSS.Physical.10: Are all physical keys accounted for and tracked?",
    "SBSS.Physical.11: Are ID badges required for employees?",
    "SBSS.Physical.12: Are alarm systems in place and tested regularly?",
    "SBSS.Physical.13: Are security patrols conducted routinely?",
    "SBSS.Physical.14: Are physical records securely stored?",
    "SBSS.Physical.15: Are security procedures written and accessible?",
    "SBSS.Physical.16: Are deliveries inspected upon arrival?",
    "SBSS.Physical.17: Is parking lot monitored or gated?",
    "SBSS.Physical.18: Are emergency evacuation plans posted?",
    "SBSS.Physical.19: Are first aid kits accessible and stocked?",
    "SBSS.Physical.20: Are unattended workspaces kept secure?",
    "SBSS.Physical.21: Is access to roof and maintenance areas restricted?",
    "SBSS.Physical.22: Are unused entry points sealed or alarmed?",
    "SBSS.Physical.23: Are doors and windows checked daily?",
    "SBSS.Physical.24: Are employee terminations followed by access revocation?",
    "SBSS.Physical.25: Are monthly physical security checks documented?"
  ];

  const infosecControls = [
    "SBSS.InfoSec.1: Are all systems protected by strong passwords?",
    "SBSS.InfoSec.2: Is multifactor authentication enabled where possible?",
    "SBSS.InfoSec.3: Are antivirus/antimalware solutions installed and updated?",
    "SBSS.InfoSec.4: Are backups performed regularly and tested?",
    "SBSS.InfoSec.5: Is sensitive data encrypted at rest and in transit?",
    "SBSS.InfoSec.6: Are firewall and router settings configured securely?",
    "SBSS.InfoSec.7: Are security patches applied within 30 days?",
    "SBSS.InfoSec.8: Are employee accounts reviewed at least quarterly?",
    "SBSS.InfoSec.9: Are employees trained on phishing and social engineering?",
    "SBSS.InfoSec.10: Is access to confidential info based on role (least privilege)?",
    "SBSS.InfoSec.11: Are audit logs maintained and reviewed?",
    "SBSS.InfoSec.12: Are remote access tools secured and monitored?",
    "SBSS.InfoSec.13: Is removable media usage restricted or monitored?",
    "SBSS.InfoSec.14: Are old or unused accounts disabled or deleted?",
    "SBSS.InfoSec.15: Is an incident response plan in place?",
    "SBSS.InfoSec.16: Are third-party vendors reviewed for cybersecurity?",
    "SBSS.InfoSec.17: Are employees required to lock screens when away?",
    "SBSS.InfoSec.18: Are security responsibilities documented?",
    "SBSS.InfoSec.19: Are unauthorized software installations restricted?",
    "SBSS.InfoSec.20: Are network drives and shares permissioned appropriately?",
    "SBSS.InfoSec.21: Are mobile devices secured and monitored?",
    "SBSS.InfoSec.22: Are employee offboarding steps clearly documented?",
    "SBSS.InfoSec.23: Are secure file-sharing methods used for external parties?",
    "SBSS.InfoSec.24: Is DNS security or filtering enabled?",
    "SBSS.InfoSec.25: Are internal systems segmented (e.g., guest vs production)?"
  ];

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

  const handleDownload = async () => {
    const report = document.getElementById('report-content');
    const canvas = await html2canvas(report, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
    const margin = 20;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);
    pdf.save(`SBSS_Assessment_Report_${new Date().toISOString()}.pdf`);
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
          <div id="report-content">
            <h2>Assessment Complete</h2>
            <p style={{ color: getColor(getScore()), fontSize: '1.3rem' }}>
              Result: <strong>{getScore()}</strong>
            </p>
            {getScore() === 'Secure' ? (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                  ✅ Your business meets the SBSS Secure standard!<br />
                  The Small Business Security Standard (SBSS) is a proprietary framework designed by Silex Strategic Group to help small businesses evaluate their security posture with ease.
                </p>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>Display this badge:</p>
                <img src="/badge.png" alt="SBSS Certified Secure Business" style={{ width: '120px', marginBottom: '1rem' }} />
                <pre style={{ backgroundColor: '#222', color: '#0f0', padding: '1rem', borderRadius: '8px', textAlign: 'left', overflowX: 'auto', fontSize: '0.9rem' }}>
                  {`<img src="https://silexstrategicgroup.com/badge.png" alt="SBSS Certified Secure Business" width="120"/>`}
                </pre>
                <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#bbb' }}>
                  Disclaimer: The Small Business Security Standard (SBSS) is a self-assessment tool. Use of this badge implies agreement to a future audit for verification. Silex Strategic Group is not liable for any claims or damages resulting from security incidents. Timestamp: {new Date().toLocaleString()}
                </p>
              </div>
            ) : (
              <p style={{ marginTop: '1rem' }}>
                Consider scheduling a consultation to improve your score.
              </p>
            )}
          </div>
          <div style={styles.buttonRow}>
            <button onClick={handleDownload} style={styles.button}>Download PDF</button>
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

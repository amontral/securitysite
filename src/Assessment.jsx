import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');
  const disclaimerInfo = JSON.parse(localStorage.getItem('sbss_disclaimer')) || {};

  const physicalControls = [
    "SBSS.Physical.1: Are all entry points secured with commercial-grade locks?",
    "SBSS.Physical.2: Is a visitor log or access control system in use?",
    "SBSS.Physical.3: Are surveillance cameras installed and functional?",
    "SBSS.Physical.4: Are exterior lights operational and positioned for visibility?",
    "SBSS.Physical.5: Are sensitive areas restricted by locks or access control?",
    "SBSS.Physical.6: Is alarm system signage clearly displayed?",
    "SBSS.Physical.7: Are emergency exits clearly marked and unobstructed?",
    "SBSS.Physical.8: Are employees trained in physical security protocols?",
    "SBSS.Physical.9: Is there a documented facility access policy?",
    "SBSS.Physical.10: Are server/network rooms physically locked?",
    "SBSS.Physical.11: Are ID badges or uniforms used for staff identification?",
    "SBSS.Physical.12: Are deliveries inspected before entering secure areas?",
    "SBSS.Physical.13: Are perimeter fences or barriers in place (if applicable)?",
    "SBSS.Physical.14: Are keys and access codes tracked and reviewed regularly?",
    "SBSS.Physical.15: Are critical infrastructure components monitored (HVAC, etc.)?",
    "SBSS.Physical.16: Are panic buttons or silent alarms available (if needed)?",
    "SBSS.Physical.17: Are surveillance recordings stored for at least 30 days?",
    "SBSS.Physical.18: Are visitor badges issued and collected?",
    "SBSS.Physical.19: Are cleaning/janitorial staff vetted and monitored?",
    "SBSS.Physical.20: Are cable and server closets locked?",
    "SBSS.Physical.21: Are physical security incidents logged and reviewed?",
    "SBSS.Physical.22: Is there a designated security officer or manager?",
    "SBSS.Physical.23: Are exterior entrances secured after hours?",
    "SBSS.Physical.24: Are windows reinforced or alarmed where needed?",
    "SBSS.Physical.25: Has a recent physical security assessment been conducted?"
  ];

  const infosecControls = [
    "SBSS.InfoSec.1: Are employee accounts protected by multi-factor authentication?",
    "SBSS.InfoSec.2: Is antivirus or endpoint protection active on all devices?",
    "SBSS.InfoSec.3: Is data regularly backed up and stored offsite or in the cloud?",
    "SBSS.InfoSec.4: Are firewalls or secure routers in place?",
    "SBSS.InfoSec.5: Are passwords required to meet complexity standards?",
    "SBSS.InfoSec.6: Are old accounts promptly disabled or removed?",
    "SBSS.InfoSec.7: Is sensitive data encrypted in storage and transit?",
    "SBSS.InfoSec.8: Is employee cybersecurity training provided regularly?",
    "SBSS.InfoSec.9: Are system updates and patches applied promptly?",
    "SBSS.InfoSec.10: Are vendor and third-party risks evaluated?",
    "SBSS.InfoSec.11: Is there an acceptable use policy for employees?",
    "SBSS.InfoSec.12: Are suspicious emails reported and tracked?",
    "SBSS.InfoSec.13: Are personal devices restricted or secured on networks?",
    "SBSS.InfoSec.14: Are audit logs maintained for critical systems?",
    "SBSS.InfoSec.15: Is remote access secured and monitored?",
    "SBSS.InfoSec.16: Are admin privileges limited and reviewed?",
    "SBSS.InfoSec.17: Is there a documented incident response plan?",
    "SBSS.InfoSec.18: Are cloud-based apps and storage monitored?",
    "SBSS.InfoSec.19: Are privacy regulations (HIPAA, GDPR, etc.) addressed?",
    "SBSS.InfoSec.20: Are Wi-Fi networks encrypted (WPA2 or WPA3)?",
    "SBSS.InfoSec.21: Is removable media (USBs, drives) usage controlled?",
    "SBSS.InfoSec.22: Is employee offboarding documented and enforced?",
    "SBSS.InfoSec.23: Are system configurations reviewed periodically?",
    "SBSS.InfoSec.24: Is access to financial systems limited and tracked?",
    "SBSS.InfoSec.25: Has an internal or external IT security review occurred?"
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
    pdf.text(`Assessment Type: ${type === 'physical' ? 'Physical Security' : 'Information Security'}`, 20, 70);
    pdf.text(`Score: ${getScore()}`, 20, 80);
    pdf.text(`Disclaimer: This is a self-assessment. SBSS certification is subject to validation and audit.`, 20, 90, { maxWidth: 170 });

    let y = 110;
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
    <div style={{ padding: '2rem', backgroundColor: '#0c0c0e', minHeight: '100vh', color: 'white' }}>
      {index < controls.length ? (
        <div style={cardStyle}>
          <h3 style={{ color: '#aaa' }}>{controls[index].split(':')[0]}</h3>
          <p>{controls[index].split(': ')[1]}</p>
          <progress value={index + 1} max={controls.length} style={{ width: '100%' }} />
          <p>{index + 1} of {controls.length}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => handleAnswer('yes')} style={buttonStyle}>Yes</button>
            <button onClick={() => handleAnswer('no')} style={buttonStyle}>No</button>
          </div>
          {index > 0 && <button onClick={handleBack} style={{ ...buttonStyle, marginTop: '1rem' }}>Back</button>}
        </div>
      ) : (
        <div style={cardStyle}>
          <h2>Assessment Complete</h2>
          <p style={{ color: getColor(getScore()) }}>Result: <strong>{getScore()}</strong></p>
          <p style={{ marginTop: '1rem' }}>{getMessage(getScore())}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleRestart} style={buttonStyle}>Restart</button>
            <button onClick={() => navigate('/')} style={buttonStyle}>Back to Home</button>
            <button onClick={downloadPDF} style={buttonStyle}>Download Report</button>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '12px',
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  boxShadow: '0 0 20px rgba(255,255,255,0.05)'
};

const buttonStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

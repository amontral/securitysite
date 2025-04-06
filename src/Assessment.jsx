import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const disclaimerInfo = JSON.parse(localStorage.getItem('sbss_disclaimer')) || {};

  const physicalControls = [
    "SBSS.Physical.1: Are all entry and exit points secured with locks?",
    "SBSS.Physical.2: Is there a visitor log or check-in procedure?",
    "SBSS.Physical.3: Are sensitive areas restricted to authorized personnel?",
    "SBSS.Physical.4: Are surveillance cameras installed and operational?",
    "SBSS.Physical.5: Are alarm systems in place for intrusion detection?",
    "SBSS.Physical.6: Are emergency exits clearly marked and unobstructed?",
    "SBSS.Physical.7: Are all entrances monitored during and after business hours?",
    "SBSS.Physical.8: Are employee badges or IDs required for access?",
    "SBSS.Physical.9: Is there a process for revoking physical access?",
    "SBSS.Physical.10: Are delivery areas monitored and secured?",
    "SBSS.Physical.11: Are physical documents stored in locked cabinets?",
    "SBSS.Physical.12: Are backup systems protected from physical threats?",
    "SBSS.Physical.13: Is lighting adequate around the facility exterior?",
    "SBSS.Physical.14: Are server rooms climate controlled and secured?",
    "SBSS.Physical.15: Are building keys or fobs tracked and inventoried?",
    "SBSS.Physical.16: Are fire extinguishers and alarms inspected regularly?",
    "SBSS.Physical.17: Are physical assets labeled and inventoried?",
    "SBSS.Physical.18: Are workstation screens not visible to visitors?",
    "SBSS.Physical.19: Is the premises regularly inspected for safety hazards?",
    "SBSS.Physical.20: Is sensitive waste (e.g., shredded) disposed securely?",
    "SBSS.Physical.21: Are contractors required to follow security protocols?",
    "SBSS.Physical.22: Are there procedures for inclement weather or natural disasters?",
    "SBSS.Physical.23: Is there a designated physical security officer or lead?",
    "SBSS.Physical.24: Are locks changed after personnel termination?",
    "SBSS.Physical.25: Is physical access logged and reviewed regularly?"
  ];

  const infosecControls = [
    "SBSS.InfoSec.1: Is antivirus or endpoint protection installed on all devices?",
    "SBSS.InfoSec.2: Are all devices encrypted at rest?",
    "SBSS.InfoSec.3: Are cloud accounts secured with multifactor authentication?",
    "SBSS.InfoSec.4: Are passwords required to meet minimum complexity?",
    "SBSS.InfoSec.5: Are backups performed and tested regularly?",
    "SBSS.InfoSec.6: Is email spam/phishing filtering enabled?",
    "SBSS.InfoSec.7: Are employees trained on cybersecurity best practices?",
    "SBSS.InfoSec.8: Are system and application updates applied promptly?",
    "SBSS.InfoSec.9: Are firewalls or network security tools in place?",
    "SBSS.InfoSec.10: Are user accounts reviewed and deactivated when necessary?",
    "SBSS.InfoSec.11: Is there a documented incident response plan?",
    "SBSS.InfoSec.12: Is sensitive data only accessed on secure devices?",
    "SBSS.InfoSec.13: Are USB and external media use restricted or controlled?",
    "SBSS.InfoSec.14: Are logs collected and reviewed for suspicious activity?",
    "SBSS.InfoSec.15: Are admin privileges limited to necessary users?",
    "SBSS.InfoSec.16: Is confidential info shared via secure channels only?",
    "SBSS.InfoSec.17: Are vendors and third-party access reviewed regularly?",
    "SBSS.InfoSec.18: Is sensitive data labeled and classified?",
    "SBSS.InfoSec.19: Are website forms and portals HTTPS protected?",
    "SBSS.InfoSec.20: Are expired credentials and tokens revoked automatically?",
    "SBSS.InfoSec.21: Are mobile devices managed or restricted for work?",
    "SBSS.InfoSec.22: Are past breaches or incidents documented?",
    "SBSS.InfoSec.23: Are audit logs retained in accordance with policy?",
    "SBSS.InfoSec.24: Is remote access secured via VPN or other control?",
    "SBSS.InfoSec.25: Are critical systems tested for vulnerabilities?"
  ];

  const controls = type === 'physical' ? physicalControls : infosecControls;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [certificationForm, setCertificationForm] = useState({ name: '', email: '', message: '' });

  const handleAnswer = (response) => {
    setAnswers((prev) => [...prev, response]);
    setIndex(index + 1);
  };

  const handleBack = () => {
    const updatedAnswers = [...answers];
    updatedAnswers.pop();
    setAnswers(updatedAnswers);
    setIndex(index - 1);
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
        return "Assessment complete.";
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
    fetch("https://formspree.io/f/xwplwkpk", {
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
    pdf.text(`Business Name: ${disclaimerInfo.business}`, 20, 50);
    pdf.text(`Email: ${disclaimerInfo.email}`, 20, 60);
    pdf.text(`Type: ${type}`, 20, 70);
    pdf.text(`Score: ${getScore()}`, 20, 80);
    pdf.text(`Timestamp: ${disclaimerInfo.timestamp}`, 20, 90);

    let y = 110;
    answers.forEach((a, i) => {
      const text = `${i + 1}. ${controls[i]} - Answer: ${a}`;
      const lines = pdf.splitTextToSize(text, 170);
      lines.forEach((line) => {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, 20, y);
        y += 10;
      });
    });

    pdf.save("sbss-results.pdf");
    sendResultsByEmail();
  };

  const handleCertFormSubmit = (e) => {
    e.preventDefault();
    fetch("https://formspree.io/f/mdkepapw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(certificationForm)
    }).then(() => {
      alert("Your certification inquiry has been submitted.");
      setShowContactForm(false);
      setCertificationForm({ name: '', email: '', message: '' });
    });
  };

  return (
    <div style={{ padding: '2rem', color: 'white', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#0c0c0e' }}>
      {index < controls.length ? (
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>{controls[index].split(':')[0]}</h3>
          <p>{controls[index].split(': ')[1]}</p>
          <div style={{ margin: '1.5rem 0' }}>
            <progress
              value={index + 1}
              max={controls.length}
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#333',
                borderRadius: '8px'
              }}
            />
            <p style={{ marginTop: '0.5rem', color: '#ccc' }}>{index + 1} of {controls.length} controls answered</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => handleAnswer('yes')} style={btn}>Yes</button>
            <button onClick={() => handleAnswer('no')} style={btn}>No</button>
          </div>
          {index > 0 && (
            <button onClick={handleBack} style={{ ...btn, marginTop: '1rem' }}>Back</button>
          )}
        </div>
      ) : showContactForm ? (
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2>Start SBSS Certification</h2>
          <form onSubmit={handleCertFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <input type="text" required placeholder="Full Name" value={certificationForm.name} onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })} />
            <input type="email" required placeholder="Email" value={certificationForm.email} onChange={(e) => setCertificationForm({ ...certificationForm, email: e.target.value })} />
            <textarea placeholder="Additional Notes" rows="4" value={certificationForm.message} onChange={(e) => setCertificationForm({ ...certificationForm, message: e.target.value })} />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="submit" style={btn}>Submit Inquiry</button>
              <button type="button" onClick={() => setShowContactForm(false)} style={btn}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2>Assessment Complete</h2>
          <p style={{ fontSize: '1.2rem', color: getColor(getScore()) }}>
            Your result: <strong>{getScore()}</strong>
          </p>
          <p style={{ marginTop: '1rem' }}>{getMessage(getScore())}</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={handleRestart} style={btn}>Restart</button>
            <button onClick={() => navigate('/')} style={btn}>Back to Home</button>
            <button onClick={downloadPDF} style={btn}>Download Report</button>
          </div>
          {getScore() === 'Secure' && (
            <div style={{ marginTop: '2rem' }}>
              <button onClick={() => setShowContactForm(true)} style={{
                backgroundColor: 'lightblue',
                color: '#000',
                fontWeight: 'bold',
                padding: '0.75rem 1.25rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Start SBSS Certification
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const btn = {
  padding: '0.75rem 1.25rem',
  backgroundColor: '#fff',
  color: '#000',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none'
};

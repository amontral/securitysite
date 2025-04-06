import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const disclaimerInfo = JSON.parse(localStorage.getItem('sbss_disclaimer')) || {};

  const physicalControls = [
    "SBSS.Physical.1: Are all entry points secured with locks or access control systems?",
    "SBSS.Physical.2: Are visitor logs maintained for non-employees entering the premises?",
    "SBSS.Physical.3: Are security cameras installed and actively monitored?",
    "SBSS.Physical.4: Are emergency exits clearly marked and unobstructed?",
    "SBSS.Physical.5: Are lighting systems in place to deter unauthorized access at night?",
    "SBSS.Physical.6: Are sensitive areas protected with restricted access?",
    "SBSS.Physical.7: Are alarm systems installed and tested regularly?",
    "SBSS.Physical.8: Are employees trained on physical security protocols?",
    "SBSS.Physical.9: Are equipment and assets tagged or inventoried?",
    "SBSS.Physical.10: Are entrances and exits monitored during business hours?",
    "SBSS.Physical.11: Is there a physical security policy accessible to staff?",
    "SBSS.Physical.12: Are security incidents documented and reviewed?",
    "SBSS.Physical.13: Are delivery and loading areas controlled and logged?",
    "SBSS.Physical.14: Are internal doors secured when unattended?",
    "SBSS.Physical.15: Are server rooms physically locked at all times?",
    "SBSS.Physical.16: Is physical access logged for sensitive zones?",
    "SBSS.Physical.17: Are exterior barriers such as fences or gates in place?",
    "SBSS.Physical.18: Are ID badges or access cards issued and tracked?",
    "SBSS.Physical.19: Are workstations secured after hours?",
    "SBSS.Physical.20: Are unauthorized items restricted from entry?",
    "SBSS.Physical.21: Are site-specific risks documented in a physical audit?",
    "SBSS.Physical.22: Are physical inspections conducted regularly?",
    "SBSS.Physical.23: Are CCTV recordings retained for a minimum of 30 days?",
    "SBSS.Physical.24: Are backup power systems in place for security infrastructure?",
    "SBSS.Physical.25: Is the physical security plan reviewed annually?"
  ];

  const infosecControls = [
    "SBSS.InfoSec.1: Is multi-factor authentication (MFA) enabled for all key systems?",
    "SBSS.InfoSec.2: Are user access privileges reviewed regularly?",
    "SBSS.InfoSec.3: Is antivirus or endpoint protection installed on all devices?",
    "SBSS.InfoSec.4: Are all systems regularly patched and updated?",
    "SBSS.InfoSec.5: Are employees trained in cybersecurity awareness?",
    "SBSS.InfoSec.6: Are data backups performed regularly and stored securely?",
    "SBSS.InfoSec.7: Is encryption used for sensitive data at rest and in transit?",
    "SBSS.InfoSec.8: Are firewall systems in place and actively monitored?",
    "SBSS.InfoSec.9: Are email filtering and anti-phishing measures enabled?",
    "SBSS.InfoSec.10: Are vendor risks evaluated before integrating with third parties?",
    "SBSS.InfoSec.11: Is an incident response plan documented and tested?",
    "SBSS.InfoSec.12: Are users required to use strong, unique passwords?",
    "SBSS.InfoSec.13: Are remote access protocols secured?",
    "SBSS.InfoSec.14: Is sensitive data access logged and audited?",
    "SBSS.InfoSec.15: Are personal devices restricted or controlled on the network?",
    "SBSS.InfoSec.16: Are obsolete user accounts removed promptly?",
    "SBSS.InfoSec.17: Is access to sensitive systems restricted by role?",
    "SBSS.InfoSec.18: Are file-sharing permissions reviewed periodically?",
    "SBSS.InfoSec.19: Is screen lock enforced on company devices?",
    "SBSS.InfoSec.20: Are security policies clearly documented and shared?",
    "SBSS.InfoSec.21: Is web traffic filtered for malicious content?",
    "SBSS.InfoSec.22: Are SaaS platforms configured with least-privilege principles?",
    "SBSS.InfoSec.23: Are logs centralized and reviewed for anomalies?",
    "SBSS.InfoSec.24: Is cloud storage monitored for unauthorized changes?",
    "SBSS.InfoSec.25: Is a cybersecurity audit conducted at least annually?"
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
        return "Your environment shows promise, but improvements are needed. Review the 'No' responses and prioritize enhancements.";
      case 'At-Risk':
        return "Your environment is at risk. We recommend booking a consultation to address critical vulnerabilities.";
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
    <div style={{ backgroundColor: '#0c0c0e', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      {index < controls.length ? (
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ color: '#aadfff' }}>{controls[index].split(':')[0]}</h3>
          <p>{controls[index].split(': ')[1]}</p>
          <progress value={index + 1} max={controls.length} style={{ width: '100%', margin: '1rem 0' }} />
          <div>
            <button onClick={() => handleAnswer('yes')} style={buttonStyle}>Yes</button>
            <button onClick={() => handleAnswer('no')} style={buttonStyle}>No</button>
          </div>
          {index > 0 && (
            <button onClick={handleBack} style={{ ...buttonStyle, marginTop: '1rem' }}>Back</button>
          )}
        </div>
      ) : showContactForm ? (
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px' }}>
          <h2>Start SBSS Certification</h2>
          <form onSubmit={handleCertFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <input type="text" placeholder="Full Name" value={certificationForm.name} onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })} required />
            <input type="email" placeholder="Email" value={certificationForm.email} onChange={(e) => setCertificationForm({ ...certificationForm, email: e.target.value })} required />
            <textarea placeholder="Message or Details" rows="4" value={certificationForm.message} onChange={(e) => setCertificationForm({ ...certificationForm, message: e.target.value })} />
            <div>
              <button type="submit" style={buttonStyle}>Submit</button>
              <button type="button" onClick={() => setShowContactForm(false)} style={{ ...buttonStyle, marginLeft: '1rem' }}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2>Assessment Complete</h2>
          <p style={{ color: getColor(getScore()), fontSize: '1.3rem' }}>
            Result: <strong>{getScore()}</strong>
          </p>
          <p style={{ margin: '1rem 0' }}>{getMessage(getScore())}</p>
          <div>
            <button onClick={handleRestart} style={buttonStyle}>Restart</button>
            <button onClick={() => navigate('/')} style={buttonStyle}>Back to Home</button>
            <button onClick={downloadPDF} style={buttonStyle}>Download Report</button>
          </div>
          {getScore() === 'Secure' && (
            <div style={{ marginTop: '1.5rem' }}>
              <button onClick={() => setShowContactForm(true)} style={{ ...buttonStyle, backgroundColor: 'lightblue', color: '#000' }}>
                Start SBSS Certification
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#fff',
  color: '#000',
  padding: '0.75rem 1.5rem',
  fontWeight: 'bold',
  borderRadius: '6px',
  border: 'none',
  margin: '0.5rem',
  cursor: 'pointer'
};

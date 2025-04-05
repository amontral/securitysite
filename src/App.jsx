import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const disclaimerInfo = JSON.parse(localStorage.getItem('sbss_disclaimer')) || {};
  const disclaimerText = `By proceeding, you agree that:
- Silex Strategic Group assumes no liability for security outcomes.
- Badge usage may require an audit for validation.
- You may be contacted for follow-up.`;

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
        disclaimerTimestamp: disclaimerInfo.timestamp,
        disclaimer: disclaimerText,
        answers: answers.map((a, i) => `${controls[i]} - ${a}`).join('\n')
      })
    }).then(res => {
      if (!res.ok) console.error("Email not sent");
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      color: 'white',
      fontFamily: "'Segoe UI', sans-serif",
      background: 'linear-gradient(120deg, #0f2027, #203a43, #2c5364)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 10s ease infinite'
    }}>
      {/* Your JSX logic for rendering assessment cards and results here */}
    </div>
  );
}

// Global style (add this to your CSS or index.css)
// @keyframes gradientShift {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }

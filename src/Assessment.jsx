import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get('type');

  const disclaimerInfo = JSON.parse(localStorage.getItem('sbss_disclaimer')) || {};

  const physicalControls = [
    'SBSS.Physical.1: Entry points are secured with commercial-grade locks.',
    'SBSS.Physical.2: Security cameras are installed at all exterior entrances.',
    'SBSS.Physical.3: Alarm systems are in place and tested regularly.',
    'SBSS.Physical.4: Physical access to servers and critical systems is restricted.',
    'SBSS.Physical.5: Visitor access is logged and monitored.',
    'SBSS.Physical.6: Emergency exits are clearly marked and accessible.',
    'SBSS.Physical.7: Fire extinguishers are present and inspected.',
    'SBSS.Physical.8: Adequate lighting is installed in and around the premises.',
    'SBSS.Physical.9: Security personnel or monitoring services are employed.',
    'SBSS.Physical.10: Deliveries are screened and tracked.',
    'SBSS.Physical.11: Employee badges or credentials are required for entry.',
    'SBSS.Physical.12: Access is revoked immediately when employees leave.',
    'SBSS.Physical.13: Critical equipment is secured to prevent tampering.',
    'SBSS.Physical.14: Exterior signage deters unauthorized access.',
    'SBSS.Physical.15: Security audits are conducted at least annually.',
    'SBSS.Physical.16: Perimeter fencing or barriers exist where appropriate.',
    'SBSS.Physical.17: Environmental controls protect equipment (e.g., HVAC, fire suppression).',
    'SBSS.Physical.18: Sensitive areas are access-controlled with logs.',
    'SBSS.Physical.19: First aid kits are available and accessible.',
    'SBSS.Physical.20: Doors and windows are regularly checked for vulnerabilities.',
    'SBSS.Physical.21: Security incident response procedures are in place.',
    'SBSS.Physical.22: Physical security is included in employee training.',
    'SBSS.Physical.23: Equipment disposal follows a secure process.',
    'SBSS.Physical.24: Onsite backups are stored securely.',
    'SBSS.Physical.25: Keyholders are tracked and reviewed regularly.'
  ];

  const infosecControls = [
    'SBSS.InfoSec.1: All devices require secure passwords or biometrics.',
    'SBSS.InfoSec.2: Multi-factor authentication is enabled for all accounts.',
    'SBSS.InfoSec.3: Sensitive data is encrypted at rest and in transit.',
    'SBSS.InfoSec.4: Regular backups are taken and tested.',
    'SBSS.InfoSec.5: Antivirus and anti-malware software is installed and updated.',
    'SBSS.InfoSec.6: Firewalls are configured and active.',
    'SBSS.InfoSec.7: Security patches are applied promptly.',
    'SBSS.InfoSec.8: Staff receive ongoing cybersecurity training.',
    'SBSS.InfoSec.9: Access is based on least privilege.',
    'SBSS.InfoSec.10: Logs are maintained and reviewed.',
    'SBSS.InfoSec.11: Incident response plans exist and are tested.',
    'SBSS.InfoSec.12: Devices are locked when unattended.',
    'SBSS.InfoSec.13: Remote access is secured and monitored.',
    'SBSS.InfoSec.14: Vendor access is controlled and logged.',
    'SBSS.InfoSec.15: Default credentials are changed on all systems.',
    'SBSS.InfoSec.16: Secure Wi-Fi networks are used, with guest access separated.',
    'SBSS.InfoSec.17: Cloud storage access is tightly managed.',
    'SBSS.InfoSec.18: Confidential documents are shredded or securely deleted.',
    'SBSS.InfoSec.19: Personal devices follow bring-your-own-device (BYOD) policies.',
    'SBSS.InfoSec.20: Email filtering and anti-phishing tools are in place.',
    'SBSS.InfoSec.21: USB and removable media use is restricted or encrypted.',
    'SBSS.InfoSec.22: A current inventory of hardware and software is maintained.',
    'SBSS.InfoSec.23: Users receive alerts for unusual login attempts.',
    'SBSS.InfoSec.24: Security roles are clearly defined.',
    'SBSS.InfoSec.25: End-of-life software and systems are retired.'
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

  return (
    <div style={{ backgroundColor: '#0c0c0e', minHeight: '100vh', color: 'white', fontFamily: 'Segoe UI, sans-serif', padding: '2rem' }}>
      {index < controls.length ? (
        <div style={{ backgroundColor: '#111', padding: '2rem', borderRadius: '12px', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ color: '#aadfff' }}>{controls[index].split(':')[0]}</h2>
          <p>{controls[index].split(':')[1]}</p>
          <progress value={index + 1} max={controls.length} style={{ width: '100%', marginTop: '1rem' }} />
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{index + 1} of {controls.length}</p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => handleAnswer('yes')} style={{ marginRight: '1rem' }}>Yes</button>
            <button onClick={() => handleAnswer('no')}>No</button>
          </div>
          {index > 0 && (
            <button onClick={handleBack} style={{ marginTop: '1rem' }}>Back</button>
          )}
        </div>
      ) : (
        <div style={{ backgroundColor: '#111', padding: '2rem', borderRadius: '12px', maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
          <h2>Assessment Complete</h2>
          <p style={{ color: getColor(getScore()), fontSize: '1.2rem' }}>Result: <strong>{getScore()}</strong></p>
          <p style={{ marginTop: '1rem' }}>{getMessage(getScore())}</p>

          <div style={{ marginTop: '1.5rem' }}>
            <a
              href="https://calendly.com/silexstrategicgroup-oek"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#aadfff',
                color: '#000',
                fontWeight: 'bold',
                padding: '0.75rem 1.25rem',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '1rem'
              }}
            >
              Schedule a Consultation
            </a>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button onClick={handleRestart}>Restart</button>
            <button onClick={() => navigate('/')} style={{ marginLeft: '1rem' }}>Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
}

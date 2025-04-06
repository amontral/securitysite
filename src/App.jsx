import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServicesPage() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [formData, setFormData] = useState({ name: '', business: '', email: '', agreed: false });
  const navigate = useNavigate();

  const handleStartAssessmentClick = () => setShowDisclaimer(true);

  const handleDisclaimerSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.business && formData.email && formData.agreed) {
      localStorage.setItem('sbss_disclaimer', JSON.stringify({ ...formData, timestamp: new Date().toISOString() }));
      setShowDisclaimer(false);
      setShowOptions(true);
    } else {
      alert('Please complete all fields and accept the disclaimer.');
    }
  };

  const handleCloseDisclaimer = () => setShowDisclaimer(false);

  return (
    <div style={{ backgroundColor: '#0c0c0e', color: 'white', padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Consulting Services</h1>
      <p style={{ maxWidth: '800px', lineHeight: '1.6' }}>
        We offer Physical Security Auditing, Information Security Assessments, SBSS Certification Readiness, and Compliance Strategy Consulting. These services help businesses identify risks, establish controls, and document their efforts in alignment with the Small Business Security Standard.
      </p>
      <button onClick={handleStartAssessmentClick} style={{ ...buttonStyle, marginTop: '2rem' }}>
        Take the SBSS Assessment
      </button>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button onClick={handleCloseDisclaimer} style={closeButton}>&times;</button>
            <h2>Before You Begin</h2>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#ccc' }}>
              The Small Business Security Assessment is a self-evaluation tool designed to help businesses identify potential risks. By proceeding, you agree that:
            </p>
            <ul style={{ fontSize: '0.85rem', textAlign: 'left', color: '#ccc', marginBottom: '1rem' }}>
              <li>No liability is assumed by Silex Strategic Group.</li>
              <li>Badge usage may require validation and audit.</li>
              <li>We may follow up with consultation suggestions.</li>
            </ul>
            <form onSubmit={handleDisclaimerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="text" placeholder="Business Name" value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <label>
                <input type="checkbox" checked={formData.agreed} onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })} /> I agree to the disclaimer terms
              </label>
              <button type="submit" style={choiceBtnStyle}>Continue to Assessment</button>
            </form>
          </div>
        </div>
      )}

      {/* Assessment Type Modal */}
      {showOptions && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ color: 'lightgray' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={choiceBtnStyle}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={choiceBtnStyle}>Information Security</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  background: '#ffffff',
  color: '#000',
  padding: '0.75rem 1.25rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const choiceBtnStyle = buttonStyle;

const closeButton = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '1.2rem',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10
};

const modalBox = {
  position: 'relative',
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '12px',
  maxWidth: '500px',
  width: '90%',
  color: 'white',
  textAlign: 'center',
  boxShadow: '0 0 20px rgba(0,0,0,0.5)'
};

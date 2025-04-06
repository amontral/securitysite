// Save as App.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [formData, setFormData] = useState({ name: '', business: '', email: '', agreed: false });

  const navigate = useNavigate();

  const handleStartAssessmentClick = () => setShowDisclaimer(true);
  const handleCloseDisclaimer = () => setShowDisclaimer(false);

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

  useEffect(() => {
    window.handleStartAssessmentClick = handleStartAssessmentClick;
  }, []);

  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#0c0c0e',
      backgroundImage: "url('/noise-texture.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'repeat',
      minHeight: '100vh',
      color: 'white',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      {/* Sidebar */}
      <div style={{
        width: '220px',
        backgroundColor: '#111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem',
        borderRight: '1px solid #333',
        gap: '1.5rem'
      }}>
        <img src="/ssg-logo.png" alt="SSG Logo" style={{ height: '40px', marginBottom: '2rem', opacity: 0.9 }} />
        <button onClick={handleStartAssessmentClick} style={navButton}>Assessment</button>
        <button onClick={() => navigate('/services')} style={navButton}>Services</button>
        <button onClick={() => setShowContact(!showContact)} style={navButton}>Contact</button>
        {showContact && (
          <div style={popoverStyle}>
            <h3>Contact Us</h3>
            <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
            <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flexGrow: 1, padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <section style={{ textAlign: 'center', paddingBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            letterSpacing: '0.03em',
            textShadow: '0 0 10px rgba(255,255,255,0.9)',
            marginBottom: '0.5rem'
          }}>Silex Strategic Group</h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Strategic Security. Real-World Results.</p>
          <img
            src="/sbss-badge.png"
            alt="SBSS Badge Background"
            style={{
              marginTop: '2rem',
              opacity: 0.25,
              filter: 'drop-shadow(0 0 45px rgba(255, 255, 255, 0.6))',
              width: '180px',
              pointerEvents: 'none'
            }}
            className="pulse-glow"
          />
        </section>

        <section style={sectionBox}>
          <h2 style={sectionTitle}>What We Do</h2>
          <p style={paragraph}>Silex Strategic Group delivers tailored Physical and Information Security Consulting services to help small businesses protect assets, ensure compliance, and establish trust with customers. Our approach is grounded, practical, and aligned with real-world threats.</p>
        </section>

        <section style={sectionBox}>
          <h2 style={sectionTitle}>The SBSS Framework</h2>
          <p style={paragraph}>The Small Business Security Standard (SBSS) is a proprietary framework developed by Silex Strategic Group. It simplifies enterprise-grade risk principles into actionable controls for small business environments.</p>
        </section>

        <section style={sectionBox}>
          <h2 style={sectionTitle}>Why Comprehensive Security?</h2>
          <p style={paragraph}>Modern threats target both physical and digital assets. A cyberattack may start with a stolen keycard or an untrained employee. We advocate layered, end-to-end protection.</p>
        </section>

        <section style={sectionBox}>
          <h2 style={sectionTitle}>Explore Our Services</h2>
          <p style={paragraph}>We offer Security Assessments, SBSS Certification, Strategic Consulting, and Compliance Roadmapping.</p>
          <button onClick={() => navigate('/services')} style={{ ...navButton, marginTop: '1rem' }}>View Our Services</button>
        </section>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button onClick={handleCloseDisclaimer} style={closeButton}>&times;</button>
            <h2>Before You Begin</h2>
            <ul style={{ fontSize: '0.9rem', color: '#ccc', textAlign: 'left', marginBottom: '1rem' }}>
              <li>No liability is assumed by Silex Strategic Group.</li>
              <li>Badge usage may require validation and audit.</li>
              <li>We may contact you with recommendations.</li>
            </ul>
            <form onSubmit={handleDisclaimerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="text" placeholder="Business Name" value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <label>
                <input type="checkbox" checked={formData.agreed} onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })} /> I agree to the disclaimer terms
              </label>
              <button type="submit" style={navButton}>Continue</button>
            </form>
          </div>
        </div>
      )}

      {/* Assessment Type Modal */}
      {showOptions && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ color: 'lightgray' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={navButton}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={navButton}>Information Security</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pulse-glow {
          animation: pulse 4s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.05); opacity: 0.35; }
          100% { transform: scale(1); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}

// Styles
const navButton = {
  background: 'transparent',
  color: 'lightblue',
  border: '1px solid lightblue',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  textAlign: 'center'
};

const sectionBox = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '10px',
  padding: '1.5rem',
  marginBottom: '2rem'
};

const sectionTitle = {
  color: '#aadfff',
  fontSize: '1.5rem',
  marginBottom: '0.75rem'
};

const paragraph = {
  color: '#ccc',
  fontSize: '1rem'
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
  zIndex: 1000
};

const modalBox = {
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '10px',
  width: '90%',
  maxWidth: '500px',
  color: 'white',
  textAlign: 'center',
  position: 'relative'
};

const closeButton = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'transparent',
  color: 'white',
  fontSize: '1.5rem',
  border: 'none',
  cursor: 'pointer'
};

const popoverStyle = {
  position: 'absolute',
  top: '100%',
  left: '0',
  marginTop: '0.5rem',
  backgroundColor: '#111',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  zIndex: 10,
  minWidth: '220px',
  textAlign: 'left'
};

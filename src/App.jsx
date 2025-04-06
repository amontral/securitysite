import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
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

  useEffect(() => {
    window.handleStartAssessmentClick = handleStartAssessmentClick;
  }, []);

  return (
    <div style={{
      backgroundColor: '#0c0c0e',
      backgroundImage: "url('/noise-texture.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'repeat',
      color: 'white',
      fontFamily: "'Segoe UI', 'Roboto', sans-serif",
      minHeight: '100vh'
    }}>
      {/* Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333'
      }}>
        <img src="/ssg-logo.png" alt="SSG Logo" style={{ height: '40px' }} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleStartAssessmentClick} style={navButtonStyle}>Assessment</button>
          <button onClick={() => navigate('/services')} style={navButtonStyle}>Services</button>
          <button onClick={() => setShowContact(!showContact)} style={navButtonStyle}>Contact</button>
        </div>
      </div>

      {showContact && (
        <div style={popoverStyle}>
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
          <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
        </div>
      )}

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        <section style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <h1 style={headingStyle}>Silex Strategic Group</h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Strategic Security. Real-World Results.</p>
          <img
            src="/sbss-badge.png"
            alt="SBSS Badge Background"
            className="pulse-glow"
            style={{
              marginTop: '2rem',
              opacity: 0.5,
              filter: 'drop-shadow(0 0 65px rgba(255, 255, 255, 0.8))',
              width: '200px',
              pointerEvents: 'none'
            }}
          />
        </section>

        <section style={contentSection}>
          <h2 style={subheading}>What We Do</h2>
          <p style={paragraph}>Silex Strategic Group delivers tailored Physical and Information Security Consulting services to help small businesses protect assets, ensure compliance, and establish trust with customers.</p>
        </section>

        <section style={contentSection}>
          <h2 style={subheading}>The SBSS Framework</h2>
          <p style={paragraph}>The Small Business Security Standard (SBSS) simplifies enterprise-grade risk principles into actionable controls for small business environments.</p>
        </section>

        <section style={contentSection}>
          <h2 style={subheading}>Why Comprehensive Security?</h2>
          <p style={paragraph}>Modern threats target both physical and digital assets. We advocate layered, end-to-end protection—from locked doors to encrypted networks.</p>
        </section>

        <section style={contentSection}>
          <h2 style={subheading}>Explore Our Services</h2>
          <p style={{ ...paragraph, marginBottom: '1rem' }}>We offer Security Assessments, SBSS Certification, Strategic Consulting, and Compliance Roadmapping.</p>
          <button onClick={() => navigate('/services')} style={navButtonStyle}>View Our Services</button>
        </section>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button onClick={handleCloseDisclaimer} style={closeButton}>&times;</button>
            <h2>Before You Begin</h2>
            <ul style={{ fontSize: '0.85rem', textAlign: 'left', color: '#ccc' }}>
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
              <button type="submit" style={navButtonStyle}>Continue to Assessment</button>
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
              <button onClick={() => navigate('/assessment?type=physical')} style={navButtonStyle}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={navButtonStyle}>Information Security</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pulse-glow {
          animation: subtlePulse 4s infinite;
        }
        @keyframes subtlePulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.08); opacity: 0.75; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

const navButtonStyle = {
  background: 'transparent',
  color: 'lightblue',
  border: '1px solid lightblue',
  padding: '0.5rem 1.25rem',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none'
};

const headingStyle = {
  fontSize: '3rem',
  fontWeight: '900',
  letterSpacing: '0.03em',
  textShadow: '0 0 10px rgba(255,255,255,0.9)',
  marginBottom: '0.5rem',
  textAlign: 'center'
};

const contentSection = {
  marginBottom: '2.5rem',
  padding: '1.5rem',
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: '8px',
  textAlign: 'center'
};

const subheading = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#aadfff',
  marginBottom: '0.75rem'
};

const paragraph = {
  fontSize: '1rem',
  color: '#ccc'
};

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

const popoverStyle = {
  position: 'absolute',
  top: '4.5rem',
  right: '2rem',
  backgroundColor: '#111',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  zIndex: 2,
  minWidth: '260px',
  textAlign: 'left'
};

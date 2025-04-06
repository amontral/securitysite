import React, { useState } from 'react';
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

  return (
    <div style={{
      backgroundColor: '#0c0c0e',
      color: 'white',
      fontFamily: "'Segoe UI', 'Roboto', sans-serif",
      backgroundImage: "url('/noise-texture.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'repeat',
      minHeight: '100vh'
    }}>
      {/* Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '1.5rem 1rem',
        flexWrap: 'wrap',
        backgroundColor: '#f8f9fa',
        color: '#0c0c0e',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button onClick={handleStartAssessmentClick} style={navButtonStyleLight}>Assessment</button>
          <button onClick={() => navigate('/services')} style={navButtonStyleLight}>Services</button>
          <button onClick={() => window.open('https://calendly.com/silexstrategicgroup-oek', '_blank')} style={navButtonStyleLight}>Schedule Consult</button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowContact(!showContact)} style={navButtonStyleLight}>Contact</button>
            {showContact && (
              <div style={popoverStyle}>
                <h3>Contact Us</h3>
                <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
                <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '4rem 1rem 2rem',
        backgroundColor: '#1f2a35',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0 0 20px 20px'
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '900',
          letterSpacing: '0.03em',
          textShadow: '0 0 10px rgba(255,255,255,0.9)'
        }}>
          Silex Strategic Group
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Strategic Security. Real-World Results.</p>
        <img
          src="/sbss-badge.png"
          alt="SBSS Badge Background"
          className="pulse-glow"
          style={{
            marginTop: '2rem',
            opacity: 0.25,
            filter: 'drop-shadow(0 0 45px rgba(255, 255, 255, 0.6))',
            width: '180px',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Content Sections */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        <section style={sectionStyle}>
          <h2 style={subheading}>What We Do</h2>
          <p style={paragraph}>
            Silex Strategic Group delivers tailored Physical and Information Security Consulting services to help small businesses protect assets, ensure compliance, and establish trust with customers. Our approach is grounded, practical, and aligned with real-world threats.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheading}>The SBSS Framework</h2>
          <p style={paragraph}>
            The Small Business Security Standard (SBSS) is a proprietary framework developed by Silex Strategic Group. It simplifies enterprise-grade risk principles into actionable controls for small business environments. The SBSS assessment quickly identifies gaps and provides visual scoring to inform next steps.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a
              href="/SBSS_Framework.pdf"
              download
              style={{
                ...navButtonStyle,
                backgroundColor: 'rgba(173, 216, 230, 0.1)',
                borderColor: '#4FC3F7',
                color: '#4FC3F7'
              }}
            >
              Download Full SBSS Framework PDF
            </a>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheading}>Why Comprehensive Security?</h2>
          <p style={paragraph}>
            Modern threats target both physical and digital assets. A cyberattack may start with a stolen keycard or an untrained employee. That’s why we advocate layered, end-to-end protection—from locked doors to encrypted networks—so your entire business ecosystem is covered.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheading}>Explore Our Services</h2>
          <p style={{ ...paragraph, marginBottom: '1rem' }}>
            We offer Security Assessments, SBSS Certification, Strategic Consulting, and Compliance Roadmapping.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button onClick={() => navigate('/services')} style={navButtonStyle}>View Our Services</button>
          </div>
        </section>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button onClick={handleCloseDisclaimer} style={closeButton}>&times;</button>
            <h2>Before You Begin</h2>
            <p style={{ fontSize: '0.95rem', color: '#ccc' }}>
              The Small Business Security Assessment is a self-evaluation tool. By proceeding, you agree that:
            </p>
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

      {/* Assessment Option Modal */}
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
    </div>
  );
}

// Styles
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

const navButtonStyleLight = {
  background: 'transparent',
  color: '#0c0c0e',
  border: '1px solid #0c0c0e',
  padding: '0.5rem 1.25rem',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none'
};

const sectionStyle = {
  marginBottom: '2.5rem',
  padding: '1.5rem',
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: '8px'
};

const subheading = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#aadfff',
  marginBottom: '0.75rem',
  textAlign: 'center'
};

const paragraph = {
  fontSize: '1rem',
  color: '#ccc',
  textAlign: 'center'
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
  top: '3rem',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#111',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  zIndex: 2,
  minWidth: '260px',
  textAlign: 'left'
};

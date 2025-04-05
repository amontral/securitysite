// src/App.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    agreed: false
  });

  const navigate = useNavigate();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleStartAssessmentClick = () => {
    setShowDisclaimer(true);
  };

  const handleDisclaimerSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.business && formData.email && formData.agreed) {
      localStorage.setItem('sbss_disclaimer', JSON.stringify({
        ...formData,
        disclaimerTimestamp: new Date().toISOString()
      }));
      setShowDisclaimer(false);
      setShowOptions(true);
    } else {
      alert('Please complete all fields and accept the disclaimer.');
    }
  };

  return (
    <div style={containerStyle}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: '#0c0c0e' },
          fullScreen: { enable: true, zIndex: 0 },
          fpsLimit: 60,
          particles: {
            number: { value: 70 },
            color: { value: '#ffffff' },
            links: { enable: true, color: '#ffffff', distance: 120 },
            move: { enable: true, speed: 0.4 },
            opacity: { value: 0.4 },
            size: { value: { min: 1, max: 3 } }
          }
        }}
      />
      {/* Navigation */}
      <div style={navBarStyle}>
        <button onClick={handleStartAssessmentClick} style={navButtonStyle}>Small Business Security Assessment</button>
        <button onClick={() => { setShowServices(!showServices); setShowContact(false); }} style={navButtonStyle}>Services</button>
        <button onClick={() => { setShowContact(!showContact); setShowServices(false); }} style={navButtonStyle}>Contact</button>
        <button onClick={() => navigate('/frameworks')} style={navButtonStyle}>Download Framework</button>
      </div>

      {/* Branding */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '100px' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '0.03em', color: 'white' }}>
          Silex Strategic Group
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.25rem' }}>
          Strategic Security. Real-World Results.
        </p>

        {/* Assessment Type Selection */}
        {showOptions && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'lightgray' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={choiceBtnStyle}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={choiceBtnStyle}>Information Security</button>
            </div>
          </div>
        )}
      </div>

      {/* Services Section */}
      {showServices && (
        <div style={popoverStyle}>
          <h3>Our Services</h3>
          <p>Physical and Information Security Consulting</p>
        </div>
      )}

      {/* Contact Section */}
      {showContact && (
        <div style={popoverStyle}>
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
          <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
        </div>
      )}

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2>Before You Begin</h2>
            <p style={{ fontSize: '0.95rem', color: '#ccc', marginBottom: '1rem' }}>
              This is a self-evaluation tool provided by Silex Strategic Group. You agree that:
            </p>
            <ul style={{ fontSize: '0.85rem', color: '#ccc', textAlign: 'left' }}>
              <li>Silex Strategic Group is not liable for outcomes resulting from this assessment.</li>
              <li>Use of the SBSS badge may be subject to an audit requiring evidence.</li>
              <li>Your contact info may be used for follow-up purposes.</li>
            </ul>
            <form onSubmit={handleDisclaimerSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="text" placeholder="Business Name" value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <label>
                <input type="checkbox" checked={formData.agreed} onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })} />
                {' '}I agree to the disclaimer terms.
              </label>
              <button type="submit" style={choiceBtnStyle}>Continue</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLES
const containerStyle = {
  backgroundColor: '#0c0c0e',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "'Segoe UI', sans-serif"
};

const navBarStyle = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1.5rem 1rem',
  flexWrap: 'wrap'
};

const navButtonStyle = {
  background: 'transparent',
  color: 'lightblue',
  border: '1px solid lightblue',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const choiceBtnStyle = {
  background: '#ffffff',
  color: '#000',
  padding: '0.75rem 1.25rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const popoverStyle = {
  position: 'absolute',
  top: '6rem',
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

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999
};

const modalBox = {
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '12px',
  maxWidth: '500px',
  width: '90%',
  color: 'white',
  textAlign: 'center'
};

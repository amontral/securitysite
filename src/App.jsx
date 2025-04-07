// ... existing imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [formData, setFormData] = useState({ name: '', business: '', email: '', agreed: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartAssessmentClick = () => {
    setMenuOpen(false);
    setShowDisclaimer(true);
  };

  const handleCloseDisclaimer = () => setShowDisclaimer(false);

  const handleDisclaimerSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.business && formData.email && formData.agreed) {
      const payload = { ...formData };
      try {
        await fetch("https://formspree.io/f/xwplwkpk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });
        localStorage.setItem('sbss_disclaimer', JSON.stringify({ ...payload, timestamp: new Date().toISOString() }));
        setShowDisclaimer(false);
        setShowOptions(true);
      } catch {
        alert("Failed to send form. Please try again.");
      }
    } else {
      alert('Please complete all fields and accept the disclaimer.');
    }
  };

  return (
    <div style={{ backgroundColor: '#0c0c0e', color: 'white', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Navigation Header */}
      <div style={{
        backgroundColor: '#f8f9fa', color: '#0c0c0e',
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
        padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '900px', margin: '0 auto', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Silex Strategic Group</h2>
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '1rem' }}>
            {menuOpen ? '✕' : '☰'}
          </div>
        </div>
        {menuOpen && (
          <div style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={handleStartAssessmentClick} style={navButtonStyleLight}>Assessment</button>
            <button onClick={() => navigate('/services')} style={navButtonStyleLight}>Services</button>
            <button onClick={() => window.open('https://calendly.com/silexstrategicgroup-oek', '_blank')} style={navButtonStyleLight}>Schedule Consult</button>
            <button onClick={() => setShowContact(!showContact)} style={navButtonStyleLight}>Contact</button>
            {showContact && (
              <div style={{
                position: 'absolute', right: '1rem', top: '4.5rem',
                backgroundColor: '#111', padding: '1rem', borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)', color: '#ccc'
              }}>
                <h3>Contact Us</h3>
                <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
                <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div style={{ paddingTop: '7rem', textAlign: 'center', padding: '4rem 1rem 2rem', backgroundColor: '#1f2a35' }}>
        <h1 style={{
          fontSize: '4rem', fontWeight: '900',
          letterSpacing: '0.03em', textShadow: '0 0 10px rgba(255,255,255,0.9)'
        }}>
          Silex Strategic Group
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Strategic Security. Real-World Results.</p>
        <img
          src="/sbss-badge.png"
          alt="SBSS Badge"
          className="pulsing-badge"
          style={{
            marginTop: '2rem',
            width: '180px'
          }}
        />
      </div>

      {/* Content Sections... [unchanged, same as your existing file] */}

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
                <input type="checkbox" checked={formData.agreed} onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })} />
                I agree to the disclaimer terms
              </label>
              <button type="submit" style={{ ...navButtonStyleLight, backgroundColor: '#4FC3F7', color: 'white', fontWeight: 'bold' }}>
                Continue to Assessment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Assessment Modal... [unchanged] */}

      {/* Pulsing + Hover Glow Style */}
      <style>{`
        .pulsing-badge {
          animation: pulse 2s infinite;
          opacity: 0.85;
          transition: all 0.3s ease;
        }

        .pulsing-badge:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 12px #4FC3F7) brightness(1.2);
          opacity: 1;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}

// Styles (same as yours)
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
  boxShadow: '0 0 20px rgba(0,0,0,0.7)',
  border: '2px solid #4FC3F7',
  zIndex: 11
};

const closeButton = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer'
};

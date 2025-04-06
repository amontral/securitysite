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
    setShowDisclaimer(true);
  };

  const handleDisclaimerSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.business && formData.email && formData.agreed) {
      const payload = { ...formData };
      try {
        await fetch("https://formspree.io/f/xwplwkpk", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
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
      {/* Navbar */}
      <div style={{ backgroundColor: '#f8f9fa', color: '#0c0c0e', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1rem', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Silex Strategic Group</h2>
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '2rem' }}>
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
                position: 'absolute',
                backgroundColor: '#111',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                zIndex: 1001,
                right: '1rem',
                top: '4.5rem',
                color: '#ccc'
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
        <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '0.03em', textShadow: '0 0 10px rgba(255,255,255,0.9)' }}>
          Silex Strategic Group
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Strategic Security. Real-World Results.</p>
        <img
          src="/sbss-badge.png"
          alt="SBSS Badge Background"
          style={{ marginTop: '2rem', opacity: 0.25, filter: 'drop-shadow(0 0 45px rgba(255, 255, 255, 0.6))', width: '180px', pointerEvents: 'none' }}
        />
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
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
              <button type="submit" style={{ ...navButtonStyleLight, backgroundColor: '#4FC3F7', color: 'white', fontWeight: 'bold' }}>Continue to Assessment</button>
            </form>
          </div>
        </div>
      )}

      {/* Assessment Options Modal */}
      {showOptions && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ color: 'lightgray', fontSize: '1.4rem' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={{ ...navButtonStyleLight, backgroundColor: '#4FC3F7', color: 'white', fontWeight: 'bold' }}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={{ ...navButtonStyleLight, backgroundColor: '#4FC3F7', color: 'white', fontWeight: 'bold' }}>Information Security</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

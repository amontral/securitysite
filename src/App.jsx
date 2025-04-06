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
        borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1rem',
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          maxWidth: '900px', margin: '0 auto'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Silex Strategic Group</h2>
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '2rem' }}>
            {menuOpen ? '✕' : '☰'}
          </div>
        </div>

        {menuOpen && (
          <div style={{
            textAlign: 'center', marginTop: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.5rem'
          }}>
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

      {/* Spacer for fixed nav */}
      <div style={{ height: '100px' }}></div>

      {/* Content goes here */}
      {/* Re-add Hero, SBSS sections, assessment modals, etc. as needed */}

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

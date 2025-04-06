import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [formData, setFormData] = useState({ name: '', business: '', email: '', agreed: false });
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleStartAssessmentClick = () => setShowDisclaimer(true);

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
      {/* Fixed Top Banner */}
      <div style={{ backgroundColor: '#f8f9fa', color: '#0c0c0e', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1rem', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Silex Strategic Group</h2>
          <div
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: 'pointer', fontSize: '1.5rem', display: 'block', marginRight: '0.5rem' }}
          >
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
              <div style={popoverStyle}>
                <h3>Contact Us</h3>
                <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
                <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spacer below fixed nav */}
      <div style={{ height: '100px' }}></div>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '4rem 1rem 2rem', backgroundColor: '#1f2a35' }}>
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
            The Small Business Security Standard (SBSS) is a proprietary framework developed by Silex Strategic Group. It simplifies enterprise-grade risk principles into actionable controls for small business environments.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a href="/SBSS_Framework.pdf" download style={{ ...navButtonStyleLight, color: '#4FC3F7', borderColor: '#4FC3F7' }}>
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
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/services')} style={{ ...navButtonStyleLight, color: '#4FC3F7', borderColor: '#4FC3F7' }}>
              View Our Services
            </button>
          </div>
        </section>
      </div>
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

const popoverStyle = {
  backgroundColor: '#111',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  zIndex: 2,
  minWidth: '260px',
  textAlign: 'left'
};

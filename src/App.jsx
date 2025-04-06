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
    <div style={{ ...styles.container, backgroundImage: "url('/noise-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <section style={{ ...styles.section, backgroundColor: '#0c0c0e' }}>
        <h1 style={styles.heading}>Welcome to Silex Strategic Group</h1>
        <p style={styles.text}>
          We provide tailored consulting services in physical and information security, helping businesses protect assets and stay compliant.
        </p>
      </section>

      <section style={{ ...styles.section, backgroundColor: '#111' }}>
        <h2 style={styles.subheading}>🔐 Physical Security Auditing</h2>
        <p style={styles.text}>
          Comprehensive walkthroughs and evaluations of your business premises to identify risks and ensure compliance.
        </p>
      </section>

      <section style={{ ...styles.section, backgroundColor: '#0c0c0e' }}>
        <h2 style={styles.subheading}>💻 Information Security Auditing</h2>
        <p style={styles.text}>
          Detailed reviews of your digital infrastructure using our SBSS framework to identify gaps in cybersecurity posture.
        </p>
      </section>

      <section style={{ ...styles.section, backgroundColor: '#111' }}>
        <h2 style={styles.subheading}>📘 What is SBSS?</h2>
        <p style={styles.text}>
          The Small Business Security Standard (SBSS) simplifies enterprise-grade risk controls into 25 key items for small businesses.
        </p>
      </section>

      <section style={{ ...styles.section, backgroundColor: '#0c0c0e' }}>
        <h2 style={styles.subheading}>🧱 Why Comprehensive Security?</h2>
        <p style={styles.text}>
          Security threats are both digital and physical. We help you layer your defenses and establish trust with customers.
        </p>
      </section>

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaHeading}>Explore Our Services</h2>
        <p style={styles.text}>Discover how we can support your business growth through better security.</p>
        <div style={styles.buttonRow}>
          <button onClick={handleStartAssessmentClick} style={styles.ctaButton}>Take the SBSS Assessment</button>
          <button onClick={() => navigate('/services')} style={styles.ctaButtonOutline}>View Services</button>
        </div>
      </section>

      {showDisclaimer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button onClick={handleCloseDisclaimer} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
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
              <button type="submit" style={styles.ctaButton}>Continue to Assessment</button>
            </form>
          </div>
        </div>
      )}

      {showOptions && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ color: 'lightgray' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={styles.ctaButton}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={styles.ctaButton}>Information Security</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0c0c0e',
    color: 'white',
    padding: '3rem 1.5rem',
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: 1.6,
  },
  section: {
    maxWidth: '800px',
    margin: '0 auto 3rem auto',
    padding: '2rem 1rem',
    borderRadius: '8px'
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#fff'
  },
  subheading: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: '#aadfff',
  },
  text: {
    fontSize: '1rem',
    color: '#ccc',
  },
  ctaSection: {
    backgroundColor: '#111',
    padding: '3rem 1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '4rem auto 0 auto',
    boxShadow: '0 0 30px rgba(255,255,255,0.05)'
  },
  ctaHeading: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#fff'
  },
  buttonRow: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  ctaButton: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '0.75rem 1.5rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  ctaButtonOutline: {
    backgroundColor: 'transparent',
    border: '1px solid #fff',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    textDecoration: 'none'
  }
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

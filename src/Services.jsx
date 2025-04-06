import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const [showOptions, setShowOptions] = useState(false);
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
    <div style={styles.container}>
      <section style={styles.section}>
        <h1 style={styles.heading}>Our Services</h1>
        <p style={styles.text}>
          Silex Strategic Group provides tailored consulting solutions for small businesses, with a focus on physical and information security. Whether you're looking to protect assets, secure data, or improve audit readiness, we offer services that meet real-world demands.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>Physical Security Auditing</h2>
        <p style={styles.text}>
          Our team conducts comprehensive walkthroughs and physical evaluations of your business environment. We assess risks, compliance with best practices, and offer actionable improvements—guarding your people, property, and reputation.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>Information Security Auditing</h2>
        <p style={styles.text}>
          Using our SBSS framework, we analyze your digital posture—including data encryption, access control, MFA, backups, and vendor risk. You’ll get a clear report, strategic guidance, and ongoing support to stay compliant and cyber-resilient.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>What is SBSS?</h2>
        <p style={styles.text}>
          The Small Business Security Standard (SBSS) is our proprietary framework, designed to simplify and accelerate risk identification for small businesses. With 25 essential controls in both physical and information security, SBSS empowers business owners to self-assess, improve, and earn certification.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>Why Comprehensive Security?</h2>
        <p style={styles.text}>
          In today’s world, threats are both digital and physical. A firewall won’t stop an intruder, and a deadbolt can’t stop ransomware. We help businesses create layered defenses, align policies with growth, and build trust with customers.
        </p>
      </section>

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaHeading}>Ready to Strengthen Your Business?</h2>
        <p style={styles.text}>Use the SBSS Self-Assessment to identify gaps and earn your secure badge—or contact us for a custom consultation.</p>
        <div style={styles.buttonRow}>
          <button onClick={handleStartAssessmentClick} style={styles.ctaButton}>Take the SBSS Assessment</button>
          <a href="mailto:silexstrategicgroup@gmail.com" style={styles.ctaButtonOutline}>Contact Us</a>
        </div>
      </section>

      {/* Disclaimer Modal */}
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

      {/* Assessment Type Modal */}
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

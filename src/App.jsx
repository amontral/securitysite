// Renamed from Services Page to Home Page

import React, { useState, useEffect, useRef } from 'react';
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div style={{ ...styles.container, backgroundImage: "url('/noise-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div style={styles.navWrapper}>
        <button onClick={handleStartAssessmentClick} style={styles.navButton}>Small Business Security Assessment</button>
        <button onClick={() => navigate('/services')} style={styles.navButton}>Services</button>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowContact(!showContact)} style={styles.navButton}>Contact</button>
          {showContact && (
            <div style={styles.popoverStyle}>
              <h3>Contact Us</h3>
              <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
              <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
            </div>
          )}
        </div>
      </div>

      <div style={styles.innerWrapper}>
        <div style={{ textAlign: 'center', padding: '4rem 1rem 2rem' }}>
          <h1 style={styles.heroTitle}>Silex Strategic Group</h1>
          <p style={styles.heroSubtitle}>Strategic Security. Real-World Results.</p>
          <img
            src="/sbss-badge.png"
            alt="SBSS Badge Background"
            className="pulse-glow"
            style={styles.badgeStyle}
          />
        </div>

        {[...Array(5)].map((_, i) => (
          <section
            key={i}
            className="fade-in"
            style={{
              ...styles.section,
              backgroundColor: i % 2 === 0 ? 'rgba(12, 12, 14, 0.95)' : 'rgba(17, 17, 17, 0.95)',
              backdropFilter: 'blur(2px)'
            }}>
            <h2 style={styles.subheading}>{content[i].title}</h2>
            <p style={styles.text}>{content[i].text}</p>
          </section>
        ))}

        <section className="fade-in" style={styles.ctaSection}>
          <h2 style={styles.ctaHeading}>Explore Our Services</h2>
          <p style={styles.text}>We offer Security Assessments, SBSS Certification, Strategic Consulting, and Compliance Roadmapping.</p>
          <div style={styles.buttonRow}>
            <button onClick={handleStartAssessmentClick} style={styles.ctaButton}>Take the SBSS Assessment</button>
            <button onClick={() => navigate('/services')} style={styles.ctaButtonOutline}>View Services</button>
          </div>
        </section>
      </div>

      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} Silex Strategic Group. All rights reserved.
      </footer>

      {showDisclaimer && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <button onClick={handleCloseDisclaimer} style={styles.modalCloseBtn}>&times;</button>
            <h2>Before You Begin</h2>
            <p style={styles.modalText}>
              The Small Business Security Assessment is a self-evaluation tool. By proceeding, you agree that:
            </p>
            <ul style={styles.modalList}>
              <li>No liability is assumed by Silex Strategic Group.</li>
              <li>Badge usage may require validation and audit.</li>
              <li>We may contact you with recommendations.</li>
            </ul>
            <form onSubmit={handleDisclaimerSubmit} style={styles.modalForm}>
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
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3 style={{ color: 'lightgray' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={styles.ctaButton}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={styles.ctaButton}>Information Security</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .pulse-glow {
          animation: subtlePulse 4s infinite;
        }
        @keyframes subtlePulse {
          0% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.05); opacity: 0.35; }
          100% { transform: scale(1); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}

const content = [
  {
    title: "What We Do",
    text: "Silex Strategic Group delivers tailored Physical and Information Security Consulting services to help small businesses protect assets, ensure compliance, and establish trust with customers. Our approach is grounded, practical, and aligned with real-world threats."
  },
  {
    title: "The SBSS Framework",
    text: "The Small Business Security Standard (SBSS) is a proprietary framework developed by Silex Strategic Group. It simplifies enterprise-grade risk principles into actionable controls for small business environments. The SBSS assessment quickly identifies gaps and provides visual scoring to inform next steps."
  },
  {
    title: "Why Comprehensive Security?",
    text: "Modern threats target both physical and digital assets. A cyberattack may start with a stolen keycard or an untrained employee. That’s why we advocate layered, end-to-end protection—from locked doors to encrypted networks—so your entire business ecosystem is covered."
  },
  {
    title: "SBSS Certification Benefits",
    text: "SBSS-certified businesses can display our digital badge, enhancing credibility with customers, vendors, and partners. It demonstrates that your business prioritizes both digital and physical safety."
  },
  {
    title: "Tailored Strategy for Small Businesses",
    text: "Unlike one-size-fits-all compliance checklists, our approach addresses your unique context. We consult, educate, and empower businesses to take meaningful steps toward a secure future."
  }
];


const styles = {
  container: {
    backgroundColor: '#0c0c0e',
    minHeight: '100vh',
    color: 'white',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
  navWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '1.5rem 1rem',
    flexWrap: 'wrap'
  },
  navButton: {
    background: 'transparent',
    color: 'lightblue',
    border: '1px solid lightblue',
    padding: '0.5rem 1.25rem',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  innerWrapper: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '900',
    letterSpacing: '0.03em',
    textShadow: '0 0 10px rgba(255,255,255,0.9)'
  },
  heroSubtitle: {
    color: '#aaa',
    fontSize: '1.2rem'
  },
  badgeStyle: {
    marginTop: '2rem',
    opacity: 0.25,
    filter: 'drop-shadow(0 0 45px rgba(255, 255, 255, 0.6))',
    width: '180px',
    pointerEvents: 'none'
  },
  section: {
    marginBottom: '2.5rem',
    padding: '2rem',
    borderRadius: '10px'
  },
  subheading: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#aadfff',
    marginBottom: '0.75rem'
  },
  text: {
    fontSize: '1rem',
    color: '#ccc'
  },
  ctaSection: {
    backgroundColor: '#111',
    padding: '3rem 1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    marginTop: '4rem',
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
    border: 'none',
    cursor: 'pointer'
  },
  ctaButtonOutline: {
    backgroundColor: 'transparent',
    border: '1px solid #fff',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  footer: {
    textAlign: 'center',
    padding: '2rem 1rem',
    fontSize: '0.85rem',
    color: '#777',
    marginTop: '4rem'
  },
  modalOverlay: {
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
  },
  modalBox: {
    position: 'relative',
    backgroundColor: '#1a1a1a',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '500px',
    width: '90%',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  },
  modalText: {
    fontSize: '0.95rem',
    color: '#ccc'
  },
  modalList: {
    fontSize: '0.85rem',
    textAlign: 'left',
    color: '#ccc'
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer'
  },
  popoverStyle: {
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
  }
};


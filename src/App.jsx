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
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <img src="/ssg-logo.png" alt="SSG Logo" style={styles.logo} />
        <button onClick={handleStartAssessmentClick} style={styles.navButton}>Assessment</button>
        <button onClick={() => navigate('/services')} style={styles.navButton}>Services</button>
        <button onClick={() => setShowContact(!showContact)} style={styles.navButton}>Contact</button>
        {showContact && (
          <div style={styles.popoverStyle}>
            <h3>Contact Us</h3>
            <p>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
            <p>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
          </div>
        )}
      </div>

      <div style={styles.contentWrapper}>
        <section style={styles.heroSection}>
          <h1 style={styles.headingStyle}>Silex Strategic Group</h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem', textAlign: 'center' }}>Strategic Security. Real-World Results.</p>
          <div style={{ textAlign: 'center' }}>
            <img
              src="/sbss-badge.png"
              alt="SBSS Badge Background"
              className="pulse-glow"
              style={styles.badgeStyle}
            />
          </div>
        </section>

        {[
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
            title: "Explore Our Services",
            text: "We offer Security Assessments, SBSS Certification, Strategic Consulting, and Compliance Roadmapping."
          }
        ].map(({ title, text }) => (
          <section style={styles.contentSection} key={title}>
            <h2 style={styles.subheadingCentered}>{title}</h2>
            <p style={styles.paragraph}>{text}</p>
            {title === "Explore Our Services" && (
              <div>
                <button onClick={() => navigate('/services')} style={styles.navButton}>View Our Services</button>
              </div>
            )}
          </section>
        ))}

        <footer style={styles.footer}>
          &copy; {new Date().getFullYear()} Silex Strategic Group. All rights reserved.
        </footer>
      </div>

      {showDisclaimer && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <button onClick={handleCloseDisclaimer} style={styles.closeButton}>&times;</button>
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
              <button type="submit" style={styles.navButton}>Continue to Assessment</button>
            </form>
          </div>
        </div>
      )}

      {showOptions && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3 style={{ color: 'lightgray' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={styles.navButton}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={styles.navButton}>Information Security</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
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

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#0c0c0e',
    color: 'white',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    backgroundImage: "url('/noise-texture.png')",
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    minHeight: '100vh'
  },
  sidebar: {
    width: '200px',
    padding: '2rem 1rem',
    backgroundColor: '#111',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  logo: {
    width: '50px',
    marginBottom: '1.5rem'
  },
  navButton: {
    background: 'transparent',
    color: 'lightblue',
    border: '1px solid lightblue',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  contentWrapper: {
    flex: 1,
    padding: '2rem'
  },
  headingStyle: {
    fontSize: '3rem',
    fontWeight: '900',
    letterSpacing: '0.03em',
    textShadow: '0 0 10px rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  badgeStyle: {
    marginTop: '2rem',
    opacity: 0.25,
    filter: 'drop-shadow(0 0 45px rgba(255, 255, 255, 0.6))',
    width: '180px',
    pointerEvents: 'none'
  },
  contentSection: {
    marginBottom: '2.5rem',
    padding: '1.5rem',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '8px'
  },
  subheadingCentered: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#aadfff',
    marginBottom: '0.75rem',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: '1rem',
    color: '#ccc'
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
  closeButton: {
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
    backgroundColor: '#1c1c1c',
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1rem',
    boxShadow: '0 0 10px rgba(255,255,255,0.1)',
    fontSize: '0.9rem'
  },
  footer: {
    textAlign: 'center',
    marginTop: '3rem',
    color: '#666',
    fontSize: '0.9rem'
  }
};

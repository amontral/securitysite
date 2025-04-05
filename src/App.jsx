import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div style={{ backgroundColor: '#0c0c0e', height: '100vh', color: 'white', position: 'relative', overflow: 'hidden', fontFamily: "'Segoe UI', 'Roboto', 'Arial Black', sans-serif" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: '#0c0c0e' },
          fullScreen: { enable: true, zIndex: 0 },
          fpsLimit: 60,
          particles: {
            number: { value: 80 },
            color: { value: '#ffffff' },
            links: { enable: true, color: '#ffffff', distance: 130 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.4 },
            size: { value: { min: 1, max: 3 } }
          }
        }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Navigation */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', gap: '2rem', padding: '1.5rem 1rem', flexWrap: 'wrap' }}>
        <button onClick={() => setShowOptions(true)} style={navButtonStyle}>Small Business Security Assessment</button>
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShowServices(!showServices); setShowContact(false); }} style={navButtonStyle}>Services</button>
          {showServices && (
            <div style={popoverStyle}>
              <h3 style={{ margin: '0 0 0.5rem' }}>Our Services</h3>
              <p style={{ margin: 0 }}>Physical and Information Security Consulting</p>
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShowContact(!showContact); setShowServices(false); }} style={navButtonStyle}>Contact</button>
          {showContact && (
            <div style={popoverStyle}>
              <h3 style={{ margin: '0 0 0.5rem' }}>Contact Us</h3>
              <p style={{ margin: '0.25rem 0' }}>Email: <a href="mailto:silexstrategicgroup@gmail.com" style={{ color: 'lightblue' }}>silexstrategicgroup@gmail.com</a></p>
              <p style={{ margin: '0.25rem 0' }}>Phone: <a href="tel:5019527172" style={{ color: 'lightblue' }}>501-952-7172</a></p>
            </div>
          )}
        </div>
      </div>

      {/* Branding */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '100px' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', letterSpacing: '0.03em', textShadow: '0 0 10px rgba(255,255,255,0.2)', marginBottom: '1rem' }}>
          Silex Strategic Group
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem' }}>
          Strategic Security. Real-World Results.
        </p>

        {/* Assessment Type Selection */}
        {showOptions && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'lightgray' }}>Choose Assessment Type</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/assessment?type=physical')} style={choiceBtnStyle}>Physical Security</button>
              <button onClick={() => navigate('/assessment?type=infosec')} style={choiceBtnStyle}>Information Security</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const navButtonStyle = {
  background: 'transparent',
  color: 'lightblue',
  border: '1px solid lightblue',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  textDecoration: 'none',
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

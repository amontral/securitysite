// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div style={{ backgroundColor: '#0c0c0e', minHeight: '100vh', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: '#0c0c0e' } },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            color: { value: '#ffffff' },
            links: { enable: true, color: '#ffffff' },
            move: { enable: true, speed: 1 },
          },
        }}
        style={{ position: 'absolute', zIndex: 0 }}
      />

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1.5rem', position: 'relative', zIndex: 2 }}>
        <Link to="/assessment" style={navLinkStyle}>Start Assessment</Link>
        <Link to="/aboutsbss" style={navLinkStyle}>About SBSS</Link>
        <Link to="/services" style={navLinkStyle}>Services</Link>
        <Link to="/contact" style={navLinkStyle}>Contact</Link>
      </nav>

      <div style={{ textAlign: 'center', paddingTop: '8rem', zIndex: 1, position: 'relative' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', textShadow: '2px 2px 8px #000' }}>Silex Strategic Group</h1>
        <p style={{ fontSize: '1.25rem', color: 'lightgray', marginTop: '1rem' }}>
          Strategic Security. Real-World Results.
        </p>
      </div>
    </div>
  );
}

const navLinkStyle = {
  color: 'white',
  padding: '0.5rem 1rem',
  border: '1px solid #444',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '1rem'
};

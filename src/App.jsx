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
    <div style={{ backgroundColor: '#0c0c0e', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: '#0c0c0e' },
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.4 },
            links: { enable: true, color: '#888' },
          },
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
        }}
      />

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1.5rem', position: 'relative', zIndex: 2 }}>
        <Link to="/assessment?type=physical" style={navLinkStyle}>Start Assessment</Link>
        <Link to="/services" style={navLinkStyle}>Services</Link>
        <Link to="/contact" style={navLinkStyle}>Contact</Link>
      </nav>

      <div style={{ textAlign: 'center', paddingTop: '8rem', zIndex: 2, position: 'relative' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', textShadow: '2px 2px 8px #000' }}>
          Silex Strategic Group
        </h1>
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

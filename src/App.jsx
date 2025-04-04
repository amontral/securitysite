import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div style={{ backgroundColor: '#0c0c0e', height: '100vh', color: 'white', textAlign: 'center', position: 'relative' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: '#0c0c0e' },
          fpsLimit: 60,
          interactivity: { detectsOn: 'canvas', events: { resize: true } },
          particles: { color: { value: '#ffffff' }, links: { enable: true }, move: { enable: true } }
        }}
        style={{ position: 'absolute' }}
      />
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '150px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Silex Strategic Group</h1>
        <p style={{ color: 'gray', marginBottom: '2rem' }}>Strategic Security. Real-World Results.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/assessment" style={{ background: 'white', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 'bold' }}>Start SBSS Assessment</Link>
          <Link to="/about" style={{ background: 'white', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 'bold' }}>What is SBSS?</Link>
        </div>
      </div>
    </div>
  );
}

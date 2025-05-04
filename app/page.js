'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Immagine di sfondo */}
      <img
        src="https://images.unsplash.com/photo-1542224566-6e19c54d037b?auto=format&fit=crop&w=1950&q=80"
        alt="background"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />

      {/* Overlay scuro */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }} />

      {/* Contenuto */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '4rem 1rem',
        color: '#ffffff'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          👋 Benvenuto su <span style={{ color: '#00ff88' }}>PLANB</span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          fontStyle: 'italic',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          color: '#ffffff'
        }}>
          “Il rischio nasce dal non sapere cosa stai facendo.” — Warren Buffett
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/dashboard"><div style={buttonStyle}>📊 Dashboard</div></Link>
          <Link href="/proposte"><div style={buttonStyle}>💡 Proposte</div></Link>
          <Link href="/radar"><div style={buttonStyle}>📡 Radar</div></Link>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#161b22',
  padding: '1rem 2rem',
  borderRadius: '12px',
  border: '1px solid #333',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#00ff88',
  cursor: 'pointer',
  transition: '0.3s',
};



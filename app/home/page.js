'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(status);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Sfondo immagine */}
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
          Benvenuto su <span style={{ color: '#00ff88' }}>PLANB</span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          fontStyle: 'italic',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          color: 'white'
        }}>
          “Il rischio nasce dal non sapere cosa stai facendo.” — Warren Buffett
        </p>

        {/* Mostra login solo se NON loggato */}
        {!isLoggedIn && (
          <Link href="/login">
            <div style={{
              backgroundColor: '#ffffff10',
              padding: '1rem 2rem',
              borderRadius: '12px',
              border: '1px solid #00ff88',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'inline-block',
              marginBottom: '2rem',
              transition: '0.3s',
            }}>
              👉 Accedi al login
            </div>
          </Link>
        )}

        {/* Frase Charlie Munger */}
        <p style={{
          fontSize: '1rem',
          fontStyle: 'italic',
          maxWidth: '600px',
          margin: '2rem auto 0',
          color: 'white'
        }}>
          “I grandi guadagni non si fanno comprando o vendendo, ma aspettando.” — Charlie Munger
        </p>
      </div>
    </div>
  );
}


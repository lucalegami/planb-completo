'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = () => {
    if (password === 'planb123') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      setError('Password errata. Riprova.');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🔐 Accesso</h1>
      <input
        type="password"
        value={password}
        placeholder="Inserisci la password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', marginTop: '1rem' }}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1.5rem',
          fontSize: '1rem',
          cursor: 'pointer',
          background: '#00ff88',
          border: 'none',
          borderRadius: '8px',
        }}
      >
        Login
      </button>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}


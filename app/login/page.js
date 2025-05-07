'use client';
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Caricamento...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const params = useSearchParams();

  const denied = params.get('denied');

  const handleLogin = () => {
    if (username && password) {
      document.cookie = 'isLoggedIn=true; path=/';
      router.push('/home');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Effettua il login</h1>
      {denied && <p style={{ color: 'red' }}>Effettua il login per continuare</p>}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </div>
  );
}

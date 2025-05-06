'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Radar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(check);
    if (!check) router.push('/login');
  }, [router]);

  if (!isLoggedIn) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📡 Radar</h1>
      {/* Inserisci qui il contenuto radar */}
    </div>
  );
}

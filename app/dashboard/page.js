'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
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
      <h1>📊 Dashboard</h1>
      {/* Qui resta il tuo contenuto già esistente */}
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';

export default function SegnaliWallStreet() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await fetch('/delphic-data.json');
        const data = await res.json();
        setSignals(data);
      } catch (error) {
        console.error('Errore nel caricamento dei segnali:', error);
      }
    };
    fetchSignals();
  }, []);

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', letterSpacing: '1px' }}>
        SEGNALI WALL STREET
      </h1>

      {signals.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Nessun segnale disponibile.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          {signals.map((s, i) => (
            <div key={i} style={{
              backgroundColor: '#161b22',
              padding: '1.5rem',
              borderRadius: '12px',
              width: '280px',
              boxShadow: '0 0 12px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#00ff88' }}>{s.symbol}</h2>
              <p>💵 Prezzo: <strong>{s.price} USD</strong></p>
              <p>SMA 4: {s.sma4}</p>
              <p>SMA 18: {s.sma18}</p>
              <p>SMA 40: {s.sma40}</p>
              <p style={{ marginTop: '0.8rem', fontWeight: 'bold', color: '#ffd700' }}>
                {s.signal}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



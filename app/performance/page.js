'use client';
import { useEffect, useState } from 'react';

export default function PerformancePage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetch('/delphic-performance.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Errore nel caricamento dei dati:', err));
  }, []);

  const filteredData = data.filter((entry) => {
    if (filter === 'WIN') return entry.result === 'WIN';
    if (filter === 'LOSS') return entry.result === 'LOSS';
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const p1 = parseFloat(a.profitPercent);
    const p2 = parseFloat(b.profitPercent);
    return p2 - p1;
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
        Performance Strategia Delphic
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => setFilter('ALL')} style={btn(filter === 'ALL')}>Tutti</button>
        <button onClick={() => setFilter('WIN')} style={btn(filter === 'WIN')}>Solo WIN</button>
        <button onClick={() => setFilter('LOSS')} style={btn(filter === 'LOSS')}>Solo LOSS</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {sortedData.map((item, i) => (
          <div key={i} style={{
            backgroundColor: '#161b22',
            border: '1px solid #333',
            borderRadius: '0px',
            padding: '1rem',
            width: '280px',
            color: 'white'
          }}>
            <h2 style={{ color: '#4a70b9', fontSize: '1.2rem' }}>{item.symbol}</h2>
            <p>BUY: {item.buyDate}</p>
            <p>SELL: {item.sellDate}</p>
            <p style={{
              fontWeight: 'bold',
              color: item.result === 'WIN' ? '#00ff88' : '#ff5f5f'
            }}>
              {item.result} – {item.profitPercent}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const btn = (active) => ({
  padding: '0.5rem 1.2rem',
  margin: '0 0.5rem',
  backgroundColor: active ? '#4a70b9' : '#0d1117',
  color: active ? '#fff' : '#4a70b9',
  border: '2px solid #4a70b9',
  fontWeight: 'bold',
  cursor: 'pointer',
  textTransform: 'uppercase',
  borderRadius: '0px'
});

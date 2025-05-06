'use client';
import { useEffect, useState } from 'react';

const symbols = ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'GOOGL', 'META', 'NVDA', 'JPM', 'UNH', 'XOM'];

const mockPrices = {
  AAPL: Array.from({ length: 100 }, (_, i) => 160 + i * 0.3 + Math.random()),
  MSFT: Array.from({ length: 100 }, (_, i) => 290 + i * 0.25 + Math.random()),
  TSLA: Array.from({ length: 100 }, (_, i) => 200 + i * 0.5 - Math.random()),
  AMZN: Array.from({ length: 100 }, (_, i) => 120 + i * 0.35 + Math.random()),
  GOOGL: Array.from({ length: 100 }, (_, i) => 105 + i * 0.3 + Math.random()),
  META: Array.from({ length: 100 }, (_, i) => 150 + i * 0.4 + Math.random()),
  NVDA: Array.from({ length: 100 }, (_, i) => 250 + i * 0.6 + Math.random()),
  JPM: Array.from({ length: 100 }, (_, i) => 130 + i * 0.2 + Math.random()),
  UNH: Array.from({ length: 100 }, (_, i) => 500 + i * 0.1 + Math.random()),
  XOM: Array.from({ length: 100 }, (_, i) => 100 + i * 0.15 + Math.random()),
};

const sma = (arr, period, endIndex) =>
  arr.slice(endIndex - period + 1, endIndex + 1).reduce((a, b) => a + b, 0) / period;

const regressionSlope = (arr) => {
  const n = arr.length;
  const x = Array.from({ length: n }, (_, i) => i + 1);
  const xMean = x.reduce((a, b) => a + b, 0) / n;
  const yMean = arr.reduce((a, b) => a + b, 0) / n;
  const num = x.reduce((sum, xi, i) => sum + (xi - xMean) * (arr[i] - yMean), 0);
  const den = x.reduce((sum, xi) => sum + (xi - xMean) ** 2, 0);
  return num / den;
};

export default function DelphicSignals() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const results = [];

    for (let symbol of symbols) {
      const data = mockPrices[symbol];
      const i = data.length - 1;

      const sma4 = sma(data, 4, i);
      const sma18 = sma(data, 18, i);
      const sma40 = sma(data, 40, i);
      const price = data[i];
      const slope100 = regressionSlope(data.slice(i - 99, i + 1));

      const condition1 = sma18 > sma40;
      const condition2 = sma4 > sma18;
      const condition3 = price > sma18;
      const bullish = condition1 && condition2 && condition3 && slope100 > 0;

      const fail = condition1 && condition2 && price < sma40;

      if (bullish || fail) {
        results.push({
          symbol,
          price: price.toFixed(2),
          sma4: sma4.toFixed(2),
          sma18: sma18.toFixed(2),
          sma40: sma40.toFixed(2),
          trend: slope100.toFixed(4),
          signal: bullish ? '📈 BUY Delphic' : '⚠️ FAIL',
          color: bullish ? '#00ff88' : '#ff5f5f',
        });
      }
    }

    setSignals(results);
  }, []);

  return (
    <div style={{ padding: '2rem', background: '#0d1117', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>📐 Segnali Delphic – S&P 500 (Top 10)</h1>

      {signals.length === 0 ? (
        <p>Nessun segnale attivo.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {signals.map((s, i) => (
            <div key={i} style={{
              backgroundColor: '#161b22',
              borderLeft: `6px solid ${s.color}`,
              padding: '1rem',
              borderRadius: '12px',
              width: '280px'
            }}>
              <h2>{s.symbol}</h2>
              <p>Prezzo: ${s.price}</p>
              <p>SMA 4: {s.sma4}</p>
              <p>SMA 18: {s.sma18}</p>
              <p>SMA 40: {s.sma40}</p>
              <p>Trend (Reg100): {s.trend}</p>
              <p style={{ color: s.color, fontWeight: 'bold' }}>{s.signal}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

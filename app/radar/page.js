
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { symbols } from '../data/sp500_top50';

const API_KEY = 'd0b40d9r01qo0h63enegd0b40d9r01qo0h63enf0';

const getSmartScore = ({ rsi, macd, ema, volumeChange }) => {
  let score = 0;
  if (rsi > 50 && rsi < 70) score += 25;
  if (macd > 0) score += 25;
  if (ema.slope > 0) score += 25;
  if (volumeChange > 0.05) score += 25;
  return score;
};

const getColor = (score) => {
  if (score >= 75) return '#00ff88';
  if (score >= 50) return '#ffd700';
  return '#ff5f5f';
};

export default function Radar() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      const results = await Promise.all(symbols.map(async (symbol) => {
        try {
          const rsiRes = await fetch(`https://finnhub.io/api/v1/indicator?symbol=${symbol}&resolution=D&indicator=rsi&timeperiod=14&token=${API_KEY}`);
          const rsiData = await rsiRes.json();
          const rsi = rsiData?.technicalAnalysis?.rsi?.slice(-1)[0];

          const macdRes = await fetch(`https://finnhub.io/api/v1/indicator?symbol=${symbol}&resolution=D&indicator=macd&token=${API_KEY}`);
          const macdData = await macdRes.json();
          const macd = macdData?.technicalAnalysis?.macd?.slice(-1)[0]?.macd;

          const emaRes = await fetch(`https://finnhub.io/api/v1/indicator?symbol=${symbol}&resolution=D&indicator=ema&timeperiod=20&token=${API_KEY}`);
          const emaData = await emaRes.json();
          const emaNow = emaData?.technicalAnalysis?.ema?.slice(-1)[0];
          const emaPrev = emaData?.technicalAnalysis?.ema?.slice(-2)[0];
          const emaSlope = emaNow > emaPrev ? 1 : -1;

          const volumeChange = Math.random() * 0.2;
          const score = getSmartScore({ rsi, macd, ema: { slope: emaSlope }, volumeChange });

          return {
            symbol,
            rsi: rsi?.toFixed(2),
            macd: macd?.toFixed(2),
            emaSlope: emaSlope > 0 ? '⬆️' : '⬇️',
            volumeChange: (volumeChange * 100).toFixed(1) + '%',
            score,
          };
        } catch {
          return { symbol, error: true };
        }
      }));

      const strongAssets = results
        .filter(a => a.symbol && a.score >= 75)
        .sort((a, b) => b.score - a.score);

      setAssets(strongAssets);
      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) return <p style={{ padding: '2rem' }}>Caricamento...</p>;

  return (
    <div style={{ padding: '2rem', background: '#0d1117', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>📡 Radar Momentum</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {assets.map((a, i) => (
          <div key={i} style={{ backgroundColor: '#161b22', borderRadius: '12px', padding: '1rem', width: '240px' }}>
            <h3>{a.symbol}</h3>
            <p>RSI: {a.rsi ?? '–'}</p>
            <p>MACD: {a.macd ?? '–'}</p>
            <p>EMA: {a.emaSlope ?? '–'}</p>
            <p>Volume: {a.volumeChange ?? '–'}</p>
            <p style={{
              backgroundColor: getColor(a.score),
              color: '#000',
              padding: '0.4rem',
              borderRadius: '6px',
              marginTop: '0.5rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Smart Score: {a.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

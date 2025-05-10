'use client';
import { useEffect, useState } from 'react';

export default function SegnaliWallStreet() {
  const [dati, setDati] = useState([]);
  const [ultima, setUltima] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/delphic-data.json');
      const json = await res.json();
      setDati(json);

      const ultimaOra = json.length ? new Date().toLocaleString('it-IT') : null;
      setUltima(ultimaOra);
    }
    fetchData();
  }, []);

  return (
    <main className="wallstreet-container">
      <h1>📊 Segnali Wall Street – Strategia Plan B</h1>
      {ultima && <div className="last-update">Ultimo aggiornamento: {ultima}</div>}
      <div className="grid-container">
        {dati.map((entry, i) => (
          <div key={i} className="card">
            <h2>
              <span
                className={`dot ${
                  entry.segnale.includes('ENTRA LONG')
                    ? 'green'
                    : entry.segnale.includes('TENDENZA NEGATIVA')
                    ? 'red'
                    : 'gray'
                }`}
              ></span>
              {entry.simbolo}
            </h2>
            <p>📈 Prezzo: ${entry.prezzo}</p>
            <p>🟡 SMA 4: {entry.SMA_4}</p>
            <p>🟠 SMA 18: {entry.SMA_18}</p>
            <p>🔵 SMA 40: {entry.SMA_40}</p>
            <p>📐 Slope: {entry.slope}</p>
            <p className="segnale">{entry.segnale}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

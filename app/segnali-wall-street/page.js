// app/segnali-wall-street/page.js
'use client';
import { useEffect, useState } from 'react';

export default function SegnaliWallStreet() {
  const [data, setData] = useState([]);
  const [errore, setErrore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/delphic-data.json');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setErrore(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Segnali Wall Street (Strategia Delphic)</h1>

      {errore ? (
        <p className="text-red-500 text-center">❌ Errore nel recupero dei dati</p>
      ) : data.length === 0 ? (
        <p className="text-center">Caricamento...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Simbolo</th>
                <th className="p-3 border border-gray-700">Prezzo</th>
                <th className="p-3 border border-gray-700">SMA 4</th>
                <th className="p-3 border border-gray-700">SMA 18</th>
                <th className="p-3 border border-gray-700">SMA 40</th>
                <th className="p-3 border border-gray-700">Slope</th>
                <th className="p-3 border border-gray-700">Segnale</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-center hover:bg-gray-800 transition">
                  <td className="p-3 border border-gray-700 font-bold">{item.simbolo}</td>
                  <td className="p-3 border border-gray-700">${item.prezzo}</td>
                  <td className="p-3 border border-gray-700">{item.SMA_4}</td>
                  <td className="p-3 border border-gray-700">{item.SMA_18}</td>
                  <td className="p-3 border border-gray-700">{item.SMA_40}</td>
                  <td className="p-3 border border-gray-700">{item.slope}</td>
                  <td
                    className={`p-3 border border-gray-700 font-semibold ${
                      item.segnale.includes('🟢')
                        ? 'text-green-400'
                        : item.segnale.includes('🔻')
                        ? 'text-red-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    {item.segnale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

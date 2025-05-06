const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(res => res.default(...args));

const API_KEY = '5528b8033b7c46c6807ab5ca57bd6445';

const symbols = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'BRK.B', 'UNH', 'JNJ',
  'V', 'XOM', 'PG', 'MA', 'JPM', 'HD', 'LLY', 'ABBV', 'CVX', 'PEP',
  'KO', 'AVGO', 'MRK', 'WMT', 'ADBE', 'COST', 'TMO', 'CRM', 'BAC', 'MCD',
  'ORCL', 'ACN', 'DIS', 'ABT', 'LIN', 'NKE', 'DHR', 'QCOM', 'TXN', 'NEE',
  'UPS', 'WFC', 'INTU', 'PM', 'AMGN', 'AMD', 'HON', 'MS', 'IBM', 'GS'
];

async function fetchPrices(symbol) {
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=60&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.values || data.values.length < 40) return null;

    const close = data.values.map(v => parseFloat(v.close));
    const price = parseFloat(data.values[0].close);

    const sma = (arr, n) => arr.slice(0, n).reduce((sum, val) => sum + val, 0) / n;

    return {
      symbol,
      price: price.toFixed(2),
      sma4: sma(close, 4).toFixed(2),
      sma18: sma(close, 18).toFixed(2),
      sma40: sma(close, 40).toFixed(2),
    };
  } catch (err) {
    console.error(`Errore fetch ${symbol}:`, err);
    return null;
  }
}

// ✅ Scheduled Netlify Function handler
exports.handler = async function () {
  const segnali = [];

  for (const symbol of symbols) {
    const entry = await fetchPrices(symbol);
    if (!entry) continue;

    const { sma4, sma18, sma40, price } = entry;

    const cond1 = parseFloat(sma18) > parseFloat(sma40); // 18 > 40
    const cond2 = parseFloat(sma4) > parseFloat(sma18);  // 4 > 18
    const cond3 = parseFloat(sma4) < parseFloat(sma18);  // 4 < 18

    let segnale = '⏳ In attesa di condizioni Delphic';
    if (cond1 && cond2) segnale = '🟢 Segnale di acquisto';
    else if (!cond1 && cond3) segnale = '🔴 Segnale di vendita';

    segnali.push({
      simbolo: entry.symbol,
      prezzo: price,
      SMA_4: sma4,
      SMA_18: sma18,
      SMA_40: sma40,
      segnale,
    });
  }

  const outputPath = path.join(__dirname, '../../public/delphic-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(segnali, null, 2));
  console.log(`✅ Scritti ${segnali.length} segnali in ${outputPath}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, count: segnali.length })
  };
};

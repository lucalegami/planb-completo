// functions-src/generate-delphic.js

const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(res => res.default(...args));

const API_KEY = '5528b8033b7c46c6807ab5ca57bd6445';

const symbols = [
  'AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META', 'TSLA', 'BRK.B', 'UNH', 'V',
  'JNJ', 'XOM', 'WMT', 'JPM', 'MA', 'PG', 'LLY', 'HD', 'CVX', 'MRK', 'PEP',
  'ABBV', 'AVGO', 'COST', 'KO', 'BAC', 'TMO', 'DIS', 'ADBE', 'PFE', 'CSCO',
  'NFLX', 'ABT', 'CRM', 'ORCL', 'ACN', 'MCD', 'WFC', 'DHR', 'QCOM', 'INTC',
  'TXN', 'NEE', 'LIN', 'NKE', 'AMD', 'PM', 'LOW', 'UPS', 'MS'
];

// Helpers
function sma(values, n) {
  return values.slice(0, n).reduce((sum, val) => sum + val, 0) / n;
}

function regressionSlope(values) {
  const n = values.length;
  const x = [...Array(n).keys()];
  const xMean = x.reduce((a, b) => a + b, 0) / n;
  const yMean = values.reduce((a, b) => a + b, 0) / n;
  const num = x.reduce((sum, xi, i) => sum + (xi - xMean) * (values[i] - yMean), 0);
  const den = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);
  return num / den;
}

async function fetchDailyHistory(symbol) {
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=100&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.values || [];
}

async function processSymbol(symbol) {
  const data = await fetchDailyHistory(symbol);
  if (data.length < 60) return null;

  const close = data.map(d => parseFloat(d.close));
  const latestPrice = close[0];

  const sma4 = sma(close, 4);
  const sma18 = sma(close, 18);
  const sma40 = sma(close, 40);
  const slope = regressionSlope(close.slice(0, 100));

  const condition1 = sma18 > sma40;
  const condition2 = latestPrice > sma18;
  const condition3 = slope > 0;

  let signal = '⏳ In attesa di condizioni Delphi';
  if (condition1 && condition2 && condition3) {
    signal = '🟢 Segnale di acquisto';
  } else if (!condition3) {
    signal = '🔻 Tendenza negativa';
  }

  return {
    simbolo: symbol,
    prezzo: latestPrice.toFixed(2),
    SMA_4: sma4.toFixed(2),
    SMA_18: sma18.toFixed(2),
    SMA_40: sma40.toFixed(2),
    slope: slope.toFixed(5),
    segnale: signal
  };
}

async function run() {
  const entries = [];
  for (const symbol of symbols) {
    try {
      const result = await processSymbol(symbol);
      if (result) entries.push(result);
    } catch (err) {
      console.error('Errore su', symbol, err);
    }
  }

  const projectRoot = path.join(__dirname, '..'); // vai nella root
  fs.writeFileSync(
    path.join(projectRoot, 'public', 'delphic-data.json'),
    JSON.stringify(entries, null, 2)
  );

  console.log('✅ Dati scritti con successo');
}

run();

// netlify/functions/generate-delphic.js
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(res => res.default(...args));

const API_KEY = '5528b8033b7c46c6807ab5ca57bd6445';
const symbols = [
  'AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META', 'BRK.B', 'UNH', 'TSLA', 'XOM',
  'JNJ', 'JPM', 'V', 'PG', 'LLY', 'HD', 'MA', 'MRK', 'PEP', 'ABBV',
  'COST', 'AVGO', 'KO', 'ADBE', 'WMT', 'CVX', 'MCD', 'BAC', 'CRM', 'CSCO',
  'TMO', 'NFLX', 'ABT', 'INTC', 'ACN', 'QCOM', 'LIN', 'NEE', 'DHR', 'WFC',
  'TXN', 'AMD', 'BMY', 'PM', 'AMGN', 'UNP', 'HON', 'RTX', 'LOW', 'INTU'
];

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
  const dates = data.map(d => d.datetime);
  const latestPrice = close[0];

  const sma4 = sma(close, 4);
  const sma18 = sma(close, 18);
  const sma40 = sma(close, 40);
  const slope = regressionSlope(close.slice(0, 100));

  const valid = sma18 > sma40 && slope > 0;
  const crossedDown = close[0] < sma18 && valid;

  let signal = '⏳ In attesa';
  if (crossedDown) {
    signal = '🟢 Segnale di acquisto';
  } else if (sma4 < sma18 && sma18 < sma40) {
    signal = '🔴 Segnale di vendita';
  }

  const entry = {
    symbol,
    date: dates[0],
    price: latestPrice.toFixed(2),
    sma4: sma4.toFixed(2),
    sma18: sma18.toFixed(2),
    sma40: sma40.toFixed(2),
    slope: slope.toFixed(5),
    signal
  };

  // Simula performance
  const buyPrice = sma18 * 1.01;
  const sellPrice = close[5] || buyPrice * 0.97;
  const profit = ((sellPrice - buyPrice) / buyPrice) * 100;

  const result = {
    symbol,
    buyDate: dates[0],
    sellDate: dates[5] || dates[1],
    profitPercent: `${profit >= 0 ? '+' : ''}${profit.toFixed(2)}%`,
    result: profit > 0 ? 'WIN' : 'LOSS'
  };

  return { entry, result };
}

async function run() {
  const entries = [];
  const results = [];

  for (const symbol of symbols) {
    try {
      const data = await processSymbol(symbol);
      if (data) {
        entries.push(data.entry);
        results.push(data.result);
      }
    } catch (err) {
      console.error('Errore su', symbol, err);
    }
  }

  fs.writeFileSync(path.join(__dirname, '../../public/delphic-data.json'), JSON.stringify(entries, null, 2));
  fs.writeFileSync(path.join(__dirname, '../../public/delphic-performance.json'), JSON.stringify(results, null, 2));
  console.log('✅ Dati scritti con successo');
}

run();

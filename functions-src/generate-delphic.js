const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(res => res.default(...args));

const API_KEY = '5528b8033b7c46c6807ab5ca57bd6445';
const symbols = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "UNH", "V", "JNJ",
  "XOM", "WMT", "JPM", "MA", "PG", "LLY", "HD", "CVX", "MRK", "PEP", "ABBV", "AVGO",
  "COST", "KO", "BAC", "TMO", "DIS", "ADBE", "PFE", "CSCO", "NFLX", "ABT", "CRM",
  "ORCL", "ACN", "MCD", "WFC", "DHR", "QCOM", "INTC", "TXN", "NEE", "LIN", "NKE",
  "AMD", "PM", "LOW", "UPS", "MS"
];

// Calcoli matematici
function sma(values, period, offset = 0) {
  const slice = values.slice(offset, offset + period);
  return slice.reduce((sum, v) => sum + v, 0) / period;
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

async function fetchHistory(symbol) {
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=120&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.values || [];
}

function findEntrySignal(prices, symbol) {
  const close = prices.map(p => parseFloat(p.close)).reverse();
  const dates = prices.map(p => p.datetime).reverse();

  if (close.length < 60) return null;

  const slope = regressionSlope(close.slice(-100));
  const latest = close.length - 1;

  let trendStartedAt = null;
  for (let i = 40; i < close.length - 1; i++) {
    const sma18_y = sma(close, 18, i - 17);
    const sma40_y = sma(close, 40, i - 39);
    const sma18_y1 = sma(close, 18, i - 18);
    const sma40_y1 = sma(close, 40, i - 40);
    if (sma18_y1 < sma40_y1 && sma18_y > sma40_y) {
      trendStartedAt = i;
      break;
    }
  }

  if (trendStartedAt === null) return null;

  let pullback = false;
  for (let i = trendStartedAt + 1; i < latest - 1; i++) {
    const sma18 = sma(close, 18, i - 17);
    if (close[i] < sma18) {
      pullback = true;
      break;
    }
  }

  const sma18_now = sma(close, 18, latest - 17);
  const price_now = close[latest];

  const signal =
    trendStartedAt &&
    pullback &&
    price_now > sma18_now &&
    slope > 0
      ? "🟢 ENTRA LONG"
      : "⏳ In attesa";

  return {
    simbolo: symbol,
    prezzo: price_now.toFixed(2),
    SMA_4: sma(close, 4, latest - 3).toFixed(2),
    SMA_18: sma18_now.toFixed(2),
    SMA_40: sma(close, 40, latest - 39).toFixed(2),
    slope: slope.toFixed(5),
    segnale: signal
  };
}

async function run() {
  const results = [];

  for (const symbol of symbols) {
    try {
      const raw = await fetchHistory(symbol);
      const entry = findEntrySignal(raw, symbol); // ✅ simbolo corretto
      if (entry) results.push(entry);
    } catch (err) {
      console.error(`Errore su ${symbol}:`, err.message);
    }
  }

  const outputPath = path.join(__dirname, '../public/delphic-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log("✅ Strategia Delphic aggiornata con successo.");
}

run();

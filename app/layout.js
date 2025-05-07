// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Wall Street Plan B',
  description: 'Libertà finanziaria con intelligenza',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}

import './globals.css';
import NavBar from './components/NavBar';

export const metadata = {
  title: 'Wall Street Plan B',
  description: 'Libertà finanziaria con intelligenza',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}

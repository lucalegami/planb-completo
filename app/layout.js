import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'PlanB',
  description: 'Smart Score Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.variable} style={{
        backgroundColor: '#0d1117',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        margin: 0,
        padding: 0
      }}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}

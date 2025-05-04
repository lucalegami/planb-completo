'use client';

import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "PlanB",
  description: "Smart Score Dashboard",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const linkStyle = (path) => ({
    color: pathname === path ? "#00ff88" : "#ffffff",
    fontWeight: pathname === path ? "bold" : "normal",
    textDecoration: "none",
    borderBottom: pathname === path ? "2px solid #00ff88" : "none",
    paddingBottom: "2px"
  });

  return (
    <html lang="it">
      <body
        className={`${inter.variable} antialiased`}
        style={{ margin: 0, background: "#0d1117", color: "white" }}
      >
        <nav style={{
          backgroundColor: "#161b22",
          padding: "1rem 2rem",
          borderBottom: "1px solid #333",
          display: "flex",
          gap: "2rem",
          alignItems: "center"
        }}>
          <h1 style={{ margin: 0, fontSize: "1.2rem", color: "#00ff88" }}>PLANB</h1>
          <Link href="/" style={linkStyle("/")}>Home</Link>
          <Link href="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
          <Link href="/proposte" style={linkStyle("/proposte")}>Proposte</Link>
          <Link href="/radar" style={linkStyle("/radar")}>Radar</Link>
          <div style={{ marginLeft: "auto" }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
              }}
              style={{
                color: '#fff',
                textDecoration: 'none',
                borderBottom: '2px solid transparent',
                paddingBottom: '2px'
              }}
            >
              Esci
            </a>
          </div>
        </nav>
        <main style={{ paddingTop: "1rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}


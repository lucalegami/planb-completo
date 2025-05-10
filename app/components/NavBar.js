'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">Plan B</Link>
      </div>

      <input
        type="checkbox"
        id="menu-toggle"
        checked={menuOpen}
        onChange={() => setMenuOpen(!menuOpen)}
        hidden
      />
      <label htmlFor="menu-toggle" className="menu-icon">☰</label>

      <div className="menu">
        <Link href="/home">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/proposte">Proposte</Link>
        <Link href="/radar">Radar</Link>
        <Link href="/crypto">Crypto</Link>
        <Link href="/segnali-wall-street">Wall Street</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </div>
    </nav>
  );
}

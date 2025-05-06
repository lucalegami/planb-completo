'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const linkStyle = (path) => ({
    padding: '0.5rem 1rem',
    border: pathname === path ? '2px solid #4a70b9' : '2px solid transparent',
    color: pathname === path ? '#4a70b9' : 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    borderRadius: '0', // angoli squadrati
  });

  const hoverStyle = {
    color: '#4a70b9',
    borderColor: '#4a70b9',
  };

  const links = [
    { href: '/', label: '🏠 Home' },
    { href: '/dashboard', label: '📊 Dashboard' },
    { href: '/proposte', label: '💡 Proposte' },
    { href: '/radar', label: '📡 Radar' },
    { href: '/crypto', label: '💰 Crypto' },
    { href: '/segnali-wall-street', label: 'SEGNALI WALL STREET' }
  ];

  return (
    <nav style={{
      padding: '1rem',
      borderBottom: '1px solid #333',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      backgroundColor: '#0d1117',
      fontFamily: 'Inter, sans-serif',
    }}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={linkStyle(link.href)}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyle(link.href))}
        >
          {link.label}
        </Link>
      ))}

      {isLoggedIn && (
        <button onClick={handleLogout} style={{
          marginLeft: 'auto',
          background: 'transparent',
          border: '2px solid #00ff88',
          padding: '0.5rem 1rem',
          borderRadius: '0', // angoli squadrati
          color: '#00ff88',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00ff8820';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}


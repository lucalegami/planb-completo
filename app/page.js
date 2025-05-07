'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: "url('/freedom.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navLinks}>
          <Link href="/home" style={styles.link}>Home</Link>
          <Link href="/dashboard" style={styles.link}>Dashboard</Link>
          <Link href="/proposte" style={styles.link}>Proposte</Link>
          <Link href="/radar" style={styles.link}>Radar</Link>
          <Link href="/crypto" style={styles.link}>Crypto</Link>
          <Link href="/segnali-wall-street" style={styles.link}>Segnali Wall Street</Link>
        </div>
        <div style={styles.authLinks}>
          <Link href="/login" style={styles.button}>LOG IN</Link>
          <Link href="/signup" style={styles.button}>SIGN IN</Link>
        </div>
      </div>

      {/* Motivational quote */}
      <div style={styles.centeredText}>
        <h1 style={styles.quote}>“Il rischio deriva dal non sapere cosa stai facendo.”</h1>
        <p style={styles.author}>— Warren Buffett</p>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 40px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  authLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  button: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '8px 16px',
    backgroundColor: '#000',
    borderRadius: '5px',
  },
  centeredText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '600px',
  },
  quote: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  author: {
    fontSize: '18px',
    fontStyle: 'italic',
  },
};

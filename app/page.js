'use client';
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
      {/* Motivational quote */}
      <div style={{
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
      }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
          “Il rischio deriva dal non sapere cosa stai facendo.”
        </h1>
        <p style={{ fontSize: '18px', fontStyle: 'italic' }}>— Warren Buffett</p>
      </div>
    </div>
  );
}


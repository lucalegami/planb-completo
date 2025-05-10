export default function SignupPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0d1117',
      color: '#fff',
      height: '100vh',
      padding: '2rem'
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        width: '100%',
        background: '#161b22',
        padding: '2rem',
        borderRadius: '10px'
      }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Crea un account</h1>
        <input type="text" placeholder="Nome completo" style={{ padding: '0.75rem' }} />
        <input type="email" placeholder="Email" style={{ padding: '0.75rem' }} />
        <input type="password" placeholder="Password" style={{ padding: '0.75rem' }} />
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#00bfff', color: '#000', fontWeight: 'bold' }}>
          Registrati
        </button>
      </form>
    </div>
  );
}


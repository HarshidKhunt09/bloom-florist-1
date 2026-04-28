import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Page not found.</p>
        <a href="/" style={{ padding: '0.75rem 2rem', background: '#0ea5e9', color: '#fff', borderRadius: '0.5rem', textDecoration: 'none' }}>Go Home</a>
      </div>
    </>
  );
}

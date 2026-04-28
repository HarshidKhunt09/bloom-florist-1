import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Something Went Wrong</title>
      </Head>
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(2rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: 'min(500px, 90vw)' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: '800',
            color: 'var(--color-primary, #2563eb)',
            margin: '0 0 0.5rem',
            lineHeight: 1,
          }}>500</h1>
          <h2 style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: '600',
            color: '#333',
            margin: '0 0 1rem',
          }}>Something Went Wrong</h2>
          <p style={{
            fontSize: '1rem',
            color: '#666',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}>
            We&apos;re having trouble loading this page. Please try again in a moment.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--color-primary, #2563eb)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            transition: 'transform 0.2s',
          }}>
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
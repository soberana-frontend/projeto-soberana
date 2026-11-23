import Link from 'next/link';

export default function NotFound() {
	return (
		<main style={{ padding: '4rem 1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
			<p style={{ color: 'var(--sky)', fontSize: '6rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>404</p>
			<h1 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Página não encontrada</h1>
			<p style={{ color: 'var(--tx)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
				A página que você procura pode ter sido removida, renomeada ou nunca existiu.
			</p>
			<Link href="/" className="btn" style={{ display: 'inline-block', padding: '0.75rem 2rem', fontSize: '1rem' }}>
				Voltar ao início
			</Link>
		</main>
	);
}
'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<main style={{ padding: '4rem 1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
			<h1 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Algo deu errado</h1>
			<p style={{ color: 'var(--tx)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
				Ocorreu um erro inesperado ao carregar esta página. Tente novamente ou entre em contato conosco se o problema persistir.
			</p>
			{error.digest && (
				<p style={{ color: 'var(--mut)', fontSize: '0.85rem', marginBottom: '2rem' }}>
					Código de referência: <code>{error.digest}</code>
				</p>
			)}
			<button onClick={reset} className="btn" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
				Tentar novamente
			</button>
		</main>
	);
}
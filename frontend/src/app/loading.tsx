export default function Loading() {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
			<div style={{ textAlign: 'center' }}>
				<div
					style={{
						width: 48,
						height: 48,
						border: '4px solid var(--line)',
						borderTopColor: 'var(--gold)',
						borderRadius: '50%',
						animation: 'spin 0.8s linear infinite',
						margin: '0 auto 1rem',
					}}
				/>
				<p style={{ color: 'var(--mut)' }}>Carregando...</p>
			</div>
			<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
		</div>
	);
}
import type { Metadata } from 'next';
import BudgetForm from '@/features/budget/components/BudgetForm';

export const metadata: Metadata = {
	title: 'Orçamento – Soberana Segurança e Vigilância',
	description: 'Solicite um orçamento personalizado de segurança patrimonial, vigilância, portaria e monitoramento no DF.',
};

export default function OrcamentoPage() {
	return (
		<main style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '3rem' }}>
				<p className="eyebrow" style={{ color: 'var(--sky)' }}>Orçamento</p>
				<h1>Solicite seu orçamento personalizado</h1>
				<p style={{ color: 'var(--mut)', fontSize: '1.1rem', marginTop: '1rem' }}>
					Conte-nos sobre sua necessidade e receba uma proposta sob medida.
				</p>
			</div>

			<BudgetForm />
		</main>
	);
}
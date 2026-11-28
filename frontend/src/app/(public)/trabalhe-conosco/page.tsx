import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import JobForm from './JobForm';

export const metadata: Metadata = {
	title: 'Trabalhe conosco – Soberana Segurança e Vigilância',
	description: 'Faça parte da equipe Soberana. Envie seu currículo e candidate-se a vagas em vigilância, portaria, monitoramento e mais.',
};

export default function TrabalheConoscoPage() {
	return (
		<>
			<PageHero eyebrow="Carreiras" title="Trabalhe conosco" />
			<main style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
				<div style={{ textAlign: 'center', marginBottom: '3rem' }}>
					<p style={{ color: 'var(--body)', fontSize: '1.1rem', lineHeight: 1.7 }}>
						A Soberana está sempre em busca de profissionais dedicados e comprometidos com a excelência.
						Preencha o formulário abaixo e faça parte de uma equipe com mais de 30 anos de tradição
						em segurança patrimonial no Distrito Federal.
					</p>
				</div>

				<JobForm />
			</main>
		</>
	);
}
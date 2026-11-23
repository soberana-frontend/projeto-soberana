import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Institucional – Soberana Segurança e Vigilância',
	description: 'Conheça a história, missão, visão e valores da Soberana Segurança e Vigilância. Desde 1996 protegendo o DF.',
};

interface ValueItem {
	title: string;
	desc: string;
}

const VALUES: ValueItem[] = [
	{ title: 'Melhoria contínua', desc: 'Aprimoramento constante dos serviços e processos internos.' },
	{ title: 'Tecnologia avançada', desc: 'Utilização de recursos tecnológicos de ponta em monitoramento e vigilância.' },
	{ title: 'Satisfação do cliente', desc: 'Busca permanente pela excelência no atendimento e na entrega.' },
	{ title: 'Qualificação profissional', desc: 'Investimento contínuo na capacitação e treinamento dos colaboradores.' },
	{ title: 'Parcerias qualificadas', desc: 'Relação próxima com fornecedores certificados e de confiança.' },
	{ title: 'Responsabilidade social', desc: 'Ações sociais e preocupação com o meio ambiente como parte do negócio.' },
];

export default function InstitucionalPage() {
	return (
		<main style={{ padding: '4rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
			<p className="eyebrow" style={{ color: 'var(--sky)' }}>Institucional</p>
			<h1>Nossa história</h1>

			<section style={{ marginTop: '3rem' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Fundação e trajetória</h2>
				<p style={{ color: 'var(--tx)', lineHeight: 1.8, fontSize: '1.05rem' }}>
					A Soberana Segurança e Vigilância foi fundada em <strong>30 de janeiro de 1996</strong> pelo empresário
					Irenaldo Pereira Lima. Iniciou suas operações com uma equipe de 30 profissionais, focada inicialmente
					em segurança para eventos. Ao longo de três décadas, a empresa cresceu de forma consistente e hoje conta
					com mais de <strong>300 colaboradores</strong>, sede própria em Águas Claras – DF e uma estrutura ampla
					equipada com sistema moderno de gestão da qualidade.
				</p>
			</section>

			<section style={{ marginTop: '3rem' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Atuação e diferenciais</h2>
				<p style={{ color: 'var(--tx)', lineHeight: 1.8, fontSize: '1.05rem' }}>
					A Soberana atua nos segmentos de vigilância patrimonial armada e desarmada, escolta armada, segurança
					pessoal privada, monitoramento eletrônico, segurança de eventos e serviços de limpeza, conservação e
					mão de obra terceirizada. Para manter o padrão elevado, investe continuamente em treinamento por meio de
					palestras e cursos de reciclagem, renovação da frota para fiscalização e aquisição de equipamentos
					modernos de monitoramento eletrônico. A empresa segue rigorosamente a legislação vigente, em especial a
					Lei 7.102/83 e a Portaria 387/06, garantindo conformidade total nas operações.
				</p>
			</section>

			<section style={{ marginTop: '3rem' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Política de qualidade e valores</h2>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
					{VALUES.map((v) => (
						<div key={v.title} style={{ background: 'var(--surf)', padding: '1.5rem', borderRadius: '8px' }}>
							<h3 style={{ color: 'var(--acc)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{v.title}</h3>
							<p style={{ color: 'var(--mut)', lineHeight: 1.6 }}>{v.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surf)', borderRadius: '12px', textAlign: 'center' }}>
				<p style={{ color: 'var(--mut)', fontSize: '1.1rem' }}>
					Nossos profissionais especializados garantem atividades interligadas que proporcionam segurança,
					prontidão no atendimento e pontualidade, assegurando conforto e tranquilidade aos nossos clientes.
				</p>
			</section>
		</main>
	);
}
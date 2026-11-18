export const metadata = {
	title: 'Parceiros – Soberana Segurança e Vigilância',
	description: 'Conheça as entidades e organizações parceiras da Soberana Segurança e Vigilância.',
};

const PARTNERS = [
	{
		name: 'FENAVIST',
		fullName: 'Federação Nacional das Empresas de Segurança Privada',
		desc: 'Principal entidade representativa do setor de segurança privada no Brasil, responsável pela regulamentação e defesa dos interesses das empresas de vigilância.',
	},
	{
		name: 'SINDESV-DF',
		fullName: 'Sindicato das Empresas de Segurança Privada do Distrito Federal',
		desc: 'Entidade sindical que representa as empresas de segurança privada no DF, atuando na negociação coletiva e na defesa dos interesses setoriais.',
	},
	{
		name: 'SINDESP',
		fullName: 'Sindicato das Empresas de Segurança Privada',
		desc: 'Organização sindical dedicada à representação e fortalecimento das empresas de segurança privada, promovendo boas práticas e conformidade legal.',
	},
	{
		name: 'SINDSERVIÇOS',
		fullName: 'Sindicato das Empresas de Serviços Terceirizáveis',
		desc: 'Entidade que representa empresas prestadoras de serviços terceirizados, incluindo limpeza, conservação e mão de obra especializada.',
	},
];

export default function ParceirosPage() {
	return (
		<main style={{ padding: '4rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
			<p className="eyebrow" style={{ color: 'var(--sky)' }}>Rede de apoio</p>
			<h1>Nossos parceiros</h1>
			<p style={{ color: 'var(--mut)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: 1.7 }}>
				A Soberana mantém parcerias estratégicas com as principais entidades do setor de segurança
				privada e serviços terceirizados, garantindo conformidade, atualização constante e
				fortalecimento institucional.
			</p>

			<section style={{ marginTop: '3rem' }}>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
					{PARTNERS.map((p) => (
						<div key={p.name} style={{ background: 'var(--surf)', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
							<h3 style={{ color: 'var(--acc)', marginBottom: '0.25rem', fontSize: '1.3rem' }}>{p.name}</h3>
							<p style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>{p.fullName}</p>
							<p style={{ color: 'var(--tx)', lineHeight: 1.7 }}>{p.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surf)', borderRadius: '12px', textAlign: 'center' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Quer ser nosso parceiro?</h2>
				<p style={{ color: 'var(--mut)', marginBottom: '1.5rem' }}>
					Entre em contato conosco para conhecer oportunidades de parceria e colaboração.
				</p>
				<a className="btn" href="/orcamento">Falar com a equipe</a>
			</section>
		</main>
	);
}
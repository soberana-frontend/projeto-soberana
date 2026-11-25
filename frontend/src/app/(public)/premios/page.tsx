import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Prêmios e Certificações – Soberana Segurança e Vigilância',
	description: 'Conheça os prêmios, certificações e reconhecimentos da Soberana Segurança e Vigilância ao longo de sua trajetória.',
};

interface AwardItem {
	title: string;
	desc: string;
}

interface CertificationItem {
	name: string;
	desc: string;
}

const AWARDS: AwardItem[] = [
	{
		title: 'Excelência Empresarial',
		desc: 'Eleita empresa destaque por excelência e qualidade em serviços prestados e produtos comercializados na área de segurança.',
	},
	{
		title: 'Colaborador Benemérito',
		desc: 'Reconhecimento concedido pela Subsecretaria do Sistema de Defesa Civil do Distrito Federal pelos relevantes serviços prestados ao Sistema de Defesa Civil do DF.',
	},
];

const CERTIFICATIONS: CertificationItem[] = [
	{ name: 'ISO 9001', desc: 'Certificação internacional de gestão da qualidade.' },
	{ name: 'FENAVIST 2006', desc: 'Certificado da Federação Nacional das Empresas de Segurança Privada.' },
	{ name: 'FENAVIST 2011', desc: 'Renovação do certificado FENAVIST, reafirmando conformidade setorial.' },
	{ name: 'Maiores Empresas 2011', desc: 'Reconhecimento entre as maiores empresas do segmento no DF.' },
	{ name: 'Maiores Empresas 2012', desc: 'Bicampeã no ranking das maiores empresas de segurança do DF.' },
	{ name: 'Congresso de Trânsito', desc: 'Certificado de participação e contribuição no Congresso de Trânsito.' },
	{ name: 'Congresso Francês', desc: 'Certificado de participação em congresso internacional de segurança.' },
];

export default function PremiosPage() {
	return (
		<main style={{ padding: '4rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
			<p className="eyebrow" style={{ color: 'var(--sky)' }}>Reconhecimento</p>
			<h1>Prêmios e certificações</h1>
			<p style={{ color: 'var(--mut)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: 1.7 }}>
				Ao longo de mais de 30 anos de atuação, a Soberana conquistou prêmios e certificações que atestam
				seu compromisso com qualidade, conformidade e excelência operacional.
			</p>

			<section style={{ marginTop: '3rem' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Prêmios</h2>
				<div style={{ display: 'grid', gap: '1.5rem' }}>
					{AWARDS.map((a) => (
						<div key={a.title} style={{ background: 'var(--surf)', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
							<h3 style={{ color: 'var(--acc)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{a.title}</h3>
							<p style={{ color: 'var(--tx)', lineHeight: 1.7 }}>{a.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section style={{ marginTop: '3rem' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Certificações</h2>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
					{CERTIFICATIONS.map((c) => (
						<div key={c.name} style={{ background: 'var(--surf)', padding: '1.5rem', borderRadius: '8px' }}>
							<h3 style={{ color: 'var(--acc)', marginBottom: '0.5rem' }}>{c.name}</h3>
							<p style={{ color: 'var(--mut)', lineHeight: 1.6, fontSize: '0.95rem' }}>{c.desc}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
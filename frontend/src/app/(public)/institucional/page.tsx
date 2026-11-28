import type { Metadata } from 'next';
import CtaBanner from '@/components/ui/CtaBanner';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
	title: 'Institucional – Soberana Segurança e Vigilância',
	description: 'Conheça a história, missão, visão e valores da Soberana Segurança e Vigilância. Desde 1996 protegendo o DF.',
};

interface ValueItem {
	title: string;
	desc: string;
	icon: string;
}

const VALUES: ValueItem[] = [
	{ title: 'Melhoria contínua', desc: 'Aprimoramento constante dos serviços e processos internos.', icon: '🔄' },
	{ title: 'Tecnologia avançada', desc: 'Utilização de recursos tecnológicos de ponta em monitoramento e vigilância.', icon: '📡' },
	{ title: 'Satisfação do cliente', desc: 'Busca permanente pela excelência no atendimento e na entrega.', icon: '⭐' },
	{ title: 'Qualificação profissional', desc: 'Investimento contínuo na capacitação e treinamento dos colaboradores.', icon: '🎓' },
	{ title: 'Parcerias qualificadas', desc: 'Relação próxima com fornecedores certificados e de confiança.', icon: '🤝' },
	{ title: 'Responsabilidade social', desc: 'Ações sociais e preocupação com o meio ambiente como parte do negócio.', icon: '🌱' },
];

export default function InstitucionalPage() {
	return (
		<>
			<main>
				<PageHero eyebrow="Institucional" title="Nossa história" />

				{/* Fundação e trajetória — texto + imagem lado a lado */}
				<section>
					<div className="w inst-split">
						<div className="inst-text">
							<h2>Fundação e trajetória</h2>
							<p>
								A Soberana Segurança e Vigilância foi fundada em <strong>30 de janeiro de 1996</strong> pelo empresário
								Irenaldo Pereira Lima. Iniciou suas operações com uma equipe de 30 profissionais, focada inicialmente
								em segurança para eventos. Ao longo de três décadas, a empresa cresceu de forma consistente e hoje conta
								com mais de <strong>300 colaboradores</strong>, sede própria em Águas Claras – DF e uma estrutura ampla
								equipada com sistema moderno de gestão da qualidade.
							</p>
						</div>
						{/* TODO: Substituir por foto real da equipe/sede da Soberana */}
						<div className="inst-img" role="img" aria-label="Equipe Soberana Segurança e Vigilância">
							<span className="inst-img-placeholder">📷 Foto da equipe</span>
						</div>
					</div>
				</section>

				{/* Atuação e diferenciais */}
				<section>
					<div className="w">
						<h2>Atuação e diferenciais</h2>
						<p>
							A Soberana atua nos segmentos de vigilância patrimonial armada e desarmada, escolta armada, segurança
							pessoal privada, monitoramento eletrônico, segurança de eventos e serviços de limpeza, conservação e
							mão de obra terceirizada. Para manter o padrão elevado, investe continuamente em treinamento por meio de
							palestras e cursos de reciclagem, renovação da frota para fiscalização e aquisição de equipamentos
							modernos de monitoramento eletrônico. A empresa segue rigorosamente a legislação vigente, em especial a
							Lei 7.102/83 e a Portaria 387/06, garantindo conformidade total nas operações.
						</p>
					</div>
				</section>

				{/* Política de qualidade e valores — cards estilo cred-card */}
				<section>
					<div className="w">
						<h2>Política de qualidade e valores</h2>
						<div className="credentials-grid">
							{VALUES.map((v) => (
								<div key={v.title} className="cred-card">
									<div className="cred-icon" aria-hidden="true">{v.icon}</div>
									<h3>{v.title}</h3>
									<p>{v.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Bloco de resumo */}
				<section>
					<div className="w inst-summary">
						<p>
							Nossos profissionais especializados garantem atividades interligadas que proporcionam segurança,
							prontidão no atendimento e pontualidade, assegurando conforto e tranquilidade aos nossos clientes.
						</p>
					</div>
				</section>
			</main>

			<CtaBanner />
		</>
	);
}
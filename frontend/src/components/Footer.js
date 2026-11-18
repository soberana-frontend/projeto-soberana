import Logo from './Logo';

const QUICK_LINKS = [
	{ href: '#servicos', label: 'Serviços' },
	{ href: '#segmentos', label: 'Para quem atuamos' },
	{ href: '#noticias', label: 'Notícias' },
	{ href: '/orcamento', label: 'Solicitar orçamento' },
];

const INSTITUTIONAL_LINKS = [
	{ href: '#', label: 'Prêmios e parceiros' },
	{ href: '#', label: 'Ouvidoria' },
	{ href: '#', label: 'Canal de conduta ética' },
	{ href: '#', label: 'Proteção de dados (LGPD)' },
	{ href: '#', label: 'Trabalhe conosco', external: true },
];

const SOCIAL_LINKS = [
	{ href: 'https://facebook.com/soberana', label: 'f', ariaLabel: 'Facebook' },
	{ href: 'https://instagram.com/soberana', label: 'ig', ariaLabel: 'Instagram' },
	{ href: 'https://linkedin.com/company/soberana', label: 'in', ariaLabel: 'LinkedIn' },
	{ href: 'https://youtube.com/@soberana', label: 'yt', ariaLabel: 'YouTube' },
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			<div className="w">
				<div className="fg">
					<div>
						<a className="logo" href="/" aria-label="Soberana – início">
							<Logo variant="white" />
						</a>
						<div className="so">
							{SOCIAL_LINKS.map((link) => (
								<a
									key={link.ariaLabel}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={link.ariaLabel}
								>
									{link.label}
								</a>
							))}
						</div>
					</div>
					<div>
						<h3>Acesso rápido</h3>
						<ul>
							{QUICK_LINKS.map((link) => (
								<li key={link.href}>
									<a href={link.href}>{link.label}</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Institucional</h3>
						<ul>
							{INSTITUTIONAL_LINKS.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										{...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Ache-nos</h3>
						<p>
							ADE Conj. 20, Lt. 07<br />
							Águas Claras – DF<br />
							CEP 71989-300<br />
							Tel.: <a href="tel:+556133996013">(61) 3399-6013</a><br />
							<a href="mailto:contato@soberanaseguranca.com.br">contato@soberanaseguranca.com.br</a>
						</p>
					</div>
				</div>
				<div className="fb">
					<span>© {year} Soberana Segurança e Vigilância. CNPJ: 01.066.493/0001-25</span>
					<span>Desenvolvido por [inserir] · Fotos ilustrativas, apenas para demonstração de layout</span>
				</div>
			</div>
		</footer>
	);
}
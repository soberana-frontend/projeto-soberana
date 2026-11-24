'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface TimelineItem {
	year: string;
	text: string;
}

interface DetailItem {
	title: string;
	text: string;
}

interface DocumentItem {
	label: string;
	src: string;
	alt: string;
}

interface CredentialDetails {
	intro?: string;
	timeline?: TimelineItem[];
	items?: DetailItem[];
	documents?: DocumentItem[];
	note?: string;
	cta?: { label: string; href: string };
}

interface CredentialItem {
	slug: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	details: CredentialDetails;
}

const CREDENTIALS: CredentialItem[] = [
	{
		slug: 'autorizada-policia-federal',
		title: 'Autorizada pela Polícia Federal',
		description: 'Atuação regulamentada em segurança privada.',
		details: {
			intro:
				'A segurança privada no Brasil é regulamentada e fiscalizada pela Polícia Federal, que autoriza e acompanha as empresas do setor. A Soberana atua dentro dessas exigências.',
			timeline: [{ year: '', text: '[TEXTO DE EXEMPLO - SUBSTITUIR]' }],
		},
		icon: (
			<path d="M12 2l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V5l7-3zm-1 11l-3-3 1.4-1.4L11 14.2l5.6-5.6L18 10l-7 7z" />
		),
	},
	{
		slug: 'atuacao-organismos-internacionais',
		title: 'Atuação com organismos internacionais',
		description: 'Experiência em operações para organismos internacionais.',
		details: {
			intro:
				'Temos experiência em operações para organismos internacionais, que costumam exigir procedimentos bem definidos. Fale com a nossa equipe para conhecer essa experiência.',
		},
		icon: (
			<>
				<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
			</>
		),
	},
	{
		slug: 'certificacoes',
		title: 'Certificações',
		description: 'Processos e equipe com certificações reconhecidas.',
		details: {
			intro:
				'Nossos processos e nossa equipe contam com certificações reconhecidas. Fale com a nossa equipe para conhecer cada uma delas.',
			documents: [
				{ label: '[TEXTO DE EXEMPLO - SUBSTITUIR]', src: '', alt: 'Placeholder de documento' },
			],
		},
		icon: (
			<>
				<circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<path d="M9 9l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M9 15l-1 6 4-2 4 2-1-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
			</>
		),
	},
	{
		slug: 'supervisao-relatorios',
		title: 'Supervisão e relatórios',
		description: 'Acompanhamento da operação com supervisão e relatório de ocorrências.',
		details: {
			intro:
				'A operação é acompanhada por supervisão, e as ocorrências são registradas em relatório. Assim o cliente tem transparência sobre cada turno e problemas são corrigidos rapidamente.',
		},
		icon: (
			<>
				<rect x="5" y="2" width="14" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<path d="M9 7l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<line x1="9" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</>
		),
	},
	{
		slug: 'equipe-identificada-treinada',
		title: 'Equipe identificada e treinada',
		description: 'Vigilantes uniformizados, identificados e em contato com a central.',
		details: {
			intro:
				'Os vigilantes atuam uniformizados e identificados e mantêm comunicação por rádio com a central. Isso facilita reconhecer a equipe no posto e acionar apoio quando necessário.',
		},
		icon: (
			<>
				<circle cx="9" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<circle cx="17" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<path d="M21 21v-1.5a3 3 0 00-3-3h-1" fill="none" stroke="currentColor" strokeWidth="1.5" />
			</>
		),
	},
	{
		slug: 'plano-sob-medida',
		title: 'Plano sob medida',
		description: 'Cada operação é dimensionada a partir dos riscos do cliente.',
		details: {
			intro:
				'Antes de definir efetivo e postos, avaliamos os riscos do local e da operação do cliente. O plano é dimensionado a partir dessa avaliação, não de um pacote fixo.',
		},
		icon: (
			<>
				<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<circle cx="12" cy="12" r="1.5" fill="currentColor" />
			</>
		),
	},
];

function getSlugFromHash(): string | null {
	if (typeof window === 'undefined') return null;
	const hash = window.location.hash.replace('#', '');
	if (hash.startsWith('credenciais-')) {
		return hash.replace('credenciais-', '');
	}
	return null;
}

export default function CredentialCards() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const panelTitleRef = useRef<HTMLHeadingElement>(null);
	const sectionRef = useRef<HTMLElement>(null);

	// Inicializa a partir do hash na URL
	useEffect(() => {
		const slug = getSlugFromHash();
		if (slug) {
			const idx = CREDENTIALS.findIndex((c) => c.slug === slug);
			if (idx >= 0) {
				setActiveIndex(idx);
			}
		}
	}, []);

	// Responde a mudanças de hash (botão Voltar do navegador)
	useEffect(() => {
		const onHashChange = () => {
			const slug = getSlugFromHash();
			if (slug) {
				const idx = CREDENTIALS.findIndex((c) => c.slug === slug);
				if (idx >= 0) {
					setActiveIndex(idx);
				}
			} else {
				setActiveIndex(null);
			}
		};
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);

	// Foco no título do painel ao abrir
	useEffect(() => {
		if (activeIndex !== null && panelTitleRef.current) {
			panelTitleRef.current.focus();
		}
	}, [activeIndex]);

	// Esc fecha o painel
	useEffect(() => {
		if (activeIndex === null) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closePanel();
			}
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	});

	const openPanel = useCallback((index: number) => {
		setActiveIndex(index);
		window.location.hash = `credenciais-${CREDENTIALS[index].slug}`;
	}, []);

	const closePanel = useCallback(() => {
		const prevIndex = activeIndex;
		setActiveIndex(null);
		// Remove o hash sem pular a página
		history.pushState('', document.title, window.location.pathname + window.location.search);
		// Restaura foco no card que abriu
		if (prevIndex !== null && cardRefs.current[prevIndex]) {
			cardRefs.current[prevIndex]!.focus();
			cardRefs.current[prevIndex]!.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [activeIndex]);

	const navigateTo = useCallback(
		(direction: 'prev' | 'next') => {
			if (activeIndex === null) return;
			const newIndex =
				direction === 'prev'
					? (activeIndex - 1 + CREDENTIALS.length) % CREDENTIALS.length
					: (activeIndex + 1) % CREDENTIALS.length;
			openPanel(newIndex);
		},
		[activeIndex, openPanel],
	);

	const handleCardKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				openPanel(index);
			}
		},
		[openPanel],
	);

	// Renderiza o painel de detalhes
	if (activeIndex !== null) {
		const cred = CREDENTIALS[activeIndex];
		const d = cred.details;

		return (
			<section className="credentials" aria-label="Credenciais" ref={sectionRef}>
				<div className="w">
					<div className="cred-panel" role="region" aria-live="polite">
						<button className="cred-panel-back" onClick={closePanel} type="button">
							← Voltar às credenciais
						</button>

						<div className="cred-panel-header">
							<div className="cred-icon" aria-hidden="true">
								<svg viewBox="0 0 24 24">{cred.icon}</svg>
							</div>
							<h2 ref={panelTitleRef} tabIndex={-1}>
								{cred.title}
							</h2>
						</div>

						<div className="cred-panel-body">
							{d.intro && <p className="cred-panel-intro">{d.intro}</p>}

							{d.timeline && d.timeline.length > 0 && (
								<div className="cred-timeline">
									{d.timeline.map((item, i) => (
										<div key={i} className="cred-timeline-item">
											<span className="cred-timeline-marker" />
											{item.year && <strong className="cred-timeline-year">{item.year}</strong>}
											<p>{item.text}</p>
										</div>
									))}
								</div>
							)}

							{d.items && d.items.length > 0 && (
								<div className="cred-items-grid">
									{d.items.map((item, i) => (
										<div key={i} className="cred-item-card">
											<h4>{item.title}</h4>
											<p>{item.text}</p>
										</div>
									))}
								</div>
							)}

							{d.documents && d.documents.length > 0 && (
								<div className="cred-documents">
									{d.documents.map((doc, i) => (
										<figure key={i} className="cred-doc-figure">
											{doc.src ? (
												<img src={doc.src} alt={doc.alt} loading="lazy" />
											) : (
												<div className="cred-doc-placeholder" aria-hidden="true">
													📄
												</div>
											)}
											<figcaption>{doc.label}</figcaption>
										</figure>
									))}
								</div>
							)}

							{d.note && <p className="cred-panel-note">{d.note}</p>}
						</div>

						<div className="cred-panel-footer">
							<a className="btn" href={d.cta?.href || '/orcamento'}>
								{d.cta?.label || 'Solicitar orçamento'}
							</a>
							<div className="cred-panel-nav">
								<button type="button" onClick={() => navigateTo('prev')}>
									← Anterior
								</button>
								<button type="button" onClick={() => navigateTo('next')}>
									Próximo →
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	// Renderiza a grade de cards
	return (
		<section className="credentials" aria-label="Credenciais" ref={sectionRef} id="credenciais">
			<div className="w">
				<div className="credentials-grid">
					{CREDENTIALS.map((item, index) => (
						<button
							key={item.slug}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
							className="cred-card cred-card--clickable"
							type="button"
							onClick={() => openPanel(index)}
							onKeyDown={(e) => handleCardKeyDown(e, index)}
							style={{ scrollMarginTop: 'calc(var(--header-h) + 1rem)' }}
						>
							<div className="cred-icon" aria-hidden="true">
								<svg viewBox="0 0 24 24">{item.icon}</svg>
							</div>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
							<span className="cred-card-link" aria-hidden="true">
								Saiba mais →
							</span>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
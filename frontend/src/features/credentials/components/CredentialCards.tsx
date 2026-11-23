'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface CredentialItem {
	title: string;
	description: string;
	icon: React.ReactNode;
	details: string[];
}

const CREDENTIALS: CredentialItem[] = [
	{
		title: 'Autorizada pela Polícia Federal',
		description: 'Atuação regulamentada em segurança privada.',
		details: [
			'A segurança privada no Brasil é regulamentada e fiscalizada pela Polícia Federal, que autoriza e acompanha as empresas do setor. A Soberana atua dentro dessas exigências.',
		],
		icon: (
			<path d="M12 2l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V5l7-3zm-1 11l-3-3 1.4-1.4L11 14.2l5.6-5.6L18 10l-7 7z" />
		),
	},
	{
		title: 'Atuação com organismos internacionais',
		description: 'Experiência em operações para organismos internacionais.',
		details: [
			'Temos experiência em operações para organismos internacionais, que costumam exigir procedimentos bem definidos. Fale com a nossa equipe para conhecer essa experiência.',
		],
		icon: (
			<>
				<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
			</>
		),
	},
	{
		title: 'Certificações',
		description: 'Processos e equipe com certificações reconhecidas.',
		details: [
			'Nossos processos e nossa equipe contam com certificações reconhecidas. Fale com a nossa equipe para conhecer cada uma delas.',
		],
		icon: (
			<>
				<circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<path d="M9 9l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M9 15l-1 6 4-2 4 2-1-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
			</>
		),
	},
	{
		title: 'Supervisão e relatórios',
		description: 'Acompanhamento da operação com supervisão e relatório de ocorrências.',
		details: [
			'A operação é acompanhada por supervisão, e as ocorrências são registradas em relatório. Assim o cliente tem transparência sobre cada turno e problemas são corrigidos rapidamente.',
		],
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
		title: 'Equipe identificada e treinada',
		description: 'Vigilantes uniformizados, identificados e em contato com a central.',
		details: [
			'Os vigilantes atuam uniformizados e identificados e mantêm comunicação por rádio com a central. Isso facilita reconhecer a equipe no posto e acionar apoio quando necessário.',
		],
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
		title: 'Plano sob medida',
		description: 'Cada operação é dimensionada a partir dos riscos do cliente.',
		details: [
			'Antes de definir efetivo e postos, avaliamos os riscos do local e da operação do cliente. O plano é dimensionado a partir dessa avaliação, não de um pacote fixo.',
		],
		icon: (
			<>
				<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
				<circle cx="12" cy="12" r="1.5" fill="currentColor" />
			</>
		),
	},
];

export default function CredentialCards() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearTimers = useCallback(() => {
		if (openTimerRef.current) {
			clearTimeout(openTimerRef.current);
			openTimerRef.current = null;
		}
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
	}, []);

	const openCard = useCallback((index: number) => {
		clearTimers();
		setOpenIndex(index);
	}, [clearTimers]);

	const closeCard = useCallback(() => {
		clearTimers();
		setOpenIndex(null);
	}, [clearTimers]);

	const handleMouseEnter = useCallback((index: number) => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
		openTimerRef.current = setTimeout(() => {
			setOpenIndex(index);
		}, 120);
	}, []);

	const handleMouseLeave = useCallback(() => {
		if (openTimerRef.current) {
			clearTimeout(openTimerRef.current);
			openTimerRef.current = null;
		}
		closeTimerRef.current = setTimeout(() => {
			setOpenIndex(null);
		}, 150);
	}, []);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				setOpenIndex((prev) => (prev === index ? null : index));
			} else if (e.key === 'Escape') {
				e.preventDefault();
				setOpenIndex(null);
			}
		},
		[],
	);

	const handleFocus = useCallback((index: number) => {
		setOpenIndex(index);
	}, []);

	const handleBlur = useCallback(() => {
		closeTimerRef.current = setTimeout(() => {
			setOpenIndex(null);
		}, 150);
	}, []);

	useEffect(() => {
		return () => clearTimers();
	}, [clearTimers]);

	return (
		<section className="credentials" aria-label="Credenciais">
			<div className="w">
				<div className="credentials-grid">
					{CREDENTIALS.map((item, index) => {
						const isOpen = openIndex === index;
						const detailsId = `cred-details-${index}`;

						return (
							<div
								key={item.title}
								ref={(el) => { cardRefs.current[index] = el; }}
								className={`cred-card cred-card--expandable${isOpen ? ' cred-card--open' : ''}`}
								tabIndex={0}
								role="button"
								aria-expanded={isOpen}
								aria-controls={detailsId}
								onMouseEnter={() => handleMouseEnter(index)}
								onMouseLeave={handleMouseLeave}
								onFocus={() => handleFocus(index)}
								onBlur={handleBlur}
								onKeyDown={(e) => handleKeyDown(e, index)}
							>
								<div className="cred-icon" aria-hidden="true">
									<svg viewBox="0 0 24 24">{item.icon}</svg>
								</div>
								<h3>{item.title}</h3>
								<p>{item.description}</p>

								<div className="cred-toggle" aria-hidden="true">
									<span>{isOpen ? 'Mostrar menos' : 'Saiba mais'}</span>
									<svg className={`cred-chevron${isOpen ? ' cred-chevron--open' : ''}`} viewBox="0 0 24 24" width="16" height="16">
										<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</div>

								<div className="cred-overlay" id={detailsId} role="region" aria-hidden={!isOpen}>
									<div className="cred-overlay-inner">
										<hr className="cred-divider" />
										{item.details.map((paragraph, pIdx) => (
											<p key={pIdx}>{paragraph}</p>
										))}
										<a className="btn cred-cta" href="/orcamento">
											Solicitar orçamento
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
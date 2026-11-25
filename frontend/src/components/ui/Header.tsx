'use client';

import { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';

interface NavItem {
	href: string;
	label: string;
}

const NAV_ITEMS: NavItem[] = [
	{ href: '#servicos', label: 'Serviços' },
	{ href: '#segmentos', label: 'Para quem atuamos' },
	{ href: '#noticias', label: 'Notícias' },
];

const INSTITUTIONAL_LINKS: NavItem[] = [
	{ href: '/institucional', label: 'Nossa história' },
	{ href: '/premios', label: 'Prêmios e certificações' },
	{ href: '/parceiros', label: 'Parceiros' },
	{ href: '#equipe', label: 'Nossa equipe' },
	{ href: '#institucional', label: 'Liderança' },
];

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		const stored = localStorage.getItem('soberana-theme') as 'light' | 'dark' | null;
		if (stored) {
			setTheme(stored);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		}
	}, []);

	const toggleTheme = useCallback(() => {
		const next = theme === 'light' ? 'dark' : 'light';
		setTheme(next);
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('soberana-theme', next);
	}, [theme]);

	const toggleMenu = () => setMenuOpen((prev) => !prev);

	const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
		const link = (e.target as HTMLElement).closest('a');
		if (link && link.getAttribute('href')?.startsWith('#')) {
			setMenuOpen(false);
		}
	};

	// Dropdown "Institucional" abre ao passar o mouse (desktop)
	const handleDetailsMouseEnter = () => {
		if (window.matchMedia('(min-width: 768px)').matches) {
			const details = document.querySelector('nav details');
			details?.setAttribute('open', '');
		}
	};

	const handleDetailsMouseLeave = () => {
		if (window.matchMedia('(min-width: 768px)').matches) {
			const details = document.querySelector('nav details');
			details?.removeAttribute('open');
		}
	};

	return (
		<header className={`hd${scrolled ? ' scrolled' : ''}`}>
			<a className="logo" href="/" aria-label="Soberana – início">
				<Logo />
			</a>

			<nav id="nav" className={menuOpen ? 'open' : ''} onClick={handleNavClick}>
				<ul>
					{NAV_ITEMS.map((item) => (
						<li key={item.href}>
							<a href={item.href}>{item.label}</a>
						</li>
					))}
					<li>
						<details onMouseEnter={handleDetailsMouseEnter} onMouseLeave={handleDetailsMouseLeave}>
							<summary>Institucional</summary>
							<div className="sub">
								{INSTITUTIONAL_LINKS.map((link) => (
									<a key={link.href} href={link.href}>
										{link.label}
									</a>
								))}
							</div>
						</details>
					</li>
					<li className="nav-cta-mobile">
						<a className="btn" href="/orcamento">
							Solicitar orçamento
						</a>
					</li>
				</ul>
			</nav>

			<div className="hd-actions">
				<a className="btn hd-cta-desktop" href="/orcamento">
					Solicitar orçamento
				</a>
				<span className="hd-divider" aria-hidden="true" />
				<button
					className="theme-toggle"
					onClick={toggleTheme}
					aria-label="Alternar tema"
					aria-pressed={theme === 'dark'}
					type="button"
				>
					{theme === 'light' ? (
						<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
							<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
							<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
					) : (
						<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
							<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					)}
				</button>

				<button
					className="burger"
					onClick={toggleMenu}
					aria-controls="nav"
					aria-expanded={menuOpen}
					aria-label="Menu"
				>
					☰
				</button>
			</div>
		</header>
	);
}
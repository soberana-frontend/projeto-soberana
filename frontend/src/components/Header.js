'use client';

import { useState } from 'react';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#segmentos', label: 'Para quem atuamos' },
  { href: '#noticias', label: 'Notícias' },
];

const INSTITUTIONAL_LINKS = [
  { href: '/institucional', label: 'Nossa história' },
  { href: '/premios', label: 'Prêmios e certificações' },
  { href: '/parceiros', label: 'Parceiros' },
  { href: '#equipe', label: 'Nossa equipe' },
  { href: '#institucional', label: 'Liderança' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleNavClick = (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href')?.startsWith('#')) {
      setMenuOpen(false);
    }
  };

  return (
    <header className="hd">
      <a className="logo" href="/" aria-label="Soberana – início">
        <Logo />
      </a>

      <button
        className="burger"
        onClick={toggleMenu}
        aria-controls="nav"
        aria-expanded={menuOpen}
        aria-label="Menu"
      >
        ☰
      </button>

      <nav id="nav" className={menuOpen ? 'open' : ''} onClick={handleNavClick}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <details>
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
          <li>
            <a className="btn" href="/orcamento">
              Solicitar orçamento
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
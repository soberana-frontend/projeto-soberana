'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
	{ href: '/admin/budgets', label: 'Orçamentos' },
	{ href: '/admin/news', label: 'Notícias' },
	{ href: '/admin/services', label: 'Serviços' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
 const token = document.cookie.split('; ').find(row => row.startsWith('token='));
 if (!token && pathname !== '/admin/login') {
 router.push('/admin/login');
 } else {
 setIsAuth(true);
 }
	}, [pathname, router]);

	if (!isAuth) return null;

	return (
 <div style={{ display: 'flex', minHeight: '100vh' }}>
 <aside style={{ width: '250px', background: 'var(--surf)', borderRight: '1px solid var(--line)', padding: '1.5rem' }}>
 <h2 style={{ color: 'var(--gold)', marginBottom: '2rem', fontSize: '1.2rem' }}>Painel Soberana</h2>
 <nav>
 <ul style={{ listStyle: 'none', padding: 0 }}>
 {NAV_ITEMS.map((item) => (
 <li key={item.href} style={{ marginBottom: '0.5rem' }}>
 <Link
 href={item.href}
 style={{
 display: 'block',
 padding: '0.75rem',
 borderRadius: '6px',
 color: pathname === item.href ? 'var(--gold)' : 'var(--tx)',
 background: pathname === item.href ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
 textDecoration: 'none'
 }}
 >
 {item.label}
 </Link>
 </li>
 ))}
 </ul>
 </nav>
 <button
 onClick={() => {
 document.cookie = 'token=; path=/; max-age=0';
 router.push('/admin/login');
 }}
 style={{ marginTop: '2rem', width: '100%', padding: '0.5rem', background: 'transparent', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--mut)', cursor: 'pointer' }}
 >
 Sair do Painel
 </button>
 </aside>
 <main style={{ flex: 1, padding: '2rem', background: 'var(--bg)' }}>
 {children}
 </main>
 </div>
	);
}
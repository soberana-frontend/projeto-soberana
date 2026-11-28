'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

export default function AdminLoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError('');

 try {
		const res = await fetch(`${API_BASE}/auth/login`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (!res.ok) throw new Error('Credenciais inválidas');

		// O backend define o cookie HttpOnly automaticamente na resposta
		router.push('/admin');
 } catch (err) {
 setError('E-mail ou senha incorretos.');
 } finally {
 setLoading(false);
 }
	};

	return (
 <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
 <form onSubmit={handleSubmit} style={{ background: 'var(--surf)', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid var(--line)' }}>
 <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>Login Administrativo</h2>

 {error && (
 <div style={{ padding: '0.75rem', background: '#5c1a1a', borderRadius: '6px', color: '#ffcccc', marginBottom: '1rem', fontSize: '0.9rem' }}>
 {error}
 </div>
 )}

 <div style={{ marginBottom: '1rem' }}>
 <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontSize: '0.9rem' }}>E-mail</label>
 <input
 type="email"
 id="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--tx)' }}
 />
 </div>

 <div style={{ marginBottom: '1.5rem' }}>
 <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontSize: '0.9rem' }}>Senha</label>
 <input
 type="password"
 id="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--tx)' }}
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="btn"
 style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', fontWeight: 600, opacity: loading ? 0.7 : 1 }}
 >
 {loading ? 'Entrando...' : 'Acessar Painel'}
 </button>

 <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--mut)' }}>
		 Acesso restrito a administradores autorizados.
 </p>
 </form>
 </div>
	);
}
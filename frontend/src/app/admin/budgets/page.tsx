'use client';

import { useEffect, useState } from 'react';

interface Budget {
	id: number;
	name: string;
	email: string;
	phone?: string;
	company?: string;
	serviceType?: string;
	message: string;
	status: string;
	createdAt: string;
}

export default function AdminBudgetsPage() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const fetchBudgets = async () => {
 const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
 if (!token) return;

 try {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api'}/budget`, {
 headers: { 'Authorization': `Bearer ${token}` },
 });
 if (res.ok) {
 const data = await res.json();
 setBudgets(data);
 } else {
 setError('Erro ao carregar orçamentos.');
 }
 } catch {
 setError('Erro de conexão com o servidor.');
 } finally {
 setLoading(false);
 }
	};

	const updateStatus = async (id: number, newStatus: string) => {
 const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
 if (!token) return;

 try {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api'}/budget/${id}`, {
 method: 'PATCH',
 headers: {
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${token}`
 },
 body: JSON.stringify({ status: newStatus }),
 });
 if (res.ok) {
 setBudgets(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
 }
 } catch (err) {
 console.error(err);
 }
	};

	useEffect(() => {
 fetchBudgets();
	}, []);

	if (loading) return <p style={{ padding: '2rem' }}>Carregando orçamentos...</p>;
	if (error) return <p style={{ padding: '2rem', color: '#ffcccc' }}>{error}</p>;

	return (
 <div>
 <h1 style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}>Gestão de Orçamentos</h1>
 <div style={{ overflowX: 'auto' }}>
 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
 <thead>
 <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
 <th style={{ padding: '0.75rem' }}>Data</th>
 <th style={{ padding: '0.75rem' }}>Nome</th>
 <th style={{ padding: '0.75rem' }}>E-mail</th>
 <th style={{ padding: '0.75rem' }}>Serviço</th>
 <th style={{ padding: '0.75rem' }}>Status</th>
 <th style={{ padding: '0.75rem' }}>Ações</th>
 </tr>
 </thead>
 <tbody>
 {budgets.length === 0 ? (
 <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--mut)' }}>Nenhum orçamento recebido.</td></tr>
 ) : (
 budgets.map((b) => (
 <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
 <td style={{ padding: '0.75rem' }}>{new Date(b.createdAt).toLocaleDateString('pt-BR')}</td>
 <td style={{ padding: '0.75rem' }}>{b.name}</td>
 <td style={{ padding: '0.75rem' }}>{b.email}</td>
 <td style={{ padding: '0.75rem' }}>{b.serviceType || '-'}</td>
 <td style={{ padding: '0.75rem' }}>
 <span style={{
 padding: '0.25rem 0.5rem',
 borderRadius: '4px',
 fontSize: '0.8rem',
 background: b.status === 'new' ? 'rgba(59, 130, 246, 0.15)' : b.status === 'contacted' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 197, 94, 0.15)',
 color: b.status === 'new' ? '#3b82f6' : b.status === 'contacted' ? '#f59e0b' : '#22c55e'
 }}>
 {b.status === 'new' ? 'Novo' : b.status === 'contacted' ? 'Em Atendimento' : 'Concluído'}
 </span>
 </td>
 <td style={{ padding: '0.75rem' }}>
 <select
 value={b.status}
 onChange={(e) => updateStatus(b.id, e.target.value)}
 style={{ padding: '0.25rem', borderRadius: '4px', background: 'var(--bg)', color: 'var(--tx)', border: '1px solid var(--line)' }}
 >
 <option value="new">Novo</option>
 <option value="contacted">Em Atendimento</option>
 <option value="closed">Concluído</option>
 </select>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 </div>
	);
}
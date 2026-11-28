'use client';

import { useEffect, useState } from 'react';

interface NewsItem {
	id: number;
	title: string;
	summary: string;
	date: string;
	featured: boolean;
}

export default function AdminNewsPage() {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [form, setForm] = useState({ title: '', summary: '', date: '', featured: false });
	const [editingId, setEditingId] = useState<number | null>(null);

	const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

	const fetchNews = async () => {
		try {
			const res = await fetch(`${API_URL}/news`, { credentials: 'include' });
			if (res.ok) setNews(await res.json());
		} catch (err) { console.error(err); }
		finally { setLoading(false); }
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const method = editingId ? 'PUT' : 'POST';
		const url = `${API_URL}/news${editingId ? `/${editingId}` : ''}`;

		try {
			const res = await fetch(url, {
				method,
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setForm({ title: '', summary: '', date: '', featured: false });
				setEditingId(null);
				fetchNews();
			}
		} catch (err) { console.error(err); }
	};

	const handleEdit = (item: NewsItem) => {
		setForm({ title: item.title, summary: item.summary, date: item.date, featured: item.featured });
		setEditingId(item.id);
	};

	const handleDelete = async (id: number) => {
		if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;
		try {
			const res = await fetch(`${API_URL}/news/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			if (res.ok) fetchNews();
		} catch (err) { console.error(err); }
	};

	useEffect(() => { fetchNews(); }, []);

	return (
		<div>
			<h1 style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}>Gestão de Notícias</h1>

			<form onSubmit={handleSubmit} style={{ background: 'var(--surf)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid var(--line)' }}>
				<h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>{editingId ? 'Editar' : 'Nova'} Notícia</h3>
				<div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
					<input placeholder="Título" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--tx)' }} />
					<input placeholder="Data (ex: 19 de Nov de 2026)" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--tx)' }} />
					<textarea placeholder="Resumo" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} required rows={2} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--tx)', gridColumn: '1 / -1' }} />
					<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
						Destaque na Home
					</label>
				</div>
				<button type="submit" className="btn" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem' }}>
					{editingId ? 'Atualizar' : 'Publicar'} Notícia
				</button>
			</form>

			{loading ? <p>Carregando...</p> : (
				<div style={{ display: 'grid', gap: '1rem' }}>
					{news.map(item => (
						<div key={item.id} style={{ background: 'var(--surf)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<div>
								<h4 style={{ marginBottom: '0.25rem' }}>{item.title} {item.featured && <span style={{ fontSize: '0.7rem', background: 'var(--gold)', color: 'var(--bg)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>DESTAQUE</span>}</h4>
								<p style={{ fontSize: '0.85rem', color: 'var(--mut)' }}>{item.summary.substring(0, 100)}...</p>
								<small style={{ color: 'var(--mut)' }}>{item.date}</small>
							</div>
							<div style={{ display: 'flex', gap: '0.5rem' }}>
								<button onClick={() => handleEdit(item)} style={{ padding: '0.25rem 0.75rem', background: 'transparent', border: '1px solid var(--sky)', borderRadius: '4px', color: 'var(--sky)', cursor: 'pointer' }}>Editar</button>
								<button onClick={() => handleDelete(item.id)} style={{ padding: '0.25rem 0.75rem', background: 'transparent', border: '1px solid #f43f5e', borderRadius: '4px', color: '#f43f5e', cursor: 'pointer' }}>Excluir</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
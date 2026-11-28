'use client';

import { useEffect, useState } from 'react';

interface ServiceItem {
	id: number;
	title: string;
	description: string;
	icon: string;
}

const ICON_OPTIONS = ['shield', 'building', 'camera', 'route', 'users', 'user-shield'];

export default function AdminServicesPage() {
	const [services, setServices] = useState<ServiceItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [form, setForm] = useState({ title: '', description: '', icon: 'shield' });
	const [editingId, setEditingId] = useState<number | null>(null);

	const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

	const fetchServices = async () => {
		try {
			const res = await fetch(`${API_URL}/services`, { credentials: 'include' });
			if (res.ok) setServices(await res.json());
		} catch (err) { console.error(err); }
		finally { setLoading(false); }
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const method = editingId ? 'PUT' : 'POST';
		const url = `${API_URL}/services${editingId ? `/${editingId}` : ''}`;

		try {
			const res = await fetch(url, {
				method,
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setForm({ title: '', description: '', icon: 'shield' });
				setEditingId(null);
				fetchServices();
			}
		} catch (err) { console.error(err); }
	};

	const handleEdit = (item: ServiceItem) => {
		setForm({ title: item.title, description: item.description, icon: item.icon });
		setEditingId(item.id);
	};

	const handleDelete = async (id: number) => {
		if (!confirm('Tem certeza que deseja excluir este serviço?')) return;
		try {
			const res = await fetch(`${API_URL}/services/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			if (res.ok) fetchServices();
		} catch (err) { console.error(err); }
	};

	useEffect(() => { fetchServices(); }, []);

	return (
		<div>
			<h1 style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}>Gestão de Serviços</h1>

			<form onSubmit={handleSubmit} style={{ background: 'var(--surf)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid var(--line)' }}>
				<h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>{editingId ? 'Editar' : 'Novo'} Serviço</h3>
				<div style={{ display: 'grid', gap: '1rem' }}>
					<input placeholder="Título do Serviço" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--tx)' }} />
					<textarea placeholder="Descrição curta" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows={2} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--tx)' }} />
					<div>
						<label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Ícone:</label>
						<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
							{ICON_OPTIONS.map(icon => (
								<button
									key={icon}
									type="button"
									onClick={() => setForm({...form, icon})}
									style={{
										padding: '0.5rem',
										borderRadius: '4px',
										border: form.icon === icon ? '2px solid var(--gold)' : '1px solid var(--line)',
										background: form.icon === icon ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
										color: 'var(--tx)',
										cursor: 'pointer'
									}}
								>
									{icon}
								</button>
							))}
						</div>
					</div>
				</div>
				<button type="submit" className="btn" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem' }}>
					{editingId ? 'Atualizar' : 'Salvar'} Serviço
				</button>
			</form>

			{loading ? <p>Carregando...</p> : (
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
					{services.map(item => (
						<div key={item.id} style={{ background: 'var(--surf)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--line)' }}>
							<div style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>{item.icon}</div>
							<h4 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>{item.title}</h4>
							<p style={{ fontSize: '0.85rem', color: 'var(--mut)', textAlign: 'center', marginBottom: '1rem' }}>{item.description}</p>
							<div style={{ display: 'flex', gap: '0.5rem' }}>
								<button onClick={() => handleEdit(item)} style={{ flex: 1, padding: '0.25rem', background: 'transparent', border: '1px solid var(--sky)', borderRadius: '4px', color: 'var(--sky)', cursor: 'pointer' }}>Editar</button>
								<button onClick={() => handleDelete(item.id)} style={{ flex: 1, padding: '0.25rem', background: 'transparent', border: '1px solid #f43f5e', borderRadius: '4px', color: '#f43f5e', cursor: 'pointer' }}>Excluir</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
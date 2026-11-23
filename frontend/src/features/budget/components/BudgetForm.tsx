'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { submitBudget } from '@/lib/api-client';
import type { CreateBudgetDto } from '@/lib/types';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM: CreateBudgetDto = {
	name: '',
	email: '',
	phone: '',
	company: '',
	serviceType: '',
	message: '',
};

export default function BudgetForm() {
	const [formData, setFormData] = useState<CreateBudgetDto>(INITIAL_FORM);
	const [status, setStatus] = useState<SubmitStatus>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setStatus('submitting');
		setErrorMessage('');

		try {
			await submitBudget(formData);
			setStatus('success');
			setFormData(INITIAL_FORM);
		} catch {
			setStatus('error');
			setErrorMessage('Erro ao enviar solicitação. Tente novamente ou entre em contato por telefone.');
		}
	};

	if (status === 'success') {
		return (
			<div style={{ background: 'var(--surf)', padding: '3rem', borderRadius: '12px', textAlign: 'center' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Solicitação enviada!</h2>
				<p style={{ color: 'var(--tx)', fontSize: '1.1rem', marginBottom: '2rem' }}>
					Recebemos sua solicitação de orçamento. Nossa equipe entrará em contato em breve.
				</p>
				<a href="/" className="btn" style={{ display: 'inline-block' }}>
					Voltar ao início
				</a>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} style={{ background: 'var(--surf)', padding: '2rem', borderRadius: '12px' }}>
			<div style={{ display: 'grid', gap: '1.5rem' }}>
				<div>
					<label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Nome completo *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						style={{
							width: '100%',
							padding: '0.75rem',
							borderRadius: '6px',
							border: '1px solid var(--line)',
							background: 'var(--bg)',
							color: 'var(--tx)',
							fontSize: '1rem',
						}}
					/>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
					<div>
						<label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
							E-mail *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.75rem',
								borderRadius: '6px',
								border: '1px solid var(--line)',
								background: 'var(--bg)',
								color: 'var(--tx)',
								fontSize: '1rem',
							}}
						/>
					</div>

					<div>
						<label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
							Telefone
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							placeholder="(61) 99999-9999"
							style={{
								width: '100%',
								padding: '0.75rem',
								borderRadius: '6px',
								border: '1px solid var(--line)',
								background: 'var(--bg)',
								color: 'var(--tx)',
								fontSize: '1rem',
							}}
						/>
					</div>
				</div>

				<div>
					<label htmlFor="company" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Empresa
					</label>
					<input
						type="text"
						id="company"
						name="company"
						value={formData.company}
						onChange={handleChange}
						style={{
							width: '100%',
							padding: '0.75rem',
							borderRadius: '6px',
							border: '1px solid var(--line)',
							background: 'var(--bg)',
							color: 'var(--tx)',
							fontSize: '1rem',
						}}
					/>
				</div>

				<div>
					<label htmlFor="serviceType" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Tipo de serviço
					</label>
					<select
						id="serviceType"
						name="serviceType"
						value={formData.serviceType}
						onChange={handleChange}
						style={{
							width: '100%',
							padding: '0.75rem',
							borderRadius: '6px',
							border: '1px solid var(--line)',
							background: 'var(--bg)',
							color: 'var(--tx)',
							fontSize: '1rem',
						}}
					>
						<option value="">Selecione um serviço</option>
						<option value="vigilancia">Vigilância patrimonial</option>
						<option value="portaria">Portaria e acesso</option>
						<option value="monitoramento">Monitoramento</option>
						<option value="escolta">Escolta</option>
						<option value="eventos">Eventos</option>
						<option value="seguranca-pessoal">Segurança pessoal</option>
					</select>
				</div>

				<div>
					<label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Mensagem *
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						required
						rows={5}
						placeholder="Descreva sua necessidade, local, número de postos, horário de operação..."
						style={{
							width: '100%',
							padding: '0.75rem',
							borderRadius: '6px',
							border: '1px solid var(--line)',
							background: 'var(--bg)',
							color: 'var(--tx)',
							fontSize: '1rem',
							resize: 'vertical',
							fontFamily: 'inherit',
						}}
					/>
				</div>

				{status === 'error' && (
					<div style={{ padding: '1rem', background: '#5c1a1a', borderRadius: '6px', color: '#ffcccc' }}>
						{errorMessage}
					</div>
				)}

				<button
					type="submit"
					disabled={status === 'submitting'}
					className="btn"
					style={{
						width: '100%',
						padding: '1rem',
						fontSize: '1.1rem',
						fontWeight: '600',
						cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
						opacity: status === 'submitting' ? 0.7 : 1,
					}}
				>
					{status === 'submitting' ? 'Enviando...' : 'Solicitar orçamento'}
				</button>
			</div>

			<div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--mut)' }}>
				<p>Ou entre em contato diretamente:</p>
				<p style={{ marginTop: '0.5rem' }}>
					<a href="tel:+556133996013" style={{ color: 'var(--sky)' }}>(61) 3399-6013</a>
					{' · '}
					<a href="https://wa.me/5561999999999" style={{ color: 'var(--sky)' }}>WhatsApp</a>
				</p>
			</div>
		</form>
	);
}
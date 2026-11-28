'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface JobFormData {
	name: string;
	email: string;
	phone: string;
	position: string;
	message: string;
}

const INITIAL_FORM: JobFormData = {
	name: '',
	email: '',
	phone: '',
	position: '',
	message: '',
};

const POSITIONS = [
	{ value: '', label: 'Selecione uma área' },
	{ value: 'vigilancia', label: 'Vigilância patrimonial' },
	{ value: 'portaria', label: 'Portaria e acesso' },
	{ value: 'monitoramento', label: 'Monitoramento' },
	{ value: 'escolta', label: 'Escolta armada' },
	{ value: 'eventos', label: 'Segurança de eventos' },
	{ value: 'seguranca-pessoal', label: 'Segurança pessoal' },
	{ value: 'administrativo', label: 'Administrativo' },
];

const inputStyle = {
	width: '100%',
	padding: '0.75rem',
	borderRadius: '6px',
	border: '1px solid var(--line)',
	background: 'var(--bg)',
	color: 'var(--tx)',
	fontSize: '1rem',
};

export default function JobForm() {
	const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM);
	const [resumeFile, setResumeFile] = useState<File | null>(null);
	const [resumeError, setResumeError] = useState('');
	const [status, setStatus] = useState<SubmitStatus>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setResumeError('');
		setResumeFile(null);

		if (!file) return;

		const allowedTypes = [
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		];
		const maxSize = 5 * 1024 * 1024; // 5MB

		if (!allowedTypes.includes(file.type)) {
			setResumeError('Formato não aceito. Envie apenas PDF ou DOC/DOCX.');
			return;
		}

		if (file.size > maxSize) {
			setResumeError('Arquivo muito grande. Limite de 5MB.');
			return;
		}

		setResumeFile(file);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setStatus('submitting');
		setErrorMessage('');

		try {
			// TODO: Implementar submitJobApplication() no api-client.ts quando o backend tiver suporte a upload
			// Por enquanto, simula envio sem arquivo para validar o fluxo do formulário
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Simulação de sucesso — remover quando backend estiver configurado
			void resumeFile;
			setStatus('success');
			setFormData(INITIAL_FORM);
			setResumeFile(null);
		} catch {
			setStatus('error');
			setErrorMessage('Erro ao enviar candidatura. Tente novamente ou entre em contato por telefone.');
		}
	};

	if (status === 'success') {
		return (
			<div style={{ background: 'var(--surf)', padding: '3rem', borderRadius: '12px', textAlign: 'center' }}>
				<h2 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Candidatura enviada!</h2>
				<p style={{ color: 'var(--tx)', fontSize: '1.1rem', marginBottom: '2rem' }}>
					Recebemos sua candidatura. Nossa equipe de RH entrará em contato se houver uma vaga compatível com seu perfil.
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
				{/* Nome completo */}
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
						style={inputStyle}
					/>
				</div>

				{/* E-mail */}
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
						style={inputStyle}
					/>
				</div>

				{/* Telefone/WhatsApp */}
				<div>
					<label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Telefone / WhatsApp *
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="(61) 99999-9999"
						required
						style={inputStyle}
					/>
				</div>

				{/* Cargo de interesse */}
				<div>
					<label htmlFor="position" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Cargo de interesse *
					</label>
					<select
						id="position"
						name="position"
						value={formData.position}
						onChange={handleChange}
						required
						style={inputStyle}
					>
						{POSITIONS.map((p) => (
							<option key={p.value} value={p.value}>
								{p.label}
							</option>
						))}
					</select>
				</div>

				{/* Upload de currículo */}
				<div>
					<label htmlFor="resume" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Currículo (PDF ou DOC/DOCX, máx. 5MB)
					</label>
					<input
						type="file"
						id="resume"
						name="resume"
						accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						onChange={handleFileChange}
						style={inputStyle}
					/>
					{resumeError && (
						<p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.35rem' }}>{resumeError}</p>
					)}
					{resumeFile && !resumeError && (
						<p style={{ color: 'var(--gold)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
							✓ {resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)
						</p>
					)}
					<p style={{ color: 'var(--mut)', fontSize: '0.8rem', marginTop: '0.35rem', fontStyle: 'italic' }}>
						⚠️ O upload de currículo será ativado após configuração do backend. Sua candidatura será enviada mesmo sem arquivo por enquanto.
					</p>
				</div>

				{/* Mensagem/observações */}
				<div>
					<label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tx)', fontWeight: '500' }}>
						Mensagem / observações
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows={4}
						placeholder="Conte um pouco sobre sua experiência e motivação..."
						style={{ ...inputStyle, resize: 'vertical' }}
					/>
				</div>

				{/* Feedback de erro */}
				{status === 'error' && (
					<p style={{ color: '#ef4444', fontSize: '0.95rem', textAlign: 'center' }}>{errorMessage}</p>
				)}

				{/* Botão de envio */}
				<button
					type="submit"
					className="btn"
					disabled={status === 'submitting'}
					style={{
						width: '100%',
						padding: '1rem',
						fontSize: '1.05rem',
						cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
						opacity: status === 'submitting' ? 0.7 : 1,
					}}
				>
					{status === 'submitting' ? 'Enviando...' : 'Enviar candidatura'}
				</button>
			</div>
		</form>
	);
}
import type { ServiceItem, SegmentItem, NewsItem, CreateBudgetDto, BudgetRequest } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

const FALLBACK_SERVICES: ServiceItem[] = [
	{ id: 1, title: 'Vigilância patrimonial', description: 'Empresas, indústrias e obras', icon: 'shield' },
	{ id: 2, title: 'Portaria e acesso', description: 'Recepção e controle de entrada', icon: 'building' },
	{ id: 3, title: 'Monitoramento', description: 'Câmeras e acompanhamento remoto', icon: 'camera' },
	{ id: 4, title: 'Escolta', description: 'Deslocamentos e cargas seguras', icon: 'route' },
	{ id: 5, title: 'Eventos', description: 'Controle de público e segurança', icon: 'users' },
	{ id: 6, title: 'Segurança pessoal', description: 'Proteção para pessoas e famílias', icon: 'user-shield' },
];

const FALLBACK_SEGMENTS: SegmentItem[] = [
	{ id: 1, title: 'Empresas e indústrias', description: 'Proteção do patrimônio, controle de acesso e rondas para operações de qualquer porte.' },
	{ id: 2, title: 'Condomínios', description: 'Portaria, controle de visitantes e monitoramento para moradores e administração.' },
	{ id: 3, title: 'Eventos', description: 'Equipe dimensionada para o público e para o local, do planejamento ao encerramento.' },
];

const FALLBACK_NEWS: NewsItem[] = [
	{ id: 1, title: '[Título da notícia principal]', summary: 'Resumo da notícia em duas linhas.', date: '[dd de mês de aaaa]', featured: true },
	{ id: 2, title: '[Título da notícia]', summary: 'Resumo curto.', date: '[data]', featured: false },
	{ id: 3, title: '[Título da notícia]', summary: 'Resumo curto.', date: '[data]', featured: false },
];

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		headers: { 'Content-Type': 'application/json' },
		...options,
	});

	if (!res.ok) {
		throw new Error(`API error: ${res.status} ${res.statusText}`);
	}

	return res.json();
}

export async function getServices(): Promise<ServiceItem[]> {
	try {
		return await fetchApi<ServiceItem[]>('/services', { next: { revalidate: 3600 } });
	} catch {
		return FALLBACK_SERVICES;
	}
}

export async function getSegments(): Promise<SegmentItem[]> {
	try {
		return await fetchApi<SegmentItem[]>('/segments', { next: { revalidate: 3600 } });
	} catch {
		return FALLBACK_SEGMENTS;
	}
}

export async function getNews(): Promise<NewsItem[]> {
	try {
		return await fetchApi<NewsItem[]>('/news', { next: { revalidate: 1800 } });
	} catch {
		return FALLBACK_NEWS;
	}
}

export async function submitBudget(data: CreateBudgetDto): Promise<BudgetRequest> {
	return fetchApi<BudgetRequest>('/budget', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}
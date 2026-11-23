import type { ServiceItem, SegmentItem, NewsItem, CreateBudgetDto, BudgetRequest } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

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

// --- Services (Server Component friendly - revalidable) ---
export async function getServices(): Promise<ServiceItem[]> {
	return fetchApi<ServiceItem[]>('/services', { next: { revalidate: 3600 } });
}

// --- Segments ---
export async function getSegments(): Promise<SegmentItem[]> {
	return fetchApi<SegmentItem[]>('/segments', { next: { revalidate: 3600 } });
}

// --- News ---
export async function getNews(): Promise<NewsItem[]> {
	return fetchApi<NewsItem[]>('/news', { next: { revalidate: 1800 } });
}

// --- Budget (Client-side mutation) ---
export async function submitBudget(data: CreateBudgetDto): Promise<BudgetRequest> {
	return fetchApi<BudgetRequest>('/budget', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}
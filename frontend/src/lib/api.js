const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

async function fetchApi(endpoint) {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error(`API error: ${res.status} ${res.statusText}`);
	}

	return res.json();
}

export async function getServices() {
	return fetchApi('/services');
}

export async function getSegments() {
	return fetchApi('/segments');
}

export async function getNews() {
	return fetchApi('/news');
}

export async function submitBudget(data) {
	const res = await fetch(`${API_BASE}/budget`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error(`API error: ${res.status} ${res.statusText}`);
	}

	return res.json();
}
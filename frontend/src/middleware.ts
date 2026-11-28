import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token');
	const { pathname } = request.nextUrl;

	// Permite acesso livre à página de login
	if (pathname === '/admin/login') {
		return NextResponse.next();
	}

	// Redireciona para login se não houver cookie de autenticação
	if (!token && pathname.startsWith('/admin')) {
		const loginUrl = new URL('/admin/login', request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*'],
};
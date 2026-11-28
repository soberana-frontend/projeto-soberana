import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

function extractTokenFromCookieOrHeader(req: Request): string | null {
	// Prioriza cookie HttpOnly (fluxo padrão do frontend)
	if (req.cookies?.token) {
		return req.cookies.token;
	}
	// Fallback para header Authorization (Swagger, integrações externas)
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith('Bearer ')) {
		return authHeader.substring(7);
	}
	return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookieOrHeader]),
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, email: payload.email, role: payload.role };
	}
}
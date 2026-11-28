import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(
 @Body() loginDto: { email: string; password: string },
 @Res({ passthrough: true }) res: Response,
	) {
 const user = await this.authService.validateUser(loginDto.email, loginDto.password);
 if (!user) {
 throw new UnauthorizedException();
 }
 const { access_token } = await this.authService.login(user);

 res.cookie('token', access_token, {
 httpOnly: true,
 secure: process.env.NODE_ENV === 'production',
 sameSite: 'lax',
 path: '/',
 maxAge: 24 * 60 * 60 * 1000, // 24 horas
 });

 return { message: 'Login realizado com sucesso' };
	}

	@Post('logout')
	logout(@Res({ passthrough: true }) res: Response) {
 res.clearCookie('token', {
 httpOnly: true,
 secure: process.env.NODE_ENV === 'production',
 sameSite: 'lax',
 path: '/',
 });
 return { message: 'Logout realizado com sucesso' };
	}
}
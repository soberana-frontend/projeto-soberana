import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Parser de cookies para suportar autenticação via HttpOnly
  app.use(cookieParser());

  // Validação global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS para permitir requisições do frontend Next.js com credenciais
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Prefixo global para todas as rotas da API
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3333);
  console.log(` Backend rodando em http://localhost:${process.env.PORT ?? 3333}/api`);
}
await bootstrap();
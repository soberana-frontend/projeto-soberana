import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para permitir requisições do frontend Next.js
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Prefixo global para todas as rotas da API
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3333);
  console.log(`🚀 Backend rodando em http://localhost:${process.env.PORT ?? 3333}/api`);
}
await bootstrap();

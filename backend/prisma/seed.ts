import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Iniciando seed do banco de dados...');

	// --- Admin User ---
	const adminEmail = process.env.ADMIN_EMAIL || 'admin@soberana.com';
	const adminPassword = process.env.ADMIN_PASSWORD;
	if (!adminPassword) {
		throw new Error('ADMIN_PASSWORD não definida nas variáveis de ambiente. Defina uma senha forte antes de rodar o seed.');
	}
	const hashedPassword = await bcrypt.hash(adminPassword, 10);

	await prisma.user.upsert({
 where: { email: adminEmail },
 update: {},
 create: {
 name: 'Administrador',
 email: adminEmail,
 password: hashedPassword,
 role: 'admin',
 },
	});
	console.log(`✅ Usuário administrador criado/atualizado: ${adminEmail}`);

	// --- Services ---
	const services = [
 { title: 'Vigilância patrimonial', description: 'Empresas, indústrias e obras', icon: 'shield' },
 { title: 'Portaria e acesso', description: 'Recepção e controle de entrada', icon: 'building' },
 { title: 'Monitoramento', description: 'Câmeras e acompanhamento remoto', icon: 'camera' },
 { title: 'Escolta', description: 'Deslocamentos e cargas seguras', icon: 'route' },
 { title: 'Eventos', description: 'Controle de público e segurança', icon: 'users' },
 { title: 'Segurança pessoal', description: 'Proteção para pessoas e famílias', icon: 'user-shield' },
	];

	await prisma.service.deleteMany();
	await prisma.service.createMany({ data: services });
	console.log(`✅ ${services.length} serviços inseridos`);

	// --- Segments ---
	const segments = [
 { title: 'Empresas e indústrias', description: 'Proteção do patrimônio, controle de acesso e rondas para operações de qualquer porte.' },
 { title: 'Condomínios', description: 'Portaria, controle de visitantes e monitoramento para moradores e administração.' },
 { title: 'Eventos', description: 'Equipe dimensionada para o público e para o local, do planejamento ao encerramento.' },
	];

	await prisma.segment.deleteMany();
	await prisma.segment.createMany({ data: segments });
	console.log(`✅ ${segments.length} segmentos inseridos`);

	// --- News ---
	const news = [
 { title: '[Título da notícia principal]', summary: 'Resumo da notícia em duas linhas.', date: '[dd de mês de aaaa]', featured: true },
 { title: '[Título da notícia]', summary: 'Resumo curto.', date: '[data]', featured: false },
 { title: '[Título da notícia]', summary: 'Resumo curto.', date: '[data]', featured: false },
	];

	await prisma.news.deleteMany();
	await prisma.news.createMany({ data: news });
	console.log(`✅ ${news.length} notícias inseridas`);

	// --- Budget (limpa tabela, não insere dados fixos) ---
	await prisma.budget.deleteMany();
	console.log('✅ Tabela de orçamentos limpa');

	console.log('🎉 Seed concluído com sucesso!');
	console.log(`ℹ️ Usuário admin criado/atualizado: ${adminEmail}`);
	console.log('⚠️  A senha do admin foi definida via variável de ambiente ADMIN_PASSWORD.');
}

main()
	.catch((e) => {
 console.error('❌ Erro no seed:', e);
 process.exit(1);
	})
	.finally(async () => {
 await prisma.$disconnect();
	});
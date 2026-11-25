import CtaBanner from '@/components/ui/CtaBanner';
import { Hero, Stats } from '@/features/hero';
import { CredentialCards } from '@/features/credentials';
import { ServicesCarousel } from '@/features/services';
import { Segments } from '@/features/segments';
import { Team, Leadership } from '@/features/team';
import { News } from '@/features/news';
import { SocialAction } from '@/features/social';
import { getServices } from '@/lib/api-client';

export default async function Home() {
	const services = await getServices();

	return (
		<>
			<main>
				<Hero />
				<Stats />
				<CredentialCards />
				<ServicesCarousel services={services} />
				<Segments />
				<Team />
				<Leadership />
				<News />
				<SocialAction />
				<CtaBanner />
			</main>
		</>
	);
}
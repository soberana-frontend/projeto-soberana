import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ServicesCarousel from '@/components/ServicesCarousel';
import Segments from '@/components/Segments';
import Team from '@/components/Team';
import Leadership from '@/components/Leadership';
import News from '@/components/News';
import SocialAction from '@/components/SocialAction';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Stats />
				<ServicesCarousel />
				<Segments />
				<Team />
				<Leadership />
				<News />
				<SocialAction />
				<CtaBanner />
			</main>
			<Footer />
			<WhatsAppButton />
		</>
	);
}
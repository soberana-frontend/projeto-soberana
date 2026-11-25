interface PageHeroProps {
	eyebrow: string;
	title: string;
}

export default function PageHero({ eyebrow, title }: PageHeroProps) {
	return (
		<section className="inst-hero">
			<div className="w">
				<p className="eyebrow">{eyebrow}</p>
				<h1>{title}</h1>
			</div>
		</section>
	);
}
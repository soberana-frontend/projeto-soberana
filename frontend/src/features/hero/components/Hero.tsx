export default function Hero() {
	return (
		<section className="hero">
			<video className="hero-video" autoPlay loop muted playsInline>
				<source src="/hero-video.mp4" type="video/mp4" />
			</video>
			<div className="w">
				<div>
					<p className="eyebrow">Segurança patrimonial no DF</p>
					<h1>Proteção <b>inteligente</b> para o seu <em>negócio</em></h1>
					<p className="lead">Soluções completas em vigilância, portaria e monitoramento para empresas, indústrias e condomínios.</p>
					<div className="cta">
						<a className="btn" href="/orcamento">Solicitar orçamento</a>
						<a className="btn o" href="https://wa.me/55SEUNUMERO" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
					</div>
				</div>
			</div>
		</section>
	);
}
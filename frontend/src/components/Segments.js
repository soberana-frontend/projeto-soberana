const SEGMENTS = [
	{
		title: 'Empresas e indústrias',
		desc: 'Proteção do patrimônio, controle de acesso e rondas para operações de qualquer porte.',
	},
	{
		title: 'Condomínios',
		desc: 'Portaria, controle de visitantes e monitoramento para moradores e administração.',
	},
	{
		title: 'Eventos',
		desc: 'Equipe dimensionada para o público e para o local, do planejamento ao encerramento.',
	},
];

export default function Segments() {
	return (
		<section id="segmentos">
			<div className="w">
				<p className="eyebrow">Para quem atuamos</p>
				<h2>Segurança sob medida para o seu segmento</h2>
				<p className="sub2">Cada cliente tem riscos diferentes, e o plano é montado a partir deles.</p>
				<div className="seg">
					{SEGMENTS.map((seg) => (
						<article key={seg.title}>
							<h3>{seg.title}</h3>
							<p>{seg.desc}</p>
							<a href="#contato">Falar com a equipe →</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
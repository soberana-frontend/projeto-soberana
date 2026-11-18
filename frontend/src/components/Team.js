const CHECKLIST = [
	'Uniforme e identificação padronizados',
	'Comunicação por rádio com a central',
	'Supervisão e relatórios de ocorrência',
];

export default function Team() {
	return (
		<section id="equipe">
			<div className="w split">
				<div style={{ flex: 1 }}>
					<p className="eyebrow">Nossa equipe</p>
					<h2>Profissionais preparados para cada turno</h2>
					<p className="sub2">Textos de exemplo: ajuste ao que a Soberana realmente oferece.</p>
					<ul className="ck">
						{CHECKLIST.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
					<a className="btn" href="#contato">Falar com a equipe</a>
				</div>
			</div>
		</section>
	);
}
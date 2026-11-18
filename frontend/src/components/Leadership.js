const LEADERS = [
	{ initial: 'P', name: '[Nome]', role: 'Presidente' },
	{ initial: 'D', name: '[Nome]', role: 'Diretor operacional' },
	{ initial: 'A', name: '[Nome]', role: 'Diretor administrativo' },
];

export default function Leadership() {
	return (
		<section id="institucional" className="alt">
			<div className="w">
				<p className="eyebrow">Institucional</p>
				<h2>Nossa liderança</h2>
				<p className="sub2">Espaço para apresentar quem conduz a Soberana, como em destaque de equipe.</p>
				<div className="team">
					{LEADERS.map((leader) => (
						<div key={leader.role} className="pp">
							<div className="av" aria-hidden="true">{leader.initial}</div>
							<h3>{leader.name}</h3>
							<p>{leader.role}</p>
							<a href="#">Conheça a biografia →</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
const STATS = [
	{ value: '+30 anos', label: 'de atuação no mercado' },
	{ value: '+[000]', label: 'postos de serviço atendidos' },
	{ value: '24 horas', label: 'de atendimento e suporte à operação' },
];

export default function Stats() {
	return (
		<div className="stats">
			<div className="w">
				{STATS.map((stat) => (
					<div key={stat.label} className="stat-card">
						<strong>{stat.value}</strong>
						<span>{stat.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}
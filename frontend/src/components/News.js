const NEWS_ITEMS = [
	{
		big: true,
		date: '[dd de mês de aaaa]',
		title: '[Título da notícia principal]',
		summary: 'Resumo da notícia em duas linhas.',
	},
	{
		date: '[data]',
		title: '[Título da notícia]',
		summary: 'Resumo curto.',
	},
	{
		date: '[data]',
		title: '[Título da notícia]',
		summary: 'Resumo curto.',
	},
];

export default function News() {
	return (
		<section id="noticias">
			<div className="w">
				<p className="eyebrow">Nossa comunidade</p>
				<h2>Notícias e novidades</h2>
				<p className="sub2">Conecte-se com o que acontece na Soberana.</p>
				<div className="news">
					{NEWS_ITEMS.map((item, i) => (
						<article key={i} className={`nw${item.big ? ' big' : ''}`}>
							<div className="im" aria-hidden="true">{item.big ? 'Foto da notícia' : 'Foto'}</div>
							<div className="t">
								<time>{item.date}</time>
								<h3>{item.title}</h3>
								<p>{item.summary}</p>
								<a href="#">Leia mais →</a>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
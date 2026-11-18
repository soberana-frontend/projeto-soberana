'use client';

import { useEffect, useState } from 'react';
import { getNews } from '@/lib/api';

export default function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		getNews().then(setNews).catch(console.error);
	}, []);

	return (
		<section id="noticias">
			<div className="w">
				<p className="eyebrow">Nossa comunidade</p>
				<h2>Notícias e novidades</h2>
				<p className="sub2">Conecte-se com o que acontece na Soberana.</p>
				<div className="news">
					{news.map((item) => (
						<article key={item.id} className={`nw${item.featured ? ' big' : ''}`}>
							<div className="im" aria-hidden="true">{item.featured ? 'Foto da notícia' : 'Foto'}</div>
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
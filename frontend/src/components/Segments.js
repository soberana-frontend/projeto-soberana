'use client';

import { useEffect, useState } from 'react';
import { getSegments } from '@/lib/api';

export default function Segments() {
	const [segments, setSegments] = useState([]);

	useEffect(() => {
		getSegments().then(setSegments).catch(console.error);
	}, []);

	return (
		<section id="segmentos">
			<div className="w">
				<p className="eyebrow">Para quem atuamos</p>
				<h2>Segurança sob medida para o seu segmento</h2>
				<p className="sub2">Cada cliente tem riscos diferentes, e o plano é montado a partir deles.</p>
				<div className="seg">
					{segments.map((seg) => (
						<article key={seg.id}>
							<h3>{seg.title}</h3>
							<p>{seg.description}</p>
							<a href="#contato">Falar com a equipe →</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
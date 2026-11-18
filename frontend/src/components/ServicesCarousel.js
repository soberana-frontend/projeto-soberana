'use client';

import { useEffect, useRef } from 'react';

const SERVICES = [
	{
		title: 'Vigilância patrimonial',
		desc: 'Empresas, indústrias e obras',
		icon: <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />,
	},
	{
		title: 'Portaria e acesso',
		desc: 'Recepção e controle de entrada',
		icon: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2" /></>,
	},
	{
		title: 'Monitoramento',
		desc: 'Câmeras e acompanhamento remoto',
		icon: <><rect x="3" y="7" width="18" height="12" rx="2" /><circle cx="12" cy="13" r="3" /><path d="M8 7l1.5-2h5L16 7" /></>,
	},
	{
		title: 'Escolta',
		desc: 'Deslocamentos e cargas seguras',
		icon: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h6a4 4 0 000-8h-4a4 4 0 010-8h6" /></>,
	},
	{
		title: 'Eventos',
		desc: 'Controle de público e segurança',
		icon: <path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />,
	},
	{
		title: 'Segurança pessoal',
		desc: 'Proteção para pessoas e famílias',
		icon: <><circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" /></>,
	},
];

export default function ServicesCarousel() {
	const ringRef = useRef(null);

	useEffect(() => {
		const ring = ringRef.current;
		if (!ring) return;

		const faces = ring.querySelectorAll('.c-face');
		const n = faces.length;
		if (n === 0) return;

		const angle = 360 / n;
		const radius = Math.max(280, n * 42);
		let cur = 0;
		let drag = false;
		let lastX = 0;
		let vel = 0;
		let raf = null;
		let autoTimer = null;
		let autoAngle = 0;

		faces.forEach((f, i) => {
			f.style.transform = `rotateY(${i * angle}deg) translateZ(${radius}px)`;
		});

		function update() {
			faces.forEach((f, i) => {
				const rel = ((i - cur) % n + n) % n;
				const fwd = rel <= n / 2 ? rel : rel - n;
				const dist = Math.abs(fwd);
				f.classList.toggle('active', dist === 0);
				f.style.opacity = dist === 0 ? '1' : dist === 1 ? '.55' : '.25';
				f.style.filter = dist === 0 ? 'none' : dist === 1 ? 'blur(.5px)' : 'blur(2px)';
				f.style.zIndex = dist === 0 ? 2 : dist === 1 ? 1 : 0;
			});
		}

		function setRot(deg, snap) {
			ring.style.transition = snap ? 'transform .4s cubic-bezier(.25,.8,.25,1)' : 'none';
			ring.style.transform = `rotateY(${deg}deg)`;
			cur = Math.round(-deg / angle) % n;
			if (cur < 0) cur += n;
			update();
		}

		setRot(0, true);

		function startAuto() {
			stopAuto();
			autoTimer = setInterval(() => {
				autoAngle -= 60;
				setRot(autoAngle, true);
			}, 3000);
		}

		function stopAuto() {
			if (autoTimer) {
				clearInterval(autoTimer);
				autoTimer = null;
			}
		}

		function onDown(e) {
			drag = true;
			lastX = e.touches ? e.touches[0].clientX : e.clientX;
			vel = 0;
			ring.classList.add('dragging');
			cancelAnimationFrame(raf);
			stopAuto();
		}

		function onMove(e) {
			if (!drag) return;
			const x = e.touches ? e.touches[0].clientX : e.clientX;
			const dx = x - lastX;
			vel = dx;
			setRot(-cur * angle + dx * 0.4, false);
			lastX = x;
		}

		function onUp() {
			if (!drag) return;
			drag = false;
			ring.classList.remove('dragging');
			const snap = Math.round((-cur * angle + vel * 8) / angle) * angle;
			autoAngle = snap;
			setRot(snap, true);
			startAuto();
		}

		ring.addEventListener('mousedown', onDown);
		ring.addEventListener('touchstart', onDown, { passive: true });
		window.addEventListener('mousemove', onMove);
		window.addEventListener('touchmove', onMove, { passive: true });
		window.addEventListener('mouseup', onUp);
		window.addEventListener('touchend', onUp);

		faces.forEach((f) => {
			f.addEventListener('click', (e) => {
				if (Math.abs(vel) > 3) e.preventDefault();
			});
		});

		startAuto();
		ring.addEventListener('mouseenter', stopAuto);
		ring.addEventListener('mouseleave', startAuto);

		return () => {
			stopAuto();
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('touchmove', onMove);
			window.removeEventListener('mouseup', onUp);
			window.removeEventListener('touchend', onUp);
		};
	}, []);

	return (
		<section id="servicos">
			<div className="w">
				<p className="eyebrow">Serviços</p>
				<h2>Soluções para cada tipo de operação</h2>
				<p className="sub2">Arraste para girar e toque no card para selecionar.</p>
			</div>

			{/* Carrossel 3D mobile */}
			<div className="carousel-scene" id="cScene">
				<div className="carousel-ring" id="cRing" ref={ringRef}>
					{SERVICES.map((svc, i) => (
						<a key={i} className="c-face" href="#" data-i={i}>
							<svg viewBox="0 0 24 24" aria-hidden="true">{svc.icon}</svg>
							<h3>{svc.title}</h3>
							<p>{svc.desc}</p>
							<i>Saiba mais →</i>
						</a>
					))}
				</div>
				<p className="carousel-hint">← Arraste para girar · Toque para selecionar →</p>
			</div>

			{/* Grid desktop */}
			<div className="service-grid">
				{SERVICES.map((svc, i) => (
					<a key={i} className="c-face" href="#">
						<svg viewBox="0 0 24 24" aria-hidden="true">{svc.icon}</svg>
						<h3>{svc.title}</h3>
						<p>{svc.desc}</p>
					</a>
				))}
			</div>
		</section>
	);
}
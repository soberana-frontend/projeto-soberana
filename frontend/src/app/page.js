'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
 const carouselRef = useRef(null);
 const ringRef = useRef(null);
 const [cur, setCur] = useState(0);
 const year = 2026;

 useEffect(() => {
 const ring = ringRef.current;
 if (!ring) return;
 const faces = ring.querySelectorAll('.c-face');
 const n = faces.length;
 const angle = 360 / n;
 const radius = Math.max(280, n * 42);
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
 const newCur = Math.round(-deg / angle) % n;
 setCur(newCur < 0 ? newCur + n : newCur);
 }

 setRot(0, true);
 update();

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

 startAuto();

 ring.addEventListener('mouseenter', stopAuto);
 ring.addEventListener('mouseleave', startAuto);

 return () => {
 stopAuto();
 };
 }, [cur]);

 return (
 <>
 <div className="util">
 <div className="w">
 <div>
 <a href="tel:+556133996013">(61) 3399-6013</a>
 <a href="mailto:contato@soberanaseguranca.com.br">contato@soberanaseguranca.com.br</a>
 </div>
 <div className="r">
 <a href="#">Área restrita</a>
 </div>
 </div>
 </div>

 <header className="hd">
 <div className="w">
 <a className="logo" href="#" aria-label="Soberana">
 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18l1-11-5 4-5-7-5 7-5-4z"/></svg>
 <span><b>SOBERANA</b><small>Segurança e Vigilância</small></span>
 </a>
 <button className="burger" id="bg" aria-controls="nav" aria-expanded="false" aria-label="Menu">☰</button>
 <nav id="nav">
 <ul>
 <li><a href="#servicos">Serviços</a></li>
 <li><a href="#segmentos">Para quem atuamos</a></li>
 <li>
 <details>
 <summary>Institucional</summary>
 <div className="sub">
 <a href="#equipe">Nossa equipe</a>
 <a href="#institucional">Liderança</a>
 </div>
 </details>
 </li>
 <li><a href="#noticias">Notícias</a></li>
 <li><a className="btn" href="/orcamento">Solicitar orçamento</a></li>
 </ul>
 </nav>
 </div>
 </header>

 <main>
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

 <div className="stats">
 <div className="w">
 <div className="stat-card"><strong>+[00] anos</strong><span>de atuação no mercado</span></div>
 <div className="stat-card"><strong>+[000]</strong><span>postos de serviço atendidos</span></div>
 <div className="stat-card"><strong>24 horas</strong><span>de atendimento e suporte à operação</span></div>
 </div>
 </div>

 <section id="servicos">
 <div className="w">
 <p className="eyebrow">Serviços</p>
 <h2>Soluções para cada tipo de operação</h2>
 <p className="sub2">Arraste para girar e toque no card para selecionar.</p>
 </div>
 <div className="carousel-scene" id="cScene">
 <div className="service-grid">
 <div className="carousel-ring" id="cRing" ref={ringRef}>
 <a className="c-face" href="#" data-i="0">
 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/></svg>
 <h3>Vigilância patrimonial</h3>
 <p>Empresas, indústrias e obras</p>
 <i>Saiba mais →</i>
 </a>
 <a className="c-face" href="#" data-i="1">
 <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2"/></svg>
 <h3>Portaria e acesso</h3>
 <p>Recepção e controle de entrada</p>
 <i>Saiba mais →</i>
 </a>
 <a className="c-face" href="#" data-i="2">
 <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M8 7l1.5-2h5L16 7"/></svg>
 <h3>Monitoramento</h3>
 <p>Câmeras e acompanhamento remoto</p>
 <i>Saiba mais →</i>
 </a>
 <a className="c-face" href="#" data-i="3">
 <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 000-8h-4a4 4 0 010-8h6"/></svg>
 <h3>Escolta</h3>
 <p>Deslocamentos e cargas seguras</p>
 <i>Saiba mais →</i>
 </a>
 <a className="c-face" href="#" data-i="4">
 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6"/></svg>
 <h3>Eventos</h3>
 <p>Controle de público e segurança</p>
 <i>Saiba mais →</i>
 </a>
 <a className="c-face" href="#" data-i="5">
 <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
 <h3>Segurança pessoal</h3>
 <p>Proteção para pessoas e famílias</p>
 <i>Saiba mais →</i>
 </a>
 </div>
 </div>
 <p className="carousel-hint">← Arraste para girar · Toque para selecionar →</p>
 </div>
 </section>

 <section id="segmentos">
 <div className="w">
 <p className="eyebrow">Para quem atuamos</p>
 <h2>Segurança sob medida para o seu segmento</h2>
 <p className="sub2">Cada cliente tem riscos diferentes, e o plano é montado a partir deles.</p>
 <div className="seg">
 <article><h3>Empresas e indústrias</h3><p>Proteção do patrimônio, controle de acesso e rondas para operações de qualquer porte.</p><a href="#contato">Falar com a equipe →</a></article>
 <article><h3>Condomínios</h3><p>Portaria, controle de visitantes e monitoramento para moradores e administração.</p><a href="#contato">Falar com a equipe →</a></article>
 <article><h3>Eventos</h3><p>Equipe dimensionada para o público e para o local, do planejamento ao encerramento.</p><a href="#contato">Falar com a equipe →</a></article>
 </div>
 </div>
 </section>

 <section id="equipe">
 <div className="w split">
 <div style={{flex: 1}}>
 <p className="eyebrow">Nossa equipe</p>
 <h2>Profissionais preparados para cada turno</h2>
 <p className="sub2">Textos de exemplo: ajuste ao que a Soberana realmente oferece.</p>
 <ul className="ck">
 <li>Uniforme e identificação padronizados</li>
 <li>Comunicação por rádio com a central</li>
 <li>Supervisão e relatórios de ocorrência</li>
 </ul>
 <a className="btn" href="#contato">Falar com a equipe</a>
 </div>
 </div>
 </section>

 <section id="institucional" className="alt">
 <div className="w">
 <p className="eyebrow">Institucional</p>
 <h2>Nossa liderança</h2>
 <p className="sub2">Espaço para apresentar quem conduz a Soberana, como em destaque de equipe.</p>
 <div className="team">
 <div className="pp"><div className="av" aria-hidden="true">P</div><h3>[Nome]</h3><p>Presidente</p><a href="#">Conheça a biografia →</a></div>
 <div className="pp"><div className="av" aria-hidden="true">D</div><h3>[Nome]</h3><p>Diretor operacional</p><a href="#">Conheça a biografia →</a></div>
 <div className="pp"><div className="av" aria-hidden="true">A</div><h3>[Nome]</h3><p>Diretor administrativo</p><a href="#">Conheça a biografia →</a></div>
 </div>
 </div>
 </section>

 <section id="noticias">
 <div className="w">
 <p className="eyebrow">Nossa comunidade</p>
 <h2>Notícias e novidades</h2>
 <p className="sub2">Conecte-se com o que acontece na Soberana.</p>
 <div className="news">
 <article className="nw big"><div className="im" aria-hidden="true">Foto da notícia</div><div className="t"><time>[dd de mês de aaaa]</time><h3>[Título da notícia principal]</h3><p>Resumo da notícia em duas linhas.</p><a href="#">Leia mais →</a></div></article>
 <article className="nw"><div className="im" aria-hidden="true">Foto</div><div className="t"><time>[data]</time><h3>[Título da notícia]</h3><p>Resumo curto.</p><a href="#">Leia mais →</a></div></article>
 <article className="nw"><div className="im" aria-hidden="true">Foto</div><div className="t"><time>[data]</time><h3>[Título da notícia]</h3><p>Resumo curto.</p><a href="#">Leia mais →</a></div></article>
 </div>
 </div>
 </section>

 <section className="soc">
 <div className="w">
 <div><p className="eyebrow" style={{color: 'var(--gold)'}}>Ação social</p><h2>Compromisso com a comunidade</h2><p>Apresente aqui as ações sociais da Soberana, que já têm página própria no site atual.</p></div>
 <div><a className="btn" href="#">Conheça nossas ações</a></div>
 </div>
 </section>

 <div className="band" id="contato">
 <div className="w">
 <h2>Faça da Soberana a segurança do seu negócio</h2>
 <p>Conte o que você precisa e receba uma proposta sob medida.</p>
 <div className="cta">
 <a className="btn" href="tel:+556133996013">Ligar: (61) 3399-6013</a>
 <a className="btn o" href="https://wa.me/55SEUNUMERO">Chamar no WhatsApp</a>
 </div>
 </div>
 </div>
 </main>

 <footer>
 <div className="w">
 <div className="fg">
 <div>
 <a className="logo" href="#" aria-label="Soberana">
 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18l1-11-5 4-5-7-5 7-5-4z"/></svg>
 <span><b style={{color: '#fff'}}>SOBERANA</b><small>Segurança e Vigilância</small></span>
 </a>
 <div className="so">
 <a href="https://facebook.com/soberana" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
 <a href="https://instagram.com/soberana" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
 <a href="https://linkedin.com/company/soberana" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
 <a href="https://youtube.com/@soberana" target="_blank" rel="noopener noreferrer" aria-label="YouTube">yt</a>
 </div>
 </div>
 <div><h3>Acesso rápido</h3><ul><li><a href="#servicos">Serviços</a></li><li><a href="#segmentos">Para quem atuamos</a></li><li><a href="#noticias">Notícias</a></li><li><a href="/orcamento">Solicitar orçamento</a></li></ul></div>
 <div><h3>Institucional</h3><ul><li><a href="#">Prêmios e parceiros</a></li><li><a href="#">Ouvidoria</a></li><li><a href="#">Canal de conduta ética</a></li><li><a href="#">Proteção de dados (LGPD)</a></li><li><a href="#" target="_blank" rel="noopener noreferrer">Trabalhe conosco</a></li></ul></div>
 <div><h3>Ache-nos</h3><p>ADE Conj. 20, Lt. 07<br/>Águas Claras – DF<br/>CEP 71989-300<br/>Tel.: <a href="tel:+556133996013">(61) 3399-6013</a></p></div>
 </div>
 <div className="fb">
 <span>© <span id="y">{year}</span> Soberana Segurança e Vigilância. CNPJ: [inserir]</span>
 <span>Desenvolvido por [inserir] · Fotos ilustrativas, apenas para demonstração de layout</span>
 </div>
 </div>
 </footer>

 <a className="wa" href="https://wa.me/55SEUNUMERO" aria-label="Falar no WhatsApp">WhatsApp</a>
 </>
 );
}
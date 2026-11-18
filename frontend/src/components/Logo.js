export default function Logo({ variant = 'default', className = '' }) {
	const isWhite = variant === 'white';
	const fillColor = isWhite ? '#ffffff' : '#ffffff';
	const textColor = isWhite ? '#ffffff' : '#1a2345';

	return (
		<svg
			viewBox="0 0 200 120"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Soberana Segurança e Vigilância"
			role="img"
			style={{ height: '60px', width: 'auto' }}
		>
			{/* Coroa com múltiplos pontos e faixas horizontais */}
			<g transform="translate(60, 5)">
				{/* Pontos da coroa - 7 pontas visíveis */}
				<path
					d="M0 55 L8 20 L16 40 L24 10 L32 35 L40 5 L48 35 L56 10 L64 40 L72 20 L80 55 Z"
					fill={fillColor}
					stroke="none"
				/>
				{/* Faixa horizontal superior */}
				<rect x="5" y="42" width="70" height="4" rx="1" fill={isWhite ? '#0d1330' : '#1a2345'} />
				{/* Faixa horizontal inferior */}
				<rect x="5" y="50" width="70" height="4" rx="1" fill={isWhite ? '#0d1330' : '#1a2345'} />
				{/* Diamantes decorativos entre as faixas */}
				<path d="M20 48 L22 45 L24 48 L22 51 Z" fill={fillColor} />
				<path d="M38 48 L40 45 L42 48 L40 51 Z" fill={fillColor} />
				<path d="M56 48 L58 45 L60 48 L58 51 Z" fill={fillColor} />
			</g>

			{/* Texto Soberana® */}
			<text
				x="100"
				y="85"
				textAnchor="middle"
				fontFamily="'Montserrat', 'Inter', 'Segoe UI', sans-serif"
				fontWeight="700"
				fontSize="24"
				fill={textColor}
				letterSpacing="1"
			>
				Soberana
				<tspan fontSize="10" baselineShift="super">®</tspan>
			</text>

			{/* Subtítulo */}
			<text
				x="100"
				y="105"
				textAnchor="middle"
				fontFamily="'Montserrat', 'Inter', 'Segoe UI', sans-serif"
				fontWeight="400"
				fontSize="9"
				fill={isWhite ? 'rgba(255,255,255,0.9)' : '#5a6a9a'}
				letterSpacing="1.5"
			>
				Segurança e Vigilância LTDA
			</text>
		</svg>
	);
}
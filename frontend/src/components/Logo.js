export default function Logo({ variant = 'default', className = '' }) {
	const isLight = variant === 'light';
	const textColor = isLight ? '#1B2341' : '#ffffff';
	const subtitleColor = isLight ? 'rgba(27, 35, 65, 0.7)' : 'rgba(255,255,255,0.8)';
	const crownColor = '#FFD215';

	return (
		<svg
			viewBox="0 0 320 50"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Soberana Segurança e Vigilância"
			role="img"
			style={{ height: 'clamp(2.5rem, 5vw, 3.5rem)', width: 'auto' }}
		>
			{/* Coroa — Modelo 1 Clássico Horizontal */}
			<g transform="translate(0,3)">
				<path d="M2 38 L7 14 L13 28 L19 4 L25 28 L31 8 L37 28 L43 14 L48 38 Z" fill={crownColor} />
				<rect x="4" y="36" width="42" height="3.5" rx="1" fill={crownColor} />
				<rect x="4" y="41" width="42" height="2.5" rx="1" fill={crownColor} opacity="0.6" />
			</g>

			{/* SOBERANA */}
			<text
				x="58"
				y="27"
				fontFamily="'Montserrat', sans-serif"
				fontWeight="800"
				fontSize="22"
				fill={textColor}
				letterSpacing="2.5"
			>
				SOBERANA
			</text>

			{/* SEGURANÇA E VIGILÂNCIA */}
			<text
				x="58"
				y="43"
				fontFamily="'Montserrat', sans-serif"
				fontWeight="400"
				fontSize="9"
				fill={subtitleColor}
				letterSpacing="2"
			>
				SEGURANÇA E VIGILÂNCIA
			</text>
		</svg>
	);
}
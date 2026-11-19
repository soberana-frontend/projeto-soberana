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
			style={{ height: '48px', width: 'auto' }}
		>
			{/* Coroa amarela com 3 picos */}
			<g transform="translate(5, 3)">
				<path
					d="M2 42 L6 18 L11 32 L16 8 L21 28 L26 4 L31 28 L36 8 L41 32 L46 18 L50 42 Z"
					fill={crownColor}
				/>
				<rect x="4" y="40" width="44" height="3.5" rx="1" fill={crownColor} />
				<rect x="4" y="45" width="44" height="2.5" rx="1" fill={crownColor} opacity="0.6" />
			</g>

			{/* SOBERANA */}
			<text
				x="68"
				y="30"
				fontFamily="'Montserrat', 'Inter', sans-serif"
				fontWeight="800"
				fontSize="24"
				fill={textColor}
				letterSpacing="3"
			>
				SOBERANA
			</text>

			{/* SEGURANÇA E VIGILÂNCIA */}
			<text
				x="68"
				y="47"
				fontFamily="'Montserrat', 'Inter', sans-serif"
				fontWeight="400"
				fontSize="10"
				fill={subtitleColor}
				letterSpacing="2.5"
			>
				SEGURANÇA E VIGILÂNCIA
			</text>
		</svg>
	);
}
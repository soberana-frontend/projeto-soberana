export default function Logo({ className = '' }) {
	return (
		<svg
			viewBox="0 0 300 50"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Soberana Segurança e Vigilância"
			role="img"
			style={{ height: '46px', width: 'auto' }}
		>
			{/* Coroa amarela */}
			<g transform="translate(0, 3)">
				<path
					d="M2 38 L7 14 L13 28 L19 4 L25 28 L31 8 L37 28 L43 14 L48 38 Z"
					fill="#FFD215"
				/>
				<rect x="4" y="36" width="42" height="3.5" rx="1" fill="#FFD215" />
				<rect x="4" y="41" width="42" height="2.5" rx="1" fill="#FFD215" opacity="0.6" />
			</g>

			{/* SOBERANA */}
			<text
				x="58"
				y="27"
				fontFamily="'Montserrat', 'Inter', sans-serif"
				fontWeight="800"
				fontSize="22"
				fill="#ffffff"
				letterSpacing="2.5"
			>
				SOBERANA
			</text>

			{/* SEGURANÇA E VIGILÂNCIA */}
			<text
				x="58"
				y="43"
				fontFamily="'Montserrat', 'Inter', sans-serif"
				fontWeight="400"
				fontSize="9"
				fill="rgba(255,255,255,0.8)"
				letterSpacing="2"
			>
				SEGURANÇA E VIGILÂNCIA
			</text>
		</svg>
	);
}
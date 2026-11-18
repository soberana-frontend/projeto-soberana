export default function Logo({ variant = 'default', className = '' }) {
	const isWhite = variant === 'white';
	const primaryColor = isWhite ? '#ffffff' : '#2b3a91';
	const accentColor = isWhite ? '#ffffff' : '#ffcb05';

	return (
		<svg
			viewBox="0 0 280 60"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Soberana Segurança e Vigilância"
			role="img"
			style={{ height: '48px', width: 'auto' }}
		>
			{/* Coroa modernizada */}
			<g transform="translate(4, 6)">
				<path
					d="M6 38 L10 14 L18 26 L26 6 L34 26 L42 14 L46 38 Z"
					fill={accentColor}
					stroke={primaryColor}
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
				{/* Diamantes decorativos na base da coroa */}
				<path d="M16 30 L18 27 L20 30 L18 33 Z" fill={primaryColor} opacity="0.8" />
				<path d="M24 30 L26 27 L28 30 L26 33 Z" fill={primaryColor} opacity="0.8" />
				<path d="M32 30 L34 27 L36 30 L34 33 Z" fill={primaryColor} opacity="0.8" />
				{/* Linha horizontal da base */}
				<rect x="8" y="36" width="36" height="3" rx="1" fill={primaryColor} />
			</g>

			{/* Texto SOBERANA */}
			<text
				x="60"
				y="32"
				fontFamily="'Montserrat', 'Inter', 'Segoe UI', sans-serif"
				fontWeight="800"
				fontSize="28"
				fill={primaryColor}
				letterSpacing="2"
			>
				SOBERANA
			</text>

			{/* Símbolo ® */}
			<text
				x="232"
				y="18"
				fontFamily="'Montserrat', 'Inter', 'Segoe UI', sans-serif"
				fontWeight="400"
				fontSize="9"
				fill={primaryColor}
			>
				®
			</text>

			{/* Subtítulo */}
			<text
				x="60"
				y="48"
				fontFamily="'Montserrat', 'Inter', 'Segoe UI', sans-serif"
				fontWeight="400"
				fontSize="11"
				fill={isWhite ? 'rgba(255,255,255,0.85)' : '#5a6a9a'}
				letterSpacing="3"
			>
				SEGURANÇA E VIGILÂNCIA LTDA
			</text>
		</svg>
	);
}
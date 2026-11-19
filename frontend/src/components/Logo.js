import soberanaLogo from '@/assets/logos/soberana-logo.svg';

export default function Logo({ variant = 'default', className = '' }) {
	const isLight = variant === 'light';
	const textColor = isLight ? '#1B2341' : '#ffffff';

	return (
		<img
			src={soberanaLogo.src || soberanaLogo}
			alt="Soberana Segurança e Vigilância"
			className={className}
			style={{
				height: 'clamp(2.5rem, 5vw, 3.5rem)',
				width: 'auto',
				color: textColor,
			}}
		/>
	);
}
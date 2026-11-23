import soberanaLogo from '@/assets/logos/soberana-logo.svg';

interface LogoProps {
	variant?: 'default' | 'light' | 'white';
	className?: string;
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
	return (
		<img
			src={soberanaLogo.src || soberanaLogo}
			alt="Soberana Segurança e Vigilância"
			className={className}
			style={{
				height: 'clamp(3rem, 6vw, 4.5rem)',
				width: 'auto',
			}}
		/>
	);
}
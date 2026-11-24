import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700', '900'],
	display: 'swap',
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: 'Soberana Segurança e Vigilância – Águas Claras, DF',
	description:
		'Vigilância e segurança patrimonial no Distrito Federal. Conheça os serviços da Soberana e solicite um orçamento.',
};

const themeScript = `
(function(){
  try{
    var t=localStorage.getItem('soberana-theme');
    if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
    document.documentElement.setAttribute('data-theme',t);
  }catch(e){document.documentElement.setAttribute('data-theme','light');}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR" suppressHydrationWarning className={roboto.variable}>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>{children}</body>
		</html>
	);
}
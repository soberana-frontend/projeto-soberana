import "./globals.css?v=2";

export const metadata = {
  title: "Soberana Segurança e Vigilância – Águas Claras, DF",
  description: "Vigilância e segurança patrimonial no Distrito Federal. Conheça os serviços da Soberana e solicite um orçamento.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
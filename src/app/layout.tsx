import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'P.I.T.E.R - Procurador de Investimentos em Tecnologias na Educação Regional',
  description: 'Procurador de Investimentos em Tecnologias na Educação Regional. Monitoramento de tecnologias educacionais em diários oficiais municipais de Goiânia/GO.',
  keywords: 'tecnologias educacionais, diários oficiais, transparência, Goiânia, educação, dados públicos, infraestrutura tecnológica, P.I.T.E.R',
  authors: [{ name: 'Equipe UnB-MDS' }],
  openGraph: {
    title: 'P.I.T.E.R - Procurador de Investimentos em Tecnologias na Educação Regional',
    description: 'Plataforma de monitoramento de tecnologias educacionais em diários oficiais',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P.I.T.E.R - Procurador de Investimentos em Tecnologias na Educação Regional',
    description: 'Monitoramento de tecnologias educacionais em diários oficiais',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
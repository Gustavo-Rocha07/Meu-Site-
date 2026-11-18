import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import { NOME, SITE_URL } from '@/lib/contato';
import { metadataPagina, schemaClinica } from '@/lib/seo';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const padrao = metadataPagina({
  title: 'Dentista em Suzano | Dra. Michele Herreira Odontologia',
  description:
    'Implantes, carga imediata, estética do sorriso e odontopediatria em Suzano, com mais de 25 anos de experiência. Agende sua avaliação.',
  path: '/',
  absoluto: true,
});

// URL fixa de produção: antes vinha de NEXT_PUBLIC_SITE_URL com fallback para
// localhost, e como a variável não estava definida na Vercel o canonical e o
// og:url saíam como http://localhost:3000.
// O canonical NÃO fica aqui: se ficasse, toda página que esquecesse de definir o
// seu herdaria o da home. Cada página define o próprio via metadataPagina().
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dentista em Suzano | Dra. Michele Herreira Odontologia',
    template: `%s | ${NOME}`,
  },
  description: padrao.description,
  openGraph: padrao.openGraph,
  twitter: padrao.twitter,
  authors: [{ name: NOME }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FAF9F6',
  colorScheme: 'light',
};

/** Tag do Google criada no painel do Google (contêiner "Todas as tags"). */
const GOOGLE_TAG_ID = 'GTM-K6FRHJCM';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <JsonLd dados={schemaClinica} />
        {/* Tag do Google (medição de visitas e conversões).
            O dataLayer nasce cedo (script minúsculo), então eventos de conversão disparados
            antes do GTM carregar ficam na fila e são processados quando ele chega.
            O GTM em si (≈170 KB de JS) carrega com lazyOnload: depois que a página terminou de
            carregar, sem disputar o processador do celular com a primeira renderização. */}
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import {
  CIDADES_ATENDIDAS,
  CRO,
  EMAIL,
  INSTAGRAM,
  NOME,
  NOME_CLINICA,
  SITE_URL,
  TELEFONE,
  UNIDADES,
  type Unidade,
} from './contato';

export const OG_IMAGEM = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Dra. Michele Herreira — Odontologia em Suzano',
};

type MetaPagina = {
  /** Sem o sufixo "| Dra. Michele Herreira" — o template do layout acrescenta. */
  title: string;
  description: string;
  path: string;
  /** Title completo, sem passar pelo template (home e /sobre). */
  absoluto?: boolean;
  tipo?: 'website' | 'article';
};

/**
 * Metadata de cada página: canonical absoluto (via metadataBase) e Open Graph
 * com a imagem 1200x630. Repetir os campos do OG aqui é necessário porque o
 * Next substitui o objeto `openGraph` do layout inteiro, não campo a campo.
 */
export function metadataPagina({ title, description, path, absoluto, tipo = 'website' }: MetaPagina): Metadata {
  const tituloCompleto = absoluto ? title : `${title} | ${NOME}`;
  return {
    title: absoluto ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: tipo,
      locale: 'pt_BR',
      siteName: NOME,
      url: path,
      title: tituloCompleto,
      description,
      images: [OG_IMAGEM],
    },
    twitter: {
      card: 'summary_large_image',
      title: tituloCompleto,
      description,
      images: [OG_IMAGEM.url],
    },
  };
}

/** @id da unidade principal (Suzano) — é a que artigos e /sobre referenciam. */
export const ID_CLINICA = `${SITE_URL}/#clinica`;
export const ID_DOUTORA = `${SITE_URL}/sobre#dra-michele`;

const idUnidade = (u: Unidade, i: number) => (i === 0 ? ID_CLINICA : `${SITE_URL}/#clinica-${u.id}`);

/** Um Dentist por endereço, como o Google recomenda para negócios com mais de um local. */
export const schemaClinica = UNIDADES.map((u, i) => ({
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  '@id': idUnidade(u, i),
  name: `${NOME_CLINICA} — Unidade ${u.cidade}`,
  description: `Consultório odontológico em ${u.cidade} com implantes, carga imediata, prótese, estética do sorriso, cirurgia e odontopediatria.`,
  url: SITE_URL,
  image: [`${SITE_URL}/og-image.png`, `${SITE_URL}/img/img-dra.jpeg`],
  logo: `${SITE_URL}/icon.png`,
  telephone: TELEFONE,
  email: EMAIL,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: u.complemento ? `${u.rua}, ${u.complemento}` : u.rua,
    addressLocality: u.cidade,
    addressRegion: u.uf,
    postalCode: u.cep,
    addressCountry: 'BR',
  },
  ...(u.geo && {
    geo: { '@type': 'GeoCoordinates', latitude: u.geo.lat, longitude: u.geo.lng },
  }),
  hasMap: u.mapsRota,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: CIDADES_ATENDIDAS.map((c) => ({ '@type': 'City', name: `${c}, SP` })),
  sameAs: [INSTAGRAM],
  employee: { '@id': ID_DOUTORA },
}));

export const schemaDoutora = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': ID_DOUTORA,
  name: NOME,
  jobTitle: 'Cirurgiã-dentista',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CRO-SP',
    value: '71275',
    name: CRO,
  },
  image: `${SITE_URL}/img/img-dra.jpeg`,
  url: `${SITE_URL}/sobre`,
  worksFor: UNIDADES.map((u, i) => ({ '@id': idUnidade(u, i) })),
  knowsAbout: ['Implantodontia', 'Reabilitação oral', 'Prótese dentária', 'Odontopediatria'],
  sameAs: [INSTAGRAM],
};

export type Migalha = { nome: string; path: string };

export function schemaBreadcrumb(migalhas: Migalha[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: migalhas.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nome,
      item: `${SITE_URL}${m.path === '/' ? '' : m.path}`,
    })),
  };
}

export type Pergunta = { pergunta: string; resposta: string };

export function schemaFaq(perguntas: Pergunta[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta },
    })),
  };
}

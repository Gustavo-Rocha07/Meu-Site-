import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Breadcrumb from '@/components/Breadcrumb';
import Secoes from '@/components/Secoes';
import CTASection from '@/components/CTASection';
import JsonLd from '@/components/JsonLd';
import Texto from '@/components/Texto';
import { artigoPorSlug, artigos } from '@/content/blog';
import { tratamentoPorSlug } from '@/content/tratamentos';
import { CRO, SITE_URL, waSobreTratamento } from '@/lib/contato';
import { ID_CLINICA, ID_DOUTORA, metadataPagina } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const artigo = artigoPorSlug((await params).slug);
  if (!artigo) return {};
  return metadataPagina({
    title: artigo.tituloSeo,
    description: artigo.description,
    path: `/blog/${artigo.slug}`,
    absoluto: true,
    tipo: 'article',
  });
}

function dataPorExtenso(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ArtigoPage({ params }: Params) {
  const artigo = artigoPorSlug((await params).slug);
  if (!artigo) notFound();
  const tratamento = tratamentoPorSlug(artigo.tratamento);
  const url = `${SITE_URL}/blog/${artigo.slug}`;

  const schemaArtigo = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: artigo.titulo,
    description: artigo.description,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}${artigo.imagem.src}`,
    datePublished: artigo.publicadoEm,
    dateModified: artigo.atualizadoEm,
    inLanguage: 'pt-BR',
    author: { '@type': 'Person', '@id': ID_DOUTORA, name: 'Dra. Michele Herreira', url: `${SITE_URL}/sobre` },
    publisher: { '@id': ID_CLINICA },
    about: { '@type': 'MedicalProcedure', name: tratamento.nome, url: `${SITE_URL}/${tratamento.slug}` },
  };

  return (
    <PageShell>
      <header className="relative overflow-hidden bg-cream">
        <div className="container-main relative grid grid-cols-1 items-center gap-12 pb-14 pt-28
                        lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pt-32">
          <div>
            <Breadcrumb
              migalhas={[
                { nome: 'Início', path: '/' },
                { nome: 'Blog', path: '/blog' },
                { nome: artigo.titulo, path: `/blog/${artigo.slug}` },
              ]}
            />
            <span className="section-badge mt-8">Blog &middot; {tratamento.nome}</span>
            <h1
              className="section-heading mt-5 text-balance"
              style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.5rem)' }}
            >
              {artigo.titulo}
            </h1>
            <p className="mt-6 text-sm text-muted">
              Por{' '}
              <Link href="/sobre" className="text-dark underline-offset-4 hover:underline">
                Dra. Michele Herreira
              </Link>{' '}
              ({CRO}) &middot; <time dateTime={artigo.publicadoEm}>{dataPorExtenso(artigo.publicadoEm)}</time>
            </p>
          </div>
          <div className="relative mx-auto hidden w-full max-w-[300px] lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-dark/5 shadow-xl">
              <Image
                src={artigo.imagem.src}
                alt={artigo.imagem.alt}
                width={artigo.imagem.width}
                height={artigo.imagem.height}
                preload
                sizes="300px"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="section-py bg-white">
        <div className="container-main">
          <article className="mx-auto max-w-2xl">
            {artigo.intro.map((p, i) => (
              <p key={i} className="mb-5 text-[18px] leading-relaxed text-charcoal">
                <Texto>{p}</Texto>
              </p>
            ))}
            <div className="mt-12">
              <Secoes secoes={artigo.secoes} />
            </div>

            <p className="mt-14 border-l-2 border-gold/50 pl-5 text-sm leading-relaxed text-muted">
              Conteúdo educativo, que não substitui a consulta. Cada caso tem particularidades e o
              resultado de qualquer tratamento varia de pessoa para pessoa. Responsável técnica:
              Dra. Michele Herreira, {CRO}.
            </p>

            <Link
              href={`/${tratamento.slug}`}
              className="group mt-10 flex items-center justify-between gap-6 rounded-xl border
                         border-border bg-cream p-6 transition-colors hover:border-gold/60"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                  Tratamento relacionado
                </span>
                <span className="mt-1 block font-cormorant text-2xl text-dark">
                  {tratamento.nome} em Suzano
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-gold-dark transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </article>
        </div>
      </section>

      <CTASection
        titulo="Ficou com alguma dúvida?"
        texto={`Na avaliação, a Dra. Michele examina o seu caso e explica as opções de ${tratamento.nome.toLowerCase()} com prazo e valor. Você decide depois, sem compromisso.`}
        whatsapp={waSobreTratamento(tratamento.mensagem)}
      />

      <JsonLd dados={schemaArtigo} />
    </PageShell>
  );
}

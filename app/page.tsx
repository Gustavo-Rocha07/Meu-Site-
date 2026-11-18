import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Hero from '@/components/Hero';
import Results from '@/components/Results';
import Services from '@/components/Services';
import Odontopediatria from '@/components/Odontopediatria';
import Differentials from '@/components/Differentials';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Unidades from '@/components/Unidades';
import CTASection from '@/components/CTASection';
import InstagramCTA from '@/components/InstagramCTA';
import { artigos } from '@/content/blog';
import { metadataPagina } from '@/lib/seo';

export const metadata = metadataPagina({
  title: 'Dentista em Suzano | Dra. Michele Herreira Odontologia',
  description:
    'Implantes, carga imediata, estética do sorriso e odontopediatria em Suzano, com mais de 25 anos de experiência. Agende sua avaliação.',
  path: '/',
  absoluto: true,
});

// <Testimonials /> saiu da home: o próprio componente avisa que a origem dos
// depoimentos não foi confirmada, e o CFO só admite depoimentos reais e
// autorizados. Volta quando houver depoimentos verificáveis (ex.: Google).
export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Results />
      <Services />
      <Odontopediatria />
      <Differentials />
      <Gallery />
      <About />
      <Unidades />

      <section className="section-py bg-cream">
        <div className="container-main">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="section-badge mb-5">Blog</span>
              <h2 className="section-heading text-4xl lg:text-5xl">Dúvidas frequentes, respondidas</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-gold-dark hover:text-gold-deep">
              Ver todos os artigos
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {artigos.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-xl border
                             border-border bg-surface p-6 transition-colors hover:border-gold/60"
                >
                  <span>
                    <span className="block font-cormorant text-2xl leading-snug text-dark">{a.titulo}</span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-muted">{a.resumo}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark">
                    Ler artigo
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:-translate-y-0.5
                                 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InstagramCTA />

      <CTASection />
    </PageShell>
  );
}

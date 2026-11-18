import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { artigos } from '@/content/blog';
import { tratamentoPorSlug } from '@/content/tratamentos';
import { metadataPagina } from '@/lib/seo';

export const metadata = metadataPagina({
  title: 'Blog de Saúde Bucal em Suzano',
  description:
    'Respostas da Dra. Michele Herreira, dentista em Suzano, sobre implante, carga imediata, lentes, clareamento e odontopediatria. Agende sua avaliação.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <PageShell>
      <header className="bg-cream">
        <div className="container-main pb-14 pt-28 lg:pt-32">
          <Breadcrumb
            migalhas={[
              { nome: 'Início', path: '/' },
              { nome: 'Blog', path: '/blog' },
            ]}
          />
          <span className="section-badge mt-8">Blog</span>
          <h1
            className="section-heading mt-5 max-w-3xl text-balance"
            style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.9rem)' }}
          >
            Blog de saúde bucal da Dra. Michele Herreira
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            Respostas diretas às dúvidas que mais aparecem no consultório em Suzano, escritas
            para ajudar você a chegar à consulta já sabendo o que perguntar.
          </p>
        </div>
      </header>

      <section className="section-py bg-white">
        <div className="container-main">
          <ul className="border-t border-border">
            {artigos.map((a) => (
              <li key={a.slug} className="border-b border-border">
                <Link
                  href={`/blog/${a.slug}`}
                  className="group grid grid-cols-1 gap-x-10 gap-y-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto]"
                >
                  <h2 className="font-cormorant text-2xl leading-snug text-dark group-hover:text-gold-deep">
                    {a.titulo}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {a.resumo}
                    <span className="mt-2 block text-xs uppercase tracking-wider text-muted/80">
                      {tratamentoPorSlug(a.tratamento).nome}
                    </span>
                  </p>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-gold-dark transition-transform duration-200
                               group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { tratamentos } from '@/content/tratamentos';

/**
 * Hub de tratamentos da home: o resumo de cada um com link para a página dele.
 * Os textos vêm de content/tratamentos (o mesmo `resumo` usado nos cards de
 * "relacionados"), então não há duas versões para manter.
 * Server component: a animação de entrada saiu para não carregar JS só por ela.
 */
export default function Services() {
  return (
    <section id="tratamentos" className="section-py bg-cream">
      <div className="container-main">
        <div className="max-w-2xl">
          <span className="section-badge mb-5">Tratamentos</span>
          <h2 className="section-heading text-4xl lg:text-5xl">
            Tratamentos na clínica odontológica em Suzano
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            A indicação depende sempre da avaliação clínica e do exame de imagem.
            Abaixo, o que cada procedimento resolve — e, na página de cada um, como funciona,
            quanto tempo leva e os cuidados depois.
          </p>
        </div>

        <div className="mt-14 border-t border-border">
          {tratamentos.map((t, i) => (
            <article
              key={t.slug}
              className="group relative grid grid-cols-1 items-baseline gap-x-10 gap-y-3 border-b
                         border-border py-8 md:grid-cols-[1.5rem_minmax(0,15rem)_1fr_auto]"
            >
              <span className="font-cormorant text-lg text-gold-dark" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="font-cormorant text-2xl leading-snug text-dark">
                {/* O link cobre a linha inteira (after:inset-0) */}
                <Link
                  href={`/${t.slug}`}
                  className="after:absolute after:inset-0 group-hover:text-gold-deep"
                >
                  {t.nome}
                </Link>
              </h3>

              <p className="max-w-xl text-[15px] leading-relaxed text-muted">{t.resumo}</p>

              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium
                           text-gold-dark transition-colors group-hover:text-gold-deep"
              >
                Saiba mais
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5
                             group-hover:-translate-y-0.5"
                />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

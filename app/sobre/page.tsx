import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import InstagramCTA from '@/components/InstagramCTA';
import JsonLd from '@/components/JsonLd';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { tratamentos } from '@/content/tratamentos';
import { CRO, UNIDADES, WA_AGENDAR } from '@/lib/contato';
import { metadataPagina, schemaDoutora } from '@/lib/seo';

export const metadata = metadataPagina({
  title: 'Sobre a Dra. Michele Herreira | Dentista em Suzano',
  description:
    'Conheça a Dra. Michele Herreira, cirurgiã-dentista (CRO-SP 71275) com mais de 25 anos em implantes e reabilitação oral em Suzano. Agende sua avaliação.',
  path: '/sobre',
  absoluto: true,
});

const dados = [
  { valor: CRO, rotulo: 'Registro profissional' },
  { valor: '25+ anos', rotulo: 'Em implantodontia e reabilitação' },
  { valor: '3 meses a 15 anos', rotulo: 'Faixa do atendimento infantil' },
  { valor: 'Suzano e Ferraz', rotulo: 'Unidades' },
];

export default function SobrePage() {
  return (
    <PageShell>
      <header className="relative overflow-hidden bg-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[-10%] h-[420px] w-[420px]
                     rounded-full bg-gold/10 blur-[120px]"
        />
        <div className="container-main relative grid grid-cols-1 items-center gap-12 pb-16 pt-28
                        lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20 lg:pt-32">
          <div>
            <Breadcrumb
              migalhas={[
                { nome: 'Início', path: '/' },
                { nome: 'A doutora', path: '/sobre' },
              ]}
            />
            <span className="section-badge mt-8">A doutora</span>
            <h1
              className="section-heading mt-5 text-balance"
              style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.9rem)' }}
            >
              Dra. Michele Herreira, dentista em Suzano
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
              Cirurgiã-dentista inscrita no CRO-SP sob o número 71275, com mais de 25 anos de
              atuação em implantodontia e reabilitação oral, e atendimento odontológico infantil
              dos 3 meses aos 15 anos. Atende em {UNIDADES.map((u) => u.cidade).join(' e ')}.
            </p>
            <a
              href={WA_AGENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              <WhatsAppIcon size={17} />
              Agendar avaliação
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-dark/5 shadow-xl">
              <Image
                src="/img/img-dra.jpeg"
                alt="Retrato da Dra. Michele Herreira, cirurgiã-dentista em Suzano"
                width={859}
                height={1280}
                preload
                sizes="(max-width: 428px) calc(100vw - 48px), 380px"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="section-py bg-white">
        <div className="container-main grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="max-w-2xl space-y-14">
            <section>
              <h2 className="section-heading text-3xl lg:text-[2.4rem]">Trajetória</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-charcoal/90">
                A Dra. Michele Herreira dedica a maior parte de mais de duas décadas e meia de
                clínica à reabilitação oral: devolver dentes, mastigação e estética a quem os
                perdeu, com implantes, próteses fixas e removíveis e tratamentos estéticos.
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-charcoal/90">
                Ao lado da reabilitação de adultos, mantém o atendimento infantil, com foco em
                prevenção: acompanhar a criança desde os primeiros meses é a forma mais eficaz de
                evitar que ela precise, no futuro, dos tratamentos mais complexos.
              </p>
            </section>

            <section>
              <h2 className="section-heading text-3xl lg:text-[2.4rem]">Como é o atendimento</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-charcoal/90">
                Cada plano de tratamento é montado a partir do exame clínico e das imagens,
                apresentado ao paciente antes de começar e revisto sempre que o caso pede. Na
                avaliação são explicadas as alternativas possíveis — inclusive
                as mais simples — com prazo e valor por escrito.
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-charcoal/90">
                Nos casos de implante e cirurgia, o planejamento é feito com tomografia. Nos
                tratamentos estéticos, o paciente vê uma simulação do resultado na própria boca
                antes de qualquer desgaste. Os resultados variam de pessoa para pessoa, e isso é
                dito com clareza desde a primeira consulta.
              </p>
            </section>

            <section>
              <h2 className="section-heading text-3xl lg:text-[2.4rem]">Áreas de atuação</h2>
              <ul className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {tratamentos.map((t) => (
                  <li key={t.slug} className="border-b border-border">
                    <Link
                      href={`/${t.slug}`}
                      className="group flex items-center justify-between py-3 text-[15px] text-dark
                                 transition-colors hover:text-gold-deep"
                    >
                      {t.nome}
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="text-gold-dark transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="self-start lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-dark/5">
              <Image
                src="/img/atendendo.jpeg"
                alt="Dra. Michele Herreira durante atendimento no consultório em Suzano"
                width={960}
                height={1280}
                sizes="(max-width: 1024px) calc(100vw - 48px), 340px"
                className="h-full w-full object-cover"
              />
            </div>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {dados.map((d) => (
                <div key={d.rotulo} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-xs uppercase tracking-wider text-muted">{d.rotulo}</dt>
                  <dd className="text-right font-cormorant text-lg text-dark">{d.valor}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <InstagramCTA fundo="creme" />

      <CTASection />
      <JsonLd dados={schemaDoutora} />
    </PageShell>
  );
}

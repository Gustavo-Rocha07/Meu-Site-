import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock, MapPin } from 'lucide-react';
import PageShell from '../PageShell';
import Breadcrumb from '../Breadcrumb';
import Secoes from '../Secoes';
import Faq from '../Faq';
import Comparador from '../Comparador';
import CTASection from '../CTASection';
import JsonLd from '../JsonLd';
import Texto, { textoPuro } from '../Texto';
import WhatsAppIcon from '../WhatsAppIcon';
import { casos, casosMontados, type Caso, type CasoMontado } from '@/lib/casos';
import { CRO, HORARIO, SITE_URL, UNIDADES, waAvaliacaoTratamento } from '@/lib/contato';
import { metadataPagina } from '@/lib/seo';
import { tratamentoPorSlug } from '@/content/tratamentos';
import { artigoPorSlug } from '@/content/blog';
import type { Tratamento } from '@/content/tipos';

const CIDADE_PRINCIPAL = 'Suzano';

export function metadataTratamento(t: Tratamento) {
  return metadataPagina({
    title: t.tituloSeo ?? `${t.nomeTitle} em ${CIDADE_PRINCIPAL}`,
    description: t.description,
    path: `/${t.slug}`,
    absoluto: Boolean(t.tituloSeo),
  });
}

/** A imagem que abre a página: a do caso em destaque ou, sem caso, a foto do topo. */
function imagemPrincipal(t: Tratamento) {
  const comparador = casos.find((c) => c.id === t.destaque);
  if (comparador) return comparador.depois;
  return casosMontados.find((c) => c.id === t.destaque)?.src ?? t.imagem.src;
}

function schemaProcedimento(t: Tratamento) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: t.nome,
    url: `${SITE_URL}/${t.slug}`,
    description: textoPuro(t.intro[0]),
    ...(t.procedimento.naoInvasivo && { procedureType: 'https://schema.org/NoninvasiveProcedure' }),
    bodyLocation: 'Boca e dentes',
    howPerformed: t.procedimento.comoE,
    followup: t.procedimento.acompanhamento,
    relevantSpecialty: 'https://schema.org/Dentistry',
    image: `${SITE_URL}${imagemPrincipal(t)}`,
  };
}

const AVISO_CASO = 'Caso real, publicado com autorização. O resultado varia de pessoa para pessoa.';

/**
 * Primeira imagem da página: o antes/depois do tratamento quando existe caso
 * publicado (é o que o paciente quer ver primeiro); senão, a foto da clínica.
 * É o LCP da página, por isso pré-carrega.
 */
function FotoDoTopo({
  t,
  comparador,
  montado,
}: {
  t: Tratamento;
  comparador?: Caso;
  montado?: CasoMontado;
}) {
  if (comparador) {
    return (
      <div className="mx-auto w-full max-w-[520px]">
        <Comparador
          caso={comparador}
          preload
          sizes="(max-width: 568px) calc(100vw - 48px), 520px"
        />
        <p className="mt-2 text-xs text-muted">{AVISO_CASO}</p>
      </div>
    );
  }

  if (montado) {
    const retrato = montado.height > montado.width;
    return (
      <figure className={`mx-auto w-full ${retrato ? 'max-w-[340px]' : 'max-w-[460px]'}`}>
        <div className="overflow-hidden rounded-[1.25rem] bg-dark/5 shadow-xl ring-1 ring-dark/10">
          <Image
            src={montado.src}
            alt={montado.alt}
            width={montado.width}
            height={montado.height}
            preload
            sizes={`(max-width: ${retrato ? 388 : 508}px) calc(100vw - 48px), ${retrato ? 340 : 460}px`}
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3">
          <span className="block font-cormorant text-xl text-dark">Antes e depois</span>
          <span className="mt-0.5 block text-xs text-muted">{AVISO_CASO}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-dark/5 shadow-xl">
        <Image
          src={t.imagem.src}
          alt={t.imagem.alt}
          width={t.imagem.width}
          height={t.imagem.height}
          preload
          sizes="(max-width: 408px) calc(100vw - 48px), 360px"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * Molde comum das páginas de tratamento. Todo o texto vem de content/tratamentos;
 * aqui só fica a estrutura: H1 + antes/depois em destaque (quando há caso
 * publicado) + intro, corpo em H2, outros casos, FAQ, links relacionados e CTA
 * com mensagem pronta.
 */
export default function PaginaTratamento({ t }: { t: Tratamento }) {
  const whatsapp = waAvaliacaoTratamento(t.mensagem);
  const destaqueComparador = casos.find((c) => c.id === t.destaque);
  const destaqueMontado = casosMontados.find((c) => c.id === t.destaque);
  // O caso do topo não se repete na seção "Antes e depois" mais abaixo.
  const comparadores = casos.filter((c) => t.casos?.includes(c.id) && c.id !== t.destaque);
  const montados = casosMontados.filter((c) => t.casosMontados?.includes(c.id) && c.id !== t.destaque);
  const relacionados = t.relacionados.map(tratamentoPorSlug);
  const artigo = t.artigo ? artigoPorSlug(t.artigo) : null;

  return (
    <PageShell>
      {/* Topo */}
      <header className="relative overflow-hidden bg-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[-10%] h-[420px] w-[420px]
                     rounded-full bg-gold/10 blur-[120px]"
        />
        {/* Grade com três áreas: no celular a ordem é título → foto → texto (a foto
            aparece logo de cara); no desktop a foto ocupa a coluna da direita. */}
        <div className="container-main relative grid grid-cols-1 gap-x-16 pb-16 pt-28
                        lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-[auto_1fr] lg:pb-20 lg:pt-32">
          <div className="lg:col-start-1 lg:row-start-1">
            <Breadcrumb
              migalhas={[
                { nome: 'Início', path: '/' },
                { nome: t.nome, path: `/${t.slug}` },
              ]}
            />
            <span className="section-badge mt-8">Tratamento em {CIDADE_PRINCIPAL}</span>
            <h1
              className="section-heading mt-5 text-balance"
              style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.9rem)' }}
            >
              {t.nome} em {CIDADE_PRINCIPAL}
            </h1>
          </div>

          <div className="mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center">
            <FotoDoTopo t={t} comparador={destaqueComparador} montado={destaqueMontado} />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            {t.intro.map((p, i) => (
              <p key={i} className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
                <Texto>{p}</Texto>
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary group">
                <WhatsAppIcon size={17} />
                Agendar avaliação
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a href="#perguntas" className="btn-outline">
                Perguntas frequentes
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">Plano com prazo e valor antes de começar &middot; {CRO}</p>
          </div>
        </div>
      </header>

      {/* Corpo */}
      <section className="section-py bg-white">
        <div className="container-main grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="max-w-2xl">
            <Secoes secoes={t.secoes} />

            <p className="mt-14 border-l-2 border-gold/50 pl-5 text-sm leading-relaxed text-muted">
              As informações desta página são educativas e não substituem a consulta. A
              indicação, o prazo e o resultado de cada tratamento variam de pessoa para pessoa
              e só são definidos após avaliação clínica. Responsável técnica: Dra. Michele
              Herreira, {CRO}.
            </p>
          </article>

          <aside className="self-start lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border bg-cream p-6">
              <p className="font-cormorant text-2xl leading-snug text-dark">
                Avaliação para {t.nome.toLowerCase()}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Exame clínico, explicação das opções e plano com prazo e valor. Sem compromisso de
                fechar o tratamento.
              </p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full"
              >
                <WhatsAppIcon size={16} />
                Chamar no WhatsApp
              </a>
              <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm text-muted">
                <li className="flex items-start gap-2.5">
                  <BadgeCheck size={15} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                  Plano com prazo e valor por escrito
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock size={15} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                  {HORARIO}
                </li>
                {UNIDADES.map((u) => (
                  <li key={u.id} className="flex items-start gap-2.5">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                    <span>
                      <span className="block text-dark">Unidade {u.cidade}</span>
                      {u.linha}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Antes e depois */}
      {(comparadores.length > 0 || montados.length > 0) && (
        <section className="bg-white pb-20 lg:pb-28">
          <div className="container-main">
            <div className="max-w-2xl">
              <span className="section-badge mb-5">Casos clínicos</span>
              <h2 className="section-heading text-4xl lg:text-5xl">
                {t.destaque ? 'Outros casos de' : 'Antes e depois de'} {t.nome.toLowerCase()}
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {comparadores.map((c) => (
                <Comparador key={c.id} caso={c} />
              ))}
              {montados.map((c) => (
                <figure key={c.id}>
                  {/* Proporção original da foto, sem recorte: aqui o caso é o assunto da página. */}
                  <div className="overflow-hidden rounded-xl bg-dark/5 ring-1 ring-dark/10">
                    <Image
                      src={c.src}
                      alt={c.alt}
                      width={c.width}
                      height={c.height}
                      sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 56px), 340px"
                      className="h-auto w-full"
                    />
                  </div>
                </figure>
              ))}
            </div>
            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted">
              Imagens de pacientes reais, publicadas com autorização. Cada caso é único: o
              resultado depende das condições clínicas iniciais, do plano de tratamento escolhido
              e da resposta de cada organismo.
            </p>
          </div>
        </section>
      )}

      <Faq perguntas={t.faq} titulo={`Dúvidas sobre ${t.nome.toLowerCase()}`} />

      {/* Relacionados */}
      <section className="section-py bg-white">
        <div className="container-main">
          <div className="max-w-2xl">
            <span className="section-badge mb-5">Veja também</span>
            <h2 className="section-heading text-4xl lg:text-5xl">Tratamentos relacionados</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="group flex flex-col justify-between gap-6 rounded-xl border border-border
                           bg-cream p-6 transition-colors hover:border-gold/60"
              >
                <div>
                  <h3 className="font-cormorant text-2xl text-dark">
                    {r.nome} em {CIDADE_PRINCIPAL}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.resumo}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark">
                  Saiba mais
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5
                               group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 text-[15px] text-muted sm:flex-row sm:gap-8">
            {artigo && (
              <Link href={`/blog/${artigo.slug}`} className="text-gold-dark underline-offset-4 hover:underline">
                Leia no blog: {artigo.titulo}
              </Link>
            )}
            <Link href="/contato" className="text-gold-dark underline-offset-4 hover:underline">
              Endereço, horários e como chegar
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        titulo={`Avaliação de ${t.nome.toLowerCase()} em ${CIDADE_PRINCIPAL}`}
        texto="Na consulta, o caso é examinado, as dúvidas são respondidas e as opções são apresentadas com prazo e valor. Você decide depois, sem compromisso de fechar o tratamento."
        whatsapp={whatsapp}
      />

      <JsonLd dados={schemaProcedimento(t)} />
    </PageShell>
  );
}

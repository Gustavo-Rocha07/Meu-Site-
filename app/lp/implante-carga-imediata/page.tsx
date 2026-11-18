import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock,
  MapPin,
  Navigation,
  Play,
  ScanLine,
  ShieldCheck,
  Smile,
  Stethoscope,
  Sunrise,
  Utensils,
} from 'lucide-react';
import Comparador from '@/components/Comparador';
import Faq from '@/components/Faq';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import LinkWhatsApp from '@/components/lp/LinkWhatsApp';
import FormularioAvaliacao from '@/components/lp/FormularioAvaliacao';
import VideoDepoimento from '@/components/lp/VideoDepoimento';
import BarraFixaCelular from '@/components/lp/BarraFixaCelular';
import { casos, casosMontados } from '@/lib/casos';
import { CRO, HORARIO, NOME_CLINICA, TELEFONE, TELEFONE_EXIBICAO, UNIDADES } from '@/lib/contato';
import { OG_IMAGEM } from '@/lib/seo';
import { cargaImediata } from '@/content/tratamentos/carga-imediata';

/**
 * Landing page do Google Ads para implante com carga imediata.
 *
 * - noindex: é a porta de entrada dos anúncios; no Google orgânico quem responde
 *   é /carga-imediata, e as duas não devem competir.
 * - sem o menu do site: cada link de saída é um lead a menos.
 * - todos os botões de WhatsApp e o formulário registram conversão no dataLayer
 *   (lib/conversao.ts), para o Tag Manager repassar ao Google Ads.
 * - regras do CFO: sem preço, sem promessa de resultado, casos reais autorizados,
 *   responsável técnica e CRO visíveis.
 */
export const metadata: Metadata = {
  title: { absolute: 'Implante Carga Imediata em Suzano | Dra. Michele Herreira' },
  description:
    'Implante com carga imediata em Suzano e Ferraz: em casos indicados, dentes provisórios fixos no mesmo dia da cirurgia. Agende sua avaliação.',
  alternates: { canonical: '/lp/implante-carga-imediata' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/lp/implante-carga-imediata',
    title: 'Implante com carga imediata em Suzano | Dra. Michele Herreira',
    description: 'Em casos indicados, dentes provisórios fixos no mesmo dia da cirurgia. Agende sua avaliação.',
    images: [OG_IMAGEM],
  },
};

/** Âncora do formulário: todos os botões de avaliação levam ao começo dele. */
const ALVO_FORMULARIO = 'formulario';

const MENSAGEM_WHATSAPP =
  'Olá! Vim pelo anúncio do Google e quero agendar uma avaliação para implante com carga imediata.';
const WHATSAPP = `https://wa.me/${TELEFONE.replace('+', '')}?text=${encodeURIComponent(MENSAGEM_WHATSAPP)}`;

// Antes/depois de carga imediata do Sr. Cícero (o mesmo paciente do vídeo de relato).
const casoCargaImediata = casosMontados.find((c) => c.id === 'carga-imediata-1')!;
const comparadores = casos.filter((c) => c.id === 'caso-2' || c.id === 'caso-3');

const confianca = [
  { icone: BadgeCheck, valor: '25+ anos', rotulo: 'em implantodontia e reabilitação oral' },
  { icone: ScanLine, valor: 'Tomografia', rotulo: 'planejamento antes de qualquer cirurgia' },
  { icone: MapPin, valor: '2 unidades', rotulo: 'Suzano e Ferraz de Vasconcelos' },
  { icone: CalendarCheck, valor: 'Sem compromisso', rotulo: 'você decide depois da avaliação' },
];

const dores = [
  'Perdeu um ou mais dentes e evita sorrir em fotos',
  'Usa dentadura que solta, machuca ou atrapalha para comer',
  'Tem dentes condenados e não quer ficar sem dente durante o tratamento',
  'Já ouviu que implante leva meses e desistiu por isso',
  'Sente que mastiga só de um lado ou evita alimentos mais duros',
];

const etapas = [
  {
    icone: Stethoscope,
    titulo: 'Avaliação',
    texto: 'Exame clínico, conversa sobre o que te incomoda e explicação das opções possíveis para o seu caso.',
    prazo: '1 consulta',
  },
  {
    icone: ScanLine,
    titulo: 'Tomografia e planejamento',
    texto: 'Com a tomografia, o caso é planejado digitalmente: posição dos implantes e formato dos dentes provisórios.',
    prazo: 'antes da cirurgia',
  },
  {
    icone: Smile,
    titulo: 'Cirurgia e dentes no mesmo dia',
    texto: 'Com anestesia local, os implantes são instalados. Se a firmeza do implante permitir, a prótese provisória fixa é colocada no mesmo dia.',
    prazo: 'no dia da cirurgia',
  },
  {
    icone: ShieldCheck,
    titulo: 'Prótese definitiva',
    texto: 'Depois que o osso se une aos implantes, o provisório é trocado pela prótese definitiva, com retornos de acompanhamento.',
    prazo: '3 a 6 meses depois',
  },
];

// "Tudo em um dia": o principal diferencial da carga imediata, com as objeções
// que mais travam a decisão. Comer: só alimentos macios nas primeiras semanas
// (é o que protege a integração) — prometer "comer de tudo" seria falso.
const umDia = [
  {
    icone: Sunrise,
    quando: 'Chegada',
    titulo: 'Cirurgia com anestesia local',
    texto: 'Os implantes são instalados no consultório, com o plano feito antes pela tomografia.',
  },
  {
    icone: Smile,
    quando: 'No mesmo dia',
    titulo: 'Você sai com dentes fixos',
    texto: 'Se a firmeza dos implantes permitir, a prótese provisória fixa é colocada antes de você ir embora.',
  },
  {
    icone: Utensils,
    quando: 'Primeiros dias',
    titulo: 'Sorrindo e comendo alimentos macios',
    texto: 'Os dentes não saem para comer nem para dormir. A dieta macia nas primeiras semanas protege os implantes.',
  },
  {
    icone: ShieldCheck,
    quando: '3 a 6 meses depois',
    titulo: 'Prótese definitiva',
    texto: 'Com o osso integrado aos implantes, o provisório é trocado pela prótese definitiva.',
  },
];

const objecoes = [
  {
    pergunta: 'Vou ficar sem dente?',
    resposta: 'Não. Quando a carga imediata é indicada, você sai da cirurgia com dentes provisórios fixos, no mesmo dia.',
  },
  {
    pergunta: 'Vou conseguir comer?',
    resposta: 'Sim. Nos primeiros dias a alimentação é macia para proteger os implantes, e os dentes ficam fixos, sem sair do lugar.',
  },
  {
    pergunta: 'Vou sentir dor?',
    resposta: 'A cirurgia é feita com anestesia local. O desconforto dos dias seguintes é controlado com a medicação indicada.',
  },
  {
    pergunta: 'Vou voltar muitas vezes?',
    resposta: 'Cirurgia e dentes provisórios acontecem no mesmo dia. Depois, só os retornos de acompanhamento até a prótese definitiva.',
  },
];

const diferenciais = [
  'Planejamento digital com tomografia antes da cirurgia',
  'Explicação clara do plano, do prazo e do valor antes de começar',
  'Cirurgia com anestesia local, no próprio consultório',
  'Acompanhamento até a prótese definitiva e nos retornos depois dela',
  'Atendimento em Suzano e em Ferraz de Vasconcelos',
];

const faq = [
  {
    pergunta: 'Quanto custa o implante com carga imediata?',
    resposta:
      'O valor depende do número de implantes, da necessidade de extrações ou enxerto e do tipo de prótese. Por isso ele só é definido depois da avaliação. Você recebe o plano com prazo, valor e formas de pagamento antes de decidir.',
  },
  {
    // Sem citar valor: o Código de Ética do CFO (art. 44) proíbe anunciar preço ou
    // serviço gratuito. A equipe explica o valor e o abatimento no WhatsApp.
    pergunta: 'A avaliação é paga?',
    resposta:
      'Os valores e as condições da consulta de avaliação são informados pela equipe no agendamento, pelo WhatsApp. Na consulta, você recebe o plano de tratamento com prazo e valor e decide depois, sem compromisso.',
  },
  {
    pergunta: 'Dói?',
    resposta:
      'A cirurgia é feita com anestesia local, então não há dor durante o procedimento. Nos primeiros dias é comum sentir inchaço e desconforto, controlados com a medicação prescrita.',
  },
  ...cargaImediata.faq,
];

function BotaoAvaliacao({ className = '' }: { className?: string }) {
  return (
    <a href={`#${ALVO_FORMULARIO}`} className={`btn-primary group ${className}`}>
      Quero agendar minha avaliação
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}

export default function LandingCargaImediata() {
  return (
    <>
      {/* O site reserva 6rem no topo para o menu fixo; a LP não tem menu fixo, então
          as âncoras (formulário, depoimento) param exatamente no começo do bloco. */}
      <style>{'html{scroll-padding-top:0}'}</style>

      {/* Barra do topo: só marca e contato, sem menu de navegação */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="container-main flex h-[72px] items-center justify-between gap-4">
          <Image
            src="/img/logo-nome.png"
            alt="Dra. Michele Herreira — Odontologia"
            width={168}
            height={38}
            loading="eager"
            className="h-8 w-auto object-contain sm:h-9"
          />
          <LinkWhatsApp
            href={WHATSAPP}
            posicao="topo"
            className="inline-flex items-center gap-2 rounded-full bg-dark px-4 py-2.5 text-sm font-medium text-white
                       transition-colors hover:bg-charcoal"
          >
            <WhatsAppIcon size={15} />
            <span className="hidden sm:inline">Falar no</span> WhatsApp
          </LinkWhatsApp>
        </div>
      </header>

      <main className="pb-20 lg:pb-0">
        {/* 1. Topo: promessa + prova */}
        <section className="relative overflow-hidden bg-cream">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-10%] top-[-10%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(176,141,79,0.14)_0%,rgba(176,141,79,0)_65%)]"
          />
          {/* Celular: título → foto → texto. Desktop: foto na coluna da direita. */}
          <div className="container-main relative grid grid-cols-1 gap-x-14 pb-16 pt-28
                          lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-[auto_1fr] lg:pb-24 lg:pt-32">
            <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
              <span className="section-badge">Implante com carga imediata &middot; Suzano</span>
              <h1
                className="section-heading mt-6 text-balance"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
              >
                Implante com carga imediata:{' '}
                <span className="italic text-gold-dark">dentes fixos no mesmo dia</span> da cirurgia
              </h1>
            </div>

            {/* Antes/depois do Sr. Cícero, com atalho para o relato em vídeo dele */}
            <figure className="mx-auto mt-8 w-full max-w-[300px] sm:max-w-[340px] lg:col-start-2 lg:row-span-2
                               lg:row-start-1 lg:mt-0 lg:max-w-[380px] lg:self-center">
              <a href="#depoimento" className="group relative block overflow-hidden rounded-[1.5rem] bg-dark/5 shadow-2xl ring-1 ring-dark/10">
                <Image
                  src={casoCargaImediata.src}
                  alt={casoCargaImediata.alt}
                  width={casoCargaImediata.width}
                  height={casoCargaImediata.height}
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span
                  className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-surface p-3
                             shadow-lg"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dark text-white">
                    <Play size={16} className="ml-0.5 fill-white" aria-hidden="true" />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-medium text-dark">Sr. Cícero, 7 implantes</span>
                    <span className="block text-xs text-muted">Assista ao relato dele (1 min)</span>
                  </span>
                </span>
              </a>
              <figcaption className="mt-3 text-center text-xs text-muted">
                Antes e depois do Sr. Cícero, paciente real, publicado com autorização. O resultado
                varia de pessoa para pessoa.
              </figcaption>
            </figure>

            <div className="mt-8 lg:col-start-1 lg:row-start-2 lg:mt-0">
              <p className="max-w-xl text-[17px] leading-relaxed text-muted">
                Implantes e dentes fixos em um único dia: quando o osso permite, você entra no
                consultório e sai sorrindo, sem passar meses sem dente. Atendimento em Suzano e
                Ferraz de Vasconcelos, com quem faz implantes há mais de 25 anos.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  'Cirurgia e dentes provisórios fixos no mesmo dia',
                  'Volte a sorrir na hora e a comer alimentos macios já nos primeiros dias',
                  'Nada de dentadura solta: os dentes ficam fixos nos implantes',
                  'Planejamento com tomografia e plano com prazo e valor antes de começar',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-dark">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20">
                      <Check size={13} className="text-gold-deep" aria-hidden="true" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <BotaoAvaliacao />
                <LinkWhatsApp href={WHATSAPP} posicao="hero" className="btn-outline">
                  <WhatsAppIcon size={17} />
                  Tirar dúvidas no WhatsApp
                </LinkWhatsApp>
              </div>
              <p className="mt-4 text-xs text-muted">
                Responsável técnica: Dra. Michele Herreira &middot; {CRO}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Faixa de confiança */}
        <section className="border-y border-border bg-white">
          <div className="container-main grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4">
            {confianca.map((c) => {
              const Icone = c.icone;
              return (
                <div key={c.valor} className="flex items-start gap-3">
                  <Icone size={22} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
                  <div>
                    <p className="font-cormorant text-2xl leading-none text-dark">{c.valor}</p>
                    <p className="mt-1.5 text-[13px] leading-snug text-muted">{c.rotulo}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Tudo em um dia: o diferencial e as objeções que travam a decisão */}
        <section className="section-py bg-cream">
          <div className="container-main">
            <div className="max-w-2xl">
              <span className="section-badge mb-5">Tudo em um único dia</span>
              <h2 className="section-heading text-4xl lg:text-5xl">
                Você entra no consultório e sai{' '}
                <span className="italic text-gold-dark">sorrindo com dentes fixos</span>
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Nada de meses sem dente ou de dentadura provisória solta. Quando o seu caso permite,
                cirurgia e dentes fixos acontecem no mesmo dia.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              {/* Linha do tempo do dia */}
              <ol className="relative space-y-7 border-l border-gold/40 pl-8">
                {umDia.map((e) => {
                  const Icone = e.icone;
                  return (
                    <li key={e.titulo} className="relative">
                      <span
                        className="absolute -left-[3.05rem] top-0 flex h-9 w-9 items-center justify-center
                                   rounded-full border border-gold/40 bg-surface text-gold-dark"
                      >
                        <Icone size={17} aria-hidden="true" />
                      </span>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold-deep">{e.quando}</p>
                      <h3 className="mt-1 font-cormorant text-2xl text-dark">{e.titulo}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{e.texto}</p>
                    </li>
                  );
                })}
              </ol>

              {/* Objeções */}
              <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {objecoes.map((o) => (
                    <div key={o.pergunta} className="rounded-2xl border border-border bg-surface p-5">
                      <p className="font-cormorant text-xl text-dark">{o.pergunta}</p>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{o.resposta}</p>
                    </div>
                  ))}
                </div>
                <BotaoAvaliacao className="mt-8 w-full sm:w-auto" />
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  A carga imediata depende da avaliação, da tomografia e da firmeza dos implantes
                  medida na cirurgia. Se não for possível no seu caso, você recebe a alternativa
                  mais segura, explicada antes de começar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Depoimentos em vídeo: logo no começo, porque é a prova mais forte da página */}
        <section id="depoimento" className="section-py scroll-mt-4 bg-dark">
          <div className="container-main">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Depoimento real
              </span>
              <h2
                className="mt-6 font-cormorant font-normal leading-[1.08] text-white"
                style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}
              >
                Veja o relato do Sr. Cícero, paciente de carga imediata
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-white/70">
                Ele chegou para mudar o sorriso e colocou sete implantes. No vídeo, conta como foi
                a experiência, da cirurgia ao resultado. Ao lado, a jornada de outro paciente, do
                planejamento digital ao momento em que se vê no espelho.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:max-w-4xl">
              <div>
                <VideoDepoimento
                  src="/video/relato-sr-cicero.mp4"
                  capa="/img/relato-sr-cicero-capa.jpg"
                  largura={720}
                  altura={1280}
                  alt="Sr. Cícero ao lado da Dra. Michele Herreira no consultório, depois do tratamento"
                  rotulo="Relato do Sr. Cícero · 1 min"
                />
                <p className="mx-auto mt-3 max-w-[340px] text-center text-sm font-medium text-white">
                  Sr. Cícero, 7 implantes com carga imediata
                </p>
              </div>
              <div>
                <VideoDepoimento
                  src="/video/carga-imediata-paciente.mp4"
                  capa="/img/carga-imediata-paciente-capa.jpg"
                  largura={720}
                  altura={1140}
                  alt="Paciente da clínica contando a experiência com implante de carga imediata"
                  rotulo="Do planejamento ao sorriso · 34 s"
                />
                <p className="mx-auto mt-3 max-w-[340px] text-center text-sm font-medium text-white">
                  Do planejamento ao novo sorriso
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-[11px] leading-relaxed text-white/50">
              Pacientes reais, publicados com autorização. Tratamentos realizados pela Dra. Michele
              Herreira ({CRO}). O resultado varia de pessoa para pessoa.
            </p>
            <a
              href={`#${ALVO_FORMULARIO}`}
              className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-[15px]
                         font-medium text-dark transition-colors hover:bg-gold-light"
            >
              Quero agendar minha avaliação
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* 5. Identificação */}
        <section className="section-py bg-cream">
          <div className="container-main grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="section-badge mb-5">É para você?</span>
              <h2 className="section-heading text-4xl lg:text-5xl">Você se identifica com alguma destas situações?</h2>
              <ul className="mt-8 space-y-4">
                {dores.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[16px] leading-relaxed text-dark">
                    <Check size={18} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-8">
              <p className="font-cormorant text-3xl leading-snug text-dark">
                A carga imediata existe justamente para quem não quer passar o tratamento sem dentes.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Ela é indicada quando há osso em quantidade e qualidade suficientes, o que a
                tomografia mostra. Se o seu caso não permitir, isso é explicado na avaliação e você
                recebe a alternativa mais segura, com um provisório enquanto o implante cicatriza.
              </p>
              <BotaoAvaliacao className="mt-7" />
            </div>
          </div>
        </section>

        {/* 6. Casos reais */}
        <section className="section-py bg-white">
          <div className="container-main">
            <div className="max-w-2xl">
              <span className="section-badge mb-5">Casos reais</span>
              <h2 className="section-heading text-4xl lg:text-5xl">Pacientes que voltaram a sorrir</h2>
              <p className="mt-5 leading-relaxed text-muted">
                Arraste o divisor das fotos para comparar o antes e o depois do mesmo paciente.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
              {comparadores.map((c) => (
                <Comparador key={c.id} caso={c} sizes="(max-width: 768px) calc(100vw - 48px), 520px" />
              ))}
            </div>
            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted">
              Imagens de pacientes reais, publicadas com autorização. Cada caso é único: o
              resultado depende das condições clínicas iniciais, do plano de tratamento e da
              resposta de cada organismo.
            </p>
          </div>
        </section>

        {/* 7. Como funciona */}
        <section className="section-py bg-cream">
          <div className="container-main">
            <div className="max-w-2xl">
              <span className="section-badge mb-5">Como funciona</span>
              <h2 className="section-heading text-4xl lg:text-5xl">Da avaliação aos dentes fixos, passo a passo</h2>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {etapas.map((e, i) => {
                const Icone = e.icone;
                return (
                  <li key={e.titulo} className="rounded-2xl border border-border bg-surface p-6">
                    <div className="flex items-center justify-between">
                      <Icone size={24} className="text-gold-dark" aria-hidden="true" />
                      <span className="font-cormorant text-lg text-gold-dark">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-4 font-cormorant text-2xl text-dark">{e.titulo}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{e.texto}</p>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold-deep">
                      <Clock size={13} aria-hidden="true" />
                      {e.prazo}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* 8. A doutora */}
        <section className="section-py bg-white">
          <div className="container-main grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <div className="relative mx-auto w-full max-w-[380px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-dark/5 shadow-xl">
                <Image
                  src="/img/img-dra.jpeg"
                  alt="Dra. Michele Herreira, cirurgiã-dentista que faz implante com carga imediata em Suzano"
                  width={859}
                  height={1280}
                  sizes="(max-width: 428px) calc(100vw - 48px), 380px"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 left-4 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-lg">
                <p className="text-[10px] uppercase tracking-wider text-muted">Registro</p>
                <p className="font-cormorant text-xl leading-none text-dark">{CRO}</p>
              </div>
            </div>
            <div>
              <span className="section-badge mb-5">Quem vai cuidar de você</span>
              <h2 className="section-heading text-4xl lg:text-5xl">Dra. Michele Herreira</h2>
              <p className="mt-6 text-[17px] leading-relaxed text-muted">
                Cirurgiã-dentista com mais de 25 anos dedicados à implantodontia e à reabilitação
                oral. Cada plano começa pela avaliação e pela tomografia, e é apresentado ao
                paciente, com prazo e valor, antes de qualquer etapa.
              </p>
              <ul className="mt-7 space-y-3">
                {diferenciais.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-dark">
                    <Check size={17} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <BotaoAvaliacao className="mt-9" />
            </div>
          </div>
        </section>

        {/* 9. Dúvidas */}
        <Faq perguntas={faq} titulo="Dúvidas sobre implante com carga imediata" />

        {/* 10. Formulário */}
        {/* Celular: título → formulário → "na avaliação você vai". Desktop: formulário à direita.
            Os botões de avaliação levam à âncora do próprio formulário, não ao título. */}
        <section id="avaliacao" className="bg-white py-16 lg:py-28">
          <div className="container-main grid grid-cols-1 gap-x-16 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr]">
            <div className="lg:col-start-1 lg:row-start-1">
              <span className="section-badge mb-5">Agendamento</span>
              <h2 className="section-heading text-4xl lg:text-5xl">Falta pouco para o seu novo sorriso</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Responda o formulário e a sua mensagem chega pronta no WhatsApp da clínica. A equipe
                responde em horário comercial ({HORARIO.toLowerCase()}).
              </p>
            </div>

            <div id={ALVO_FORMULARIO} className="mt-8 scroll-mt-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
              <FormularioAvaliacao />
            </div>

            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-0">
              <h3 className="mt-0 text-xs uppercase tracking-[0.18em] text-muted lg:mt-9">Na avaliação você vai</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Mostrar o que te incomoda e tirar todas as dúvidas',
                  'Passar por exame clínico com a dentista',
                  'Saber se a carga imediata é indicada para você',
                  'Receber o plano com prazo e valor, sem compromisso',
                ].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-dark">
                    <ClipboardList size={17} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 11. Unidades */}
        <section className="bg-cream py-16">
          <div className="container-main">
            <h2 className="section-heading text-3xl lg:text-4xl">Onde atendemos</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {UNIDADES.map((u) => (
                <div key={u.id} className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-cormorant text-2xl text-dark">Unidade {u.cidade}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{u.linha}</p>
                  </div>
                  <a
                    href={u.mapsRota}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline shrink-0 py-2.5 text-sm"
                  >
                    <Navigation size={14} aria-hidden="true" />
                    Como chegar
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé enxuto */}
      <footer className="bg-dark pb-28 pt-12 text-sm text-white/60 lg:pb-12">
        <div className="container-main space-y-3">
          <p className="text-white">{NOME_CLINICA}</p>
          <p>
            Responsável técnica: Dra. Michele Herreira &middot; {CRO} &middot; WhatsApp {TELEFONE_EXIBICAO}
          </p>
          {UNIDADES.map((u) => (
            <p key={u.id}>Unidade {u.cidade}: {u.linha}</p>
          ))}
          <p className="max-w-3xl text-xs leading-relaxed text-white/45">
            As informações desta página são educativas e não substituem a consulta. A indicação, o
            prazo e o resultado de cada tratamento variam de pessoa para pessoa e só são definidos
            após avaliação clínica.
          </p>
          <p className="text-xs">
            <a href="/privacidade" className="underline underline-offset-2 hover:text-white">
              Política de privacidade
            </a>
          </p>
        </div>
      </footer>

      {/* Barra fixa no celular: leva ao formulário e some quando ele está na tela */}
      <BarraFixaCelular alvo={ALVO_FORMULARIO} />
    </>
  );
}

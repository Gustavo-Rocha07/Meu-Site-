import { Clock, Instagram, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Breadcrumb from '@/components/Breadcrumb';
import Unidades from '@/components/Unidades';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import {
  CRO,
  EMAIL,
  HORARIO,
  INSTAGRAM,
  NOME_CLINICA,
  TELEFONE,
  TELEFONE_EXIBICAO,
  UNIDADES,
  WA_AGENDAR,
} from '@/lib/contato';
import { metadataPagina } from '@/lib/seo';

export const metadata = metadataPagina({
  title: 'Contato e Endereços em Suzano',
  description:
    'Endereços em Suzano e Ferraz de Vasconcelos, WhatsApp e horário da Dra. Michele Herreira, com mapa e rota para cada unidade. Agende sua avaliação.',
  path: '/contato',
});

type Canal = {
  icone: typeof MapPin;
  rotulo: string;
  valor: string;
  href?: string;
  externo?: boolean;
};

const canais: Canal[] = [
  ...UNIDADES.map((u) => ({
    icone: MapPin,
    rotulo: `Unidade ${u.cidade}`,
    valor: u.linha,
    href: u.mapsRota,
    externo: true,
  })),
  { icone: Phone, rotulo: 'Telefone e WhatsApp', valor: TELEFONE_EXIBICAO, href: `tel:${TELEFONE}` },
  { icone: Clock, rotulo: 'Horário', valor: HORARIO },
  { icone: Mail, rotulo: 'E-mail', valor: EMAIL, href: `mailto:${EMAIL}` },
  { icone: Instagram, rotulo: 'Instagram', valor: '@dra.michele_', href: INSTAGRAM, externo: true },
];

export default function ContatoPage() {
  return (
    <PageShell>
      <header className="bg-cream">
        <div className="container-main pb-14 pt-28 lg:pt-32">
          <Breadcrumb
            migalhas={[
              { nome: 'Início', path: '/' },
              { nome: 'Contato', path: '/contato' },
            ]}
          />
          <span className="section-badge mt-8">Contato</span>
          <h1
            className="section-heading mt-5 max-w-3xl text-balance"
            style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.9rem)' }}
          >
            Contato e como chegar à clínica em Suzano
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            A Dra. Michele atende em Suzano e em Ferraz de Vasconcelos. A forma mais rápida de
            agendar é pelo WhatsApp; a avaliação serve para examinar o caso e
            apresentar as opções de tratamento com prazo e valor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WA_AGENDAR} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon size={17} />
              Agendar pelo WhatsApp
            </a>
            <a href="#unidades" className="btn-outline">
              <Navigation size={15} aria-hidden="true" />
              Ver as unidades no mapa
            </a>
          </div>
        </div>
      </header>

      <section className="bg-cream pb-20 lg:pb-28">
        <div className="container-main max-w-3xl">
          <h2 className="section-heading text-3xl lg:text-[2.4rem]">{NOME_CLINICA}</h2>
          <p className="mt-2 text-sm text-muted">{CRO}</p>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {canais.map((c) => {
              const Icone = c.icone;
              const conteudo = (
                <>
                  <Icone size={17} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">{c.rotulo}</span>
                    <span className="mt-1 block text-[15px] text-dark">{c.valor}</span>
                  </span>
                </>
              );
              return (
                <li key={c.rotulo}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.externo && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="flex items-start gap-4 py-4 transition-colors hover:text-gold-deep"
                    >
                      {conteudo}
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 py-4">{conteudo}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Unidades titulo="Unidades e mapas" />
    </PageShell>
  );
}

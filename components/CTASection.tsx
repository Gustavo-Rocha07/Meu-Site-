import { BadgeCheck, Clock, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { CIDADE, HORARIO, TELEFONE, TELEFONE_EXIBICAO, WA_AGENDAR } from '@/lib/contato';

type Props = {
  titulo?: string;
  texto?: string;
  /** Link do WhatsApp com a mensagem já preenchida (padrão: agendar avaliação). */
  whatsapp?: string;
  rotuloBotao?: string;
};

/**
 * Bloco escuro de agendamento no fim das páginas. Era um client component só
 * por causa da animação de entrada; virou server component para não carregar
 * JavaScript num trecho que é só texto e links.
 */
export default function CTASection({
  titulo = 'Vamos avaliar o seu caso',
  texto = 'Na consulta de avaliação o caso é examinado, as dúvidas são respondidas e as opções de tratamento são apresentadas com prazo e valor. Você decide depois, sem compromisso de fechar o tratamento.',
  whatsapp = WA_AGENDAR,
  rotuloBotao = 'Agendar pelo WhatsApp',
}: Props) {
  return (
    <section className="section-py bg-dark">
      <div className="container-main">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-3 text-xs font-medium uppercase
                           tracking-[0.18em] text-gold">
            <span className="h-px w-6 bg-gold" />
            Agendamento
          </span>

          <h2
            className="mt-6 font-cormorant font-normal leading-[1.08] tracking-[-0.01em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)' }}
          >
            {titulo}
          </h2>

          <p className="mt-6 text-[17px] leading-relaxed text-white/70">{texto}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gold
                         px-7 py-3.5 text-[15px] font-medium text-dark transition-colors
                         duration-200 hover:bg-gold-light"
            >
              <WhatsAppIcon size={17} />
              {rotuloBotao}
            </a>
            <a
              href={`tel:${TELEFONE}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border
                         border-white/25 px-7 py-3.5 text-[15px] font-medium text-white
                         transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
            >
              <Phone size={16} />
              {TELEFONE_EXIBICAO}
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-7
                         text-sm text-white/70">
            <div className="flex items-center gap-2.5">
              <MapPin size={15} className="text-gold" aria-hidden="true" />
              <dt className="sr-only">Local</dt>
              <dd>{CIDADE}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={15} className="text-gold" aria-hidden="true" />
              <dt className="sr-only">Horário</dt>
              <dd>{HORARIO}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <BadgeCheck size={15} className="text-gold" aria-hidden="true" />
              <dt className="sr-only">Consulta de avaliação</dt>
              <dd>Plano com prazo e valor</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

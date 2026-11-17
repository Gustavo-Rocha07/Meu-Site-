import Image from 'next/image';
import Link from 'next/link';
import { Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { tratamentos } from '@/content/tratamentos';
import {
  CIDADES_ATENDIDAS,
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

const navegacao = [
  { label: 'Início', href: '/' },
  { label: 'A doutora', href: '/sobre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Unidades e como chegar', href: '/contato' },
  { label: 'Política de privacidade', href: '/privacidade' },
];

/**
 * Nome, endereço e telefone (NAP) saem de lib/contato.ts e aparecem iguais em
 * todas as páginas — é o que o Google cruza com o perfil do Google Meu Negócio.
 */
export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/img/logo-nome.png"
              alt="Dra. Michele Herreira"
              width={168}
              height={38}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Odontologia com foco em implantes, reabilitação oral e odontopediatria.
              Atendemos pacientes de {CIDADES_ATENDIDAS.join(', ').replace(/, ([^,]*)$/, ' e $1')}.
            </p>
            <p className="mt-4 text-sm text-white/55">{CRO}</p>

            <div className="mt-6 flex gap-2.5">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Dra. Michele Herreira"
                className="flex h-10 w-10 items-center justify-center rounded-full border
                           border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram size={16} />
              </a>
              <a
                href={WA_AGENDAR}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da clínica"
                className="flex h-10 w-10 items-center justify-center rounded-full border
                           border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-xs uppercase tracking-[0.18em] text-white/55">Navegação</h2>
            <ul className="mt-5 space-y-3">
              {navegacao.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1 text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-white/55">Tratamentos</h2>
            <ul className="mt-5 space-y-1">
              {tratamentos.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="inline-block py-1 text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {t.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-white/55">Contato</h2>
            <address className="mt-5 not-italic">
              <p className="text-sm font-medium text-white">{NOME_CLINICA}</p>
              <ul className="mt-4 space-y-4 text-sm text-white/70">
                {UNIDADES.map((u) => (
                  <li key={u.id}>
                    <a
                      href={u.mapsRota}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 py-1 transition-colors hover:text-gold"
                    >
                      <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>
                        <span className="block text-white/90">Unidade {u.cidade}</span>
                        {u.linha}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`tel:${TELEFONE}`}
                    className="flex items-start gap-3 py-1 transition-colors hover:text-gold"
                  >
                    <Phone size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {TELEFONE_EXIBICAO}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-start gap-3 break-all py-1 transition-colors hover:text-gold"
                  >
                    <Mail size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {HORARIO}
                </li>
              </ul>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-main flex flex-col items-center justify-between gap-3 py-6
                        text-xs text-white/55 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Dra. Michele Herreira. Todos os direitos reservados.
          </p>
          <p>{CRO} &middot; Odontologia e reabilitação oral</p>
        </div>
      </div>
    </footer>
  );
}

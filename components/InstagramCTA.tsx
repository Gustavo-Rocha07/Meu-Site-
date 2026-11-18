import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { INSTAGRAM } from '@/lib/contato';

const PERFIL = '@dra.michele_';

/**
 * Chamada para o Instagram da doutora. É só um link: incorporar o feed do
 * perfil exigiria token da API da Meta (ou um widget de terceiros) e carregaria
 * JavaScript pesado em toda visita.
 */
export default function InstagramCTA({ fundo = 'branco' }: { fundo?: 'branco' | 'creme' }) {
  const branco = fundo === 'branco';
  return (
    <section className={`section-py ${branco ? 'bg-white' : 'bg-cream'}`}>
      <div className="container-main">
        <div className={`grid grid-cols-1 items-center gap-10 rounded-2xl border border-border ${branco ? 'bg-cream' : 'bg-surface'}
                        p-8 sm:p-10 md:grid-cols-[auto_1fr_auto] md:gap-12`}>
          <div className="relative mx-auto h-28 w-28 shrink-0 md:mx-0">
            {/* anel com as cores do Instagram em volta da foto */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)]"
            />
            <div className="absolute inset-[3px] overflow-hidden rounded-full border-[3px] border-surface bg-cream">
              <Image
                src="/img/michele.png"
                alt="Dra. Michele Herreira no Instagram"
                width={571}
                height={856}
                sizes="112px"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="section-badge mb-4 justify-center md:justify-start">Instagram</span>
            <h2 className="section-heading text-3xl lg:text-4xl">Acompanhe a Dra. Michele no Instagram</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted md:mx-0">
              Casos do consultório, bastidores dos atendimentos e dicas de cuidado com o sorriso
              de adultos e crianças, em {PERFIL}.
            </p>
          </div>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5
                       text-[15px] font-medium text-white transition-opacity duration-200 hover:opacity-90
                       bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)]"
          >
            <Instagram size={18} aria-hidden="true" />
            Ver o Instagram
            <span className="sr-only"> da Dra. Michele (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

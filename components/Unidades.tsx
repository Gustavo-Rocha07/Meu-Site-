import { MapPin, Navigation } from 'lucide-react';
import { HORARIO, UNIDADES } from '@/lib/contato';

/**
 * As unidades da clínica, cada uma com o mapa do Google e o botão de rota.
 * Os mapas usam loading="lazy": só carregam quando chegam perto da tela, então
 * não pesam no carregamento inicial (LCP) da home nem do /contato.
 */
export default function Unidades({ titulo = 'Onde a Dra. Michele atende' }: { titulo?: string }) {
  return (
    <section id="unidades" className="section-py bg-white">
      <div className="container-main">
        <div className="max-w-2xl">
          <span className="section-badge mb-5">Unidades</span>
          <h2 className="section-heading text-4xl lg:text-5xl">{titulo}</h2>
          <p className="mt-5 leading-relaxed text-muted">
            Atendimento em {UNIDADES.map((u) => u.cidade).join(' e ')}. {HORARIO}, com horário
            combinado pelo WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          {UNIDADES.map((u) => (
            <article key={u.id}>
              <h3 className="font-cormorant text-3xl text-dark">Unidade {u.cidade}</h3>
              <p className="mt-2 flex items-start gap-2.5 text-[15px] leading-relaxed text-muted">
                <MapPin size={16} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
                {u.linha}
              </p>

              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl bg-dark/5 ring-1 ring-dark/10">
                <iframe
                  src={u.mapsEmbed}
                  title={`Mapa da unidade ${u.cidade}: ${u.linha}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              </div>

              <a
                href={u.mapsRota}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-5"
              >
                <Navigation size={15} aria-hidden="true" />
                Como chegar à unidade {u.cidade}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

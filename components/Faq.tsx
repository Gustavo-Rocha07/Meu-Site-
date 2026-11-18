import { Plus } from 'lucide-react';
import JsonLd from './JsonLd';
import { schemaFaq, type Pergunta } from '@/lib/seo';

/**
 * Perguntas frequentes com <details> nativo: abre e fecha sem JavaScript, e as
 * respostas ficam no HTML (o Google lê o conteúdo recolhido normalmente).
 * O FAQPage em JSON-LD sai dos mesmos dados, então o texto sempre bate.
 */
export default function Faq({ perguntas, titulo }: { perguntas: Pergunta[]; titulo: string }) {
  return (
    <section id="perguntas" className="section-py bg-cream">
      <div className="container-main">
        <div className="max-w-2xl">
          <span className="section-badge mb-5">Perguntas frequentes</span>
          <h2 className="section-heading text-4xl lg:text-5xl">{titulo}</h2>
        </div>

        <div className="mt-12 max-w-3xl border-t border-border">
          {perguntas.map((p) => (
            <details key={p.pergunta} className="group border-b border-border">
              <summary
                className="flex cursor-pointer list-none items-start justify-between gap-6 py-6
                           text-left [&::-webkit-details-marker]:hidden"
              >
                <h3 className="font-cormorant text-2xl leading-snug text-dark">{p.pergunta}</h3>
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="mt-1.5 shrink-0 text-gold-dark transition-transform duration-200
                             group-open:rotate-45"
                />
              </summary>
              <p className="-mt-1 pb-6 pr-10 text-[16px] leading-relaxed text-muted">{p.resposta}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd dados={schemaFaq(perguntas)} />
    </section>
  );
}

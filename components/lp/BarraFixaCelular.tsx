'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

/**
 * Barra fixa do celular: leva ao formulário de avaliação (o lead chega
 * qualificado), não direto ao WhatsApp. Some enquanto o formulário está na tela,
 * para não cobrir os campos nem o botão de enviar.
 */
export default function BarraFixaCelular({ alvo }: { alvo: string }) {
  const [formularioNaTela, setFormularioNaTela] = useState(false);

  useEffect(() => {
    const el = document.getElementById(alvo);
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFormularioNaTela(e.isIntersecting), {
      rootMargin: '0px 0px -10% 0px',
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [alvo]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]
                  transition-transform duration-300 lg:hidden ${
                    formularioNaTela ? 'translate-y-full' : 'translate-y-0'
                  }`}
      aria-hidden={formularioNaTela}
    >
      <a
        href={`#${alvo}`}
        tabIndex={formularioNaTela ? -1 : 0}
        className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-[15px]
                   font-semibold text-white shadow-lg shadow-black/10 active:scale-[0.99]"
      >
        Agendar minha avaliação
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </div>
  );
}

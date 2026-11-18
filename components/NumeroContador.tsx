'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Props = {
  alvo: number;
  sufixo?: string;
  prefixo?: string;
  /** Formata com separador de milhar (1.000). */
  milhar?: boolean;
  duracao?: number;
  className?: string;
};

function formatar(n: number, milhar: boolean) {
  return milhar ? n.toLocaleString('pt-BR') : String(n);
}

/**
 * O HTML do servidor já sai com o número final — antes saía "0", e era isso que
 * o Google e quem abre a página sem JavaScript viam. A contagem de 0 até `alvo`
 * acontece só no navegador, quando o número entra na tela.
 *
 * O valor final fica num ::before invisível que reserva a largura (pseudo-elemento
 * não entra no texto da página); o número animado fica por cima, em posição
 * absoluta. Assim a contagem não empurra os vizinhos (sem CLS).
 */
export default function NumeroContador({
  alvo,
  sufixo = '',
  prefixo = '',
  milhar = false,
  duracao = 1600,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const emVista = useInView(ref, { once: true, margin: '-40px' });
  const semMovimento = useReducedMotion();
  const [n, setN] = useState(alvo);

  useEffect(() => {
    if (!emVista || semMovimento) return;
    let raf = 0;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = Math.min((agora - inicio) / duracao, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setN(Math.round(eased * alvo));
      if (t < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [emVista, alvo, duracao, semMovimento]);

  const final = `${prefixo}${formatar(alvo, milhar)}${sufixo}`;

  return (
    <span
      ref={ref}
      data-final={final}
      className={`relative inline-block tabular-nums before:invisible before:content-[attr(data-final)] ${className ?? ''}`}
    >
      <span className="absolute left-0 top-0">
        {prefixo}
        {formatar(n, milhar)}
        {sufixo}
      </span>
    </span>
  );
}

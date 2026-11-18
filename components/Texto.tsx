import Link from 'next/link';
import { Fragment } from 'react';

/**
 * Renderiza um parágrafo do conteúdo trocando `[texto](/caminho)` por link
 * interno. É o único "markdown" aceito — o suficiente para os links entre
 * tratamentos e artigos sem trazer uma biblioteca de markdown.
 */
export default function Texto({ children }: { children: string }) {
  const partes = children.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {partes.map((parte, i) => {
        const link = parte.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!link) return <Fragment key={i}>{parte}</Fragment>;
        return (
          <Link
            key={i}
            href={link[2]}
            className="text-gold-dark underline decoration-gold/40 underline-offset-4
                       transition-colors hover:text-gold-deep hover:decoration-gold-deep"
          >
            {link[1]}
          </Link>
        );
      })}
    </>
  );
}

/** Mesmo texto sem a marcação de link — para JSON-LD e meta tags. */
export function textoPuro(s: string) {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import JsonLd from './JsonLd';
import { schemaBreadcrumb, type Migalha } from '@/lib/seo';

/**
 * Trilha visível no topo da página + BreadcrumbList em JSON-LD com os mesmos
 * itens, para que o que o Google lê bata com o que o paciente vê.
 */
export default function Breadcrumb({ migalhas }: { migalhas: Migalha[] }) {
  return (
    <>
      <nav aria-label="Você está em" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {migalhas.map((m, i) => {
            const ultima = i === migalhas.length - 1;
            return (
              <li key={m.path} className="flex items-center gap-1.5">
                {ultima ? (
                  <span aria-current="page" className="text-dark">
                    {m.nome}
                  </span>
                ) : (
                  <>
                    <Link href={m.path} className="transition-colors hover:text-gold-dark">
                      {m.nome}
                    </Link>
                    <ChevronRight size={12} aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd dados={schemaBreadcrumb(migalhas)} />
    </>
  );
}

import type { Tratamento } from '../tipos';
import { implanteDentario } from './implante-dentario';
import { cargaImediata } from './carga-imediata';
import { proteseDentaria } from './protese-dentaria';
import { lenteDeContatoDental } from './lente-de-contato-dental';
import { clareamentoDental } from './clareamento-dental';
import { esteticaDoSorriso } from './estetica-do-sorriso';
import { odontopediatria } from './odontopediatria';
import { cirurgiaOdontologica } from './cirurgia-odontologica';

/** Ordem em que aparecem na home, no menu e no rodapé. */
export const tratamentos: Tratamento[] = [
  implanteDentario,
  cargaImediata,
  proteseDentaria,
  lenteDeContatoDental,
  clareamentoDental,
  esteticaDoSorriso,
  cirurgiaOdontologica,
  odontopediatria,
];

export function tratamentoPorSlug(slug: string): Tratamento {
  const t = tratamentos.find((x) => x.slug === slug);
  if (!t) throw new Error(`Tratamento não encontrado: ${slug}`);
  return t;
}

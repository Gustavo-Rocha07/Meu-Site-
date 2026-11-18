import type { Artigo } from '../tipos';
import { quantoTempoDuraImplante } from './quanto-tempo-dura-um-implante-dentario';
import { cargaImediataMesmoDia } from './carga-imediata-dente-fixo-no-mesmo-dia';
import { lenteEstragaDente } from './lente-de-contato-dental-estraga-o-dente';
import { idadeBebeDentista } from './com-que-idade-levar-o-bebe-ao-dentista';
import { clareamentoMitos } from './clareamento-dental-doi-mitos-e-verdades';

export const artigos: Artigo[] = [
  quantoTempoDuraImplante,
  cargaImediataMesmoDia,
  lenteEstragaDente,
  idadeBebeDentista,
  clareamentoMitos,
];

export function artigoPorSlug(slug: string): Artigo | undefined {
  return artigos.find((a) => a.slug === slug);
}

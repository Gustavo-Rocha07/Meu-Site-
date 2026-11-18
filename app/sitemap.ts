import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/contato';
import { casos, casosMontados } from '@/lib/casos';
import { tratamentos } from '@/content/tratamentos';
import { artigos } from '@/content/blog';
import type { Tratamento } from '@/content/tipos';

// Data da última mudança real de conteúdo — não usar new Date(), senão toda
// build diz ao Google que tudo mudou.
const ATUALIZADO_EM = '2026-11-10';

/** Foto do topo + casos antes/depois de cada tratamento (sitemap de imagens). */
function imagensDoTratamento(t: Tratamento) {
  const comparador = casos.filter((c) => t.casos?.includes(c.id)).flatMap((c) => [c.antes, c.depois]);
  const montados = casosMontados.filter((c) => t.casosMontados?.includes(c.id)).map((c) => c.src);
  return [t.imagem.src, ...comparador, ...montados].map((src) => `${SITE_URL}${src}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pagina = (path: string, lastModified: string, priority: number, images?: string[]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(`${lastModified}T12:00:00-03:00`),
    priority,
    ...(images && { images }),
  });

  return [
    pagina('', ATUALIZADO_EM, 1, casosMontados.map((c) => `${SITE_URL}${c.src}`)),
    ...tratamentos.map((t) => pagina(`/${t.slug}`, t.atualizadoEm, 0.9, imagensDoTratamento(t))),
    pagina('/sobre', '2026-10-27', 0.7),
    pagina('/contato', '2026-10-28', 0.8),
    pagina('/blog', '2026-10-27', 0.6),
    pagina('/privacidade', '2026-11-17', 0.2),
    ...artigos.map((a) => pagina(`/blog/${a.slug}`, a.atualizadoEm, 0.6, [`${SITE_URL}${a.imagem.src}`])),
  ];
}

/**
 * Casos clínicos reais, publicados com autorização. Ficam fora dos componentes
 * 'use client' para que as páginas de tratamento (server components) possam
 * importar os dados e escolher os casos de cada procedimento.
 */
export type Caso = {
  id: string;
  antes: string;
  depois: string;
  titulo: string;
  detalhe: string;
};

/**
 * As imagens em /img/casos foram reenquadradas (scripts/gerar-casos.ps1) para que,
 * dentro de cada par, a boca fique na mesma posicao e na mesma escala. E isso que
 * faz o comparador alinhar ao arrastar: o CSS sozinho nao resolve, porque as fotos
 * originais tem proporcoes e enquadramentos diferentes.
 */
export const casos: Caso[] = [
  {
    id: 'caso-1',
    antes: '/img/casos/caso-1-antes.jpg',
    depois: '/img/casos/caso-1-depois.jpg',
    titulo: 'Reabilitação com implantes',
    detalhe: 'Prótese fixa sobre implantes, arcada superior',
  },
  {
    id: 'caso-2',
    antes: '/img/casos/caso-2-antes.jpg',
    depois: '/img/casos/caso-2-depois.jpg',
    titulo: 'Reabilitação estética',
    detalhe: 'Restabelecimento de forma, cor e proporção',
  },
  {
    id: 'caso-3',
    antes: '/img/casos/caso-3-antes.jpg',
    depois: '/img/casos/caso-3-depois.jpg',
    titulo: 'Reconstrução do sorriso',
    detalhe: 'Substituição de dentes ausentes e acabamento estético',
  },
];

/**
 * Fotos que já vêm montadas como antes/depois pela clínica. Largura e altura
 * reais ficam aqui porque nem todas são quadradas (a de carga imediata é retrato).
 *
 * As três últimas foram preparadas a partir da pasta imagens/ (cortadas, com o
 * "antes" sempre primeiro) e têm nome de arquivo descritivo para o Google Imagens.
 */
export type CasoMontado = { id: string; src: string; alt: string; width: number; height: number };

export const casosMontados: CasoMontado[] = [
  {
    id: 'exemplo-3',
    src: '/img/exemplo-3.png',
    alt: 'Paciente antes e depois da reabilitação estética — à esquerda, antes; à direita, depois',
    width: 427,
    height: 416,
  },
  {
    id: 'exemplo-4',
    src: '/img/exemplo-4.png',
    alt: 'Paciente antes e depois da reabilitação com prótese — à esquerda, antes; à direita, depois',
    width: 427,
    height: 419,
  },
  {
    id: 'exemplo-5',
    src: '/img/exemplo-5.png',
    alt: 'Arcada dentária antes e depois do tratamento, em vista aproximada',
    width: 427,
    height: 417,
  },
  {
    id: 'clareamento-1',
    src: '/img/casos/clareamento-dental-antes-depois-suzano.jpg',
    alt: 'Clareamento dental em Suzano: dentes amarelados antes (à esquerda) e mais claros depois do tratamento (à direita)',
    width: 738,
    height: 739,
  },
  {
    id: 'carga-imediata-1',
    src: '/img/casos/carga-imediata-antes-depois-suzano.jpg',
    alt: 'Implante com carga imediata em Suzano: paciente sem os dentes superiores antes (à esquerda) e com a prótese fixa depois (à direita)',
    width: 964,
    height: 1600,
  },
  {
    id: 'lente-1',
    src: '/img/casos/lente-de-contato-dental-antes-depois-suzano.jpg',
    alt: 'Lente de contato dental em Suzano: dentes da frente escurecidos antes (em cima) e sorriso com lentes de porcelana depois (embaixo)',
    width: 1280,
    height: 1280,
  },
];

/** Largura exibida do comparador: 1 coluna no celular, 2 no tablet, 3 no desktop. */
export const SIZES_COMPARADOR =
  '(max-width: 768px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 56px), 340px';

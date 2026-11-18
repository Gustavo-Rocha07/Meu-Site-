/**
 * Dados de contato num lugar só. Antes o número e o link do WhatsApp estavam
 * repetidos em seis componentes — trocar o telefone exigia caçar todos.
 *
 * Nome, endereço e telefone (NAP) precisam sair idênticos no rodapé, no schema
 * e no Google Meu Negócio. Qualquer mudança de endereço é feita só aqui.
 */
export const SITE_URL = 'https://www.dramicheleherreira.com';

export const NOME = 'Dra. Michele Herreira';
export const NOME_CLINICA = 'Dra. Michele Herreira — Odontologia';

export const TELEFONE = '+5511991444710';
export const TELEFONE_EXIBICAO = '(11) 99144-4710';
export const EMAIL = 'drmichele@gmail.com';
export const HORARIO = 'Segunda a sexta, 9h às 18h';
export const CRO = 'CRO-SP 71275';

export type Unidade = {
  id: string;
  cidade: string;
  uf: string;
  /** Rua e número, como vai no schema (streetAddress). */
  rua: string;
  complemento?: string;
  bairro: string;
  cep: string;
  /** Só quando a coordenada é confiável; sem ela, o schema sai sem `geo`. */
  geo?: { lat: number; lng: number };
  linha: string;
  mapsEmbed: string;
  mapsRota: string;
};

function unidade(u: Omit<Unidade, 'linha' | 'mapsEmbed' | 'mapsRota'>): Unidade {
  const rua = u.complemento ? `${u.rua}, ${u.complemento}` : u.rua;
  const busca = `${u.rua}, ${u.bairro}, ${u.cidade} - ${u.uf}, ${u.cep}`;
  return {
    ...u,
    linha: `${rua} — ${u.bairro}, ${u.cidade} - ${u.uf}, ${u.cep}`,
    // Formato final do embed do Google Maps (sem chave de API). O atalho
    // /maps?q=...&output=embed redireciona para cá, e a resposta do redirecionamento
    // vem com X-Frame-Options: SAMEORIGIN — apontar direto evita o problema.
    mapsEmbed: `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${busca.replace(/ /g, '+')}`,
    mapsRota: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(busca)}`,
  };
}

/** A primeira unidade é a principal (a das páginas "... em Suzano"). */
export const UNIDADES: Unidade[] = [
  unidade({
    id: 'suzano',
    cidade: 'Suzano',
    uf: 'SP',
    rua: 'Rua Portugal Freixo, 25',
    bairro: 'Centro',
    cep: '08674-170',
    // Coordenadas da Rua Portugal Freixo (OpenStreetMap). Conferir com o Google Meu Negócio.
    geo: { lat: -23.539006, lng: -46.3121365 },
  }),
  unidade({
    id: 'ferraz-de-vasconcelos',
    cidade: 'Ferraz de Vasconcelos',
    uf: 'SP',
    rua: 'Praça da Independência, 25',
    complemento: 'sala 02',
    bairro: 'Centro',
    cep: '08500-010',
    // Ponto que o próprio embed do Google Maps devolve para este endereço.
    geo: { lat: -23.5417222, lng: -46.3685629 },
  }),
];

export const CIDADE = UNIDADES.map((u) => u.cidade).join(' e ');

export const CIDADES_ATENDIDAS = ['Suzano', 'Ferraz de Vasconcelos', 'Mogi das Cruzes', 'Poá'];

export const INSTAGRAM = 'https://www.instagram.com/dra.michele_/';
export const FACEBOOK = 'https://facebook.com/dramicheleherreira';

function whatsapp(mensagem: string) {
  return `https://wa.me/${TELEFONE.replace('+', '')}?text=${encodeURIComponent(mensagem)}`;
}

export const WA_AGENDAR = whatsapp(
  'Olá! Vim pelo site e gostaria de agendar uma avaliação com a Dra. Michele.'
);

export const WA_TRATAMENTOS = whatsapp(
  'Olá! Vim pelo site e gostaria de saber mais sobre os tratamentos.'
);

export function waSobreTratamento(tratamento: string) {
  return whatsapp(`Olá! Vim pelo site e gostaria de saber mais sobre ${tratamento}.`);
}

export function waAvaliacaoTratamento(tratamento: string) {
  return whatsapp(
    `Olá! Vim pelo site e gostaria de agendar uma avaliação para ${tratamento} com a Dra. Michele.`
  );
}

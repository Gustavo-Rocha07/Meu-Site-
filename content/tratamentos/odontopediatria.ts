import type { Tratamento } from '../tipos';

export const odontopediatria: Tratamento = {
  slug: 'odontopediatria',
  nome: 'Odontopediatria',
  nomeTitle: 'Odontopediatria',
  // No Search Console, "dentista infantil suzano" e "odontopediatra suzano"
  // apareciam na posição 3 sem nenhum clique: o title não dizia "dentista infantil".
  tituloSeo: 'Dentista Infantil em Suzano | Odontopediatria',
  description:
    'Dentista infantil em Suzano: odontopediatria dos 3 meses aos 15 anos, primeira consulta do bebê e prevenção sem trauma. Agende sua avaliação.',
  resumo:
    'Acompanhamento e prevenção para crianças dos 3 meses aos 15 anos, em consultas leves e no tempo de cada fase.',
  intro: [
    'Quem procura odontopediatra em Suzano normalmente quer duas coisas: cuidar dos dentes do filho e fazer isso sem trauma. Na clínica da Dra. Michele Herreira, o atendimento odontológico infantil vai dos 3 meses aos 15 anos, com foco em prevenção e em construir uma relação tranquila da criança com o dentista desde cedo.',
    'Aqui você encontra quando levar o bebê ao dentista pela primeira vez, como são as consultas e o que os pais podem fazer em casa.',
  ],
  imagem: {
    src: '/img/odontopediatria.jpeg',
    alt: 'Dra. Michele Herreira atendendo um bebê na primeira consulta no dentista, em Suzano',
    width: 960,
    height: 1280,
  },
  secoes: [
    {
      titulo: 'O que é odontopediatria',
      paragrafos: [
        'Odontopediatria é a área da odontologia que cuida da saúde bucal de bebês, crianças e adolescentes. Ela acompanha o nascimento dos dentes de leite, a troca pelos permanentes e o crescimento da face, e orienta a família sobre alimentação, higiene e hábitos como chupeta e mamadeira.',
        'O foco é prevenir. Uma criança acompanhada desde cedo tem mais chance de chegar à adolescência sem cáries e sem medo de dentista.',
        'Muitas famílias só procuram um dentista infantil quando aparece dor ou uma mancha escura no dente. Nessa hora, o tratamento já é mais longo e a primeira lembrança da criança no consultório tende a ser ruim. Começar pelas consultas de rotina, quando não há nada para tratar, permite que ela se acostume com o ambiente sem pressão — e que pequenos problemas sejam vistos cedo, quando ainda podem ser controlados só com orientação e flúor.',
      ],
    },
    {
      titulo: 'Com que idade levar o bebê ao dentista',
      paragrafos: [
        'A recomendação das associações de odontopediatria é que a primeira consulta aconteça quando nasce o primeiro dente ou, no máximo, até o primeiro aniversário. Na clínica, o acompanhamento pode começar ainda antes, a partir dos 3 meses, com orientação aos pais sobre limpeza da boca, amamentação e o que esperar da erupção dos dentes.',
        'A partir daí, os retornos costumam ser a cada seis meses, ou em intervalos menores quando há risco maior de cárie.',
      ],
    },
    {
      titulo: 'Como funciona a primeira consulta no dentista',
      paragrafos: [
        'Para o bebê, a consulta é rápida e acontece no colo do pai ou da mãe, na posição "joelho com joelho". A dentista examina gengiva, dentes e língua, avalia o risco de cárie e conversa com a família sobre escovação, creme dental com flúor, alimentação e hábitos.',
        'Para crianças maiores, a consulta segue o ritmo delas: primeiro conhecer o consultório, a cadeira e os instrumentos, depois o exame, a limpeza e a aplicação de flúor quando indicada. Procedimentos como restaurações e selantes são feitos quando a criança está pronta, sempre explicados antes.',
      ],
    },
    {
      titulo: 'Quanto tempo duram as consultas e o acompanhamento',
      paragrafos: [
        'As consultas de prevenção costumam durar de 30 a 45 minutos. O acompanhamento se estende por toda a infância e adolescência, com atenção especial a duas fases: a erupção dos primeiros molares permanentes, por volta dos 6 anos, e a troca dos dentes, que vai até os 12 ou 13 anos.',
      ],
    },
    {
      titulo: 'O tratamento infantil dói?',
      paragrafos: [
        'Consultas de prevenção não doem. Quando é preciso tratar uma cárie, é usado anestésico tópico antes da anestesia local, e a criança é preparada com explicações adequadas à idade. O objetivo é que ela saia da consulta sem experiências ruins.',
        'Quanto mais cedo começa o acompanhamento, menor a chance de a criança precisar de tratamentos invasivos — e é por isso que a prevenção vem primeiro.',
      ],
    },
    {
      titulo: 'Cuidados em casa',
      paragrafos: [
        'Antes dos dentes, a gengiva pode ser limpa com gaze ou dedeira umedecida. Com o primeiro dente, começa a escovação com escova infantil macia e creme dental com flúor (1.000 ppm ou mais), na quantidade de um grão de arroz até os 3 anos e de um grão de ervilha depois.',
        'Os pais devem escovar ou supervisionar a escovação até a criança ter coordenação para fazer sozinha, geralmente por volta dos 7 ou 8 anos. Evitar açúcar antes dos 2 anos, não deixar a criança dormir mamando e reduzir o consumo de doces entre as refeições fazem diferença.',
      ],
    },
    {
      titulo: 'O que influencia o valor do atendimento infantil',
      paragrafos: [
        'O valor depende do tipo de consulta e do que for necessário: prevenção, aplicação de flúor, selantes, restaurações ou tratamentos mais complexos. Uma criança em acompanhamento preventivo costuma precisar de menos intervenções ao longo dos anos.',
        'A avaliação inicial serve também para os pais tirarem dúvidas sobre alimentação, chupeta, mamadeira e escovação.',
      ],
    },
  ],
  faq: [
    {
      pergunta: 'Com que idade levar o bebê ao dentista?',
      resposta:
        'Quando nasce o primeiro dente ou até o primeiro aniversário. Na clínica, a orientação aos pais pode começar a partir dos 3 meses.',
    },
    {
      pergunta: 'Dente de leite precisa ser tratado se vai cair?',
      resposta:
        'Sim. Cárie em dente de leite causa dor, pode infeccionar e afetar o dente permanente que está se formando embaixo. O dente de leite também guarda espaço para o permanente.',
    },
    {
      pergunta: 'Posso usar pasta com flúor no bebê?',
      resposta:
        'Sim, a partir do primeiro dente, na quantidade de um grão de arroz. Essa é a recomendação atual para prevenir cáries com segurança.',
    },
    {
      pergunta: 'Meu filho tem medo de dentista. O que fazer?',
      resposta:
        'Evite usar o dentista como ameaça e conte sobre a consulta com naturalidade. No consultório, a criança conhece o ambiente antes e o atendimento respeita o tempo dela.',
    },
    {
      pergunta: 'Chupeta e dedo estragam os dentes?',
      resposta:
        'O uso prolongado pode alterar a posição dos dentes e o formato do céu da boca. O ideal é retirar aos poucos, com orientação, antes dos 3 anos.',
    },
    {
      pergunta: 'O que é selante?',
      resposta:
        'É uma resina fluida aplicada nos sulcos dos dentes de trás para dificultar o acúmulo de placa. É indicado em dentes com maior risco de cárie e não exige anestesia.',
    },
    {
      pergunta: 'De quanto em quanto tempo a criança deve ir ao dentista?',
      resposta:
        'Em geral a cada seis meses. Crianças com mais risco de cárie podem precisar de retornos mais frequentes.',
    },
  ],
  // Para os pais: a família costuma ser atendida na mesma clínica.
  relacionados: ['implante-dentario', 'clareamento-dental', 'estetica-do-sorriso'],
  artigo: 'com-que-idade-levar-o-bebe-ao-dentista',
  mensagem: 'odontopediatria (atendimento infantil)',
  procedimento: {
    naoInvasivo: true,
    comoE:
      'Consultas preventivas com exame, orientação à família, limpeza e aplicação de flúor; tratamentos restauradores quando necessários.',
    acompanhamento: 'Retornos a cada seis meses, ou em intervalos menores conforme o risco de cárie.',
  },
  atualizadoEm: '2026-10-27',
};

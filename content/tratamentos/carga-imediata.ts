import type { Tratamento } from '../tipos';

export const cargaImediata: Tratamento = {
  slug: 'carga-imediata',
  nome: 'Carga imediata',
  nomeTitle: 'Carga Imediata',
  description:
    'Implante com carga imediata em Suzano: quando o osso permite, você sai com dente provisório fixo no mesmo dia. Agende sua avaliação.',
  resumo:
    'Quando as condições ósseas permitem, a prótese provisória é instalada na mesma sessão da cirurgia, sem passar a cicatrização sem dentes.',
  intro: [
    'Implante com carga imediata em Suzano é a técnica que permite, em casos selecionados, instalar o implante e uma prótese provisória fixa na mesma consulta. É o que muita gente procura como "dente fixo no mesmo dia". Na clínica da Dra. Michele Herreira, a indicação é feita a partir da tomografia e da avaliação clínica, porque nem todo caso pode receber carga logo após a cirurgia.',
    'Esta página explica quando a técnica é possível, como funciona o dia da cirurgia e quais cuidados ela exige.',
  ],
  imagem: {
    src: '/img/cirurgia-2.jpeg',
    alt: 'Dra. Michele Herreira e equipe paramentadas durante cirurgia de implante com carga imediata',
    width: 960,
    height: 1280,
  },
  secoes: [
    {
      titulo: 'O que é a carga imediata',
      paragrafos: [
        'No protocolo convencional, o [implante dentário](/implante-dentario) fica alguns meses cicatrizando antes de receber a prótese. Na carga imediata, a prótese provisória é fixada ao implante em até 72 horas após a cirurgia — muitas vezes no mesmo dia.',
        'Essa prótese é provisória: tem formato e cor planejados, mas é feita para proteger a cicatrização, não para mastigar com força. Depois da osseointegração, ela é substituída pela prótese definitiva.',
        'A técnica pode ser usada para um único dente, para alguns dentes ou para a arcada inteira, no chamado protocolo dentário com carga imediata.',
      ],
    },
    {
      titulo: 'Para quem a carga imediata é indicada',
      paragrafos: [
        'O critério principal é a estabilidade do implante logo após a instalação, chamada de estabilidade primária. Ela depende da quantidade e da densidade do osso. Se o implante não fica firme o suficiente, colocar carga sobre ele aumenta o risco de falha — e o mais seguro é esperar.',
        'Costumam ser bons candidatos:',
      ],
      lista: [
        'Quem vai perder um dente da frente e não quer ficar sem ele durante o tratamento.',
        'Quem usa dentadura e deseja trocar por uma prótese fixa sobre implantes.',
        'Pacientes com osso em volume e densidade adequados, confirmados na tomografia.',
        'Pacientes sem bruxismo intenso ou com bruxismo controlado com placa.',
      ],
    },
    {
      titulo: 'Quando a carga imediata não é possível',
      paragrafos: [
        'Osso muito fino ou pouco denso, infecção ativa na região, necessidade de enxerto extenso e diabetes sem controle costumam contraindicar a carga imediata. Nesses casos, o implante é instalado e fica cicatrizando sem carga, e o paciente usa uma prótese provisória removível ou adesiva para não ficar sem dente. O prazo total é parecido; o que muda é o tipo de provisório no período de integração.',
      ],
    },
    {
      titulo: 'Como funciona o dia da cirurgia',
      paragrafos: [
        'Antes da cirurgia, o caso é planejado com tomografia, fotos e moldagem ou escaneamento. Em muitos casos, a prótese provisória já é preparada antes, a partir do planejamento digital.',
        'No dia, com anestesia local, os dentes comprometidos são removidos se necessário, os implantes são instalados e a estabilidade de cada um é medida. Se os valores forem adequados, a prótese provisória é adaptada e fixada. Se não forem, o plano muda para a carga tardia, com uma prótese provisória removível nesse intervalo — e isso é combinado com o paciente antes.',
      ],
    },
    {
      titulo: 'Quanto tempo leva o tratamento',
      paragrafos: [
        'A cirurgia com instalação do provisório pode levar de uma a algumas horas, conforme o número de implantes. O dente fixo vem no mesmo dia, mas o tratamento não termina aí: a osseointegração continua levando de três a seis meses.',
        'Só depois desse período é feita a prótese definitiva. Ao todo, é comum o tratamento completo levar de quatro a oito meses, dependendo do caso.',
      ],
    },
    {
      titulo: 'Carga imediata dói?',
      paragrafos: [
        'A cirurgia é feita com anestesia local, então não há dor durante o procedimento. No pós-operatório, o desconforto é parecido com o de um implante convencional: inchaço e sensibilidade nos primeiros dias, controlados com medicação.',
        'Em cirurgias de arcada completa, o inchaço pode ser maior e durar alguns dias a mais. Repouso e compressas frias ajudam.',
      ],
    },
    {
      titulo: 'Cuidados depois da carga imediata',
      paragrafos: [
        'O cuidado mais importante é com a alimentação. Nas primeiras semanas, a dieta deve ser pastosa ou macia, evitando morder alimentos duros com os dentes provisórios. É a falta desse cuidado que mais compromete a integração dos implantes.',
        'Também é preciso manter a higiene com escova macia e os produtos indicados, não fumar e comparecer aos retornos, nos quais a mordida é ajustada e a cicatrização é acompanhada.',
      ],
    },
    {
      titulo: 'O que influencia o valor da carga imediata',
      paragrafos: [
        'O valor varia conforme o número de implantes, a necessidade de extrações ou enxerto, o tipo e o material das próteses provisória e definitiva e os exames necessários. Um protocolo de arcada inteira e a reposição de um único dente são tratamentos muito diferentes.',
        'Por isso o orçamento é feito depois da avaliação. O resultado e o prazo variam de pessoa para pessoa.',
      ],
    },
  ],
  faq: [
    {
      pergunta: 'É possível sair com dente fixo no mesmo dia?',
      resposta:
        'Em casos selecionados, sim. Depende da estabilidade do implante medida durante a cirurgia. Se ela não for suficiente, o provisório fixo fica para depois da integração.',
    },
    {
      pergunta: 'O dente provisório é bonito?',
      resposta:
        'Ele é planejado para ter forma e cor adequadas ao sorriso, mas é feito em material mais simples que o definitivo. A prótese definitiva vem depois da osseointegração.',
    },
    {
      pergunta: 'Posso comer normalmente com a carga imediata?',
      resposta:
        'Não nas primeiras semanas. A alimentação deve ser macia para não sobrecarregar os implantes enquanto o osso se une a eles.',
    },
    {
      pergunta: 'Carga imediata tem mais risco de falhar?',
      resposta:
        'Quando bem indicada, os resultados são comparáveis aos da técnica convencional. O risco aumenta quando a técnica é usada sem estabilidade primária adequada ou quando os cuidados com a alimentação não são seguidos.',
    },
    {
      pergunta: 'Quem usa dentadura pode fazer carga imediata?',
      resposta:
        'Muitas vezes sim, trocando a dentadura por um protocolo fixo sobre implantes. A tomografia mostra se há osso suficiente para isso.',
    },
    {
      pergunta: 'Qual a diferença entre carga imediata e protocolo?',
      resposta:
        'Carga imediata é o momento em que a prótese é instalada (logo após a cirurgia). Protocolo é o tipo de prótese: uma arcada inteira fixa sobre implantes. Um protocolo pode ou não ser feito com carga imediata.',
    },
  ],
  casosMontados: ['carga-imediata-1'],
  destaque: 'carga-imediata-1',
  relacionados: ['implante-dentario', 'protese-dentaria', 'cirurgia-odontologica'],
  artigo: 'carga-imediata-dente-fixo-no-mesmo-dia',
  mensagem: 'implante com carga imediata',
  procedimento: {
    naoInvasivo: false,
    comoE:
      'Instalação de implantes e fixação de prótese provisória em até 72 horas, quando a estabilidade primária medida na cirurgia permite.',
    acompanhamento:
      'Dieta macia nas primeiras semanas, ajustes de mordida e troca pela prótese definitiva após a osseointegração.',
  },
  atualizadoEm: '2026-11-10',
};

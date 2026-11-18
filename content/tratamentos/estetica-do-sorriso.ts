import type { Tratamento } from '../tipos';

export const esteticaDoSorriso: Tratamento = {
  slug: 'estetica-do-sorriso',
  nome: 'Estética do sorriso',
  nomeTitle: 'Estética do Sorriso',
  description:
    'Estética do sorriso em Suzano: ajuste de cor, forma e proporção dos dentes, planejado e testado antes de qualquer desgaste. Agende sua avaliação.',
  resumo:
    'Ajuste de proporção, contorno e cor, planejado digitalmente e testado em ensaio na boca antes de qualquer desgaste definitivo.',
  intro: [
    'Estética do sorriso em Suzano é o conjunto de tratamentos que ajusta cor, formato, tamanho e proporção dos dentes e da gengiva para que o sorriso fique harmônico com o rosto. Também é chamada de harmonização do sorriso. Na clínica da Dra. Michele Herreira, o ponto de partida não é um procedimento pronto, e sim a queixa do paciente: o que incomoda ao sorrir, ao se ver em fotos, ao falar.',
    'A partir dessa conversa e do exame, é montado um plano que pode combinar clareamento, resina, lentes de contato dental ou facetas, cirurgia de gengiva e ortodontia.',
  ],
  imagem: {
    src: '/img/michele.png',
    alt: 'Dra. Michele Herreira, cirurgiã-dentista responsável pelos tratamentos de estética do sorriso',
    width: 571,
    height: 856,
  },
  secoes: [
    {
      titulo: 'O que é estética do sorriso',
      paragrafos: [
        'Estética do sorriso não é um procedimento único. É uma forma de planejar o tratamento olhando para o conjunto: a linha dos lábios, quanto da gengiva aparece, o tamanho e a cor dos dentes, a simetria entre os lados e a relação com o rosto.',
        'Os recursos mais usados são:',
      ],
      lista: [
        '[Clareamento dental](/clareamento-dental), para tons amarelados.',
        'Restaurações e facetas em resina composta, para pequenas correções de forma e fechamento de espaços.',
        '[Lente de contato dental](/lente-de-contato-dental) e faceta de porcelana, para mudanças maiores de cor e contorno.',
        'Gengivoplastia, para corrigir excesso ou assimetria de gengiva.',
        'Coroas e próteses, quando há dentes muito destruídos ou ausentes.',
      ],
    },
    {
      titulo: 'Para quem a estética do sorriso é indicada',
      paragrafos: [
        'É indicada para quem se incomoda com dentes escurecidos, desgastados, pequenos, com espaços ou desalinhamentos leves, ou com o "sorriso gengival" — quando aparece muita gengiva ao sorrir. Também serve para quem já fez tratamentos no passado e quer harmonizar restaurações antigas de cores diferentes.',
        'Antes de qualquer etapa estética, a boca precisa estar saudável: cáries, inflamação na gengiva e problemas de mordida são tratados primeiro. Às vezes a solução mais conservadora é a melhor, e isso é dito com clareza na avaliação.',
      ],
    },
    {
      titulo: 'Como funciona o planejamento',
      paragrafos: [
        'O tratamento começa com fotos do rosto e do sorriso, vídeos curtos e escaneamento ou moldagem dos dentes. Com esse material, o sorriso é planejado digitalmente e as proporções são definidas.',
        'O planejamento é transferido para a boca no ensaio (mock-up), uma resina provisória aplicada sobre os dentes sem desgaste. O paciente vê o resultado proposto no próprio rosto, pode mostrar para a família e pedir ajustes. Só depois de aprovado o ensaio começam as etapas definitivas.',
      ],
    },
    {
      titulo: 'Quanto tempo leva o tratamento',
      paragrafos: [
        'A ordem das etapas importa. Em geral, primeiro vêm os tratamentos de saúde (cáries, gengiva), depois a ortodontia se for necessária, então o clareamento e, por último, as restaurações, lentes ou coroas — porque a cor delas é escolhida a partir da cor final dos dentes naturais. Inverter essa ordem costuma gerar retrabalho.',
        'Depende das etapas. Um clareamento seguido de ajustes em resina pode ser concluído em poucas semanas. Planos com lentes de porcelana costumam levar de três a seis semanas. Quando é preciso ortodontia antes, o prazo passa a ser contado em meses. O cronograma é apresentado no planejamento.',
      ],
    },
    {
      titulo: 'Os procedimentos estéticos doem?',
      paragrafos: [
        'A maioria das etapas é feita sem dor. Preparos de dentes e cirurgias de gengiva são feitos com anestesia local. O clareamento pode causar sensibilidade passageira, e a gengiva pode ficar sensível por alguns dias após procedimentos próximos a ela.',
        'O ensaio e as resinas diretas, que costumam ser as primeiras etapas, em geral nem precisam de anestesia. Se você tem receio de algum procedimento, comente na avaliação: o plano pode ser ajustado ao seu ritmo.',
      ],
    },
    {
      titulo: 'Cuidados depois do tratamento estético',
      paragrafos: [
        'Escovação, fio dental e limpezas periódicas mantêm a gengiva saudável, o que é essencial para a aparência do sorriso. Resinas podem manchar e precisar de polimento ao longo do tempo; porcelanas mancham menos, mas também pedem cuidado com impactos.',
        'Quem range os dentes deve usar placa à noite. Os retornos periódicos servem para revisar a gengiva, polir restaurações e corrigir pequenos detalhes antes que virem problemas maiores.',
      ],
    },
    {
      titulo: 'O que influencia o valor da estética do sorriso',
      paragrafos: [
        'Como o plano combina diferentes procedimentos, o valor depende de quais etapas são necessárias, do número de dentes envolvidos e dos materiais escolhidos (resina ou porcelana, por exemplo). Tratamentos prévios de saúde bucal também entram na conta.',
        'Na avaliação, as alternativas são apresentadas com prazo e valor, das mais conservadoras às mais completas. O resultado varia conforme as condições de cada paciente.',
      ],
    },
  ],
  faq: [
    {
      pergunta: 'O que é harmonização do sorriso?',
      resposta:
        'É o planejamento estético dos dentes e da gengiva em conjunto, para que cor, tamanho e proporção fiquem equilibrados com o rosto. Pode envolver clareamento, resina, lentes e gengivoplastia.',
    },
    {
      pergunta: 'Posso ver como vai ficar antes de começar?',
      resposta:
        'Sim. O ensaio (mock-up) mostra o formato proposto diretamente na boca, sem desgaste, antes de qualquer etapa definitiva.',
    },
    {
      pergunta: 'Resina ou porcelana: qual escolher?',
      resposta:
        'A resina é mais conservadora e mais acessível, mas pode manchar e precisa de manutenção. A porcelana é mais estável na cor e no brilho. A escolha depende do caso e das expectativas.',
    },
    {
      pergunta: 'O que é sorriso gengival?',
      resposta:
        'É quando aparece muita gengiva ao sorrir. Dependendo da causa, pode ser tratado com gengivoplastia, que remodela a gengiva, ou com outras abordagens indicadas na avaliação.',
    },
    {
      pergunta: 'Preciso usar aparelho antes?',
      resposta:
        'Em desalinhamentos maiores, sim. A ortodontia antes da parte estética evita desgastes desnecessários e melhora o resultado final.',
    },
    {
      pergunta: 'Estética do sorriso tem resultado natural?',
      resposta:
        'O objetivo do planejamento é justamente esse: proporções compatíveis com o rosto e cor coerente com a idade e a pele. O paciente participa das escolhas no ensaio.',
    },
  ],
  casos: ['caso-2'],
  casosMontados: ['exemplo-3'],
  destaque: 'caso-2',
  relacionados: ['lente-de-contato-dental', 'clareamento-dental', 'protese-dentaria'],
  mensagem: 'estética do sorriso',
  procedimento: {
    naoInvasivo: true,
    comoE:
      'Planejamento digital do sorriso, ensaio em resina provisória e execução das etapas aprovadas (clareamento, resina, lentes, gengivoplastia).',
    acompanhamento: 'Revisões periódicas com polimento de restaurações e controle da gengiva.',
  },
  atualizadoEm: '2026-10-27',
};

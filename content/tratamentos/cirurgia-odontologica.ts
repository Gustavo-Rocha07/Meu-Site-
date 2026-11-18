import type { Tratamento } from '../tipos';

export const cirurgiaOdontologica: Tratamento = {
  slug: 'cirurgia-odontologica',
  nome: 'Cirurgia odontológica',
  nomeTitle: 'Cirurgia Odontológica',
  description:
    'Cirurgia odontológica em Suzano: extração de siso, enxerto ósseo dental e extrações com planejamento em tomografia. Agende sua avaliação.',
  resumo:
    'Extrações, extração de siso, enxertos ósseos e instalação de implantes com planejamento em tomografia e guia cirúrgico.',
  intro: [
    'A cirurgia odontológica em Suzano reúne procedimentos como extração de siso, extração de dentes comprometidos, enxerto ósseo dental e instalação de implantes. Na clínica da Dra. Michele Herreira, toda cirurgia é planejada a partir de exame clínico e imagens — radiografia panorâmica ou tomografia — para prever a anatomia da região e reduzir imprevistos.',
    'Abaixo, as indicações mais comuns, como é o dia da cirurgia e o que fazer na recuperação.',
  ],
  imagem: {
    src: '/img/cirurgia-1.jpeg',
    alt: 'Dra. Michele Herreira realizando cirurgia odontológica com assistente no consultório em Suzano',
    width: 960,
    height: 1280,
  },
  secoes: [
    {
      titulo: 'O que é cirurgia odontológica',
      paragrafos: [
        'São os procedimentos cirúrgicos feitos na boca, em geral com anestesia local e no próprio consultório. Os mais frequentes são:',
      ],
      lista: [
        'Extração de siso (terceiros molares), principalmente quando estão inclusos ou parcialmente nascidos.',
        'Extração de dentes que não podem ser recuperados, por fratura, cárie extensa ou doença periodontal.',
        'Enxerto ósseo dental, para recuperar o volume de osso antes de um implante.',
        'Instalação de [implante dentário](/implante-dentario), com ou sem [carga imediata](/carga-imediata).',
        'Pequenas cirurgias de gengiva e remoção de lesões para biópsia.',
      ],
    },
    {
      titulo: 'Para quem é indicada a extração de siso e outras cirurgias',
      paragrafos: [
        'A extração de siso é indicada quando o dente causa inflamação recorrente na gengiva (pericoronarite), cárie nele ou no dente vizinho, cistos, dor ou quando não há espaço para ele nascer corretamente. Siso bem posicionado, saudável e fácil de limpar pode ficar — a decisão é tomada com base no exame.',
        'O enxerto ósseo é indicado quando a perda de um dente, há meses ou anos, fez o osso diminuir a ponto de não comportar um implante. Pode ser feito com osso do próprio paciente ou com biomateriais.',
        'Algumas condições pedem cuidado extra antes de qualquer cirurgia: uso de anticoagulantes, medicamentos para osteoporose, diabetes, pressão alta descontrolada, gestação e tratamentos de radioterapia na região da cabeça e do pescoço. Por isso é importante informar todos os medicamentos e doenças na avaliação. Em alguns casos, a cirurgia é feita depois de conversar com o médico que acompanha o paciente.',
      ],
    },
    {
      titulo: 'Como funciona a cirurgia',
      paragrafos: [
        'Na consulta de avaliação, são vistos o histórico de saúde, os medicamentos em uso e os exames de imagem. Em sisos próximos ao nervo da mandíbula, a tomografia mostra essa relação com precisão. O paciente recebe as orientações pré-operatórias e, quando necessário, a prescrição de medicamentos.',
        'No dia, a região é anestesiada e o procedimento é feito com técnica e instrumental adequados ao caso. Ao final, é feita a sutura e o paciente recebe as orientações por escrito. A retirada dos pontos costuma ser feita entre sete e dez dias depois.',
      ],
    },
    {
      titulo: 'Quanto tempo leva a cirurgia e a recuperação',
      paragrafos: [
        'Uma extração simples pode levar poucos minutos; a remoção de sisos inclusos, de 30 minutos a mais de uma hora, conforme a posição e o número de dentes. A recuperação inicial costuma levar de três a sete dias.',
        'O enxerto ósseo exige mais tempo: em geral, de quatro a seis meses para o osso se consolidar antes da instalação do implante, dependendo da técnica e do tamanho do enxerto.',
      ],
    },
    {
      titulo: 'Cirurgia de siso dói?',
      paragrafos: [
        'Durante a cirurgia, não: a anestesia local bloqueia a dor. Depois, é esperado desconforto, inchaço e dificuldade para abrir a boca, com pico entre o segundo e o terceiro dia, controlados com a medicação prescrita.',
        'Dor que aumenta depois do terceiro ou quarto dia, mau gosto na boca ou febre não são esperados e devem ser comunicados à clínica, porque podem indicar alveolite ou infecção.',
      ],
    },
    {
      titulo: 'Cuidados depois da cirurgia',
      paragrafos: [
        'Nas primeiras 24 horas, não bocheche, não cuspa com força e não use canudo, para não deslocar o coágulo. Faça compressas frias no rosto, prefira alimentos frios ou mornos e pastosos e mantenha a cabeça mais elevada para dormir.',
        'Não fume e evite bebidas alcoólicas e esforço físico nos primeiros dias. A escovação continua normalmente nos outros dentes, com cuidado na região operada. Siga os horários da medicação e compareça ao retorno para retirada dos pontos.',
      ],
    },
    {
      titulo: 'O que influencia o valor da cirurgia odontológica',
      paragrafos: [
        'O valor depende do tipo de cirurgia, do grau de dificuldade (siso incluso e próximo ao nervo é diferente de uma extração simples), do número de dentes, da necessidade de tomografia e, no enxerto, do tipo e da quantidade de material.',
        'O orçamento é apresentado na avaliação, depois do exame. Cada caso tem evolução própria.',
      ],
    },
  ],
  faq: [
    {
      pergunta: 'Todo siso precisa ser extraído?',
      resposta:
        'Não. Sisos bem posicionados, saudáveis e que podem ser limpos corretamente podem ficar. A extração é indicada quando há problemas ou risco de problemas.',
    },
    {
      pergunta: 'Posso tirar os quatro sisos de uma vez?',
      resposta:
        'Em muitos casos, sim. A decisão depende da dificuldade de cada dente, da saúde do paciente e da preferência dele. Também é possível dividir em duas etapas, um lado de cada vez.',
    },
    {
      pergunta: 'Quanto tempo de repouso depois de tirar o siso?',
      resposta:
        'Em geral de dois a três dias de repouso relativo. Atividades físicas intensas devem esperar cerca de uma semana.',
    },
    {
      pergunta: 'O que é alveolite?',
      resposta:
        'É uma inflamação no local da extração quando o coágulo se desfaz ou infecciona. Causa dor forte alguns dias depois da cirurgia e precisa ser tratada no consultório.',
    },
    {
      pergunta: 'Enxerto ósseo dental é sempre necessário para implante?',
      resposta:
        'Não. Ele só é indicado quando falta osso para o implante. A tomografia mostra se o volume atual é suficiente.',
    },
    {
      pergunta: 'De onde vem o osso do enxerto?',
      resposta:
        'Pode ser do próprio paciente, retirado de outra região da boca, ou de biomateriais de origem animal ou sintética. A escolha depende do tamanho do defeito e do planejamento.',
    },
  ],
  relacionados: ['implante-dentario', 'carga-imediata', 'protese-dentaria'],
  mensagem: 'cirurgia odontológica (extração de siso, enxerto ou extração)',
  procedimento: {
    naoInvasivo: false,
    comoE:
      'Procedimento cirúrgico com anestesia local, planejado com radiografia panorâmica ou tomografia, seguido de sutura.',
    acompanhamento: 'Retorno para retirada dos pontos entre sete e dez dias e controle da cicatrização.',
  },
  atualizadoEm: '2026-10-27',
};

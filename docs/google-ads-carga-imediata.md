# Google Ads — Implante com carga imediata

Landing page: `https://www.dramicheleherreira.com/lp/implante-carga-imediata`

A página é `noindex` (não aparece no Google orgânico, para não competir com
`/carga-imediata`) e não tem o menu do site. Tudo nela leva a um de dois caminhos:
o formulário de avaliação ou o botão de WhatsApp.

## 1. Conversões (Google Tag Manager → Google Ads)

A página envia dois eventos para o `dataLayer` da tag `GTM-K6FRHJCM`:

| Evento | Quando | Parâmetros |
|---|---|---|
| `lp_formulario_envio` | Enviou o formulário (lead qualificado) | `situacao`, `unidade`, `prazo` |
| `lp_whatsapp_clique` | Clicou em um botão de WhatsApp | `posicao` (`topo`, `hero`, `barra-fixa`) |

No Tag Manager (tagmanager.google.com, contêiner GTM-K6FRHJCM):

1. **Acionadores → Novo → Evento personalizado**
   - Nome do evento: `lp_formulario_envio` → salvar como "LP – formulário"
   - Nome do evento: `lp_whatsapp_clique` → salvar como "LP – WhatsApp"
2. **Variáveis → Nova → Variável da camada de dados**: `situacao`, `unidade`,
   `prazo`, `posicao` (opcional, para relatórios).
3. No Google Ads, crie duas ações de conversão (Metas → Conversões → Nova →
   Site → configurar manualmente):
   - "Lead formulário carga imediata" — categoria *Enviar formulário de lead*,
     **principal**, contagem *Uma*.
   - "Clique WhatsApp LP" — categoria *Contato*, **secundária** (a de formulário
     é mais qualificada; deixar o WhatsApp como secundária evita que o lance
     otimize para cliques curiosos).
4. No Tag Manager, crie uma tag **Acompanhamento de conversões do Google Ads**
   para cada ação (ID e rótulo vêm do Google Ads), cada uma com o seu acionador.
   Crie também a tag **Vinculador de conversões** com acionador *All Pages*.
5. Visualize (Preview), envie o formulário de teste na LP e confira se a tag
   dispara. Depois, **Enviar** para publicar o contêiner.

## 2. Campanha sugerida

- **Tipo:** Pesquisa (não Performance Max no começo — com pouca verba, Pesquisa
  dá controle sobre os termos e traz lead mais qualificado).
- **Local:** Suzano, Ferraz de Vasconcelos, Mogi das Cruzes, Poá e
  Itaquaquecetuba, com "Presença: pessoas que estão ou estiveram regularmente
  nos locais" (não "interesse").
- **Programação:** todos os dias; o formulário funciona fora do horário, e a
  equipe responde no dia seguinte.
- **Lances:** começar com *Maximizar cliques* com CPC máximo por 2–3 semanas;
  quando tiver ~15–30 conversões de formulário, trocar para *Maximizar
  conversões* (ou CPA desejado).
- **URL final:** a LP acima. Modelo de acompanhamento (opcional):
  `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=carga-imediata&utm_term={keyword}`

### Palavras-chave (correspondência de frase ou exata)

- "implante carga imediata", [implante carga imediata suzano]
- "dente fixo no mesmo dia", "implante dentário no mesmo dia"
- "implante dentário suzano", "implante dentário ferraz de vasconcelos"
- "protocolo dentário", "trocar dentadura por implante", "dentadura fixa"
- "implante dentário mogi das cruzes"

### Palavras negativas (adicionar desde o primeiro dia)

grátis, gratuito, SUS, faculdade, curso, preço de custo, como fazer, emprego,
vaga, auxiliar, técnico, mercado livre, dentadura barata, implante capilar,
implante de silicone, cachorro, veterinário, pdf, o que é

### Anúncio responsivo — títulos (até 30 caracteres)

- Implante Carga Imediata
- Dentes Fixos no Mesmo Dia*
- Avaliação Sem Custo
- Implantes em Suzano e Ferraz
- 25+ Anos em Implantodontia
- Planejamento com Tomografia
- Agende pelo WhatsApp
- Troque a Dentadura por Fixo

\* O Google aceita, mas a descrição deve deixar claro "em casos indicados"
(regra do CFO e boa prática para não gerar expectativa errada).

### Descrições (até 90 caracteres)

- Em casos indicados, você sai com dentes provisórios fixos no mesmo dia. Agende.
- Avaliação sem custo em Suzano e Ferraz. Plano com prazo e valor antes de começar.
- Dra. Michele Herreira, CRO-SP 71275. Mais de 25 anos em implantes e reabilitação.

### Recursos

- **Local:** vincular o Perfil da Empresa no Google (as duas unidades).
- **Ligação/WhatsApp:** (11) 99144-4710.
- **Sitelinks:** Casos reais, Como funciona, Dúvidas, Agendar avaliação —
  todos para a LP com âncoras (`#avaliacao`, `#perguntas`).
- **Imagens:** foto da doutora e o antes/depois de carga imediata (já
  autorizados para o site).

## 3. Regras do CFO (lembrar ao escrever anúncios)

Sem preço ou "promoção" como chamariz, sem promessa de resultado ("garantido",
"sem dor", "o melhor"), sempre com nome e CRO da responsável técnica, e casos
de pacientes só com autorização por escrito.

## 4. O que acompanhar

- Taxa de conversão da LP (formulários ÷ cliques). Referência para saúde:
  5–10% é bom; abaixo de 3%, revisar termos de pesquisa e anúncio.
- Relatório **Termos de pesquisa** toda semana nas primeiras semanas:
  negativar o que não tem intenção de tratamento.
- Na clínica: marcar quais mensagens do WhatsApp vieram "pelo anúncio do Google"
  (a mensagem já chega com essa frase) e quantas viraram avaliação e tratamento.

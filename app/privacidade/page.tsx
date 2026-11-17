import PageShell from '@/components/PageShell';
import Breadcrumb from '@/components/Breadcrumb';
import { EMAIL, NOME_CLINICA, TELEFONE_EXIBICAO, UNIDADES } from '@/lib/contato';
import { metadataPagina } from '@/lib/seo';

export const metadata = metadataPagina({
  title: 'Política de Privacidade',
  description:
    'Como o site da Dra. Michele Herreira trata dados pessoais, cookies e contatos pelo WhatsApp, conforme a LGPD.',
  path: '/privacidade',
});

const ATUALIZADA_EM = '17 de novembro de 2026';

const secoes = [
  {
    titulo: 'Quem é o responsável pelos dados',
    texto: [
      `${NOME_CLINICA}, com atendimento em ${UNIDADES.map((u) => u.linha).join(' e em ')}. Contato para assuntos de privacidade: ${EMAIL} ou WhatsApp ${TELEFONE_EXIBICAO}.`,
    ],
  },
  {
    titulo: 'Quais dados coletamos e para quê',
    texto: [
      'Formulário de avaliação: o nome e as respostas que você escolhe (situação, unidade e prazo) são usados apenas para montar a mensagem que abre no WhatsApp da clínica. O site não guarda essas informações; elas só chegam à clínica se você enviar a mensagem.',
      'Conversas pelo WhatsApp e telefone: usamos os dados que você nos passa para agendar e realizar o atendimento, com base no seu pedido e na execução do atendimento.',
      'Navegação: o site usa a tag do Google (Google Tag Manager e, quando configurados, Google Analytics e Google Ads) para medir visitas e saber quais anúncios geram contatos. Essas ferramentas usam cookies e dados de navegação, como páginas vistas, tipo de dispositivo e cidade aproximada.',
    ],
  },
  {
    titulo: 'Com quem compartilhamos',
    texto: [
      'Com o Google, como fornecedor das ferramentas de medição e anúncios, e com o WhatsApp (Meta), quando você escolhe falar conosco por lá. Não vendemos dados pessoais.',
    ],
  },
  {
    titulo: 'Cookies',
    texto: [
      'Você pode bloquear ou apagar cookies nas configurações do seu navegador a qualquer momento. Isso não impede o uso do site nem o contato com a clínica.',
    ],
  },
  {
    titulo: 'Por quanto tempo guardamos',
    texto: [
      'Os dados de atendimento seguem os prazos de guarda do prontuário odontológico previstos nas normas do Conselho Federal de Odontologia. Os dados de navegação seguem os prazos de retenção configurados nas ferramentas do Google.',
    ],
  },
  {
    titulo: 'Seus direitos',
    texto: [
      'Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir a confirmação de que tratamos seus dados, acesso, correção, anonimização ou eliminação, informações sobre compartilhamento e a revogação de consentimento. Basta escrever para o contato acima.',
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <PageShell>
      <header className="bg-cream">
        <div className="container-main pb-12 pt-28 lg:pt-32">
          <Breadcrumb
            migalhas={[
              { nome: 'Início', path: '/' },
              { nome: 'Política de privacidade', path: '/privacidade' },
            ]}
          />
          <h1 className="section-heading mt-8 text-4xl lg:text-5xl">Política de privacidade</h1>
          <p className="mt-4 text-sm text-muted">Atualizada em {ATUALIZADA_EM}</p>
        </div>
      </header>
      <section className="section-py bg-white">
        <article className="container-main max-w-3xl space-y-10">
          {secoes.map((s) => (
            <section key={s.titulo}>
              <h2 className="section-heading text-3xl">{s.titulo}</h2>
              {s.texto.map((p) => (
                <p key={p} className="mt-4 text-[16px] leading-relaxed text-charcoal/90">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </section>
    </PageShell>
  );
}

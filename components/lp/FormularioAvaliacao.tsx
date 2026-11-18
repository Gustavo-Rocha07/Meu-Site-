'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Lock } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import { TELEFONE, UNIDADES } from '@/lib/contato';
import { registrarConversao } from '@/lib/conversao';

const SITUACOES = [
  'Perdi um dente',
  'Perdi vários dentes',
  'Uso dentadura ou ponte móvel',
  'Tenho dentes que precisam ser extraídos',
];

const PRAZOS = ['O quanto antes', 'Nos próximos 3 meses', 'Ainda estou pesquisando'];

type Escolha = {
  numero: number;
  rotulo: string;
  nome: string;
  opcoes: string[];
  valor: string;
  definir: (v: string) => void;
  erro: boolean;
  /** Opções curtas (ex.: unidades) ficam lado a lado também no celular. */
  duasColunas?: boolean;
};

/**
 * Pergunta de múltipla escolha. No celular as opções são cartões de largura
 * inteira (alvo de toque grande); a partir do tablet viram pílulas lado a lado.
 */
function Opcoes({ numero, rotulo, nome, opcoes, valor, definir, erro, duasColunas }: Escolha) {
  return (
    <fieldset aria-invalid={erro || undefined}>
      <legend className="flex items-center gap-2.5 text-[15px] font-medium text-dark">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-dark text-xs text-white">{numero}</span>
        {rotulo}
      </legend>
      <div
        className={`mt-3 grid gap-2 ${duasColunas ? 'grid-cols-2' : 'grid-cols-1'} sm:flex sm:flex-wrap`}
        role="radiogroup"
      >
        {opcoes.map((o) => {
          const marcado = valor === o;
          return (
            <label
              key={o}
              className={`flex cursor-pointer items-center rounded-xl border py-3.5 leading-snug
                          ${duasColunas ? 'gap-2.5 px-3 text-[14px]' : 'gap-3 px-4 text-[15px]'}
                          transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold
                          sm:rounded-full sm:py-2.5 sm:text-sm ${
                            marcado
                              ? 'border-dark bg-dark text-white'
                              : erro
                                ? 'border-red-300 bg-surface text-dark'
                                : 'border-border bg-surface text-dark hover:border-dark/40'
                          }`}
            >
              <input
                type="radio"
                name={nome}
                value={o}
                checked={marcado}
                onChange={() => definir(o)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border sm:hidden ${
                  marcado ? 'border-white bg-white text-dark' : 'border-dark/30'
                }`}
              >
                {marcado && <Check size={13} strokeWidth={3} />}
              </span>
              {o}
            </label>
          );
        })}
      </div>
      {erro && <p className="mt-2 text-sm text-red-700">Escolha uma opção.</p>}
    </fieldset>
  );
}

/**
 * Formulário curto que qualifica o lead antes do WhatsApp: a clínica já recebe a
 * mensagem dizendo a situação, a unidade e a urgência. Não há back-end — os dados
 * vão direto para o WhatsApp da clínica e não ficam salvos no site.
 */
export default function FormularioAvaliacao() {
  const [nome, setNome] = useState('');
  const [situacao, setSituacao] = useState('');
  const [unidade, setUnidade] = useState('');
  const [prazo, setPrazo] = useState('');
  const [tentou, setTentou] = useState(false);
  const [link, setLink] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const faltando = {
    nome: nome.trim().length < 2,
    situacao: !situacao,
    unidade: !unidade,
    prazo: !prazo,
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    if (Object.values(faltando).some(Boolean)) {
      // Leva a pessoa até o primeiro campo que falta, em vez de um alerta genérico.
      const primeiro = (Object.keys(faltando) as (keyof typeof faltando)[]).find((k) => faltando[k]);
      const el = formRef.current?.querySelector<HTMLElement>(primeiro === 'nome' ? '#lp-nome' : `[name="${primeiro}"]`);
      el?.closest('fieldset, div')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (primeiro === 'nome') el?.focus();
      return;
    }

    const mensagem = [
      'Olá! Vim pelo anúncio do Google e quero agendar uma avaliação para implante com carga imediata.',
      `Nome: ${nome.trim()}`,
      `Situação: ${situacao}`,
      `Unidade: ${unidade}`,
      `Quando quero começar: ${prazo}`,
    ].join('\n');
    const url = `https://wa.me/${TELEFONE.replace('+', '')}?text=${encodeURIComponent(mensagem)}`;

    registrarConversao({ event: 'lp_formulario_envio', situacao, unidade, prazo });
    setLink(url);
    // Se o navegador bloquear a nova aba, o botão da tela de confirmação resolve.
    if (!window.open(url, '_blank', 'noopener')) window.location.href = url;
  };

  if (link) {
    return (
      <div className="rounded-2xl border border-border bg-cream p-7 text-center shadow-sm sm:p-9">
        <CheckCircle2 size={40} className="mx-auto text-gold-dark" aria-hidden="true" />
        <p className="mt-4 font-cormorant text-3xl text-dark">Tudo certo, {nome.trim().split(' ')[0]}!</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Abrimos o WhatsApp da clínica com a sua mensagem pronta. É só tocar em enviar para a
          equipe responder e marcar o melhor horário.
        </p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full sm:w-auto">
          <WhatsAppIcon size={17} />
          Abrir o WhatsApp de novo
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={enviar}
      noValidate
      className="space-y-7 rounded-2xl border border-border bg-cream p-5 shadow-sm sm:p-8"
    >
      <div className="border-b border-border pb-5">
        <p className="font-cormorant text-2xl leading-tight text-dark sm:text-3xl">Agende sua avaliação</p>
        <p className="mt-1 text-sm text-muted">4 respostas rápidas · leva menos de 1 minuto</p>
      </div>

      <div>
        <label htmlFor="lp-nome" className="flex items-center gap-2.5 text-[15px] font-medium text-dark">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-dark text-xs text-white">1</span>
          Seu nome
        </label>
        <input
          id="lp-nome"
          type="text"
          autoComplete="given-name"
          autoCapitalize="words"
          enterKeyHint="next"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Como podemos te chamar?"
          aria-invalid={(tentou && faltando.nome) || undefined}
          className={`mt-3 w-full rounded-xl border bg-surface px-4 py-3.5 text-[16px] text-dark outline-none
                      transition-colors placeholder:text-muted/70 focus:border-dark ${
                        tentou && faltando.nome ? 'border-red-300' : 'border-border'
                      }`}
        />
        {tentou && faltando.nome && <p className="mt-2 text-sm text-red-700">Digite seu nome.</p>}
      </div>

      <Opcoes
        numero={2}
        rotulo="Qual é a sua situação hoje?"
        nome="situacao"
        opcoes={SITUACOES}
        valor={situacao}
        definir={setSituacao}
        erro={tentou && faltando.situacao}
      />
      <Opcoes
        numero={3}
        rotulo="Qual unidade fica melhor?"
        nome="unidade"
        opcoes={UNIDADES.map((u) => u.cidade)}
        valor={unidade}
        definir={setUnidade}
        erro={tentou && faltando.unidade}
        duasColunas
      />
      <Opcoes
        numero={4}
        rotulo="Quando gostaria de começar?"
        nome="prazo"
        opcoes={PRAZOS}
        valor={prazo}
        definir={setPrazo}
        erro={tentou && faltando.prazo}
      />

      <div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 text-base
                     font-semibold text-white shadow-lg shadow-black/10 transition-colors hover:bg-[#1FB855]
                     active:scale-[0.99]"
        >
          <WhatsAppIcon size={19} />
          Quero agendar minha avaliação
          <ArrowRight size={17} aria-hidden="true" />
        </button>
        <p className="mt-3 text-center text-xs text-muted">Ao enviar, o WhatsApp abre com a sua mensagem pronta.</p>
      </div>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Lock size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>
          Suas respostas vão direto para o WhatsApp da clínica e não ficam salvas no site. Veja a{' '}
          <a href="/privacidade" className="underline underline-offset-2">política de privacidade</a>.
        </span>
      </p>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
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

type Escolha = { rotulo: string; nome: string; opcoes: string[]; valor: string; definir: (v: string) => void };

function Opcoes({ rotulo, nome, opcoes, valor, definir }: Escolha) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-dark">{rotulo}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {opcoes.map((o) => {
          const marcado = valor === o;
          return (
            <label
              key={o}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors
                          has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
                            marcado
                              ? 'border-dark bg-dark text-white'
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
                required
              />
              {o}
            </label>
          );
        })}
      </div>
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
  const [link, setLink] = useState('');

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="rounded-2xl border border-border bg-surface p-7 text-center sm:p-9">
        <CheckCircle2 size={36} className="mx-auto text-gold-dark" aria-hidden="true" />
        <p className="mt-4 font-cormorant text-3xl text-dark">Tudo certo, {nome.trim().split(' ')[0]}!</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Abrimos o WhatsApp da clínica com a sua mensagem pronta. É só enviar para a equipe
          responder e marcar o melhor horário.
        </p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
          <WhatsAppIcon size={17} />
          Abrir o WhatsApp de novo
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div>
        <label htmlFor="lp-nome" className="text-sm font-medium text-dark">
          Seu nome
        </label>
        <input
          id="lp-nome"
          type="text"
          autoComplete="given-name"
          required
          minLength={2}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Como podemos te chamar?"
          className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 text-[16px] text-dark
                     outline-none transition-colors placeholder:text-muted/70 focus:border-dark"
        />
      </div>

      <Opcoes rotulo="Qual é a sua situação hoje?" nome="situacao" opcoes={SITUACOES} valor={situacao} definir={setSituacao} />
      <Opcoes
        rotulo="Qual unidade fica melhor para você?"
        nome="unidade"
        opcoes={UNIDADES.map((u) => u.cidade)}
        valor={unidade}
        definir={setUnidade}
      />
      <Opcoes rotulo="Quando gostaria de começar?" nome="prazo" opcoes={PRAZOS} valor={prazo} definir={setPrazo} />

      <button type="submit" className="btn-primary group w-full py-4 text-base">
        <WhatsAppIcon size={18} />
        Quero minha avaliação sem custo
        <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Lock size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
        Suas respostas vão direto para o WhatsApp da clínica e não ficam salvas no site. Veja a{' '}
        <a href="/privacidade" className="underline underline-offset-2">política de privacidade</a>.
      </p>
    </form>
  );
}

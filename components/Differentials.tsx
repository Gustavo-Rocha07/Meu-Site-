'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const etapas = [
  {
    titulo: 'Avaliação',
    texto:
      'Anamnese, exame clínico e imagens. É nessa consulta que se define o que está acontecendo e o que você espera do tratamento.',
  },
  {
    titulo: 'Planejamento',
    texto:
      'O caso é planejado digitalmente e, quando aplicável, o resultado é simulado antes de começar. Opções, prazos e valores são apresentados por escrito.',
  },
  {
    titulo: 'Execução',
    texto:
      'Procedimentos realizados com protocolo de biossegurança e guia cirúrgico quando indicado, respeitando o ritmo e o conforto do paciente.',
  },
  {
    titulo: 'Acompanhamento',
    texto:
      'Retornos programados para ajuste e manutenção. Implante e prótese precisam de acompanhamento periódico para durar.',
  },
];

export default function Differentials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-py bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-badge mb-5">Como funciona</span>
          <h2 className="section-heading text-4xl lg:text-5xl">
            Do primeiro contato ao acompanhamento
          </h2>
        </motion.div>

        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {etapas.map((e, i) => (
            <motion.li
              key={e.titulo}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="border-t border-dark pt-5"
            >
              <span className="font-cormorant text-sm text-gold-dark">
                Etapa {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-cormorant text-2xl text-dark">{e.titulo}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{e.texto}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

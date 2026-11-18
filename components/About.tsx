'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import WhatsAppIcon from './WhatsAppIcon';
import { WA_AGENDAR } from '@/lib/contato';

const atuacao = [
  'Implantodontia',
  'Carga imediata',
  'Prótese dentária',
  'Estética do sorriso',
  'Odontopediatria',
  'Prevenção infantil',
];

const dados = [
  { valor: 'CRO-SP 71275', rotulo: 'Registro profissional' },
  { valor: '25+ anos', rotulo: 'De clínica' },
  { valor: 'Suzano e Ferraz', rotulo: 'Unidades' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sobre" ref={ref} className="section-py bg-cream">
      <div className="container-main">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-dark/5">
              <Image
                src="/img/atendendo.jpeg"
                alt="Dra. Michele Herreira durante atendimento no consultório em Suzano"
                width={960}
                height={1280}
                sizes="(max-width: 1024px) calc(100vw - 48px), 460px"
                className="h-full w-full object-cover"
              />
            </div>

            <dl className="mt-6 divide-y divide-border border-y border-border">
              {dados.map((d) => (
                <div key={d.rotulo} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-xs uppercase tracking-wider text-muted">{d.rotulo}</dt>
                  <dd className="font-cormorant text-lg text-dark">{d.valor}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:pt-4"
          >
            <span className="section-badge mb-5">A doutora</span>
            <h2 className="section-heading text-4xl lg:text-5xl">Michele Herreira</h2>

            <div className="mt-7 space-y-5 leading-relaxed text-muted">
              <p>
                Cirurgiã-dentista inscrita no CRO-SP sob o número 71275, atua há mais
                de 25 anos em implantodontia e reabilitação oral.
              </p>
              <p>
                O trabalho reúne dois lados: a reabilitação de adultos — implantes,
                próteses fixas e estética do sorriso — e a odontopediatria, com
                acompanhamento e prevenção das crianças dos 3 meses aos 15 anos.
              </p>
              <p>
                Cada plano de tratamento é montado a partir do exame clínico e das
                imagens, apresentado ao paciente antes de começar e revisto sempre que
                o caso pede.
              </p>
            </div>

            <h3 className="mt-10 text-xs uppercase tracking-[0.18em] text-muted">
              Áreas de atuação
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {atuacao.map((a) => (
                <li
                  key={a}
                  className="border-b border-border py-2.5 text-[15px] text-dark"
                >
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={WA_AGENDAR}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <WhatsAppIcon size={17} />
                Falar com a clínica
              </a>
              <Link href="/sobre" className="btn-outline">
                Conheça a doutora
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

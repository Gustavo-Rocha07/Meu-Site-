'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { HeartHandshake, ShieldCheck, Smile } from 'lucide-react';
import Link from 'next/link';
import WhatsAppIcon from './WhatsAppIcon';
import { waSobreTratamento } from '@/lib/contato';

const marcos = [
  { idade: '3 meses', nota: 'Primeira orientação' },
  { idade: '1º dente', nota: 'Acompanhamento' },
  { idade: '3–6 anos', nota: 'Prevenção de cáries' },
  { idade: 'Até 15 anos', nota: 'Troca e crescimento' },
];

const pilares = [
  { icone: ShieldCheck, titulo: 'Prevenção', texto: 'Cuidar antes de tratar, com acompanhamento periódico.' },
  { icone: Smile, titulo: 'Sem trauma', texto: 'Consultas leves, no tempo da criança.' },
  { icone: HeartHandshake, titulo: 'Junto da família', texto: 'Orientação para os pais em cada fase.' },
];

export default function Odontopediatria() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="odontopediatria" ref={ref} className="section-py bg-cream">
      <div className="container-main">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
          {/* Foto com marcos flutuando */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[420px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-dark/5 shadow-xl">
              <Image
                src="/img/odontopediatria.jpeg"
                alt="Dra. Michele Herreira atendendo um bebê no consultório, em Suzano"
                width={960}
                height={1280}
                sizes="(max-width: 468px) calc(100vw - 48px), 420px"
                className="h-full w-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="absolute -right-3 top-6 rounded-2xl border border-border bg-surface/95
                         px-4 py-3 text-center shadow-lg backdrop-blur-sm lg:-right-6"
            >
              <p className="font-cormorant text-3xl leading-none text-dark">3m</p>
              <p className="mt-1 text-[11px] text-muted">primeira visita</p>
            </motion.div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="section-badge mb-5">Para os pequenos</span>
            <h2 className="section-heading text-4xl lg:text-5xl">
              Odontopediatria e prevenção
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">
              Um programa de acompanhamento dos 3 meses aos 15 anos, com foco em
              prevenir problemas e criar uma relação tranquila da criança com o dentista.
              Para quem procura dentista infantil em Suzano, a primeira consulta do bebê
              pode acontecer antes mesmo do primeiro dente.
            </p>

            {/* Linha do tempo de idades */}
            <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {marcos.map((m, i) => (
                <motion.li
                  key={m.idade}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="rounded-xl border border-border bg-surface p-3 text-center"
                >
                  <p className="font-cormorant text-lg leading-tight text-gold-dark">{m.idade}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted">{m.nota}</p>
                </motion.li>
              ))}
            </ol>

            {/* Pilares */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {pilares.map((p, i) => {
                const Icone = p.icone;
                return (
                  <motion.div
                    key={p.titulo}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  >
                    <Icone size={20} className="text-gold-dark" aria-hidden="true" />
                    <h3 className="mt-2.5 text-sm font-semibold text-dark">{p.titulo}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-muted">{p.texto}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={waSobreTratamento('o programa de odontopediatria e prevenção infantil')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <WhatsAppIcon size={17} />
                Cuidar do sorriso do meu filho
              </a>
              <Link href="/odontopediatria" className="btn-outline">
                Odontopediatria em Suzano
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

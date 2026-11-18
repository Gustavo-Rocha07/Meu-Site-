'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Comparador from './Comparador';
import { casos } from '@/lib/casos';

export default function Results() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="resultados" ref={ref} className="section-py bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-badge mb-5">Casos clínicos</span>
          <h2 className="section-heading text-4xl lg:text-5xl">
            Antes e depois, sem retoque
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            Arraste o divisor de cada foto para ver o mesmo paciente antes e depois
            do tratamento. As duas imagens de cada caso usam o mesmo enquadramento e
            a mesma escala, para que a comparação seja honesta.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {casos.map((caso, i) => (
            <motion.div
              key={caso.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Comparador caso={caso} />
            </motion.div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-muted">
          Imagens de pacientes reais, publicadas com autorização. Cada caso é único:
          o resultado depende das condições clínicas iniciais, do plano de tratamento
          escolhido e da resposta de cada organismo.
        </p>
      </div>
    </section>
  );
}

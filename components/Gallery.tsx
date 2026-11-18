'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { casosMontados as casos } from '@/lib/casos';

// Os dados dos casos ficam em lib/casos.ts, junto com os do comparador.

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-white pb-20 lg:pb-28">
      <div className="container-main">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.18em] text-muted"
        >
          Outros casos
        </motion.h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {casos.map((caso, i) => (
            <motion.div
              key={caso.src}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.07 }}
              className="relative aspect-square overflow-hidden rounded-xl bg-dark/5
                         ring-1 ring-dark/10"
            >
              {/* A grade é quadrada; a foto em retrato (carga imediata) é recortada no centro, onde fica o sorriso. */}
              <Image
                src={caso.src}
                alt={caso.alt}
                width={caso.width}
                height={caso.height}
                sizes="(max-width: 640px) calc(100vw - 48px), 340px"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

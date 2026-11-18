'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ATENÇÃO: confirmar a origem destes depoimentos antes de publicar.
 * Depoimento de paciente em publicidade odontológica é assunto sensível no
 * Código de Ética Odontológica — o ideal é usar avaliações reais e verificáveis
 * (Google Meu Negócio, por exemplo) ou remover a seção.
 */
const depoimentos = [
  {
    nome: 'Carla Menezes',
    tratamento: 'Implante com carga imediata',
    texto:
      'A Dra. Michele foi extremamente atenciosa e profissional. Explicou todo o processo com clareza e me deixou completamente tranquila. O resultado superou todas as minhas expectativas.',
  },
  {
    nome: 'Juliana Prado',
    tratamento: 'Reabilitação oral completa',
    texto:
      'Profissional cuidadosa, consultório moderno e atendimento humanizado. Me senti segura durante todo o tratamento. Recomendo sem hesitação.',
  },
  {
    nome: 'Renato Silva',
    tratamento: 'Carga imediata',
    texto:
      'Fiz implante com carga imediata e fiquei impressionado com o resultado. Saí com os dentes fixos no mesmo dia. Profissionalismo e tecnologia de primeira.',
  },
  {
    nome: 'Ana Luiza Costa',
    tratamento: 'Lentes de contato dental',
    texto:
      'Sempre quis um sorriso mais harmônico e a Dra. Michele conseguiu isso. O resultado ficou completamente natural. Toda a equipe é muito acolhedora.',
  },
  {
    nome: 'Marcos Fernandes',
    tratamento: 'Estética do sorriso',
    texto:
      'O planejamento digital foi o que me convenceu: consegui ver o resultado antes de iniciar o tratamento. A precisão e o cuidado em cada detalhe são impressionantes.',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [inicio, setInicio] = useState(0);

  const anterior = () =>
    setInicio((i) => (i - 1 + depoimentos.length) % depoimentos.length);
  const proximo = () => setInicio((i) => (i + 1) % depoimentos.length);

  const visiveis = [0, 1, 2].map((n) => depoimentos[(inicio + n) % depoimentos.length]);

  return (
    <section id="depoimentos" ref={ref} className="section-py bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <span className="section-badge mb-5">Depoimentos</span>
            <h2 className="section-heading text-4xl lg:text-5xl">
              O que dizem os pacientes
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={anterior}
              aria-label="Depoimento anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border
                         border-border text-muted transition-colors hover:border-dark/30 hover:text-dark"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={proximo}
              aria-label="Próximo depoimento"
              className="flex h-11 w-11 items-center justify-center rounded-full border
                         border-border text-muted transition-colors hover:border-dark/30 hover:text-dark"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        <div
          aria-live="polite"
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visiveis.map((d, i) => (
            <motion.figure
              key={`${d.nome}-${inicio}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`flex flex-col justify-between gap-6 rounded-xl border border-border
                          bg-cream p-7 ${i === 2 ? 'hidden lg:flex' : ''}`}
            >
              <blockquote className="font-cormorant text-[19px] leading-relaxed text-dark">
                &ldquo;{d.texto}&rdquo;
              </blockquote>
              <figcaption className="border-t border-border pt-4">
                <p className="text-sm font-medium text-dark">{d.nome}</p>
                <p className="mt-0.5 text-xs text-muted">{d.tratamento}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* O ponto é pequeno por desenho, mas o botão em volta tem 40px de altura
            para dar alvo de toque no celular. */}
        <div className="mt-6 flex justify-center">
          {depoimentos.map((d, i) => (
            <button
              key={d.nome}
              type="button"
              onClick={() => setInicio(i)}
              aria-label={`Ver depoimento ${i + 1} de ${depoimentos.length}`}
              aria-current={i === inicio ? 'true' : undefined}
              className="group flex h-10 w-7 items-center justify-center"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === inicio
                    ? 'w-6 bg-gold-dark'
                    : 'w-1.5 bg-border group-hover:bg-gold/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import { WA_AGENDAR } from '@/lib/contato';

export default function WhatsAppFloat() {
  const [visivel, setVisivel] = useState(false);

  // Aparece depois que a pessoa começa a descer a página, para não competir
  // com o botão principal do topo.
  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 600);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <motion.a
      href={WA_AGENDAR}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar avaliação pelo WhatsApp"
      initial={false}
      animate={{
        opacity: visivel ? 1 : 0,
        y: visivel ? 0 : 12,
        pointerEvents: visivel ? 'auto' : 'none',
      }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center
                 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15
                 transition-colors hover:bg-[#1FB855]"
    >
      <WhatsAppIcon size={26} />
    </motion.a>
  );
}

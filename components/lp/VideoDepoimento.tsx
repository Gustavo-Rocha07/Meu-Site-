'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

/**
 * Vídeo do paciente (vertical 720x1140, 34 s, com áudio; a faixa de legenda de
 * baixo foi cortada). Até o clique só a capa é baixada; o arquivo de 6 MB
 * carrega quando a pessoa decide assistir, sem pesar no carregamento da página
 * nem no celular de quem não vai ver.
 */
export default function VideoDepoimento() {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const tocar = () => {
    setTocando(true);
    requestAnimationFrame(() => ref.current?.play());
  };

  return (
    <div className="relative mx-auto aspect-[720/1140] w-full max-w-[340px] overflow-hidden rounded-[1.5rem] bg-dark shadow-xl">
      {tocando ? (
        <video
          ref={ref}
          src="/video/carga-imediata-paciente.mp4"
          controls
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        >
          Seu navegador não reproduz vídeos.
        </video>
      ) : (
        <button
          type="button"
          onClick={tocar}
          className="group absolute inset-0 h-full w-full"
          aria-label="Assistir ao vídeo do paciente (34 segundos, com som)"
        >
          <Image
            src="/img/carga-imediata-paciente-capa.jpg"
            alt="Paciente da clínica contando a experiência com implante de carga imediata"
            width={720}
            height={1140}
            sizes="340px"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
          <span
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center
                       justify-center rounded-full bg-white/95 text-dark shadow-lg transition-transform
                       group-hover:scale-105"
          >
            <Play size={30} className="ml-1 fill-dark" aria-hidden="true" />
          </span>
          <span className="absolute inset-x-0 bottom-5 text-center text-sm font-medium text-white">
            Assista: 34 segundos, com som
          </span>
        </button>
      )}
    </div>
  );
}

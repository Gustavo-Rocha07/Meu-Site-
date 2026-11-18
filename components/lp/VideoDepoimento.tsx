'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

type Props = {
  src: string;
  capa: string;
  /** Dimensões reais do vídeo (e da capa, que é um quadro dele). */
  largura: number;
  altura: number;
  alt: string;
  /** Texto curto sobre o botão de play, ex.: "Relato do Sr. Cícero · 1 min". */
  rotulo: string;
};

/**
 * Vídeo de paciente com capa clicável. Até o clique só a capa é baixada; o
 * arquivo (6 a 12 MB) carrega quando a pessoa decide assistir, sem pesar no
 * carregamento da página nem no celular de quem não vai ver.
 */
export default function VideoDepoimento({ src, capa, largura, altura, alt, rotulo }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const tocar = () => {
    setTocando(true);
    requestAnimationFrame(() => ref.current?.play());
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[1.5rem] bg-dark shadow-xl"
      style={{ aspectRatio: `${largura} / ${altura}` }}
    >
      {tocando ? (
        <video ref={ref} src={src} controls playsInline preload="none" className="h-full w-full object-cover">
          Seu navegador não reproduz vídeos.
        </video>
      ) : (
        <button
          type="button"
          onClick={tocar}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Assistir: ${rotulo} (com som)`}
        >
          <Image
            src={capa}
            alt={alt}
            width={largura}
            height={altura}
            sizes="340px"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-dark/75 via-transparent to-transparent" />
          <span
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center
                       justify-center rounded-full bg-white/95 text-dark shadow-lg transition-transform
                       group-hover:scale-105"
          >
            <Play size={30} className="ml-1 fill-dark" aria-hidden="true" />
          </span>
          <span className="absolute inset-x-0 bottom-5 px-4 text-center text-sm font-medium text-white">
            {rotulo}
          </span>
        </button>
      )}
    </div>
  );
}

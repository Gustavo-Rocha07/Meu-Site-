import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // O padrão vai até 3840px, e o `src` de fallback de toda imagem saía com
    // w=3840. Nenhuma foto do site passa de 1600px de largura nem é exibida
    // maior que isso, então o teto de 1920 cobre telas 2x sem desperdício.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;

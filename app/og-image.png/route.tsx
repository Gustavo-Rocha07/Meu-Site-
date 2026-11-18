import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// Imagem de compartilhamento (og:image / twitter:image), 1200x630, gerada uma vez
// no build. Fica numa rota com nome fixo (/og-image.png) para que o metadata de
// cada página possa apontar para ela com width e height explícitos.
export const dynamic = 'force-static';

export async function GET() {
  const foto = await readFile(join(process.cwd(), 'public/img/img-dra.jpeg'));
  const fotoSrc = `data:image/jpeg;base64,${foto.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#FAF9F6' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 760,
            padding: '0 72px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 22, letterSpacing: 4, color: '#8A6C30' }}>
            <div style={{ width: 40, height: 2, background: '#B08D4F', marginRight: 16 }} />
            DENTISTA EM SUZANO
          </div>
          <div style={{ marginTop: 28, fontSize: 68, lineHeight: 1.05, color: '#14161C' }}>
            Dra. Michele Herreira
          </div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.35, color: '#6B6157' }}>
            Implantes, carga imediata, estética do sorriso e odontopediatria
          </div>
          <div style={{ marginTop: 40, fontSize: 24, color: '#2A2520' }}>
            CRO-SP 71275 · Suzano e Ferraz de Vasconcelos
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse só aceita <img> */}
        <img src={fotoSrc} width={440} height={630} alt="" style={{ objectFit: 'cover', objectPosition: 'top' }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

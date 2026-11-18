import Texto from './Texto';
import type { Secao } from '@/content/tipos';

/** Corpo de texto das páginas de tratamento e dos artigos: H2 + parágrafos + lista. */
export default function Secoes({ secoes }: { secoes: Secao[] }) {
  return (
    <div className="space-y-14">
      {secoes.map((s) => (
        <section key={s.titulo}>
          <h2 className="section-heading text-3xl lg:text-[2.4rem]">{s.titulo}</h2>
          {s.paragrafos.map((p, i) => (
            <p key={i} className="mt-5 text-[17px] leading-relaxed text-charcoal/90">
              <Texto>{p}</Texto>
            </p>
          ))}
          {s.lista && (
            <ul className="mt-5 space-y-3">
              {s.lista.map((item) => (
                <li
                  key={item}
                  className="relative pl-6 text-[17px] leading-relaxed text-charcoal/90
                             before:absolute before:left-0 before:top-[0.7em] before:h-px
                             before:w-3 before:bg-gold"
                >
                  <Texto>{item}</Texto>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

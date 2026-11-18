'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { INSTAGRAM, WA_AGENDAR } from '@/lib/contato';

// Links para páginas reais (antes eram âncoras da página única). "Tratamentos"
// continua levando à lista da home, que é o hub com um resumo de cada um.
const links = [
  { label: 'Início', href: '/' },
  { label: 'Tratamentos', href: '/#tratamentos' },
  { label: 'Crianças', href: '/odontopediatria' },
  { label: 'A doutora', href: '/sobre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();
  const ativo = (href: string) =>
    href === '/' ? pathname === '/' : !href.includes('#') && pathname.startsWith(href);

  useEffect(() => {
    const aoRolar = () => setScrolled(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Menu aberto no celular: trava o scroll do fundo e fecha no Esc.
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-dark focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || aberto
            ? 'border-b border-dark/[0.07] bg-cream/90 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="container-main flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Dra. Michele Herreira, início" className="shrink-0">
            <Image
              src="/img/logo-nome.png"
              alt="Dra. Michele Herreira"
              width={168}
              height={38}
              // eager, mas sem preload: o preload fica só com a foto principal (LCP)
              loading="eager"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(({ label, href }) => {
              const selecionado = ativo(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={selecionado ? 'page' : undefined}
                  className={`relative py-1 text-sm transition-colors duration-200 ${
                    selecionado ? 'text-dark' : 'text-muted hover:text-dark'
                  }`}
                >
                  {label}
                  {selecionado && (
                    <motion.span
                      layoutId="nav-ativo"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 lg:gap-3">
            {/* Instagram visível sempre, no celular e no computador */}
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Dra. Michele Herreira (abre em nova aba)"
              title="@dra.michele_ no Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full text-dark
                         transition-colors hover:bg-dark/5 hover:text-[#d62976]"
            >
              <Instagram size={20} />
            </a>

            <a
              href={WA_AGENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-dark px-5 py-2.5 text-sm
                         font-medium text-white transition-colors duration-200 hover:bg-charcoal lg:inline-flex"
            >
              <WhatsAppIcon size={15} />
              Agendar
            </a>

            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-dark
                         transition-colors hover:bg-dark/5 lg:hidden"
            >
              {aberto ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-cream lg:hidden"
          >
            <nav className="container-main flex flex-col py-6">
              {links.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setAberto(false)}
                  className="border-b border-dark/[0.07] py-4 text-lg text-dark"
                >
                  {label}
                </Link>
              ))}
              <a
                href={WA_AGENDAR}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAberto(false)}
                className="btn-primary mt-8"
              >
                <WhatsAppIcon size={17} />
                Agendar pelo WhatsApp
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAberto(false)}
                className="btn-outline mt-3"
              >
                <Instagram size={17} aria-hidden="true" />
                Ver o Instagram @dra.michele_
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

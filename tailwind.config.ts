import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        // gold = decorativo e títulos grandes (3.1:1 no branco).
        // gold-dark = texto pequeno e botões (4.9:1 com branco por cima).
        gold: {
          DEFAULT: '#B08D4F',
          light: '#E0CCA4',
          dark: '#8A6C30',
          deep: '#6F5626',
        },
        dark: '#14161C',
        charcoal: '#2A2520',
        // 5.9:1 no branco — o cinza anterior (#8C8075) ficava em 3.8:1 e reprovava
        // no critério de contraste da WCAG para texto corrido.
        muted: '#6B6157',
        border: '#E5DFD6',
        surface: '#FFFFFF',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      // Animações do topo da home em CSS puro (antes eram framer-motion).
      keyframes: {
        flutuar: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        girar: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        flutuar: 'flutuar 4.5s ease-in-out infinite',
        girar: 'girar 60s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

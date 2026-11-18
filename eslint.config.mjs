import { FlatCompat } from '@eslint/eslintrc';

// O projeto já trazia `eslint` e `eslint-config-next` nas devDependencies e um
// script `npm run lint`, mas nunca teve arquivo de configuração — o comando
// falhava. Este é o formato flat config, exigido a partir do ESLint 9.
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default config;

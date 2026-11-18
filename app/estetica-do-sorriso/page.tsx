import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { esteticaDoSorriso as tratamento } from '@/content/tratamentos/estetica-do-sorriso';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

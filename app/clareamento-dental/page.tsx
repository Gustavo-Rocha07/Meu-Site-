import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { clareamentoDental as tratamento } from '@/content/tratamentos/clareamento-dental';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

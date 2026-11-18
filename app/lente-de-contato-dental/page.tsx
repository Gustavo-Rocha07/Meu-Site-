import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { lenteDeContatoDental as tratamento } from '@/content/tratamentos/lente-de-contato-dental';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

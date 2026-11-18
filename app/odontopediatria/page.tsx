import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { odontopediatria as tratamento } from '@/content/tratamentos/odontopediatria';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

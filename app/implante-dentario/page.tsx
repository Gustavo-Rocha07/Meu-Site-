import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { implanteDentario as tratamento } from '@/content/tratamentos/implante-dentario';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

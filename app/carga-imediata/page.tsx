import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { cargaImediata as tratamento } from '@/content/tratamentos/carga-imediata';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

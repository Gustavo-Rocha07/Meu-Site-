import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { proteseDentaria as tratamento } from '@/content/tratamentos/protese-dentaria';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

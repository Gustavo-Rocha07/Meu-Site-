import PaginaTratamento, { metadataTratamento } from '@/components/tratamento/PaginaTratamento';
import { cirurgiaOdontologica as tratamento } from '@/content/tratamentos/cirurgia-odontologica';

export const metadata = metadataTratamento(tratamento);

export default function Page() {
  return <PaginaTratamento t={tratamento} />;
}

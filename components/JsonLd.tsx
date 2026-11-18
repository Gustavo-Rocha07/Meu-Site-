/**
 * Dados estruturados (schema.org). O `<` é escapado para que nenhum texto do
 * conteúdo consiga fechar a tag <script> antes da hora.
 */
export default function JsonLd({ dados }: { dados: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  );
}

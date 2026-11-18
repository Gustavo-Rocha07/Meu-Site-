import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

/** Cabeçalho, rodapé e botão flutuante comuns a todas as páginas. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

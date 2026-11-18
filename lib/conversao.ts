/**
 * Eventos de conversão da landing page, enviados ao dataLayer da tag do Google
 * (GTM-K6FRHJCM). No Tag Manager, cada evento vira um acionador que dispara a
 * conversão do Google Ads:
 *
 * - `lp_whatsapp_clique`: clique em qualquer botão de WhatsApp (param `posicao`)
 * - `lp_formulario_envio`: envio do formulário de avaliação (params de qualificação)
 *
 * Só roda no navegador; nenhum dado pessoal (nome) vai para o dataLayer.
 */
type Evento =
  | { event: 'lp_whatsapp_clique'; posicao: string }
  | { event: 'lp_formulario_envio'; situacao: string; unidade: string; prazo: string };

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export function registrarConversao(evento: Evento) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(evento);
}

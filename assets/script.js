document.querySelector(".whatsappButton").addEventListener("click", function() {
  const phoneNumber = "5511986775000"; 
  const message = "Olá, quero mais informações!"; 
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

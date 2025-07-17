
  const hamburguer = document.getElementById('hamburguer');
  const menuLinks = document.getElementById('menu-links');

  hamburguer.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
  });

  // Fecha o menu ao clicar em qualquer link
  const navLinks = document.querySelectorAll('.links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuLinks.classList.remove('active');
    });
  });


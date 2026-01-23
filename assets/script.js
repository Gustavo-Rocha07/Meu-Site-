// =========================================
// MENU MOBILE
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }
});

// =========================================
// HEADER SCROLL EFFECT
// =========================================

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// =========================================
// BEFORE / AFTER SLIDER
// =========================================

class BeforeAfterSlider {
  constructor(container) {
    this.container = container;
    this.wrapper = container.querySelector('.comparison-image-wrapper');
    this.handle = container.querySelector('.slider-handle');
    this.beforeImage = container.querySelector('.before-image');
    this.isDragging = false;
    
    this.init();
  }
  
  init() {
    if (!this.wrapper || !this.handle || !this.beforeImage) return;
    
    // Mouse events
    this.handle.addEventListener('mousedown', (e) => this.startDrag(e));
    this.wrapper.addEventListener('mousemove', (e) => this.onDrag(e));
    document.addEventListener('mouseup', () => this.stopDrag());
    
    // Touch events
    this.handle.addEventListener('touchstart', (e) => this.startDrag(e));
    this.wrapper.addEventListener('touchmove', (e) => this.onDrag(e));
    document.addEventListener('touchend', () => this.stopDrag());
    
    // Click to move
    this.wrapper.addEventListener('click', (e) => {
      if (!this.isDragging) {
        this.moveSlider(e);
      }
    });
  }
  
  startDrag(e) {
    this.isDragging = true;
    this.container.style.cursor = 'grabbing';
    if (this.handle) {
      this.handle.style.cursor = 'grabbing';
    }
  }
  
  stopDrag() {
    this.isDragging = false;
    this.container.style.cursor = 'grab';
    if (this.handle) {
      this.handle.style.cursor = 'grab';
    }
  }
  
  onDrag(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.moveSlider(e);
  }
  
  moveSlider(e) {
    const rect = this.wrapper.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    this.beforeImage.style.width = `${percentage}%`;
    
    if (this.handle) {
      this.handle.style.left = `${percentage}%`;
      this.handle.style.transform = 'translate(-50%, -50%)';
    }
    
    const sliderLine = this.wrapper.querySelector('.slider-line');
    if (sliderLine) {
      sliderLine.style.left = `${percentage}%`;
      sliderLine.style.transform = 'translateX(-50%)';
    }
  }
}

// Inicializar todos os sliders
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.comparison-slider');
  sliders.forEach(slider => {
    new BeforeAfterSlider(slider);
  });
});

// =========================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#inicio') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = document.getElementById('header')?.offsetHeight || 80;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// =========================================
// ANIMAÇÃO AO SCROLL (FADE IN)
// =========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.diferencial-card, .tratamento-card, .depoimento-card, .before-after-item, .galeria-item'
  );
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// =========================================
// LOAD PROCEDURE DETAILS (para procedimento.html)
// =========================================

const proceduresData = {
  'implantes': {
    title: 'Implantes Dentários',
    subtitle: 'Recupere sua autoestima e a função mastigatória com segurança.',
    image: './assets/img/exemplo1.png',
    description: `
      <h2>O que são Implantes Dentários?</h2>
      <p>Os implantes dentários são pinos de titânio posicionados cirurgicamente no osso maxilar, abaixo da margem gengival. Eles servem como bases sólidas para a substituição de dentes perdidos.</p>
      <br>
      <h3>Benefícios</h3>
      <ul>
        <li>✅ Aparência e sensação de dentes naturais</li>
        <li>✅ Melhora na fala e mastigação</li>
        <li>✅ Durabilidade de longos anos</li>
        <li>✅ Preservação da estrutura óssea facial</li>
      </ul>
      <br>
      <p>Na nossa clínica, utilizamos a tecnologia de Carga Imediata quando possível, permitindo que você saia com o sorriso renovado no mesmo dia.</p>
    `
  },
  'ortodontia': {
    title: 'Ortodontia',
    subtitle: 'Alinhamento perfeito para um sorriso harmonioso.',
    image: './assets/img/exemplo2.png',
    description: `
      <h2>Sorria com Confiança</h2>
      <p>A ortodontia vai além da estética; dentes alinhados são fundamentais para a saúde bucal, facilitando a higienização e prevenindo problemas na articulação.</p>
      <br>
      <h3>Nossos Tratamentos</h3>
      <ul>
        <li>✅ Aparelhos Estéticos (Safira/Porcelana)</li>
        <li>✅ Alinhadores Invisíveis</li>
        <li>✅ Aparelhos Convencionais Metálicos</li>
      </ul>
    `
  },
  'estetica': {
    title: 'Estética Dental',
    subtitle: 'Lentes de contato e clareamento para um sorriso de estrela.',
    image: './assets/img/exemplo2.png',
    description: `
      <h2>Transformação do Sorriso</h2>
      <p>Procedimentos minimamente invasivos que corrigem cor, formato e tamanho dos dentes, proporcionando um sorriso harmônico e brilhante.</p>
      <br>
      <h3>Serviços Inclusos</h3>
      <ul>
        <li>✅ Lentes de Contato Dental</li>
        <li>✅ Facetas de Porcelana</li>
        <li>✅ Clareamento à Laser e Caseiro</li>
      </ul>
    `
  },
  'pediatria': {
    title: 'Odontopediatria',
    subtitle: 'Cuidado especializado para os sorrisos mais preciosos.',
    image: './assets/img/heart.png',
    description: `
      <h2>Prevenção e Cuidado desde Cedo</h2>
      <p>Nosso ambiente é preparado para que a criança se sinta segura e acolhida. O objetivo é criar uma geração livre de cáries e sem medo de dentista.</p>
      <br>
      <h3>Diferenciais</h3>
      <ul>
        <li>✅ Ambiente Lúdico</li>
        <li>✅ Técnicas de Manejo Comportamental</li>
        <li>✅ Prevenção e Educação em Saúde Bucal</li>
      </ul>
    `
  }
};

function loadProcedureDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id || !proceduresData[id]) {
    const titleEl = document.getElementById('proc-title');
    const subtitleEl = document.getElementById('proc-subtitle');
    if (titleEl) titleEl.innerText = 'Tratamento não encontrado';
    if (subtitleEl) subtitleEl.innerText = 'Por favor, retorne à página inicial.';
    return;
  }

  const data = proceduresData[id];
  
  // Set Hero Texts
  const titleEl = document.getElementById('proc-title');
  const subtitleEl = document.getElementById('proc-subtitle');
  const breadcrumbEl = document.getElementById('proc-breadcrumb');
  
  if (titleEl) titleEl.innerText = data.title;
  if (subtitleEl) subtitleEl.innerText = data.subtitle;
  if (breadcrumbEl) breadcrumbEl.innerText = data.title;

  // Set Content
  const contentContainer = document.getElementById('proc-content');
  if (!contentContainer) return;
  
  // Criar imagem do tratamento
  let imgHtml = '';
  if (data.image) {
    // IMAGEM: Foto ilustrativa do tratamento específico (ver comentário abaixo para cada tipo)
    imgHtml = `<div class="about-img"><img src="${data.image}" alt="${data.title}" class="procedimento-detail-img"></div>`;
  } else {
    // IMAGEM: Foto ilustrativa do tratamento - substituir pelo caminho correto da imagem
    // Implantes: ./assets/img/tratamentos/implantes-detalhe.jpg
    // Ortodontia: ./assets/img/tratamentos/ortodontia-detalhe.jpg
    // Estética: ./assets/img/tratamentos/estetica-detalhe.jpg
    // Pediatria: ./assets/img/tratamentos/pediatria-detalhe.jpg
    imgHtml = `<div class="about-img"><img src="./assets/img/tratamentos/${id}-detalhe.jpg" alt="${data.title}" class="procedimento-detail-img"></div>`;
  }

  contentContainer.innerHTML = `
    ${imgHtml}
    <div class="about-text">
      ${data.description}
    </div>
  `;
}

// Executar se estiver na página de procedimento
if (document.getElementById('proc-title')) {
  document.addEventListener('DOMContentLoaded', loadProcedureDetails);
}

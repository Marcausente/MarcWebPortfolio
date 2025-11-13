document.addEventListener("DOMContentLoaded", function () {
  // Nuevo header/nav
  const header = document.querySelector('.header');
  const navContainer = document.querySelector('.nav-container');
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  // Ajustar --header-height dinámicamente
  function setHeaderHeightVar() {
    if (header) {
      const height = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', height + 'px');
    }
  }
  setHeaderHeightVar();
  window.addEventListener('load', setHeaderHeightVar);
  window.addEventListener('resize', setHeaderHeightVar);

  // Toggle menú móvil
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', function() {
      const isActive = navLinksContainer.classList.toggle('active');
      navToggle.classList.toggle('active', isActive);
      navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      if (isActive) {
        navLinksContainer.style.top = getComputedStyle(document.documentElement).getPropertyValue('--header-height') || (header ? header.offsetHeight + 'px' : '80px');
      }
    });
    // Cerrar al pulsar enlace
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !navToggle.contains(e.target)) {
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Efecto ocultar/mostrar header en scroll
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    if (navContainer) {
      if (currentScrollY > 100) {
        navContainer.style.background = 'rgba(255, 255, 255, 0.6)';
        navContainer.style.backdropFilter = 'blur(16px) saturate(180%)';
        navContainer.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
        navContainer.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        navContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12)';
      } else {
        navContainer.style.background = 'rgba(255, 255, 255, 0.6)';
        navContainer.style.backdropFilter = 'blur(16px) saturate(180%)';
        navContainer.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
        navContainer.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        navContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12)';
      }
    }
    if (header) {
      header.classList.toggle('scrolled', currentScrollY > 100);
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    lastScrollY = currentScrollY;
    // Progreso de scroll
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    const progressEl = document.querySelector('.scroll-progress');
    if (progressEl) {
      progressEl.style.width = progress + '%';
    }
  });
  // Toggle menú hamburguesa en móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cerrar al hacer click en un enlace
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  const logosContainers = document.querySelectorAll(".logos-container .logos");

  logosContainers.forEach(container => {
    const logos = container.querySelectorAll("img");
    const logoCount = logos.length;

    // La duración de la animación depende del número de iconos
    const animationDuration = logoCount * 1; // 1 segundo por cada icono
    container.style.animationDuration = `${animationDuration}s`;
  });

  // Efecto de aparición gradual al cargar la página
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.8s ease";
  }, 100);

  // Inicializar los badges de tecnología con retraso escalonado
  const techBadges = document.querySelectorAll('.tech-badge');
  techBadges.forEach((badge, index) => {
    badge.style.setProperty('--i', index);
  });

  // Efecto parallax mejorado para el fondo
  const backgroundAnimation = document.querySelector('.background-animation');
  const patternOverlay = document.querySelector('.pattern-overlay');
  const gradientBg = document.querySelector('.gradient-bg');
  const shapes = document.querySelectorAll('.shape');
  const heroSection = document.querySelector('.hero-section');
  const profileImage = document.querySelector('.profile-image-wrapper');
  
  if (backgroundAnimation && patternOverlay && gradientBg && heroSection) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const ease = 0.1;
    
    document.addEventListener('mousemove', (e) => {
      // Calcular posición relativa del ratón (valores entre -1 y 1)
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    });
    
    // Función de animación para movimiento suave
    function animateParallax() {
      // Aplicar suavizado al movimiento
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;
      
      // Aplicar transformaciones con diferentes intensidades para crear efecto de profundidad
      patternOverlay.style.transform = `translate(${currentX * -15}px, ${currentY * -15}px)`;
      
      // Mover las formas con diferentes intensidades
      shapes.forEach((shape, index) => {
        const intensity = (index + 1) * 8;
        shape.style.transform = `translate(${currentX * intensity}px, ${currentY * intensity}px)`;
      });
      
      // Efecto sutil en la imagen de perfil
      if (profileImage) {
        profileImage.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
      }
      
      requestAnimationFrame(animateParallax);
    }
    
    // Iniciar la animación
    animateParallax();
  }

  // Efecto mejorado para la imagen de perfil
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
      profileImg.style.boxShadow = '0 15px 35px rgba(244, 67, 54, 0.3)';
      profileImg.style.borderWidth = '5px';
    });

    profileImg.addEventListener('mouseleave', () => {
      profileImg.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
      profileImg.style.borderWidth = '4px';
    });
  }

  // Añadir atributo data-text para el efecto glitch
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const nameText = heroName.textContent;
    heroName.setAttribute('data-text', nameText);
  }

  // Efecto de typing para el texto "Marcausente"
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;
    
    function typeText() {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeText, 100);
      }
    }
    
    // Iniciar el efecto cuando el elemento sea visible
    const typewriterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeText();
        typewriterObserver.unobserve(typewriter);
      }
    });
    
    typewriterObserver.observe(typewriter);
  }

  // Efecto de hover 3D para los botones
  const heroButtons = document.querySelectorAll('.hero-button');
  heroButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;
      
      button.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Actualizar enlace activo según la posición de desplazamiento
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.navbar a, .nav .nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Mostrar/ocultar indicador de scroll basado en la posición
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      if (scrollPosition > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    }
  });

  // Mejorar el observer para las secciones
  const sections = document.querySelectorAll('#about, #mis-proyectos');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Cuando la sección es visible
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        // Cuando la sección no es visible
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
      }
    });
  }, {
    threshold: 0.1
  });

  // Aplicar el observer a las secciones
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
  });

  // Observer mejorado para las tarjetas de proyecto
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(50px)';
      }
    });
  }, {
    threshold: 0.1
  });

  // Aplicar el observer a las tarjetas de proyecto
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    projectObserver.observe(card);
  });

  // Lazy-loading para imágenes no críticas
  document.querySelectorAll('.project-image img, .logos-row img, .logos img').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });

  // Efecto hover mejorado para las tarjetas de proyecto
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${(y - rect.height / 2) / 20}deg)
        rotateY(${-(x - rect.width / 2) / 20}deg)
        translateY(-5px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Obtener offset del header desde CSS variable
  function getHeaderOffset() {
    const varValue = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    const parsed = parseInt(varValue);
    if (!isNaN(parsed) && parsed > 0) return parsed;
    return header ? header.offsetHeight : 96;
  }

  // Función mejorada para scroll suave
  function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const headerOffset = getHeaderOffset();
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // Aplicar a todos los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      scrollToSection(targetId);
    });
  });

  // Manejar específicamente el indicador de scroll (flecha)
  const scrollIndicator = document.querySelector('.scroll-indicator a');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      scrollToSection(targetId);
    });
  }

  // Manejar los enlaces de la navbar
  document.querySelectorAll('.navbar a, .nav .nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#top' || targetId === '#') {
        // Scroll al inicio de la página
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else if (targetId.startsWith('#')) {
        // Scroll a una sección específica
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const headerOffset = getHeaderOffset();
          const elementPosition = targetSection.offsetTop - headerOffset;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Manejar específicamente el enlace de inicio
  const inicioLink = document.getElementById('inicio-link');
  if (inicioLink) {
    inicioLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Funcionalidad para las pestañas en la sección Sobre Mí
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Inicializar las barras de habilidades con animación
  function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
      const width = level.style.width;
      level.style.width = '0';
      setTimeout(() => {
        level.style.width = width;
      }, 300);
    });
  }
  
  // Cambiar entre pestañas
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Desactivar todas las pestañas
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Activar la pestaña seleccionada
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      const targetPane = document.getElementById(`${tabId}-tab`);
      
      if (targetPane) {
        targetPane.classList.add('active');
        
        // Si es la pestaña de habilidades, inicializar las barras
        if (tabId === 'skills') {
          initSkillBars();
        }
      }
    });
  });
  
  // Inicializar las barras de habilidades cuando se hace visible la sección
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && document.getElementById('skills-tab')) {
        initSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    skillsObserver.observe(aboutSection);
  }
});

// Añadir efecto de aparición gradual para elementos
document.addEventListener('scroll', function() {
  const elements = document.querySelectorAll('.tech-stack span, .about-container h4, .bio');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
});

// Mostrar/ocultar indicador de scroll basado en la posición
window.addEventListener('scroll', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (window.scrollY > 100) {
    scrollIndicator.style.opacity = '0';
  } else {
    scrollIndicator.style.opacity = '1';
  }
});

// Función de scroll personalizada para mayor suavidad
function smoothScroll(target, duration) {
    const targetPosition = target;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Función de easing para un movimiento más natural
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Asegurarse de que el scroll sea suave incluso en Safari
if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('.navbar a, .nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === 'index.html') {
                smoothScroll(0, 1000);
            } else if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = getHeaderOffset();
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    smoothScroll(offsetPosition, 1000);
                }
            }
        });
    });
}

// Clase CSS para la animación de aparición
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .project-card.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);


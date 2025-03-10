document.addEventListener("DOMContentLoaded", function () {
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

  // Efecto mejorado para la imagen de perfil
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
      profileImg.style.transform = 'scale(1.05) rotate(-2deg)';
      profileImg.style.boxShadow = '0 15px 35px rgba(244, 67, 54, 0.3)';
    });

    profileImg.addEventListener('mouseleave', () => {
      profileImg.style.transform = 'scale(1) rotate(0deg)';
      profileImg.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
  }

  // Efecto parallax suave para el fondo
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
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

  // Función mejorada para scroll suave
  function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const headerOffset = 80;
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
  document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === 'index.html') {
        // Si es el enlace a index.html, permitir el comportamiento normal
        return;
      }
      
      if (href.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href);
      }
    });
  });
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
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === 'index.html') {
                smoothScroll(0, 1000);
            } else if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = 80;
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


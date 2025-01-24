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

  // Animación de entrada para las tarjetas de proyecto
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        projectObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
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

  // Smooth scroll mejorado con animación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          
          window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        
        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
        
        requestAnimationFrame(animation);
      }
    });
  });

  // Efecto de resaltado para las tecnologías
  document.querySelectorAll('.tech-stack span').forEach(tech => {
    tech.addEventListener('mouseenter', () => {
      tech.style.transform = 'translateY(-5px) scale(1.1)';
      tech.style.boxShadow = '0 5px 15px rgba(244, 67, 54, 0.2)';
    });

    tech.addEventListener('mouseleave', () => {
      tech.style.transform = 'translateY(0) scale(1)';
      tech.style.boxShadow = 'none';
    });
  });
});

document.querySelector('.scroll-indicator a').addEventListener('click', function(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  targetSection.scrollIntoView({
    behavior: 'smooth'
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

// Añadir scroll suave para los enlaces de navegación
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === 'index.html') {
            // Si el enlace es "Inicio", scroll al top de la página
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId.startsWith('#')) {
            // Si es un enlace interno (#about, #mis-proyectos, etc)
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Clase CSS para la animación de aparición
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .project-card.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

// Mantener solo el efecto de aparición para las secciones
const sections = document.querySelectorAll('#about, #mis-proyectos');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      sectionObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.8s ease-out';
  sectionObserver.observe(section);
});


document.addEventListener("DOMContentLoaded", function () {
  const logosContainers = document.querySelectorAll(".logos-container .logos");

  logosContainers.forEach(container => {
    const logos = container.querySelectorAll("img");
    const logoCount = logos.length;

    // La duración de la animación depende del número de iconos
    const animationDuration = logoCount * 1; // 1 segundo por cada icono
    container.style.animationDuration = `${animationDuration}s`;
  });

  const profileImg = document.querySelector('.profile-img');

  // Efecto al pasar el mouse
  profileImg.addEventListener('mouseenter', () => {
    profileImg.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
    profileImg.style.boxShadow = '0 0 50px rgba(255, 0, 0, 0.7), 0 0 100px rgba(255, 0, 0, 0.5)';
    profileImg.style.transform = 'scale(1.05)';
  });

  profileImg.addEventListener('mouseleave', () => {
    profileImg.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
    profileImg.style.transform = 'scale(1)';
  });

  // Inicializar variables para la animación de pulso
  let hue = 0;

  // Función para actualizar el color dinámico del pulso (sin amarillo, naranja o rojo brillante)
  function updatePulse() {
    hue = (hue + 0.3) % 40; // Incremento muy lento para el cambio de color
    const pulseColor = `hsl(${hue}, 100%, 30%)`; // Tonos más oscuros, centrados en granates y burdeos
    profileImg.style.boxShadow = `
      0 0 30px ${pulseColor},
      0 0 60px ${pulseColor}`;
  }

  // Animación continua con `requestAnimationFrame`
  function animatePulse() {
    updatePulse();
    requestAnimationFrame(animatePulse);
  }

  // Iniciar la animación al cargar la página
  animatePulse();
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

// Efecto de máquina de escribir para el nickname
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Iniciar efecto de máquina de escribir
document.addEventListener("DOMContentLoaded", function() {
  const typewriterElement = document.querySelector('.typewriter');
  const text = "Marcausente"; // Texto fijo
  
  // Iniciar la animación inicial
  typeWriter(typewriterElement, text);
  
  // Repetir la animación cada 10 segundos
  setInterval(() => {
    typeWriter(typewriterElement, text);
  }, 10000);
});

// Animación de aparición para las tarjetas de proyectos
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.5s ease ${index * 0.2}s`;
    observer.observe(card);
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


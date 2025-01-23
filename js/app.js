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
    hue = (hue + 0.2) % 40; // Incremento muy lento para el cambio de color
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

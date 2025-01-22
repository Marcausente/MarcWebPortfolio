// Selección de los contenedores
const leftLogos = document.querySelector('.logos-container.left .logos');
const rightLogos = document.querySelector('.logos-container.right .logos');

// Configuración inicial
let leftPosition = -100; // Empieza fuera de la pantalla superior
let rightPosition = window.innerHeight; // Empieza fuera de la pantalla inferior
const speed = 1; // Velocidad de movimiento

function animate() {
  // Mover la columna izquierda hacia abajo
  leftPosition += speed;
  if (leftPosition > window.innerHeight) {
    leftPosition = -leftLogos.offsetHeight; // Reinicia desde arriba
  }
  leftLogos.style.transform = `translateY(${leftPosition}px)`;

  // Mover la columna derecha hacia arriba
  rightPosition -= speed;
  if (rightPosition < -rightLogos.offsetHeight) {
    rightPosition = window.innerHeight; // Reinicia desde abajo
  }
  rightLogos.style.transform = `translateY(${rightPosition}px)`;

  // Repetir la animación
  requestAnimationFrame(animate);
}

// Iniciar la animación
animate();

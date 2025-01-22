document.addEventListener("DOMContentLoaded", function() {
  const logosContainers = document.querySelectorAll(".logos-container .logos");

  logosContainers.forEach(container => {
    const logos = container.querySelectorAll("img");
    const logoCount = logos.length;

    // La duración de la animación depende del número de iconos
    const animationDuration = logoCount * 1; // 1 segundo por cada icono
    container.style.animationDuration = `${animationDuration}s`;
  });
});

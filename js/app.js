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

const profileImg = document.querySelector('.profile-img');

profileImg.addEventListener('mouseenter', (e) => {
  profileImg.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
  profileImg.style.boxShadow = '0 0 50px rgba(255, 0, 0, 0.7), 0 0 100px rgba(255, 0, 0, 0.5)';
  profileImg.style.transform = 'scale(1.05)';
});

profileImg.addEventListener('mouseleave', (e) => {
  profileImg.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
  profileImg.style.transform = 'scale(1)';
});



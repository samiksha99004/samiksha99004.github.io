// Create random stars
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.id = 'stars-container';
  document.body.appendChild(starsContainer);

  // Create 200 random stars
  for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 1.5 + 0.5}px`;
    star.style.height = star.style.width;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.animation = `twinkle ${Math.random() * 5 + 5}s infinite ${Math.random() * 5}s`;
    starsContainer.appendChild(star);
  }
}

// Create shooting star
function createShootingStar() {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';

  // Random start position (top of the viewport)
  const startX = Math.random() * 100;
  const startY = Math.random() * 10;

  // Random end position (somewhere in the middle/bottom)
  const endX = startX + (Math.random() * 40 - 20);
  const endY = startY + 20 + Math.random() * 30;

  // Random size and speed
  const size = Math.random() * 2 + 1;
  const duration = Math.random() * 2 + 1;

  shootingStar.style.left = `${startX}%`;
  shootingStar.style.top = `${startY}%`;
  shootingStar.style.width = `${size}px`;
  shootingStar.style.height = `${size * 2}px`;

  document.body.appendChild(shootingStar);

  // Animate shooting star
  shootingStar.animate([
    { transform: `translate(0, 0)`, opacity: 1 },
    { transform: `translate(${endX - startX}vw, ${endY - startY}vh)`, opacity: 0 }
  ], {
    duration: duration * 1000,
    easing: 'cubic-bezier(0.1, 0, 0.9, 1)'
  });

  // Remove after animation
  setTimeout(() => {
    shootingStar.remove();
  }, duration * 1000);
}

// Initialize space effects
function initSpace() {
  createStars();

  // Create shooting stars at random intervals
  setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance to create a shooting star
      createShootingStar();
    }
  }, 2000);
}

// simple cursor + smooth anchor scroll
document.addEventListener("DOMContentLoaded", () => {
  // Initialize space effects
  initSpace();

  const cursor = document.getElementById("cursor");
  document.addEventListener("mousemove", (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      ev.preventDefault();
      const t = document.querySelector(href);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

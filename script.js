// Typing animation
function typeWriter(text, element, speed = 20, i = 0) {
  if (i < text.length) {
    element.innerHTML = text.substring(0, i + 1);
    setTimeout(() => typeWriter(text, element, speed, i + 1), speed);
  } else {
    // Hide cursor when done
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'none';
  }
}

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

  // Start typing animation
  // Start typing animation
  const summaryText = "Cybersecurity and product security enthusiast with hands-on experience in vulnerability assessment, web application testing, SOC analysis, and security-focused development. Skilled in Python, Java, SQL, Git, Burp Suite, Wireshark, Splunk, and Kali Linux, with practical exposure to CTFs, TryHackMe labs, and machine-learning-based intrusion detection. Strong foundation in OWASP Top 10, secure software development lifecycle (Secure SDLC), threat modeling, authentication, networking, and vulnerability triage. Interested in applying Generative AI and automation to security workflows, offensive security testing, and secure engineering.";
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    // Calculate speed for 2 seconds total duration
    const totalTimeMs = 2000; // 2 seconds
    const speed = Math.max(1, Math.floor(totalTimeMs / summaryText.length));
    // Start with a small delay
    setTimeout(() => {
      typeWriter(summaryText, typingElement, speed);
    }, 500);
  }
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

// --- Simple SPA routing (loads section pages from /pages/*.html into #content) ---
(function(){
  const contentId = 'content';
  function loadPage(path, addHistory = true){
    const page = (path === '/' || path === '') ? 'summary' : path.replace(/^\//, '') ;
    const url = `pages/${page}.html`;
    const container = document.getElementById(contentId);
    if (!container) return;
    fetch(url).then(res => {
      if (!res.ok) throw new Error('Page not found');
      return res.text();
    }).then(html => {
      container.innerHTML = html;
      if (addHistory) history.pushState({page: page}, '', path);
      // run lightweight initialization for loaded content
      if (page === 'summary') {
        // re-run summary typing if typing element exists
        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
          // Use same summary text as before
          const summaryText = "Cybersecurity and product security enthusiast with hands-on experience in vulnerability assessment, web application testing, SOC analysis, and security-focused development. Skilled in Python, Java, SQL, Git, Burp Suite, Wireshark, Splunk, and Kali Linux, with practical exposure to CTFs, TryHackMe labs, and machine-learning-based intrusion detection. Strong foundation in OWASP Top 10, secure software development lifecycle (Secure SDLC), threat modeling, authentication, networking, and vulnerability triage. Interested in applying Generative AI and automation to security workflows, offensive security testing, and secure engineering.";
          // clear and start typing
          typingElement.innerHTML = '';
          // show typing cursor if present
          const tcursor = document.querySelector('.typing-cursor');
          if (tcursor) tcursor.style.display = '';
          const totalTimeMs = 2000;
          const speed = Math.max(1, Math.floor(totalTimeMs / summaryText.length));
          setTimeout(() => { typeWriter(summaryText, typingElement, speed); }, 200);
        }
      }
    }).catch(err => {
      container.innerHTML = '<section class="panel glass-panel"><h2>Page not found</h2><p>Could not load "' + page + '".</p></section>';
      if (addHistory) history.pushState({}, '', path);
    });
  }

  // Intercept clicks on SPA links with class 'spa-link'
  document.addEventListener('click', function(ev){
    const a = ev.target.closest && ev.target.closest('a.spa-link');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.indexOf('http') === 0) return; // external
    ev.preventDefault();
    loadPage(href, true);
  });

  // Handle browser navigation
  window.addEventListener('popstate', function(){
    loadPage(location.pathname, false);
  });

  // On initial load, if path isn't root, try loading that page
  document.addEventListener('DOMContentLoaded', function(){
    const path = location.pathname;
    // When opening files via file:// (common during local development on Windows),
    // location.pathname contains the full drive path (e.g. /C:/...), which would
    // incorrectly be treated as a SPA route. Skip auto-loading in that case.
    if (location.protocol === 'file:') {
      return;
    }
    if (path && path !== '/' && path !== '/index.html') {
      loadPage(path, false);
    }
  });
})();


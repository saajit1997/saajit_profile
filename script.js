// Typewriter effect — name first, then subtitle
const nameEl = document.querySelector('.hero h1');
const subtitleEl = document.querySelector('.hero h2');
const nameText = nameEl.textContent;
const subtitleText = subtitleEl.textContent;

nameEl.textContent = '';
subtitleEl.textContent = '';
nameEl.style.borderRight = '3px solid #4a90d9';

let i = 0;
function typeName() {
  if (i < nameText.length) {
    nameEl.textContent += nameText[i++];
    setTimeout(typeName, 80);
  } else {
    nameEl.style.borderRight = 'none';
    subtitleEl.style.borderRight = '2px solid #4a90d9';
    setTimeout(typeSubtitle, 300);
  }
}

let j = 0;
function typeSubtitle() {
  if (j < subtitleText.length) {
    subtitleEl.textContent += subtitleText[j++];
    setTimeout(typeSubtitle, 50);
  } else {
    setTimeout(() => subtitleEl.style.borderRight = 'none', 500);
  }
}

setTimeout(typeName, 400);

// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.about-text, .stat-card, .timeline-item, .edu-card, .project-card, .skill-group, .contact-item'
).forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  el.classList.add('fade-up');
  observer.observe(el);
});

// Count-up animation for stat numbers
function countUp(el, target, suffix) {
  let start = 0;
  const isDecimal = target % 1 !== 0;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = (isDecimal ? start.toFixed(1) : Math.floor(start)) + suffix;
  }, step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const raw = el.dataset.value;
      const suffix = el.dataset.suffix || '';
      countUp(el, parseFloat(raw), suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => {
  statObserver.observe(el);
});

// Chelsea blue particle canvas in hero
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.8 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.7 ? '#dba111' : '#4a90d9';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

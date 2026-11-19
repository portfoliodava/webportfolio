// Animasi skill bar, navigasi aktif, header saat scroll, dan menu mobile.
const skillBars = document.querySelectorAll('.bar-fill');
skillBars.forEach((bar) => {
  const target = bar.style.width;
  bar.style.width = '0';
  bar.dataset.target = target;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    if (entry.target.classList.contains('bar-fill')) {
      entry.target.style.width = entry.target.dataset.target;
    }
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.16 });

skillBars.forEach((bar) => observer.observe(bar));

document.querySelectorAll(
  '.skills-left, .skills-right, .tech-card, .exp-card, .edu-card, .contact-text, .contact-poster'
).forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
const header = document.querySelector('.header');

function updateOnScroll() {
  let active = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) active = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
  });
  header?.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', updateOnScroll, { passive: true });
updateOnScroll();

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Buka navigasi' : 'Tutup navigasi');
  nav?.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Buka navigasi');
  });
});

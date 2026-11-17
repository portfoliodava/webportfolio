// 1. Animasi bar keahlian saat section-nya kelihatan
const barIsi = document.querySelectorAll('.bar-fill');

barIsi.forEach(function(bar) {
  const target = bar.style.width;
  bar.style.width = '0';
  bar.dataset.target = target;
});

const pengamat = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.target;
    }
  });
}, { threshold: 0.5 });

barIsi.forEach(function(bar) {
  pengamat.observe(bar);
});

// 2. Menu aktif sesuai section yang sedang dibaca
const semuaSection = document.querySelectorAll('section[id]');
const semuaMenu = document.querySelectorAll('.nav a');

window.addEventListener('scroll', function() {
  let aktif = '';
  semuaSection.forEach(function(section) {
    if (window.scrollY >= section.offsetTop - 120) {
      aktif = section.id;
    }
  });
  semuaMenu.forEach(function(menu) {
    menu.classList.toggle('active', menu.getAttribute('href') === '#' + aktif);
  });

  // 3. Bayangan header saat scroll
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 10);
});

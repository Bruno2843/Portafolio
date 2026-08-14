/* ============================================================
   BRUNO OLMOS — PORTFOLIO
   script.js
   ============================================================ */

'use strict';

/* ---------- NAVBAR: scroll state ---------- */
const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run once on load


/* ---------- NAVBAR: active section highlight ---------- */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let currentId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
}


/* ---------- MOBILE MENU ---------- */
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');
const mobileLinks = document.querySelectorAll('.nav-mobile a');

function openMenu() {
  navToggle.classList.add('open');
  navMobile.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navToggle.classList.remove('open');
  navMobile.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});


/* ---------- SMOOTH SCROLL for all anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ---------- REVEAL ON SCROLL (Intersection Observer) ---------- */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  // Primero ocultamos todos los elementos que NO están en el viewport inicial
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Si el elemento está debajo del fold, lo ocultamos para animarlo
    if (rect.top > window.innerHeight) {
      el.classList.add('hidden');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealEls.forEach(el => {
    if (el.classList.contains('hidden')) {
      observer.observe(el);
    }
  });
} 
// Si no hay IntersectionObserver, los elementos ya son visibles por defecto (no se ocultaron)


/* ---------- TYPED EFFECT (hero subtitle) ---------- */
const typedEl = document.getElementById('typed-subtitle');

if (typedEl) {
  const phrases = [
    'Desarrollador Web Junior',
    'Estudiante de Desarrollo de Software',
    'Backend Developer en formación'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pauseAfterType = false;

  function type() {
    const current = phrases[phraseIndex];
    if (pauseAfterType) {
      pauseAfterType = false;
      setTimeout(type, 1600);
      return;
    }
    if (!deleting && charIndex <= current.length) {
      typedEl.textContent = current.slice(0, charIndex);
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        pauseAfterType = true;
        setTimeout(type, 80);
        return;
      }
      setTimeout(type, 60);
    } else {
      typedEl.textContent = current.slice(0, charIndex);
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 32);
    }
  }
  type();
}


/* ---------- CURRENT YEAR (footer) ---------- */
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

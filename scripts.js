/* ================================================
   SARA BELLA LONDON — scripts.js
   ================================================ */

/* ── 1. Age Gate ─────────────────────────────── */
(function initAgeGate() {
  const gate = document.getElementById('age-gate');
  if (!gate) return;

  if (sessionStorage.getItem('ageAccepted') === 'true') {
    gate.style.display = 'none';
    document.body.classList.remove('age-gated');
    return;
  }

  document.body.style.overflow = 'hidden';

  document.getElementById('age-enter').addEventListener('click', function () {
    sessionStorage.setItem('ageAccepted', 'true');
    document.body.classList.remove('age-gated');
    gate.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(function () { gate.style.display = 'none'; }, 420);
  });

  document.getElementById('age-leave').addEventListener('click', function () {
    window.location.href = 'https://www.google.com';
  });
})();

/* ── 2. Nav Scroll State ─────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 3. Mobile Hamburger ─────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const overlay = document.getElementById('nav-overlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', function () {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── 4. Gallery Lightbox ─────────────────────── */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  const items = Array.from(document.querySelectorAll('.gallery-item'));

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[currentIndex];
    const img = item.querySelector('img');
    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    } else {
      lightboxImg.src = '';
      lightboxImg.alt = 'Gallery photo';
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();

/* ── 5. GSAP Scroll-Triggered Reveals ────────── */
(function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* Hero staggered fade-up */
  const heroEls = document.querySelectorAll('.hero__content .eyebrow, .hero__content .display-name, .hero__content .subtitle-italic, .hero__content .gold-line, .hero__content .hero__intro, .hero__content .hero__cta, .hero__content .hero__social');
  if (heroEls.length) {
    gsap.from(heroEls, {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power2.out',
      delay: 0.3
    });
  }

  /* Section reveals */
  document.querySelectorAll('.reveal').forEach(function (el) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out'
    });
  });
})();

/* ── 6. Smooth Scroll for Anchor Links ────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

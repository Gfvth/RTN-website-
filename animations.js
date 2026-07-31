/**
 * RTN CAFE — animations.js
 * Handles: scroll-reveal (IntersectionObserver),
 *          animated counters.
 */

'use strict';

/* ── Scroll Reveal ──────────────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!targets.length) return;

  // Respect user's reduced-motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
})();

/* ── Animated Counters ──────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stats__num[data-target]');
  if (!counters.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400; // ms
    const startTime = performance.now();
    const isFloat = !Number.isInteger(target);

    if (reducedMotion) {
      el.textContent = isFloat
        ? target.toFixed(1) + suffix
        : Math.round(target) + suffix;
      return;
    }

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = isFloat
        ? current.toFixed(1) + suffix
        : Math.round(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isFloat
          ? target.toFixed(1) + suffix
          : Math.round(target) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ── Parallax on hero background (subtle) ───────────────── */
(function initHeroParallax() {
  const heroImg = document.querySelector('.hero__img');
  if (!heroImg) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const hero = document.querySelector('.hero');
        if (!hero) { ticking = false; return; }
        const heroBottom = hero.getBoundingClientRect().bottom + scrollY;

        if (scrollY < heroBottom) {
          heroImg.style.transform = `scale(1) translateY(${scrollY * 0.12}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ── Staggered card entrance when visible ───────────────── */
(function initStaggeredCards() {
  const grids = document.querySelectorAll('.reasons__grid, .menu__grid, .reviews__grid');
  if (!grids.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  grids.forEach(grid => {
    const cards = Array.from(grid.children);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 0.06}s`;
          card.classList.add('revealed');
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    // Add reveal classes to child cards if not already set
    cards.forEach(card => {
      if (!card.classList.contains('reveal-up') &&
          !card.classList.contains('reveal-left') &&
          !card.classList.contains('reveal-right')) {
        card.classList.add('reveal-up');
      }
    });

    observer.observe(grid);
  });
})();

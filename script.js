/**
 * RTN CAFE — script.js
 * Handles: loader, nav scroll/active, mobile menu,
 *          back-to-top, contact form, opening hours,
 *          footer year, ripple buttons.
 */

'use strict';

/* ── Loader ─────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide once page is fully loaded
  function hideLoader() {
    loader.classList.add('hidden');
    // Remove from DOM after transition
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 400));
  }
})();

/* ── Footer year ────────────────────────────────────────── */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── Sticky nav + active link ───────────────────────────── */
(function initNav() {
  const header  = document.getElementById('header');
  const links   = document.querySelectorAll('.nav__link');
  const sections = Array.from(document.querySelectorAll('section[id], div[id]'))
    .filter(s => document.querySelector(`.nav__link[href="#${s.id}"]`));

  function onScroll() {
    // Scrolled class for glass nav
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let currentId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) currentId = section.id;
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ── Mobile hamburger menu ──────────────────────────────── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ── Back to top ────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Opening hours — highlight today ───────────────────── */
(function initHours() {
  const today = new Date().getDay(); // 0=Sun … 6=Sat
  const items = document.querySelectorAll('.hours__item[data-day]');
  const status = document.getElementById('openStatus');

  const schedule = [
    { open: 16, close: 22, closeMin: 30 }, // Sun
    { open: 16, close: 22, closeMin: 30 }, // Mon
    { open: 16, close: 23, closeMin: 30 }, // Tue
    { open: 16, close: 22, closeMin: 30 }, // Wed
    { open: 16, close: 22, closeMin: 30 }, // Thu
    { open: 16, close: 22, closeMin: 30 }, // Fri
    { open: 16, close: 23, closeMin: 0  }, // Sat
  ];

  items.forEach(item => {
    if (parseInt(item.dataset.day, 10) === today) {
      item.classList.add('today');
      item.setAttribute('aria-current', 'day');
    }
  });

  if (status) {
    const now      = new Date();
    const h        = now.getHours();
    const m        = now.getMinutes();
    const todaySch = schedule[today];
    const nowMins  = h * 60 + m;
    const openMins = todaySch.open * 60;
    const closeMins= todaySch.close * 60 + todaySch.closeMin;
    const isOpen   = nowMins >= openMins && nowMins < closeMins;

    if (isOpen) {
      const closeH = todaySch.close;
      const closeM = todaySch.closeMin.toString().padStart(2, '0');
      const period = closeH >= 12 ? 'PM' : 'AM';
      const displayH = closeH > 12 ? closeH - 12 : closeH;
      status.textContent = `Open now — closes at ${displayH}:${closeM} ${period}`;
      status.style.color = 'var(--clr-gold)';
    } else {
      status.textContent = 'Closed now — opens today at 4:00 PM';
      status.style.color = 'var(--clr-text-dim)';
    }
  }
})();

/* ── Contact form ───────────────────────────────────────── */
(function initContactForm() {
  const form     = document.getElementById('contactForm');
  const fields   = document.getElementById('formFields');
  const success  = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#c0392b';
        valid = false;
      }
    });

    // Email format
    const emailInput = form.querySelector('#femail');
    if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailInput.style.borderColor = '#c0392b';
      valid = false;
    }

    if (!valid) return;

    // Simulate send (GitHub Pages has no backend — integrate Formspree/Netlify Forms separately)
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      if (fields)  fields.style.display = 'none';
      if (success) success.removeAttribute('hidden');
    }, 900);
  });

  // Live validation feedback
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
})();

/* ── Ripple effect on buttons ───────────────────────────── */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();

/* ── Smooth scroll polyfill for older Safari ────────────── */
(function smoothScrollFallback() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/**
 * RTN CAFE — menu.js
 * Handles: menu category filtering with smooth
 *          hide/show transitions.
 */

'use strict';

(function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.menu__filter');
  const menuCards  = document.querySelectorAll('.menu-card');
  const menuGrid   = document.getElementById('menuGrid');
  if (!filterBtns.length || !menuCards.length) return;

  function filterMenu(category) {
    menuCards.forEach(card => {
      const cat = card.dataset.cat;
      const show = category === 'all' || cat === category;

      if (show) {
        card.style.display = '';
        // Trigger re-render for animation
        requestAnimationFrame(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .35s ease, transform .35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 350);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      filterMenu(btn.dataset.filter);
    });

    // Keyboard navigation for tablist role
    btn.addEventListener('keydown', e => {
      const tabs = Array.from(filterBtns);
      const idx  = tabs.indexOf(btn);
      let next;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = tabs[(idx + 1) % tabs.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = tabs[(idx - 1 + tabs.length) % tabs.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = tabs[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        next = tabs[tabs.length - 1];
      }

      if (next) {
        next.focus();
        next.click();
      }
    });
  });

  // Show all on init
  filterMenu('all');
})();

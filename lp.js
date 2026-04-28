/* ============================================================
   VOCÊ É UMA FARSA — Landing Page Scripts
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     COUNTDOWN TIMER
     24h por sessão; reseta se passou mais de 24h
  ---------------------------------------------------------- */
  const DURATION = 15 * 60; // 15 minutos em segundos
  const STORAGE_KEY = 'farsa_countdown_start';

  function getSecondsLeft() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, now);
      return DURATION;
    }
    const elapsed = Math.floor((now - Number(stored)) / 1000);
    if (elapsed >= DURATION) {
      localStorage.setItem(STORAGE_KEY, now);
      return DURATION;
    }
    return DURATION - elapsed;
  }

  function formatTime(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
  }

  function initCountdown() {
    const displays = document.querySelectorAll('[data-countdown]');
    if (!displays.length) return;

    function tick() {
      const secs = getSecondsLeft();
      const formatted = formatTime(secs);
      displays.forEach(el => { el.textContent = formatted; });
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ----------------------------------------------------------
     FAQ ACCORDION
     Um item aberto por vez
  ---------------------------------------------------------- */
  function initFaq() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(item => {
      const btn = item.querySelector('.faq__question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach(i => {
          i.classList.remove('is-open');
          const q = i.querySelector('.faq__question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Abre o primeiro item por padrão
    if (items[0]) {
      items[0].classList.add('is-open');
      const firstBtn = items[0].querySelector('.faq__question');
      if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    }
  }

  /* ----------------------------------------------------------
     CHECKBOXES INTERATIVOS (Seção 2)
  ---------------------------------------------------------- */
  function initCheckboxes() {
    const items = document.querySelectorAll('.check-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
      });
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.classList.toggle('checked');
        }
      });
    });
  }

  /* ----------------------------------------------------------
     STICKY CTA (mobile)
     Aparece ao sair do hero
  ---------------------------------------------------------- */
  function initStickyCta() {
    const sticky = document.querySelector('.sticky-cta');
    const hero = document.querySelector('.hero');
    if (!sticky || !hero) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            sticky.classList.add('visible');
          } else {
            sticky.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
  }

  /* ----------------------------------------------------------
     SMOOTH SCROLL para âncoras de CTA
  ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href="#oferta"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector('#oferta');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initFaq();
    initCheckboxes();
    initStickyCta();
    initSmoothScroll();
  });
}());

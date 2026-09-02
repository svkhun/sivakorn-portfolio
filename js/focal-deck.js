/**
 * Interactive Layered Bento Deck (2D Focal Showcase)
 * Sivakorn Khundilokrattaya - Machine Learning & Engineering Showcase
 * Replaces 3D coverflow with a 2D flat stacked focal showcase with mouse spotlight,
 * zero text distortion, progress counter, keyboard navigation, and touch swiping.
 */

(function () {
  'use strict';

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;

  let deckStage, deckTrack, cards, prevBtn, nextBtn, counterEl, progressFill;

  function initElements() {
    deckStage = document.getElementById('focal-deck-stage');
    if (!deckStage) return;

    deckTrack = deckStage.querySelector('.focal-deck-track');
    cards = deckStage.querySelectorAll('.focal-deck-card');
    prevBtn = document.getElementById('deck-prev-btn');
    nextBtn = document.getElementById('deck-next-btn');
    counterEl = document.getElementById('deck-counter-text');
    progressFill = document.getElementById('deck-progress-fill');
  }

  function updateDeck() {
    if (!cards || !cards.length) return;

    const total = cards.length;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const spacing = isMobile ? 320 : (isTablet ? 460 : 580);

    cards.forEach((card, idx) => {
      let offset = idx - currentIndex;

      // Handle wrapping for infinite circular feel
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      let transform = '';
      let opacity = 0;
      let pointerEvents = 'none';
      let zIndex = 1;

      if (offset === 0) {
        // Active Focal Center Card: Subtle scale-102 with full clarity & top z-index
        transform = `translateX(0px) scale(1.02)`;
        opacity = 1;
        pointerEvents = 'auto';
        zIndex = 10;
        card.classList.add('active');
        card.classList.remove('inactive');
      } else if (offset === 1) {
        // Immediate Right Preview Card: 40% opacity, scale-93, lower z-index
        transform = `translateX(${spacing}px) scale(0.93)`;
        opacity = 0.40;
        pointerEvents = 'auto';
        zIndex = 4;
        card.classList.remove('active');
        card.classList.add('inactive');
      } else if (offset === -1) {
        // Immediate Left Preview Card: 40% opacity, scale-93, lower z-index
        transform = `translateX(-${spacing}px) scale(0.93)`;
        opacity = 0.40;
        pointerEvents = 'auto';
        zIndex = 4;
        card.classList.remove('active');
        card.classList.add('inactive');
      } else {
        // Out of immediate view
        const tx = offset > 0 ? spacing * 1.6 : -spacing * 1.6;
        transform = `translateX(${tx}px) scale(0.85)`;
        opacity = 0;
        pointerEvents = 'none';
        zIndex = 1;
        card.classList.remove('active');
        card.classList.add('inactive');
      }

      card.style.transform = transform;
      card.style.opacity = opacity;
      card.style.pointerEvents = pointerEvents;
      card.style.zIndex = zIndex;
    });

    // Update Counter: e.g. "01 / 04"
    if (counterEl) {
      const currentFormatted = String(currentIndex + 1).padStart(2, '0');
      const totalFormatted = String(total).padStart(2, '0');
      counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    // Update Progress Bar
    if (progressFill) {
      const percent = ((currentIndex + 1) / total) * 100;
      progressFill.style.width = `${percent}%`;
    }
  }

  function goToIndex(index) {
    if (!cards || !cards.length) return;
    const total = cards.length;
    currentIndex = (index + total) % total;
    updateDeck();
  }

  function setupSpotlight() {
    if (!cards || !cards.length) return;

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  function setupListeners() {
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToIndex(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToIndex(currentIndex + 1);
      });
    }

    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // If clicking on an inspect button or live demo trigger, open drawer
        const drawerTrigger = e.target.closest('[data-open-drawer]');
        if (drawerTrigger) {
          const drawerId = drawerTrigger.getAttribute('data-open-drawer');
          if (drawerId && typeof window.openDrawer === 'function') {
            e.preventDefault();
            e.stopPropagation();
            window.openDrawer(drawerId);
            return;
          }
        }

        if (idx !== currentIndex) {
          e.preventDefault();
          e.stopPropagation();
          goToIndex(idx);
        } else {
          const drawerId = card.getAttribute('data-open-drawer');
          if (drawerId && typeof window.openDrawer === 'function') {
            window.openDrawer(drawerId);
          }
        }
      });
    });

    if (deckStage) {
      deckStage.addEventListener('touchstart', touchStart, { passive: true });
      deckStage.addEventListener('touchmove', touchMove, { passive: true });
      deckStage.addEventListener('touchend', touchEnd);

      deckStage.addEventListener('mousedown', dragStart);
      deckStage.addEventListener('mousemove', dragMove);
      deckStage.addEventListener('mouseup', dragEnd);
      deckStage.addEventListener('mouseleave', dragEnd);
    }

    window.addEventListener('keydown', (e) => {
      if (document.querySelector('.drawer-backdrop.active')) return;
      if (e.key === 'ArrowLeft') {
        goToIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToIndex(currentIndex + 1);
      }
    });

    window.addEventListener('resize', updateDeck);
  }

  function touchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToIndex(currentIndex - 1);
      } else {
        goToIndex(currentIndex + 1);
      }
      isDragging = false;
    }
  }

  function touchEnd() {
    isDragging = false;
  }

  function dragStart(e) {
    if (e.target.closest('button') || e.target.closest('a')) return;
    startX = e.clientX;
    isDragging = true;
  }

  function dragMove(e) {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 55) {
      if (diff > 0) {
        goToIndex(currentIndex - 1);
      } else {
        goToIndex(currentIndex + 1);
      }
      isDragging = false;
    }
  }

  function dragEnd() {
    isDragging = false;
  }

  window.initFocalDeck = function () {
    initElements();
    setupSpotlight();
    setupListeners();
    updateDeck();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initFocalDeck);
  } else {
    window.initFocalDeck();
  }
})();

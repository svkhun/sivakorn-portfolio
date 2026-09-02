/**
 * 3D Cover Flow Carousel for Featured Projects (svkhun)
 * Sivakorn Khundilokrattaya - Machine Learning Portfolio
 * Expanded horizontal spacing (340px), 0.45 side opacity, relaxed 600ms easing, and drawer triggers
 */

(function () {
  'use strict';

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;

  let carousel, track, cards, prevBtn, nextBtn, dotsContainer;

  function initElements() {
    carousel = document.getElementById('coverflow-carousel');
    if (!carousel) return;

    track = carousel.querySelector('.coverflow-track');
    cards = carousel.querySelectorAll('.coverflow-card');
    prevBtn = document.getElementById('coverflow-prev');
    nextBtn = document.getElementById('coverflow-next');
    dotsContainer = document.getElementById('coverflow-dots');
  }

  function createDots() {
    if (!dotsContainer || !cards || !cards.length) return;
    dotsContainer.innerHTML = '';

    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `coverflow-dot ${idx === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to project slide ${idx + 1}`);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToIndex(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateCoverflow() {
    if (!cards || !cards.length) return;

    const total = cards.length;
    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 200 : 320;

    cards.forEach((card, idx) => {
      const offset = idx - currentIndex;
      let transform = '';
      let opacity = 0.88;
      let zIndex = 10 - Math.abs(offset);

      if (offset === 0) {
        // Active Center Card: Fully focused, sharp, zero 3D text distortion
        transform = `translateX(0px) translateZ(0px) scale(1.02) rotateY(0deg)`;
        opacity = 1;
        card.classList.add('active');
        card.classList.remove('inactive');
      } else if (offset === 1) {
        // Immediate Right Card: Subtle 10deg angle, high 0.88 opacity for crystal-clear readability
        transform = `translateX(${spacing}px) translateZ(-25px) scale(0.94) rotateY(-10deg)`;
        opacity = 0.88;
        card.classList.remove('active');
        card.classList.add('inactive');
      } else if (offset === -1) {
        // Immediate Left Card: Subtle 10deg angle, high 0.88 opacity for crystal-clear readability
        transform = `translateX(-${spacing}px) translateZ(-25px) scale(0.94) rotateY(10deg)`;
        opacity = 0.88;
        card.classList.remove('active');
        card.classList.add('inactive');
      } else if (offset > 1) {
        const tx = offset * spacing;
        transform = `translateX(${tx}px) translateZ(-50px) scale(0.88) rotateY(-14deg)`;
        opacity = 0.45;
        card.classList.remove('active');
        card.classList.add('inactive');
      } else {
        const tx = offset * spacing;
        transform = `translateX(${tx}px) translateZ(-50px) scale(0.88) rotateY(14deg)`;
        opacity = 0.45;
        card.classList.remove('active');
        card.classList.add('inactive');
      }

      card.style.transform = transform;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.coverflow-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToIndex(index) {
    if (!cards || !cards.length) return;
    const total = cards.length;
    currentIndex = Math.max(0, Math.min(total - 1, index));
    updateCoverflow();
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

    if (carousel) {
      carousel.addEventListener('touchstart', touchStart, { passive: true });
      carousel.addEventListener('touchmove', touchMove, { passive: true });
      carousel.addEventListener('touchend', touchEnd);

      carousel.addEventListener('mousedown', dragStart);
      carousel.addEventListener('mousemove', dragMove);
      carousel.addEventListener('mouseup', dragEnd);
      carousel.addEventListener('mouseleave', dragEnd);
    }

    window.addEventListener('keydown', (e) => {
      if (document.querySelector('.drawer-backdrop.active')) return;
      if (e.key === 'ArrowLeft') {
        goToIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToIndex(currentIndex + 1);
      }
    });

    window.addEventListener('resize', updateCoverflow);
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
    carousel.style.cursor = 'grabbing';
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
    if (carousel) carousel.style.cursor = 'grab';
  }

  window.initCoverflowCarousel = function () {
    initElements();
    createDots();
    setupListeners();
    updateCoverflow();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initCoverflowCarousel);
  } else {
    window.initCoverflowCarousel();
  }
})();

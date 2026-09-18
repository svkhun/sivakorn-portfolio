/**
 * Portfolio App Controller
 * Handles Theme Toggling (Light/Dark), Mobile Navigation, Certificate Modal Previews, and Toast Feedback.
 */

(function () {
  'use strict';

  // 1. Theme Engine (Light / Dark Mode)
  const THEME_KEY = 'svkhun_theme_preference';
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    // Default to light mode (clean masterPortfolio style), or use user's saved preference
    const initialTheme = savedTheme || 'light';
    applyTheme(initialTheme);
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.className = 'fas fa-sun';
      }
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.className = 'fas fa-moon';
      }
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark') || 
                   document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking a nav link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 3. Highlight Active Nav Item
  function highlightActiveNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      } else if (page !== '' && page !== 'index.html' && href && href.includes(page)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (updateGliderGlobal) {
      const activeLink = document.querySelector('.nav-item a.active');
      updateGliderGlobal(activeLink, true);
    }
  }

  // 3.1 Dynamic Hardware-Accelerated Nav Glider (Sliding Underline / Pill)
  let updateGliderGlobal = null;

  function initNavGlider() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return null;

    let glider = navMenu.querySelector('.nav-active-glider');
    if (!glider) {
      glider = document.createElement('div');
      glider.className = 'nav-active-glider';
      glider.setAttribute('aria-hidden', 'true');
      navMenu.appendChild(glider);
    }

    navMenu.classList.add('has-glider');

    function getLinkElement(el) {
      if (!el) return null;
      return el.tagName === 'A' ? el : el.querySelector('a');
    }

    function updateGlider(targetEl, animate = true) {
      const link = getLinkElement(targetEl);
      if (!link || navMenu.classList.contains('active')) {
        glider.style.opacity = '0';
        return;
      }

      const menuRect = navMenu.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      if (linkRect.width === 0 || linkRect.height === 0) {
        glider.style.opacity = '0';
        return;
      }

      const left = linkRect.left - menuRect.left;
      const width = linkRect.width;

      if (!animate) {
        glider.style.transition = 'none';
      } else {
        glider.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), width 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
      }

      glider.style.transform = `translate3d(${left}px, 0, 0)`;
      glider.style.width = `${width}px`;
      glider.style.opacity = '1';
    }

    updateGliderGlobal = updateGlider;

    const currentActive = navMenu.querySelector('.nav-item a.active');
    updateGlider(currentActive, false);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const cur = navMenu.querySelector('.nav-item a.active');
        updateGlider(cur, false);
      });
    }

    navMenu.querySelectorAll('.nav-item a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        updateGlider(link, true);
      });
    });

    navMenu.addEventListener('mouseleave', () => {
      const cur = navMenu.querySelector('.nav-item a.active');
      updateGlider(cur, true);
    });

    window.addEventListener('resize', () => {
      const cur = navMenu.querySelector('.nav-item a.active');
      updateGlider(cur, false);
    }, { passive: true });

    return updateGlider;
  }

  // 4. Certificate Modal Viewer
  function bindCertModalEvents(modal) {
    if (!modal || modal.dataset.eventsBound === 'true') return;
    modal.dataset.eventsBound = 'true';
    const closeBtn = modal.querySelector('#cert-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCertModal);
    }
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeCertModal();
      }
    });
  }

  function openCertModal(title, imgSrc) {
    let modal = document.getElementById('cert-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-backdrop';
      modal.id = 'cert-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'cert-modal-title');
      modal.innerHTML = `
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title" id="cert-modal-title">Certificate Verification</h3>
            <button class="modal-close-btn" id="cert-modal-close" aria-label="Close modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <img src="" alt="Verified Certificate Report" id="cert-modal-img" class="modal-image">
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    bindCertModalEvents(modal);

    const titleEl = modal.querySelector('#cert-modal-title');
    const imgEl = modal.querySelector('#cert-modal-img');
    if (titleEl) titleEl.textContent = title;
    if (imgEl) imgEl.src = imgSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  const initialCertModal = document.getElementById('cert-modal');
  if (initialCertModal) {
    bindCertModalEvents(initialCertModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('cert-modal');
      if (modal && modal.classList.contains('active')) {
        closeCertModal();
      }
    }
  });

  // Global Delegated Click Handler for Certificate preview & Email copy
  document.addEventListener('click', function (e) {
    const certBtn = e.target.closest('[data-open-cert]');
    if (certBtn) {
      e.preventDefault();
      const title = certBtn.getAttribute('data-cert-title') || 'Certificate Verification';
      const imgSrc = certBtn.getAttribute('data-cert-img');
      if (imgSrc) {
        openCertModal(title, imgSrc);
      }
      return;
    }

    const emailBtn = e.target.closest('[data-copy-email]');
    if (emailBtn) {
      e.preventDefault();
      const email = emailBtn.getAttribute('data-copy-email') || 'sivakorn.khun@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('✓ Email copied to clipboard: ' + email);
        }).catch(() => {
          showToast('Email: ' + email);
        });
      } else {
        showToast('Email: ' + email);
      }
      return;
    }
  });

  // 5. Toast Feedback
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2800);
  }

  // 6. Assessment Accordion Interactive Label Sync
  function initAssessmentAccordion() {
    document.querySelectorAll('.assessment-accordion').forEach(accordion => {
      if (accordion.dataset.accordionInit === 'true') return;
      accordion.dataset.accordionInit = 'true';
      accordion.addEventListener('toggle', function () {
        const triggerText = this.querySelector('.accordion-trigger-text');
        if (triggerText) {
          triggerText.textContent = this.open 
            ? 'Hide Score Breakdown & Details' 
            : 'View Score Breakdown & Details';
        }
      });
    });
  }

  // 7. Signature Intro Preloader Controller ("Sivakorn") & Home Entrance Orchestrator
  const preloader = document.getElementById('signature-preloader');
  const skipBtn = document.getElementById('sig-skip-btn');
  const INTRO_SESSION_KEY = 'svkhun_intro_played';

  function triggerHeroEntrance() {
    const hero = document.getElementById('home-hero');
    if (!hero) return;

    requestAnimationFrame(() => {
      hero.classList.remove('hero-intro-ready');
      hero.classList.add('hero-intro-animate');

      const portraitWrap = hero.querySelector('.hero-illustration-wrapper');
      if (portraitWrap) {
        setTimeout(() => {
          portraitWrap.classList.add('is-floating');
        }, 1100);
      }
    });
  }

  function initSignaturePreloader() {
    if (!preloader) {
      triggerHeroEntrance();
      return;
    }

    // Check if user reloaded the page (F5/refresh) or if it's first visit in session
    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0) {
        isReload = navEntries[0].type === 'reload';
      } else if (performance.navigation) {
        isReload = performance.navigation.type === 1; // TYPE_RELOAD
      }
    } catch (e) {
      isReload = false;
    }

    let hasPlayedThisSession = false;
    try {
      hasPlayedThisSession = sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
    } catch (e) {
      hasPlayedThisSession = false;
    }

    // If already played in this session and NOT a hard refresh, dismiss immediately and start hero
    if (hasPlayedThisSession && !isReload) {
      preloader.style.display = 'none';
      preloader.classList.add('fade-out');
      triggerHeroEntrance();
      return;
    }

    // Mark as played for this session
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch (e) {}

    // Put Home hero in ready state while preloader runs
    const homeHero = document.getElementById('home-hero');
    if (homeHero) {
      homeHero.classList.add('hero-intro-ready');
    }

    // Dismiss function
    let dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      preloader.classList.add('fade-out');
      triggerHeroEntrance();
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 480);
    }

    // Auto-dismiss after animation completes (~2.3s)
    const timer = setTimeout(dismiss, 2300);

    // Skip Button Handler
    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        clearTimeout(timer);
        dismiss();
      });
    }

    // Click anywhere on overlay to dismiss immediately
    preloader.addEventListener('click', function () {
      clearTimeout(timer);
      dismiss();
    });

    // Keyboard ESC or Space to skip immediately
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === ' ') {
        clearTimeout(timer);
        dismiss();
      }
    });

    // Clicking brand logo on index page can replay intro
    const brandLogo = document.querySelector('.brand-logo');
    if (brandLogo) {
      brandLogo.addEventListener('click', function (e) {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        if (page === 'index.html' || page === '') {
          try {
            sessionStorage.removeItem(INTRO_SESSION_KEY);
          } catch (err) {}
        }
      });
    }
  }

  // 8. Hairline Scroll Progress Bar
  function initScrollProgress() {
    let progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress-bar';
      progressBar.setAttribute('aria-hidden', 'true');
      document.body.prepend(progressBar);
    }

    let ticking = false;
    function updateProgress() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(Math.max(scrollY / height, 0), 1) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  // 9. Back-to-Top Floating Button with Circular SVG Progress Ring
  function initBackToTop() {
    let btt = document.getElementById('back-to-top');
    if (!btt) {
      btt = document.createElement('button');
      btt.id = 'back-to-top';
      btt.setAttribute('type', 'button');
      btt.setAttribute('aria-label', 'Scroll back to top');
      btt.setAttribute('title', 'Back to top');
      btt.innerHTML = `
        <svg class="btt-ring-svg" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="btt-ring-bg" cx="24" cy="24" r="23"></circle>
          <circle class="btt-ring-circle" cx="24" cy="24" r="23"></circle>
        </svg>
        <i class="fas fa-arrow-up" aria-hidden="true"></i>
      `;
      document.body.appendChild(btt);
    }

    const ring = btt.querySelector('.btt-ring-circle');
    const circumference = 144.5;
    let ticking = false;

    function onScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(Math.max(scrollY / height, 0), 1) : 0;

      if (scrollY > 350) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }

      if (ring) {
        const offset = circumference - (progress * circumference);
        ring.style.strokeDashoffset = offset;
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    btt.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    onScroll();
  }

  // 10. Bi-Directional Scroll Animation Engine with Page-Format Choreography
  let scrollDirTrackerBound = false;

  function initScrollDirectionTracker() {
    if (scrollDirTrackerBound) return;
    scrollDirTrackerBound = true;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTicking = false;

    function updateScrollDirection() {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (Math.abs(currentScrollY - lastScrollY) > 6) {
        const dir = currentScrollY > lastScrollY ? 'down' : 'up';
        document.body.setAttribute('data-scroll-dir', dir);
        lastScrollY = currentScrollY;
      }
      scrollTicking = false;
    }

    window.addEventListener('scroll', function () {
      if (!scrollTicking) {
        requestAnimationFrame(updateScrollDirection);
        scrollTicking = true;
      }
    }, { passive: true });
    updateScrollDirection();
  }

  function initScrollReveal() {
    initScrollDirectionTracker();

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.scroll-anim').forEach(el => el.classList.add('is-in-view'));
      return;
    }

    // 10.2 Collect all animated targets across all page formats
    const targetSelectors = [
      '.scroll-anim',
      '.stat-box',
      '.full-width-panel',
      '.hero-architecture-card',
      '.work-timeline-item',
      '.work-project-row',
      '.assessment-card-panel',
      '.cert-card',
      '.tech-stack-card',
      // Format 6: Case Study Components
      '.case-section-airy',
      '.case-thesis-quote',
      '.graph-preview-canvas-box',
      '.wealth-sim-card',
      '.waterfall-tier-card',
      '.ev-monograph',
      '.scorecard-interactive-box',
      '.woe-bar-container',
      '.iot-console-box',
      '.oee-pill-card',
      '.clinical-horizon-wrap',
      '.clinical-horizon-step',
      '.bedside-card-mockup'
    ];

    const elements = document.querySelectorAll(targetSelectors.join(', '));
    if (!elements || elements.length === 0) return;

    // Ensure all target elements have .scroll-anim base class
    elements.forEach(el => {
      el.classList.add('scroll-anim');
    });

    // 10.3 Compute cascade stagger within sibling groups
    const parentGroups = new Map();
    elements.forEach(el => {
      const parent = el.parentElement;
      if (parent) {
        if (!parentGroups.has(parent)) {
          parentGroups.set(parent, []);
        }
        parentGroups.get(parent).push(el);
      }
    });

    parentGroups.forEach(group => {
      if (group.length > 1) {
        group.forEach((el, idx) => {
          if (!el.style.getPropertyValue('--anim-delay')) {
            el.style.setProperty('--anim-delay', `${Math.min(idx * 65, 300)}ms`);
          }
        });
      }
    });

    // 10.4 Bi-Directional Intersection Observer
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('is-in-view');

            // Trigger score and WoE bar sweeps if applicable
            const fills = el.querySelectorAll('.anim-bar-sweep-fill, .woe-fill');
            fills.forEach(fill => {
              const target = fill.getAttribute('data-target-width') || fill.style.getPropertyValue('--target-width');
              if (target) {
                fill.style.setProperty('--target-width', target);
              }
            });
          } else {
            // When user scrolls well past the element, reset so it smoothly re-enters when scrolling back
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight + 100 || rect.bottom < -100) {
              el.classList.remove('is-in-view');
            }
          }
        });
      }, {
        threshold: [0, 0.12],
        rootMargin: '0px 0px -20px 0px'
      });

      elements.forEach(el => observer.observe(el));
    } else {
      elements.forEach(el => el.classList.add('is-in-view'));
    }
  }

  // 11. Linear/Stripe Interactive Mouse Spotlight
  function initSpotlightCards() {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cardSelectors = [
      '.stat-box',
      '.full-width-panel',
      '.hero-architecture-card',
      '.terminal-card',
      '.work-history-card',
      '.cert-card',
      '.rounded-2xl.border',
      '[class*="rounded-2xl"][class*="border"]',
      '.waterfall-tier-card',
      '.ev-monograph',
      '.scorecard-interactive-box',
      '.oee-pill-card',
      '.bedside-card-mockup'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(', '));
    cards.forEach(card => {
      card.classList.add('spotlight-card');

      card.addEventListener('pointermove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });
  }

  // 12. Hero Architecture Card Interactive 3D Perspective Tilt
  function initHeroTilt() {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroCard = document.querySelector('.hero-architecture-card');
    if (!heroCard) return;

    const img = heroCard.querySelector('img');
    if (!img) return;

    let isHovered = false;

    heroCard.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    heroCard.addEventListener('mousemove', (e) => {
      if (!isHovered) return;
      const rect = heroCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-y * 14).toFixed(2);
      const rotateY = (x * 14).toFixed(2);

      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }, { passive: true });

    heroCard.addEventListener('mouseleave', () => {
      isHovered = false;
      img.style.transform = '';
    });
  }

  // 13. Dynamic Quantitative Metric Counter Animation
  function initStatCounters() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const statElements = document.querySelectorAll('.stat-number');
    if (!statElements || statElements.length === 0) return;

    const statsData = [];

    statElements.forEach(el => {
      if (el.hasAttribute('data-no-counter')) return;
      const originalHTML = el.innerHTML;
      const originalText = el.textContent.trim();
      // Match pattern like "11.62 ms", "0.894", "97 / 150", "2.0B THB"
      const match = originalText.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
      if (match) {
        const prefix = match[1];
        const numStr = match[2].replace(/,/g, '');
        const suffix = match[3].trim();
        const targetVal = parseFloat(numStr);
        const decimalPlaces = numStr.includes('.') ? numStr.split('.')[1].length : 0;

        statsData.push({
          element: el,
          prefix,
          targetVal,
          decimalPlaces,
          suffix,
          originalHTML,
          originalText,
          animated: false
        });
      }
    });

    if (statsData.length === 0) return;

    function animateNumber(item) {
      if (item.animated) return;
      item.animated = true;

      const duration = 1150; // ms
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Silky smooth cubic ease-out
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = item.targetVal * ease;

        let formattedVal;
        if (item.decimalPlaces > 0) {
          formattedVal = currentVal.toFixed(item.decimalPlaces);
        } else {
          formattedVal = Math.round(currentVal).toString();
        }

        if (progress < 1) {
          if (item.suffix) {
            if (item.suffix.startsWith('/')) {
              item.element.innerHTML = `${item.prefix}${formattedVal}<span class="stat-denom"> ${item.suffix}</span>`;
            } else {
              item.element.innerHTML = `${item.prefix}${formattedVal} <span class="stat-unit">${item.suffix}</span>`;
            }
          } else {
            item.element.textContent = `${item.prefix}${formattedVal}`;
          }
          requestAnimationFrame(step);
        } else {
          item.element.innerHTML = item.originalHTML;
        }
      }

      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const matched = statsData.find(s => s.element === entry.target);
            if (matched) {
              animateNumber(matched);
              obs.unobserve(entry.target);
            }
          }
        });
      }, {
        threshold: 0.2
      });

      statsData.forEach(item => observer.observe(item.element));
    } else {
      statsData.forEach(item => animateNumber(item));
    }
  }

  // 17. Seamless Fluid Page & Section Transition Engine (Linear / Stripe Grade)
  function initPageTransitions() {
    let loader = document.getElementById('page-nav-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'page-nav-loader';
      loader.setAttribute('aria-hidden', 'true');
      document.body.prepend(loader);
    }

    let isNavigating = false;

    function isInternalLink(link) {
      if (!link || !link.href) return false;
      if (link.target && link.target !== '_self' && link.target !== '') return false;
      if (link.hasAttribute('download') || link.getAttribute('rel') === 'external') return false;
      if (link.hasAttribute('data-open-cert') || link.hasAttribute('data-copy-email')) return false;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return false;
      }

      try {
        const dest = new URL(link.href, window.location.href);
        return dest.origin === window.location.origin;
      } catch (e) {
        return false;
      }
    }

    async function navigateTo(targetHref, pushState = true) {
      if (isNavigating) return;

      const currentUrl = new URL(window.location.href);
      const destUrl = new URL(targetHref, window.location.href);

      // Same page anchor or exact same URL
      if (currentUrl.pathname === destUrl.pathname && currentUrl.search === destUrl.search) {
        if (destUrl.hash) {
          const el = document.querySelector(destUrl.hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      isNavigating = true;

      // Start progress bar sweep
      loader.classList.remove('is-complete');
      loader.classList.add('is-loading');

      // Instant active nav feedback & glider transition
      const navMenu = document.getElementById('nav-menu');
      if (navMenu) {
        const targetPage = destUrl.pathname.split('/').pop() || 'index.html';
        const targetNav = Array.from(navMenu.querySelectorAll('.nav-item a')).find(a => {
          const h = a.getAttribute('href');
          return h === targetPage || (targetPage === 'index.html' && h === 'index.html');
        });
        if (targetNav) {
          navMenu.querySelectorAll('.nav-item a').forEach(a => a.classList.remove('active'));
          targetNav.classList.add('active');
          if (updateGliderGlobal) updateGliderGlobal(targetNav, true);
        }
      }

      // Close mobile nav drawer if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const mobileToggle = document.getElementById('mobile-nav-toggle');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }
      }

      // Smooth Exit Phase for current main content
      const currentMain = document.querySelector('main');
      if (currentMain) {
        currentMain.classList.remove('page-entered', 'page-entering');
        currentMain.classList.add('page-exiting');
      }

      const minExitDuration = 220; // ms
      const startTime = performance.now();

      try {
        const response = await fetch(destUrl.href);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();

        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        const newMain = newDoc.querySelector('main');
        const newTitle = newDoc.querySelector('title')?.textContent || document.title;

        if (!newMain) {
          window.location.href = destUrl.href;
          return;
        }

        // Wait for exit animation to complete smoothly
        const elapsed = performance.now() - startTime;
        if (elapsed < minExitDuration) {
          await new Promise(r => setTimeout(r, minExitDuration - elapsed));
        }

        // Complete progress bar
        loader.classList.remove('is-loading');
        loader.classList.add('is-complete');

        // Update Document Title and URL
        document.title = newTitle;
        if (pushState) {
          window.history.pushState({ path: destUrl.href }, newTitle, destUrl.href);
        }

        // Scroll instantly to top before rendering new page
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // Swap Main Content & Trigger Enter Phase
        if (currentMain) {
          currentMain.innerHTML = newMain.innerHTML;
          currentMain.className = newMain.className;
          currentMain.classList.remove('page-exiting');
          currentMain.classList.add('page-entering');

          // Force reflow
          void currentMain.offsetWidth;

          currentMain.classList.remove('page-entering');
          currentMain.classList.add('page-entered');

          setTimeout(() => {
            currentMain.classList.remove('page-entered');
          }, 480);
        }

        setTimeout(() => {
          loader.classList.remove('is-complete');
        }, 320);

        // Highlight Active Nav & sync glider
        highlightActiveNav();

        // Re-initialize interactive modules on new page
        reinitPageModules(newDoc);

      } catch (err) {
        console.warn('Page transition fallback to default navigation:', err);
        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, minExitDuration - elapsed);
        setTimeout(() => {
          window.location.href = destUrl.href;
        }, remaining);
      } finally {
        isNavigating = false;
      }
    }

    // Intercept internal link clicks
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      if (isInternalLink(link)) {
        e.preventDefault();
        navigateTo(link.href, true);
      }
    });

    // Browser navigation (Back / Forward)
    window.addEventListener('popstate', function () {
      navigateTo(window.location.href, false);
    });
  }

  function reinitPageModules(newDoc) {
    initScrollReveal();
    initSpotlightCards();
    initStatCounters();
    initHeroTilt();
    initWorkAccordion();
    initTechStackFilter();
    initAssessmentAccordion();

    // Trigger Home hero cascade entrance if on Home page
    const homeHero = document.getElementById('home-hero');
    if (homeHero) {
      triggerHeroEntrance();
    }

    // Execute any page-specific inline scripts (e.g. interactive case studies)
    if (newDoc) {
      const inlineScripts = newDoc.querySelectorAll('script:not([src])');
      inlineScripts.forEach(script => {
        try {
          const fn = new Function(script.textContent);
          fn();
        } catch (e) {
          console.warn('Inline script execution error:', e);
        }
      });
    }
  }

  // Initialize on load
  function initApp() {
    initTheme();
    highlightActiveNav();
    initNavGlider();
    initSignaturePreloader();

    // If on Home page and preloader is not present or already dismissed, trigger hero entrance
    const homeHero = document.getElementById('home-hero');
    const preloaderEl = document.getElementById('signature-preloader');
    if (homeHero && (!preloaderEl || preloaderEl.style.display === 'none' || preloaderEl.classList.contains('fade-out'))) {
      triggerHeroEntrance();
    }

    initScrollProgress();
    initBackToTop();
    initScrollReveal();
    initSpotlightCards();
    initHeroTilt();
    initStatCounters();
    initWorkAccordion();
    initTechStackFilter();
    initAssessmentAccordion();
    initPageTransitions();
  }

  // 15. Work Page Hover & Click Accordion Toggle
  function initWorkAccordion() {
    const rows = document.querySelectorAll('.work-project-row');
    if (!rows || rows.length === 0) return;

    rows.forEach(row => {
      const summary = row.querySelector('.work-row-summary');
      if (!summary) return;

      summary.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        row.classList.toggle('is-expanded');
      });
    });
  }

  // 16. Interactive Categorized Tech Stack Filter & Touch Toggle
  function initTechStackFilter() {
    const tabs = document.querySelectorAll('.tech-filter-tab');
    const cards = document.querySelectorAll('.tech-stack-card');
    if (!tabs || tabs.length === 0 || !cards || cards.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter') || 'all';

        // Update active tab styling
        tabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        // Filter tech cards with stagger animation
        cards.forEach((card, idx) => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('is-filtered-out');
            card.classList.add('is-filtering');
            card.style.animationDelay = `${(idx % 6) * 30}ms`;
            setTimeout(() => {
              card.classList.remove('is-filtering');
              card.style.animationDelay = '';
            }, 300);
          } else {
            card.classList.add('is-filtered-out');
            card.classList.remove('is-filtering');
          }
        });
      });
    });

    // Touch support: Tap card to toggle description & glow on mobile
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const wasActive = card.classList.contains('is-active');
        cards.forEach(c => c.classList.remove('is-active'));
        if (!wasActive) {
          card.classList.add('is-active');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // Expose helpers globally if needed
  window.portfolioApp = {
    toggleTheme,
    openCertModal,
    closeCertModal,
    showToast,
    replaySignature: function () {
      try {
        sessionStorage.removeItem(INTRO_SESSION_KEY);
      } catch (e) {}
      window.location.reload();
    }
  };
})();

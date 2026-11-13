/**
 * Portfolio App Controller
 * Handles Theme Toggling (Light/Dark), Mobile Navigation, Certificate Modal Previews, and Toast Feedback.
 */

(function () {
  'use strict';

  // 1. Theme Engine (Light / Dark Mode)
  const THEME_KEY = 'svkhun_theme_preference';
  const NAV_GLIDER_KEY = 'svkhun_nav_glider';
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
  function pageIdentity(url) {
    return (url.pathname.replace(/\.html?$/i, '').replace(/\/$/, '').replace(/\/index$/, '') || '/') + url.search;
  }

  function highlightActiveNav(targetHref = window.location.href) {
    const path = new URL(targetHref, window.location.href).pathname;
    const page = (path.split('/').pop() || 'index').replace(/\.html?$/i, '');
    const section = page.startsWith('project-') ? 'projects' : page;
    const navLinks = document.querySelectorAll('.nav-item a');

    navLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/\.html?$/i, '');
      link.classList.toggle('active', href === section);
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

    // Reserve the bold label width without changing the visible label or its accessible name.
    navMenu.querySelectorAll('.nav-item a').forEach(link => {
      if (link.querySelector('.nav-label')) return;
      const label = document.createElement('span');
      label.className = 'nav-label';
      label.textContent = link.textContent;
      link.replaceChildren(label);
      link.dataset.navLabel = label.textContent;
    });

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

    let targetLeft = null;
    let targetWidth = null;
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

      // Selection can update after hover has already reached the same target.
      // Do not restart that transition when the geometry has not changed.
      if (animate && targetLeft !== null && Math.abs(left - targetLeft) < .01 && Math.abs(width - targetWidth) < .01) {
        glider.style.opacity = '1';
        return;
      }
      targetLeft = left;
      targetWidth = width;

      if (!animate) {
        glider.style.transition = 'none';
      } else {
        glider.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), width 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
      }

      glider.style.transform = `translate3d(${left}px, 0, 0)`;
      glider.style.width = `${width}px`;
      glider.style.opacity = '1';
    }

    let hoveredLink = null;
    // Hover previews the target; the active page remains selected until navigation completes.
    updateGliderGlobal = (activeLink, animate = true) => updateGlider(hoveredLink || activeLink, animate);

    const currentActive = navMenu.querySelector('.nav-item a.active');
    let previousGlider = null;
    try {
      const saved = JSON.parse(sessionStorage.getItem(NAV_GLIDER_KEY) || 'null');
      sessionStorage.removeItem(NAV_GLIDER_KEY);
      if (saved && saved.page === pageIdentity(new URL(window.location.href)) &&
          Date.now() - saved.at < 10000 && Date.now() >= saved.at &&
          saved.viewport === window.innerWidth && Number.isFinite(saved.left) && saved.width > 0) {
        previousGlider = saved;
      }
    } catch (error) {}
    if (previousGlider) {
      glider.style.transition = 'none';
      glider.style.transform = `translate3d(${previousGlider.left}px, 0, 0)`;
      glider.style.width = `${previousGlider.width}px`;
      glider.style.opacity = '1';
      void glider.offsetWidth;
      requestAnimationFrame(() => requestAnimationFrame(() => updateGlider(currentActive, true)));
    } else {
      updateGlider(currentActive, false);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const cur = navMenu.querySelector('.nav-item a.active');
        updateGlider(hoveredLink || cur, Boolean(previousGlider || hoveredLink));
      });
    }

    navMenu.querySelectorAll('.nav-item a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        hoveredLink = link;
        updateGlider(link, true);
      });
    });

    navMenu.addEventListener('mouseleave', () => {
      hoveredLink = null;
      updateGlider(navMenu.querySelector('.nav-item a.active'), true);
    });

    window.addEventListener('resize', () => {
      const cur = navMenu.querySelector('.nav-item a.active');
      updateGlider(hoveredLink || cur, false);
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

  // Education detail drawers: hover the hinge to preview, click to keep open.
  function initEducationDrawers() {
    const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    document.querySelectorAll('.education-disclosure').forEach(card => {
      if (card.dataset.drawerInit) return;
      const button = card.querySelector('.education-hinge');
      const drawer = card.querySelector('.education-drawer');
      const content = drawer?.querySelector('.education-drawer-clip');
      if (!button || !drawer || !content) return;
      card.dataset.drawerInit = 'true';
      let preview = false;
      let pinned = false;
      let focusInside = false;
      const update = () => {
        const open = preview || pinned || focusInside;
        card.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
        content.inert = !open;
        content.setAttribute('aria-hidden', String(!open));
        button.querySelector('.education-hinge-hint').textContent = pinned
          ? 'Click to close' : open ? 'Click to keep open' : 'Hover or click to open';
        setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          if (lenisInstance) lenisInstance.resize();
        }, 260);
      };
      button.addEventListener('pointerenter', event => {
        if (hoverPointer.matches && event.pointerType !== 'touch') {
          preview = true;
          update();
        }
      });
      card.addEventListener('pointerleave', () => {
        preview = false;
        update();
      });
      button.addEventListener('click', () => {
        pinned = !pinned;
        if (!pinned) preview = false;
        update();
      });
      drawer.addEventListener('focusin', () => {
        focusInside = true;
        update();
      });
      drawer.addEventListener('focusout', event => {
        focusInside = drawer.contains(event.relatedTarget);
        update();
      });
      card.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !card.classList.contains('is-open')) return;
        event.preventDefault();
        if (drawer.contains(document.activeElement)) button.focus();
        preview = pinned = focusInside = false;
        update();
      });
      const title = card.querySelector('h3, h2')?.textContent.trim();
      if (title) button.setAttribute('aria-label', `Details: ${title}`);
      update();
      card.classList.add('is-ready');
    });
  }

  // 7. Signature intro & Coordinated Hero Entrance Orchestrator
  const preloader = document.getElementById('signature-preloader');
  const INTRO_NAVIGATION_KEY = 'svkhun_intro_navigation';
  let dismissIntro = null;

  function triggerHeroEntrance() {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 7.1 Home Hero Reveal & Orchestration
    const homeHero = document.getElementById('home-hero');
    if (homeHero) {
      homeHero.classList.remove('hero-intro-ready');
      homeHero.classList.add('hero-intro-animate');

      const portraitWrap = homeHero.querySelector('.hero-illustration-wrapper');
      if (portraitWrap) {
        setTimeout(() => {
          portraitWrap.classList.add('is-floating');
        }, 1100);
      }

      if (!prefersReduced && typeof gsap !== 'undefined') {
        const heroTargets = [
          homeHero.querySelector('.hero-text-col > div:first-child'),
          homeHero.querySelector('.hero-display'),
          homeHero.querySelector('.hero-role-title'),
          homeHero.querySelector('.hero-lead'),
          homeHero.querySelector('.hero-text-col .flex.flex-wrap'),
          homeHero.querySelector('.social-icons-row'),
          homeHero.querySelector('.hero-illustration-wrapper'),
          document.querySelector('.stats-band')
        ].filter(Boolean);

        gsap.fromTo(heroTargets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.82,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            onComplete: () => {
              if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            }
          }
        );
      }
    }

    // 7.2 Fullscreen Page Heroes (Education, Experience, Projects, Contact)
    const pageHero = document.querySelector('.page-hero-fullscreen, #contact-header');
    if (pageHero && !homeHero) {
      if (!prefersReduced && typeof gsap !== 'undefined') {
        const elements = [
          pageHero.querySelector('.editorial-number-tag'),
          pageHero.querySelector('.hero-display, h1'),
          pageHero.querySelector('.hero-role-title, h2'),
          pageHero.querySelector('.hero-lead, p.lead'),
          pageHero.querySelector('.flex.flex-wrap, .social-icons-row'),
          pageHero.querySelector('img, .hero-visual-card')
        ].filter(Boolean);

        if (elements.length > 0) {
          gsap.fromTo(elements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              onComplete: () => {
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
              }
            }
          );
        }
      }
    }

    // 7.3 Case Study Engineering Articles
    const caseHero = document.querySelector('.case-lead-hero, .case-header-wrap, article header');
    if (caseHero && !homeHero && !pageHero) {
      if (!prefersReduced && typeof gsap !== 'undefined') {
        const elements = caseHero.querySelectorAll('.case-tag, .font-mono, h1, .case-title, .case-thesis-quote, .case-meta-bar, .hero-lead');
        if (elements.length > 0) {
          gsap.fromTo(elements,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.78,
              stagger: 0.08,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              onComplete: () => {
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
              }
            }
          );
        }
      }
    }
  }

  function initSignaturePreloader() {
    if (!preloader) {
      triggerHeroEntrance();
      return;
    }

    if (!document.documentElement.classList.contains('intro-pending')) {
      document.documentElement.classList.remove('intro-pending');
      preloader.style.display = 'none';
      preloader.classList.add('fade-out');
      preloader.setAttribute('aria-hidden', 'true');
      triggerHeroEntrance();
      return;
    }

    // Put Home hero in ready state while preloader runs
    const homeHero = document.getElementById('home-hero');
    if (homeHero) {
      homeHero.classList.add('hero-intro-ready');
    }

    document.body.classList.add('signature-loading');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dismissed = false;
    let typingTimer = null;
    let dismissTimer = null;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      if (typingTimer) clearTimeout(typingTimer);
      if (dismissTimer) clearTimeout(dismissTimer);
      document.removeEventListener('keydown', onIntroKeydown);
      document.body.classList.remove('signature-loading');
      preloader.classList.add('fade-out');
      preloader.setAttribute('aria-hidden', 'true');
      triggerHeroEntrance();
      setTimeout(() => {
        preloader.style.display = 'none';
        document.documentElement.classList.remove('intro-pending');
      }, reducedMotion ? 0 : 250);
    }

    function onIntroKeydown(event) {
      if (event.key === 'Escape') dismiss();
    }
    document.addEventListener('keydown', onIntroKeydown);

    dismissIntro = dismiss;

    if (reducedMotion) {
      dismiss();
      return;
    }

    // Dynamic Logo Typing Animation (Fast & Snappy Cadence)
    const targetText = 'sivakorn';
    const charSlots = Array.from(document.querySelectorAll('.intro-char-slot'));
    const typingCursor = document.getElementById('intro-typing-cursor');
    const wordmarkWrapper = document.getElementById('intro-wordmark-wrapper');

    let currentIndex = 0;

    function typeNextChar() {
      if (dismissed) return;

      if (currentIndex >= targetText.length) {
        if (wordmarkWrapper) {
          wordmarkWrapper.classList.add('completed');
        }

        // Brief pause to admire the completed logo before entering site
        dismissTimer = setTimeout(dismiss, 280);
        return;
      }

      const slot = charSlots[currentIndex];
      if (slot) {
        slot.classList.add('typed', 'pop');
        setTimeout(() => slot.classList.remove('pop'), 160);

        // Move typing cursor to the trailing edge of the active character
        const cursorX = slot.offsetLeft + slot.offsetWidth;
        if (typingCursor) {
          typingCursor.style.transform = `translateX(${cursorX}px)`;
        }
      }

      currentIndex++;
      typingTimer = setTimeout(typeNextChar, 75);
    }

    // Start typing sequence
    setTimeout(() => {
      typeNextChar();
    }, 100);
  }

  // 8. Hairline Scroll Progress Bar (Synchronized with Lenis & Standard Scroll)
  function initScrollProgress() {
    let progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress-bar';
      progressBar.setAttribute('aria-hidden', 'true');
      document.body.prepend(progressBar);
    }

    function updateProgress(scrollY, maxScroll) {
      const height = maxScroll !== undefined ? maxScroll : (document.documentElement.scrollHeight - window.innerHeight);
      const y = scrollY !== undefined ? scrollY : (window.pageYOffset || document.documentElement.scrollTop);
      const progress = height > 0 ? Math.min(Math.max(y / height, 0), 1) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }

    if (lenisInstance) {
      lenisInstance.on('scroll', (e) => {
        updateProgress(e.scroll, e.limit);
      });
    }

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!lenisInstance && !ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  // 9. Back-to-Top Floating Button with Circular SVG Progress Ring (Smooth Lenis Jump)
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

    function onScrollUpdate(scrollY, maxScroll) {
      const height = maxScroll !== undefined ? maxScroll : (document.documentElement.scrollHeight - window.innerHeight);
      const y = scrollY !== undefined ? scrollY : (window.pageYOffset || document.documentElement.scrollTop);
      const progress = height > 0 ? Math.min(Math.max(y / height, 0), 1) : 0;

      if (y > 350) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }

      if (ring) {
        const offset = circumference - (progress * circumference);
        ring.style.strokeDashoffset = offset;
      }
    }

    if (lenisInstance) {
      lenisInstance.on('scroll', (e) => {
        onScrollUpdate(e.scroll, e.limit);
      });
    }

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!lenisInstance && !ticking) {
        window.requestAnimationFrame(() => {
          onScrollUpdate();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btt.addEventListener('click', function () {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.15 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

    onScrollUpdate();
  }

  // 10. Bi-Directional Scroll Animation Engine with Page-Format Choreography
  const pageObservers = [];
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

      pageObservers.push(observer);
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

      pageObservers.push(observer);
      statsData.forEach(item => observer.observe(item.element));
    } else {
      statsData.forEach(item => animateNumber(item));
    }
  }

  // 14. Lenis Momentum Smooth Scroll Engine
  let lenisInstance = null;

  function initLenis() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return null;
    }
    if (typeof Lenis === 'undefined') {
      return null;
    }

    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }

    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenisInstance.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        if (lenisInstance) {
          lenisInstance.raf(time * 1000);
        }
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        if (lenisInstance) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
      }
      requestAnimationFrame(raf);
    }

    return lenisInstance;
  }

  // 15. Multi-Layered Vertical Parallax Scrolling Depth Engine
  function initParallaxDepth() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 15.1 Home Hero Parallax (Foreground copy vs Portrait vs Ambient Glow)
    const homeHero = document.getElementById('home-hero');
    if (homeHero) {
      const illustration = homeHero.querySelector('.hero-illustration-wrapper');
      if (illustration) {
        gsap.to(illustration, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: homeHero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      const glow = homeHero.querySelector('.hero-aura-glow, .hero-backdrop-glow');
      if (glow) {
        gsap.to(glow, {
          yPercent: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: homeHero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      const textCol = homeHero.querySelector('.hero-text-col');
      if (textCol) {
        gsap.to(textCol, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: homeHero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      }
    }

    // 15.2 Fullscreen Page Heroes (Education, Experience, Projects, Contact)
    document.querySelectorAll('.page-hero-fullscreen, #contact-header').forEach((hero) => {
      const watermark = hero.querySelector('.editorial-number-tag');
      if (watermark) {
        gsap.to(watermark, {
          yPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      const img = hero.querySelector('img, .hero-visual-card');
      if (img) {
        gsap.to(img, {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    });

    // 15.3 Stats Band Parallax Elevation
    const statsBand = document.getElementById('stats-band');
    if (statsBand) {
      gsap.to(statsBand, {
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: statsBand,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }

    // 15.4 Case Study Mockups & Architecture Consoles Parallax
    document.querySelectorAll('.graph-preview-canvas-box, .scorecard-interactive-box, .iot-console-box, .terminal-card, .ev-monograph, .bedside-card-mockup').forEach((card) => {
      gsap.to(card, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });
  }

  // 16. Scroll-Driven Typography & Content Flow (Viewport-Triggered Reveals)
  function initTypographyReveals() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const typographyTargets = document.querySelectorAll(
      'main .editorial-h2, main .editorial-eyebrow, main .case-thesis-quote, main blockquote, main .lead-para, main .section-header > h2, main .section-header > p, main .pitch-home-copy h2, main .pitch-home-copy p'
    );

    typographyTargets.forEach((el) => {
      if (el.closest('#home-hero, .page-hero-fullscreen, #contact-header')) return;

      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  // 17. Staggered Cascades for Grids & Card Lists (0.08s - 0.12s Stagger Delay)
  function initStaggeredGrids() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(
        '.tech-stack-card, .work-project-row, .stat-box, .cert-card, .competitive-card, .assessment-card-panel, .education-disclosure, .waterfall-tier-card, .oee-pill-card'
      ).forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const gridContainers = document.querySelectorAll(
      '.tech-stack-grid, .work-timeline-list, .stats-band .grid, .cert-grid, .assessment-grid, .education-block, .pitch-capabilities, [class*="grid-cols-"]'
    );

    gridContainers.forEach((container) => {
      const cards = container.querySelectorAll(
        ':scope > .tech-stack-card, :scope > .work-project-row, :scope > .stat-box, :scope > .cert-card, :scope > .competitive-card, :scope > .assessment-card-panel, :scope > .education-disclosure, :scope > .waterfall-tier-card, :scope > .oee-pill-card, :scope > li'
      );

      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
  }

  // 18. Floating Visual Archive (Curated Layered Scatter Board with Subtle Rotation Offsets)
  function initFloatingVisualArchive() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const archiveTargets = [
      '.work-timeline-list .work-project-row',
      '.graph-preview-canvas-box',
      '.scorecard-interactive-box',
      '.iot-console-box',
      '.terminal-card',
      '.waterfall-tier-card',
      '.bedside-card-mockup',
      '.cert-card',
      '.competitive-card',
      '.ev-monograph'
    ];

    const items = document.querySelectorAll(archiveTargets.join(', '));
    if (!items.length) return;

    const angles = [-1.2, 1.4, -0.9, 1.2, -1.4, 0.9];

    items.forEach((item, idx) => {
      item.classList.add('scatter-card');
      const angle = angles[idx % angles.length];
      item.style.setProperty('--scatter-rotate', `${angle}deg`);

      // Gentle vertical floating translation scrubbed to scroll
      const floatDistance = idx % 2 === 0 ? -16 : 16;
      gsap.to(item, {
        '--scatter-y': `${floatDistance}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4
        }
      });
    });
  }

  // 19. Global Multi-Page Architecture & Seamless View Transitions
  function initPageNavigation() {
    let renderedUrl = new URL(window.location.href);
    let navigationId = 0;
    let controller = null;
    const pageCache = new Map();
    const canFetchPages = ['http:', 'https:'].includes(window.location.protocol);

    function prepareNativeNavigation(destination) {
      try {
        const page = destination.pathname.split('/').pop() || 'index';
        if (page.replace(/\.html?$/i, '') === 'index') {
          sessionStorage.setItem(INTRO_NAVIGATION_KEY, String(Date.now()));
        }
        const menu = document.getElementById('nav-menu');
        const glider = menu?.querySelector('.nav-active-glider');
        if (menu && glider && window.innerWidth >= 768) {
          const rect = glider.getBoundingClientRect();
          sessionStorage.setItem(NAV_GLIDER_KEY, JSON.stringify({
            page: pageIdentity(destination), at: Date.now(), viewport: window.innerWidth,
            left: rect.left - menu.getBoundingClientRect().left, width: rect.width
          }));
        }
      } catch (error) {}
    }

    function scrollToDestination(destination, position = null) {
      let anchor = null;
      try {
        if (destination.hash) {
          const id = decodeURIComponent(destination.hash.slice(1));
          anchor = document.getElementById(id) || document.querySelector(destination.hash);
        }
      } catch (error) {}

      if (anchor) {
        if (lenisInstance) {
          lenisInstance.resize();
          lenisInstance.scrollTo(anchor, { offset: -80, duration: 1.0, force: true });
        } else {
          anchor.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      const top = position?.[1] || 0;
      const left = position?.[0] || 0;

      window.scrollTo({ left, top, behavior: 'instant' });
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;

      if (lenisInstance) {
        lenisInstance.scrollTo(top, { immediate: true, force: true });
        lenisInstance.resize();
      }
    }

    async function navigate(destination, push = true, position = null) {
      const id = ++navigationId;
      controller?.abort();
      controller = new AbortController();
      const signal = controller.signal;

      if (pageIdentity(destination) === pageIdentity(renderedUrl)) {
        document.querySelector('main')?.removeAttribute('aria-busy');
        if (push && destination.href !== renderedUrl.href) {
          window.history.pushState({ portfolioScroll: [0, 0] }, '', destination.href);
        }
        renderedUrl = destination;
        highlightActiveNav(destination.href);
        scrollToDestination(destination, position);
        return;
      }

      dismissIntro?.();
      const oldMain = document.querySelector('main');
      oldMain?.setAttribute('aria-busy', 'true');

      // Preserve current scroll position before we navigate away
      if (push) {
        window.history.replaceState({ ...window.history.state, portfolioScroll: [window.scrollX, window.scrollY] }, '', renderedUrl.href);
      }

      try {
        const key = pageIdentity(destination);
        let page = pageCache.get(key);
        if (!page) {
          const response = await fetch(destination.href, { signal });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          page = { html: await response.text(), url: response.url || destination.href };
          if (id !== navigationId) return;
          pageCache.set(key, page);
        }
        if (id !== navigationId) return;

        const nextDoc = new DOMParser().parseFromString(page.html, 'text/html');
        const nextMain = nextDoc.querySelector('main');
        const nextUrl = new URL(page.url);
        nextUrl.hash = destination.hash;
        if (!nextMain || nextUrl.origin !== window.location.origin) throw new Error('Not an internal content page');

        // 1. Route Exit: Smooth fade-out and subtle upward lift of outgoing views
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced && typeof gsap !== 'undefined' && oldMain) {
          await new Promise((resolve) => {
            gsap.to(oldMain, {
              opacity: 0,
              y: -22,
              duration: 0.28,
              ease: 'power2.inOut',
              onComplete: resolve
            });
          });
        }

        if (id !== navigationId) return;

        // 2. Lifecycle Management: Properly destroy and reset scroll triggers & momentum scroll
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
        pageObservers.splice(0).forEach(observer => observer.disconnect());
        closeCertModal();

        // 3. Swap DOM
        const main = document.importNode(nextMain, true);
        oldMain.replaceWith(main);
        renderedUrl = nextUrl;
        document.title = nextDoc.title;
        ['meta[name="description"]', 'link[rel="canonical"]'].forEach(selector => {
          const current = document.head.querySelector(selector);
          const next = nextDoc.head.querySelector(selector);
          if (current && next) current.replaceWith(document.importNode(next, true));
        });

        if (push) {
          window.history.pushState({ portfolioScroll: [0, 0] }, '', nextUrl.href);
        }

        highlightActiveNav(nextUrl.href);

        // 4. Scroll Restoration: Ensure window and Lenis are instantly at the top baseline
        scrollToDestination(nextUrl, position);

        // 5. Restart momentum engine & re-initialize interactive components on clean top baseline
        if (lenisInstance) {
          lenisInstance.resize();
        }
        initPageContent();

        // 6. Route Enter: Coordinated staggered reveal for incoming hero elements and main content
        if (!prefersReduced && typeof gsap !== 'undefined') {
          gsap.set(main, { opacity: 0, y: 28 });
          gsap.to(main, {
            opacity: 1,
            y: 0,
            duration: 0.52,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            onComplete: () => {
              if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
              }
              if (lenisInstance) {
                lenisInstance.resize();
              }
            }
          });
        }

        triggerHeroEntrance();

        if (destination.hash) {
          setTimeout(() => {
            scrollToDestination(destination, null);
          }, 60);
        }

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
        if (lenisInstance) {
          lenisInstance.resize();
        }

        window.dispatchEvent(new Event('scroll'));
      } catch (error) {
        if (signal.aborted || id !== navigationId) return;
        prepareNativeNavigation(destination);
        window.location.assign(destination.href);
      } finally {
        if (id === navigationId) document.querySelector('main')?.removeAttribute('aria-busy');
      }
    }

    document.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') ||
          (link.target && link.target !== '_self') || link.hasAttribute('data-open-cert') ||
          link.hasAttribute('data-copy-email')) return;
      const href = link.getAttribute('href');
      if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return;

      // 1. Same-page in-page anchor navigation (e.g. href="#pitching" or href="experience.html#pitching")
      let anchorTarget = null;
      let targetHash = null;

      if (href.startsWith('#')) {
        targetHash = href;
        const hashId = decodeURIComponent(href.slice(1));
        if (hashId) anchorTarget = document.getElementById(hashId) || document.querySelector(href);
      } else if (href.includes('#')) {
        try {
          const dest = new URL(link.href, window.location.href);
          const curr = new URL(window.location.href);
          if (pageIdentity(dest) === pageIdentity(curr) && dest.hash) {
            targetHash = dest.hash;
            const hashId = decodeURIComponent(dest.hash.slice(1));
            anchorTarget = document.getElementById(hashId) || document.querySelector(dest.hash);
          }
        } catch (e) {}
      }

      if (anchorTarget) {
        event.preventDefault();
        try {
          if (window.location.hash !== targetHash) {
            window.history.pushState(null, '', targetHash);
          }
        } catch (e) {}

        if (lenisInstance) {
          lenisInstance.resize();
          lenisInstance.scrollTo(anchorTarget, { offset: -80, duration: 1.0, force: true });
        } else {
          anchorTarget.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      if (href.startsWith('#')) return;

      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      if (destination.origin !== current.origin ||
          !['http:', 'https:', 'file:'].includes(destination.protocol) ||
          (/\.[^/]+$/.test(destination.pathname) && !/\.html?$/i.test(destination.pathname))) return;

      if (link.closest('.nav-menu, .brand-logo') && pageIdentity(destination) === pageIdentity(renderedUrl) && !destination.hash) {
        event.preventDefault();
        ++navigationId;
        controller?.abort();
        document.querySelector('main')?.removeAttribute('aria-busy');
        if (pageIdentity(current) !== pageIdentity(renderedUrl)) {
          window.history.pushState({ portfolioScroll: [window.scrollX, window.scrollY] }, '', renderedUrl.href);
        }
        highlightActiveNav(renderedUrl.href);
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { duration: 1.15 });
        } else {
          window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }
        return;
      }
      if (!canFetchPages) {
        prepareNativeNavigation(destination);
        return;
      }
      event.preventDefault();
      navigate(destination);
    });

    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        try {
          const hashId = decodeURIComponent(window.location.hash.slice(1));
          const target = document.getElementById(hashId);
          if (target) {
            if (lenisInstance) {
              lenisInstance.resize();
              lenisInstance.scrollTo(target, { offset: -80, duration: 1.0, force: true });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        } catch (e) {}
      }
    });

    window.addEventListener('popstate', event => {
      if (canFetchPages) navigate(new URL(window.location.href), false, event.state?.portfolioScroll);
    });
  }

  // 20. SWU Open House Sticky Interactive Page Flow Scroller
  function initSwuScrollShowcase() {
    const track = document.getElementById('swu-flow-section');
    const viewport = document.getElementById('swu-browser-viewport');
    const pageImg = document.getElementById('swu-page-img');
    const progressFill = document.getElementById('swu-progress-fill');
    const percentText = document.getElementById('swu-scroll-percent');
    const stepTag = document.getElementById('swu-step-tag');
    const stepTitle = document.getElementById('swu-step-caption-title');
    const stepDesc = document.getElementById('swu-step-caption-desc');
    const stepPills = document.querySelectorAll('.swu-step-pill');
    const autoplayBtn = document.getElementById('swu-autoplay-toggle');

    if (!track || !viewport || !pageImg) return;
    if (track.dataset.swuInit === 'true') return;
    track.dataset.swuInit = 'true';

    const stepsData = [
      { num: '01', title: '01 // Hero & Countdown', desc: 'Immediate brand identity with the "SWU TOPIA" theme and instant registration countdown badge.', threshold: 0.15 },
      { num: '02', title: '02 // Visual How-To-Register', desc: 'Step-by-step visual onboarding reducing customer inquiries.', threshold: 0.38 },
      { num: '03', title: '03 // Faculty Showcase Grid', desc: 'Two-tier dynamic showcase featuring official faculty posters across Engineering, Science, PE, Social Sciences, Education, and Humanities.', threshold: 0.68 },
      { num: '04', title: '04 // Photo Memories & Highlights', desc: 'Authentic campus snapshots highlighting student life and club activities.', threshold: 0.90 },
      { num: '05', title: '05 // Consolidated Footer', desc: 'Legal copyright, university address, and verified social media handles.', threshold: 1.0 }
    ];

    // Rest Buffers:
    // 0.0 to 0.12: Initial rest buffer so user clearly sees the top banner & countdown before scrolling starts.
    // 0.12 to 0.96: Active smooth scroll of internal mobile webpage.
    // 0.96 to 1.0: Seamless unpin release directly into Section 04 with zero dead wait.
    const START_BUFFER = 0.12;
    const END_BUFFER = 0.96;

    const mapProgress = (p) => {
      if (p <= START_BUFFER) return 0;
      if (p >= END_BUFFER) return 1;
      return (p - START_BUFFER) / (END_BUFFER - START_BUFFER);
    };

    const getTravelDistance = () => {
      const imgHeight = pageImg.offsetHeight || 2116;
      const vpHeight = viewport.clientHeight || 420;
      return Math.max(0, imgHeight - vpHeight);
    };

    const updateUI = (progress, isNative = false) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const internalProgress = isNative ? clamped : mapProgress(clamped);
      const travelDistance = getTravelDistance();
      gsap.set(pageImg, { y: -internalProgress * travelDistance });

      if (progressFill) {
        progressFill.style.width = `${(internalProgress * 100).toFixed(1)}%`;
      }
      if (percentText) {
        percentText.textContent = internalProgress >= 0.98 ? '100%' : `${Math.round(internalProgress * 100)}%`;
      }

      let activeIdx = 0;
      for (let i = 0; i < stepsData.length; i++) {
        if (internalProgress <= stepsData[i].threshold || i === stepsData.length - 1) {
          activeIdx = i;
          break;
        }
      }

      stepPills.forEach((pill, idx) => {
        pill.classList.toggle('is-active', idx === activeIdx);
      });

      const current = stepsData[activeIdx];
      if (stepTag) stepTag.textContent = current.title;
      if (stepTitle) stepTitle.textContent = current.title;
      if (stepDesc) stepDesc.textContent = current.desc;
    };

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 640;

    // Mobile / reduced motion fallback: native scrollable window
    if (isMobile || prefersReduced || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      viewport.style.overflowY = 'auto';
      viewport.setAttribute('data-lenis-prevent', 'true');
      viewport.addEventListener('scroll', () => {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const progress = maxScroll > 0 ? viewport.scrollTop / maxScroll : 0;
        updateUI(progress, true);
      }, { passive: true });

      stepPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const targetFrac = parseFloat(pill.dataset.stepProgress) || 0;
          const maxScroll = viewport.scrollHeight - viewport.clientHeight;
          viewport.scrollTo({
            top: targetFrac * maxScroll,
            behavior: prefersReduced ? 'instant' : 'smooth'
          });
        });
      });
      return;
    }

    // ScrollTrigger Scrub synchronized with CSS position: sticky
    const sticky = track.querySelector('.swu-flow-sticky');
    let trigger = null;
    trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top 72px',
      end: () => '+=' + Math.max(1, track.offsetHeight - (sticky ? sticky.offsetHeight : 700)),
      scrub: 0.15,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        updateUI(self.progress || 0);
      },
      onUpdate: (self) => {
        updateUI(self.progress);
      }
    });

    if (!pageImg.complete) {
      pageImg.addEventListener('load', () => {
        ScrollTrigger.refresh();
        if (trigger) updateUI(trigger.progress || 0);
      }, { once: true });
    }

    // Interactive Milestone Click-to-Jump
    stepPills.forEach(pill => {
      pill.addEventListener('click', () => {
        stopAutoplay();
        const targetFrac = parseFloat(pill.dataset.stepProgress) || 0;
        let targetY;
        if (trigger && typeof trigger.start === 'number' && typeof trigger.end === 'number') {
          targetY = trigger.start + (trigger.end - trigger.start) * targetFrac;
        } else {
          const trackRect = track.getBoundingClientRect();
          const trackTop = trackRect.top + window.scrollY;
          const stickyHeight = sticky ? sticky.offsetHeight : 700;
          const scrollDistance = track.offsetHeight - stickyHeight;
          targetY = trackTop - 72 + (scrollDistance * targetFrac);
        }
        if (lenisInstance) {
          lenisInstance.scrollTo(targetY, { duration: 0.85 });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      });
    });

    // Auto-Scroll Simulation ("เหมือนคนเลื่อนเอง")
    let autoplayTween = null;
    let isPlaying = false;

    function stopAutoplay() {
      if (autoplayTween) {
        autoplayTween.kill();
        autoplayTween = null;
      }
      isPlaying = false;
      autoplayBtn?.classList.remove('is-playing');
      const icon = document.getElementById('swu-autoplay-icon');
      const label = document.getElementById('swu-autoplay-label');
      if (icon) icon.className = 'fa-solid fa-play text-[10px]';
      if (label) label.textContent = 'Auto Scroll';
    }

    function startAutoplay() {
      isPlaying = true;
      autoplayBtn?.classList.add('is-playing');
      const icon = document.getElementById('swu-autoplay-icon');
      const label = document.getElementById('swu-autoplay-label');
      if (icon) icon.className = 'fa-solid fa-pause text-[10px]';
      if (label) label.textContent = 'Pause';

      let startY, endY;
      if (trigger && typeof trigger.start === 'number' && typeof trigger.end === 'number') {
        startY = trigger.start;
        endY = trigger.end;
      } else {
        const trackRect = track.getBoundingClientRect();
        const trackTop = trackRect.top + window.scrollY;
        const scrollDistance = track.offsetHeight - window.innerHeight + 72;
        startY = trackTop - 72;
        endY = startY + scrollDistance;
      }

      const totalDist = Math.max(1, endY - startY);
      const currentY = window.scrollY;
      const currentProgress = Math.max(0, Math.min(1, (currentY - startY) / totalDist));
      const duration = Math.max(3.5, (1 - currentProgress) * 7.5);

      if (lenisInstance) {
        lenisInstance.scrollTo(endY, {
          duration: duration,
          onComplete: stopAutoplay
        });
      } else {
        autoplayTween = gsap.to(window, {
          scrollTo: endY,
          duration: duration,
          ease: 'power1.inOut',
          onComplete: stopAutoplay
        });
      }
    }

    autoplayBtn?.addEventListener('click', () => {
      if (isPlaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    window.addEventListener('wheel', stopAutoplay, { passive: true });
    window.addEventListener('touchmove', stopAutoplay, { passive: true });

    // Direct Drag-to-Scrub on the viewport surface
    let isDragging = false;
    let startY = 0;
    let startScroll = 0;

    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      stopAutoplay();
      isDragging = true;
      startY = e.clientY;
      startScroll = window.scrollY;
      viewport.style.cursor = 'grabbing';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      const targetScroll = startScroll - deltaY * 2.2;
      if (lenisInstance) {
        lenisInstance.scrollTo(targetScroll, { immediate: true });
      } else {
        window.scrollTo({ top: targetScroll });
      }
    });

    const endDrag = () => {
      if (isDragging) {
        isDragging = false;
        viewport.style.cursor = '';
      }
    };
    window.addEventListener('mouseup', endDrag);
  }

  function initPageContent() {
    initScrollReveal();
    initTypographyReveals();
    initStaggeredGrids();
    initParallaxDepth();
    initFloatingVisualArchive();
    initSpotlightCards();
    initHeroTilt();
    initStatCounters();
    initWorkAccordion();
    initTechStackFilter();
    initAssessmentAccordion();
    initEducationDrawers();
    initSwuScrollShowcase();
  }

  // Initialize on load
  function initApp() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    initTheme();
    highlightActiveNav();
    initNavGlider();
    initLenis();
    initSignaturePreloader();

    // If on Home page and preloader is not present or already dismissed, trigger hero entrance
    const homeHero = document.getElementById('home-hero');
    const preloaderEl = document.getElementById('signature-preloader');
    if (homeHero && (!preloaderEl || preloaderEl.style.display === 'none' || preloaderEl.classList.contains('fade-out'))) {
      triggerHeroEntrance();
    } else if (!homeHero) {
      triggerHeroEntrance();
    }

    initScrollProgress();
    initBackToTop();
    initPageContent();
    initPageNavigation();

    // Initial hash scroll restoration (e.g. experience.html#pitching)
    if (window.location.hash) {
      try {
        const hashId = decodeURIComponent(window.location.hash.slice(1));
        const targetAnchor = document.getElementById(hashId);
        if (targetAnchor) {
          setTimeout(() => {
            if (lenisInstance) {
              lenisInstance.resize();
              lenisInstance.scrollTo(targetAnchor, { offset: -80, immediate: true, force: true });
            } else {
              targetAnchor.scrollIntoView();
            }
          }, 180);
        }
      } catch (e) {}
    }
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
        setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          if (lenisInstance) lenisInstance.resize();
        }, 300);
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

        setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          if (lenisInstance) lenisInstance.resize();
        }, 320);
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
        sessionStorage.removeItem(INTRO_NAVIGATION_KEY);
      } catch (e) {}
      window.location.reload();
    }
  };
})();

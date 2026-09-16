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
      } else if (href.includes(page) && page !== '') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // 4. Certificate Modal Viewer
  const certModal = document.getElementById('cert-modal');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalClose = document.getElementById('cert-modal-close');

  function openCertModal(title, imgSrc) {
    if (!certModal) return;
    if (certModalTitle) certModalTitle.textContent = title;
    if (certModalImg) certModalImg.src = imgSrc;
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', function (e) {
      if (e.target === certModal) {
        closeCertModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeCertModal();
      }
    });
  }

  // Bind all certificate preview buttons
  document.querySelectorAll('[data-open-cert]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const title = this.getAttribute('data-cert-title') || 'Certificate Verification';
      const imgSrc = this.getAttribute('data-cert-img');
      if (imgSrc) {
        openCertModal(title, imgSrc);
      }
    });
  });

  // 5. Toast Feedback & Copy to Clipboard
  const toast = document.getElementById('toast-notification');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2800);
  }

  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const email = this.getAttribute('data-copy-email') || 'sivakorn.khun@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('✓ Email copied to clipboard: ' + email);
        }).catch(() => {
          showToast('Email: ' + email);
        });
      } else {
        showToast('Email: ' + email);
      }
    });
  });

  // 6. Assessment Accordion Interactive Label Sync
  document.querySelectorAll('.assessment-accordion').forEach(accordion => {
    accordion.addEventListener('toggle', function () {
      const triggerText = this.querySelector('.accordion-trigger-text');
      if (triggerText) {
        triggerText.textContent = this.open 
          ? 'Hide Score Breakdown & Details' 
          : 'View Score Breakdown & Details';
      }
    });
  });

  // Initialize on load
  initTheme();
  highlightActiveNav();

  // Expose helpers globally if needed
  window.portfolioApp = {
    toggleTheme,
    openCertModal,
    closeCertModal,
    showToast
  };
})();

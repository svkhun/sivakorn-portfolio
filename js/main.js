/**
 * Sivakorn Khundilokrattaya - Progressive Disclosure Architecture Controller
 * Handles: Slide-over Drawers, Stepped Tabs, Scroll Counters, 3D Metric Card Tilt, Clipboard Text-Flip
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';



  /* ==========================================================================
     1. Animated Number Counters (Scroll-triggered)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function animateStats() {
    statNumbers.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const isDecimal = el.getAttribute('data-decimal') === 'true';
      const duration = 1600;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        if (isDecimal) {
          el.textContent = (easeProgress * target).toFixed(1);
        } else {
          el.textContent = Math.floor(easeProgress * target).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          if (isDecimal) {
            el.textContent = target.toFixed(1);
          } else {
            el.textContent = target.toLocaleString();
          }
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedStats) {
            animatedStats = true;
            animateStats();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(statsSection);
  }

  /* ==========================================================================
     1.1 Ultra-Smooth Scroll Entrance Controller (Linear / Vercel Weighted Curve)
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-smooth, .reveal-on-scroll');
    if (!revealElements.length) return;

    // Accessibility: Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  initScrollReveal();

  /* ==========================================================================
     2. Metric Strip 3D Tilt Micro-Interaction
     ========================================================================== */
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ==========================================================================
     3. Header Scroll Effect & Active Section Spy
     ========================================================================== */
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     4. Mobile Navigation Toggle
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navLinksContainer.classList.contains('mobile-active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  /* ==========================================================================
     5. Slide-Over Drawers Controller (Progressive Disclosure)
     ========================================================================== */
  const drawerBackdrops = document.querySelectorAll('.drawer-backdrop');
  const openDrawerBtns = document.querySelectorAll('[data-open-drawer]');
  const closeDrawerBtns = document.querySelectorAll('.drawer-close-btn');

  window.openDrawer = function (drawerId) {
    const targetDrawer = document.getElementById(drawerId);
    if (targetDrawer) {
      targetDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (drawerId === 'drawer-credit-risk' && window.initShapSimulator) {
        setTimeout(window.initShapSimulator, 60);
      }
      if (drawerId === 'drawer-lod-project' && window.initRocSimulator) {
        setTimeout(window.initRocSimulator, 60);
      }
    }
  };

  window.closeDrawer = function (drawer) {
    if (drawer) {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openDrawerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const drawerId = btn.getAttribute('data-open-drawer');
      const parentModal = btn.closest('.cert-modal-backdrop, .dossier-modal-backdrop, .exec-modal-backdrop');
      if (parentModal) {
        parentModal.classList.remove('active');
      }
      window.openDrawer(drawerId);
    });
  });

  closeDrawerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('.drawer-backdrop');
      window.closeDrawer(drawer);
    });
  });

  drawerBackdrops.forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        window.closeDrawer(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      drawerBackdrops.forEach((drawer) => {
        if (drawer.classList.contains('active')) {
          window.closeDrawer(drawer);
        }
      });
    }
  });

  /* Drawer Stepped Tab Switching */
  const drawerTabBtns = document.querySelectorAll('.drawer-tab-btn');
  drawerTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parentDrawer = btn.closest('.slide-drawer');
      const tabTarget = btn.getAttribute('data-tab-target');

      parentDrawer.querySelectorAll('.drawer-tab-btn').forEach((b) => b.classList.remove('active'));
      parentDrawer.querySelectorAll('.drawer-tab-content').forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = parentDrawer.querySelector(`#${tabTarget}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      if (tabTarget === 'tab-lod-roc' && window.initRocSimulator) {
        setTimeout(window.initRocSimulator, 40);
      }
      if (tabTarget === 'tab-cr-simulator' && window.initShapSimulator) {
        setTimeout(window.initShapSimulator, 40);
      }
    });
  });

  /* ==========================================================================
     6. Copy Email with Inline Text-Flip & Toast
     ========================================================================== */
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email, #btn-copy-email, .btn-copy-email-cta');
  const toastNotice = document.getElementById('toast-notice');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toastNotice) return;
    if (toastText) toastText.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = 'sivakorn.khun@gmail.com';
      const textSpan = btn.querySelector('span');
      const icon = btn.querySelector('i');
      const originalText = textSpan ? textSpan.textContent.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}📋✓]/gu, '').trim() : 'Copy Email';
      const originalIconClass = icon ? icon.className : 'fas fa-copy';
      const successMsg = 'Copied!';
      const toastMsg = 'Email copied to clipboard (sivakorn.khun@gmail.com)';

      function performFlip() {
        if (textSpan) textSpan.textContent = successMsg;
        if (icon) icon.className = 'fas fa-check text-sage';
        btn.classList.add('copied-success');

        showToast(toastMsg);

        setTimeout(() => {
          if (textSpan) textSpan.textContent = originalText || 'Copy Email';
          if (icon) icon.className = originalIconClass;
          btn.classList.remove('copied-success');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(performFlip).catch(() => {
          fallbackCopy(email);
          performFlip();
        });
      } else {
        fallbackCopy(email);
        performFlip();
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(tempInput);
  }

  /* ==========================================================================
     7. Resume Direct Isolated Iframe Print Pipeline
     ========================================================================== */
  const downloadBtn = document.querySelector('#download-resume-btn, [data-action="download-pdf"], #btn-print-resume');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const resumeSource = document.querySelector('#resume-sheet') || document.querySelector('.resume-paper');
      if (!resumeSource) {
        console.error('Target resume element not found');
        return;
      }

      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerText = 'Preparing PDF...';
      downloadBtn.disabled = true;

      // 1. Create an isolated hidden iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow.document;

      // 2. Inject strict, publication-grade CSS + Resume HTML
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Sivakorn_Khundilokrattaya_Resume</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm 15mm 12mm 15mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              font-size: 9.5pt;
              line-height: 1.45;
              color: #0f172a;
              background: #ffffff;
            }
            .resume-paper, .resume-a4-page {
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              background: transparent !important;
              width: 100% !important;
              max-width: 100% !important;
            }
            #resume-page-1 {
              page-break-after: always !important;
              break-after: page !important;
            }
            #resume-page-2 {
              page-break-before: always !important;
              break-before: page !important;
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
            h1 {
              font-size: 18pt;
              font-weight: 700;
              margin: 0 0 4pt 0;
              color: #0f172a;
              letter-spacing: -0.02em;
            }
            h2, .section-title {
              font-size: 10pt;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin: 14pt 0 6pt 0;
              padding-bottom: 2pt;
              border-bottom: 1px solid #cbd5e1;
              color: #0f172a;
              break-after: avoid;
              page-break-after: avoid;
            }
            .flex {
              display: flex;
            }
            .justify-between {
              justify-content: space-between;
            }
            .items-center {
              align-items: center;
            }
            .items-baseline {
              align-items: baseline;
            }
            .text-right {
              text-align: right;
            }
            .whitespace-nowrap {
              white-space: nowrap;
            }
            .shrink-0 {
              flex-shrink: 0;
            }
            .font-mono {
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              font-size: 8.5pt;
            }
            .tech-tag {
              background: #f1f5f9;
              border: 1px solid #e2e8f0;
              border-radius: 2px;
              padding: 1px 5px;
              font-size: 8pt;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              display: inline-block;
              color: #1e293b;
            }
            .text-slate-900 { color: #0f172a; }
            .text-slate-700 { color: #334155; }
            .text-slate-600 { color: #475569; }
            .text-slate-500 { color: #64748b; }
            .border-slate-300 { border-color: #cbd5e1; }
            .border-b { border-bottom: 1px solid #cbd5e1; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-normal { font-weight: 400; }
            .italic { font-style: italic; }
            ul {
              margin: 4pt 0 6pt 0;
              padding-left: 14pt;
            }
            li {
              margin-bottom: 2.5pt;
              line-height: 1.4;
              color: #334155;
            }
            .resume-entry, .project-item, .resume-item, li, .avoid-break {
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .resume-sheet-footer {
              display: flex;
              justify-content: space-between;
              border-top: 1px solid #cbd5e1;
              margin-top: 10pt;
              padding-top: 4pt;
              font-size: 7.5pt;
              color: #64748b;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            }
            a {
              color: #0284c7;
              text-decoration: none;
            }
            /* Strip dark-mode and glowing badges */
            span, div, p {
              color: inherit;
            }
          </style>
        </head>
        <body>
          ${resumeSource.innerHTML}
        </body>
        </html>
      `);
      doc.close();

      // 3. Trigger printing cleanly after rendering
      iframe.contentWindow.focus();
      setTimeout(() => {
        iframe.contentWindow.print();

        // Cleanup after dialog closes
        setTimeout(() => {
          if (iframe.parentNode) {
            document.body.removeChild(iframe);
          }
          downloadBtn.innerHTML = originalText;
          downloadBtn.disabled = false;
        }, 1000);
      }, 250);
    });
  }

  const btnJumpP1 = document.getElementById('btn-jump-p1');
  const btnJumpP2 = document.getElementById('btn-jump-p2');
  const resumeScrollViewport = document.getElementById('resume-scroll-viewport');
  const resumePageIndicator = document.getElementById('resume-page-indicator');
  const resumePage1 = document.getElementById('resume-page-1');
  const resumePage2 = document.getElementById('resume-page-2');

  if (btnJumpP1 && resumePage1) {
    btnJumpP1.addEventListener('click', () => {
      resumePage1.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (btnJumpP2 && resumePage2) {
    btnJumpP2.addEventListener('click', () => {
      resumePage2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (resumeScrollViewport && resumePageIndicator && resumePage2) {
    resumeScrollViewport.addEventListener('scroll', () => {
      const p2Top = resumePage2.offsetTop - resumeScrollViewport.offsetTop;
      const currentScroll = resumeScrollViewport.scrollTop;
      if (currentScroll >= p2Top - 150) {
        resumePageIndicator.textContent = 'Page 2 / 2';
      } else {
        resumePageIndicator.textContent = 'Page 1 / 2';
      }
    });
  }

  /* ==========================================================================
     8. About Bento Spotlight Mouse-Follow Effect
     ========================================================================== */
  const aboutCards = document.querySelectorAll('.about-card, .info-card');
  aboutCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     9. Interactive Quick Terminal Modal (Recruiter CLI Hub + Autocomplete)
     ========================================================================== */
  const terminalModal = document.getElementById('modal-quick-terminal');
  const openTerminalBtn = document.getElementById('btn-open-terminal');
  const closeTerminalBtn = document.getElementById('btn-close-terminal');
  const cliInput = document.getElementById('terminal-cli-input');
  const cliHistory = document.getElementById('terminal-history');
  const chipButtons = document.querySelectorAll('.t-chip-btn');
  const ghostTextEl = document.getElementById('terminal-ghost-text');
  const autocompleteDropdown = document.getElementById('terminal-autocomplete-dropdown');
  const tabHintEl = document.getElementById('terminal-tab-hint');

  const COMMAND_REGISTRY = [
    { cmd: 'projects', desc: 'Navigate to Featured Production Projects', icon: 'fas fa-folder-open' },
    { cmd: 'hackathons', desc: 'View Verified Competitions Timeline', icon: 'fas fa-trophy', aliases: ['competitions'] },
    { cmd: 'stack', desc: 'Inspect Production Tech Stack & Tooling', icon: 'fas fa-layer-group', aliases: ['skills'] },
    { cmd: 'about', desc: 'Display Engineering Philosophy & Background', icon: 'fas fa-user-astronaut', aliases: ['bio'] },
    { cmd: 'contact', desc: 'Jump to Contact & Email Section', icon: 'fas fa-envelope', aliases: ['email'] },
    { cmd: 'cv', desc: 'Open Printable Resume Drawer', icon: 'fas fa-file-pdf', aliases: ['resume'] },
    { cmd: 'clear', desc: 'Clear Terminal Output Logs', icon: 'fas fa-eraser', aliases: ['cls'] },
    { cmd: 'help', desc: 'List all available terminal commands', icon: 'fas fa-question-circle' }
  ];

  let currentSuggestions = [];
  let selectedSuggestionIndex = -1;

  function clearAutocompleteState() {
    if (ghostTextEl) ghostTextEl.textContent = '';
    if (autocompleteDropdown) {
      autocompleteDropdown.innerHTML = '';
      autocompleteDropdown.classList.remove('show');
    }
    if (tabHintEl) tabHintEl.classList.remove('visible');
    currentSuggestions = [];
    selectedSuggestionIndex = -1;
  }

  function updateAutocomplete() {
    if (!cliInput || !ghostTextEl || !autocompleteDropdown) return;
    const val = cliInput.value;
    const query = val.toLowerCase().trim();

    if (!query) {
      clearAutocompleteState();
      return;
    }

    // Filter matching commands & aliases
    currentSuggestions = COMMAND_REGISTRY.filter(item => {
      if (item.cmd.startsWith(query)) return true;
      if (item.aliases && item.aliases.some(a => a.startsWith(query))) return true;
      return false;
    });

    if (currentSuggestions.length > 0) {
      selectedSuggestionIndex = 0;
      const bestMatch = currentSuggestions[0];
      const matchedCmd = bestMatch.cmd.startsWith(query) ? bestMatch.cmd : (bestMatch.aliases.find(a => a.startsWith(query)) || bestMatch.cmd);
      const remaining = matchedCmd.slice(query.length);

      // Zsh-style Ghost Text overlay
      ghostTextEl.innerHTML = `<span style="visibility: hidden;">${escapeHtml(val)}</span>${escapeHtml(remaining)}`;
      if (tabHintEl) tabHintEl.classList.add('visible');

      // Floating Recommendation Dropdown
      autocompleteDropdown.innerHTML = currentSuggestions.map((item, idx) => `
        <div class="t-suggest-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-cmd="${item.cmd}">
          <div class="t-suggest-left">
            <i class="${item.icon} t-suggest-icon"></i>
            <span class="t-suggest-cmd">${item.cmd}</span>
            <span class="t-suggest-desc">&ndash; ${item.desc}</span>
          </div>
          <span class="t-suggest-tip">${idx === 0 ? 'Tab ⇥' : '↵ Enter'}</span>
        </div>
      `).join('');

      autocompleteDropdown.classList.add('show');

      // Handle item click directly
      autocompleteDropdown.querySelectorAll('.t-suggest-item').forEach(itemEl => {
        itemEl.addEventListener('click', (e) => {
          e.preventDefault();
          const cmdToExec = itemEl.getAttribute('data-cmd');
          if (cmdToExec) {
            cliInput.value = '';
            clearAutocompleteState();
            executeTerminalCommand(cmdToExec);
          }
        });
      });
    } else {
      clearAutocompleteState();
    }
  }

  function highlightSuggestion(index) {
    if (!autocompleteDropdown) return;
    const items = autocompleteDropdown.querySelectorAll('.t-suggest-item');
    items.forEach((it, i) => {
      if (i === index) {
        it.classList.add('active');
        it.scrollIntoView({ block: 'nearest' });
      } else {
        it.classList.remove('active');
      }
    });

    if (currentSuggestions[index] && cliInput && ghostTextEl) {
      const query = cliInput.value.toLowerCase().trim();
      const item = currentSuggestions[index];
      const matchedCmd = item.cmd.startsWith(query) ? item.cmd : (item.aliases ? (item.aliases.find(a => a.startsWith(query)) || item.cmd) : item.cmd);
      const remaining = matchedCmd.slice(query.length);
      ghostTextEl.innerHTML = `<span style="visibility: hidden;">${escapeHtml(cliInput.value)}</span>${escapeHtml(remaining)}`;
    }
  }

  function openTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (cliInput) {
      cliInput.value = '';
      clearAutocompleteState();
      setTimeout(() => cliInput.focus(), 150);
    }
  }

  function closeTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    document.body.style.overflow = '';
    clearAutocompleteState();
  }

  if (openTerminalBtn) {
    openTerminalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openTerminal();
    });
  }

  if (closeTerminalBtn) {
    closeTerminalBtn.addEventListener('click', closeTerminal);
  }

  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) {
        closeTerminal();
      }
    });
  }

  // Global Keyboard Shortcut: Cmd/Ctrl + K to open terminal, Esc to close
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalModal && terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && terminalModal && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  function executeTerminalCommand(cmdRaw) {
    if (!cmdRaw) return;
    const cmd = cmdRaw.trim().toLowerCase();
    
    if (cmd === 'clear' || cmd === 'cls') {
      if (cliHistory) cliHistory.innerHTML = '';
      return;
    }

    const historyItem = document.createElement('div');
    historyItem.className = 'terminal-history-item';

    let outputHtml = '';

    switch (cmd) {
      case 'help':
        outputHtml = `
          <div style="color: var(--accent-sky); margin-bottom: 4px; font-weight: 600;">Available Production Commands:</div>
          <div>• <span style="color: #F8FAFC; font-weight: 600;">projects</span> &nbsp;&nbsp;&ndash; Navigate to Featured Production Projects</div>
          <div>• <span style="color: #F8FAFC; font-weight: 600;">hackathons</span> &ndash; View Verified Competitions Timeline</div>
          <div>• <span style="color: #F8FAFC; font-weight: 600;">stack</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash; Inspect Dual-Track Tech Marquee</div>
          <div>• <span style="color: #F8FAFC; font-weight: 600;">contact</span> &nbsp;&nbsp;&ndash; Jump to Contact &amp; Email Section</div>
          <div>• <span style="color: #F8FAFC; font-weight: 600;">cv</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash; Open Printable Resume Drawer</div>
          <div>• <span style="color: #F8FAFC; font-weight: 600;">about</span> &nbsp;&nbsp;&nbsp;&nbsp;&ndash; Display Engineering Background</div>
          <div>• <span style="color: #F8FAFC; font-weight: 600;">clear</span> &nbsp;&nbsp;&nbsp;&nbsp;&ndash; Clear Terminal Output</div>
        `;
        break;

      case 'projects':
        outputHtml = `<span style="color: var(--accent-sage);">Navigating to Featured Projects Deck...</span>`;
        setTimeout(() => {
          closeTerminal();
          const target = document.getElementById('projects');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 400);
        break;

      case 'hackathons':
      case 'competitions':
        outputHtml = `<span style="color: var(--accent-sage);">Navigating to Competitions &amp; Hackathons...</span>`;
        setTimeout(() => {
          closeTerminal();
          const target = document.getElementById('competitions');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 400);
        break;

      case 'stack':
      case 'skills':
        outputHtml = `<span style="color: var(--accent-sage);">Navigating to Technical Arsenal...</span>`;
        setTimeout(() => {
          closeTerminal();
          const target = document.getElementById('stack');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 400);
        break;

      case 'contact':
      case 'email':
        outputHtml = `<span style="color: var(--accent-sage);">Opening Contact Section (sivakorn.khun@gmail.com)...</span>`;
        setTimeout(() => {
          closeTerminal();
          const target = document.getElementById('contact');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 400);
        break;

      case 'cv':
      case 'resume':
        outputHtml = `<span style="color: var(--accent-sage);">Opening Official Curriculum Vitae (PDF Drawer)...</span>`;
        setTimeout(() => {
          closeTerminal();
          const resumeDrawer = document.getElementById('drawer-resume');
          if (resumeDrawer) resumeDrawer.classList.add('active');
        }, 400);
        break;

      case 'about':
      case 'bio':
        outputHtml = `
          <div><strong>Sivakorn Khundilokrattaya</strong> (@svkhun)</div>
          <div>Computer Engineering Student @ Srinakharinwirot University</div>
          <div style="color: var(--text-dim); margin-top: 4px;">Passionate about transforming real-world transactional financial records into transparent predictive intelligence with Explainable AI (XAI).</div>
        `;
        break;

      case 'whoami':
        outputHtml = `<span style="color: var(--accent-sky);">guest@recruiter-interactive-session</span>`;
        break;

      case 'sudo':
        outputHtml = `<span style="color: #EF4444;">Permission denied: User 'guest' is not in the sudoers file.</span>`;
        break;

      default:
        outputHtml = `<span style="color: #EF4444;">zsh: command not found: ${escapeHtml(cmdRaw)}.</span> Type <span style="color: var(--accent-sky); font-weight: 600;">'help'</span> for list of commands.`;
        break;
    }

    historyItem.innerHTML = `
      <div class="terminal-log-row">
        <span class="t-prompt">svkhun:~$</span> <span class="t-cmd">${escapeHtml(cmdRaw)}</span>
      </div>
      <div style="padding-left: 12px; margin-bottom: 8px;">${outputHtml}</div>
    `;

    if (cliHistory) {
      cliHistory.appendChild(historyItem);
      cliHistory.scrollTop = cliHistory.scrollHeight;
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  if (cliInput) {
    cliInput.addEventListener('input', updateAutocomplete);

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' || (e.key === 'ArrowRight' && cliInput.selectionStart === cliInput.value.length)) {
        if (currentSuggestions.length > 0) {
          e.preventDefault();
          const targetIndex = selectedSuggestionIndex >= 0 ? selectedSuggestionIndex : 0;
          const chosen = currentSuggestions[targetIndex];
          const query = cliInput.value.toLowerCase().trim();
          const cmdText = chosen.cmd.startsWith(query) ? chosen.cmd : (chosen.aliases && chosen.aliases.find(a => a.startsWith(query)) ? chosen.aliases.find(a => a.startsWith(query)) : chosen.cmd);
          cliInput.value = cmdText;
          clearAutocompleteState();
        }
      } else if (e.key === 'ArrowDown') {
        if (currentSuggestions.length > 0) {
          e.preventDefault();
          selectedSuggestionIndex = (selectedSuggestionIndex + 1) % currentSuggestions.length;
          highlightSuggestion(selectedSuggestionIndex);
        }
      } else if (e.key === 'ArrowUp') {
        if (currentSuggestions.length > 0) {
          e.preventDefault();
          selectedSuggestionIndex = (selectedSuggestionIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
          highlightSuggestion(selectedSuggestionIndex);
        }
      } else if (e.key === 'Enter') {
        let valToExec = cliInput.value;
        if (currentSuggestions.length > 0 && selectedSuggestionIndex >= 0) {
          valToExec = currentSuggestions[selectedSuggestionIndex].cmd;
        }
        cliInput.value = '';
        clearAutocompleteState();
        executeTerminalCommand(valToExec);
      } else if (e.key === 'Escape') {
        clearAutocompleteState();
      }
    });
  }

  chipButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-t-cmd');
      if (cmd) {
        clearAutocompleteState();
        executeTerminalCommand(cmd);
      }
    });
  });

  /* ==========================================================================
     10. Interactive Certificate & Dossier Modals Controller
     ========================================================================== */
  const modalOpenTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloseTriggers = document.querySelectorAll('[data-close-modal]');
  const allModals = document.querySelectorAll('.cert-modal-backdrop, .dossier-modal-backdrop, .exec-modal-backdrop');

  modalOpenTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parentModal = trigger.closest('.cert-modal-backdrop, .dossier-modal-backdrop, .exec-modal-backdrop');
      if (parentModal) {
        parentModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  allModals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Global Esc key closes any open modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach((modal) => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // Print / Save Aihack Certificate
  const printAihackCertBtn = document.getElementById('btn-print-aihack-cert');
  if (printAihackCertBtn) {
    printAihackCertBtn.addEventListener('click', () => {
      window.print();
    });
  }



  /* ==========================================================================
     12. KBTG Industry Certifications Segmented Tab Switcher
     ========================================================================== */
  const kbtgTabBtns = document.querySelectorAll('.kbtg-tab-btn');
  kbtgTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-kbtg-tab');
      kbtgTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const allPanes = document.querySelectorAll('.kbtg-tab-pane');
      allPanes.forEach(pane => pane.classList.remove('active'));

      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
});

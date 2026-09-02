/**
 * 3D Rotating Ring Carousel for Technical Arsenal
 * Sivakorn Khundilokrattaya - Machine Learning Portfolio
 * Calibrated 55s-60s ultra-calm rotation speed, instant hover pause, drag inertia, and metadata tooltips
 */

(function () {
  'use strict';

  let ringContainer, ringTrack, ringItems, tooltipBox, categoryButtons;
  let currentRotation = 0;
  let targetRotation = 0;
  // Calibrated slow rotational speed: ~55 seconds per 360-degree rotation (0.109 deg/frame at 60fps)
  let autoRotateSpeed = 0.085; 
  let isPaused = false;
  let isDragging = false;
  let startX = 0;
  let previousX = 0;
  let velocity = 0;
  let radius = 330;

  const TECH_METADATA = {
    'Python': 'Core language for statistical computing, pipelines, and machine learning algorithms.',
    'SQL': 'Complex relational queries, window functions, and financial data warehousing.',
    'C / C++': 'Low-level systems, memory optimization, and high-performance algorithmic execution.',
    'Java': 'Object-oriented enterprise backend architecture and distributed service design.',
    'R': 'Statistical hypothesis testing, distribution modeling, and econometric analysis.',
    'Bash': 'Shell automation, environment provisioning, and Linux operational tooling.',
    'LightGBM': 'Primary gradient boosted classifier in Aihack LOD model, optimized for AUC.',
    'XGBoost': 'Calibrated gradient boosting incorporating asymmetric false-negative loss penalty.',
    'SHAP': 'TreeExplainer marginal decompositions for regulatory-compliant adverse action notices.',
    'LIME': 'Local surrogate linear models delivering auditable tabular applicant explanations.',
    'Scikit-Learn': 'Tabular preprocessing, SMOTE-Tomek imbalance handling, and 5-Fold validation.',
    'PostgreSQL': 'ACID-compliant relational database for transactional and credit history storage.',
    'Apache Spark': 'Distributed batch ETL pipelines processing multi-gigabyte financial telemetry.',
    'Apache Airflow': 'Automated feature calculation DAG scheduling with data-quality SLA monitoring.',
    'Docker': 'Containerized microservices ensuring isolated and reproducible ML deployments.',
    'FastAPI': 'Sub-30ms low-latency inference endpoints for real-time credit risk scoring.'
  };

  function initElements() {
    ringContainer = document.getElementById('tech-ring-carousel');
    if (!ringContainer) return;

    ringTrack = ringContainer.querySelector('.ring-track');
    ringItems = ringContainer.querySelectorAll('.ring-item');
    tooltipBox = document.getElementById('ring-tooltip');
    categoryButtons = document.querySelectorAll('.ring-filter-btn');
  }

  function setupRingPositions() {
    if (!ringItems || !ringItems.length) return;

    const total = ringItems.length;
    const isMobile = window.innerWidth < 768;
    radius = isMobile ? 220 : 330;

    const angleStep = 360 / total;

    ringItems.forEach((item, idx) => {
      const angle = angleStep * idx;
      item.dataset.baseAngle = angle;
      item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

      const techName = item.querySelector('.ring-item-name')?.textContent?.trim();
      if (techName && TECH_METADATA[techName]) {
        item.setAttribute('data-info', TECH_METADATA[techName]);
      }
    });
  }

  function updateRotation() {
    if (!ringTrack) return;

    if (!isPaused && !isDragging) {
      currentRotation -= autoRotateSpeed;
    } else if (isDragging) {
      currentRotation = targetRotation;
    } else {
      // Gentle damping after manual drag
      currentRotation += velocity;
      velocity *= 0.94;
      if (Math.abs(velocity) < 0.005) velocity = 0;
    }

    ringTrack.style.transform = `rotateX(-5deg) rotateY(${currentRotation}deg)`;

    requestAnimationFrame(updateRotation);
  }

  function showTooltip(item, e) {
    if (!tooltipBox) return;

    const name = item.querySelector('.ring-item-name')?.textContent?.trim() || '';
    const category = item.querySelector('.ring-item-cat')?.textContent?.trim() || '';
    const info = item.getAttribute('data-info') || TECH_METADATA[name] || 'Core engineering competency.';

    tooltipBox.innerHTML = `
      <div class="tooltip-header">
        <strong>${name}</strong>
        <span class="tooltip-cat">${category}</span>
      </div>
      <div class="tooltip-body">${info}</div>
    `;

    tooltipBox.classList.add('visible');
    positionTooltip(e);
  }

  function hideTooltip() {
    if (!tooltipBox) return;
    tooltipBox.classList.remove('visible');
  }

  function positionTooltip(e) {
    if (!tooltipBox || !ringContainer) return;
    const rect = ringContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tooltipBox.style.left = `${Math.min(rect.width - 260, Math.max(16, x + 15))}px`;
    tooltipBox.style.top = `${Math.max(10, y - 60)}px`;
  }

  function setupListeners() {
    if (!ringContainer) return;

    // Hover listeners: immediately pause rotation
    ringItems.forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        isPaused = true;
        item.classList.add('hovered');
        showTooltip(item, e);
      });

      item.addEventListener('mousemove', (e) => {
        positionTooltip(e);
      });

      item.addEventListener('mouseleave', () => {
        isPaused = false;
        item.classList.remove('hovered');
        hideTooltip();
      });
    });

    ringContainer.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    ringContainer.addEventListener('mouseleave', () => {
      isPaused = false;
      hideTooltip();
    });

    // Touch & Drag events for manual spinning
    ringContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      isDragging = true;
      startX = e.clientX;
      previousX = e.clientX;
      velocity = 0;
      ringContainer.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const delta = e.clientX - previousX;
      previousX = e.clientX;
      velocity = delta * 0.2;
      targetRotation += delta * 0.3;
      currentRotation = targetRotation;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        if (ringContainer) ringContainer.style.cursor = 'grab';
      }
    });

    // Mobile touch gestures
    ringContainer.addEventListener('touchstart', (e) => {
      isPaused = true;
      isDragging = true;
      startX = e.touches[0].clientX;
      previousX = e.touches[0].clientX;
      velocity = 0;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches.length) return;
      const currentX = e.touches[0].clientX;
      const delta = currentX - previousX;
      previousX = currentX;
      velocity = delta * 0.2;
      currentRotation += delta * 0.3;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
      isPaused = false;
    });

    // Category Filter Buttons
    categoryButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        ringItems.forEach((item) => {
          const cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            item.style.opacity = '1';
            item.style.filter = 'none';
          } else {
            item.style.opacity = '0.2';
            item.style.filter = 'grayscale(80%)';
          }
        });
      });
    });

    window.addEventListener('resize', setupRingPositions);
  }

  window.initRingCarousel = function () {
    initElements();
    setupRingPositions();
    setupListeners();
    updateRotation();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initRingCarousel);
  } else {
    window.initRingCarousel();
  }
})();

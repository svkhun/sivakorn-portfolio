/**
 * Dual-Track Smooth Infinite Marquee Controller
 * Sivakorn Khundilokrattaya - Minimalist Technical Stack Showcase
 * Supports seamless infinite CSS marquee loops, category spotlight filtering, and interactive hover tooltips
 */

(function () {
  'use strict';

  const TECH_METADATA = {
    'Python': { desc: 'Primary language for statistical computing, data pipelines, and ML architectures.', category: 'languages' },
    'SQL': { desc: 'Complex relational querying, window aggregations, and dimensional schema modeling.', category: 'languages' },
    'C++': { desc: 'Low-level systems programming, memory optimization, and algorithmic execution.', category: 'languages' },
    'Java': { desc: 'Enterprise object-oriented design and distributed backend architectures.', category: 'languages' },
    'R': { desc: 'Statistical computing, econometric distribution analysis, and hypothesis testing.', category: 'languages' },
    'XGBoost': { desc: 'Gradient boosting with asymmetric loss penalty; frailty scoring in GuardianAI.', category: 'ml' },
    'LightGBM': { desc: 'Fast gradient boosted trees for Aihack LOD classification on ~40,000 records.', category: 'ml' },
    'Scikit-Learn': { desc: 'Tabular preprocessing, SMOTE-Tomek imbalance correction, and 5-Fold validation.', category: 'ml' },
    'SHAP': { desc: 'TreeExplainer waterfall attributions for clinical & credit adverse action notices.', category: 'ml' },
    'LIME': { desc: 'Local surrogate linear models delivering human-interpretable sample attributions.', category: 'ml' },
    'PostgreSQL': { desc: 'ACID transactional data storage and analytical dimensional warehousing.', category: 'data-eng' },
    'MySQL': { desc: 'Relational database management and high-concurrency transactional queries.', category: 'data-eng' },
    'Apache Spark': { desc: 'Distributed batch ETL processing for large-scale telemetry & credit cohorts.', category: 'data-eng' },
    'Apache Airflow': { desc: 'Automated DAG workflow orchestration with SLA monitoring & data quality guards.', category: 'data-eng' },
    'Docker': { desc: 'Containerized microservices ensuring isolated and reproducible ML deployment.', category: 'data-eng' },
    'FastAPI': { desc: 'Sub-30ms low-latency asynchronous REST APIs for point-of-sale risk inference.', category: 'data-eng' },
    'GISTDA Sphere': { desc: 'Spatial API ingestion for Sentinel-1 & Copernicus elevation DEM integration.', category: 'tools' },
    'Sentinel-1 SAR': { desc: 'Synthetic Aperture Radar soil moisture remote sensing at 30m resolution.', category: 'tools' }
  };

  let marqueeContainer, tooltipBox, filterTabs, marqueeCards;

  function initElements() {
    marqueeContainer = document.getElementById('tech-marquee-container');
    if (!marqueeContainer) return;

    tooltipBox = document.getElementById('marquee-tooltip');
    filterTabs = document.querySelectorAll('.marquee-filter-tab');
    marqueeCards = marqueeContainer.querySelectorAll('.marquee-card');
  }

  function setupTooltips() {
    if (!marqueeCards || !marqueeCards.length) return;

    marqueeCards.forEach((card) => {
      const techName = card.querySelector('.marquee-card-name')?.textContent?.trim();
      const meta = TECH_METADATA[techName];

      if (meta) {
        card.setAttribute('data-category', meta.category);
        card.setAttribute('data-info', meta.desc);
      }

      card.addEventListener('mouseenter', (e) => {
        showTooltip(card, e);
      });

      card.addEventListener('mousemove', (e) => {
        positionTooltip(e);
      });

      card.addEventListener('mouseleave', () => {
        hideTooltip();
      });
    });
  }

  function showTooltip(card, e) {
    if (!tooltipBox) return;

    const name = card.querySelector('.marquee-card-name')?.textContent?.trim() || '';
    const badge = card.querySelector('.marquee-card-badge')?.textContent?.trim() || '';
    const desc = card.getAttribute('data-info') || 'Core engineering stack.';

    tooltipBox.innerHTML = `
      <div class="tooltip-header">
        <strong style="color: var(--accent-sky); font-size: 0.85rem;">${name}</strong>
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim);">${badge}</span>
      </div>
      <div class="tooltip-body" style="font-size: 0.775rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.45;">
        ${desc}
      </div>
    `;

    tooltipBox.classList.add('visible');
    positionTooltip(e);
  }

  function hideTooltip() {
    if (!tooltipBox) return;
    tooltipBox.classList.remove('visible');
  }

  function positionTooltip(e) {
    if (!tooltipBox || !marqueeContainer) return;

    const rect = marqueeContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tooltipWidth = 260;
    const boundedX = Math.min(rect.width - tooltipWidth - 10, Math.max(10, x + 12));
    const boundedY = Math.max(10, y - 70);

    tooltipBox.style.left = `${boundedX}px`;
    tooltipBox.style.top = `${boundedY}px`;
  }

  function setupFilters() {
    if (!filterTabs || !filterTabs.length) return;

    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        marqueeCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (filter === 'all' || cardCat === filter) {
            card.style.opacity = '1';
            card.style.borderColor = 'var(--border-color)';
            card.classList.remove('dimmed');
          } else {
            card.style.opacity = '0.22';
            card.style.borderColor = 'transparent';
            card.classList.add('dimmed');
          }
        });
      });
    });
  }

  window.initTechMarquee = function () {
    initElements();
    setupTooltips();
    setupFilters();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initTechMarquee);
  } else {
    window.initTechMarquee();
  }
})();

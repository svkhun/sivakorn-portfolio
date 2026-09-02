/**
 * Interactive SHAP Waterfall & Regulatory Explainability Engine
 * Sivakorn Khundilokrattaya - Enterprise Credit Risk Showcase
 * Calculates local marginal Shapley feature contributions phi_i & regulatory adverse action reasons
 */

(function () {
  'use strict';

  // Base Expected Value E[f(X)] for Probability of Default
  const BASE_VALUE = 0.125;

  const DEFAULT_STATE = {
    dti: 28,             // Debt-to-Income (%)
    delinquency: 0,      // Past Due Events (90d+)
    utilization: 35,     // Revolving Credit Utilization (%)
    income: 65,          // Annual Income ($k)
    inquiries: 1         // Recent Credit Inquiries (6m)
  };

  let currentState = { ...DEFAULT_STATE };
  let elements = {};

  function initElements() {
    elements = {
      // Sliders
      sliderDti: document.getElementById('shap-slider-dti'),
      sliderDelinq: document.getElementById('shap-slider-delinq'),
      sliderUtil: document.getElementById('shap-slider-util'),
      sliderIncome: document.getElementById('shap-slider-income'),
      sliderInq: document.getElementById('shap-slider-inq'),

      // Value Displays
      valDti: document.getElementById('shap-val-dti'),
      valDelinq: document.getElementById('shap-val-delinq'),
      valUtil: document.getElementById('shap-val-util'),
      valIncome: document.getElementById('shap-val-income'),
      valInq: document.getElementById('shap-val-inq'),

      // Outputs
      outputPd: document.getElementById('shap-output-pd'),
      outputBadge: document.getElementById('shap-output-badge'),
      outputTier: document.getElementById('shap-output-tier'),
      waterfallContainer: document.getElementById('shap-waterfall-rows'),
      adverseActionText: document.getElementById('shap-adverse-reasons'),

      // Profile Buttons
      btnPresetPrime: document.getElementById('btn-preset-prime'),
      btnPresetBorderline: document.getElementById('btn-preset-borderline'),
      btnPresetDistressed: document.getElementById('btn-preset-distressed'),
      btnReset: document.getElementById('btn-reset-shap')
    };
  }

  function calculateContributions(state) {
    // 1. Debt-to-Income (DTI) marginal effect
    const dtiDiff = state.dti - 30;
    const phi_dti = dtiDiff * 0.0034;

    // 2. Delinquency (90d late) marginal effect
    const phi_delinq = state.delinquency * 0.082;

    // 3. Revolving Utilization marginal effect
    const utilDiff = state.utilization - 30;
    const phi_util = utilDiff * 0.0030;

    // 4. Annual Income marginal effect (protective buffer)
    const incomeDiff = 60 - state.income;
    const phi_income = incomeDiff * 0.0017;

    // 5. Recent Credit Inquiries marginal effect
    const inqDiff = state.inquiries - 1;
    const phi_inq = inqDiff * 0.018;

    const features = [
      {
        name: 'Delinquency History (90d+)',
        valDisplay: `${state.delinquency} event${state.delinquency === 1 ? '' : 's'}`,
        phi: phi_delinq,
        adverseCode: 'Excessive historical delinquencies / 90d past-due events'
      },
      {
        name: 'Debt-to-Income (DTI)',
        valDisplay: `${state.dti}%`,
        phi: phi_dti,
        adverseCode: 'Debt-to-income ratio exceeds regulatory prudential threshold'
      },
      {
        name: 'Revolving Line Utilization',
        valDisplay: `${state.utilization}%`,
        phi: phi_util,
        adverseCode: 'High credit line utilization indicating liquidity pressure'
      },
      {
        name: 'Annual Income',
        valDisplay: `$${state.income}k`,
        phi: phi_income,
        adverseCode: 'Insufficient verified annual disposable income'
      },
      {
        name: 'Credit Inquiries (6M)',
        valDisplay: `${state.inquiries} inquiries`,
        phi: phi_inq,
        adverseCode: 'Elevated velocity of recent credit bureau inquiries'
      }
    ];

    const totalSum = features.reduce((acc, f) => acc + f.phi, 0);
    const rawPd = BASE_VALUE + totalSum;
    const finalPd = Math.max(0.012, Math.min(0.975, rawPd));

    return {
      baseValue: BASE_VALUE,
      features,
      predictedPd: finalPd
    };
  }

  function render() {
    if (!elements.outputPd) return;

    const result = calculateContributions(currentState);
    const pdPercent = (result.predictedPd * 100).toFixed(1);

    // Update Slider Value Texts
    if (elements.valDti) elements.valDti.textContent = `${currentState.dti}%`;
    if (elements.valDelinq) elements.valDelinq.textContent = `${currentState.delinquency}x`;
    if (elements.valUtil) elements.valUtil.textContent = `${currentState.utilization}%`;
    if (elements.valIncome) elements.valIncome.textContent = `$${currentState.income}k`;
    if (elements.valInq) elements.valInq.textContent = `${currentState.inquiries}`;

    // Output PD and Basel Tier
    elements.outputPd.textContent = `${pdPercent}%`;

    let tierLabel = 'Basel Tier A (Prime)';
    let tierClass = 'low-risk';

    if (result.predictedPd >= 0.38) {
      tierLabel = 'Basel Tier C (Subprime / High Risk)';
      tierClass = 'high-risk';
    } else if (result.predictedPd >= 0.18) {
      tierLabel = 'Basel Tier B (Moderate Risk)';
      tierClass = 'moderate-risk';
    }

    elements.outputBadge.className = `output-value-badge ${tierClass}`;
    if (elements.outputTier) {
      elements.outputTier.textContent = tierLabel;
    }

    // Sort features by absolute contribution magnitude
    const sortedFeatures = [...result.features].sort((a, b) => Math.abs(b.phi) - Math.abs(a.phi));

    // Render Waterfall Rows
    if (elements.waterfallContainer) {
      elements.waterfallContainer.innerHTML = '';

      // Base Expected Value E[f(X)] row
      const baseRow = document.createElement('div');
      baseRow.className = 'waterfall-row';
      baseRow.innerHTML = `
        <div class="waterfall-meta">
          <span class="waterfall-feature-name"><strong>Base Expected Value E[f(X)]</strong></span>
          <span class="waterfall-contrib" style="color: var(--accent-cyan);">${(BASE_VALUE * 100).toFixed(1)}%</span>
        </div>
        <div class="waterfall-bar-container">
          <div class="waterfall-bar" style="width: ${(BASE_VALUE * 100).toFixed(1)}%; background: var(--accent-cyan);"></div>
        </div>
      `;
      elements.waterfallContainer.appendChild(baseRow);

      sortedFeatures.forEach((item) => {
        const isPos = item.phi >= 0;
        const sign = isPos ? '+' : '';
        const pctContrib = (item.phi * 100).toFixed(2);
        const absWidth = Math.min(100, Math.max(2, Math.abs(item.phi) * 230));

        const row = document.createElement('div');
        row.className = 'waterfall-row';
        row.innerHTML = `
          <div class="waterfall-meta">
            <span class="waterfall-feature-name">${item.name} <small style="color: var(--text-dim);">(${item.valDisplay})</small></span>
            <span class="waterfall-contrib ${isPos ? 'positive' : 'negative'}">${sign}${pctContrib}%</span>
          </div>
          <div class="waterfall-bar-container">
            <div class="waterfall-bar ${isPos ? 'positive' : 'negative'}" style="width: ${absWidth}%;"></div>
          </div>
        `;
        elements.waterfallContainer.appendChild(row);
      });
    }

    // Adverse Action Reason Generator (Compliance & Underwriting Transparency)
    if (elements.adverseActionText) {
      const topRiskDrivers = sortedFeatures.filter(f => f.phi > 0.015);
      if (topRiskDrivers.length === 0 || result.predictedPd < 0.18) {
        elements.adverseActionText.innerHTML = `
          <span style="color: var(--accent-emerald);"><i class="fas fa-check-circle"></i> Applicant satisfies all automated underwriting criteria. Zero adverse regulatory actions triggered.</span>
        `;
      } else {
        const reasonsList = topRiskDrivers.slice(0, 2).map((driver, idx) => `
          <div><strong>Reason Code #${idx + 1}:</strong> ${driver.adverseCode} (Marginal SHAP: +${(driver.phi * 100).toFixed(1)}% PD contribution).</div>
        `).join('');
        elements.adverseActionText.innerHTML = `
          <div style="color: var(--accent-rose); margin-bottom: 4px;"><i class="fas fa-exclamation-triangle"></i> Generated Adverse Action Notice:</div>
          ${reasonsList}
        `;
      }
    }
  }

  function setupListeners() {
    if (elements.sliderDti) {
      elements.sliderDti.addEventListener('input', (e) => {
        currentState.dti = parseInt(e.target.value, 10);
        render();
      });
    }

    if (elements.sliderDelinq) {
      elements.sliderDelinq.addEventListener('input', (e) => {
        currentState.delinquency = parseInt(e.target.value, 10);
        render();
      });
    }

    if (elements.sliderUtil) {
      elements.sliderUtil.addEventListener('input', (e) => {
        currentState.utilization = parseInt(e.target.value, 10);
        render();
      });
    }

    if (elements.sliderIncome) {
      elements.sliderIncome.addEventListener('input', (e) => {
        currentState.income = parseInt(e.target.value, 10);
        render();
      });
    }

    if (elements.sliderInq) {
      elements.sliderInq.addEventListener('input', (e) => {
        currentState.inquiries = parseInt(e.target.value, 10);
        render();
      });
    }

    // Presets
    if (elements.btnPresetPrime) {
      elements.btnPresetPrime.addEventListener('click', () => {
        currentState = {
          dti: 16,
          delinquency: 0,
          utilization: 15,
          income: 120,
          inquiries: 0
        };
        syncSliders();
        render();
      });
    }

    if (elements.btnPresetBorderline) {
      elements.btnPresetBorderline.addEventListener('click', () => {
        currentState = {
          dti: 38,
          delinquency: 1,
          utilization: 58,
          income: 52,
          inquiries: 2
        };
        syncSliders();
        render();
      });
    }

    if (elements.btnPresetDistressed) {
      elements.btnPresetDistressed.addEventListener('click', () => {
        currentState = {
          dti: 58,
          delinquency: 3,
          utilization: 88,
          income: 28,
          inquiries: 5
        };
        syncSliders();
        render();
      });
    }

    if (elements.btnReset) {
      elements.btnReset.addEventListener('click', () => {
        currentState = { ...DEFAULT_STATE };
        syncSliders();
        render();
      });
    }
  }

  function syncSliders() {
    if (elements.sliderDti) elements.sliderDti.value = currentState.dti;
    if (elements.sliderDelinq) elements.sliderDelinq.value = currentState.delinquency;
    if (elements.sliderUtil) elements.sliderUtil.value = currentState.utilization;
    if (elements.sliderIncome) elements.sliderIncome.value = currentState.income;
    if (elements.sliderInq) elements.sliderInq.value = currentState.inquiries;
  }

  window.initShapSimulator = function () {
    initElements();
    syncSliders();
    setupListeners();
    render();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initShapSimulator);
  } else {
    window.initShapSimulator();
  }
})();

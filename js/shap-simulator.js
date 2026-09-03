/**
 * Interactive SHAP Waterfall & Regulatory Explainability Engine
 * Sivakorn Khundilokrattaya - Enterprise Credit Risk Showcase
 * Calculates local marginal Shapley feature contributions phi_i & regulatory adverse action reasons
 */

(function () {
  'use strict';

  // Base Expected Value E[f(X)] for Probability of Default
  const BASE_VALUE = 0.082;

  const DEFAULT_STATE = {
    income: 65000,       // Monthly Income (THB)
    utilization: 32,     // Debt-to-Income / Revolving Utilization (%)
    delinquency: 0       // Past 24-Month Delinquency Count (0 - 5)
  };

  let currentState = { ...DEFAULT_STATE };
  let elements = {};

  function initElements() {
    elements = {
      // Sliders
      sliderIncome: document.getElementById('shap-slider-income'),
      sliderUtil: document.getElementById('shap-slider-util'),
      sliderDelinq: document.getElementById('shap-slider-delinq'),

      // Value Displays
      valIncome: document.getElementById('shap-val-income'),
      valUtil: document.getElementById('shap-val-util'),
      valDelinq: document.getElementById('shap-val-delinq'),

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
    // 1. Delinquency (24m history) marginal effect
    const phi_delinq = state.delinquency * 0.095;

    // 2. Revolving Line Utilization / DTI marginal effect
    const utilDiff = state.utilization - 30;
    const phi_util = utilDiff * 0.0035;

    // 3. Monthly Income marginal effect (protective buffer)
    const incomeBaseline = 60000;
    const incomeDiff = incomeBaseline - state.income;
    const phi_income = (incomeDiff / 10000) * 0.012;

    const features = [
      {
        name: 'Past 24-Month Delinquency Count',
        valDisplay: `${state.delinquency} event${state.delinquency === 1 ? '' : 's'}`,
        phi: phi_delinq,
        adverseCode: 'High delinquency velocity / past-due installment history'
      },
      {
        name: 'Debt-to-Income & Revolving Utilization',
        valDisplay: `${state.utilization}%`,
        phi: phi_util,
        adverseCode: 'Elevated credit line utilization exceeding prudential limit'
      },
      {
        name: 'Monthly Verified Income',
        valDisplay: `${state.income.toLocaleString()} THB`,
        phi: phi_income,
        adverseCode: 'Insufficient verified monthly disposable liquidity'
      }
    ];

    const totalSum = features.reduce((acc, f) => acc + f.phi, 0);
    const rawPd = BASE_VALUE + totalSum;
    const finalPd = Math.max(0.012, Math.min(0.965, rawPd));

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
    if (elements.valIncome) elements.valIncome.textContent = `${currentState.income.toLocaleString()} THB`;
    if (elements.valUtil) elements.valUtil.textContent = `${currentState.utilization}%`;
    if (elements.valDelinq) elements.valDelinq.textContent = `${currentState.delinquency}x`;

    // Output PD and Basel Tier
    elements.outputPd.textContent = `PD: ${pdPercent}%`;

    let tierLabel = 'Low Risk / Approved';
    let tierClass = 'low-risk';

    if (result.predictedPd >= 0.35) {
      tierLabel = 'High Risk / Review';
      tierClass = 'high-risk';
    } else if (result.predictedPd >= 0.16) {
      tierLabel = 'Moderate Risk / Conditional';
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
          <span class="waterfall-feature-name"><strong>Baseline Expectation E[f(X)]</strong></span>
          <span class="waterfall-contrib" style="color: var(--accent-sky);">${(BASE_VALUE * 100).toFixed(1)}%</span>
        </div>
        <div class="waterfall-bar-container">
          <div class="waterfall-bar" style="width: ${(BASE_VALUE * 100).toFixed(1)}%; background: var(--accent-sky);"></div>
        </div>
      `;
      elements.waterfallContainer.appendChild(baseRow);

      sortedFeatures.forEach((item) => {
        const isPos = item.phi >= 0;
        const sign = isPos ? '+' : '';
        const pctContrib = (item.phi * 100).toFixed(1);
        const absWidth = Math.min(100, Math.max(3, Math.abs(item.phi) * 220));

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
      if (topRiskDrivers.length === 0 || result.predictedPd < 0.16) {
        elements.adverseActionText.innerHTML = `
          <span style="color: var(--accent-sage);"><i class="fas fa-check-circle"></i> <strong>Underwriting Decision: Approved</strong> &bull; Zero adverse regulatory action notices triggered under ECOA/FCRA standards.</span>
        `;
      } else {
        const reasonsList = topRiskDrivers.slice(0, 2).map((driver, idx) => `
          <div><strong>Reason Code #${idx + 1}:</strong> ${driver.adverseCode} (Marginal SHAP: +${(driver.phi * 100).toFixed(1)}% PD increase).</div>
        `).join('');
        elements.adverseActionText.innerHTML = `
          <div style="color: #F87171; margin-bottom: 4px;"><i class="fas fa-exclamation-triangle"></i> <strong>Generated Adverse Action Notice (ECOA / FCRA):</strong></div>
          ${reasonsList}
        `;
      }
    }
  }

  function setupListeners() {
    if (elements.sliderIncome) {
      elements.sliderIncome.addEventListener('input', (e) => {
        currentState.income = parseInt(e.target.value, 10);
        render();
      });
    }

    if (elements.sliderUtil) {
      elements.sliderUtil.addEventListener('input', (e) => {
        currentState.utilization = parseInt(e.target.value, 10);
        render();
      });
    }

    if (elements.sliderDelinq) {
      elements.sliderDelinq.addEventListener('input', (e) => {
        currentState.delinquency = parseInt(e.target.value, 10);
        render();
      });
    }

    // Presets
    if (elements.btnPresetPrime) {
      elements.btnPresetPrime.addEventListener('click', () => {
        currentState = {
          income: 95000,
          utilization: 24,
          delinquency: 0
        };
        syncSliders();
        render();
      });
    }

    if (elements.btnPresetBorderline) {
      elements.btnPresetBorderline.addEventListener('click', () => {
        currentState = {
          income: 45000,
          utilization: 62,
          delinquency: 1
        };
        syncSliders();
        render();
      });
    }

    if (elements.btnPresetDistressed) {
      elements.btnPresetDistressed.addEventListener('click', () => {
        currentState = {
          income: 25000,
          utilization: 88,
          delinquency: 3
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
    if (elements.sliderIncome) elements.sliderIncome.value = currentState.income;
    if (elements.sliderUtil) elements.sliderUtil.value = currentState.utilization;
    if (elements.sliderDelinq) elements.sliderDelinq.value = currentState.delinquency;
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

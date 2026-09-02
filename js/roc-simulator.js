/**
 * Interactive ROC Curve Visualizer & Decision Threshold Sandbox
 * Sivakorn Khundilokrattaya - Aihack Thailand 2025 LOD Prediction Project
 * Calm Tech theme with soft sky blue and sage palette
 */

(function () {
  'use strict';

  let canvas, ctx;
  let threshold = 0.35;
  let elements = {};

  const TOTAL_POPULATION = 40000;
  const DEFAULT_RATE = 0.10;
  const ACTUAL_POSITIVES = TOTAL_POPULATION * DEFAULT_RATE;     // 4,000
  const ACTUAL_NEGATIVES = TOTAL_POPULATION * (1 - DEFAULT_RATE); // 36,000

  const AVG_DEFAULT_LOSS = 2500;
  const AVG_REJECTION_COST = 350;

  function initElements() {
    canvas = document.getElementById('roc-canvas');
    if (canvas) {
      ctx = canvas.getContext('2d');
    }

    elements = {
      sliderThreshold: document.getElementById('roc-slider-threshold'),
      valThreshold: document.getElementById('roc-val-threshold'),
      valSensitivity: document.getElementById('roc-val-sensitivity'),
      valSpecificity: document.getElementById('roc-val-specificity'),
      valPrecision: document.getElementById('roc-val-precision'),
      valF1: document.getElementById('roc-val-f1'),
      valGini: document.getElementById('roc-val-gini'),
      cmTP: document.getElementById('cm-tp'),
      cmFP: document.getElementById('cm-fp'),
      cmTN: document.getElementById('cm-tn'),
      cmFN: document.getElementById('cm-fn'),
      businessNetVal: document.getElementById('roc-business-net-val')
    };
  }

  function getTunedTpr(fpr) {
    return Math.pow(fpr, 0.22);
  }

  function getBaselineTpr(fpr) {
    return Math.pow(fpr, 0.48);
  }

  function computeMetrics(thresh) {
    const fpr = Math.max(0.01, Math.min(0.95, Math.pow(1 - thresh, 2.3)));
    const tpr = Math.max(0.02, Math.min(0.98, getTunedTpr(fpr)));

    const tp = Math.round(tpr * ACTUAL_POSITIVES);
    const fn = ACTUAL_POSITIVES - tp;
    const fp = Math.round(fpr * ACTUAL_NEGATIVES);
    const tn = ACTUAL_NEGATIVES - fp;

    const precision = tp / (tp + fp);
    const recall = tpr;
    const f1 = (2 * precision * recall) / (precision + recall);
    const specificity = tn / ACTUAL_NEGATIVES;

    const lossAvoided = tp * AVG_DEFAULT_LOSS;
    const opportunityCost = fp * AVG_REJECTION_COST;
    const netBenefit = lossAvoided - opportunityCost;

    return {
      fpr,
      tpr,
      tp,
      fp,
      tn,
      fn,
      precision,
      recall,
      f1,
      specificity,
      netBenefit,
      gini: 2 * 0.894 - 1
    };
  }

  function drawRocCurve(metrics) {
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 360;
    const h = rect.height || 240;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const padding = { top: 18, right: 18, bottom: 32, left: 38 };
    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid Lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const frac = i / 4;
      const x = padding.left + frac * plotW;
      const y = padding.top + (1 - frac) * plotH;

      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + plotH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + plotW, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText((frac).toFixed(2), x, padding.top + plotH + 13);

      ctx.textAlign = 'right';
      ctx.fillText((frac).toFixed(2), padding.left - 6, y + 3);
    }

    // 1. Diagonal Line
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(padding.left, padding.top + plotH);
    ctx.lineTo(padding.left + plotW, padding.top);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Baseline LogReg Curve (AUC = 0.724)
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    for (let i = 0; i <= 100; i++) {
      const f = i / 100;
      const t = getBaselineTpr(f);
      const px = padding.left + f * plotW;
      const py = padding.top + (1 - t) * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Tuned Ensemble Curve (AUC = 0.894)
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const f = i / 100;
      const t = getTunedTpr(f);
      const px = padding.left + f * plotW;
      const py = padding.top + (1 - t) * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // Shaded fill
    ctx.lineTo(padding.left + plotW, padding.top + plotH);
    ctx.lineTo(padding.left, padding.top + plotH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.07)';
    ctx.fill();

    // 4. Operating Point
    const opX = padding.left + metrics.fpr * plotW;
    const opY = padding.top + (1 - metrics.tpr) * plotH;

    ctx.beginPath();
    ctx.arc(opX, opY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#34d399';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(opX, opY, 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  function render() {
    const metrics = computeMetrics(threshold);

    if (elements.valThreshold) elements.valThreshold.textContent = threshold.toFixed(2);
    if (elements.valSensitivity) elements.valSensitivity.textContent = `${(metrics.recall * 100).toFixed(1)}%`;
    if (elements.valSpecificity) elements.valSpecificity.textContent = `${(metrics.specificity * 100).toFixed(1)}%`;
    if (elements.valPrecision) elements.valPrecision.textContent = `${(metrics.precision * 100).toFixed(1)}%`;
    if (elements.valF1) elements.valF1.textContent = metrics.f1.toFixed(3);
    if (elements.valGini) elements.valGini.textContent = metrics.gini.toFixed(3);

    if (elements.cmTP) elements.cmTP.textContent = metrics.tp.toLocaleString();
    if (elements.cmFP) elements.cmFP.textContent = metrics.fp.toLocaleString();
    if (elements.cmTN) elements.cmTN.textContent = metrics.tn.toLocaleString();
    if (elements.cmFN) elements.cmFN.textContent = metrics.fn.toLocaleString();

    if (elements.businessNetVal) {
      elements.businessNetVal.textContent = `$${(metrics.netBenefit / 1000000).toFixed(2)}M`;
    }

    drawRocCurve(metrics);
  }

  function setupListeners() {
    if (elements.sliderThreshold) {
      elements.sliderThreshold.addEventListener('input', (e) => {
        threshold = parseFloat(e.target.value);
        render();
      });
    }

    window.addEventListener('resize', () => {
      render();
    });
  }

  window.initRocSimulator = function () {
    initElements();
    setupListeners();
    render();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initRocSimulator);
  } else {
    window.initRocSimulator();
  }
})();

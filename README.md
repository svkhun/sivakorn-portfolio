<div align="center">

# Sivakorn Khundilokrattaya
### Data Scientist & Machine Learning Engineer &bull; FinTech & Quantitative Risk

[![Live Portfolio](https://img.shields.io/badge/Live_Demo-svkhun.vercel.app-0284C7?style=for-the-badge&logo=vercel&logoColor=white)](https://svkhun.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-059669?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![WCAG Accessibility](https://img.shields.io/badge/Accessibility-WCAG_AAA-6D28D9?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Code Architecture](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_Tailwind_CSS-0F172A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<p align="center">
  <strong>Architecting explainable credit risk engines, high-impact tabular ML, and production-grade financial data pipelines.</strong>
</p>

[Explore Projects](https://svkhun.vercel.app#projects) &bull; [Executive Brief](https://svkhun.vercel.app) &bull; [KBTG Certified](https://svkhun.vercel.app#about) &bull; [GitHub](https://github.com/svkhun) &bull; [LinkedIn](https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429)

---

</div>

##  Executive Summary

I am a **Computer Engineering student at Srinakharinwirot University (SWU, Class of 2026)** specializing in **statistical tabular machine learning, Basel II/III credit risk modeling, and regulatory-compliant Explainable AI (XAI)**.

In institutional banking and quantitative risk underwriting, black-box algorithms introduce significant regulatory and financial liabilities. My engineering focus bridges rigorous statistical modeling with software discipline:
* **Calibrated Default Prediction**: Estimating Probability of Default (PD) via Weight of Evidence (WoE) monotonic binning, Information Value (IV) screening, and asymmetric loss matrix optimization.
* **Model Stability & Governance**: Tracking Population Stability Index (PSI < 0.10) and Kolmogorov-Smirnov separation (KS > 40%) across temporal cohorts.
* **Audit-Defensible Explainability**: Integrating instance-level **TreeSHAP** marginal attributions to generate legally compliant Adverse Action notices (ECOA 12 C.F.R. § 1002.9 / FCRA).
* **Low-Latency Serving**: Deploying containerized FastAPI endpoints with sub-30ms inference times.

---

##  Architectural Highlights & Engineering Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SVKHUN CLIENT ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Canvas Layer ] ──> Interactive Synaptic Particle Physics (Dual Engine)  │
│  [ UI Framework ] ──> Zero-Dependency Modular Vanilla JS + Tailwind Tokens  │
│  [ Theme Engine ] ──> WCAG AAA Slate-50 Light Mode / Obsidian Dark Mode     │
│  [ Security ]    ──> Client-Side Web Crypto SHA-256 Admin Telemetry Audit   │
│  [ Defense ]     ──> Strict CSP, Frame Protection (DENY), nosniff Headers  │
└─────────────────────────────────────────────────────────────────────────────┘
```

* **Sequential Bento Storytelling**: Single vertical flow with horizontal tiers that eliminate split-column cognitive overload.
* **Dual-Instance Synaptic Canvas Engine**: 60 FPS vector field and particle network responding dynamically to cursor physics on both Hero and Footer views (`js/neural-canvas.js`).
* **High-Contrast Theme Inversion (WCAG AAA)**: Slate-50 (`#F8FAFC`) canvas paired with elevated pure-white Bento containers and high-contrast typography tokens.
* **Client-Side Cryptographic Hardening**: Zero hardcoded plaintext admin tokens; uses client-side SHA-256 digest validation with instant URL query scrubbing (`history.replaceState`).
* **Zero-Bloat Performance**: Built with high-performance vanilla JavaScript modules, achieving sub-second first contentful paint (FCP).

---

##  Featured Case Studies & Quantitative Systems

### 1. Enterprise Credit Risk Scoring & Explainable AI (XAI)
* **Problem**: Regulatory compliance under ECOA / SR 11-7 forbids opaque underwriting. Required legally defensible risk scoring for consumer credit applications.
* **Architecture**:
  * Continuous feature discretization using **Monotonic Weight of Evidence (WoE)** and **Information Value (IV)** filtering.
  * Calibrated **LightGBM / Logistic Regression** dual-scorecard engine.
  * Exact instance-level Shapley value decomposition ($f(x) = \mathbb{E}[f(x)] + \sum_{j=1}^M \phi_j$) via **TreeSHAP**.
* **Key Metrics**:
  * **0.894 ROC-AUC** on 5-Fold Stratified Cross-Validation.
  * **42.6% KS Separation Statistic** (Clean default discrimination).
  * **PSI < 0.08** (Strict temporal population stability).
  * **< 30ms** FastAPI inference latency with automated Adverse Action notice generation.

---

### 2. Long Overdue Debtor (LOD) Prediction & Threshold Optimizer
* **Problem**: Mitigating non-performing loans (NPLs) by classifying 90+ day default trajectories under asymmetric cost matrices (Cost of False Negative >> Cost of False Positive).
* **Architecture**:
  * High-dimensional tabular preprocessing across transactional payment delinquency history.
  * Cost-matrix threshold optimization balancing charge-off loss vs. customer acquisition cost (CAC).
  * Live client-side ROC curve & Decision Matrix threshold simulator.
* **Key Metrics**:
  * **0.887 ROC-AUC** across out-of-time test partitions.
  * **14.2% Estimated P&L Improvement** over static 0.50 cutoff thresholds.

---

### 3. Spatial ML Pipeline & Flood Telemetry (Japan-ASEAN AI Hackathon Finalist)
* **Problem**: 30-meter high-resolution flash flood inundation risk modeling across complex topography in Southeast Asia.
* **Architecture**:
  * Geo-spatial ETL fusing **Sentinel-1 SAR** microwave backscatter, **Copernicus DEM** terrain indices, and rainfall telemetry.
  * Automated cloud-masking, speckle filtering, and gradient-boosted spatial segmentation.
* **Outcome**: **Top 5 Finalist** representing Srinakharinwirot University at the Japan-ASEAN AI Hackathon 2024.

---

### 4. Manufacturing (MFG) Telemetry & Anomaly Detection Pipeline
* **Problem**: Continuous Overall Equipment Effectiveness (OEE) optimization and anomalous vibration detection on industrial assembly lines.
* **Architecture**:
  * High-throughput microservice pipeline ingesting streaming sensor signals.
  * Isolation Forest and rolling Z-score anomaly classifiers.
  * Dockerized container deployment with Prometheus metric endpoints.

---

##  Verified Industry Credentials & Academic Foundation

### SKILLKAMP by KBTG Industry Assessments
Certified by **Kasikorn Business-Technology Group (KBTG)** across standardized quantitative benchmarks:

| Assessment Track | Score | Benchmark | Status |
| :--- | :---: | :---: | :---: |
| **Data Analyst (STAMP)** | **97 / 150** | 90.0 | Verified Intermediate (Above Benchmark) |
| **Digital & Performance Marketer** | **98 / 150** | 94.0 | Verified Intermediate (Top Tier Analytics) |

#### 5-Domain Competency Breakdown (Data Analyst Track):
```
1. Data Cleaning & Preprocessing      [████████████████░░░░]  23 / 30  (76.7%)
2. Exploratory Data Analysis & Viz    [██████████████░░░░░░]  20 / 30  (66.7%)
3. Machine Learning for Analysts      [█████████████░░░░░░░]  18 / 30  (60.0%)
4. Business Insight & Problem Framing [██████████████░░░░░░]  19 / 30  (63.3%)
5. SQL & Quantitative Querying        [████████████░░░░░░░░]  17 / 30  (56.7%)
─────────────────────────────────────────────────────────────────────────────
TOTAL VERIFIED SCORE:                                         97 / 150
```

### Academic Credentials
* **B.Eng. in Computer Engineering** &bull; Srinakharinwirot University (SWU)
* **Expected Graduation**: Class of 2026
* **Core Coursework**: Machine Learning, Database Systems (RDBMS & NoSQL), Operating Systems, Statistical Methods & Probability, Data Structures & Algorithms, Clean Software Architecture.

---

##  Technical Arsenal

```
┌─────────────────┬───────────────────────────────────────────────────────────┐
│ CATEGORY        │ TECHNOLOGIES & TOOLS                                      │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ Tabular ML / DS │ Python, LightGBM, XGBoost, CatBoost, Scikit-Learn, Pandas │
│ Risk Analytics  │ OptBinning (WoE/IV), TreeSHAP, Statsmodels, SciPy         │
│ Backend & API   │ FastAPI, Flask, Docker, RESTful Microservices, Pydantic   │
│ Data Eng / DB   │ PostgreSQL, MySQL, SQLite, Apache Parquet, Polars         │
│ Frontend & UI   │ JavaScript (ES6+), Tailwind CSS, Canvas API, HTML5        │
│ Tooling & DevOps│ Git, GitHub Actions, Vercel Edge, Linux/Bash, VS Code     │
└─────────────────┴───────────────────────────────────────────────────────────┘
```

---

##  Production Security Hardening & AppSec Controls

This repository incorporates enterprise frontend application security standards:

* **Web Crypto Authentication**: Admin dashboard access is protected via client-side SHA-256 hash digests (`window.crypto.subtle.digest`). Plaintext keys are never stored in source code.
* **URL Parameter Scrubbing**: Transient authentication parameters (`?auth=...`) are sanitized in-memory using `window.history.replaceState` immediately upon verification.
* **HTTP Defense-in-Depth (`vercel.json`)**:
  * `Content-Security-Policy`: Restricts scripts, styles, and font endpoints to trusted CDNs (`cdnjs.cloudflare.com`, `fonts.googleapis.com`).
  * `X-Frame-Options: DENY`: Mitigates clickjacking attacks.
  * `X-Content-Type-Options: nosniff`: Prevents MIME-sniffing exploits.
  * `Referrer-Policy: strict-origin-when-cross-origin`.
  * `Permissions-Policy`: Restricts unauthorized hardware API access (camera, microphone, geolocation).

---

##  Local Development & Deployment

### Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/svkhun/sivakorn-portfolio.git

# 2. Navigate to project root
cd sivakorn-portfolio

# 3. Serve via local static HTTP server (Node / Python)
npx serve .
# or
python -m http.server 8080
```

Open `http://localhost:3000` (or `http://localhost:8080`) in your browser.

### Production Deployment

This project is configured for continuous zero-config deployment on **Vercel**:

```bash
# Deploy to Vercel production
vercel --prod
```

All HTTP defense-in-depth security headers and cache-control parameters are defined in [`vercel.json`](vercel.json).

---

##  Repository Structure

```
sivakorn-portfolio/
├── index.html                  # Core single-page application & semantic layout
├── vercel.json                 # Vercel security headers (CSP, HSTS, XFO)
├── .gitignore                  # Production Git ignore rules (DS/ML artifacts)
├── README.md                   # Technical documentation & system overview
├── css/
│   └── styles.css              # Custom styling, dark/light design tokens & animations
├── js/
│   ├── main.js                 # App controller, drawer management & AppSec hash auth
│   ├── neural-canvas.js        # Dual-instance interactive synaptic canvas physics
│   ├── focal-deck.js           # Project showcase carousel & interactive deck
│   ├── tech-marquee.js         # Infinite continuous technical arsenal marquee
│   ├── shap-simulator.js       # Real-time SHAP waterfall contribution engine
│   ├── roc-simulator.js        # Interactive ROC curve & decision threshold visualizer
│   └── i18n.js                 # English / Thai localization engine with state persistence
└── assets/                     # Optimized certificates, documentation & profile media
```

---

##  Contact & Connectivity

I am actively seeking **full-time Data Scientist, Machine Learning Engineer, and Quantitative Risk Analyst** roles.

* **Portfolio Website**: [svkhun.vercel.app](https://svkhun.vercel.app)
* **Direct Email**: [sivakorn.khun@gmail.com](mailto:sivakorn.khun@gmail.com)
* **LinkedIn**: [linkedin.com/in/sivakorn-khundilokrattaya-5870b8429](https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429)
* **GitHub**: [github.com/svkhun](https://github.com/svkhun)
* **Location**: Bangkok, Thailand (Open to On-site, Hybrid & Remote opportunities)

---

<div align="center">
  <sub>Designed &amp; Engineered with precision by <strong>Sivakorn Khundilokrattaya</strong> &bull; &copy; 2026 All Rights Reserved.</sub>
</div>

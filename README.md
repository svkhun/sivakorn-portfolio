<div align="center">

# Sivakorn Khundilokrattaya
### Data Scientist & Machine Learning Engineer &bull; FinTech & Quantitative Risk

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-svkhun.vercel.app-0284C7?style=for-the-badge&logo=vercel&logoColor=white)](https://svkhun.vercel.app)
[![Education](https://img.shields.io/badge/Education-B.Eng._Computer_Engineering_@_SWU-38BDF8?style=for-the-badge&logo=google-scholar&logoColor=white)](https://swu.ac.th)
[![Design System](https://img.shields.io/badge/Design-Keynote_Slide_Deck_%7C_Dark_Slate-6366F1?style=for-the-badge)](https://svkhun.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-059669?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <strong>Architecting explainable credit risk engines, Basel-compliant probability of default (PD) models, and scalable production data pipelines.</strong>
</p>

[Explore Projects](#-featured-engineering-case-studies) &bull; [Competitions & Hackathons](#-competitions--industry-challenges) &bull; [KBTG Certifications](#-verified-industry-credentials--assessments) &bull; [Architecture & Design](#-architectural-highlights--keynote-presentation) &bull; [GitHub](https://github.com/svkhun) &bull; [LinkedIn](https://www.linkedin.com/in/sivakorn-khundilokrattaya-5870b8429/)

---

</div>

## 📌 Executive Summary

I am a **Computer Engineering student at Srinakharinwirot University (SWU, Class of 2026)** specializing in **statistical tabular machine learning, Basel II/III credit risk modeling, regulatory-compliant Explainable AI (XAI), and production data pipelines**.

In institutional finance and quantitative underwriting, black-box machine learning models introduce unacceptable regulatory and solvency liabilities. My engineering discipline unites rigorous statistical risk modeling with modern software reliability:
* **Calibrated Default Prediction**: Estimating Probability of Default (PD) via monotonic Weight of Evidence (WoE) binning, Information Value (IV) screening, and asymmetric cost matrix threshold optimization.
* **Regulatory Compliance & Explainability**: Decomposing complex non-linear models with **TreeSHAP** to deliver auditable, legally defensible Adverse Action notices under **ECOA (12 C.F.R. § 1002.9) / FCRA**.
* **Risk Governance & Stability**: Monitoring continuous model drift, Population Stability Index (PSI < 0.10), and Kolmogorov-Smirnov separation (KS > 40%) across temporal cohorts.
* **Production Data Engineering**: Implementing Hybrid Lambda data platforms, sub-second PLC telemetry streaming via WebSockets, idempotent hourly OEE Data Marts in PostgreSQL 15, and low-latency FastAPI inference microservices (< 30ms).

---

## 🎨 Architectural Highlights & Keynote Presentation

The portfolio interface is engineered as an executive **Keynote-Style Slide Deck** infused with an authentic **Dark Slate & Quantitative Terminal** aesthetic:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SVKHUN PORTFOLIO PLATFORM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Visual Theme ] ──> Deep Obsidian Canvas (#0B0F17) + Midnight Slate Glass  │
│  [ Cards & Deck ] ──> Glassmorphism (bg-slate-900/65) + Hairline Borders    │
│  [ Micro-Interact]──> Dynamic Radial Spotlight Tracking (--mouse-x, --mouse-y)│
│  [ Canvas Layer ] ──> Calibrated 60 FPS Synaptic Particle Physics Engine    │
│  [ Typography ]   ──> Inter (Headings/Body) + JetBrains Mono (Metrics/Code) │
│  [ Security ]     ──> Client-Side Web Crypto SHA-256 Telemetry Verification │
│  [ Defense ]      ──> Strict CSP, Frame Ancestors DENY, nosniff Headers     │
└─────────────────────────────────────────────────────────────────────────────┘
```

* **Executive Slide Cadence**: High-contrast, spacious slide-like sections (`clamp(80px, 8.5vw, 120px) 0`) optimized for hiring managers and technical leadership to digest complex engineering achievements without cognitive overload.
* **Interactive Radial Spotlight Hover**: Custom mouse tracking dynamically illuminates card borders and surfaces with an Electric Indigo/Cyan glow as the user hovers, mirroring developer-centric platforms like Linear, Vercel, and Raycast.
* **Ambient Quantitative Grid**: Ultra-fine hairline background grid (`52px 52px`) layered under a soft radial mask (`mask-image: radial-gradient(...)`) delivering depth without visual distraction.
* **Calibrated Synaptic Canvas Engine**: A high-efficiency HTML5 canvas simulation running at 60 FPS with subtle particle velocity and restrained cyan/indigo color tokens (`js/neural-canvas.js`).
* **Strict Monospace Data Pairing**: Monospace font (`JetBrains Mono` with `font-variant-numeric: tabular-nums`) strictly applied to all metrics, score rows, status badges, tech pills, and parameter values.
* **Zero-Dependency Vanilla Performance**: Built on clean modular vanilla ES6+ JavaScript, achieving sub-second First Contentful Paint (FCP) and zero bundle overhead.

---

## 🔬 Featured Engineering Case Studies

### 1. Enterprise Credit Risk Scoring & Explainable AI (XAI)
* **Domain**: Quantitative Credit Risk, Basel II/III Compliance, Consumer Lending Intelligence.
* **Problem**: Standard deep learning and complex ensemble models operate as black boxes, exposing financial institutions to severe legal penalties under ECOA / SR 11-7 model risk governance.
* **Architecture**:
  * Continuous feature discretization using **Monotonic Weight of Evidence (WoE)** and **Information Value (IV)** filtering.
  * Dual-scorecard engine combining calibrated **Logistic Regression** baseline with tuned **LightGBM**.
  * Exact instance-level Shapley value decomposition ($f(x) = \mathbb{E}[f(x)] + \sum_{j=1}^M \phi_j$) via **TreeSHAP** to generate automated, legally defensible Adverse Action notices.
* **Key Metrics**:
  * **0.894 ROC-AUC** on 5-Fold Stratified Cross-Validation.
  * **42.6% KS Separation Statistic** demonstrating high discriminatory power between good and bad loan applicants.
  * **PSI < 0.08** indicating robust temporal population stability.
  * **< 30ms** FastAPI inference latency delivering real-time underwriting decisions.

---

### 2. Long Overdue Debtor (LOD) Prediction System
* **Domain**: Non-Performing Loan (NPL) Prevention, Asymmetric Loss Optimization.
* **Context**: **Aihack Thailand 2025 National Finalist** (Organized by AIRA & AIFUL, Chulalongkorn Business School, and ProbSpace).
* **Problem**: Default classification on ~40,000 real-world consumer loans under extreme 1:12 default imbalance and blind private leaderboard evaluation.
* **Architecture**:
  * Formulated temporal delinquency velocity ratios, credit exhaustion slopes, and payment behavior vectors.
  * Handled severe target imbalance using **SMOTE-Tomek** resampling on training folds.
  * Asymmetric cost-matrix optimization: mathematically balancing the catastrophic cost of False Negatives (unrecovered principal default) against False Positives (lost customer margin).
  * Interactive client-side ROC curve & Decision Matrix threshold simulator.
* **Key Metrics**:
  * **0.894 ROC-AUC** across out-of-time test partitions.
  * **14.2% Estimated P&L Cost Reduction** compared to conventional 0.50 cutoff thresholds.

---

### 3. Industrial IoT & OEE Manufacturing Data Platform
* **Domain**: Hybrid Lambda Data Engineering, Industrial Telemetry & Predictive Quality.
* **Problem**: Factory automation requires simultaneous sub-second edge anomaly detection and compute-intensive hourly batch aggregations for Overall Equipment Effectiveness (OEE) tracking.
* **Architecture**:
  * **Hybrid / Lambda Pipeline**: Decoupled sub-second edge event streaming from idempotent batch Data Mart processing.
  * **Physical Data Quality Gate**: Multi-machine PLC simulator (automotive manufacturing baseline) streaming cycle times, vibration RMS/Kurtosis harmonics, temperatures, and press loads; automatically filters non-positive ($t \le 0$) cycle times.
  * **Idempotent Batch OEE Data Mart**: PostgreSQL 15 dimensional store computing $OEE = \text{Availability} \times \text{Performance} \times \text{Quality}$ with `ON CONFLICT DO UPDATE` deterministic upserts and structured audit trails.
  * **Dual ML & TreeSHAP XAI**: Unsupervised Isolation Forest (0–100% continuous health scores) paired with cost-sensitive LightGBM Virtual Metrology predicting defect escape risk; TreeSHAP decomposes machine sensor anomalies into actionable root causes for line operators.
  * **Observability & Serving**: High-concurrency FastAPI service with asynchronous WebSockets (`/api/ws/telemetry`) and responsive live dashboard.
* **Key Metrics**:
  * **< 1.0s** WebSocket push latency from edge PLC event to live UI.
  * **100%** Idempotent upsert execution guarantee across hourly aggregation windows.
  * **0.35** Tuned decision cutoff maximizing defect recall in Virtual Metrology.

---

### 4. GuardianAI – Clinical Frailty & Fall Risk Intervention
* **Domain**: Healthcare AI, Preventive Geriatric Analytics.
* **Context**: **True Innovation Launchpad 2026** (AI & Data Science Lead &bull; Team Nakphatthana Tuapralat).
* **Problem**: Early identification of elderly frailty and acute fall risk before irreversible physical decline occurs.
* **Architecture**:
  * Calibrated **XGBoost** risk engine trained on multi-biometric physical markers, gait parameters, and health records.
  * Integrated localized **SHAP** attribution to explain individual patient risk drivers directly to clinical practitioners.
  * Asynchronous containerized **FastAPI** medical scoring endpoint with sub-30ms response times.
* **Key Metrics**:
  * **< 30ms** API latency for real-time clinical assessment.
  * **High-confidence calibrated probabilities** providing interpretable risk stratifications (Low / Moderate / Severe).

---

## 🏆 Competitions & Industry Challenges

| Competition / Hackathon | Organization / Hosts | Role & Focus | Timeline |
| :--- | :--- | :--- | :--- |
| **CDG Hackathon 2026** | CDG Group | Operational AI & System Reliability (Team GrandGuardianAI) | Jul 2026 |
| **Geospatial Intelligence for Resilience Hackathon 2026** | GISTDA &bull; KMITL &bull; KMUTT | Spatial Lead &bull; 30m Grid Flash Flood Mapping via Sentinel-1 SAR & Copernicus DEM | Jan 2026 |
| **True Innovation Launchpad 2026** | True Corporation | AI & Data Science Lead &bull; Preventive Healthcare & Clinical Frailty Scoring (GuardianAI) | Jan 2026 |
| **Aihack Thailand 2025** | AIRA & AIFUL &bull; Chulalongkorn Business School &bull; ProbSpace | **National Finalist** &bull; Long Overdue Debtor (LOD) Prediction (~40,000 credit records, 0.894 ROC-AUC) | Dec 2025 |
| **LINE MAN Campus VIP Growth Campaign** | LINE MAN Wongnai | Unit Economics Lead &bull; 8.87 THB CAC, 462 student conversions within 8,000 THB budget | Nov 2024 |

---

## 📜 Verified Industry Credentials & Assessments

### SKILLKAMP by KBTG Industry Benchmarks
Certified by **Kasikorn Business-Technology Group (KBTG)** across standardized quantitative technical assessments:

| Assessment Track | Score | Benchmark | Status |
| :--- | :---: | :---: | :---: |
| **Data Analyst (STAMP)** | **97 / 150** | 90.0 | Verified Intermediate (Above Benchmark) |
| **Digital & Performance Marketer** | **98 / 150** | 94.0 | Verified Intermediate (Top Tier Analytics) |

#### 5-Domain Competency Breakdown (Data Analyst Track):
```
1. Data Cleaning & Preprocessing      [████████████████░░░░]  23 / 30  (76.7%)
2. EDA & Visualization                [██████████████░░░░░░]  20 / 30  (66.7%)
3. Foundations of Data Analysis       [██████████████░░░░░░]  20 / 30  (66.7%)
4. Machine Learning for Analysts      [█████████████░░░░░░░]  18 / 30  (60.0%)
5. SQL & Quantitative Querying        [████████████░░░░░░░░]  17 / 30  (56.7%)
─────────────────────────────────────────────────────────────────────────────
TOTAL VERIFIED SCORE:                                         97 / 150
```

### Standardized International Assessments
* **Oxford Placement Test (AUA / Oxford University Press)**:
  * **CEFR Level: B1+** (Working Professional English Proficiency)
  * **Total Score: 51 / 120** (Grammar & Use of English: 54 / B1, Listening: 48 / B1)

### Academic Degree
* **B.Eng. in Computer Engineering** &bull; Srinakharinwirot University (SWU, Bangkok, Thailand)
* **Expected Graduation**: Class of 2026
* **Curriculum Focus**: Statistical Machine Learning, Advanced Database Systems (RDBMS & Distributed Data), Operating Systems, Probability & Mathematical Statistics, Data Structures & Algorithms, Distributed Systems.

---

## 🛠 Technical Arsenal

```
┌──────────────────┬───────────────────────────────────────────────────────────┐
│ CATEGORY         │ TECHNOLOGIES & TOOLS                                      │
├──────────────────┼───────────────────────────────────────────────────────────┤
│ Tabular ML / DS  │ Python, LightGBM, XGBoost, CatBoost, Scikit-Learn, Pandas │
│ Risk & XAI       │ OptBinning (WoE/IV), TreeSHAP, Statsmodels, SciPy         │
│ Data Eng & DB    │ PostgreSQL 15, MySQL, SQLite, Apache Spark, Polars        │
│ Backend & API    │ FastAPI, WebSockets, Flask, Docker, RESTful Microservices │
│ Frontend & UI    │ Vanilla JS (ES6+), Modern CSS3 Glassmorphism, Tailwind CSS│
│ Tooling & DevOps │ Docker Compose, Git, GitHub Actions, Vercel, Linux / Bash │
└──────────────────┴───────────────────────────────────────────────────────────┘
```

---

## 🛡 Production Security Hardening & AppSec Controls

* **Web Crypto Administrative Authentication**: Interactive telemetry and administrative drawers are authenticated via client-side SHA-256 hash digests (`window.crypto.subtle.digest`). Plaintext credentials are never committed or exposed in client bundles.
* **Transient URL Sanitization**: Query parameter authentication tokens (`?auth=...`) are scrubbed from browser history in-memory using `window.history.replaceState` immediately upon verification.
* **HTTP Defense-in-Depth (`vercel.json`)**:
  * `Content-Security-Policy`: Strictly restricts script execution and style origins to authorized domains and CDNs.
  * `X-Frame-Options: DENY`: Full protection against clickjacking and UI redressing attacks.
  * `X-Content-Type-Options: nosniff`: Enforces strict MIME-type sniffing defense.
  * `Referrer-Policy: strict-origin-when-cross-origin`.
  * `Permissions-Policy`: Restricts browser hardware access (camera, microphone, geolocation).

---

## 💻 Local Development & Deployment

### Quickstart

```bash
# 1. Clone repository
git clone https://github.com/svkhun/sivakorn-portfolio.git

# 2. Change directory
cd sivakorn-portfolio

# 3. Launch local static server
python -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080` (or `http://localhost:3000`) in any modern web browser.

### Production Deployment

The project is configured for automated, zero-config continuous deployment on **Vercel**:

```bash
# Deploy to production
vercel --prod
```

---

## 📂 Repository Structure

```
sivakorn-portfolio/
├── index.html                  # Executive Keynote slide layout & semantic sections
├── vercel.json                 # HTTP security headers (CSP, HSTS, XFO, nosniff)
├── .gitignore                  # Git ignore rules for ML/DS artifacts and temporary files
├── README.md                   # Comprehensive technical documentation & portfolio overview
├── css/
│   └── styles.css              # Dark Slate tokens, glassmorphic styling, spotlight hover
├── js/
│   ├── main.js                 # App controller, spotlight cursor tracking, drawer mgmt
│   ├── neural-canvas.js        # Calibrated 60 FPS synaptic particle physics simulation
│   ├── focal-deck.js           # Interactive showcase card interactions & deck transitions
│   ├── tech-marquee.js         # Infinite continuous technical arsenal ticker
│   ├── shap-simulator.js       # Real-time SHAP waterfall contribution simulator
│   └── roc-simulator.js        # Dynamic ROC curve & decision threshold simulator
└── assets/                     # Resume, CV, certified transcripts & optimized media
```

---

## 📬 Contact & Connectivity

I am actively seeking **full-time Data Scientist, Machine Learning Engineer, and Quantitative Risk Analyst** opportunities.

* **Portfolio Website**: [svkhun.vercel.app](https://svkhun.vercel.app)
* **Direct Email**: [sivakorn.khun@gmail.com](mailto:sivakorn.khun@gmail.com)
* **LinkedIn**: [linkedin.com/in/sivakorn-khundilokrattaya-5870b8429](https://www.linkedin.com/in/sivakorn-khundilokrattaya-5870b8429/)
* **GitHub**: [github.com/svkhun](https://github.com/svkhun)
* **Location**: Bangkok, Thailand (Available for On-site, Hybrid & Remote roles)

---

<div align="center">
  <sub>Designed &amp; Engineered with precision by <strong>Sivakorn Khundilokrattaya</strong> &bull; &copy; 2026 All Rights Reserved.</sub>
</div>

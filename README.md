<div align="center">

# Sivakorn Khundilokrattaya
### Data Scientist & Machine Learning Engineer &bull; FinTech & Quantitative Risk

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-svkhun.vercel.app-0284C7?style=for-the-badge&logo=vercel&logoColor=white)](https://svkhun.vercel.app)
[![K-Sentinel & WealthPilot](https://img.shields.io/badge/Flagship-K--Sentinel_%26_WealthPilot-00A950?style=for-the-badge&logo=fastapi&logoColor=white)](https://k-sentinel-wealthpilot.onrender.com/)
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

I am a **Computer Engineering student at Srinakharinwirot University (SWU, Class of 2026)** specializing in **statistical tabular machine learning, Heterogeneous Graph Neural Networks (GNNs), Basel II/III credit risk modeling, regulatory-compliant Explainable AI (XAI), and high-throughput production data pipelines**.

In institutional finance and quantitative underwriting, black-box machine learning models introduce unacceptable regulatory and solvency liabilities. My engineering discipline unites rigorous statistical risk modeling with modern software reliability:
* **Real-Time Graph Intelligence & Anti-Scam Shields**: Engineering Two-Tier inference pipelines using **PyTorch Geometric (PyG) Relational GCNs** for continuous node embeddings and **ONNX Runtime v1.30** for sub-12ms P99 pre-transaction fraud scoring (beating &lt; 80ms bank SLAs).
* **Calibrated Default Prediction**: Estimating Probability of Default (PD) via monotonic Weight of Evidence (WoE) binning, Information Value (IV) screening, and asymmetric cost matrix threshold optimization.
* **Regulatory Compliance & Explainability**: Decomposing complex non-linear models with **TreeSHAP** and **Counterfactual What-If Recourse** to deliver auditable, legally defensible Adverse Action notices under **ECOA (12 C.F.R. § 1002.9) / FCRA**.
* **Risk Governance & Stability**: Monitoring continuous model drift, Population Stability Index (PSI < 0.10), and Kolmogorov-Smirnov separation (KS > 40%) across temporal cohorts.
* **Production Data Engineering**: Implementing Hybrid Lambda data platforms, sub-second PLC telemetry streaming via WebSockets, idempotent hourly OEE Data Marts in PostgreSQL 15, and low-latency FastAPI inference microservices (< 30ms).

---

## 🎨 Architectural Highlights & masterPortfolio Design System

The portfolio is architected following the clean, structured, and developer-focused **masterPortfolio aesthetic** (inspired by Ashutosh Hathidara):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SIVAKORN PORTFOLIO PLATFORM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Visual Theme ] ──> Neutral Light Mode (#FFFFFF) / Slate Dark (#171C28)   │
│  [ Brand Accent ] ──> Solid Professional Deep Blue (#0056B3)                │
│  [ Architecture ] ──> Modular Multi-Page Structure (Home, Edu, Exp, Proj)  │
│  [ Data Store   ] ──> Centralized Data Dictionary (js/portfolio-data.js)    │
│  [ Typography   ] ──> Inter (Headings/Body) + JetBrains Mono (Metrics/Code) │
│  [ Performance  ] ──> Lightweight Zero-Dependency Vanilla ES6+ (< 25KB CSS) │
│  [ Graphics     ] ──> 100% Vector Flat SVG Tech & Developer Illustrations   │
└─────────────────────────────────────────────────────────────────────────────┘
```

* **Content-Driven Layout**: Generous whitespace (`clamp(60px, 7vw, 90px) 0`), clear typography hierarchy, and structured cards optimized for hiring managers and technical leadership to digest complex engineering achievements without cognitive overload.
* **Dual Theme Engine**: Seamless toggle between crisp, clean light mode and dark slate theme with persistent preference storage in `localStorage`.
* **Zero Anti-Patterns**: Free of purple-to-blue neon gradients, heavy drop-shadows, glassmorphism blur, and distracting particle physics animations.
* **Separation of Data & Layout**: All portfolio items, credentials, metrics, and case studies are managed within `js/portfolio-data.js`.
* **Crisp Vector Illustrations**: Custom SVG illustrations for Hero, What I Do categories, Education, Experience, Projects, and Contact sections.

---

## 🔬 Featured Engineering Case Studies

### 1. K-Sentinel & WealthPilot (K PLUS for First Jobbers)
* **Domain**: Real-Time Relational Graph Fraud Defense, Autonomous Cashflow Engineering, Mobile Banking Intelligence.
* **Context**: **KBTG Kampus Hackathon 2026 — Track 2: Data Science & Intelligence**.
* **Live Demo**: [https://k-sentinel-wealthpilot.onrender.com/](https://k-sentinel-wealthpilot.onrender.com/) &bull; **Repository**: [https://github.com/svkhun/k-sentinel-wealthpilot](https://github.com/svkhun/k-sentinel-wealthpilot)
* **Problem**: 3.2M First Jobbers on K PLUS suffer from discretionary cashflow volatility (60–68% lack 3-month emergency buffers) and are prime targets for cyber scams (>45% victims aged 20–30, >2.0B THB annual losses).
* **Architecture**:
  * **Two-Tier Graph Inference**: Offline/Nearline **PyTorch Geometric (PyG) Relational GCN** extracting 16D continuous node embeddings over mule account transaction topologies, cached in an in-memory O(1) Redis feature store.
  * **Ultra-Low Latency ONNX Serving**: High-concurrency **FastAPI** gateway evaluating fraud risk via **ONNX Runtime v1.30** combining graph embeddings with real-time transaction telemetry.
  * **Counterfactual Explainable AI (XAI)**: Generates minimal-distance what-if recourse advice (WebRTC Face Liveness validation or micro-transfer limit &le; 500 THB) paired with a 15-minute dynamic cool-off window.
  * **WealthPilot Autonomous Cashflow**: Automated payroll detection, daily Safe-to-Spend allocation, 6% dynamic micro-sweeping into K-eSavings (1.50% APY) Protected Vault, and 30-day ONNX liquidity forecasting.
* **Key Metrics**:
  * **11.62 ms P99 Latency SLA** (P50 = 3.85 ms, P95 = 5.11 ms, beating the &lt; 80.0 ms bank SLA by 7x–20x; core ONNX model eval = 0.27 ms).
  * **16D Graph Embeddings** capturing complex multi-hop mule rings.
  * **1.2 – 2.0 Billion THB** projected low-cost CASA retail deposit mobilization across 3.2M young workers.

---

### 2. Enterprise Credit Risk Scoring & Explainable AI (XAI)
* **Domain**: Quantitative Credit Risk, Basel II/III Compliance, Consumer Lending Intelligence.
* **Repository**: [https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI](https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI)
* **Problem**: Standard deep learning and complex ensemble models operate as black boxes, exposing financial institutions to severe legal penalties under ECOA / SR 11-7 model risk governance.
* **Architecture**:
  * Continuous feature discretization using **Monotonic Weight of Evidence (WoE)** and **Information Value (IV)** filtering.
  * Dual-scorecard engine combining calibrated **Logistic Regression** baseline with tuned **LightGBM**.
  * Exact instance-level Shapley value decomposition ($f(x) = \mathbb{E}[f(x)] + \sum_{j=1}^M \phi_j$) via **TreeSHAP** to generate automated, legally defensible Adverse Action notices.
  * Prescriptive **Counterfactual Recourse (DiCE)** generating actionable loan adjustments to flip rejections into approvals.
* **Key Metrics**:
  * **0.892 ROC-AUC** (0.784 Gini) on 5-Fold Stratified Cross-Validation.
  * **42.6% KS Separation Statistic** demonstrating high discriminatory power between good and bad loan applicants.
  * **PSI < 0.10** indicating robust temporal population stability.
  * **< 50ms** FastAPI inference latency delivering real-time underwriting decisions.

---

### 3. Long Overdue Debtor (LOD) Prediction System
* **Domain**: Non-Performing Loan (NPL) Prevention, Asymmetric Loss Optimization.
* **Context**: **Aihack Thailand 2025 National Finalist** (Organized by AIRA & AIFUL, Chulalongkorn Business School, and ProbSpace).
* **Repository**: [https://github.com/svkhun/aiful-credit-risk-modeling](https://github.com/svkhun/aiful-credit-risk-modeling)
* **Problem**: Default classification on ~40,000 real-world consumer loans under extreme 1:12 default imbalance and blind private leaderboard evaluation.
* **Architecture**:
  * Formulated temporal delinquency velocity ratios, credit exhaustion slopes, and payment behavior vectors.
  * 5-Fold Stratified Cross-Validation tuning LightGBM and XGBoost via Bayesian Optuna search.
  * Out-of-fold rank and probability blending combining CatBoost symmetric trees with LightGBM leaf-wise GBDT.
  * Asymmetric cost-matrix optimization: mathematically balancing the catastrophic cost of False Negatives (unrecovered principal default) against False Positives (lost customer margin).
  * Interactive client-side ROC curve & Decision Matrix threshold simulator.
* **Key Metrics**:
  * **0.894 ROC-AUC** across out-of-time blind test partitions.
  * **~40,000** Real consumer loan records evaluated.
  * **PSI < 0.10** Scorecard stability index.
  * **National Finalist** tier in Aihack Thailand 2025.

---

### 4. Industrial IoT & OEE Manufacturing Data Platform
* **Domain**: Hybrid Lambda Data Engineering, Industrial Telemetry & Predictive Quality.
* **Repository**: [https://github.com/svkhun/mfg-data-pipeline](https://github.com/svkhun/mfg-data-pipeline)
* **Problem**: Factory automation requires simultaneous sub-second edge anomaly detection and compute-intensive hourly batch aggregations for Overall Equipment Effectiveness (OEE) tracking.
* **Architecture**:
  * **Hybrid / Lambda Pipeline**: Decoupled sub-second edge event streaming from idempotent batch Data Mart processing.
  * **Physical Data Quality Gate**: Multi-machine PLC simulator (automotive manufacturing baseline) streaming cycle times, vibration RMS/Kurtosis harmonics, temperatures, and press loads; automatically filters non-positive ($t \le 0$) cycle times.
  * **Idempotent Batch OEE Data Mart**: PostgreSQL 15 dimensional store computing $OEE = \text{Availability} \times \text{Performance} \times \text{Quality}$ with `ON CONFLICT DO UPDATE` deterministic upserts and structured audit trails.
  * **Dual ML & TreeSHAP XAI**: Unsupervised Isolation Forest (0–100% continuous health scores) paired with cost-sensitive LightGBM Virtual Metrology predicting defect escape risk; TreeSHAP decomposes machine sensor anomalies into actionable root causes for line operators.
  * **Observability & Serving**: High-concurrency FastAPI service with asynchronous WebSockets (`/api/ws/telemetry`) and responsive live React 18 + Tailwind CSS shopfloor dashboard.
* **Key Metrics**:
  * **< 1.0s** WebSocket push latency from edge PLC event to live UI.
  * **100%** Idempotent upsert execution guarantee across hourly aggregation windows.
  * **OEE = A × P × Q** Automated hourly data mart calculations.
  * **TreeSHAP** Real-time localized root cause explainability.

---

### 5. GuardianAI – Clinical Frailty & Fall Risk Intervention
* **Domain**: Healthcare AI, Preventive Geriatric Analytics.
* **Context**: **True Innovation Launchpad 2026** (AI & Data Science Lead &bull; Team Nakphatthana Tuapralat).
* **Repository**: [https://github.com/svkhun/guardianai-clinical-ops-dashboard](https://github.com/svkhun/guardianai-clinical-ops-dashboard)
* **Problem**: Early identification of elderly frailty and acute fall risk before irreversible physical decline occurs.
* **Architecture**:
  * Calibrated **XGBoost** risk engine trained on multi-biometric physical markers, gait parameters, and health records.
  * Integrated localized **SHAP** attribution to explain individual patient risk drivers directly to clinical practitioners.
  * Asynchronous containerized **FastAPI** medical scoring endpoint with sub-30ms response times.
  * Proactive clinical workflow dashboard built with **React** and **Tailwind CSS** for physician-facing triage queues.
* **Key Metrics**:
  * **< 30ms** FastAPI inference latency for real-time clinical assessment.
  * **Platt-Calibrated XGBoost** probabilities providing interpretable risk stratifications.
  * **Local SHAP** Clinical attributions for medical decision support.
  * **Docker** Isolated microservice deployment.

---

## 🏆 Competitions & Industry Challenges

| Competition / Hackathon | Organization / Hosts | Role & Focus | Timeline |
| :--- | :--- | :--- | :--- |
| **KBTG Kampus Hackathon 2026** | Kasikorn Business-Technology Group (KBTG) | **Track 2: Data Science & Intelligence Lead** &bull; K-Sentinel & WealthPilot (11.62ms P99 SLA, 1.2–2.0B THB CASA) | 2026 |
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
│ Graph ML & GNN   │ PyTorch Geometric (PyG), Relational GCN (RGCN), GNNs      │
│ High-Perf Engine │ ONNX Runtime v1.30 (Sub-millisecond Model Execution)     │
│ Risk & XAI       │ OptBinning (WoE/IV), TreeSHAP, Counterfactual XAI, SciPy  │
│ Data Eng & DB    │ Redis Feature Store, PostgreSQL 15, Apache Spark, Polars  │
│ Backend & API    │ FastAPI (Asynchronous), WebSockets, Docker Microservices  │
│ Frontend & UI    │ React 18, React Router 6, Vite, Tailwind CSS, Vanilla JS  │
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
├── index.html                  # Home page (Hero + Categorized What I Do tech stacks)
├── education.html              # Education page (Degrees, KBTG Certifications, Badges)
├── experience.html             # Experience page (Hackathons & Leadership timeline)
├── projects.html               # Projects page (Featured Case Studies & Key Metrics)
├── contact.html                # Contact page (Direct reach, Location, Resume downloads)
├── vercel.json                 # Clean URL routing (/education, /projects) & security headers
├── .gitignore                  # Git ignore rules for ML/DS artifacts and temporary files
├── README.md                   # Comprehensive technical documentation & portfolio overview
├── css/
│   └── styles.css              # MasterPortfolio design tokens, Light/Dark themes, responsive grids
├── js/
│   ├── main.js                 # App controller, Theme switcher, Modal previews, Toast feedback
│   └── portfolio-data.js       # Centralized structured data dictionary (masterPortfolio data store)
└── assets/
    ├── svg/                    # Custom flat SVG developer and section illustrations
    └── ...                     # Resumes, CVs, certified scorecards & media
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

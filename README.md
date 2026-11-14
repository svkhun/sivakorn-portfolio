<div align="center">

# Sivakorn Khundilokrattaya
### Computer Engineering Student · Data Science & Machine Learning

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-svkhun.vercel.app-0284C7?style=for-the-badge&logo=vercel&logoColor=white)](https://svkhun.vercel.app)
[![FlowSense & TrustGraph](https://img.shields.io/badge/Flagship-FlowSense_%26_TrustGraph-00A950?style=for-the-badge&logo=fastapi&logoColor=white)](https://k-nexus-showcase.onrender.com/)
[![Education](https://img.shields.io/badge/Education-B.Eng._Computer_Engineering_@_SWU-38BDF8?style=for-the-badge&logo=google-scholar&logoColor=white)](https://swu.ac.th)
[![Design System](https://img.shields.io/badge/Design-Keynote_Slide_Deck_%7C_Dark_Slate-6366F1?style=for-the-badge)](https://svkhun.vercel.app)

<p align="center">
  <strong>Building explainable decision-support prototypes in credit risk, fraud review, and e-commerce.</strong>
</p>

[Explore Projects](#-featured-engineering-case-studies) &bull; [Competitions & Hackathons](#-competitions--industry-challenges) &bull; [KBTG Certifications](#-verified-industry-credentials--assessments) &bull; [Architecture & Design](#-architectural-highlights--keynote-presentation) &bull; [GitHub](https://github.com/svkhun) &bull; [LinkedIn](https://www.linkedin.com/in/sivakorn-khundilokrattaya-5870b8429/)

---

</div>

## 📌 Executive Summary

I am a **Computer Engineering student at Srinakharinwirot University, expected graduation 2028**, seeking an internship. Dates and working arrangements remain to be discussed around the planned two-month NHK Spring summer internship.

Building explainable decision-support prototypes in credit risk, fraud review, and e-commerce.

Model-development scores, synthetic evaluations and modeled savings are labeled separately. They do not establish lending approval, clinical efficacy, factory outcomes or realized savings.

Current content-review documents: [Resume (1 page)](assets/Sivakorn_Khundilokrattaya_Resume_20261114_content_v2.pdf) · [CV (2 pages)](assets/Sivakorn_Khundilokrattaya_CV_20261114_content_v2.pdf). Both retain the last-pushed print design. The original PDFs are preserved; Cover Letter work is deferred. See [document build instructions](build_resume/README.md).

---

## 🎨 Architectural Highlights & masterPortfolio Design System

The portfolio follows the clean, structured, and developer-focused **masterPortfolio aesthetic** (inspired by Ashutosh Hathidara):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SIVAKORN PORTFOLIO PLATFORM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Visual Theme ] ──> Neutral Light Mode (#FFFFFF) / Slate Dark (#171C28)   │
│  [ Brand Accent ] ──> Solid Professional Deep Blue (#0056B3)                │
│  [ Architecture ] ──> Modular Multi-Page Structure (Home, Edu, Exp, Proj)  │
│  [ Data Store   ] ──> Centralized Data Dictionary (js/portfolio-data.js)    │
│  [ Typography   ] ──> Geist (Headings/Body) + Geist Mono (Metrics/Code) │
│  [ Performance  ] ──> Vanilla ES6+ with bundled animation libraries (shared CSS) │
│  [ Graphics     ] ──> SVG illustrations and project/event images   │
└─────────────────────────────────────────────────────────────────────────────┘
```

* **Content-Driven Layout**: Generous whitespace (`clamp(60px, 7vw, 90px) 0`), clear typography hierarchy, and structured cards optimized for hiring managers and technical leadership to digest complex engineering achievements without cognitive overload.
* **Dedicated Deep-Dive Case Study Pages**: 7 standalone editorial case studies (`project-*.html`) covering graph screening, COD reliability, credit risk, debt recovery, industrial telemetry, and clinical operations.
* **Bespoke Apple/Linear Fluid Animation Suite**: Custom physics-based cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`), staggered scroll cascades, real-time SVG packet flows, and `prefers-reduced-motion` styles.
* **Dual Theme Engine**: Seamless toggle between crisp, clean light mode and dark slate theme with persistent preference storage in `localStorage`.
* **Zero Anti-Patterns**: Free of purple-to-blue neon gradients, heavy drop-shadows, glassmorphism blur, and distracting particle physics animations.
* **Separation of Data & Layout**: Pages contain independent static HTML. `js/portfolio-data.js` is a supporting content record; both must be updated together.
* **Crisp Vector Illustrations**: Custom SVG illustrations for Hero, What I Do categories, Education, Experience, Projects, and Contact sections.

---

## 🔬 Featured Engineering Case Studies

### 1. K-NEXUS — FlowSense & TrustGraph
* **Context:** Synthetic-data prototype in KBTG Kampus Hackathon 2026, Track 2 (Data Science & Intelligence). Placed in the **Top 30 Teams overall** and **Top 10 in Track 2 (Data Science)**; no KBank/KBTG ownership or endorsement is implied.
* **My role:** Pitcher, Developer & Concept Lead. Conceived the team's core concept, developed the K-NEXUS prototype, and delivered its pitch at KBTG KAMPUS Hackathon – Intern Edition on 7 November 2026, as confirmed by the portfolio owner. [Pitching experience](experience.html#pitching) includes the participation certificate and official event photos.
* **Application:** [Demo](https://k-nexus-app.onrender.com/) · [Source](https://github.com/svkhun/K-NEXUS-Application). Spending plans, reserves, simulated savings and recipient-risk review. FlowSense uses HISTORY_MEAN → SCENARIO → ABSTAIN with ML disabled.
* **Showcase:** [Portal](https://k-nexus-showcase.onrender.com/) · [Source](https://github.com/svkhun/K-NEXUS-Showcase). Separate presentation, training and evaluation evidence.
* **TrustGraph:** Saved synthetic test AP 0.99640 (no-GNN) versus 0.99373 (R-GCN + LightGBM), 1,354 transactions / 67 positives. No GNN advantage or real-world fraud prevention is established.
* **FlowSense:** No tested forecast horizon met the acceptance criteria. The 30-day ML forecast did not beat the account-mean baseline: candidate model MAE 2,701.6 versus baseline MAE 313.3 THB/account-origin. FlowSense ML remains disabled; no qualifying export followed.
* **Status:** The historical 30 October audit concluded READY_FOR_DEMO_WITH_LIMITATIONS. Live uptime was not reverified in this content update. Older latency/CASA headlines are not current runtime or realized business outcomes.
* [Case study](project-flowsense-trustgraph.html) · [Sources and claim record](docs/k-nexus-content-update-20261106.md)

---

### 2. Credit Risk Scoring & Explainable AI
* **Scope:** Research decision-support prototype with scoring, explanations and hypothetical scenarios; not a regulator-approved lending system.
* **Repository-reported experiment:** 5-fold cross-validation ROC-AUC 0.7420 (WoE logistic baseline) and 0.7854 (tuned LightGBM); tuned-model Gini 0.5708 and KS 43.17%. These are model-development results.
* **Evidence:** [Project README](https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI/blob/main/README.md) · [Case study](project-credit-risk.html).

---

### 3. Long Overdue Debtor (LOD) Prediction
* **Result:** AiHack Thailand 2025 national finalist (team entry); participation certificate records attendance at the final round.
* **Experiment:** V13 CatBoost/LightGBM blend — **0.65333 out-of-fold ROC-AUC**, as attributed to the public repository. Confidential competition records are not published; the dataset is described qualitatively as imbalanced.
* **Limits:** The experiment does not establish actual debt recovery or a deployed lending outcome.
* **Evidence:** [Project README](https://github.com/svkhun/aiful-credit-risk-modeling/blob/main/README.md) · [Case study](project-lod-engine.html).

---

### 4. Industrial IoT & OEE Data Platform
* **Scope:** Simulated sensor readings flow through FastAPI, PostgreSQL and WebSockets to a React dashboard; batch processing builds hourly OEE summaries.
* **Limits:** The prototype does not establish live factory PLC integration, measured throughput, latency or downtime savings. OEE = availability × performance × quality is a calculation, not a factory outcome.
* [Repository](https://github.com/svkhun/mfg-data-pipeline) · [Case study](project-industrial-iot.html).

---

### 5. GuardianAI Dashboard Prototype
* **Scope:** React/Vite client, Node.js API, example patient records and Thai/English care-coordination views.
* **Limits:** Not clinically validated. No trained-model evaluation or latency result is established.
* [Repository](https://github.com/svkhun/guardianai-clinical-ops-dashboard) · [Case study](project-guardian-ai.html).

---

### 6. Shopee Smart COD Reliability
* **Context:** Independent case-competition prototype, synthetic data, not affiliated with or endorsed by Shopee.
* **Case Study**: [Deep Dive](https://svkhun.vercel.app/project-shopee-smart-cod) &bull; **Repository**: [Source Code](https://github.com/svkhun/Shopee-Ultimate-Case-Challenge)
* **Implementation**: A calibrated, class-balanced Random Forest with 9 numeric and 2 categorical inputs, FastAPI inference, a vanilla JavaScript smartphone simulator, EDA dashboard, and dataset explorer.
* **Decision Policy**: Four reliability grades with reminders, 20%/30% deposits, prepaid options, delivery-feedback score updates, and rule-based EasySell checks.
* **Recorded Evaluation**: 0.8400 ROC-AUC, 0.3056 average precision, and 0.02112 Brier score on 3,500 synthetic holdout COD orders. The dataset contains 50,000 synthetic orders and 12,000 buyer profiles.
* **Business Scenario**: Approximately 3.58M THB potential monthly savings under the project's volume, return-cost, and 58% failure-reduction assumptions; no realized operational savings are claimed.
* **Source of Truth**: Local SUCC model metrics, scoring implementation, risk policy, and EDA artifacts; these supersede older figures in that repository's README.

---

## 🏆 Competitions & Industry Challenges

| Competition / Hackathon | Organization / Hosts | Role & Focus | Timeline |
| :--- | :--- | :--- | :--- |
| **KBTG Kampus Hackathon 2026** | KBTG | Pitcher, Developer & Concept Lead · Top 30 teams overall / Top 10 Data Science | 7 Nov 2026 |
| **NTT DATA Challenge 2026** | NTT DATA | Top 24 team · WELLYNC; [teammate repository](https://github.com/Panupong-xD/NTT-Data) | 2026 |
| **AiHack Thailand 2025** | AIRA & AIFUL / Chulalongkorn Business School / ProbSpace | National finalist (team entry) | Dec 2025 |

---

## 📜 Verified Industry Credentials & Assessments

### SKILLKAMP by KBTG assessment reports

Both assessments were taken on **21 March 2026**. The comparison is with the average shown on each supplied report.

| Assessment | Score | Report average |
|---|---:|---:|
| Data Analyst | 97 / 150 | 90 / 150 |
| Digital and Performance Marketer | 98 / 150 | 94 / 150 |

Data Analyst subjects: Foundations of Data Analysis 20/30; Data Cleaning and Preprocessing 23/30; Exploratory Data Analysis and Visualization 20/30; Data Analysis Techniques and Statistical Methods 16/30; Machine Learning for Data Analysts 18/30.

Digital and Performance Marketer subjects: Data-Driven Marketing 21/30; Customer Segmentation and Targeting 16/30; Digital Marketing Analytics 26/30; Data-Driven Content Marketing 19/30; Marketing Strategy and Optimization 16/30.

### Oxford Placement Test

Supplied AUA/Oxford report: **21 June 2026**, overall score **51**, **CEFR B1**; Use of English 54/B1 and Listening 48/B1.

### Education and availability

B.Eng. Computer Engineering student at Srinakharinwirot University; **expected graduation 2028**. NHK Spring scholarship **2026–2027** includes a planned two-month Year 3 summer internship. Exact internship dates and availability remain to be agreed.

### SWU Open House interface

The case study illustrates a three-step registration guide, a faculty poster carousel, a countdown and responsive page sections. It does not establish measured traffic/conversion outcomes or an API integration method. [Case study](project-swu-openhouse.html).

## HTTP response headers

`vercel.json` configures `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` and `Referrer-Policy: strict-origin-when-cross-origin`. This describes configuration, not a security certification.

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

### Vercel deployment

The project is configured for automated, zero-config continuous deployment on **Vercel**:

```bash
# Publish a reviewed revision
vercel --prod
```

---

## 📂 Repository Structure

```
sivakorn-portfolio/
├── index.html                  # Home page (Hero + Categorized What I Do tech stacks)
├── education.html              # Education page (Degrees, KBTG Certifications, Badges)
├── experience.html             # Experience page (Hackathons & Leadership timeline)
├── projects.html               # Projects page (Curated Interactive Engineering Timeline)
├── project-shopee-smart-cod.html # Case Study: Calibrated COD risk & adaptive checkout
├── project-flowsense-trustgraph.html     # Case Study: FlowSense cashflow & TrustGraph transfer screening
├── project-credit-risk.html    # Case Study: Credit risk decision-support prototype
├── project-lod-engine.html     # Case Study: Long Overdue Debtor (LOD) & 4-Tier Recovery Waterfall
├── project-industrial-iot.html # Case Study: Industrial IoT Telemetry & OEE Manufacturing Data Mart
├── project-guardian-ai.html    # Case Study: GuardianAI Clinical Horizon & Bedside Triage Engine
├── contact.html                # Contact page (Direct reach, Location, Resume downloads)
├── vercel.json                 # Clean URL routing & HTTP defense-in-depth headers
├── .gitignore                  # Git ignore rules for ML/DS artifacts and temporary files
├── README.md                   # Comprehensive technical documentation & portfolio overview
├── css/
│   └── styles.css              # MasterPortfolio tokens, Light/Dark themes, bespoke animation suite
├── js/
│   ├── main.js                 # App controller, Theme switcher, Bidirectional scroll reveals
│   └── portfolio-data.js       # Centralized structured data dictionary (masterPortfolio data store)
└── assets/
    ├── svg/                    # Custom flat SVG developer and section illustrations
    └── ...                     # Resumes, CVs, certified scorecards & media
```

---

## 📬 Contact & Connectivity

I am seeking a **Data Science / Machine Learning internship**. Please contact me to discuss dates, location and availability around the planned NHK Spring summer placement.

* **Portfolio Website**: [svkhun.vercel.app](https://svkhun.vercel.app)
* **Direct Email**: [sivakorn.khun@gmail.com](mailto:sivakorn.khun@gmail.com)
* **LinkedIn**: [linkedin.com/in/sivakorn-khundilokrattaya-5870b8429](https://www.linkedin.com/in/sivakorn-khundilokrattaya-5870b8429/)
* **GitHub**: [github.com/svkhun](https://github.com/svkhun)
* **Location**: Bangkok, Thailand; internship arrangements to be discussed

---

<div align="center">
  <sub>Designed &amp; Engineered with precision by <strong>Sivakorn Khundilokrattaya</strong> &bull; &copy; 2026 All Rights Reserved.</sub>
</div>

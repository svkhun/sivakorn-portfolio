import os
import shutil
import subprocess
from pypdf import PdfReader

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(BUILD_DIR, "..", "assets"))
CHROME_BIN = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

os.makedirs(BUILD_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

timestamp_str = "November 2026"

# =========================================================================
# 1. GENERATE CV HTML (2 Pages - Balanced, Clean Typography, No Duplication)
# =========================================================================

cv_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sivakorn Khundilokrattaya – Curriculum Vitae</title>
  <style>
    @page {{
      size: A4 portrait;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      width: 210mm;
      background: #ffffff;
      font-family: "Geist Local", "Segoe UI", Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.38;
      color: #172033;
    }}
    .resume-paper, .resume-a4-page {{
      position: relative !important;
      width: 210mm !important;
      height: 297mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;
      max-height: 297mm !important;
      margin: 0 !important;
      padding: 12.5mm 14.5mm 11mm 14.5mm !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      box-shadow: none !important;
      border: none !important;
      border-radius: 0 !important;
      background: #ffffff !important;
      overflow: hidden !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }}
    #resume-page-1 {{
      page-break-after: always !important;
      break-after: page !important;
    }}
    #resume-page-2 {{
      page-break-before: always !important;
      break-before: page !important;
      page-break-after: avoid !important;
      break-after: avoid !important;
    }}
    .resume-content-wrap {{
      width: 100%;
    }}
    .flex {{ display: flex; }}
    .flex-wrap {{ flex-wrap: wrap; }}
    .justify-between {{ justify-content: space-between; }}
    .items-center {{ align-items: center; }}
    .items-baseline {{ align-items: baseline; }}
    .text-right {{ text-align: right; }}
    .whitespace-nowrap {{ white-space: nowrap; }}
    .italic {{ font-style: normal !important; color: #4b5563 !important; }}
    .grid-skill-row {{
      display: flex;
      align-items: baseline;
      margin-bottom: 2.5pt;
      line-height: 1.37;
      font-size: 9.5pt;
    }}
    .grid-skill-row:last-child {{
      margin-bottom: 0;
    }}
    .grid-skill-row strong {{
      min-width: 155px;
      flex-shrink: 0;
    }}
    .compact-line {{
      font-size: 9.5pt;
      line-height: 1.38;
      color: #2d3748;
      margin-top: 1.5pt;
    }}
    .hackathon-line {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8pt;
      font-size: 9.5pt;
      line-height: 1.42;
      margin-bottom: 3.5pt;
      color: #2d3748;
    }}
    .hackathon-line:last-child {{
      margin-bottom: 0;
    }}
    .resume-sheet-footer {{
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-end !important;
      margin-top: 6pt !important;
      padding-top: 4pt !important;
      font-size: 8.5pt !important;
    }}
  </style>
</head>
<body>
  <div id="cv-view">
    <!-- ==================== PAGE 1 ==================== -->
    <div class="resume-paper resume-a4-page" id="resume-page-1">
      <div class="resume-content-wrap">
        <!-- Header Row -->
        <div class="resume-header">
          <h1 class="resume-name">Sivakorn Khundilokrattaya</h1>
          <div class="resume-headline">3rd-Year Computer Engineering Student &bull; Seeking Data Science, ML &amp; Quantitative Fintech Internship</div>
          <div class="resume-contact flex flex-wrap items-center">
            <span>Bangkok, Thailand</span>
            <span class="pipe-sep">|</span>
            <a href="mailto:sivakorn.khun@gmail.com">sivakorn.khun@gmail.com</a>
            <span class="pipe-sep">|</span>
            <a href="https://svkhun.vercel.app" target="_blank" rel="noopener noreferrer">svkhun.vercel.app</a>
            <span class="pipe-sep">|</span>
            <a href="https://github.com/svkhun" target="_blank" rel="noopener noreferrer">github.com/svkhun</a>
            <span class="pipe-sep">|</span>
            <a href="https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span class="pipe-sep">|</span>
            <a href="https://www.kaggle.com/sivakornkhun" target="_blank" rel="noopener noreferrer">Kaggle</a>
          </div>
        </div>

        <!-- Section 1: Education & Scholarship -->
        <div class="resume-section">
          <h2 class="section-title">EDUCATION &amp; SCHOLARSHIP</h2>
          
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Srinakharinwirot University (SWU) &ndash; B.Eng. in Computer Engineering</span>
              <span class="entry-meta text-right whitespace-nowrap">2024 &ndash; Present (Expected 2028)</span>
            </div>
            <ul class="resume-list">
              <li><strong>Focus &amp; Specialization:</strong> Statistical Machine Learning, Quantitative Credit Risk Modeling, Explainable AI (XAI), and Data Engineering.</li>
              <li><strong>Core Coursework:</strong> Machine Learning, Probability &amp; Statistics, Database Systems, Data Structures &amp; Algorithms, Operating Systems, Software Engineering.</li>
            </ul>
          </div>

          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">NHK Spring (Thailand) Undergraduate Scholarship &ndash; Corporate Engineering Scholar</span>
              <span class="entry-meta text-right whitespace-nowrap">2026 &ndash; 2027</span>
            </div>
            <ul class="resume-list">
              <li><strong>Scholarship &amp; Internship:</strong> Awarded an undergraduate engineering scholarship (conferred Sep 2026 under cumulative GPAX &ge; 2.75 and faculty endorsement criteria), including a planned 2-month summer industrial internship at NHK Spring (Thailand) Co., Ltd.</li>
            </ul>
          </div>
        </div>

        <!-- Section 2: Technical Skills -->
        <div class="resume-section">
          <h2 class="section-title">TECHNICAL SKILLS &amp; COMPETENCIES</h2>
          <div class="resume-skills-block">
            <div class="grid-skill-row">
              <strong>ML &amp; Quantitative Risk:</strong>
              <span>LightGBM, CatBoost, XGBoost, Scikit-Learn, PyG (R-GCN), Optuna, OptBinning (WoE/IV)</span>
            </div>
            <div class="grid-skill-row">
              <strong>Explainable AI &amp; Risk:</strong>
              <span>TreeSHAP (Reason Codes), DiCE Counterfactuals, PSI Drift Monitoring, KS &amp; Brier Score</span>
            </div>
            <div class="grid-skill-row">
              <strong>Programming &amp; Data:</strong>
              <span>Python (Pandas, NumPy, SciPy), SQL (PostgreSQL, SQLite), TypeScript, JS, C/C++, Bash</span>
            </div>
            <div class="grid-skill-row">
              <strong>Engineering &amp; Serving:</strong>
              <span>FastAPI, ONNX, Docker, WebSockets, SQLAlchemy, React, Next.js, GeoPandas, Rasterio, Git</span>
            </div>
            <div class="grid-skill-row">
              <strong>Languages:</strong>
              <span>Thai (Native), English (CEFR B1 &ndash; Oxford Placement Test), Japanese (Elementary)</span>
            </div>
          </div>
        </div>

        <!-- Section 3: Featured Data Science & ML Projects (Part 1) -->
        <div class="resume-section">
          <h2 class="section-title">FEATURED DATA SCIENCE &amp; ML PROJECTS</h2>

          <!-- Project 1: K-NEXUS -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">K-NEXUS &ndash; FlowSense &amp; TrustGraph (Synthetic Cashflow &amp; Risk Prototype) &bull; <a class="entry-link" href="https://github.com/svkhun/K-NEXUS-Application" target="_blank">App</a> | <a class="entry-link" href="https://github.com/svkhun/K-NEXUS-Showcase" target="_blank">Showcase</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2026</span>
            </div>
            <div class="italic">PyG (R-GCN), LightGBM, ONNX, FastAPI, React &bull; KBTG Hackathon 2026 &ndash; Top 30 Overall &amp; Top 10 Data Science</div>
            <ul class="resume-list">
              <li><strong>Leakage-Free Graph Ablation (TrustGraph):</strong> Built a chronological past-only transaction graph so 16D R-GCN embeddings could not leak future mule labels. Evaluated on 1,354 synthetic holdout transfers (67 positives), showing that the tabular baseline (0.996 PR-AUC) outperformed R-GCN + LightGBM (0.994 PR-AUC).</li>
              <li><strong>Validation Gating &amp; Model Rejection (FlowSense):</strong> Evaluated 1, 7, 14, and 30-day cashflow candidates via paired cumulative MAE on 32 synthetic accounts (30-day candidate MAE reached 2,701.6 THB vs. 313.3 THB account-mean baseline across 1,121 origins) and kept FlowSense ML disabled after failing Gate 2 criteria.</li>
              <li><strong>Runtime Architecture &amp; Stage Pitch:</strong> Built and pitched the FastAPI + React 18 prototype, serving an explainable history-mean, scenario-fallback, or abstention rule alongside offline ONNX Runtime transfer risk review.</li>
            </ul>
          </div>

          <!-- Project 2: Credit Risk -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Credit Risk Scoring &amp; Explainable AI (XAI) Decision-Support Prototype &bull; <a class="entry-link" href="https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI" target="_blank">GitHub Repo</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2026</span>
            </div>
            <div class="italic">Python, LightGBM, Optuna, OptBinning (WoE/IV), TreeSHAP, DiCE, FastAPI, Next.js &bull; Research Prototype</div>
            <ul class="resume-list">
              <li><strong>Monotonic Feature Screening:</strong> Built a Probability of Default (PD) pipeline on Home Credit and bureau datasets using domain financial ratios, applying monotonic Weight of Evidence (WoE) binning via OptBinning to enforce economic directionality while screening for Information Value (IV &ge; 0.02) and multicollinearity (VIF &lt; 5.0).</li>
              <li><strong>Baseline Benchmarking &amp; Scorecard Calibration:</strong> Tuned a 5-fold stratified LightGBM ensemble with Optuna against an interpretable WoE logistic regression baseline, improving cross-validation ROC-AUC from 0.742 to 0.785 with 43.2% KS separation, and calibrated predictions to a 300&ndash;850 point scorecard (Base 600, PDO 20).</li>
              <li><strong>Explainability &amp; Audit Workflow:</strong> Integrated TreeSHAP adverse-action reason codes, DiCE counterfactual recourse scenarios, simulated Population Stability Index (PSI) drift checks, and SQLite audit logging into a FastAPI + Next.js underwriting dashboard.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Page 1 Sheet Footer -->
      <div class="resume-sheet-footer">
        <span>Sivakorn Khundilokrattaya &ndash; Curriculum Vitae</span>
        <span class="page-number">Page 1 of 2</span>
      </div>
    </div>

    <!-- ==================== PAGE 2 ==================== -->
    <div class="resume-paper resume-a4-page" id="resume-page-2">
      <div class="resume-content-wrap">
        <!-- Section 3 Continued: Featured Data Science & ML Projects -->
        <div class="resume-section">
          <h2 class="section-title">FEATURED DATA SCIENCE &amp; ML PROJECTS (CONTINUED)</h2>

          <!-- Project 3: Shopee Smart COD -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Shopee Smart COD Reliability &amp; Adaptive Checkout Prototype (Synthetic Data) &bull; <a class="entry-link" href="https://github.com/svkhun/Shopee-Ultimate-Case-Challenge" target="_blank">GitHub Repo</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2026</span>
            </div>
            <div class="italic">Python, Scikit-Learn (Random Forest), FastAPI, JS &bull; Shopee Ultimate Case Challenge 2026 &ndash; Operations Strategy</div>
            <ul class="resume-list">
              <li><strong>Statistical Formulation &amp; Calibration:</strong> Evaluated simulated COD vs. prepaid failure disparity via two-proportion Z-test (10.6&times; ratio, z = 24.4, p &lt; 0.001) across 50,000 synthetic orders. Trained a 3-fold sigmoid-calibrated Random Forest achieving 0.840 ROC-AUC, 0.306 PR-AUC, and 0.021 Brier score on 3,500 held-out synthetic orders.</li>
              <li><strong>Adaptive Checkout Policy &amp; Feedback Loop:</strong> Mapped predicted failure probabilities into bounded reliability-score adjustments (+1 / -3 / -6 pts within 5&ndash;99) across a 4-tier checkout policy (Grades A&ndash;D: 1-click COD, reminder, 20% deposit, or 30% deposit/prepaid), paired with delivery-feedback updates (+8/-20 pts) and rule-based seller checks.</li>
              <li><strong>Scenario Modeling &amp; Simulator:</strong> Built a FastAPI scoring service and mobile checkout simulator modeling 3.58M THB/month in simulated return-cost savings (assuming a target 58% RTO failure reduction).</li>
            </ul>
          </div>

          <!-- Project 4: LOD -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Long Overdue Debtor (LOD) Default Prediction Pipeline &bull; <a class="entry-link" href="https://github.com/svkhun/aiful-credit-risk-modeling" target="_blank">GitHub Repo</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2025</span>
            </div>
            <div class="italic">CatBoost, LightGBM, XGBoost, Optuna, Scikit-Learn &bull; Aihack Thailand 2025 &ndash; National Finalist (Team OEIA)</div>
            <ul class="resume-list">
              <li><strong>Imbalanced Financial Feature Engineering:</strong> Engineered leak-free financial ratios (debt-to-income burden, credit utilization, unused credit headroom, tenure stability, and product debt density) and explicit missingness indicators for 12-month default prediction on confidential consumer loan records (~8.3% default rate / 1:12 imbalance).</li>
              <li><strong>Out-of-Fold Validation &amp; Blending:</strong> Implemented cohort-aware 5-fold stratified cross-validation and out-of-fold probability/rank blending across CatBoost and LightGBM, improving OOF ROC-AUC from 0.633 baseline to 0.651 (transforms) and 0.653 (final blend).</li>
              <li><strong>Finalist Pitch &amp; Reproducible Pipeline:</strong> Presented risk-cutoff trade-offs in the National Finalist round and published an NDA-safe synthetic data pipeline so the preprocessing and blending workflow can be inspected without exposing confidential lending records.</li>
            </ul>
          </div>

          <!-- Project 5: Industrial IoT (Condensed to 1-2 lines) -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Industrial IoT Telemetry &amp; OEE Data Platform (Simulated Telemetry) &bull; <a class="entry-link" href="https://github.com/svkhun/mfg-data-pipeline" target="_blank">GitHub Repo</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2026</span>
            </div>
            <div class="compact-line">Simulated sensor-telemetry pipeline (Python, FastAPI, PostgreSQL 15, WebSockets, React 18) computing hourly OEE summaries (Availability &times; Performance &times; Quality) and Isolation Forest / LightGBM / TreeSHAP anomaly views.</div>
          </div>
        </div>

        <!-- Section 4: Hackathons (Only GISTDA & True Innovation, 1 line each) -->
        <div class="resume-section">
          <h2 class="section-title">OTHER HACKATHONS &amp; APPLIED AI CHALLENGES</h2>
          <div class="resume-entry">
            <div class="hackathon-line">
              <span><strong>GISTDA Hackathon (Spatial Data Science Developer):</strong> Sentinel-1 SAR &amp; DEM flood-hazard pipeline.</span>
              <span class="entry-meta whitespace-nowrap">Jan 2026</span>
            </div>
            <div class="hackathon-line">
              <span><strong>True Innovation Launchpad 2026 (AI &amp; Full-Stack Developer):</strong> GuardianAI frailty triage &bull; <a class="entry-link" href="https://github.com/svkhun/guardianai-clinical-ops-dashboard" target="_blank">GitHub</a></span>
              <span class="entry-meta whitespace-nowrap">Jan 2026</span>
            </div>
          </div>
        </div>

        <!-- Section 5: Standardized Assessments & Credentials -->
        <div class="resume-section">
          <h2 class="section-title">STANDARDIZED ASSESSMENTS &amp; CREDENTIALS</h2>
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">SKILLKAMP by KBTG &ndash; Data Analyst Assessment (STAMP)</span>
              <span class="entry-meta text-right whitespace-nowrap">Mar 2026</span>
            </div>
            <div class="compact-line">Verified score of 97/150 (Above KBTG Industry Benchmark of 90).</div>
          </div>
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Oxford Placement Test &ndash; English Proficiency (AUA Language Center / Oxford University Press)</span>
              <span class="entry-meta text-right whitespace-nowrap">Jun 2026</span>
            </div>
            <div class="compact-line">Verified CEFR B1 (Independent User, Overall Score: 51/120 &bull; Use of English: 54 / B1, Listening: 48 / B1).</div>
          </div>
        </div>
      </div>

      <!-- Page 2 Sheet Footer -->
      <div class="resume-sheet-footer">
        <span>Sivakorn Khundilokrattaya &ndash; Curriculum Vitae</span>
        <span class="page-number">Page 2 of 2</span>
      </div>
    </div>
  </div>
</body>
</html>
"""

# =========================================================================
# 2. GENERATE RESUME HTML (1 Page - Airy, ~10pt, Plain Outcomes First)
# =========================================================================

res_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sivakorn Khundilokrattaya – Resume</title>
  <style>
    @page {{
      size: A4 portrait;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      width: 210mm;
      background: #ffffff;
      font-family: "Geist Local", "Segoe UI", Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.42;
      color: #172033;
    }}
    .resume-paper, .resume-a4-page {{
      position: relative !important;
      width: 210mm !important;
      height: 297mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;
      max-height: 297mm !important;
      margin: 0 !important;
      padding: 13mm 14.5mm 12mm 14.5mm !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      box-shadow: none !important;
      border: none !important;
      border-radius: 0 !important;
      background: #ffffff !important;
      overflow: hidden !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }}
    #resume-page-single {{
      page-break-before: avoid !important;
      break-before: avoid !important;
      page-break-after: avoid !important;
      break-after: avoid !important;
    }}
    .resume-content-wrap {{
      width: 100%;
    }}
    .flex {{ display: flex; }}
    .flex-wrap {{ flex-wrap: wrap; }}
    .justify-between {{ justify-content: space-between; }}
    .items-center {{ align-items: center; }}
    .items-baseline {{ align-items: baseline; }}
    .text-right {{ text-align: right; }}
    .whitespace-nowrap {{ white-space: nowrap; }}
    .italic {{ font-style: normal !important; color: #4b5563 !important; }}
    .grid-skill-row {{
      display: flex;
      align-items: baseline;
      margin-bottom: 3pt;
      line-height: 1.42;
      font-size: 10pt;
    }}
    .grid-skill-row:last-child {{
      margin-bottom: 0;
    }}
    .grid-skill-row strong {{
      min-width: 138px;
      flex-shrink: 0;
    }}
  </style>
</head>
<body>
  <div id="resume-view">
    <div class="resume-paper resume-a4-page" id="resume-page-single">
      <div class="resume-content-wrap">
        <!-- Header Row -->
        <div class="resume-header">
          <h1 class="resume-name">Sivakorn Khundilokrattaya</h1>
          <div class="resume-headline">3rd-Year Computer Engineering Student &bull; Seeking Data Science, ML &amp; Quantitative Fintech Internship</div>
          <div class="resume-contact flex flex-wrap items-center">
            <span>Bangkok, Thailand</span>
            <span class="pipe-sep">|</span>
            <a href="mailto:sivakorn.khun@gmail.com">sivakorn.khun@gmail.com</a>
            <span class="pipe-sep">|</span>
            <a href="https://svkhun.vercel.app" target="_blank" rel="noopener noreferrer">svkhun.vercel.app</a>
            <span class="pipe-sep">|</span>
            <a href="https://github.com/svkhun" target="_blank" rel="noopener noreferrer">github.com/svkhun</a>
            <span class="pipe-sep">|</span>
            <a href="https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span class="pipe-sep">|</span>
            <a href="https://www.kaggle.com/sivakornkhun" target="_blank" rel="noopener noreferrer">Kaggle</a>
          </div>
        </div>

        <!-- Section 1: EDUCATION & CREDENTIALS -->
        <div class="resume-section">
          <h2 class="section-title">EDUCATION &amp; CREDENTIALS</h2>
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Srinakharinwirot University (SWU) &ndash; B.Eng. in Computer Engineering</span>
              <span class="entry-meta text-right whitespace-nowrap">2024 &ndash; Present (Expected 2028)</span>
            </div>
            <ul class="resume-list">
              <li><strong>Focus &amp; Coursework:</strong> Statistical ML, Credit Risk Modeling, Explainable AI; Machine Learning, Probability &amp; Statistics, Database Systems, DSA.</li>
              <li><strong>NHK Spring Undergraduate Scholarship (2026&ndash;2027):</strong> Corporate engineering scholarship (GPAX &ge; 2.75).</li>
              <li><strong>Standardized Assessments (2026):</strong> KBTG Data Analyst STAMP (Score 97/150, Benchmark: 90) &bull; Oxford Placement Test English Proficiency (CEFR B1, Score 51/120, AUA / Oxford University Press).</li>
            </ul>
          </div>
        </div>

        <!-- Section 2: TECHNICAL SKILLS (3 Compact Single-Line Rows) -->
        <div class="resume-section">
          <h2 class="section-title">TECHNICAL SKILLS</h2>
          <div class="resume-skills-block">
            <div class="grid-skill-row">
              <strong>ML &amp; Explainable AI:</strong>
              <span>LightGBM, CatBoost, XGBoost, Scikit-Learn, PyG, Optuna, OptBinning, TreeSHAP, DiCE</span>
            </div>
            <div class="grid-skill-row">
              <strong>Data &amp; Engineering:</strong>
              <span>Python (Pandas, NumPy, SciPy), SQL (PostgreSQL), FastAPI, ONNX, Docker, React, Git</span>
            </div>
            <div class="grid-skill-row">
              <strong>Languages:</strong>
              <span>Thai (Native), English (CEFR B1 &ndash; Oxford Placement Test), Japanese (Elementary)</span>
            </div>
          </div>
        </div>

        <!-- Section 3: FEATURED DATA SCIENCE & ML PROJECTS -->
        <div class="resume-section">
          <h2 class="section-title">FEATURED DATA SCIENCE &amp; ML PROJECTS</h2>

          <!-- Project 1: K-NEXUS -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">K-NEXUS &ndash; FlowSense &amp; TrustGraph (Synthetic Cashflow &amp; Risk Prototype) &bull; <a class="entry-link" href="https://github.com/svkhun/K-NEXUS-Application" target="_blank">App</a> | <a class="entry-link" href="https://github.com/svkhun/K-NEXUS-Showcase" target="_blank">Showcase</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2026</span>
            </div>
            <div class="italic">PyG (R-GCN), LightGBM, ONNX, FastAPI &bull; KBTG Kampus Hackathon 2026 &ndash; Top 30 Overall &amp; Top 10 Data Science</div>
            <ul class="resume-list">
              <li>Evaluated pre-transfer scam-risk screening across 1,354 synthetic transactions, showing that a simpler tabular baseline (0.996 PR-AUC) outperformed a complex R-GCN + LightGBM graph model (0.994 PR-AUC).</li>
              <li>Prevented inaccurate 30-day cashflow forecasts by disabling an unvalidated ML module on synthetic data and serving an explainable rule-based spending plan in FastAPI and React.</li>
            </ul>
          </div>

          <!-- Project 2: Credit Risk -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Credit Risk Scoring &amp; Explainable AI (XAI) Decision-Support Prototype &bull; <a class="entry-link" href="https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI" target="_blank">GitHub</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2026</span>
            </div>
            <div class="italic">LightGBM, Optuna, TreeSHAP, FastAPI &bull; Research Prototype</div>
            <ul class="resume-list">
              <li>Improved loan default prediction to 0.785 ROC-AUC and 43.2% KS separation (vs. 0.742 logistic baseline) on Home Credit data by tuning a 5-fold LightGBM model with Optuna and mapping to a 300&ndash;850 scorecard.</li>
              <li>Built an interactive loan-review dashboard in FastAPI and Next.js that explains rejection reasons with TreeSHAP and generates hypothetical approval adjustments using DiCE counterfactuals.</li>
            </ul>
          </div>

          <!-- Project 3: Shopee Smart COD -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Shopee Smart COD Reliability &amp; Adaptive Checkout Prototype (Synthetic Data) &bull; <a class="entry-link" href="https://github.com/svkhun/Shopee-Ultimate-Case-Challenge" target="_blank">GitHub</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2026</span>
            </div>
            <div class="italic">Python, Scikit-Learn, FastAPI, JavaScript &bull; Shopee Ultimate Case Challenge 2026 &ndash; Operations Strategy Track</div>
            <ul class="resume-list">
              <li>Predicted cash-on-delivery (COD) failure risk at 0.840 ROC-AUC on 3,500 held-out synthetic orders (from 50,000 simulated orders) using a Random Forest pipeline to flag high-risk checkouts before shipping.</li>
              <li>Modeled a simulated 3.58M THB/month return-cost savings scenario (assuming 58% fewer failed deliveries) by designing a 4-tier checkout policy (Grades A&ndash;D) and a mobile checkout simulator in FastAPI.</li>
            </ul>
          </div>

          <!-- Project 4: LOD -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between">
              <span class="entry-title">Long Overdue Debtor (LOD) Default Prediction Pipeline &bull; <a class="entry-link" href="https://github.com/svkhun/aiful-credit-risk-modeling" target="_blank">GitHub</a></span>
              <span class="entry-meta text-right whitespace-nowrap">2025</span>
            </div>
            <div class="italic">CatBoost, LightGBM, Optuna, Scikit-Learn &bull; Aihack Thailand 2025 &ndash; National Finalist (Team OEIA)</div>
            <ul class="resume-list">
              <li>Improved 12-month loan default ranking from 0.633 to 0.653 ROC-AUC on imbalanced consumer loan records (~8.3% default rate) by blending CatBoost and LightGBM predictions across 5-fold cross-validation.</li>
              <li>Captured borrower distress signals using engineered debt-to-income, credit utilization, and missingness features, and published a reproducible synthetic data pipeline to protect confidential competition records.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</body>
</html>
"""

with open(os.path.join(BUILD_DIR, "document-theme.css"), encoding="utf-8") as theme_file:
    theme_css = theme_file.read()

cv_html_content = cv_html_content.replace("</style>", theme_css + "\n  </style>", 1)
res_html_content = res_html_content.replace("</style>", theme_css + "\n  </style>", 1)

cv_file = os.path.join(BUILD_DIR, "cv.html")
res_file = os.path.join(BUILD_DIR, "resume.html")

with open(cv_file, "w", encoding="utf-8") as f:
    f.write(cv_html_content)

with open(res_file, "w", encoding="utf-8") as f:
    f.write(res_html_content)

print("Saved cv.html and resume.html")

# Render with Chrome
cv_pdf = os.path.join(BUILD_DIR, "Sivakorn_Khundilokrattaya_CV.pdf")
res_pdf = os.path.join(BUILD_DIR, "Sivakorn_Khundilokrattaya_Resume.pdf")

cmd_cv = [
    CHROME_BIN,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={cv_pdf}",
    cv_file
]

cmd_res = [
    CHROME_BIN,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={res_pdf}",
    res_file
]

try:
    subprocess.run(cmd_cv, check=True)
    subprocess.run(cmd_res, check=True)
except (OSError, subprocess.CalledProcessError):
    subprocess.run(["node", os.path.join(BUILD_DIR, "print_documents.cjs")], check=True)

print("PDFs rendered successfully.")

# Verify with pypdf
reader_cv = PdfReader(cv_pdf)
reader_res = PdfReader(res_pdf)

print(f"\n=== VERIFICATION RESULTS ===")
print(f"CV Total Pages: {len(reader_cv.pages)} (Target: 2)")
print(f"Resume Total Pages: {len(reader_res.pages)} (Target: 1)")

for i, p in enumerate(reader_cv.pages):
    print(f"  CV Page {i+1} character count: {len(p.extract_text())}")

for i, p in enumerate(reader_res.pages):
    print(f"  Resume Page {i+1} character count: {len(p.extract_text())}")

assert len(reader_cv.pages) == 2, "CV must have exactly 2 pages"
assert len(reader_res.pages) == 1, "Resume must have exactly 1 page"

# Deploy to assets/
assets_cv = os.path.join(ASSETS_DIR, "Sivakorn_Khundilokrattaya_CV.pdf")
assets_res = os.path.join(ASSETS_DIR, "Sivakorn_Khundilokrattaya_Resume.pdf")
shutil.copyfile(cv_pdf, assets_cv)
shutil.copyfile(res_pdf, assets_res)
print(f"\n[OK] Deployed updated CV to: {assets_cv}")
print(f"\n[OK] Deployed updated Resume to: {assets_res}")

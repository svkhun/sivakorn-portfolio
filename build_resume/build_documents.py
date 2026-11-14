import os
import shutil
import subprocess
from pypdf import PdfReader

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(BUILD_DIR, "..", "assets"))
CHROME_BIN = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

os.makedirs(BUILD_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

with open(os.path.join(BUILD_DIR, "document-theme.css"), encoding="utf-8") as theme_file:
    theme_css = theme_file.read()

# =========================================================================
# 1. GENERATE RESUME HTML (1 Page — Option A Left-Rail Badges + Pure Stack)
# =========================================================================

res_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sivakorn Khundilokrattaya – Resume</title>
  <style>
{theme_css}
  </style>
</head>
<body>
  <div id="resume-view">
    <div class="editorial-page" id="resume-page-1">
      <div class="page-main">

        <!-- Header -->
        <header class="ed-header">
          <h1 class="ed-name">Sivakorn Khundilokrattaya</h1>
          <div class="ed-role">3rd-Year Computer Engineering Student &middot; Seeking Data Science, ML &amp; Quantitative Fintech Internship</div>
          <div class="ed-contacts">
            <span>Bangkok, Thailand</span>
            <span class="sep">|</span>
            <a href="mailto:sivakorn.khun@gmail.com">sivakorn.khun@gmail.com</a>
            <span class="sep">|</span>
            <a href="https://svkhun.vercel.app" target="_blank" rel="noopener noreferrer">svkhun.vercel.app</a>
            <span class="sep">|</span>
            <a href="https://github.com/svkhun" target="_blank" rel="noopener noreferrer">github.com/svkhun</a>
            <span class="sep">|</span>
            <a href="https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span class="sep">|</span>
            <a href="https://www.kaggle.com/sivakornkhun" target="_blank" rel="noopener noreferrer">Kaggle</a>
          </div>
        </header>

        <!-- Section 1: Education (Merged Education, Scholarship & STAMP) -->
        <section class="ed-section">
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Education</h2>
              <div class="ed-date">2024 &ndash; Present</div>
              <div class="ed-tag">Expected 2028</div>
              <div class="ed-location">Bangkok, Thailand</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Srinakharinwirot University (SWU) &ndash; B.Eng. in Computer Engineering</span>
              </div>
              <div class="edu-subline">Statistical ML, Credit Risk &amp; Explainable AI &middot; Coursework: ML, Statistics, Databases, DSA</div>
              <ul class="ed-bullets">
                <li><strong>NHK Spring Scholarship (2026&ndash;2027):</strong> Awarded 30,000 THB/year corporate engineering grant (GPAX &ge; 2.75) with a planned 2-month summer internship.</li>
                <li><strong>Assessments (2026):</strong> KBTG Data Analyst STAMP (Score 97/150, Benchmark: 90) and Oxford Placement Test English Proficiency (CEFR B1, Score 51/120).</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 2: Skills (4 short single-line rows, no repeated tools) -->
        <section class="ed-section">
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Skills</h2>
            </div>
            <div class="ed-right">
              <div class="skills-list">
                <div class="skill-line">
                  <span class="skill-cat">ML &amp; Risk</span>
                  <span class="skill-items">LightGBM, CatBoost, XGBoost, Scikit-Learn, PyG (R-GCN), Optuna</span>
                </div>
                <div class="skill-line">
                  <span class="skill-cat">XAI &amp; Data</span>
                  <span class="skill-items">OptBinning, TreeSHAP, DiCE, Python (Pandas, NumPy, SciPy), SQL</span>
                </div>
                <div class="skill-line">
                  <span class="skill-cat">Engineering</span>
                  <span class="skill-items">FastAPI, ONNX, Docker, WebSockets, PostgreSQL, React, Next.js, Git</span>
                </div>
                <div class="skill-line">
                  <span class="skill-cat">Languages</span>
                  <span class="skill-items">Thai (Native), English (CEFR B1 &ndash; Oxford), Japanese (Elementary)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3: Selected Projects (Left-Rail Competition/Context Tags) -->
        <section class="ed-section">

          <!-- Project 1: K-NEXUS -->
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Projects</h2>
              <div class="ed-date">2026</div>
              <div class="ed-tag">KBTG Top 10 DS</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">K-NEXUS &ndash; FlowSense &amp; TrustGraph (Synthetic Prototype)</span>
                <span class="entry-links"><a href="https://github.com/svkhun/K-NEXUS-Application" target="_blank" rel="noopener noreferrer">App</a><span class="link-sep">/</span><a href="https://github.com/svkhun/K-NEXUS-Showcase" target="_blank" rel="noopener noreferrer">Showcase</a></span>
              </div>
              <div class="entry-subline">PyTorch Geometric (R-GCN), LightGBM, ONNX Runtime, FastAPI, React 18</div>
              <ul class="ed-bullets">
                <li>Achieved 0.996 PR-AUC with a tabular baseline vs. 0.994 for R-GCN + LightGBM across 1,354 synthetic transfers using a leak-free past-only graph.</li>
                <li>Prevented inaccurate 30-day cashflow forecasts (2,701.6 vs. 313.3 THB baseline MAE) by gating out unvalidated ML for a FastAPI/React rule plan.</li>
              </ul>
            </div>
          </div>

          <!-- Project 2: Credit Risk -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">2026</div>
              <div class="ed-tag">Research Prototype</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Credit Risk Scoring &amp; Explainable AI (XAI) Decision Prototype</span>
                <span class="entry-links"><a href="https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">Python, LightGBM, Optuna, OptBinning (WoE), TreeSHAP, DiCE, FastAPI, Next.js</div>
              <ul class="ed-bullets">
                <li>Improved loan default prediction from 0.742 to 0.785 ROC-AUC (43.2% KS) on Home Credit data by tuning a 5-fold LightGBM model with Optuna.</li>
                <li>Calibrated probabilities to a 300&ndash;850 credit scorecard and built a FastAPI/Next.js dashboard with TreeSHAP reasons and DiCE counterfactuals.</li>
              </ul>
            </div>
          </div>

          <!-- Project 3: Shopee Smart COD -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">2026</div>
              <div class="ed-tag">Shopee Challenge</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Shopee Smart COD Reliability &amp; Adaptive Checkout Prototype</span>
                <span class="entry-links"><a href="https://github.com/svkhun/Shopee-Ultimate-Case-Challenge" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">Python, Scikit-Learn (Random Forest), Pandas, FastAPI, JavaScript</div>
              <ul class="ed-bullets">
                <li>Predicted COD delivery failure at 0.840 ROC-AUC on 3,500 held-out synthetic orders (from 50,000 checkouts) via a calibrated Random Forest.</li>
                <li>Modeled 3.58M THB/month in simulated return savings (at 58% RTO reduction) by building a 4-tier deposit policy and FastAPI mobile simulator.</li>
              </ul>
            </div>
          </div>

          <!-- Project 4: LOD -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">2025</div>
              <div class="ed-tag">Aihack Finalist</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Long Overdue Debtor (LOD) Default Prediction Pipeline</span>
                <span class="entry-links"><a href="https://github.com/svkhun/aiful-credit-risk-modeling" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">CatBoost, LightGBM, XGBoost, Optuna, Scikit-Learn</div>
              <ul class="ed-bullets">
                <li>Lifted 12-month default ranking from 0.633 to 0.653 OOF ROC-AUC on imbalanced loans (~8.3% default rate) by blending CatBoost and LightGBM.</li>
                <li>Captured borrower distress via debt-to-income and utilization ratios, releasing an NDA-safe synthetic pipeline to protect private records.</li>
              </ul>
            </div>
          </div>

        </section>

      </div>

      <!-- Footer -->
      <footer class="ed-footer">
        <span>Sivakorn Khundilokrattaya</span>
        <span>Page 1 of 1</span>
      </footer>
    </div>
  </div>
</body>
</html>
"""

# =========================================================================
# 2. GENERATE CV HTML (2 Pages — Option A Architecture, Non-Duplicating)
# =========================================================================

cv_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sivakorn Khundilokrattaya – Curriculum Vitae</title>
  <style>
{theme_css}
  </style>
</head>
<body>
  <div id="cv-view">
    <!-- ==================== PAGE 1 ==================== -->
    <div class="editorial-page" id="cv-page-1">
      <div class="page-main">

        <!-- Header -->
        <header class="ed-header">
          <h1 class="ed-name">Sivakorn Khundilokrattaya</h1>
          <div class="ed-role">3rd-Year Computer Engineering Student &middot; Seeking Data Science, ML &amp; Quantitative Fintech Internship</div>
          <div class="ed-contacts">
            <span>Bangkok, Thailand</span>
            <span class="sep">|</span>
            <a href="mailto:sivakorn.khun@gmail.com">sivakorn.khun@gmail.com</a>
            <span class="sep">|</span>
            <a href="https://svkhun.vercel.app" target="_blank" rel="noopener noreferrer">svkhun.vercel.app</a>
            <span class="sep">|</span>
            <a href="https://github.com/svkhun" target="_blank" rel="noopener noreferrer">github.com/svkhun</a>
            <span class="sep">|</span>
            <a href="https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span class="sep">|</span>
            <a href="https://www.kaggle.com/sivakornkhun" target="_blank" rel="noopener noreferrer">Kaggle</a>
          </div>
        </header>

        <!-- Section 1: Education -->
        <section class="ed-section">
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Education</h2>
              <div class="ed-date">2024 &ndash; Present</div>
              <div class="ed-tag">Expected 2028</div>
              <div class="ed-location">Bangkok, Thailand</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Srinakharinwirot University (SWU) &ndash; B.Eng. in Computer Engineering</span>
              </div>
              <div class="edu-subline">Statistical ML, Credit Risk &amp; Data Engineering &middot; Coursework: ML, Statistics, Databases, OS</div>
              <ul class="ed-bullets">
                <li><strong>NHK Spring Scholar (2026&ndash;2027):</strong> Conferred a 30,000 THB/year engineering award (Sep 2026, GPAX &ge; 2.75) with a 2-month summer internship.</li>
                <li><strong>Verified Benchmarks (2026):</strong> Scored 97/150 on SKILLKAMP by KBTG Data Analyst STAMP (vs. 90 benchmark) and CEFR B1 (51/120) on Oxford Placement.</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 2: Skills -->
        <section class="ed-section">
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Skills</h2>
            </div>
            <div class="ed-right">
              <div class="skills-list">
                <div class="skill-line">
                  <span class="skill-cat">ML &amp; Risk</span>
                  <span class="skill-items">LightGBM, CatBoost, XGBoost, Scikit-Learn, PyG (R-GCN), Optuna</span>
                </div>
                <div class="skill-line">
                  <span class="skill-cat">XAI &amp; Data</span>
                  <span class="skill-items">OptBinning, TreeSHAP, DiCE, Python (Pandas, NumPy, SciPy), SQL</span>
                </div>
                <div class="skill-line">
                  <span class="skill-cat">Engineering</span>
                  <span class="skill-items">FastAPI, ONNX, Docker, WebSockets, PostgreSQL, React, Next.js, Git</span>
                </div>
                <div class="skill-line">
                  <span class="skill-cat">Languages</span>
                  <span class="skill-items">Thai (Native), English (CEFR B1 &ndash; Oxford), Japanese (Elementary)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3: Selected Projects (Page 1 — Left-Rail Competition/Context Tags) -->
        <section class="ed-section">

          <!-- Project 1: K-NEXUS -->
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Projects</h2>
              <div class="ed-date">2026</div>
              <div class="ed-tag">KBTG Top 10 DS</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">K-NEXUS &ndash; FlowSense &amp; TrustGraph (Synthetic Prototype)</span>
                <span class="entry-links"><a href="https://github.com/svkhun/K-NEXUS-Application" target="_blank" rel="noopener noreferrer">App</a><span class="link-sep">/</span><a href="https://github.com/svkhun/K-NEXUS-Showcase" target="_blank" rel="noopener noreferrer">Showcase</a></span>
              </div>
              <div class="entry-subline">PyTorch Geometric (R-GCN), LightGBM, ONNX Runtime, FastAPI, React 18</div>
              <ul class="ed-bullets">
                <li>Verified that a non-graph baseline (0.996 PR-AUC) beat 16D R-GCN + LightGBM embeddings (0.994 PR-AUC) across 1,354 chronological transfers.</li>
                <li>Kept 30-day direct-ML cashflow forecasting disabled after paired evaluation on 32 synthetic accounts (2,701.6 vs. 313.3 THB baseline MAE).</li>
              </ul>
            </div>
          </div>

          <!-- Project 2: Credit Risk -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">2026</div>
              <div class="ed-tag">Research Prototype</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Credit Risk Scoring &amp; Explainable AI (XAI) Decision Prototype</span>
                <span class="entry-links"><a href="https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">Python, LightGBM, Optuna, OptBinning (WoE), TreeSHAP, DiCE, FastAPI, Next.js</div>
              <ul class="ed-bullets">
                <li>Raised cross-validation ROC-AUC from 0.742 to 0.785 with 43.2% KS separation by pairing monotonic WoE screening with 5-fold Optuna LightGBM.</li>
                <li>Mapped default probabilities into a 300&ndash;850 underwriting scorecard (Base 600, PDO 20) served in FastAPI/Next.js with TreeSHAP and DiCE.</li>
              </ul>
            </div>
          </div>

          <!-- Project 3: Shopee Smart COD -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">2026</div>
              <div class="ed-tag">Shopee Challenge</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Shopee Smart COD Reliability &amp; Adaptive Checkout Prototype</span>
                <span class="entry-links"><a href="https://github.com/svkhun/Shopee-Ultimate-Case-Challenge" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">Python, Scikit-Learn (Random Forest), Pandas, FastAPI, JavaScript</div>
              <ul class="ed-bullets">
                <li>Reached 0.840 ROC-AUC and 0.306 PR-AUC on 3,500 synthetic holdout orders across 50,000 simulated checkouts using a 3-fold Random Forest.</li>
                <li>Projected 3.58M THB/month in reverse-logistics savings (at 58% RTO reduction) by mapping risk scores to a 5&ndash;99 scale and 4 checkout tiers.</li>
              </ul>
            </div>
          </div>

          <!-- Project 4: LOD -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">2025</div>
              <div class="ed-tag">Aihack Finalist</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Long Overdue Debtor (LOD) Default Prediction Pipeline</span>
                <span class="entry-links"><a href="https://github.com/svkhun/aiful-credit-risk-modeling" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">CatBoost, LightGBM, XGBoost, Optuna, Scikit-Learn</div>
              <ul class="ed-bullets">
                <li>Advanced out-of-fold ROC-AUC from 0.633 to 0.653 across 1:12 imbalanced consumer loans (~8.3% default rate) via 5-fold rank-blended trees.</li>
                <li>Engineered leak-free credit utilization, tenure, and missingness features while publishing a synthetic pipeline for reproducible review.</li>
              </ul>
            </div>
          </div>

        </section>

      </div>

      <!-- Page 1 Footer -->
      <footer class="ed-footer">
        <span>Sivakorn Khundilokrattaya &ndash; Curriculum Vitae</span>
        <span>Page 1 of 2</span>
      </footer>
    </div>

    <!-- ==================== PAGE 2 ==================== -->
    <div class="editorial-page" id="cv-page-2">
      <div class="page-main">

        <!-- Section 4: Additional Projects (Unified Format with Left-Rail Context Tags) -->
        <section class="ed-section">

          <!-- Project 5: Industrial IoT -->
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">More Projects</h2>
              <div class="ed-date">2026</div>
              <div class="ed-tag">IoT Prototype</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Industrial IoT Telemetry &amp; OEE Data Platform (Simulated Telemetry)</span>
                <span class="entry-links"><a href="https://github.com/svkhun/mfg-data-pipeline" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">Python, FastAPI, PostgreSQL 15, WebSockets, LightGBM, TreeSHAP, React 18</div>
              <ul class="ed-bullets">
                <li>Streamed live machine-health readings and hourly OEE summaries (Availability &times; Performance &times; Quality) via FastAPI, PostgreSQL, and WebSockets.</li>
                <li>Surfaced interpretable equipment anomaly flags on a React 18 dashboard by combining Isolation Forest, LightGBM, and TreeSHAP attributions.</li>
              </ul>
            </div>
          </div>

          <!-- Project 6: SWU Open House -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">2026</div>
              <div class="ed-tag">Official SWU Portal</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">SWU Open House 2026 Web Platform Enhancement</span>
                <span class="entry-links"><a href="https://svkhun.vercel.app/project-swu-openhouse" target="_blank" rel="noopener noreferrer">Case Study</a></span>
              </div>
              <div class="entry-subline">WordPress, Elementor, Custom CSS, Responsive UI, THE CONCERT Integration</div>
              <ul class="ed-bullets">
                <li>Streamlined university event onboarding into a guided 3-step registration flow integrated with THE CONCERT ticketing platform across devices.</li>
                <li>Built an interactive multi-faculty poster showcase and live countdown interface with responsive custom CSS and unified navigation.</li>
              </ul>
            </div>
          </div>

          <!-- Project 7: GuardianAI -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">Jan 2026</div>
              <div class="ed-tag">True Launchpad</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">GuardianAI Clinical Frailty Triage Dashboard (Prototype)</span>
                <span class="entry-links"><a href="https://github.com/svkhun/guardianai-clinical-ops-dashboard" target="_blank" rel="noopener noreferrer">GitHub</a></span>
              </div>
              <div class="entry-subline">React, Vite, Node.js, Tailwind CSS, Thai / English Localization</div>
              <ul class="ed-bullets">
                <li>Unified patient screening registries, vital trends, and alert queues into a bilingual (Thai/English) care-coordination triage prototype.</li>
                <li>Structured clinical follow-up workflows on example patient records by linking risk-factor views with provider assignment and care notes.</li>
              </ul>
            </div>
          </div>

          <!-- Project 8: GISTDA Flood Mapping -->
          <div class="ed-row">
            <div class="ed-left">
              <div class="ed-date">Jan 2026</div>
              <div class="ed-tag">GISTDA Hackathon</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">30m Grid Flash-Flood Hazard Mapping Pipeline</span>
              </div>
              <div class="entry-subline">Python, GeoPandas, Rasterio, Shapely, Sentinel-1 SAR, Copernicus DEM</div>
              <ul class="ed-bullets">
                <li>Segmented flood extent from dual-polarization Sentinel-1 SAR backscatter and Copernicus DEM rasters to build 30m provincial hazard matrices.</li>
              </ul>
            </div>
          </div>

        </section>

        <!-- Section 5: Honors & Competition Leadership (Complete Unified Roster, No Tech Duplication) -->
        <section class="ed-section">

          <div class="ed-row compact-row">
            <div class="ed-left">
              <h2 class="section-label">Honors</h2>
              <div class="ed-date">Nov 2026</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">KBTG Kampus Hackathon 2026 &ndash; Top 30 Overall &amp; Top 10 Data Science</span>
              </div>
              <div class="entry-text"><strong>Pitcher, Developer &amp; Concept Lead</strong> &middot; Conceived the K-NEXUS product architecture and delivered the stage pitch at Kasikorn Business-Technology Group.</div>
            </div>
          </div>

          <div class="ed-row compact-row">
            <div class="ed-left">
              <div class="ed-date">Dec 2025</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">AIRA &amp; AIFUL / Aihack Thailand 2025 &ndash; National Finalist (Team OEIA)</span>
              </div>
              <div class="entry-text"><strong>ML &amp; Financial Risk Lead</strong> &middot; Pitched credit-cutoff vs. interest-margin profitability trade-offs to executive judges (Chulalongkorn Business School &times; ProbSpace).</div>
            </div>
          </div>


        </section>

        <!-- Section 6: Standardized Assessments & Credentials -->
        <section class="ed-section">

          <!-- Assessment 1: KBTG Data Analyst -->
          <div class="ed-row compact-row">
            <div class="ed-left">
              <h2 class="section-label">Assessments</h2>
              <div class="ed-date">Mar 2026</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">SKILLKAMP by KBTG &ndash; Data Analyst Assessment (STAMP)</span>
              </div>
              <div class="entry-text">Verified score of 97/150 (Above KBTG Industry Benchmark of 90) &middot; Data Cleaning 23/30, EDA &amp; Visualization 20/30, Foundations 20/30, ML 18/30.</div>
            </div>
          </div>

          <!-- Assessment 2: KBTG Digital Marketer -->
          <div class="ed-row compact-row">
            <div class="ed-left">
              <div class="ed-date">Mar 2026</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">SKILLKAMP by KBTG &ndash; Digital &amp; Performance Marketer (STAMP)</span>
              </div>
              <div class="entry-text">Verified score of 98/150 (Above KBTG Industry Benchmark of 94) &middot; Digital Marketing Analytics 26/30 (Benchmark: 17.94), Data-Driven Marketing 21/30.</div>
            </div>
          </div>

          <!-- Assessment 3: Oxford Placement Test -->
          <div class="ed-row compact-row">
            <div class="ed-left">
              <div class="ed-date">Jun 2026</div>
            </div>
            <div class="ed-right">
              <div class="entry-heading">
                <span class="entry-title">Oxford Placement Test &ndash; English Proficiency (AUA / Oxford University Press)</span>
              </div>
              <div class="entry-text">Verified CEFR B1 (Overall Score: 51/120 &middot; Use of English: 54 / B1, Listening: 48 / B1).</div>
            </div>
          </div>

        </section>

      </div>

      <!-- Page 2 Footer -->
      <footer class="ed-footer">
        <span>Sivakorn Khundilokrattaya &ndash; Curriculum Vitae</span>
        <span>Page 2 of 2</span>
      </footer>
    </div>
  </div>
</body>
</html>
"""

# =========================================================================
# 3. GENERATE COVER LETTER HTML (1 Page — Matched Editorial Design System)
# =========================================================================

cover_letter_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sivakorn Khundilokrattaya – Cover Letter</title>
  <style>
{theme_css}
  </style>
</head>
<body>
  <div id="cover-letter-view">
    <div class="editorial-page" id="cover-letter-page-1">
      <div class="page-main">

        <!-- Header -->
        <header class="ed-header">
          <h1 class="ed-name">Sivakorn Khundilokrattaya</h1>
          <div class="ed-role">3rd-Year Computer Engineering Student &middot; Seeking Data Science, ML &amp; Quantitative Fintech Internship</div>
          <div class="ed-contacts">
            <span>Bangkok, Thailand</span>
            <span class="sep">|</span>
            <a href="mailto:sivakorn.khun@gmail.com">sivakorn.khun@gmail.com</a>
            <span class="sep">|</span>
            <a href="https://svkhun.vercel.app" target="_blank" rel="noopener noreferrer">svkhun.vercel.app</a>
            <span class="sep">|</span>
            <a href="https://github.com/svkhun" target="_blank" rel="noopener noreferrer">github.com/svkhun</a>
            <span class="sep">|</span>
            <a href="https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span class="sep">|</span>
            <a href="https://www.kaggle.com/sivakornkhun" target="_blank" rel="noopener noreferrer">Kaggle</a>
          </div>
        </header>

        <!-- Recipient & Date Section -->
        <section class="ed-section">
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Recipient</h2>
              <div class="ed-date">November 2026</div>
              <div class="ed-location">Bangkok, Thailand</div>
            </div>
            <div class="ed-right letter-recipient">
              <div><strong>Hiring Committee &ndash; Data Science, Machine Learning &amp; Quantitative Risk</strong></div>
              <div class="muted-line">Data Science, AI &amp; Quantitative Engineering Internship</div>
            </div>
          </div>
        </section>

        <!-- Main Letter Section -->
        <section class="ed-section">
          <div class="ed-row">
            <div class="ed-left">
              <h2 class="section-label">Cover Letter</h2>
              <div class="ed-tag">Internship Application</div>
            </div>
            <div class="ed-right letter-body">
              <div class="letter-subject">Re: Application for Data Science, ML &amp; Quantitative Fintech Internship</div>

              <p>Dear Hiring Team,</p>

              <p>I am a third-year Computer Engineering student at Srinakharinwirot University (SWU) and an NHK Spring Engineering Scholar (2026&ndash;2027), applying for a Data Science, Machine Learning, or Quantitative Fintech internship. Across national hackathons and independent prototypes, my focus is building tabular and graph risk models that are rigorously validated against simple baselines, calibrated for decisions, and paired with clear explanations.</p>

              <p>In my recent engineering and competition work, I have focused on three core disciplines:</p>

              <ul class="ed-bullets">
                <li><strong>Baseline Benchmarking &amp; Validation Gating (KBTG Hackathon 2026 &ndash; Top 10 Data Science):</strong> As Concept Lead and Pitcher for <a class="inline-link" href="https://github.com/svkhun/K-NEXUS-Application" target="_blank" rel="noopener noreferrer">K-NEXUS</a>, I built a past-only transaction graph to prevent label leakage, showing that a tabular baseline (0.996 PR-AUC) beat 16D R-GCN + LightGBM embeddings (0.994 PR-AUC) across 1,354 synthetic transfers. When our 30-day cashflow ML candidate trailed the account-mean baseline (2,701.6 vs. 313.3 THB MAE), I gated it out for an explainable FastAPI/React rule plan.</li>
                <li><strong>Interpretable Credit Risk &amp; Calibration (Research Prototype &amp; Aihack 2025 Finalist):</strong> In my <a class="inline-link" href="https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI" target="_blank" rel="noopener noreferrer">Credit Risk &amp; XAI</a> prototype, I paired monotonic WoE binning with 5-fold Optuna LightGBM to lift Home Credit default prediction from 0.742 to 0.785 ROC-AUC (43.2% KS), calibrated to a 300&ndash;850 scorecard with TreeSHAP and DiCE recourse. At <a class="inline-link" href="https://github.com/svkhun/aiful-credit-risk-modeling" target="_blank" rel="noopener noreferrer">Aihack Thailand 2025</a> (National Finalist), I blended CatBoost and LightGBM to raise 12-month default ranking from 0.633 to 0.653 OOF ROC-AUC on imbalanced loans (~8.3% default rate).</li>
                <li><strong>Connecting Models to Operational Policy (Shopee Challenge &amp; Production Systems):</strong> For the <a class="inline-link" href="https://github.com/svkhun/Shopee-Ultimate-Case-Challenge" target="_blank" rel="noopener noreferrer">Shopee Ultimate Case Challenge 2026</a>, I trained a calibrated Random Forest (0.840 ROC-AUC on 3,500 synthetic holdout orders) and designed a 4-tier deposit policy modeling 3.58M THB/month in simulated return savings. Beyond ML, I build end-to-end delivery systems&mdash;from FastAPI, ONNX, and PostgreSQL/WebSocket telemetry views to the official <a class="inline-link" href="https://svkhun.vercel.app/project-swu-openhouse" target="_blank" rel="noopener noreferrer">SWU Open House 2026</a> portal.</li>
              </ul>

              <p>Backed by a verified 97/150 score on the SKILLKAMP by KBTG Data Analyst STAMP (above the 90 benchmark) and CEFR B1 English proficiency on the Oxford Placement Test, I would welcome the opportunity to discuss how my background in statistical machine learning and explainable risk modeling can support your team.</p>

              <div class="letter-signoff">
                <div>Sincerely,</div>
                <div class="letter-signature-name">Sivakorn Khundilokrattaya</div>
                <div class="letter-signature-role">B.Eng. in Computer Engineering Student, Srinakharinwirot University (SWU)</div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Footer -->
      <footer class="ed-footer">
        <span>Sivakorn Khundilokrattaya &ndash; Cover Letter</span>
        <span>Page 1 of 1</span>
      </footer>
    </div>
  </div>
</body>
</html>
"""

cv_file = os.path.join(BUILD_DIR, "cv.html")
res_file = os.path.join(BUILD_DIR, "resume.html")
cl_file = os.path.join(BUILD_DIR, "cover_letter.html")

with open(cv_file, "w", encoding="utf-8") as f:
    f.write(cv_html_content)

with open(res_file, "w", encoding="utf-8") as f:
    f.write(res_html_content)

with open(cl_file, "w", encoding="utf-8") as f:
    f.write(cover_letter_html_content)

print("Saved cv.html, resume.html, and cover_letter.html")

# Render with Chrome
cv_pdf = os.path.join(BUILD_DIR, "Sivakorn_Khundilokrattaya_CV.pdf")
res_pdf = os.path.join(BUILD_DIR, "Sivakorn_Khundilokrattaya_Resume.pdf")
cl_pdf = os.path.join(BUILD_DIR, "Sivakorn_Khundilokrattaya_Cover_Letter.pdf")

for html_in, pdf_out in [(cv_file, cv_pdf), (res_file, res_pdf), (cl_file, cl_pdf)]:
    cmd = [
        CHROME_BIN,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_out}",
        html_in
    ]
    subprocess.run(cmd, check=True)

print("PDFs rendered successfully.")

# Verify with pypdf
reader_cv = PdfReader(cv_pdf)
reader_res = PdfReader(res_pdf)
reader_cl = PdfReader(cl_pdf)

print(f"\n=== VERIFICATION RESULTS ===")
print(f"CV Total Pages: {len(reader_cv.pages)} (Target: 2)")
print(f"Resume Total Pages: {len(reader_res.pages)} (Target: 1)")
print(f"Cover Letter Total Pages: {len(reader_cl.pages)} (Target: 1)")

for i, p in enumerate(reader_cv.pages):
    print(f"  CV Page {i+1} character count: {len(p.extract_text())}")

for i, p in enumerate(reader_res.pages):
    print(f"  Resume Page {i+1} character count: {len(p.extract_text())}")

for i, p in enumerate(reader_cl.pages):
    print(f"  Cover Letter Page {i+1} character count: {len(p.extract_text())}")

assert len(reader_cv.pages) == 2, "CV must have exactly 2 pages"
assert len(reader_res.pages) == 1, "Resume must have exactly 1 page"
assert len(reader_cl.pages) == 1, "Cover Letter must have exactly 1 page"

# Deploy to assets/
for src_pdf, fname in [
    (cv_pdf, "Sivakorn_Khundilokrattaya_CV.pdf"),
    (res_pdf, "Sivakorn_Khundilokrattaya_Resume.pdf"),
    (cl_pdf, "Sivakorn_Khundilokrattaya_Cover_Letter.pdf"),
]:
    dst_pdf = os.path.join(ASSETS_DIR, fname)
    shutil.copyfile(src_pdf, dst_pdf)
    print(f"[OK] Deployed: {dst_pdf}")

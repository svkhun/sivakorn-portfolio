import os
import shutil
import subprocess
from datetime import datetime
from pypdf import PdfReader

BUILD_DIR = r"d:\All Project\web portfolio\build_resume"
ASSETS_DIR = r"d:\All Project\web portfolio\assets"
DOWNLOADS_DIR = r"C:\Users\Acer\Downloads\Resume&CV"
ARTIFACT_DIR = r"C:\Users\Acer\.gemini\antigravity\brain\d9db4834-7ed1-4308-86e1-bc6cd1af34dd"
CHROME_BIN = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

os.makedirs(BUILD_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

now = datetime.now()
timestamp_str = now.strftime("%m/%d/%Y, %I:%M:%S %p")
if timestamp_str.startswith("0"):
    timestamp_str = timestamp_str[1:]

print(f"Timestamp: {timestamp_str}")

# =========================================================================
# 1. GENERATE CV HTML (2 Pages)
# =========================================================================

cv_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
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
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 8.75pt;
      line-height: 1.36;
      color: #000000;
    }}
    .resume-paper, .resume-a4-page {{
      position: relative !important;
      width: 210mm !important;
      height: 297mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;
      max-height: 297mm !important;
      margin: 0 !important;
      padding: 10mm 15mm 10mm 15mm !important;
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
    .resume-print-header {{
      display: block !important;
      text-align: right !important;
      font-size: 7.5pt !important;
      color: #334155 !important;
      margin-bottom: 1.5mm !important;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
    }}
    h1, .resume-name {{
      font-size: 20pt !important;
      font-weight: 700 !important;
      line-height: 1.15 !important;
      letter-spacing: -0.01em !important;
      text-align: center !important;
      margin: 0 0 3pt 0 !important;
      color: #000000 !important;
    }}
    .resume-headline {{
      font-size: 9pt !important;
      font-weight: 400 !important;
      text-align: center !important;
      margin: 0 0 2.5pt 0 !important;
      color: #111111 !important;
    }}
    .resume-contact {{
      font-size: 8pt !important;
      line-height: 1.38 !important;
      text-align: center !important;
      margin: 0 0 8pt 0 !important;
      color: #222222 !important;
    }}
    .resume-contact a {{
      color: #222222 !important;
      text-decoration: none !important;
    }}
    .resume-contact .pipe-sep {{
      color: #666666 !important;
      margin: 0 5px !important;
    }}
    h2, .section-title {{
      font-size: 9.75pt !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.04em !important;
      margin-top: 8.5pt !important;
      margin-bottom: 4pt !important;
      padding-bottom: 1.5pt !important;
      border-bottom: 1px solid #000000 !important;
      color: #000000 !important;
      break-after: avoid !important;
      page-break-after: avoid !important;
    }}
    #resume-page-2 .resume-section:first-child .section-title {{
      margin-top: 0 !important;
    }}
    .resume-entry {{
      margin-bottom: 5.5pt !important;
      font-size: 8.75pt !important;
      line-height: 1.36 !important;
      color: #111111 !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }}
    .resume-entry:last-child {{
      margin-bottom: 0 !important;
    }}
    .resume-skills-block > div {{
      margin-bottom: 2pt !important;
      line-height: 1.36 !important;
    }}
    .resume-skills-block > div:last-child {{
      margin-bottom: 0 !important;
    }}
    .flex {{ display: flex; }}
    .flex-wrap {{ flex-wrap: wrap; }}
    .justify-center {{ justify-content: center; }}
    .justify-between {{ justify-content: space-between; }}
    .items-center {{ align-items: center; }}
    .items-baseline {{ align-items: baseline; }}
    .text-right {{ text-align: right; }}
    .text-center {{ text-align: center; }}
    .whitespace-nowrap {{ white-space: nowrap; }}
    .font-bold {{ font-weight: 700 !important; }}
    .font-semibold {{ font-weight: 600 !important; }}
    .italic {{ font-style: italic !important; }}
    ul.resume-list {{
      margin: 1.5pt 0 2pt 0 !important;
      padding-left: 13pt !important;
      list-style-type: disc !important;
    }}
    ul.resume-list li {{
      margin-bottom: 1.8pt !important;
      line-height: 1.34 !important;
      color: #111111 !important;
    }}
    ul.resume-list li:last-child {{
      margin-bottom: 0 !important;
    }}
    .resume-sheet-footer {{
      display: flex !important;
      justify-content: flex-end !important;
      align-items: flex-end !important;
      border-top: none !important;
      margin-top: 6pt !important;
      padding-top: 4pt !important;
      font-size: 8.5pt !important;
      color: #222222 !important;
    }}
    .resume-sheet-footer .page-number {{
      font-size: 8.5pt !important;
      color: #222222 !important;
    }}
  </style>
</head>
<body>
  <div id="cv-view">
    <!-- ==================== PAGE 1 ==================== -->
    <div class="resume-paper resume-a4-page" id="resume-page-1">
      <div class="resume-content-wrap">
        <!-- Print Header (Top Right Date & Time) -->
        <div class="resume-print-header">
          <span class="resume-print-datetime">{timestamp_str}</span>
        </div>

        <!-- Header Row -->
        <div class="resume-header text-center mb-4">
          <h1 class="resume-name uppercase">SIVAKORN KHUNDILOKRATTAYA</h1>
          <div class="resume-headline">Computer Engineering Student &bull; Aspiring Data Scientist &amp; ML Engineer</div>
          <div class="resume-contact flex flex-wrap justify-center items-center">
            <span>Bangkok, Thailand</span>
            <span class="pipe-sep">|</span>
            <a href="mailto:sivakorn.khun@gmail.com">sivakorn.khun@gmail.com</a>
            <span class="pipe-sep">|</span>
            <a href="https://github.com/svkhun" target="_blank" rel="noopener noreferrer">github.com/svkhun</a>
            <span class="pipe-sep">|</span>
            <a href="https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429" target="_blank" rel="noopener noreferrer">linkedin.com/in/sivakorn-khundilokrattaya-5870b8429</a>
            <span class="pipe-sep">|</span>
            <a href="https://svkhun.vercel.app" target="_blank" rel="noopener noreferrer">svkhun.vercel.app</a>
          </div>
        </div>

        <!-- Section 1: Education -->
        <div class="resume-section">
          <h2 class="section-title">EDUCATION</h2>
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="font-bold text-sm">Srinakharinwirot University (SWU)</span>
              <span class="text-xs text-right whitespace-nowrap">2024 &ndash; Present (Expected 2026)</span>
            </div>
            <div class="flex items-baseline justify-between mb-1">
              <span class="italic text-xs">Bachelor of Engineering in Computer Engineering</span>
              <span class="italic text-xs text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-xs">
              <li><strong class="font-bold">Honors &amp; Grants:</strong> Recipient of the NHK Spring (Thailand) Engineering Undergraduate Scholarship (30,000 THB/yr continuing grant, conferred Sept 2026).</li>
              <li>Specialization in Statistical Machine Learning, Financial Risk Modeling, and Distributed Data Engineering.</li>
            </ul>
          </div>
        </div>

        <!-- Section 2: Technical Skills & Competencies -->
        <div class="resume-section">
          <h2 class="section-title">TECHNICAL SKILLS &amp; COMPETENCIES</h2>
          <div class="resume-skills-block text-xs">
            <div>
              <strong class="font-bold">Languages:</strong> <span>Python (Expert), SQL (PostgreSQL, MySQL), C, C++, Java, R, Bash scripting.</span>
            </div>
            <div>
              <strong class="font-bold">ML &amp; Explainable AI:</strong> <span>Scikit-Learn, LightGBM, XGBoost, PyTorch Geometric (R-GCN), ONNX Runtime, SHAP (TreeExplainer), LIME, OptBinning, SMOTE-Tomek, Pandas, NumPy.</span>
            </div>
            <div>
              <strong class="font-bold">Data Engineering &amp; Tools:</strong> <span>PostgreSQL, MySQL, Apache Spark, Apache Airflow, Docker, FastAPI, Git, CI/CD pipelines.</span>
            </div>
            <div>
              <strong class="font-bold">Spoken Languages:</strong> <span>Thai (Native), English (B1+ Professional), Japanese (Elementary).</span>
            </div>
          </div>
        </div>

        <!-- Section 3: Featured Engineering Projects -->
        <div class="resume-section">
          <h2 class="section-title">FEATURED ENGINEERING PROJECTS</h2>

          <!-- Project 1: Credit Risk -->
          <div class="resume-entry mb-3">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">Enterprise Credit Risk Scoring &amp; Explainable AI (XAI)</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-xs">Python, LightGBM, SHAP, FastAPI, Docker &bull; Basel II/III Credit Decisioning Engine</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Engineered Weight of Evidence (WoE) and Information Value (IV) transformation pipeline to discretize continuous features into monotonic risk bins.</li>
              <li>Integrated SHAP TreeExplainer to compute exact local Shapley values, automatically generating legally defensible Adverse Action notices (ECOA/FCRA compliant).</li>
              <li>Deployed an asynchronous containerized FastAPI microservice delivering Probability of Default (PD) scoring with sub-50ms inference latency.</li>
            </ul>
          </div>

          <!-- Project 2: FlowSense & TrustGraph -->
          <div class="resume-entry mb-3">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">FlowSense &amp; TrustGraph &ndash; Autonomous Cashflow &amp; Graph Fraud Defense</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-xs">PyTorch Geometric (R-GCN), LightGBM, ONNX Runtime, FastAPI, React 18 &bull; KBTG Kampus Hackathon 2026</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Engineered FlowSense 30-day liquidity forecasting using LightGBM with rolling lag features, normal-dip alert suppression, and surplus-only micro-savings sweeps with 1-tap recall.</li>
              <li>Built TrustGraph pre-transfer fraud defense using Relational Graph Convolutional Networks (R-GCN) to embed account topology, executing sub-12ms P99 inference via ONNX Runtime (&lt;80ms SLA).</li>
              <li>Formulated target-specific explainable risk factors (e.g., dormant account reactivation, transaction velocity surges) paired with a 5-second facial liveness micro-authentication gateway.</li>
            </ul>
          </div>

          <!-- Project 3: Shopee Smart COD -->
          <div class="resume-entry mb-3">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">Shopee Smart COD Reliability &amp; Dynamic Decisioning Engine</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-xs">Python, Scikit-Learn, Random Forest, FastAPI, Vanilla JS &bull; Shopee Ultimate Case Challenge (SUCC 2026)</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Developed calibrated Random Forest ML pipeline (0.8629 ROC-AUC, 0.3722 PR-AUC, 0.0208 Brier score) across 50,000 synthetic orders / 12,000 buyer profiles to predict COD failure probabilities.</li>
              <li>Statistically verified 10.6&times; COD failure risk concentration via two-proportion Z-tests (z=24.42, p &lt; 0.001), translating failure probabilities into an adaptive 0&ndash;100 buyer Reliability Score.</li>
              <li>Architected 4-tier checkout policy (Grade A 1-click COD to Grade D 30% deposit) with dynamic feedback loops (+8/-20 pts) and EasySell fraud checks on an interactive smartphone simulator.</li>
            </ul>
          </div>

          <!-- Project 4: LOD -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">Long Overdue Debtor (LOD) Classification System</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">Dec 2025</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-xs">LightGBM, XGBoost, Scikit-Learn &bull; Aihack Thailand 2025 National Finalist</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Formulated temporal delinquency velocity ratios and revolving limit exhaustion slopes across 32,524 train / 8,619 test blind split samples.</li>
              <li>Conducted 5-Fold Stratified Cross-Validation on tuned LightGBM and XGBoost ensembles, achieving 0.894 ROC-AUC and placing in the National Finalist tier.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Page 1 Sheet Footer -->
      <div class="resume-sheet-footer">
        <span class="page-number">1 / 2</span>
      </div>
    </div>

    <!-- ==================== PAGE 2 ==================== -->
    <div class="resume-paper resume-a4-page" id="resume-page-2">
      <div class="resume-content-wrap">
        <!-- Print Header (Top Right Date & Time) -->
        <div class="resume-print-header">
          <span class="resume-print-datetime">{timestamp_str}</span>
        </div>

        <!-- Section 4: Hackathons & Competitions -->
        <div class="resume-section">
          <h2 class="section-title">COMPETITIVE HACKATHONS &amp; INDUSTRY CHALLENGES</h2>

          <!-- Entry 1: KBTG Kampus Hackathon 2026 -->
          <div class="resume-entry mb-2.5">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">KBTG Kampus Hackathon 2026 &ndash; Track 2 Lead (Data Science &amp; Intelligence)</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="italic text-xs">Kasikorn Business-Technology Group (KBTG) &bull; Status: Advanced to Next Round</span>
              <span class="italic text-xs text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Spearheaded data intelligence architecture for K PLUS, connecting FlowSense cashflow projection and TrustGraph relational fraud screening.</li>
              <li>Designed R-GCN graph neural network embeddings with ONNX Runtime sub-12ms P99 inference, modeling projected 1.2B&ndash;2.0B THB in CASA deposit mobilization and &gt;85% fraud interdiction.</li>
            </ul>
          </div>

          <!-- Entry 2: Shopee Ultimate Case Challenge 2026 -->
          <div class="resume-entry mb-2.5">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">Shopee Ultimate Case Challenge (SUCC) 2026 &ndash; Lead Data Scientist &amp; Product Architect</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="italic text-xs">Shopee Thailand Operations &amp; Logistics Strategy Track</span>
              <span class="italic text-xs text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Designed end-to-end data science and decisioning platform to reduce failed Cash-on-Delivery (COD) orders and reverse logistics return-to-origin (RTO) waste.</li>
              <li>Built full-stack interactive smartphone shopping simulator and FastAPI portal modeling 3.58M THB in potential monthly savings through 4-tier risk grading and delivery window scheduling.</li>
            </ul>
          </div>

          <!-- Entry 3: AIRA & AIFUL / Aihack Thailand 2025 -->
          <div class="resume-entry mb-2.5">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">AIRA &amp; AIFUL / Aihack Thailand 2025 National Finalist</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">Dec 2025</span>
            </div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="italic text-xs">Chulalongkorn Business School &times; ProbSpace</span>
              <span class="italic text-xs text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-xs">
              <li><strong class="font-bold">Role &amp; Contribution:</strong> Machine Learning &amp; Financial Risk Modeling Lead on ~40,000 real-world consumer loan samples.</li>
              <li><strong class="font-bold">Technical Rigor:</strong> Built leak-free temporal feature matrices, handling class imbalance (1:12 default ratio) with SMOTE-Tomek and target encoding (0.894 ROC-AUC).</li>
              <li><strong class="font-bold">Executive Pitch:</strong> Solved Question Sheet balancing default risk reduction against interest margin profitability, pitching to C-level executives.</li>
            </ul>
          </div>

          <!-- Entry 4: True Innovation Launchpad -->
          <div class="resume-entry mb-2.5">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">True Innovation Launchpad 2026 &ndash; AI &amp; Data Science Lead</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">Jan 2026</span>
            </div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="italic text-xs">True Corporation Healthcare Innovation Track (Team Nakphatthana Tuapralat)</span>
              <span class="italic text-xs text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Spearheaded data strategy and predictive modeling for elderly frailty prevention, developing sub-30ms clinical risk scoring APIs (GuardianAI).</li>
            </ul>
          </div>

          <!-- Entry 5: Geospatial Intelligence & LINE MAN -->
          <div class="resume-entry mb-2.5">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">GISTDA Spatial Resilience Hackathon &amp; LINE MAN Case Competition</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">2024 &ndash; 2026</span>
            </div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="italic text-xs">Spatial Lead (GISTDA Rain-to-Flood 30m Mapping) &bull; Growth Lead (LINE MAN Wongnai 8.87 THB CAC)</span>
              <span class="italic text-xs text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-xs">
              <li>Built "Rain-to-Flood" spatial model fusing Sentinel-1 SAR, DEM, and precipitation APIs; formulated LINE MAN campus unit economics campaign acquiring 462 VIP trial users.</li>
            </ul>
          </div>
        </div>

        <!-- Section 5: Industry Certifications & Assessments -->
        <div class="resume-section">
          <h2 class="section-title">INDUSTRY CERTIFICATIONS &amp; STANDARDIZED ASSESSMENTS</h2>

          <!-- KBTG Data Analyst -->
          <div class="resume-entry mb-2">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">Data Analyst Assessment (STAMP) &ndash; Score: 97/150 (Intermediate)</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">March 2026</span>
            </div>
            <div class="italic text-xs mb-0.5">
              SKILLKAMP by KBTG (Kasikorn Business-Technology Group) &bull; Benchmark: 90
            </div>
            <ul class="resume-list text-xs">
              <li><strong class="font-bold">Core Scores:</strong> Data Cleaning &amp; Preprocessing: 23.00/30 | EDA &amp; Viz: 20.00/30 | ML for Analysts: 18.00/30 | Foundations: 20.00/30</li>
            </ul>
          </div>

          <!-- KBTG Digital Marketer -->
          <div class="resume-entry mb-2">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">Digital and Performance Marketer Assessment (STAMP) &ndash; Score: 98/150 (Intermediate)</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">March 2026</span>
            </div>
            <div class="italic text-xs mb-0.5">
              SKILLKAMP by KBTG &bull; Benchmark: 94
            </div>
            <ul class="resume-list text-xs">
              <li><strong class="font-bold">Top Performer:</strong> Digital Marketing Analytics: 26.00/30 (Benchmark: 17.94) | Data-Driven Marketing: 21.00/30 | Content: 19.00/30.</li>
            </ul>
          </div>

          <!-- Oxford / AUA -->
          <div class="resume-entry mb-2">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-sm">Oxford Placement Test &ndash; Score: 51/120 (CEFR B1+ Professional)</strong>
              <span class="text-xs text-right whitespace-nowrap ml-2">June 2026</span>
            </div>
            <div class="italic text-xs mb-0.5">
              AUA Language Center / Oxford University Press
            </div>
            <ul class="resume-list text-xs">
              <li>Grammar &amp; Use of English: 50.88 (B1) | Listening Proficiency: 51.12 (B1) &ndash; Verified professional working proficiency in English.</li>
            </ul>
          </div>
        </div>

        <!-- Section 6: Coursework & Software Engineering Discipline -->
        <div class="resume-section">
          <h2 class="section-title">COURSEWORK &amp; SOFTWARE ENGINEERING DISCIPLINE</h2>
          <div class="resume-entry text-xs">
            <div class="mb-1">
              <strong class="font-bold">Core Coursework:</strong> <span>Machine Learning, Database Systems, Operating Systems, Statistical Methods for Engineers, Software Engineering, Data Structures &amp; Algorithms, Computer Networks.</span>
            </div>
            <div>
              <strong class="font-bold">Engineering Discipline:</strong> <span>Adheres to PEP-8 style standards, modular OOP pipeline design, reproducible containerized Docker environments, and zero black-box deployments without local feature attribution.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Page 2 Sheet Footer -->
      <div class="resume-sheet-footer">
        <span class="page-number">2 / 2</span>
      </div>
    </div>
  </div>
</body>
</html>
"""

# =========================================================================
# 2. GENERATE RESUME HTML (1 Page - Calibrated for Perfect Single Page)
# =========================================================================

res_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
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
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 8.25pt;
      line-height: 1.30;
      color: #000000;
    }}
    .resume-paper, .resume-a4-page {{
      position: relative !important;
      width: 210mm !important;
      height: 297mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;
      max-height: 297mm !important;
      margin: 0 !important;
      padding: 8.5mm 13.5mm 8mm 13.5mm !important;
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
    .resume-print-header {{
      display: block !important;
      text-align: right !important;
      font-size: 7.2pt !important;
      color: #334155 !important;
      margin-bottom: 0.8mm !important;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
    }}
    h1, .resume-name {{
      font-size: 19pt !important;
      font-weight: 700 !important;
      line-height: 1.12 !important;
      letter-spacing: -0.01em !important;
      text-align: center !important;
      margin: 0 0 1.5pt 0 !important;
      color: #000000 !important;
    }}
    .resume-headline {{
      font-size: 8.5pt !important;
      font-weight: 400 !important;
      text-align: center !important;
      margin: 0 0 1.5pt 0 !important;
      color: #111111 !important;
    }}
    .resume-contact {{
      font-size: 7.8pt !important;
      line-height: 1.32 !important;
      text-align: center !important;
      margin: 0 0 2pt 0 !important;
      color: #222222 !important;
    }}
    .resume-contact a {{
      color: #222222 !important;
      text-decoration: none !important;
    }}
    .resume-contact .pipe-sep {{
      color: #666666 !important;
      margin: 0 4.5px !important;
    }}
    h2, .section-title {{
      font-size: 9pt !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.04em !important;
      margin-top: 5pt !important;
      margin-bottom: 2pt !important;
      padding-bottom: 1pt !important;
      border-bottom: 1px solid #000000 !important;
      color: #000000 !important;
      break-after: avoid !important;
      page-break-after: avoid !important;
    }}
    .resume-entry {{
      margin-bottom: 3.5pt !important;
      font-size: 8.2pt !important;
      line-height: 1.30 !important;
      color: #111111 !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }}
    .resume-entry:last-child {{
      margin-bottom: 0 !important;
    }}
    .grid-skill-row {{
      display: flex;
      align-items: baseline;
      margin-bottom: 1.2pt;
      line-height: 1.30;
    }}
    .grid-skill-row strong {{
      min-width: 135px;
      flex-shrink: 0;
    }}
    .flex {{ display: flex; }}
    .flex-wrap {{ flex-wrap: wrap; }}
    .justify-center {{ justify-content: center; }}
    .justify-between {{ justify-content: space-between; }}
    .items-center {{ align-items: center; }}
    .items-baseline {{ align-items: baseline; }}
    .text-right {{ text-align: right; }}
    .text-center {{ text-align: center; }}
    .whitespace-nowrap {{ white-space: nowrap; }}
    .font-bold {{ font-weight: 700 !important; }}
    .font-semibold {{ font-weight: 600 !important; }}
    .italic {{ font-style: italic !important; }}
    ul.resume-list {{
      margin: 1pt 0 1.5pt 0 !important;
      padding-left: 11pt !important;
      list-style-type: disc !important;
    }}
    ul.resume-list li {{
      margin-bottom: 1pt !important;
      line-height: 1.27 !important;
      color: #111111 !important;
    }}
    ul.resume-list li:last-child {{
      margin-bottom: 0 !important;
    }}
  </style>
</head>
<body>
  <div id="resume-view">
    <div class="resume-paper resume-a4-page" id="resume-page-single">
      <div class="resume-content-wrap">
        <!-- Print Header (Top Right Date & Time) -->
        <div class="resume-print-header">
          <span class="resume-print-datetime">{timestamp_str}</span>
        </div>

        <!-- Header Row -->
        <div class="resume-header text-center mb-1.5">
          <h1 class="resume-name">Sivakorn Khundilokrattaya</h1>
          <div class="resume-headline">Computer Engineering Student &bull; Aspiring Data Scientist &amp; ML Engineer</div>
          <div class="resume-contact flex flex-wrap justify-center items-center">
            <span>Bangkok, Thailand</span>
            <span class="pipe-sep">|</span>
            <a href="mailto:sivakorn.khun@gmail.com">sivakorn.khun@gmail.com</a>
            <span class="pipe-sep">|</span>
            <a href="https://svkhun.vercel.app" target="_blank" rel="noopener noreferrer">svkhun.vercel.app</a>
          </div>
          <div class="resume-contact flex flex-wrap justify-center items-center">
            <span>GitHub: <a href="https://github.com/svkhun" target="_blank" rel="noopener noreferrer">svkhun</a></span>
            <span class="pipe-sep">|</span>
            <span>LinkedIn: <a href="https://linkedin.com/in/sivakorn-khundilokrattaya-5870b8429" target="_blank" rel="noopener noreferrer">sivakorn-khundilokrattaya</a></span>
          </div>
        </div>

        <!-- Section 1: EDUCATION -->
        <div class="resume-section">
          <h2 class="section-title">EDUCATION</h2>
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="font-bold text-[12.8px]">Srinakharinwirot University (SWU)</span>
              <span class="text-[10.5px] text-right whitespace-nowrap">2024 &ndash; Present (Expected 2026)</span>
            </div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="italic text-[10.5px]">Bachelor of Engineering in Computer Engineering</span>
              <span class="italic text-[10.5px] text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Specialization: Statistical Machine Learning, Financial Risk Modeling, and Distributed Data Engineering.</li>
              <li>Honors &amp; Coursework: NHK Spring (Thailand) Scholarship Recipient (30K THB/yr grant, conferred Sept 2026) &bull; Machine Learning, Database Systems.</li>
            </ul>
          </div>
        </div>

        <!-- Section 2: TECHNICAL SKILLS & COMPETENCIES -->
        <div class="resume-section">
          <h2 class="section-title">TECHNICAL SKILLS &amp; COMPETENCIES</h2>
          <div class="resume-skills-block text-[10.5px]">
            <div class="grid-skill-row">
              <strong class="font-bold">Programming:</strong>
              <span>Python (Expert), SQL (PostgreSQL, MySQL), C, C++, Java, R, Bash scripting</span>
            </div>
            <div class="grid-skill-row">
              <strong class="font-bold">Machine Learning &amp; XAI:</strong>
              <span>LightGBM, XGBoost, Scikit-Learn, PyG (R-GCN), ONNX Runtime, SHAP, LIME, OptBinning, Pandas, NumPy</span>
            </div>
            <div class="grid-skill-row">
              <strong class="font-bold">Data Eng &amp; DevOps:</strong>
              <span>Apache Spark, Apache Airflow, Docker, FastAPI, PostgreSQL, Git, CI/CD pipelines</span>
            </div>
            <div class="grid-skill-row">
              <strong class="font-bold">Languages &amp; Ethics:</strong>
              <span>Thai (Native), English (B1+ Professional), Japanese (Elementary) &bull; Clean OOP, PEP-8</span>
            </div>
          </div>
        </div>

        <!-- Section 3: FEATURED ENGINEERING PROJECTS -->
        <div class="resume-section">
          <h2 class="section-title">FEATURED ENGINEERING PROJECTS</h2>

          <!-- Project 1: FlowSense & TrustGraph -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">FlowSense &amp; TrustGraph &ndash; FinTech Cashflow &amp; Graph Fraud Defense</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-[10.5px]">PyTorch Geometric (R-GCN), LightGBM, ONNX Runtime, FastAPI, React 18 &bull; KBTG Kampus Hackathon 2026</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Built R-GCN graph neural network embeddings with ONNX Runtime sub-12ms P99 inference for real-time mule account screening.</li>
              <li>Deployed 30-day liquidity forecasting with normal-dip alert suppression and surplus-only micro-savings sweeps with 1-tap undo.</li>
            </ul>
          </div>

          <!-- Project 2: Shopee Smart COD -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">Shopee Smart COD Reliability &amp; Dynamic Decisioning Engine</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-[10.5px]">Python, Scikit-Learn, Random Forest, FastAPI, Vanilla JS &bull; Shopee Ultimate Case Challenge (SUCC 2026)</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Trained calibrated Random Forest pipeline (0.8629 ROC-AUC, 0.3722 PR-AUC) on 50,000 synthetic orders to predict COD delivery failures.</li>
              <li>Designed 4-tier checkout risk policy (Grade A 1-click COD to Grade D 30% deposit) and dynamic scorecard (+8/-20 pts feedback).</li>
            </ul>
          </div>

          <!-- Project 3: Credit Risk -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">Enterprise Credit Risk Scoring &amp; Explainable AI (XAI)</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-[10.5px]">Python, LightGBM, SHAP, FastAPI, Docker &bull; Basel II/III Credit Decisioning Engine</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Constructed WoE and Information Value (IV) transformation pipelines to discretize financial attributes into monotonic risk bins.</li>
              <li>Integrated SHAP TreeExplainer for ECOA/FCRA Adverse Action notices; containerized FastAPI microservice with &lt;50ms PD scoring.</li>
            </ul>
          </div>

          <!-- Project 4: LOD -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">Long Overdue Debtor (LOD) Classification System</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">Dec 2025</span>
            </div>
            <div class="mb-0.5">
              <span class="italic text-[10.5px]">LightGBM, XGBoost, Scikit-Learn &bull; Aihack Thailand 2025 National Finalist</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Formulated temporal velocity ratios and credit exhaustion slopes across ~40,000 records; achieved 0.894 ROC-AUC via 5-Fold CV.</li>
            </ul>
          </div>
        </div>

        <!-- Section 4: COMPETITIVE HACKATHONS & INDUSTRY CHALLENGES -->
        <div class="resume-section">
          <h2 class="section-title">COMPETITIVE HACKATHONS &amp; INDUSTRY CHALLENGES</h2>

          <!-- Entry 1: KBTG -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">KBTG Kampus Hackathon 2026 &ndash; Track 2 Lead (Data Science &amp; Intelligence)</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="italic text-[10.5px]">Kasikorn Business-Technology Group (KBTG) &bull; Status: Advanced to Next Round</span>
              <span class="italic text-[10.5px] text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Formulated FlowSense cashflow forecasting and TrustGraph pre-transfer fraud defense, projecting 1.2B&ndash;2.0B THB CASA deposit impact.</li>
            </ul>
          </div>

          <!-- Entry 2: SUCC -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">Shopee Ultimate Case Challenge (SUCC) 2026 &ndash; Lead Data Scientist &amp; Product Architect</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="italic text-[10.5px]">Shopee Thailand Operations Strategy Track &bull; Interactive Mobile Shopping Simulator</span>
              <span class="italic text-[10.5px] text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Validated 10.6&times; COD failure risk concentration (z=24.42, p &lt; 0.001), modeling 3.58M THB monthly savings from 58% RTO reduction.</li>
            </ul>
          </div>

          <!-- Entry 3: AIRA & AIFUL -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">AIRA &amp; AIFUL / Aihack Thailand 2025 &ndash; National Finalist</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">Dec 2025</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="italic text-[10.5px]">Machine Learning &amp; Financial Risk Modeling Lead &bull; Chulalongkorn Business School &times; ProbSpace</span>
              <span class="italic text-[10.5px] text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
            <ul class="resume-list text-[10.5px]">
              <li>Handled 1:12 default imbalance using SMOTE-Tomek; pitched default risk reduction vs. interest margin profitability to C-level executives.</li>
            </ul>
          </div>

          <!-- Entry 4: True & GISTDA -->
          <div class="resume-entry">
            <div class="flex items-baseline justify-between mb-0.5">
              <strong class="font-bold text-[12px]">True Innovation Launchpad &amp; GISTDA Spatial Resilience Hackathons</strong>
              <span class="text-[10.5px] text-right whitespace-nowrap ml-2">2026</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="italic text-[10.5px]">AI Lead (True Healthcare Frailty Prevention APIs) &bull; Spatial Lead (GISTDA Rain-to-Flood 30m Mapping)</span>
              <span class="italic text-[10.5px] text-right whitespace-nowrap">Bangkok, Thailand</span>
            </div>
          </div>
        </div>

        <!-- Section 5: CERTIFICATIONS & STANDARDIZED ASSESSMENTS -->
        <div class="resume-section">
          <h2 class="section-title">CERTIFICATIONS &amp; STANDARDIZED ASSESSMENTS</h2>
          <div class="resume-entry text-[10.5px] space-y-0.5">
            <div>
              <strong class="font-bold">SKILLKAMP by KBTG:</strong> Data Analyst (STAMP) Score: <strong class="font-bold">97/150</strong> (Benchmark: 90) &bull; Digital Marketer Score: <strong class="font-bold">98/150</strong> (Benchmark: 94)
            </div>
            <div>
              <strong class="font-bold">Oxford Placement Test:</strong> CEFR B1+ Professional (Score: <strong class="font-bold">51/120</strong> &ndash; Listening: 51.12, Grammar: 50.88; AUA / Oxford)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
"""

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

subprocess.run(cmd_cv, check=True)
subprocess.run(cmd_res, check=True)

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
print(f"[OK] Deployed updated Resume to: {assets_res}")

# Deploy to Downloads/Resume&CV if available
if os.path.exists(DOWNLOADS_DIR):
    shutil.copyfile(cv_pdf, os.path.join(DOWNLOADS_DIR, "Sivakorn_Khundilokrattaya_CV.pdf"))
    shutil.copyfile(res_pdf, os.path.join(DOWNLOADS_DIR, "Sivakorn_Khundilokrattaya_Resume.pdf"))
    print(f"[OK] Deployed copies to Downloads: {DOWNLOADS_DIR}")

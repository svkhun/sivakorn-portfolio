/**
 * Internationalization (i18n) Engine for Sivakorn Khundilokrattaya's Portfolio
 * Features: Seamless English / Thai switching, localStorage persistence, browser language auto-detection,
 * and dynamic text + HTML node updates with smooth transitions.
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
    en: {
      // Navbar
      nav_status: 'Open to DS / ML Roles',
      nav_about: 'About',
      nav_projects: 'Projects',
      nav_competitions: 'Competitions',
      nav_stack: 'Stack',
      nav_contact: 'Contact',
      nav_resume: 'Resume',

      // Hero
      hero_meta: 'Computer Engineering @ Srinakharinwirot University (SWU)',
      hero_identity: 'Aspiring Data Scientist & Machine Learning Engineer',
      hero_specialty: 'Specializing in Explainable AI (XAI), Financial Risk Scoring, and Industrial Data Pipelines.',
      hero_cta_projects: 'Explore Featured Projects',
      hero_cta_terminal: 'Quick Terminal',

      // Metrics Strip
      metrics_comp_sub: 'Competitions & Hackathons',
      metrics_comp_desc: 'Cross-Domain Modeling & Strategy',
      metrics_comp_chip: 'FinTech, HealthTech, Spatial & Growth',

      metrics_fin_sub: 'Financial Data Points',
      metrics_fin_desc: 'Real Enterprise Credit Records',
      metrics_fin_chip: 'Ingestion, Binning & Blind AUC Splits',

      metrics_geo_sub: 'Spatial Pipeline Resolution',
      metrics_geo_desc: 'Multi-Source Remote Sensing',
      metrics_geo_chip: 'Sentinel-1 SAR & Copernicus DEM',

      metrics_inf_sub: 'API Inference Latency',
      metrics_inf_desc: 'High-Throughput Model Serving',
      metrics_inf_chip: 'FastAPI, Docker & Dashboards',

      // About
      about_tag: 'About Me',
      about_title: 'Engineering Intelligence from Data',
      about_desc: 'Balancing software engineering discipline with statistical machine learning and financial regulatory compliance.',
      about_lead: 'I am a Computer Engineering student at Srinakharinwirot University (SWU) passionate about transforming transactional credit records into transparent predictive intelligence.',
      about_p: 'In credit risk underwriting, black-box models present severe regulatory hurdles. My work focuses on <strong>Probability of Default (PD) estimation, Weight of Evidence (WoE) binning, and Explainable AI (XAI)</strong> that delivers legally defensible adverse action notices alongside high ROC-AUC scores.',
      about_pillar1_title: 'Credit Risk & Basel Alignment',
      about_pillar1_desc: 'WoE/IV feature binning, probability of default (PD) estimation, and scorecard scaling.',
      about_pillar2_title: 'Explainable AI (XAI) & Compliance',
      about_pillar2_desc: 'SHAP TreeExplainer waterfall plots and automated adverse action rejection reasons.',
      about_pillar3_title: 'Scalable Data Pipelines & Ops',
      about_pillar3_desc: 'PostgreSQL, MySQL, Apache Spark, Airflow orchestration, and Dockerized microservices.',
      about_methodology_hdr: '// END-TO-END METHODOLOGY & PIPELINE DISCIPLINE',
      about_edu_hdr: 'Academic Credentials',
      about_edu_degree: 'B.Eng. in Computer Engineering',
      about_kbtg_hdr: '// INDUSTRY ASSESSMENTS & CERTIFICATIONS',
      kbtg_view_report: 'View KBTG Score Report ↗',
      about_lang_hdr: 'Languages',
      about_lang_th: 'Native',
      about_lang_en: 'B1+ Professional',
      about_lang_en_btn: 'View Score PDF ↗',
      about_lang_jp: 'Beginner',
      about_edu_status: 'Active Enrollment',

      // Featured Projects
      projects_tag: '// PRODUCTION ARCHITECTURES',
      projects_title: 'Flagship Engineering & Applied ML',
      projects_desc: 'End-to-end pipelines bridging regulatory credit risk scoring, clinical frailty diagnostics, and automated manufacturing telemetry.',
      
      proj1_domain: '[ FinTech / Credit Risk Modeling ]',
      proj1_chip: 'Aihack 2025 Finalist • Top 8 • 40k+ Records',
      proj1_title: 'Long Overdue Debtor (LOD) Classification System',
      proj1_summary: 'Production machine learning pipeline predicting 90+ day default risks on real consumer loans. Optimized ROC-AUC on ProbSpace across Public and Private blind test splits under strict time constraints.',
      proj1_btn: 'Inspect Architecture',
      proj1_sandbox: 'ROC Sandbox',

      proj2_domain: '[ HealthTech / Preventive Healthcare ]',
      proj2_chip: 'True Innovation Launchpad 2026 • AI & Data Lead',
      proj2_title: 'GuardianAI – Clinical Frailty Risk Dashboard',
      proj2_summary: 'Elderly frailty evaluation platform combining calibrated XGBoost models with Explainable AI (SHAP) for transparent clinical factor attribution, served via low-latency FastAPI.',
      proj2_btn: 'Inspect Architecture',
      proj2_sandbox: 'Clinical SHAP Demo',

      proj3_domain: '[ Banking Intelligence / White-Box ML ]',
      proj3_chip: 'Basel Framework Aligned • Probability of Default',
      proj3_title: 'Enterprise Credit Risk Scoring & Explainable AI (XAI)',
      proj3_summary: 'End-to-end regulatory credit scorecard system utilizing Weight of Evidence (WoE) binning, LightGBM, and SHAP/LIME dual-layer interpretability.',
      proj3_btn: 'Inspect Architecture',
      proj3_sandbox: 'Scorecard Matrix',

      proj4_domain: '[ Industrial IoT / Data Engineering ]',
      proj4_chip: 'Dockerized Pipeline • Real-Time OEE • Automated ETL',
      proj4_title: 'Manufacturing (MFG) Telemetry Pipeline & OEE Analytics',
      proj4_summary: 'End-to-end industrial data engineering architecture simulating IIoT sensor telemetry, executing automated batch ETL pipelines, and streaming real-time anomaly detection for Overall Equipment Effectiveness (OEE) tracking.',
      proj4_btn: 'Inspect Architecture',
      proj4_sandbox: 'OEE Live Logs',

      // Stack
      stack_tag: 'Technical Arsenal',
      stack_title: 'Dual-Track Infinite Marquee',
      stack_desc: 'A continuous, smooth-flowing engineering stack. Hover over any technology badge to pause the stream and inspect its exact production usage across my projects.',
      filter_all: 'All Stack',
      filter_lang: 'Core Languages',
      filter_ml: 'ML & XAI',
      filter_data: 'Data Engineering & Cloud',
      filter_tools: 'Analytics & Tools',

      // Competitions
      comp_tag: 'Competitions & Hackathons',
      comp_title: 'Hackathons & Competitions',
      comp_desc: 'Demonstrated machine learning modeling on enterprise datasets, explainable healthcare architectures, geospatial risk pipelines, and data-driven business strategy.',

      comp1_title: 'Aihack Thailand 2025 (Final Round Finalist)',
      comp1_tag: 'National Finalist (Top 8)',
      comp1_org: 'Organized by AIRA & AIFUL, Chulalongkorn Business School, and ProbSpace',
      comp1_role_hdr: 'Role & Contribution:',
      comp1_role_desc: 'Machine Learning & Risk Modeling Lead. Ingested and preprocessed enterprise consumer loan records (~40,000 samples) to predict Long Overdue Debtors (LOD, overdue >90 days past 12-month tenure).',
      comp1_tech_hdr: 'Technical Execution:',
      comp1_tech_desc: 'Engineered temporal repayment velocity ratios, cross-validated tabular features with LightGBM/XGBoost, and optimized ROC-AUC across Public and blind Private test splits within strict submission quotas.',
      comp1_biz_hdr: 'Business Impact:',
      comp1_biz_desc: 'Solved the comprehensive Question Sheet balancing default risk exposure against loan interest profit margins, successfully qualifying into the top 8 pitching finalists.',
      comp1_recog: '<strong>Official Recognition:</strong> Awarded Certificate of Participation for attending the Final Round at Jaiyossompati Building 3, signed by <strong>Shinichiro Okuyama</strong> (Managing Executive Officer, AIFUL CORPORATION).',
      comp1_cert_btn: 'View Official Certificate ↗',

      comp2_title: 'True Innovation Launchpad 2026 – "GuardianAI"',
      comp2_tag: 'Team Nakphatthana Tuapralat',
      comp2_org: 'True Corporation • Healthcare AI & Preventive Clinical Analytics',
      comp2_role_hdr: 'Role & Contribution:',
      comp2_role_desc: 'AI & Data Science Lead. Headed the end-to-end predictive healthcare architecture for early elderly frailty risk intervention.',
      comp2_tech_hdr: 'Technical Execution:',
      comp2_tech_desc: 'Developed calibrated machine learning classification pipelines (XGBoost, Scikit-Learn) on multidimensional biometric and lifestyle indicators. Integrated Explainable AI via SHAP to extract localized feature importance, providing medical professionals with interpretable diagnostic reasoning.',
      comp2_sys_hdr: 'System Delivery:',
      comp2_sys_desc: 'Designed the low-latency model inference service using FastAPI, streaming real-time frailty risk scores and personalized preventive care recommendations into the interactive clinical dashboard.',

      comp3_title: 'Geospatial Intelligence for Resilience Hackathon 2026',
      comp3_tag: 'Team Witsawa Tuapralat',
      comp3_org: 'GISTDA • KMITL • KMUTT • Remote Sensing & Disaster Resilience',
      comp3_role_hdr: 'Role & Contribution:',
      comp3_role_desc: 'Spatial Data Scientist & Machine Learning Modeler (1st Member/Lead).',
      comp3_tech_hdr: 'Technical Execution:',
      comp3_tech_desc: 'Developed the mathematical framework and machine learning pipeline for the "Rain-to-Flood Probability Model", training on historical disaster inventories with Random Forest and Logistic Regression.',
      comp3_pipe_hdr: 'Spatial Pipeline:',
      comp3_pipe_desc: 'Ingested multi-source remote sensing data via GISTDA Sphere—fusing Sentinel-1 SAR soil moisture rasters, Copernicus GLO-30 DEM slope calculations, and national precipitation APIs to map flash flood probabilities at 30m resolution across upper Nan river basins.',

      comp4_title: 'LINE MAN Wongnai Junior Case Competition',
      comp4_tag: 'Team LC (Low Cortisol)',
      comp4_org: 'LINE MAN Wongnai • Platform Economics & Campus Growth',
      comp4_role_hdr: 'Role & Contribution:',
      comp4_role_desc: 'Strategic Growth & Unit Economics Lead.',
      comp4_prob_hdr: 'Problem Solving:',
      comp4_prob_desc: 'Analyzed campus dining bottlenecks (11:30–13:30 peak cafeteria wait times, group delivery cost friction) and pitched targeted LINE MAN VIP solutions including pre-ordering, shared cart routing, and peak-hour delivery fee waivers.',
      comp4_fin_hdr: 'Campaign & Financial Modeling:',
      comp4_fin_desc: 'Architected the "Silent Mission Booth" experiential acquisition campaign within a strict 8,000 THB budget cap. Modeled reward unit economics (14-day VIP trial conversion at 8.87 THB/user), successfully structuring incentives to acquire 462 student trial conversions.',

      // Footer
      footer_title: "Let's Connect",
      footer_subtitle: 'Seeking full-time Data Scientist, Machine Learning Engineer, and Data Engineering roles.',
      footer_resume_btn: 'View Full Resume / CV',
      footer_resume_tooltip: 'Opens PDF in new tab • Updated 2026',
      footer_email_btn: 'Send Direct Email',
      footer_copy_btn: 'Copy Email',
      footer_copied: 'Copied!',
      footer_copyright: '© 2026 Sivakorn Khundilokrattaya. Crafted with minimalist engineering standards.'
    },

    th: {
      // Navbar
      nav_status: 'พร้อมรับตำแหน่งงาน DS / ML',
      nav_about: 'เกี่ยวกับ',
      nav_projects: 'ผลงาน',
      nav_competitions: 'การแข่งขัน',
      nav_stack: 'เครื่องมือ',
      nav_contact: 'ติดต่อ',
      nav_resume: 'เรซูเม่',

      // Hero
      hero_meta: 'วิศวกรรมคอมพิวเตอร์ @ มหาวิทยาลัยศรีนครินทรวิโรฒ (มศว)',
      hero_identity: 'มุ่งมั่นในสายงาน Data Science & Machine Learning',
      hero_specialty: 'เชี่ยวชาญด้าน Explainable AI (XAI), การประเมินความเสี่ยงทางการเงิน และไปป์ไลน์ข้อมูลอุตสาหกรรม',
      hero_cta_projects: 'ดูผลงานเด่น',
      hero_cta_terminal: 'เปิดเทอร์มินัล',

      // Metrics Strip
      metrics_comp_sub: 'การแข่งขันและแฮกกาธอน',
      metrics_comp_desc: 'การแก้ปัญหาและวางกลยุทธ์ข้ามสายงาน',
      metrics_comp_chip: 'FinTech, HealthTech, Spatial & การเติบโต',

      metrics_fin_sub: 'ชุดข้อมูลทางการเงิน',
      metrics_fin_desc: 'ข้อมูลเครดิตองค์กรจริง',
      metrics_fin_chip: 'Ingestion, Binning & การประเมิน Blind AUC',

      metrics_geo_sub: 'ความละเอียดข้อมูลเชิงพื้นที่',
      metrics_geo_desc: 'การประมวลผลข้อมูลระยะไกลหลากแหล่ง',
      metrics_geo_chip: 'Sentinel-1 SAR & Copernicus DEM',

      metrics_inf_sub: 'ความเร็วการประมวลผล API',
      metrics_inf_desc: 'ระบบประมวลผลความเร็วสูง',
      metrics_inf_chip: 'FastAPI, Docker & แดชบอร์ด',

      // About
      about_tag: 'เกี่ยวกับฉัน',
      about_title: 'สร้างสรรค์ระบบอัจฉริยะจากข้อมูล',
      about_desc: 'ผสานหลักวิศวกรรมซอฟต์แวร์เข้ากับสถิติ Machine Learning และมาตรฐานการกำกับดูแลทางการเงิน',
      about_lead: 'ผมเป็นนิสิตวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยศรีนครินทรวิโรฒ (มศว) ที่มุ่งมั่นในการเปลี่ยนข้อมูลธุรกรรมสินเชื่อให้เป็นระบบพยากรณ์ที่โปร่งใสและตรวจสอบได้',
      about_p: 'ในการประเมินความเสี่ยงสินเชื่อ โมเดลแบบกล่องดำ (Black-box) มักติดข้อจำกัดด้านกฎระเบียบ งานของผมมุ่งเน้นที่ <strong>การประเมิน Probability of Default (PD), การจัดกลุ่มตัวแปรด้วย Weight of Evidence (WoE) และ Explainable AI (XAI)</strong> เพื่อสร้างเอกสารปฏิเสธสินเชื่อ (Adverse Action) ที่ชอบธรรมตามกฎหมายควบคู่กับคะแนน ROC-AUC ระดับสูง',
      about_pillar1_title: 'ความเสี่ยงสินเชื่อ & มาตรฐานบาเซิล',
      about_pillar1_desc: 'การจัดกลุ่มตัวแปร WoE/IV, พยากรณ์ความน่าจะเป็นในการผิดนัดชำระ (PD) และการจัดทำ Scorecard',
      about_pillar2_title: 'Explainable AI (XAI) & การกำกับดูแล',
      about_pillar2_desc: 'กราฟ SHAP Waterfall และระบบสร้างเหตุผลการปฏิเสธสินเชื่ออัตโนมัติ',
      about_pillar3_title: 'สถาปัตยกรรมข้อมูลขนาดใหญ่ & MLOps',
      about_pillar3_desc: 'PostgreSQL, MySQL, Apache Spark, การจัดคิวงาน Airflow และไมโครเซอร์วิสบน Docker',
      about_methodology_hdr: '// วงจรการพัฒนาข้อมูลและระเบียบวิธีวิศวกรรม',
      about_edu_hdr: 'ประวัติการศึกษา',
      about_edu_degree: 'วิศวกรรมศาสตรบัณฑิต (วิศวกรรมคอมพิวเตอร์)',
      about_kbtg_hdr: '// INDUSTRY ASSESSMENTS & CERTIFICATIONS',
      kbtg_view_report: 'ดูรายงานผลคะแนน KBTG ↗',
      about_lang_hdr: 'ทักษะภาษา',
      about_lang_th: 'ภาษาแม่',
      about_lang_en: 'B1+ สื่อสารระดับวิชาชีพ',
      about_lang_en_btn: 'ดูผลคะแนนทางการ ↗',
      about_lang_jp: 'ระดับเริ่มต้น',
      about_edu_status: 'สถานะนิสิตปัจจุบัน',

      // Featured Projects
      projects_tag: '// PRODUCTION ARCHITECTURES',
      projects_title: 'Flagship Engineering & Applied ML',
      projects_desc: 'ไปป์ไลน์ข้อมูลครบวงจรที่ผสานการประเมินความเสี่ยงสินเชื่อตามเกณฑ์กำกับดูแล, การตรวจวิเคราะห์ภาวะเปราะบางทางการแพทย์ และระบบตรวจวัดข้อมูลเครื่องจักรอุตสาหกรรมอัตโนมัติ',
      
      proj1_domain: '[ FinTech / Credit Risk Modeling ]',
      proj1_chip: 'ผู้เข้ารอบชิง Aihack 2025 • Top 8 • ข้อมูล 40,000+ รายการ',
      proj1_title: 'ระบบจำแนกและพยากรณ์ลูกหนี้ค้างชำระนาน (LOD)',
      proj1_summary: 'ไปป์ไลน์ Machine Learning สำหรับพยากรณ์ความเสี่ยงลูกหนี้ผิดนัดชำระเกิน 90 วันจากข้อมูลสินเชื่อจริง ปรับแต่งค่า ROC-AUC บน ProbSpace ทั้งชุดทดสอบ Public และ Private ภายใต้เวลาที่จำกัด',
      proj1_btn: 'ดูสถาปัตยกรรมระบบ',
      proj1_sandbox: 'ROC Sandbox',

      proj2_domain: '[ HealthTech / Preventive Healthcare ]',
      proj2_chip: 'True Innovation Launchpad 2026 • AI & Data Lead',
      proj2_title: 'GuardianAI – แดชบอร์ดวิเคราะห์ความเสี่ยงภาวะเปราะบางในผู้สูงอายุ',
      proj2_summary: 'แพลตฟอร์มประเมินความเสี่ยงภาวะเปราะบางในผู้สูงอายุ ผสานโมเดล XGBoost และ Explainable AI (SHAP) เพื่ออธิบายสาเหตุทางการแพทย์ เชื่อมต่อด้วย FastAPI ความเร็วสูง',
      proj2_btn: 'ดูสถาปัตยกรรมระบบ',
      proj2_sandbox: 'Clinical SHAP Demo',

      proj3_domain: '[ Banking Intelligence / White-Box ML ]',
      proj3_chip: 'สอดคล้องเกณฑ์บาเซิล • Probability of Default',
      proj3_title: 'ระบบจัดอันดับเครดิตและ Explainable AI (XAI) สำหรับสถาบันการเงิน',
      proj3_summary: 'ระบบจำแนกคะแนนเครดิตตามมาตรฐานกำกับดูแล ใช้เทคนิค Weight of Evidence (WoE), LightGBM และเลเยอร์อธิบายผลด้วย SHAP/LIME',
      proj3_btn: 'ดูสถาปัตยกรรมระบบ',
      proj3_sandbox: 'Scorecard Matrix',

      proj4_domain: '[ Industrial IoT / Data Engineering ]',
      proj4_chip: 'ไปป์ไลน์บน Docker • วิเคราะห์ OEE เรียลไทม์ • Batch ETL อัตโนมัติ',
      proj4_title: 'ระบบท่อส่งข้อมูลเครื่องจักรอุตสาหกรรม (MFG) & วิเคราะห์ OEE',
      proj4_summary: 'สถาปัตยกรรม Data Engineering โรงงานอุตสาหกรรม จำลองสัญญาณเซนเซอร์ IIoT จัดทำ Batch ETL อัตโนมัติ และตรวจจับความผิดปกติแบบเรียลไทม์เพื่อวัดค่า Overall Equipment Effectiveness (OEE)',
      proj4_btn: 'ดูสถาปัตยกรรมระบบ',
      proj4_sandbox: 'OEE Live Logs',

      // Stack
      stack_tag: 'เครื่องมือและเทคโนโลยี',
      stack_title: 'Dual-Track Infinite Marquee',
      stack_desc: 'เครื่องมือและภาษาที่ใช้งานจริง วางเมาส์เหนือการ์ดเพื่อหยุดการเลื่อนและดูรายละเอียดการประยุกต์ใช้งานในแต่ละโปรเจกต์',
      filter_all: 'ทั้งหมด',
      filter_lang: 'ภาษาหลัก',
      filter_ml: 'ML & XAI',
      filter_data: 'Data Engineering & Cloud',
      filter_tools: 'เครื่องมือและการวิเคราะห์',

      // Competitions
      comp_tag: 'ประวัติการแข่งขันและแฮกกาธอน',
      comp_title: 'ประวัติการแข่งขันและแฮกกาธอน',
      comp_desc: 'ประสบการณ์การสร้างโมเดล Machine Learning กับชุดข้อมูลองค์กรจริง, สถาปัตยกรรม AI ทางการแพทย์, ระบบข้อมูลภูมิสารสนเทศ และการวางกลยุทธ์ธุรกิจ',

      comp1_title: 'Aihack Thailand 2025 (ผู้เข้ารอบชิงชนะเลิศ)',
      comp1_tag: 'ผู้เข้ารอบชิงชนะเลิศระดับประเทศ (Top 8)',
      comp1_org: 'จัดโดย บริษัท ไอร่า แอนด์ ไอฟุล จำกัด (มหาชน), คณะพาณิชยศาสตร์และการบัญชี จุฬาฯ และ ProbSpace',
      comp1_role_hdr: 'บทบาทและหน้าที่:',
      comp1_role_desc: 'หัวหน้าทีม Machine Learning & Risk Modeling นำเข้าและประมวลผลข้อมูลสินเชื่อบุคคล (~40,000 รายการ) เพื่อพยากรณ์ลูกหนี้ค้างชำระนาน (LOD ค้างชำระ >90 วันหลังสัญญา 12 เดือน)',
      comp1_tech_hdr: 'การพัฒนาเชิงเทคนิค:',
      comp1_tech_desc: 'ออกแบบตัวแปรอัตราความเร็วการชำระคืน (Repayment Velocity), ทำ Cross-Validation ด้วย LightGBM/XGBoost และปรับจูน ROC-AUC บน ProbSpace ทั้ง Public และ Private test splits ภายใต้โควตาการส่งที่จำกัด',
      comp1_biz_hdr: 'ผลลัพธ์ทางธุรกิจ:',
      comp1_biz_desc: 'ตอบโจทย์ Question Sheet สมดุลความเสี่ยงหนี้เสียกับกำไรดอกเบี้ยเงินกู้ ผ่านการคัดเลือกเข้าสู่รอบ Pitching 8 ทีมสุดท้าย',
      comp1_recog: '<strong>การรับรองอย่างเป็นทางการ:</strong> ได้รับเกียรติบัตรเข้าร่วมการแข่งขันรอบชิงชนะเลิศ ณ อาคารไชยยศสมบัติ 3 ลงนามโดย <strong>Shinichiro Okuyama</strong> (Managing Executive Officer, AIFUL CORPORATION)',
      comp1_cert_btn: 'ดูเกียรติบัตรฉบับทางการ ↗',

      comp2_title: 'True Innovation Launchpad 2026 – "GuardianAI"',
      comp2_tag: 'ทีม นักพัฒนาตัวประหลาด',
      comp2_org: 'ทรู คอร์ปอเรชั่น • Healthcare AI & การแพทย์เชิงป้องกัน',
      comp2_role_hdr: 'บทบาทและหน้าที่:',
      comp2_role_desc: 'ผู้นำทีมด้าน AI และ Data Science ออกแบบสถาปัตยกรรมพยากรณ์สุขภาพเชิงป้องกันเพื่อตรวจจับภาวะเปราะบางในผู้สูงอายุตั้งแต่ระยะเริ่มต้น',
      comp2_tech_hdr: 'การพัฒนาเชิงเทคนิค:',
      comp2_tech_desc: 'พัฒนาโมเดลจำแนกประเภท (XGBoost, Scikit-Learn) จากตัวชี้วัดทางชีวมิติและพฤติกรรม พร้อมนำ Explainable AI (SHAP) มาอธิบายปัจจัยเสี่ยงรายบุคคลให้แพทย์เข้าใจที่มาของผลวินิจฉัย',
      comp2_sys_hdr: 'การส่งมอบระบบ:',
      comp2_sys_desc: 'ออกแบบไมโครเซอร์วิสพยากรณ์ด้วย FastAPI ความเร็วสูง ส่งคะแนนความเสี่ยงและคำแนะนำการดูแลสุขภาพแบบเรียลไทม์เข้าสู่แดชบอร์ดของแพทย์',

      comp3_title: 'Geospatial Intelligence for Resilience Hackathon 2026',
      comp3_tag: 'ทีม วิศวะตัวประหลาด',
      comp3_org: 'GISTDA • สจล. (KMITL) • มจธ. (KMUTT) • ข้อมูลดาวเทียม & การรับมือภัยพิบัติ',
      comp3_role_hdr: 'บทบาทและหน้าที่:',
      comp3_role_desc: 'ผู้ออกแบบโมเดล Machine Learning เชิงพื้นที่และ Data Scientist (สมาชิกหลัก/หัวหน้าทีม)',
      comp3_tech_hdr: 'การพัฒนาเชิงเทคนิค:',
      comp3_tech_desc: 'พัฒนาแบบจำลองทางคณิตศาสตร์ "Rain-to-Flood Probability Model" ฝึกฝนด้วย Random Forest และ Logistic Regression บนข้อมูลภัยพิบัติย้อนหลัง',
      comp3_pipe_hdr: 'ไปป์ไลน์เชิงพื้นที่:',
      comp3_pipe_desc: 'ประมวลผลข้อมูลดาวเทียมหลากแหล่งผ่าน GISTDA Sphere ผสานข้อมูลความชื้นในดินจาก Sentinel-1 SAR, ความลาดชันจาก Copernicus GLO-30 DEM และข้อมูลฝนเพื่อทำแผนที่ความเสี่ยงน้ำท่วมฉับพลันความละเอียด 30 เมตรในลุ่มน้ำน่านตอนบน',

      comp4_title: 'LINE MAN Wongnai Junior Case Competition',
      comp4_tag: 'ทีม LC (Low Cortisol)',
      comp4_org: 'LINE MAN Wongnai • เศรษฐศาสตร์แพลตฟอร์ม & การเติบโตในมหาวิทยาลัย',
      comp4_role_hdr: 'บทบาทและหน้าที่:',
      comp4_role_desc: 'ผู้วางแผนกลยุทธ์การเติบโตและคำนวณเศรษฐศาสตร์ต่อหน่วย (Unit Economics Lead)',
      comp4_prob_hdr: 'การแก้โจทย์ปัญหา:',
      comp4_prob_desc: 'วิเคราะห์ปัญหาคอขวดโรงอาหารช่วงพักเที่ยง (11:30–13:30) และความคุ้มค่าของการสั่งกลุ่ม นำเสนอโซลูชัน LINE MAN VIP เช่น การสั่งอาหารล่วงหน้า, การแชร์ตะกร้า และยกเว้นค่าส่งช่วงเวลาเร่งด่วน',
      comp4_fin_hdr: 'แคมเปญ & แบบจำลองการเงิน:',
      comp4_fin_desc: 'ออกแบบแคมเปญบูธ "Silent Mission" ภายใต้งบประมาณ 8,000 บาท คำนวณต้นทุนการได้มาซึ่งลูกค้า (CAC เฉลี่ย 8.87 บาท/คน) สามารถสร้างยอดทดลองใช้งาน VIP 14 วันได้ถึง 462 คน',

      // Footer
      footer_title: 'ติดต่อสอบถาม & ร่วมงาน',
      footer_subtitle: 'กำลังมองหาโอกาสร่วมงานในตำแหน่ง Data Scientist, Machine Learning Engineer และ Data Engineering',
      footer_resume_btn: 'ดูเรซูเม่ฉบับเต็ม / CV',
      footer_resume_tooltip: 'เปิดไฟล์ PDF ในแท็บใหม่ • อัปเดต 2026',
      footer_email_btn: 'ส่งอีเมลโดยตรง',
      footer_copy_btn: 'คัดลอกอีเมล',
      footer_copied: 'คัดลอกแล้ว!',
      footer_copyright: '© 2026 ศิวกร ขุนดิโลกรัตยา (Sivakorn Khundilokrattaya) สร้างด้วยมาตรฐานเว็บที่เรียบง่ายและทรงประสิทธิภาพ'
    }
  };

  let currentLocale = 'en';

  function getInitialLocale() {
    const savedLocale = localStorage.getItem('user-locale');
    if (savedLocale === 'th' || savedLocale === 'en') {
      return savedLocale;
    }
    if (navigator.language && navigator.language.toLowerCase().startsWith('th')) {
      return 'th';
    }
    return 'en';
  }

  function setLanguage(locale, triggerAnimation = true) {
    if (locale !== 'en' && locale !== 'th') return;
    currentLocale = locale;
    localStorage.setItem('user-locale', locale);
    document.documentElement.lang = locale;

    // Update Language Switcher Toggle Buttons UI
    const enBtn = document.getElementById('lang-btn-en');
    const thBtn = document.getElementById('lang-btn-th');
    const pillHighlight = document.getElementById('lang-pill-highlight');

    if (enBtn && thBtn) {
      if (locale === 'en') {
        enBtn.classList.add('active');
        thBtn.classList.remove('active');
        if (pillHighlight) pillHighlight.style.transform = 'translateX(0%)';
      } else {
        thBtn.classList.add('active');
        enBtn.classList.remove('active');
        if (pillHighlight) pillHighlight.style.transform = 'translateX(100%)';
      }
    }

    const dict = TRANSLATIONS[locale];
    if (!dict) return;

    // Apply translations with a smooth 150ms text transition
    const i18nElements = document.querySelectorAll('[data-i18n]');
    const i18nHtmlElements = document.querySelectorAll('[data-i18n-html]');

    if (triggerAnimation) {
      document.body.classList.add('lang-transitioning');
    }

    i18nElements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    i18nHtmlElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    if (triggerAnimation) {
      setTimeout(() => {
        document.body.classList.remove('lang-transitioning');
      }, 160);
    }
  }

  window.getCurrentLocale = function () {
    return currentLocale;
  };

  window.toggleLanguage = function () {
    const nextLocale = currentLocale === 'en' ? 'th' : 'en';
    setLanguage(nextLocale, true);
  };

  window.initI18n = function () {
    const enBtn = document.getElementById('lang-btn-en');
    const thBtn = document.getElementById('lang-btn-th');

    if (enBtn) {
      enBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('en', true);
      });
    }

    if (thBtn) {
      thBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('th', true);
      });
    }

    const initial = getInitialLocale();
    setLanguage(initial, false);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initI18n);
  } else {
    window.initI18n();
  }
})();

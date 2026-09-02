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
      nav_brief: '30s Brief',
      nav_resume: 'Resume',

      // Hero
      hero_meta: 'B.Eng. Computer Engineering @ Srinakharinwirot University (SWU) • Class of 2026',
      hero_identity: 'Data Scientist & Machine Learning Engineer • FinTech & Quantitative Risk',
      hero_specialty: 'Architecting explainable credit risk engines, high-impact tabular ML, and production-grade financial data pipelines.',
      hero_cta_projects: 'Explore Projects',
      hero_cta_brief: '30s Brief',
      hero_cta_terminal: 'Terminal',

      // Metrics Strip
      metrics_comp_sub: 'Competitions & Hackathons',
      metrics_comp_desc: 'Cross-Domain Modeling & Strategy',
      metrics_comp_chip: 'FinTech, HealthTech, Spatial & Growth',

      metrics_fin_sub: 'Financial Data Points',
      metrics_fin_desc: 'Real Enterprise Credit Records',
      metrics_fin_chip: 'WoE / IV Binning • 0.894 ROC-AUC',

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
      about_profile_hdr: '// QUANTITATIVE PROFILE & FOCUS',
      about_profile_headline: 'Computer Engineering @ SWU specializing in transparent, production-grade statistical ML.',
      about_profile_sub: 'Developing explainable credit risk engines and scalable telemetry pipelines that satisfy strict regulatory compliance.',
      about_pipeline_hdr: '// PRODUCTION PIPELINE LIFECYCLE',
      about_lead: 'I am a Computer Engineering student at Srinakharinwirot University (SWU) passionate about transforming transactional credit records into transparent predictive intelligence.',
      about_p: 'In credit risk underwriting, black-box models present severe regulatory hurdles. My work focuses on <strong>Probability of Default (PD) estimation, Weight of Evidence (WoE) binning, and Explainable AI (XAI)</strong> that delivers legally defensible adverse action notices alongside high ROC-AUC scores.',
      about_methodology_hdr: '// PRODUCTION PIPELINE LIFECYCLE',
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
      stack_title: 'Production Tech Stack & Tooling',
      stack_desc: 'A curated ecosystem of languages, distributed computing frameworks, and machine learning libraries applied across production pipelines. Hover over any technology to inspect its implementation context.',
      filter_all: 'All Stack',
      filter_lang: 'Core Languages',
      filter_ml: 'ML & XAI',
      filter_data: 'Data Engineering & Cloud',
      filter_tools: 'Analytics & Tools',

      // Competitions
      comp_tag: 'Competitions & Hackathons',
      comp_title: 'Hackathons & Competitions',
      comp_desc: 'Demonstrated machine learning modeling on enterprise datasets, explainable healthcare architectures, geospatial risk pipelines, and data-driven business strategy.',

      comp1_title: 'Aihack Thailand 2025',
      comp1_tag: 'National Finalist • Top 8',
      comp1_org: 'AIRA & AIFUL • Chulalongkorn Business School • ProbSpace',
      comp1_teaser: 'Led ML and risk modeling to predict Long Overdue Debtors (>90 days default) using LightGBM/XGBoost feature velocity and calibrated decision curves.',
      comp1_dossier_btn: 'View Technical Breakdown & Architecture ↗',
      comp1_cert_btn: 'Official Certificate ↗',

      comp2_title: 'True Innovation Launchpad 2026 – GuardianAI',
      comp2_tag: 'Team Nakphatthana Tuapralat • AI Lead',
      comp2_org: 'True Corporation • Healthcare AI & Preventive Clinical Analytics',
      comp2_teaser: 'Architected end-to-end clinical risk prediction platform for early elderly frailty intervention, combining calibrated XGBoost with SHAP biometric explainability for medical professionals.',
      comp2_dossier_btn: 'View Clinical Architecture & System Specs ↗',

      comp3_title: 'Geospatial Intelligence for Resilience Hackathon 2026',
      comp3_tag: 'Team Witsawa Tuapralat • Spatial Lead',
      comp3_org: 'GISTDA • KMITL • KMUTT • Remote Sensing & Disaster Resilience',
      comp3_teaser: 'Developed the mathematical framework and spatial ML pipeline fusing Sentinel-1 SAR backscatter, Copernicus DEM topography, and rainfall telemetry for 30m flash flood risk modeling.',

      comp4_title: 'LINE MAN Wongnai Junior Case Competition',
      comp4_tag: 'Team LC • Unit Economics Lead',
      comp4_org: 'LINE MAN Wongnai • Platform Economics & Campus Growth',
      comp4_teaser: 'Analyzed campus dining bottlenecks and formulated LINE MAN VIP growth campaign with 8.87 THB CAC, acquiring 462 student conversions within an 8,000 THB budget cap.',

      // Footer
      footer_status_loc: 'Bangkok, Thailand',
      footer_status_mode: 'On-site / Hybrid / Remote',
      footer_status_avail: 'Available for DS / ML Roles',
      footer_title: "Let's Connect",
      footer_subtitle: 'Seeking full-time Data Scientist, Machine Learning Engineer, and Data Engineering roles.',
      footer_resume_btn: 'View Full Resume / CV ↗',
      footer_email_btn: 'Send Direct Email ✉',
      footer_copy_btn: 'Copy Email 📋',
      footer_copied: 'Copied! ✓',
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
      nav_brief: 'สรุปย่อ 30 วิ',
      nav_resume: 'เรซูเม่',

      // Hero
      hero_meta: 'วิศวกรรมศาสตรบัณฑิต (วิศวกรรมคอมพิวเตอร์) มหาวิทยาลัยศรีนครินทรวิโรฒ • รุ่นปี 2026',
      hero_identity: 'Data Scientist & Machine Learning Engineer • FinTech & Quantitative Risk',
      hero_specialty: 'พัฒนาระบบประเมินความเสี่ยงสินเชื่อที่โปร่งใสและตรวจสอบได้, โมเดล Tabular ML คุณภาพสูง และระบบไปป์ไลน์ข้อมูลทางการเงินระดับโปรดักชัน',
      hero_cta_projects: 'สำรวจโปรเจกต์',
      hero_cta_brief: 'สรุป 30 วิ',
      hero_cta_terminal: 'เทอร์มินัล',

      // Metrics Strip
      metrics_comp_sub: 'การแข่งขันและแฮกกาธอน',
      metrics_comp_desc: 'การแก้ปัญหาและวางกลยุทธ์ข้ามสายงาน',
      metrics_comp_chip: 'FinTech, HealthTech, Spatial & การเติบโต',

      metrics_fin_sub: 'ชุดข้อมูลทางการเงิน',
      metrics_fin_desc: 'ข้อมูลเครดิตองค์กรจริง',
      metrics_fin_chip: 'WoE / IV Binning • 0.894 ROC-AUC',

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
      about_profile_hdr: '// ข้อมูลและทิศทางความเชี่ยวชาญ',
      about_profile_headline: 'นิสิตวิศวกรรมคอมพิวเตอร์ มศว เชี่ยวชาญ Machine Learning เชิงสถิติที่โปร่งใสและพร้อมใช้งานจริง',
      about_profile_sub: 'พัฒนาระบบประเมินความเสี่ยงสินเชื่อที่อธิบายได้และไปป์ไลน์ข้อมูลอุตสาหกรรมที่รองรับเกณฑ์กำกับดูแลที่เข้มงวด',
      about_pipeline_hdr: '// วงจรการทำงานของไปป์ไลน์ข้อมูล',
      about_lead: 'ผมเป็นนิสิตวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยศรีนครินทรวิโรฒ (มศว) ที่มุ่งมั่นในการเปลี่ยนข้อมูลธุรกรรมสินเชื่อให้เป็นระบบพยากรณ์ที่โปร่งใสและตรวจสอบได้',
      about_p: 'ในการประเมินความเสี่ยงสินเชื่อ โมเดลแบบกล่องดำ (Black-box) มักติดข้อจำกัดด้านกฎระเบียบ งานของผมมุ่งเน้นที่ <strong>การประเมิน Probability of Default (PD), การจัดกลุ่มตัวแปรด้วย Weight of Evidence (WoE) และ Explainable AI (XAI)</strong> เพื่อสร้างเอกสารปฏิเสธสินเชื่อ (Adverse Action) ที่ชอบธรรมตามกฎหมายควบคู่กับคะแนน ROC-AUC ระดับสูง',
      about_methodology_hdr: '// วงจรการทำงานของไปป์ไลน์ข้อมูล',
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
      stack_title: 'เครื่องมือและเทคโนโลยีการทำงานจริง',
      stack_desc: 'ระบบนิเวศของภาษาโปรแกรมมิ่ง, เฟรมเวิร์กการประมวลผลข้อมูลแบบกระจายศูนย์ และไลบรารี Machine Learning ที่นำไปใช้งานจริงในไปป์ไลน์ วางเมาส์เหนือการ์ดเพื่อดูรายละเอียดการประยุกต์ใช้งาน',
      filter_all: 'ทั้งหมด',
      filter_lang: 'ภาษาหลัก',
      filter_ml: 'ML & XAI',
      filter_data: 'Data Engineering & Cloud',
      filter_tools: 'เครื่องมือและการวิเคราะห์',

      // Competitions
      comp_tag: 'ประวัติการแข่งขันและแฮกกาธอน',
      comp_title: 'ประวัติการแข่งขันและแฮกกาธอน',
      comp_desc: 'ประสบการณ์การสร้างโมเดล Machine Learning กับชุดข้อมูลองค์กรจริง, สถาปัตยกรรม AI ทางการแพทย์, ระบบข้อมูลภูมิสารสนเทศ และการวางกลยุทธ์ธุรกิจ',

      comp1_title: 'Aihack Thailand 2025',
      comp1_tag: 'ผู้เข้ารอบชิงชนะเลิศระดับประเทศ (Top 8)',
      comp1_org: 'AIRA & AIFUL • คณะพาณิชยศาสตร์และการบัญชี จุฬาฯ • ProbSpace',
      comp1_teaser: 'ผู้นำทีม Machine Learning และ Risk Modeling พยากรณ์ลูกหนี้ค้างชำระนาน (>90 วัน) ด้วยอัตราความเร็วของตัวแปรบน LightGBM/XGBoost และ Calibration Curves',
      comp1_dossier_btn: 'ดูสรุปสถาปัตยกรรม & แบบจำลองเชิงลึก ↗',
      comp1_cert_btn: 'ดูเกียรติบัตรฉบับทางการ ↗',

      comp2_title: 'True Innovation Launchpad 2026 – GuardianAI',
      comp2_tag: 'ทีม นักพัฒนาตัวประหลาด • AI Lead',
      comp2_org: 'ทรู คอร์ปอเรชั่น • Healthcare AI & การแพทย์เชิงป้องกัน',
      comp2_teaser: 'ออกแบบสถาปัตยกรรมพยากรณ์ภาวะเปราะบางในผู้สูงอายุ ผสานโมเดล XGBoost เข้ากับ Explainable AI (SHAP) เพื่อให้แพทย์เข้าใจที่มาของผลวินิจฉัยเชิงชีวมิติ',
      comp2_dossier_btn: 'ดูสถาปัตยกรรมระบบ & ข้อมูลเชิงลึก ↗',

      comp3_title: 'Geospatial Intelligence for Resilience Hackathon 2026',
      comp3_tag: 'ทีม วิศวะตัวประหลาด • Spatial Lead',
      comp3_org: 'GISTDA • สจล. (KMITL) • มจธ. (KMUTT) • ข้อมูลดาวเทียม & การรับมือภัยพิบัติ',
      comp3_teaser: 'พัฒนาแบบจำลองทางคณิตศาสตร์และไปป์ไลน์ ML เชิงพื้นที่ ผสานสัญญาณเรดาร์ Sentinel-1 SAR, แบบจำลองความสูง Copernicus DEM และปริมาณน้ำฝนเพื่อพยากรณ์น้ำท่วมฉับพลันความละเอียด 30 เมตร',

      comp4_title: 'LINE MAN Wongnai Junior Case Competition',
      comp4_tag: 'ทีม LC • Unit Economics Lead',
      comp4_org: 'LINE MAN Wongnai • เศรษฐศาสตร์แพลตฟอร์ม & การเติบโตในมหาวิทยาลัย',
      comp4_teaser: 'วิเคราะห์ปัญหาคอขวดช่วงพักเที่ยงและวางแผนแคมเปญ LINE MAN VIP ด้วยต้นทุน CAC 8.87 บาท/คน สร้างยอดทดลองใช้ 462 คนภายใต้งบประมาณ 8,000 บาท',

      // Footer
      footer_status_loc: 'กรุงเทพฯ, ประเทศไทย',
      footer_status_mode: 'On-site / Hybrid / Remote',
      footer_status_avail: 'พร้อมรับตำแหน่งงาน DS / ML',
      footer_title: 'ติดต่อสอบถาม & ร่วมงาน',
      footer_subtitle: 'กำลังมองหาโอกาสร่วมงานในตำแหน่ง Data Scientist, Machine Learning Engineer และ Data Engineering',
      footer_resume_btn: 'ดูเรซูเม่ฉบับเต็ม / CV ↗',
      footer_email_btn: 'ส่งอีเมลโดยตรง ✉',
      footer_copy_btn: 'คัดลอกอีเมล 📋',
      footer_copied: 'คัดลอกแล้ว! ✓',
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

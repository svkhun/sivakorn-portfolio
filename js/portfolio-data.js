/**
 * Portfolio Data Store
 * Structured data repository inspired by masterPortfolio (Ashutosh Hathidara)
 * All personal information, credentials, project case studies, and experience are preserved here.
 */

const portfolioData = {
  // Navigation & Branding
  branding: {
    logoText: "< Sivakorn />",
    fullName: "Sivakorn Khundilokrattaya",
    nickname: "svkhun",
    roleTitle: "Data Scientist & Machine Learning Engineer",
    subTitle: "Computer Engineering Student @ Srinakharinwirot University (SWU, Class of 2026)",
    location: "Bangkok, Thailand",
    statusBadge: "Open to Work",
    statusDetail: "Available for On-site, Hybrid & Remote roles"
  },

  // Social & Connectivity Links
  socialLinks: {
    github: "https://github.com/svkhun",
    linkedin: "https://www.linkedin.com/in/sivakorn-khundilokrattaya-5870b8429/",
    email: "sivakorn.khun@gmail.com",
    kaggle: "https://www.kaggle.com/sivakornkhun",
    livePortfolio: "https://svkhun.vercel.app"
  },

  // Resume Documents
  resumes: {
    primary: "assets/Sivakorn_Khundilokrattaya_Resume.pdf",
    cv: "assets/Sivakorn_Khundilokrattaya_CV.pdf",
    aihackCertificate: "assets/aihack_thailand_2025_certificate.pdf",
    nhkScholarshipAnnouncement: "assets/nhk_spring_scholarship_announcement.pdf"
  },

  // Home Page Greeting / Hero
  greeting: {
    title: "Hi all, I'm Sivakorn",
    fullName: "Sivakorn Khundilokrattaya",
    subTitle: "A passionate Data Scientist & Machine Learning Engineer specializing in Basel-compliant credit risk modeling, Explainable AI (XAI), relational Graph Neural Networks, and scalable production data pipelines.",
    resumeLink: "assets/Sivakorn_Khundilokrattaya_Resume.pdf"
  },

  // What I Do (Categorized Tech Stacks & Capabilities)
  whatIDo: [
    {
      id: "ds-ml",
      title: "Data Science & Machine Learning",
      subtitle: "Statistical Tabular Modeling, Graph Neural Networks & Production Inference",
      skills: [
        "Building scalable, calibrated tabular machine learning models with state-of-the-art tree ensembles (LightGBM, XGBoost, CatBoost).",
        "Developing Two-Tier Relational Graph Neural Networks (PyTorch Geometric RGCN) for multi-hop mule account fraud detection.",
        "Optimizing sub-millisecond model execution and low-latency microservice serving via ONNX Runtime v1.30 (< 12ms P99 SLA).",
        "Conducting Bayesian hyperparameter optimization (Optuna) with 5-fold stratified cross-validation."
      ],
      softwareSkills: [
        { name: "Python", icon: "fab fa-python", color: "#3776AB" },
        { name: "PyTorch", icon: "fas fa-fire", color: "#EE4C2C" },
        { name: "LightGBM", icon: "fas fa-tree", color: "#0056B3" },
        { name: "XGBoost", icon: "fas fa-bolt", color: "#FF9900" },
        { name: "CatBoost", icon: "fas fa-cubes", color: "#F05032" },
        { name: "Scikit-Learn", icon: "fas fa-brain", color: "#F7931E" },
        { name: "Pandas", icon: "fas fa-table", color: "#150458" },
        { name: "NumPy", icon: "fas fa-square-root-alt", color: "#013243" },
        { name: "ONNX", icon: "fas fa-microchip", color: "#005CED" }
      ]
    },
    {
      id: "risk-xai",
      title: "Quantitative Risk & Explainable AI (XAI)",
      subtitle: "Basel II/III Probability of Default (PD), Scorecards & Regulatory Defensibility",
      skills: [
        "Engineering Basel II/III compliant credit scorecards with monotonic Weight of Evidence (WoE) binning and Information Value (IV) screening.",
        "Decomposing complex non-linear models with TreeSHAP and Counterfactual What-If Recourse for legally defensible Adverse Action notices (ECOA / FCRA).",
        "Formulating asymmetric cost matrices to balance False Negatives (unrecovered principal default) against False Positives (lost margin).",
        "Monitoring continuous Population Stability Index (PSI < 0.10) and Kolmogorov-Smirnov separation (KS > 40%) across temporal cohorts."
      ],
      softwareSkills: [
        { name: "TreeSHAP", icon: "fas fa-sitemap", color: "#0056B3" },
        { name: "OptBinning", icon: "fas fa-chart-line", color: "#10B981" },
        { name: "Counterfactuals (DiCE)", icon: "fas fa-exchange-alt", color: "#6366F1" },
        { name: "SciPy", icon: "fas fa-square-root-variable", color: "#00549D" },
        { name: "Basel II/III", icon: "fas fa-building-columns", color: "#0284C7" },
        { name: "Risk Governance", icon: "fas fa-shield-halved", color: "#059669" }
      ]
    },
    {
      id: "data-eng",
      title: "Production Data Engineering & Microservices",
      subtitle: "Hybrid Lambda Architecture, Real-Time Telemetry & Containerized APIs",
      skills: [
        "Architecting decoupled Hybrid Lambda pipelines streaming sub-second edge sensor telemetry via asynchronous WebSockets (< 1.0s push).",
        "Building idempotent dimensional Data Marts in PostgreSQL 15 with deterministic ON CONFLICT DO UPDATE upserts and audit trails.",
        "Deploying high-concurrency asynchronous FastAPI microservices containerized with Docker for sub-30ms real-time inference.",
        "Engineering in-memory feature stores with Redis for O(1) continuous graph embedding lookups."
      ],
      softwareSkills: [
        { name: "FastAPI", icon: "fas fa-rocket", color: "#009688" },
        { name: "PostgreSQL 15", icon: "fas fa-database", color: "#336791" },
        { name: "Redis", icon: "fas fa-memory", color: "#DC382D" },
        { name: "Docker", icon: "fab fa-docker", color: "#2496ED" },
        { name: "WebSockets", icon: "fas fa-plug", color: "#6366F1" },
        { name: "Polars / Spark", icon: "fas fa-bolt-lightning", color: "#E25A1C" },
        { name: "Git", icon: "fab fa-git-alt", color: "#F05032" }
      ]
    }
  ],

  // Education & Degrees Received
  education: {
    degrees: [
      {
        title: "Bachelor of Engineering (B.Eng.) in Computer Engineering",
        subtitle: "Srinakharinwirot University (SWU, Bangkok, Thailand)",
        logo: "swu-logo",
        altName: "SWU",
        duration: "2022 - 2026 (Expected Graduation)",
        focus: "Statistical Machine Learning, Advanced Database Systems & Credit Risk Engineering",
        descriptions: [
          "Curriculum Specialization: Statistical Machine Learning, Advanced Database Systems (RDBMS & Distributed Data), Operating Systems, Probability & Mathematical Statistics, Data Structures & Algorithms, Distributed Systems.",
          "Applied Research Focus: Architecting regulatory-defensible Probability of Default (PD) credit scorecards with TreeSHAP and counterfactual recourse under Basel II/III and ECOA standards.",
          "Faculty of Engineering: Applied coursework spanning statistical modeling, database architecture, and quantitative systems."
        ],
        websiteLink: "https://swu.ac.th"
      }
    ],
    scholarships: [
      {
        title: "NHK Spring (Thailand) Undergraduate Scholarship",
        officialTitle: "NHK Spring (Thailand) Academic Scholarship (2026-2027)",
        sponsor: "NHK SPRING (THAILAND) CO., LTD.",
        award: "30,000 THB / academic year (2026-2027 award period)",
        internship: "2-Month Summer Industrial Internship at NHK Spring production facilities with corporate accommodation & allowance",
        criteria: "Faculty of Engineering (Computer Engineering) student with cumulative GPAX >= 2.75 and exemplary faculty conduct endorsement",
        announcementDate: "January 20, 2026",
        ceremonyDate: "September 25, 2026",
        pdfUrl: "assets/nhk_spring_scholarship_announcement.pdf",
        imageUrl: "assets/nhk_spring_scholarship_page1.jpg",
        colorCode: "#E11D48"
      }
    ],
    certifications: [
      {
        title: "STAMP Score Report: Data Analyst Track",
        subtitle: "Kasikorn Business-Technology Group (KBTG)",
        issuer: "SKILLKAMP by KBTG",
        issueDate: "Verified 2024",
        score: "97 / 150",
        benchmark: "Benchmark 90.0 (Above Benchmark)",
        status: "Verified Intermediate",
        certificateImage: "assets/kbtg_stamp_data_analyst.png",
        skillsCovered: "Data Cleaning (23/30), EDA & Visualization (20/30), Foundations (20/30), ML for Analysts (18/30), SQL (17/30)",
        colorCode: "#00A950"
      },
      {
        title: "STAMP Score Report: Digital & Performance Marketer",
        subtitle: "Kasikorn Business-Technology Group (KBTG)",
        issuer: "SKILLKAMP by KBTG",
        issueDate: "Verified 2024",
        score: "98 / 150",
        benchmark: "Benchmark 94.0 (Top Tier Analytics)",
        status: "Verified Intermediate",
        certificateImage: "assets/kbtg_stamp_digital_marketer.png",
        skillsCovered: "Performance Analytics, Campaign Funnels, Conversion Attribution, Unit Economics",
        colorCode: "#00A950"
      },
      {
        title: "Oxford Placement Test (English Proficiency)",
        subtitle: "AUA Language Center / Oxford University Press",
        issuer: "Oxford University Press",
        issueDate: "Verified 2024",
        score: "51 / 120 (CEFR Level B1+)",
        benchmark: "Working Professional English Proficiency",
        status: "CEFR B1+ Certified",
        certificateImage: "assets/20260621 Sivakorn Khundilokrattaya.pdf",
        skillsCovered: "Grammar & Use of English (54/B1), Listening Comprehension (48/B1)",
        colorCode: "#002147"
      }
    ],
    competitiveSites: [
      {
        siteName: "GitHub",
        icon: "fab fa-github",
        profileLink: "https://github.com/svkhun",
        handle: "@svkhun",
        description: "Open source repositories, ML architectures, and data pipelines"
      },
      {
        siteName: "Kaggle",
        icon: "fab fa-kaggle",
        profileLink: "https://www.kaggle.com/sivakornkhun",
        handle: "sivakornkhun",
        description: "Tabular benchmarks, feature engineering, and predictive competitions"
      },
      {
        siteName: "LinkedIn",
        icon: "fab fa-linkedin-in",
        profileLink: "https://www.linkedin.com/in/sivakorn-khundilokrattaya-5870b8429/",
        handle: "Sivakorn Khundilokrattaya",
        description: "Professional network, research updates, and career milestones"
      }
    ]
  },

  // Experience & Competitions (Timeline & Cards)
  experience: [
    {
      role: "Lead Data Scientist & Product Architect",
      company: "Shopee Ultimate Case Challenge 2026",
      status: "Case competition project",
      organization: "Shopee",
      duration: "2026",
      description: [
        "Developed Smart COD Reliability, a prototype connecting calibrated delivery failure predictions to adaptive checkout safeguards.",
        "Built a Random Forest pipeline with sigmoid calibration; recorded 0.8400 ROC-AUC and 0.3056 average precision on 3,500 synthetic holdout COD orders.",
        "Implemented four reliability grades, 20%/30% deposit policies, delivery-feedback scoring, and rule-based EasySell checks.",
        "Built FastAPI inference, a smartphone shopping simulator, and analytics views over 50,000 synthetic orders and 12,000 buyer profiles."
      ],
      techStack: ["Python", "scikit-learn", "Random Forest", "FastAPI", "Pandas", "JavaScript"]
    },
    {
      role: "Track 2 Lead: Data Science & Intelligence",
      company: "KBTG Kampus Hackathon 2026",
      status: "Advanced to the next round in Track 2",
      organization: "Kasikorn Business-Technology Group (KBTG)",
      duration: "2026",
      location: "Bangkok, Thailand",
      description: [
        "Led engineering on FlowSense & TrustGraph, an independent KBTG hackathon concept prototype for spending plans, opt-in saving, and pre-transfer risk review.",
        "Combined precomputed PyTorch Geometric R-GCN 16D embeddings with LightGBM and ONNX Runtime scoring through FastAPI.",
        "Reported 11.62ms P99 transfer evaluation over 200 local prototype cycles; this is not a production SLA or end-to-end user latency.",
        "Implemented bills-aware spending plans, user-selected reserves, opt-in capacity-limited saving, standard withdrawals, and direct recipient-risk explanations using synthetic data."
      ],
      techStack: ["PyTorch Geometric", "LightGBM", "ONNX Runtime", "FastAPI", "React 18", "Vite"]
    },
    {
      role: "Undergraduate Engineering Scholar",
      company: "NHK Spring (Thailand) Undergraduate Scholarship",
      organization: "NHK SPRING (THAILAND) CO., LTD. &bull; Faculty of Engineering, SWU",
      duration: "2026 - 2027",
      location: "Bangkok & Samut Prakan, Thailand",
      description: [
        "Recipient of the corporate undergraduate engineering scholarship awarded under competitive cumulative GPAX (>= 2.75) criteria and faculty character endorsement.",
        "Awarded an educational grant of 30,000 THB per academic year for the 2026-2027 period.",
        "Scholarship includes a planned 2-month summer engineering internship with accommodation and living allowance."
      ],
      techStack: ["Computer Engineering", "Precision Manufacturing", "Industrial Automation", "Quality Control"]
    },
    {
      role: "National Finalist: Long Overdue Debtor (LOD) Prediction",
      company: "Aihack Thailand 2025",
      organization: "AIRA & AIFUL &bull; Chulalongkorn Business School &bull; ProbSpace",
      duration: "Dec 2025",
      location: "Bangkok, Thailand",
      description: [
        "Built a competition pipeline for predicting 12-month long-overdue debt risk from tabular lending records.",
        "Developed financial-ratio and delinquency features, with stratified validation and Optuna model search.",
        "Implemented out-of-fold rank/probability blending with CatBoost and LightGBM; the public repository documents a 0.65333 out-of-fold ROC-AUC experiment, while private competition data is not published.",
        "Compared model variants and kept confidential competition records outside the public repository."
      ],
      techStack: ["LightGBM", "XGBoost", "CatBoost", "Optuna", "Scikit-Learn", "OptBinning"]
    },
    {
      role: "AI & Data Science Lead (Team Nakphatthana Tuapralat)",
      company: "True Innovation Launchpad 2026",
      organization: "True Corporation",
      duration: "Jan 2026",
      location: "Bangkok, Thailand",
      description: [
        "Designed a bilingual frailty-triage dashboard prototype for care-team review.",
        "Built patient-profile, risk-factor, alert-acknowledgement, and follow-up views using example records.",
        "Separated the demonstrated workflow from clinical validation, which remains future work."
      ],
      techStack: ["React", "Vite", "Node.js", "Tailwind CSS", "Thai / English"]
    },
    {
      role: "Spatial Lead: 30m Grid Flash Flood Mapping",
      company: "Geospatial Intelligence for Resilience Hackathon 2026",
      organization: "GISTDA &bull; KMITL &bull; KMUTT",
      duration: "Jan 2026",
      location: "Bangkok, Thailand",
      description: [
        "Extracted and segmented flood extent using Sentinel-1 Synthetic Aperture Radar (SAR) dual-polarization backscatter and Copernicus DEM elevation rasters.",
        "Generated granular 30-meter disaster risk hazard matrices for local provincial resilience planning.",
        "Built automated geospatial processing pipelines in Python with Rasterio, GeoPandas, and Shapely."
      ],
      techStack: ["Sentinel-1 SAR", "Copernicus DEM", "Python", "GeoPandas", "Rasterio"]
    },
    {
      role: "Operational AI & System Reliability Lead",
      company: "CDG Hackathon 2026",
      organization: "CDG Group",
      duration: "Jul 2026",
      location: "Bangkok, Thailand",
      description: [
        "Spearheaded enterprise operational intelligence and proactive telemetry monitoring under Team GrandGuardianAI.",
        "Designed automated anomaly detection alerting rules across distributed microservice infrastructures.",
        "Formulated system reliability benchmarks and operational runbooks for zero-downtime failover."
      ],
      techStack: ["Python", "System Reliability", "Observability", "Docker", "RESTful APIs"]
    },
    {
      role: "Unit Economics & Growth Lead",
      company: "LINE MAN Campus VIP Growth Campaign",
      organization: "LINE MAN Wongnai",
      duration: "Nov 2024",
      location: "Bangkok, Thailand",
      description: [
        "Optimized digital acquisition funnel and unit economics, achieving an ultra-lean 8.87 THB Customer Acquisition Cost (CAC).",
        "Generated 462 verified university student conversions within a strict 8,000 THB total growth budget.",
        "Modeled multi-cohort retention curves, referral loops, and user lifetime value (LTV) dynamics using SQL and Python."
      ],
      techStack: ["Unit Economics", "Cohort Analysis", "SQL", "Conversion Attribution", "Python"]
    }
  ],

  // Featured Engineering Projects
  projects: [
    {
      id: "shopee-smart-cod",
      title: "Shopee Smart COD Reliability",
      domain: "E-Commerce Delivery Risk & Adaptive Checkout",
      context: "Shopee Ultimate Case Challenge 2026 — Case competition project",
      caseStudyLink: "project-shopee-smart-cod.html",
      description: "Calibrated Random Forest failure prediction, four reliability grades, adaptive deposit policies, delivery-feedback scoring, and a FastAPI-powered shopping simulator evaluated on synthetic order data.",
      keyMetric: "0.8400 ROC-AUC on Synthetic Holdout &bull; 50,000 Synthetic Orders &bull; 4 Risk Grades",
      techStack: ["Python", "scikit-learn", "Random Forest", "FastAPI", "Pandas", "JavaScript"],
      githubLink: "https://github.com/svkhun/Shopee-Ultimate-Case-Challenge",
      liveDemoLink: null
    },
    {
      id: "k-flowsense-trustgraph",
      title: "FlowSense & TrustGraph (Independent Banking Concept)",
      domain: "Real-Time Graph Fraud Defense & Mobile Cashflow Intelligence",
      context: "KBTG Kampus Hackathon 2026 — Advanced to the next round; not yet in the Final round",
      caseStudyLink: "project-flowsense-trustgraph.html",
      description: "FlowSense offers a spending outlook, accounts for bills and a chosen reserve, and offers user-triggered saving within safe-to-save capacity plus standard withdrawals. TrustGraph uses precomputed R-GCN features and ONNX scoring to review transfers and explain recipient risk. This is an independent prototype using synthetic data.",
      keyMetric: "Bill-Aware Planning &bull; Opt-In Saving &bull; Pre-Transfer Risk Review",
      techStack: ["PyTorch Geometric", "LightGBM", "ONNX Runtime", "FastAPI", "React 18", "Vite"],
      githubLink: "https://github.com/svkhun/k-nexus",
      liveDemoLink: "https://k-nexus-app.onrender.com/"
    },
    {
      id: "credit-risk-xai",
      title: "Enterprise Credit Risk Scoring & Explainable AI (XAI)",
      domain: "Probability of Default & Explainable Decision Support",
      context: "Quantitative credit risk research prototype",
      description: "Research interface for estimating default risk, inspecting model explanations and reason codes, and exploring hypothetical alternative lending decisions. Regulatory and fair-lending validation remain separate work.",
      keyMetric: "Default Probability &bull; Reason Codes &bull; Scenario Exploration",
      techStack: ["LightGBM", "OptBinning", "TreeSHAP", "DiCE Counterfactuals", "FastAPI", "SciPy"],
      githubLink: "https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI",
      liveDemoLink: null
    },
    {
      id: "aiful-lod-prediction",
      title: "Long Overdue Debtor (LOD) Prediction System",
      domain: "Long-Overdue Default Prediction",
      context: "Aihack Thailand 2025 National Finalist",
      description: "Competition pipeline for 12-month long-overdue prediction using financial feature engineering, stratified validation, and CatBoost/LightGBM blending. Confidential competition records are not published.",
      keyMetric: "National Finalist &bull; 12-Month Default Prediction &bull; Out-of-Fold Validation",
      techStack: ["LightGBM", "XGBoost", "CatBoost", "Optuna", "Scikit-Learn", "Streamlit"],
      githubLink: "https://github.com/svkhun/aiful-credit-risk-modeling",
      liveDemoLink: null
    },
    {
      id: "mfg-data-pipeline",
      title: "Industrial IoT & OEE Manufacturing Data Platform",
      domain: "Manufacturing Telemetry & OEE Analytics",
      context: "Industrial Automation Systems",
      description: "Working prototype with simulated machine telemetry, FastAPI and WebSocket dashboard updates, PostgreSQL storage, hourly OEE summaries, and model-assisted anomaly views.",
      keyMetric: "Simulated Sensors &bull; WebSocket Dashboard &bull; Hourly OEE",
      techStack: ["PostgreSQL 15", "FastAPI", "WebSockets", "LightGBM", "TreeSHAP", "React 18", "Docker"],
      githubLink: "https://github.com/svkhun/mfg-data-pipeline",
      liveDemoLink: null
    },
    {
      id: "guardianai-clinical-ops",
      title: "GuardianAI Frailty Triage Dashboard",
      domain: "Preventive Geriatric Healthcare Analytics & Clinical Triage",
      context: "True Innovation Launchpad 2026",
      description: "Bilingual frailty-triage dashboard prototype with patient profiles, explainable risk-factor views, alert acknowledgement, and care-team follow-up workflows. Clinical outcomes have not been validated.",
      keyMetric: "Frailty Review &bull; Risk Factors &bull; Care Coordination",
      techStack: ["React", "Vite", "Node.js", "Tailwind CSS", "Thai / English"],
      githubLink: "https://github.com/svkhun/guardianai-clinical-ops-dashboard",
      liveDemoLink: null
    }
  ],

  // Contact Page Details
  contact: {
    heading: "Contact Me",
    subHeading: "Discuss a project or just want to say hi? My inbox is open for all.",
    email: "sivakorn.khun@gmail.com",
    location: "Bangkok, Thailand",
    availability: "Available for full-time Data Scientist, Machine Learning Engineer, and Quantitative Risk Analyst opportunities (On-site, Hybrid & Remote).",
    resumePdf: "assets/Sivakorn_Khundilokrattaya_Resume.pdf",
    cvPdf: "assets/Sivakorn_Khundilokrattaya_CV.pdf"
  }
};

// Export for ES modules or attach to global window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
} else if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}

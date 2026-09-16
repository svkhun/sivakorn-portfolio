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
    aihackCertificate: "assets/aihack_thailand_2025_certificate.pdf"
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
          "Faculty of Engineering: Active engineering leadership in data science hackathons, automated data mart architectures, and quantitative finance models."
        ],
        websiteLink: "https://swu.ac.th"
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
      },
      {
        title: "Aihack Thailand 2025 National Finalist",
        subtitle: "Non-Performing Loan & Long Overdue Debtor Risk Modeling",
        issuer: "AIRA & AIFUL, Chulalongkorn Business School & ProbSpace",
        issueDate: "December 2025",
        score: "0.894 ROC-AUC (~40,000 credit records)",
        benchmark: "National Finalist Tier",
        status: "Verified National Finalist",
        certificateImage: "assets/aihack_thailand_2025_certificate.pdf",
        skillsCovered: "Default Risk Modeling, Optuna Optimization, Asymmetric Cost Matrix, LightGBM/XGBoost/CatBoost Ensemble",
        colorCode: "#DC2626"
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
      role: "Track 2 Lead: Data Science & Intelligence",
      company: "KBTG Kampus Hackathon 2026",
      organization: "Kasikorn Business-Technology Group (KBTG)",
      duration: "2026",
      location: "Bangkok, Thailand",
      description: [
        "Led engineering on K-Sentinel & WealthPilot, an autonomous cashflow and real-time fraud defense system for 3.2M young K PLUS mobile banking users.",
        "Architected Two-Tier Graph Inference combining offline PyTorch Geometric Relational GCN 16D node embeddings with ultra-low latency ONNX Runtime v1.30 serving.",
        "Achieved 11.62ms P99 inference latency SLA (beating the bank's < 80.0ms requirement by 7x; core model evaluation = 0.27ms).",
        "Projected 1.2 to 2.0 Billion THB in low-cost CASA deposit mobilization through automated 6% dynamic micro-sweeping into K-eSavings vaults."
      ],
      techStack: ["PyTorch Geometric", "Relational GCN", "ONNX Runtime", "FastAPI", "Redis", "React 18"]
    },
    {
      role: "National Finalist: Long Overdue Debtor (LOD) Prediction",
      company: "Aihack Thailand 2025",
      organization: "AIRA & AIFUL &bull; Chulalongkorn Business School &bull; ProbSpace",
      duration: "Dec 2025",
      location: "Bangkok, Thailand",
      description: [
        "Engineered default prediction engine across ~40,000 real-world consumer loan records under extreme 1:12 default class imbalance.",
        "Formulated temporal delinquency velocity ratios, credit exhaustion slopes, and 5-Fold Stratified Cross-Validation via Optuna Bayesian search.",
        "Implemented out-of-fold rank/probability blending with CatBoost and LightGBM, achieving 0.894 ROC-AUC on out-of-time private test partitions.",
        "Constructed asymmetric cost-matrix threshold optimization balancing catastrophic unrecovered default costs against lost customer margin."
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
        "Architected GuardianAI, a preventive geriatric clinical frailty and acute fall risk scoring engine.",
        "Trained Platt-calibrated XGBoost model on multi-biometric physical gait parameters and patient health records.",
        "Integrated localized SHAP attribution to decompose individual patient risk drivers directly to clinical triage physicians.",
        "Deployed asynchronous containerized FastAPI scoring microservice achieving sub-30ms response times with Docker."
      ],
      techStack: ["XGBoost", "TreeSHAP", "FastAPI", "Docker", "Tailwind CSS", "React"]
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
      id: "k-sentinel-wealthpilot",
      title: "K-Sentinel & WealthPilot (K PLUS for First Jobbers)",
      domain: "Real-Time Graph Fraud Defense & Mobile Cashflow Intelligence",
      context: "KBTG Kampus Hackathon 2026",
      description: "Two-Tier inference architecture uniting PyTorch Geometric Relational GCN mule embeddings with ultra-low latency ONNX serving (< 12ms P99 SLA), Counterfactual Explainable AI recourse, and autonomous cashflow micro-sweeping for 3.2M young bank users.",
      keyMetric: "11.62ms P99 Latency SLA &bull; 1.2–2.0B THB CASA Mobilization",
      techStack: ["PyTorch Geometric", "ONNX Runtime v1.30", "FastAPI", "Redis", "React 18", "TreeSHAP"],
      githubLink: "https://github.com/svkhun/k-sentinel-wealthpilot",
      liveDemoLink: "https://k-sentinel-wealthpilot.onrender.com/"
    },
    {
      id: "credit-risk-xai",
      title: "Enterprise Credit Risk Scoring & Explainable AI (XAI)",
      domain: "Basel II/III Probability of Default (PD) & Model Governance",
      context: "Quantitative Credit Risk Research",
      description: "Dual-scorecard credit engine combining monotonic Weight of Evidence (WoE) and Information Value (IV) screening with calibrated LightGBM and exact instance-level TreeSHAP Shapley decompositions to produce auditable, legally defensible ECOA/FCRA Adverse Action notices.",
      keyMetric: "0.892 ROC-AUC &bull; 42.6% KS Separation &bull; PSI < 0.10",
      techStack: ["LightGBM", "OptBinning", "TreeSHAP", "DiCE Counterfactuals", "FastAPI", "SciPy"],
      githubLink: "https://github.com/svkhun/Credit-Risk-Scoring-Explainable-AI",
      liveDemoLink: null
    },
    {
      id: "aiful-lod-prediction",
      title: "Long Overdue Debtor (LOD) Prediction System",
      domain: "Non-Performing Loan (NPL) Prevention & Asymmetric Loss Optimization",
      context: "Aihack Thailand 2025 National Finalist",
      description: "Default classification on ~40,000 real-world consumer loans under 1:12 default imbalance. Features Bayesian Optuna-tuned LightGBM/XGBoost/CatBoost ensembles and asymmetric cost-matrix threshold optimization balancing unrecovered default principal against lost margin.",
      keyMetric: "0.894 ROC-AUC &bull; ~40,000 Records &bull; National Finalist",
      techStack: ["LightGBM", "XGBoost", "CatBoost", "Optuna", "Scikit-Learn", "Streamlit"],
      githubLink: "https://github.com/svkhun/aiful-credit-risk-modeling",
      liveDemoLink: null
    },
    {
      id: "mfg-data-pipeline",
      title: "Industrial IoT & OEE Manufacturing Data Platform",
      domain: "Hybrid Lambda Data Engineering & Predictive Quality",
      context: "Industrial Automation Systems",
      description: "Hybrid Lambda architecture streaming sub-second PLC telemetry via WebSockets paired with deterministic hourly PostgreSQL 15 Data Mart aggregations (OEE = Availability x Performance x Quality). Employs Isolation Forests and LightGBM with TreeSHAP for root cause sensor anomaly diagnosis.",
      keyMetric: "< 1.0s WebSocket Telemetry &bull; 100% Idempotent Upserts",
      techStack: ["PostgreSQL 15", "FastAPI", "WebSockets", "LightGBM", "TreeSHAP", "React 18", "Docker"],
      githubLink: "https://github.com/svkhun/mfg-data-pipeline",
      liveDemoLink: null
    },
    {
      id: "guardianai-clinical-ops",
      title: "GuardianAI – Clinical Frailty & Fall Risk Intervention",
      domain: "Preventive Geriatric Healthcare Analytics & Clinical Triage",
      context: "True Innovation Launchpad 2026",
      description: "Early frailty and acute fall risk prediction engine using Platt-calibrated XGBoost over multi-biometric physical gait indicators. Features localized SHAP clinical attributions and containerized asynchronous FastAPI scoring endpoints.",
      keyMetric: "< 30ms FastAPI Latency &bull; Localized SHAP Attributions",
      techStack: ["XGBoost", "TreeSHAP", "FastAPI", "Docker", "Tailwind CSS", "React"],
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

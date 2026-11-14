/**
 * Portfolio Data Store
 * Structured data repository inspired by masterPortfolio (Ashutosh Hathidara)
 * Supporting content record; static HTML carries independent page content.
 */

const portfolioData = {
  // Navigation & Branding
  branding: {
    logoText: "< Sivakorn />",
    fullName: "Sivakorn Khundilokrattaya",
    nickname: "svkhun",
    roleTitle: "Computer Engineering Student · Data Science & Machine Learning",
    subTitle: "Computer Engineering at SWU · Expected graduation 2028",
    location: "Bangkok, Thailand",
    statusBadge: "Seeking an internship",
    statusDetail: "Contact me to discuss dates and working arrangements"
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
    primary: "assets/Sivakorn_Khundilokrattaya_Resume_20261114_navy.pdf",
    cv: "assets/Sivakorn_Khundilokrattaya_CV_20261114_navy.pdf",
    aihackCertificate: "assets/aihack_thailand_2025_certificate.pdf",
    nhkScholarshipAnnouncement: "assets/nhk_spring_scholarship_announcement.pdf"
  },

  // Home Page Greeting / Hero
  greeting: {
    title: "Hi all, I'm Sivakorn",
    fullName: "Sivakorn Khundilokrattaya",
    subTitle: "Building explainable decision-support prototypes in credit risk, fraud review, and e-commerce.",
    resumeLink: "assets/Sivakorn_Khundilokrattaya_Resume_20261114_navy.pdf"
  },

  // What I Do (Categorized Tech Stacks & Capabilities)
  whatIDo: [{
    id: "ds-ml",
    title: "Tools used in project work",
    subtitle: "Tools linked to portfolio projects and case studies",
    projectLink: "project-flowsense-trustgraph.html",
    skills: ["Risk modeling and evaluation, explainable scoring, simulated data pipelines and web prototypes."],
    softwareSkills: [
      {
            "name": "Python",
            "level": "Used",
            "projectLink": "project-flowsense-trustgraph.html",
            "category": "cat-ml",
            "description": "Data preparation, graph-training experiments and prototype API logic",
            "project": "K-NEXUS"
      },
      {
            "name": "PyTorch",
            "level": "Used",
            "projectLink": "project-flowsense-trustgraph.html",
            "category": "cat-ml",
            "description": "Training framework for the past-only R-GCN graph experiments",
            "project": "K-NEXUS"
      },
      {
            "name": "LightGBM",
            "level": "Used",
            "projectLink": "project-credit-risk.html",
            "category": "cat-ml",
            "description": "Default-risk ranking evaluated with five-fold cross-validation against a logistic baseline",
            "project": "Credit Risk Scoring"
      },
      {
            "name": "XGBoost",
            "level": "Used",
            "projectLink": "project-lod-engine.html",
            "category": "cat-ml",
            "description": "One of the tree-model options recorded in the competition project stack",
            "project": "LOD Prediction"
      },
      {
            "name": "Scikit-Learn",
            "level": "Used",
            "projectLink": "project-shopee-smart-cod.html",
            "category": "cat-ml",
            "description": "Random forest training, preprocessing and sigmoid calibration for synthetic delivery-risk scoring",
            "project": "Smart COD"
      },
      {
            "name": "ONNX Runtime",
            "level": "Used",
            "projectLink": "project-flowsense-trustgraph.html",
            "category": "cat-ml",
            "description": "Executing paired classifier and embedding artifacts for synthetic recipient-risk review",
            "project": "K-NEXUS"
      },
      {
            "name": "CatBoost",
            "level": "Used",
            "projectLink": "project-lod-engine.html",
            "category": "cat-ml",
            "description": "Blended with LightGBM and evaluated using stratified out-of-fold predictions",
            "project": "LOD Prediction"
      },
      {
            "name": "Pandas & NumPy",
            "level": "Used",
            "projectLink": "project-shopee-smart-cod.html",
            "category": "cat-data",
            "description": "Preparing order features and arrays for the synthetic order-modeling workflow",
            "project": "Smart COD"
      },
      {
            "name": "PyTorch Geometric",
            "level": "Used",
            "projectLink": "project-flowsense-trustgraph.html",
            "category": "cat-data",
            "description": "Building relational graph experiments with 16-dimensional account embeddings",
            "project": "K-NEXUS"
      },
      {
            "name": "PostgreSQL",
            "level": "Used",
            "projectLink": "project-industrial-iot.html",
            "category": "cat-data",
            "description": "Storing simulated machine telemetry for machine-health views and hourly OEE summaries",
            "project": "Industrial IoT"
      },
      {
            "name": "FastAPI",
            "level": "Used",
            "projectLink": "project-shopee-smart-cod.html",
            "category": "cat-backend",
            "description": "Serving delivery-risk scores, checkout policies and the shopping simulator",
            "project": "Smart COD"
      },
      {
            "name": "Docker",
            "level": "Used",
            "projectLink": "project-industrial-iot.html",
            "category": "cat-backend",
            "description": "Containerized local services for the simulated manufacturing data platform",
            "project": "Industrial IoT"
      },
      {
            "name": "Git & GitHub",
            "level": "Used",
            "projectLink": "projects.html",
            "category": "cat-backend",
            "description": "Version history and source review across the portfolio projects",
            "project": "Project repositories"
      },
      {
            "name": "React",
            "level": "Used",
            "projectLink": "project-guardian-ai.html",
            "category": "cat-backend",
            "description": "Building patient-profile, alert-review and care-coordination views with example records",
            "project": "GuardianAI"
      },
      {
            "name": "Vite",
            "level": "Used",
            "projectLink": "project-guardian-ai.html",
            "category": "cat-backend",
            "description": "Development and build tooling for the React dashboard client",
            "project": "GuardianAI"
      },
      {
            "name": "Node.js",
            "level": "Used",
            "projectLink": "project-guardian-ai.html",
            "category": "cat-backend",
            "description": "API layer supporting the dashboard and example patient workflows",
            "project": "GuardianAI"
      },
      {
            "name": "Tailwind CSS",
            "level": "Used",
            "projectLink": "project-guardian-ai.html",
            "category": "cat-backend",
            "description": "Styling the bilingual dashboard layout and care-team interface",
            "project": "GuardianAI"
      },
      {
            "name": "JavaScript",
            "level": "Used",
            "projectLink": "project-shopee-smart-cod.html",
            "category": "cat-backend",
            "description": "Interactive shopping, delivery-feedback updates and analytics views",
            "project": "Smart COD"
      },
      {
            "name": "HTML & CSS",
            "level": "Used",
            "projectLink": "project-shopee-smart-cod.html",
            "category": "cat-backend",
            "description": "Page structure and responsive styling for the smartphone shopping simulator",
            "project": "Smart COD"
      },
      {
            "name": "TreeSHAP",
            "level": "Used",
            "projectLink": "project-credit-risk.html",
            "category": "cat-risk",
            "description": "Explaining which features contribute to a model score in the research interface",
            "project": "Credit Risk Scoring"
      },
      {
            "name": "OptBinning",
            "level": "Used",
            "projectLink": "project-credit-risk.html",
            "category": "cat-risk",
            "description": "Weight-of-evidence binning in the documented research scoring workflow",
            "project": "Credit Risk Scoring"
      },
      {
            "name": "DiCE Recourse",
            "level": "Used",
            "projectLink": "project-credit-risk.html",
            "category": "cat-risk",
            "description": "Showing how hypothetical input changes could affect a model score",
            "project": "Credit Risk Scoring"
      },
      {
            "name": "Optuna",
            "level": "Used",
            "projectLink": "project-credit-risk.html",
            "category": "cat-risk",
            "description": "Tuning LightGBM for the documented five-fold model-development experiments",
            "project": "Credit Risk Scoring"
      }
]
  }],

  // Education & Degrees Received
  education: {
    degrees: [
      {
        "title": "Bachelor of Engineering (B.Eng.) in Computer Engineering",
        "subtitle": "Srinakharinwirot University (SWU, Bangkok, Thailand)",
        "logo": "swu-logo",
        "altName": "SWU",
        "duration": "Expected graduation 2028",
        "focus": "Self-directed focus: data science and explainable decision-support prototypes",
        "descriptions": [
          "Computer Engineering undergraduate at Srinakharinwirot University.",
          "Self-directed project focus: data science, machine learning and explainable decision-support prototypes."
        ],
        "websiteLink": "https://swu.ac.th"
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
        ceremonyVenue: "NHK Training Village, NHK SPRING (THAILAND) CO., LTD.",
        pdfUrl: "assets/nhk_spring_scholarship_announcement.pdf",
        imageUrl: "assets/nhk_spring_scholarship_page1.jpg",
        ceremonyImageUrl: "assets/nhk_spring_scholarship_ceremony.jpg",
        colorCode: "#E11D48"
      }
    ],
    certifications: [
      {
        "title": "STAMP Score Report: Data Analyst Track",
        "subtitle": "Kasikorn Business-Technology Group (KBTG)",
        "issuer": "SKILLKAMP by KBTG",
        "issueDate": "21 March 2026",
        "score": "97 / 150",
        "benchmark": "Report average: 90 / 150",
        "status": "Intermediate",
        "certificateImage": "assets/kbtg_stamp_data_analyst.png",
        "skillsCovered": "Foundations of Data Analysis: 20/30; Data Cleaning and Preprocessing: 23/30; Exploratory Data Analysis and Visualization: 20/30; Data Analysis Techniques and Statistical Methods: 16/30; Machine Learning for Data Analysts: 18/30",
        "colorCode": "#00A950"
      },
      {
        "title": "STAMP Score Report: Digital & Performance Marketer",
        "subtitle": "Kasikorn Business-Technology Group (KBTG)",
        "issuer": "SKILLKAMP by KBTG",
        "issueDate": "21 March 2026",
        "score": "98 / 150",
        "benchmark": "Report average: 94 / 150",
        "status": "Intermediate",
        "certificateImage": "assets/kbtg_stamp_digital_marketer.png",
        "skillsCovered": "Data-Driven Marketing: 21/30; Customer Segmentation and Targeting: 16/30; Digital Marketing Analytics: 26/30; Data-Driven Content Marketing: 19/30; Marketing Strategy and Optimization: 16/30",
        "colorCode": "#00A950"
      },
      {
        "title": "Oxford Placement Test",
        "subtitle": "AUA Language Center / Oxford University Press",
        "issuer": "Oxford University Press",
        "issueDate": "21 June 2026",
        "score": "51 (CEFR B1)",
        "benchmark": "Placement result",
        "status": "CEFR B1",
        "certificateImage": "assets/20260621 Sivakorn Khundilokrattaya.pdf",
        "skillsCovered": "Use of English: 54 / B1; Listening: 48 / B1",
        "colorCode": "#002147"
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

  // Owner-confirmed pitching experience; the certificate documents participation.
  pitching: {
    project: "K-NEXUS — FlowSense & TrustGraph",
    event: "KBTG KAMPUS Hackathon – Intern Edition",
    date: "2026-11-07",
    role: "Pitcher, Developer & Concept Lead",
    placement: "Top 30 Team Overall · Top 10 in Track 2 (Data Science)",
    summary: "Conceived the team's core concept, developed the prototype, and delivered the stage pitch at KBTG KAMPUS Hackathon.",
    certificateImage: "assets/kbtg-kampus-hackathon-2026-certificate.png",
    certificateType: "Certificate of Participation",
    photosStatus: "Official stage photos (5 moments)",
    photos: [
      {
        url: "assets/kbtg-kampus-pitch-01.jpg",
        caption: "Stage Opening — Introducing K-NEXUS & first-jobber money context",
        moment: "Stage Opening"
      },
      {
        url: "assets/kbtg-kampus-pitch-02.jpg",
        caption: "Product Narrative & Architecture — First-jobber spending baseline and recipient-risk review",
        moment: "Product Narrative"
      },
      {
        url: "assets/kbtg-kampus-pitch-03.jpg",
        caption: "Technical Architecture & Methodology — Walking judges through offline R-GCN embeddings and forecast evaluation",
        moment: "Technical Architecture"
      },
      {
        url: "assets/kbtg-kampus-pitch-04.jpg",
        caption: "Live Stage Pitch Delivery — Presenting K-NEXUS Track 2 before judges and peers",
        moment: "Stage Pitch Delivery"
      },
      {
        url: "assets/kbtg-kampus-pitch-05.jpg",
        caption: "Technical Defense & Q&A — Defending ML boundaries & synthetic data decisions",
        moment: "Technical Defense"
      }
    ],
    activityPhotos: [
      {
        url: "assets/kbtg-kampus-group-01.jpg",
        caption: "Grand Finalists & Judging Committee Group Photo in Main Auditorium",
        category: "group"
      },
      {
        url: "assets/kbtg-kampus-group-02.jpg",
        caption: "Participants, Mentors & Organizers Celebration Pose",
        category: "group"
      }
    ],
    videos: [
      {
        url: "assets/kbtg-kampus-activity-video-01.mp4",
        poster: "assets/kbtg-kampus-activity-poster-01.jpg",
        caption: "Team & Mascot Greeting — KBTG Pitching Day",
        duration: "0:05",
        muted: true
      },
      {
        url: "assets/kbtg-kampus-activity-video-02.mp4",
        poster: "assets/kbtg-kampus-activity-poster-02.jpg",
        caption: "Mascot Celebration & Energy — Community Floor",
        duration: "0:08",
        muted: true
      }
    ],
    experienceLink: "experience.html#pitching"
  },

  // Experience & Competitions (Timeline & Cards)
  experience: [
    {
      "role": "Web interface case study",
      "company": "Srinakharinwirot University",
      "duration": "2026",
      "description": [
        "Registration journey. The interface organizes Portal Entry, Information Input and Verification into three visible steps, with a registration link to THE CONCERT.",
        "Faculty discovery. A poster carousel lets visitors browse faculty activities and workshops. The page hierarchy keeps the event overview and faculty content easy to reach.",
        "Event timing and highlights. The countdown shows days, hours, minutes and seconds. Previous-year photos and official social links sit alongside the event information.",
        "Visual system. Prompt typography, dark surfaces and coral/lavender accents give the Thai and English content a consistent appearance across screen sizes."
      ],
      "projectLink": "project-swu-openhouse.html",
      "techStack": [
        "WordPress",
        "Custom CSS",
        "Prompt Font"
      ],
      "stackLabel": "Platform & styling"
    },
    {
      "role": "Independent case-competition prototype",
      "company": "Shopee Ultimate Case Challenge",
      "duration": "2026",
      "description": [
        "Data and modeling. The prototype uses 50,000 synthetic orders and 12,000 buyer profiles. A random forest with sigmoid calibration processes buyer history, basket context, delivery window and courier features.",
        "Holdout evaluation. The saved evaluation reports ROC-AUC 0.8400 and average precision 0.3056 on 3,500 synthetic COD orders. At a 0.15 threshold, the model detects 50 of 91 failures and flags 126 successful orders.",
        "Adaptive checkout and feedback. Four reliability grades map scores to reminders, 20% or 30% deposits, and prepaid options. Simulated successful deliveries add 8 points, failed deliveries subtract 20, and the next checkout policy is recalculated.",
        "Full-stack workflow. FastAPI serves scoring and policy endpoints to a smartphone shopping simulator. The interface includes delivery-feedback controls, rule-based EasySell checks, EDA views and a dataset explorer."
      ],
      "projectLink": "project-shopee-smart-cod.html",
      "techStack": [
        "Python",
        "scikit-learn",
        "Random Forest",
        "Pandas",
        "NumPy",
        "FastAPI",
        "HTML5",
        "CSS3",
        "JavaScript"
      ],
      "stackLabel": "Tech Stack"
    },
    {
      "role": "Application project · Dashboard prototype",
      "company": "True Innovation Launchpad 2026 application · Team Nakphatthana Tuapralat",
      "duration": "2026",
      "description": [
        "Patient review. Profile views bring example patient information and risk-factor explanations into one dashboard so a reviewer can inspect the reason for a flag.",
        "Care coordination. Alert acknowledgement, provider assignment, follow-up status and care notes connect the review queue to the next care-team task.",
        "Client and API. A React/Vite client connects to a Node.js API. Tailwind CSS styles the interface and Thai/English localization supports the care workflow. The dashboard has not been clinically validated."
      ],
      "projectLink": "project-guardian-ai.html",
      "techStack": [
        "React",
        "Vite",
        "Node.js",
        "Tailwind CSS",
        "JavaScript"
      ],
      "stackLabel": "Tech Stack"
    },
    {
      "role": "Hackathon application concept",
      "company": "CDG Hackathon 2026 application · Team GrandGuardianAI",
      "duration": "2026",
      "description": [
        "Monitoring concept. The application proposes collecting service telemetry so an operator can inspect system signals and related alerts in one workflow.",
        "Alert handling. The concept covers anomaly rules, alert review and incident prioritization, with proposed Python and REST API components.",
        "Reliability planning. Proposed containerized services and Linux-based operations would support response runbooks and recovery checks. Production availability and zero-downtime failover have not been demonstrated."
      ],
      "projectLink": "project-cdg.html",
      "techStack": [
        "Python",
        "Docker",
        "Linux",
        "REST APIs"
      ],
      "stackLabel": "Proposed Stack"
    },
    {
      "role": "Pitcher, Developer & Concept Lead — Track 2: Data Science & Intelligence",
      "company": "KBTG Kampus Hackathon 2026",
      "status": "Top 30 Team Overall · Top 10 in Track 2 (Data Science)",
      "organization": "Kasikorn Business-Technology Group (KBTG)",
      "duration": "7 November 2026",
      "location": "Bangkok, Thailand",
      "description": [
        "Conceived the team's core product concept, engineered the K-NEXUS prototype, and delivered the stage pitch at KBTG KAMPUS Hackathon – Intern Edition on 7 November 2026, ranking in the Top 30 Teams overall and Top 10 in Track 2 (Data Science).",
        "The Application uses history/scenario/abstention rules with FlowSense ML disabled; the Showcase contains separate research evidence.",
        "Saved TrustGraph test AP: no-GNN baseline 0.99640; R-GCN + LightGBM 0.99373. No GNN superiority is established.",
        "No tested FlowSense forecast met the acceptance criteria; the 30-day ML forecast did not beat the baseline. Financial data and transfers remain simulated; real-world impact is not established."
      ],
      "techStack": [
        "PyTorch Geometric",
        "LightGBM",
        "ONNX Runtime",
        "FastAPI",
        "React 18",
        "Vite"
      ]
    },
    {
      "role": "Undergraduate Engineering Scholar",
      "company": "NHK Spring (Thailand) Undergraduate Scholarship",
      "organization": "NHK SPRING (THAILAND) CO., LTD. &bull; Faculty of Engineering, SWU",
      "duration": "2026 - 2027",
      "location": "Bangkok & Samut Prakan, Thailand",
      "description": [
        "Recipient of the corporate undergraduate engineering scholarship awarded under competitive cumulative GPAX (>= 2.75) criteria and faculty character endorsement.",
        "Awarded an educational grant of 30,000 THB per academic year for the 2026-2027 period.",
        "Scholarship includes a planned 2-month summer engineering internship with accommodation and living allowance."
      ],
      "techStack": [
        "Computer Engineering",
        "Precision Manufacturing",
        "Industrial Automation",
        "Quality Control"
      ]
    },
    {
      "role": "National Finalist: Long Overdue Debtor (LOD) Prediction",
      "company": "Aihack Thailand 2025",
      "organization": "AIRA & AIFUL &bull; Chulalongkorn Business School &bull; ProbSpace",
      "duration": "Dec 2025",
      "location": "Bangkok, Thailand",
      "certificateImage": "assets/aihack_thailand_2025_certificate.png",
      "certificatePdf": "assets/aihack_thailand_2025_certificate.pdf",
      "description": [
        "National finalist (team entry).",
        "The public repository documents 0.65333 out-of-fold ROC-AUC for the V13 CatBoost/LightGBM blend. The competition dataset is imbalanced; confidential records are not published.",
        "Model development and finalist status do not establish debt recovery or deployed lending performance."
      ],
      "techStack": [
        "LightGBM",
        "XGBoost",
        "CatBoost",
        "Optuna",
        "Scikit-Learn",
        "OptBinning"
      ]
    },
    {
      "role": "Top 24 team · WELLYNC",
      "company": "NTT DATA Challenge 2026",
      "duration": "2026",
      "description": [
        "Top 24 team. The linked repository belongs to teammate Panupong-xD; it documents the team prototype."
      ],
      "repository": "https://github.com/Panupong-xD/NTT-Data"
    }
  ],

  // Featured Engineering Projects
  projects: [
    {
      "id": "wellync",
      "title": "WELLYNC — Agentic Healthcare Platform",
      "domain": "Top 24 team",
      "context": "NTT DATA Challenge 2026",
      "description": "A team healthcare platform prototype connecting patient, caregiver and physician workflows. Top 24 team recognition. The project repository is maintained by teammate Panupong-xD and documents the team prototype.",
      "techStack": [
        "Healthcare workflows",
        "Team project"
      ],
      "caseStudyLink": "project-wellync.html",
      "githubLink": "https://github.com/Panupong-xD/NTT-Data"
    },
    {
      "id": "cdg",
      "title": "Operational AI & System Reliability",
      "domain": "Hackathon application concept",
      "context": "CDG Hackathon 2026 application · Team GrandGuardianAI",
      "description": "A proposal for operational monitoring that brings telemetry, anomaly alerts and incident response into one review workflow. The concept covers monitoring signals, alert review and reliability runbooks. Production availability and zero-downtime failover have not been demonstrated.",
      "techStack": ["Python", "Docker", "Linux", "REST APIs"],
      "caseStudyLink": "project-cdg.html"
    },
    {
      id: "swu-openhouse-2026",
      title: "SWU OPEN HOUSE 2026 — Web Enhancement & UX/UI",
      domain: "Event Registration & Responsive Web Engineering",
      context: "SWU Open House interface case study",
      caseStudyLink: "project-swu-openhouse.html",
      description: "Interface with a three-step registration guide, faculty poster carousel, event countdown and responsive page sections.",
      keyMetric: "3-Step Registration Flow &bull; Interactive Faculty Carousel &bull; Responsive Design",
      techStack: ["WordPress", "Custom CSS", "Prompt Font"],
      mockupLaptop: "assets/swu-openhouse-laptop-frame.png",
      mockupDevice: "assets/swu-openhouse-vertical-device.png",
      githubLink: null,
      liveDemoLink: null
    },
    {
      id: "shopee-smart-cod",
      title: "Shopee Smart COD Reliability",
      domain: "E-Commerce Delivery Risk & Adaptive Checkout",
      context: "Independent case-competition prototype",
      caseStudyLink: "project-shopee-smart-cod.html",
      description: "Independent case-competition prototype, synthetic data, not affiliated with or endorsed by Shopee. Calibrated Random Forest failure prediction, four reliability grades, adaptive deposit policies, delivery-feedback scoring, and a FastAPI-powered shopping simulator evaluated on synthetic order data.",
      keyMetric: "0.8400 ROC-AUC on Synthetic Holdout &bull; 50,000 Synthetic Orders &bull; 4 Risk Grades",
      techStack: ["Python", "scikit-learn", "Random Forest", "Pandas", "NumPy", "FastAPI", "HTML5", "CSS3", "JavaScript"],
      githubLink: "https://github.com/svkhun/Shopee-Ultimate-Case-Challenge",
      liveDemoLink: null
    },
    {
      id: "k-flowsense-trustgraph",
      title: "K-NEXUS — FlowSense & TrustGraph",
      domain: "Real-Time Graph Fraud Defense & Mobile Cashflow Intelligence",
      context: "KBTG Kampus Hackathon 2026 — Top 30 Team, Top 10 in Track 2: Data Science & Intelligence",
      caseStudyLink: "project-flowsense-trustgraph.html",
      description: "Financial intelligence and recipient-risk prototype. Conceived core concept, built prototype, and delivered hackathon pitch. FlowSense uses an explainable history/scenario/abstention baseline with ML disabled. TrustGraph combines stored graph context, ONNX scoring and separate policies; saved comparisons do not show a GNN advantage.",
      keyMetric: "Top 30 Team &bull; Top 10 Data Science &bull; Baseline Comparisons",
      techStack: ["PyTorch Geometric", "LightGBM", "ONNX Runtime", "FastAPI", "React 18", "Vite"],
      githubLink: "https://github.com/svkhun/K-NEXUS-Application",
      showcaseRepository: "https://github.com/svkhun/K-NEXUS-Showcase",
      showcaseLink: "https://k-nexus-showcase.onrender.com/",
      liveDemoLink: "https://k-nexus-app.onrender.com/"
    },
    {
      id: "credit-risk-xai",
      title: "Credit Risk Scoring & Explainable AI (XAI)",
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
      context: "Dashboard prototype · Example records",
      description: "Bilingual frailty-triage dashboard prototype with patient profiles, explainable risk-factor views, alert acknowledgement, and care-team follow-up workflows. Clinical outcomes have not been validated.",
      keyMetric: "Frailty Review &bull; Risk Factors &bull; Care Coordination",
      techStack: ["React", "Vite", "Node.js", "Tailwind CSS", "JavaScript"],
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
    availability: "Seeking an internship. Contact me to discuss dates and working arrangements.",
    resumePdf: "assets/Sivakorn_Khundilokrattaya_Resume_20261114_navy.pdf",
    cvPdf: "assets/Sivakorn_Khundilokrattaya_CV_20261114_navy.pdf"
  }
};

// Export for ES modules or attach to global window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
} else if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}

# Resume, CV & Cover Letter Editorial Build System

This directory maintains the source code and build automation for Sivakorn Khundilokrattaya's matched editorial document suite (`Newsreader` serif + `Inter` sans-serif + `#C96442` terracotta accent, bundled locally in `../assets/fonts/`).

## Documents

1. **Resume (1-Page Industry Resume — Website Primary Download)**
   - Source: `resume.html`
   - Output: `Sivakorn_Khundilokrattaya_Resume.pdf` (Strictly 1 A4 Page)
   - Target: Fast-track industry portals, ATS screening, and the single primary download button on the portfolio website (`index.html`, `experience.html`, `contact.html`).

2. **Curriculum Vitae (2-Page Complete Technical & Competition Dossier)**
   - Source: `cv.html`
   - Output: `Sivakorn_Khundilokrattaya_CV.pdf` (Strictly 2 A4 Pages)
   - Target: Research fellowships, academic applications, and deep-dive reviews. Uses left-rail competition/context tags (`KBTG Top 10 DS`, `Aihack Finalist`, `Shopee Challenge`, `Research Prototype`) on Page 1, and houses Additional Projects, a unified Honors & Competition Leadership roster, and Standardized Assessments on Page 2.

3. **Cover Letter (1-Page Editorial Cover Letter)**
   - Source: `cover_letter.html`
   - Output: `Sivakorn_Khundilokrattaya_Cover_Letter.pdf` (Strictly 1 A4 Page)
   - Target: Matched 1-page cover letter for Data Science, Machine Learning, and Quantitative Fintech internship applications.

## How to Build & Recompile

Run the automated build script:
```bash
python build_resume/build_documents.py
```

This will:
1. Re-render all three documents using headless Google Chrome with exact A4 print settings and suppressed browser headers/footers.
2. Programmatically verify page counts (`Resume = 1 page`, `CV = 2 pages`, `Cover Letter = 1 page`).
3. Copy all verified PDFs to `../assets/`.

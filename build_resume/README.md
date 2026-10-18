# CV & Resume Build System

This directory maintains the source code and build automation for Sivakorn Khundilokrattaya's CV and resume. Both use the local Geist font and a shared print theme in `document-theme.css`.

## Documents

1. **Curriculum Vitae (2-Page Academic & Technical Dossier)**
   - Source: `cv.html`
   - Output: `Sivakorn_Khundilokrattaya_CV.pdf` (Strictly 2 A4 Pages)
   - Target: Academic research, engineering fellowships, deep-tech and quantitative roles.

2. **Resume (1-Page Industry Resume)**
   - Source: `resume.html`
   - Output: `Sivakorn_Khundilokrattaya_Resume.pdf` (Strictly 1 A4 Page)
   - Target: Industry engineering, data science, and fast-track hiring pipelines.

## How to Build & Recompile

Run the automated build script:
```bash
python build_resume/build_documents.py
```

This will:
1. Re-render both documents using headless Google Chrome with exact A4 print settings and suppressed browser headers/footers.
2. Programmatically verify page counts (CV = 2 pages, Resume = 1 page).
3. Copy the verified PDFs to `../assets/`, where the portfolio download links point.

Chrome is used for printing when available. If its command-line printer cannot start, the script uses `print_documents.cjs` with Playwright. Install Playwright locally or set `PLAYWRIGHT_MODULE` to an existing Playwright package; `CHROMIUM_EXECUTABLE` can point to an installed Chromium binary.

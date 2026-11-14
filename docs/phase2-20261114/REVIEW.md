# Phase 2 review record

Branch: `codex/phase2-evidence-content`. Website changes are local; no push or deployment was performed.

## Implemented website changes

- Unified identity: **Computer Engineering Student · Data Science & Machine Learning**.
- Tagline: **Building explainable decision-support prototypes in credit risk, fraud review, and e-commerce.**
- Expected graduation is 2028, including the embedded Education illustration. Unconfirmed enrollment dates, coursework and availability details are omitted. Six tools in the Home technology component link to their documented K-NEXUS use; no general proficiency rating is asserted.
- LOD uses the attributed V13 out-of-fold ROC-AUC of 0.65333; unconfirmed record counts and class proportions are omitted. Finalist status is identified as a team entry.
- Experience contains the confirmed hackathon/competition entries. WELLYNC retains Top 24 team and explicitly attributes its source repository to a teammate.
- The independent commerce prototype is kept under Projects with a synthetic-data and non-affiliation label. The unconfirmed personal leadership title is omitted.
- The other unshortlisted applications are removed from current website copy, shared data, README, graphics and revised Resume/CV. Original PDFs are retained as requested and are no longer the site's download targets.
- GuardianAI is a dashboard prototype using example records, with no selection, training or latency claim. Clinical-validation limits remain explicit.
- SWU describes interface features without personal leadership, measured conversion/traffic results or an asserted registration API integration.
- Both assessment breakdowns match the original report images, with dates of 21 March 2026 and conservative comparisons against report averages. Oxford is score 51, CEFR B1, dated 21 June 2026.
- Forecast results use plain language and distinguish candidate model MAE from baseline MAE. The failed comparisons, disabled ML, synthetic scope and absence of realized outcomes remain explicit. Existing source artifact identifiers and URLs are preserved.
- README benchmark and HTTP-header statements match their cited sources and local configuration.
- Stale illustration claims are removed or replaced by explicitly illustrative diagrams. No invented ROC curve is presented as an experimental result.
- Document previews manage keyboard focus and return it on close. Copy-email feedback uses an initially empty live status region. Shorter project labels fit the original mobile grid; reduced-motion metric visibility is corrected in JavaScript.

## Design decision

The user rejected the new design and requested the last-pushed design with content corrections only. `css/styles.css`, `build_resume/document-theme.css` and the inline Resume/CV styles match pushed commit `92ecc471d6c686dae44d87e0d4620c3ddf59397b`. Original Home technology cards, Education score rows, typography, colors, geometry and normal animations are retained. Unsupported tool cards are removed and illustration labels are corrected within their existing geometry.

The uncommitted transition preview and experimental fonts were moved to the external task-artifact archive. They are absent from the website and this branch. No site-wide transition system is added.

## Validation

- Before edits: deployed-source parity was confirmed against the original source commit; see `PERFORMANCE_BASELINE.md` and its JSON record.
- Lighthouse baseline: Home mobile median performance 90, LCP 2.483 seconds, CLS 0 over three runs; desktop performance 96, LCP 0.671 seconds, CLS 0.008403. These are deployed-site lab measurements, not field results or measurements of this edited branch.
- Static validation: 13 root HTML files, 381 local references, no missing targets/fragments, no duplicate IDs, one H1 per content page; SVG XML parses.
- Browser validation: 12 content pages at 360px and 1440px; no horizontal overflow or page-script errors. Titles match the approved identity. Preview open/focus/Tab/Escape/focus return, email status, cross-page fragment navigation, browser Back and JavaScript-disabled navigation passed in installed Chrome.
- JavaScript syntax and whitespace checks pass. All four Home tool filters return the expected 4/1/1/6 cards. Reduced-motion statistics remain visible. Preview focus also passes with the browser animation API removed.
- Matched local Lighthouse comparison: Home three-run median performance 70 to 87, LCP 4.238 to 3.008 seconds, median CLS 0 to 0. Experience remains slow in both versions: LCP 19.183 to 18.927 seconds in one run each. These local runs are separate from the deployed baseline and do not establish field performance. See `PERFORMANCE_COMPARISON.md`.

## Resume and CV completed locally

After the user's instruction to continue all work using prior evidence, Resume/CV content and the generator were revised. The earlier proposal is superseded by `document-review-final.md` and the final patch in the external task artifacts. That inventory includes every current entry, project bullet and retained contact. Original and revised document sources remain reviewable in Git.

New files: `assets/Sivakorn_Khundilokrattaya_Resume_20261114_content_v2.pdf` and `assets/Sivakorn_Khundilokrattaya_CV_20261114_content_v2.pdf`. Resume is one A4 page with 10 clickable links; CV is two A4 pages with 14 clickable links. All three rendered pages were visually inspected. Bullet/title text, footer page numbering, page boundaries, absence of replacement glyphs and download responses were checked. The English documents use the existing bundled fonts; no Thai text was added.

The generator reads the maintained HTML instead of restoring embedded stale templates. Both build entry points generate Resume/CV only, require a new revision suffix, reject unresolved fields and refuse overwrites. New files go under ignored `output/pdf/`; copies are placed in `assets/` only after review. Original PDFs and Cover Letter HTML match the pushed revision.

Still unknown and omitted: available dates and working arrangement; exact NHK internship months; enrollment year; actual coursework; unconfirmed personal contributions and broader technology/language levels. Final PDFs contain no review placeholders. Cover Letter source and PDF remain deferred, unchanged and unlinked from the website.

Whole-project source results are in external `KEYWORD_SCAN.md` and `static-verification.json`; PDF extraction results are in `pdf-keyword-scan.json`. Remaining matches are the generator's rejection rules, the confirmed KBTG role, CSS identifiers/comments, manufacturing terms, supported sigmoid-calibration implementation, explicit limitations and historical records. The held Cover Letter and preserved original PDFs contain older wording; their exceptions are fully listed. New Resume/CV contain only the confirmed KBTG role among the searched sensitive terms. No claim of a completely clean archival PDF set is made.

## Matching LinkedIn copy

Headline: Computer Engineering Student · Data Science & Machine Learning

Tagline: Building explainable decision-support prototypes in credit risk, fraud review, and e-commerce.

This is copy for review; no external profile was edited.

## Review and publication

Changes are committed in logical groups on the local branch. No push, deployment or external profile edit was performed. Review the diff before authorizing publication. A fresh check of five main deployed pages plus shared CSS, JavaScript and data still matches the last-pushed source after text normalization. The deployed CSS also matches this branch; the five HTML pages, JavaScript and data differ because the local corrections are unpublished. Remote main remains `92ecc471d6c686dae44d87e0d4620c3ddf59397b`.

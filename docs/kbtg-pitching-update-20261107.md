# KBTG KAMPUS pitching update — 7 November 2026

The portfolio owner explicitly confirmed that they developed the entire K-NEXUS project independently and were the pitcher on 7 November 2026. This first-person confirmation replaces the provisional team-contribution wording used in the 6 November website update. It does not change the technical evaluation or synthetic-data limitations.

The supplied original image is copied unchanged to `assets/kbtg-kampus-hackathon-2026-certificate.png` (SHA-256 `dcb4714a55e0d32860f50094f8176797c81a167bcf771f676651d67cda8a9741`). It names Sivakorn Khundilokrattaya, KBTG KAMPUS HACKATHON – INTERN EDITION, organized by KASIKORN Business-Technology Group, issued 7 November 2026. It is a **Certificate of Participation**. It does not establish an award, placing, solo authorship, or a certified pitching skill. The existing finalist statement is retained from the previous portfolio record; it is not attributed to this certificate.

## Layout

- Home: a pitching highlight and certificate thumbnail link to `experience.html#pitching`.
- Experience: developer/pitcher role, dated event description, certificate preview using the existing modal plus a full-size link, three communication/ownership themes, and two clearly marked pending photo spaces.
- Projects and the K-NEXUS case study: consistent solo-developer/pitcher wording and a link to the experience section.
- Shared data: `portfolioData.pitching` records the event, role, certificate type, and empty photo list. These pages currently use static HTML, so update the HTML alongside the data store.
- Styling lives in the shared `css/styles.css` so the new section also renders when reached through the site's persistent navigation from another entry page.

## Adding official event photos later

Save the received images under `assets/` with descriptive filenames. In `experience.html`, replace each pending `.pitch-photo` figure's index and placeholder caption with an `<img>` (accurate alt text, intrinsic width/height, `loading="lazy"`) and a factual `<figcaption>`. The existing CSS handles photo sizing and mobile stacking. Change the gallery's awaiting-photos note and populate `portfolioData.pitching.photos` / `photosStatus` to match the received assets. Do not label an anticipated photo as an existing event record.

This website update does not regenerate the downloadable resume/CV or modify the K-NEXUS Application/Showcase repositories. No competition result, numerical pitching rating, presentation duration, Q&A performance, or judging feedback is inferred.

## Verification performed

- JavaScript syntax checks passed for `js/portfolio-data.js` and the existing `js/main.js`; `git diff --check` passed.
- Static checks covered 12 HTML pages and 267 local references: no missing files/fragments, duplicate IDs, or incorrect H1 counts on content pages.
- Local browser review covered the Home highlight and Experience section at 1440px and 390px widths, plus light/dark appearance. No horizontal overflow was observed; the Experience content and pending photo areas stack on mobile.
- Home-to-Experience navigation, Projects-to-Experience navigation with persistent page replacement, and the certificate modal's image/open/close behavior were verified.
- The local pages and certificate returned HTTP 200. SHA-256 comparison confirmed the certificate asset exactly matches the supplied original.
- The temporary preview server was stopped after verification. No commit, push, or deployment was performed.

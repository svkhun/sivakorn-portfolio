# Performance baseline before Phase 2

Recorded: 2026-11-14T08:09:26.430Z (UTC). Source commit: `92ecc471d6c686dae44d87e0d4620c3ddf59397b`.

Lighthouse 13.6.0, installed Chrome, default simulated mobile throttling; desktop uses the bundled desktop preset. Each run launches a fresh browser/profile. These are lab results, not field Core Web Vitals. Raw JSON/HTML reports are retained in the task artifact directory; their hashes and exact run settings are in `performance-baseline.json`.

| Run | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS |
|---|---:|---:|---:|---:|---:|---:|
| home-mobile-1 | 90 | 96 | 100 | 100 | 2.244 | 0.000000 |
| home-mobile-2 | 90 | 96 | 100 | 100 | 2.483 | 0.000000 |
| home-mobile-3 | 85 | 96 | 100 | 100 | 2.512 | 0.000000 |
| home-desktop | 96 | 96 | 100 | 100 | 0.671 | 0.008403 |
| education-mobile | 81 | 95 | 100 | 92 | 3.989 | 0.000000 |
| experience-mobile | 72 | 96 | 100 | 100 | 9.728 | 0.000000 |
| projects-mobile | 91 | 89 | 100 | 100 | 2.384 | 0.000000 |
| contact-mobile | 95 | 93 | 100 | 100 | 2.303 | 0.009285 |
| flowsense-mobile | 92 | 100 | 100 | 100 | 2.509 | 0.000000 |
| shopee-mobile | 93 | 100 | 100 | 100 | 2.317 | 0.000000 |

Home mobile median over three runs: performance 90; LCP 2.483 seconds; CLS 0.

Deployment parity: all 12 content pages match the checkout after UTF-8 BOM and CRLF normalization. Shared JavaScript matches after line-ending normalization. CSS, shared data and linked resume/CV PDFs match byte-for-byte. The legacy case route redirects to the FlowSense case as configured. No content drift was found in the checked surfaces.

This baseline was completed before content edits. No changes were pushed or deployed.

# K-NEXUS content update — 6 November 2026

Content-only update: existing site design, navigation, line-boil portrait, and the separately requested signature/loading intro are preserved. The Application and Showcase repositories were read only; no training, model export, application edits, commit, push or deployment was performed.

Verified public repository identities through the connected GitHub integration: [K-NEXUS-Application](https://github.com/svkhun/K-NEXUS-Application) and [K-NEXUS-Showcase](https://github.com/svkhun/K-NEXUS-Showcase). Their local source directories are `k-web-application` and `k-nexus-showcase` respectively. File versions read in this update are recorded in `k-nexus-source-hashes.json`.

| Claim | Owning source | Scope |
|---|---|---|
| History mean with min 7 complete known days in 28; scenario; abstain | Application `src/baseline_policy.py`, `select_spending`, version `history28-min7-scenario-abstain.v1` | Source at release commit `46ad6e28c996e74dfd6c41171f7d79f1e17e0f55` also fetched through GitHub |
| FlowSense ML disabled / TrustGraph enabled | Application `models/serving.json`; `src/liquidity_forecast.py` | Documented Application configuration, not all historical Showcase endpoints |
| Daily scenario assumptions 350/600/300 THB, non-bill | Application `config/baseline-personas.v1.json` | Synthetic assumptions, not observed customer means |
| Past-only channel/reverse-channel graph; 16D offline embeddings | Showcase `src/train_trustgraph_two_tier.py`, `graph_inputs`, `TrustGraphRGCN`, `features`; Application `src/model_package.py` | Revised leakage-aware pipeline; does not establish external validity |
| Test AP no-GNN 0.9964040920 vs R-GCN+LightGBM 0.9937268979 | Showcase `artifacts/model-handoff/trustgraph-evaluation.json`, `results.*.test` | 1,354 synthetic transactions / 67 positive labels; GNN superiority not established |
| FlowSense Gate 2 not passed; no qualifying export | Showcase `artifacts/flowsense-studies/fs-gate2-20261028-01/decision.json` | Data-contract acceptance is distinct from predictive acceptance |
| Paired MAE and counts used in the case study | Same study `DIAGNOSTICS_TH.md`, paired table | Common origins 1,419/1,173/1,139/1,121; 6 candidate-only scored origins each horizon; do not mix with conditional scores |
| Direct ML not validated for integration | `artifacts/flowsense-studies/fs-direct-dev-20261028-01/REPORT_TH.md` | Reused development data; not independent integration validation |
| Historical demo status | Application `docs/final-demo-audit/20261030-0837/FINAL_DEMO_AUDIT_TH.md` | Application release `application-scenario-ux-20261030.1` at `46ad6e2`; Showcase `showcase-baseline-20261029.1` at `7e3ff1b`; READY_FOR_DEMO_WITH_LIMITATIONS, not production approval |
| Participation / finalist / role | Existing portfolio record | Preserve the recorded track role; do not infer individual ownership of every component |

The local Showcase README claims removal of POST routes; the historical audit documents legacy mutable routes in the deployed release. Different source/release states are not interchangeable. No new backend-wide read-only or current-live deployment claim is made. Repository-documented demo links are retained without asserting current uptime.

Updated surfaces: Home summary and K-specific headline/tool descriptions, Projects summary/entry/links, Experience K-NEXUS entry, full K-NEXUS case study, related case navigation and redirect labels, shared data store, README, and downloadable resume/CV sources. The HTML-to-PDF generator wording is updated so a later rebuild does not reintroduce obsolete K-NEXUS claims. Other projects' metrics were outside this bounded update.

Removed or qualified: active FlowSense ML / validated 30-day forecasting, GNN superiority, current banking latency SLAs, realized CASA/scam-prevention outcomes, official bank ownership/endorsement, outdated model-leakage descriptions, and per-component personal authorship without supporting evidence.

## Validation executed

- JavaScript syntax: `node --check js/portfolio-data.js` and `node --check js/main.js` passed.
- Static HTML/local-link check: 12 root HTML pages, 237 local links/targets, no missing targets or fragment errors, one H1 per content page, no duplicate IDs.
- Read-only preservation: all 12 recorded Application/Showcase source hashes remained unchanged.
- PDF regeneration: existing HTML print pipeline used; downloaded Resume remains 1 A4 page and CV remains 2 A4 pages. Updated K-NEXUS text was extracted and all 3 rendered page previews were visually inspected before replacing the linked assets.
- `git diff --check` passed. No production build tool is configured for this static original website; no build or deployment of the Application/Showcase was performed.
- Website layouts, device rendering, live K-NEXUS availability and other projects' metrics were not revalidated in this content-only update.

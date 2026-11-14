# Local comparison after content edits

Lighthouse 13.6.0, installed Chrome, default mobile simulated throttling. Each audit used a fresh browser/profile. Runs alternated between the extracted last-pushed source on local port 8766 and the edited branch on port 8765. Both used the same machine and static-server implementation. Only the performance category was measured in this comparison.

These runs are separate from the earlier deployed baseline. Local delivery, external resource timing and run-to-run CPU variation limit the comparison; this is not field Core Web Vitals evidence.

| Page / revision | Run | Performance | LCP (s) | CLS | TBT (ms) |
|---|---:|---:|---:|---:|---:|
| Home / pushed | 1 | 70 | 4.238 | 0 | 221.5 |
| Home / content | 1 | 86 | 3.016 | 0 | 44 |
| Home / pushed | 2 | 70 | 4.357 | 0.004499 | 217 |
| Home / content | 2 | 87 | 3.008 | 0 | 26 |
| Home / pushed | 3 | 84 | 3.157 | 0 | 54 |
| Home / content | 3 | 87 | 3.007 | 0.005223 | 23.5 |
| Experience / pushed | 1 | 55 | 19.183 | 0 | 462 |
| Experience / content | 1 | 69 | 18.927 | 0.000373 | 61 |

Home median performance is 70 to 87; median LCP is 4.238 to 3.008 seconds; median CLS is 0 in both. No performance-score or LCP regression was observed in these sampled pages. Small layout shifts occurred in individual runs. Experience remains slow in both versions, so this content change does not resolve that existing loading issue.

No animation library, font or site-wide navigation effect was added. The shared stylesheet equals the last-pushed source. Raw audit JSON and the machine-readable summary remain under the external task-artifact `performance-comparison/` directory.

# Scientific source map

Reviewed 25 November 2026. This is the internal record for `index.html`. See [paper-audit.md](paper-audit.md), [code-audit.md](code-audit.md), [asset-provenance.md](asset-provenance.md), and [design-audit.md](design-audit.md) for the detailed evidence.

## Sources and versions

- **P**: [arXiv:2604.09331v2](https://arxiv.org/abs/2604.09331v2), revised 18 September 2026. The full PDF, HTML, original TeX, Appendix A, and figure inventory were read. This is the primary scientific source.
- **V**: [official IEEE CDC 2026 program, WeBT7.2](https://css.paperplaza.net/conferences/conferences/CDC26/program/CDC26_ContentListWeb_3.html#webt7_02). Verifies scheduled paper, author order, and affiliations. No final proceedings DOI/pages verified.
- **C**: [pnnl/COPIP at 5839ee5](https://github.com/pnnl/COPIP/tree/5839ee5f572b7ab8f65a69609b06e1159afc4632). Implementation audit records all Python files, released models, and differences from the manuscript.
- **A**: Current SOLARIS papers v13 scene and exact updater. A presentation asset, not experimental evidence. The v6 animation differs from the current page; this site uses the actual v13 scene.
- **T**: TQPNet and the TQPNet-derived Battery-MI-DPC page. Visual foundation only.

## Public content to evidence

| Public element | Source | Interpretation retained |
|---|---|---|
| Title, four authors, order, equal contribution, affiliations | P first page; V | Paper spelling; departmental attribution only where manuscript provides it. |
| IEEE CDC 2026 accepted label | V | Accepted/scheduled; not yet presented as of review date. |
| Hero: interpretable dynamics from video; stability built into model | P I, IV, V | Stability concerns the semi-contracting latent LTI model, not correct recovery or a controller. |
| Overview: uncertain initial conditions, input GP, latent noise | P III, Theorem 1 and its proof | Input mean/covariance known; input and initial conditions independent. |
| LTI equation and GP-output notation | P Eq. (6), Theorem 1 Eqs. (7)–(9) | General feedthrough D and initial-state uncertainty not silently removed. |
| Four method stages | P V, Fig. 1, Eqs. (13)–(16) | Gaussian pseudo-observations; analytic conditioning yields a variational approximation, followed by sampling/decoding and joint offline training. |
| Loss description | P V-A, VI-C; C Train_VAE.py | Qualitative reconstruction/KL/L1 description avoids copying the manuscript's inconsistent objective sign/direction. |
| Parameterization and LMI identity | P Theorems 2–3, Eqs. (10)–(12), Appendix A | Positive P; non-strict condition; same-input distance in P metric is nonincreasing, not necessarily exponentially decreasing. |
| Specialized encoder | P VI-B1; C VAE.py | CNN → spatial softmax → polar coordinates → temporal unwrapping → learned mean/variance. |
| Fixed B,C,D and identifiability explanation | P VI-B3, VI-D2/3 | Case-study prior structure, distinct from general theorem. |
| Results lead, error 0.02 | P Table I, VI-D2 | Spectral-norm state-matrix error in one simulated particle case. |
| 40,000 videos; 25 frames; 40×40 binary pixels; two-dimensional state | P VI-A | Generated data total, not claimed training-set size. No invented split. |
| Original Figure 10 | P VI-D4, Fig. 10 | Test video/latent/reconstruction examples with overlaid frames. |
| Ablation table: 0.02, 0.63, 0.63, 2.53; 600 epochs | P Table I, VI-D1/2 | Exact printed values; averaging protocol and repeated-run uncertainty are not specified. |
| True A=diag(-0.6,0) | P VI-A | Marginal angular mode allowed; no strict-Hurwitz claim. |
| Missing hardware/batch/run statistics | Full P VI | Not specified; do not import code defaults. |
| Figure 5 caption | P VI-D3, Fig. 5 | Test-set-averaged angular absolute error and predictive variance, not run-to-run uncertainty. |
| Figure 6 caption | P VI-D4, Fig. 6 and original labels | One randomly selected test trajectory, prior/posterior, original 95% CI. Conditioning is not an unseen-future forecast benchmark. |
| Scope: theory versus correct identification/control | P IV, VI, VII, Appendix A | No guarantee of controller stability, unique recovery, or arbitrary forced-response boundedness. |
| Future nonlinear/Koopman and sparse-GP work | P VII | Future directions rather than demonstrated applications. |
| Code/data generation/weights resources | C README and pinned tree | No claim of turnkey reproduction or notebook. |
| Bibliography/metadata | P arXiv record; V separately | Citation is preprint DOI, not an invented IEEE DOI. |
| Funding acknowledgment | P first-page footnote | Original organizations, grant and contract numbers. |

## Numerical record

| Item | Values | Locator |
|---|---|---|
| State-matrix error, full/PEGP/MLP2/NREG | 0.02 / 0.63 / 0.63 / 2.53 | Table I |
| Training epochs | 600 | VI-D1 |
| Generated video total | 40,000 | VI-A |
| Frames and dimensions | 25; 40×40 | VI-A |
| Latent state dimension | 2 (radius, angle) | VI-A |
| True state matrix diagonal | −0.6, 0 | VI-A |
| Figure uncertainty label | 95% CI | Original Fig. 6 |

No timings, acceleration, physical deployment, arbitrary-system accuracy, or numerical calibration guarantees are claimed. The paper supplies no numerical train/test split, batch size, hardware, or repeated-run statistics. Figure axes/legends are unchanged.

## Relevant discrepancies

The manuscript's Eq. (15) objective sign/KL direction differs from the implementation and conventional ELBO notation. Public prose describes its terms without silently rewriting the equation. Source code also has different generation defaults and numerical choices, including stricter damping factors; see code-audit.md. The figures and table report P, not a fresh code rerun.

The existing SOLARIS animation uses illustrative pendulum icons and damped latent markers. The public caption identifies these as explanatory, and explicitly distinguishes the spiralling-particle simulations in the results.

# Asset provenance and reproduction

Reviewed 25 November 2026. These assets support *Stability Enhanced Gaussian Process Variational Autoencoders*, arXiv:2604.09331v2, by Carl R. Richardson, Jichen Zhang, Ethan King and Ján Drgoňa.

## Current SOLARIS animated graphical abstract

The website reuses the current v13 scene from the SOLARIS papers page, not an older v6 animation. Its source repository is [SOLARIS-JHU/solaris-website](https://github.com/SOLARIS-JHU/solaris-website/tree/44cb56fc3408ed0cb08db3f85aee13d18d731aae), pinned at commit 44cb56fc3408ed0cb08db3f85aee13d18d731aae.

- Scene key: v10-gpvae, paper ID arxiv-2604.09331, mapped by data/abstracts_v13.json.
- Original geometry: static/images/papers/v13/arxiv-2604.09331.svg, Git blob d41e807cc0fd5ba7a54e1d876bbc0370dfa048d7.
- Local geometry: static/abstract/graphical-abstract.svg (155,555 bytes, viewBox 0 0 760 392), unchanged from source. SHA-256: bc0c9cb66663886ba6c7d132b53f609904d9f0277659fe85dc446fcd1dc8b11c.
- Original animation: the v10-gpvae updater inside static/js/paper-abstracts-v13.js, Git blob ad22efa8b90b6bd40580744a7e9c1626ce8f447a.
- Local updater: static/abstract/graphical-abstract.js contains that function exactly, wrapped as window.CopipAbstract.render(svg, seconds), with initialTime = 2.
- The standalone SVG includes its glyph outlines, so it does not depend on external fonts or the gallery's shared glyph element.
- scripts/refresh-figure-assets.mjs reproducibly copies this pinned scene and extracts its updater without evaluating the source gallery code.

The scene illustrates video → encoder → semi-contracting LTI Gaussian-process latent model → decoder → reconstructed video. Its lower branches show initial-condition and forced-response covariance contributions, the metric and Lyapunov inequality, and the reconstruction-plus-GP training objective. Encoder and decoder are labeled Enc and Dec; LTI and GP must be expanded in the page text.

The pendulum icons and damped latent particles are explanatory graphics. The paper's reported case study is simulated spiralling-particle video, not a pendulum experiment. Do not present animated paths as recovered experimental trajectories or performance evidence. The paper's GP assumptions and exact covariance expressions take precedence over this simplified overview.

Playback is controlled by the page, which uses the original updater with requestAnimationFrame; Pause, Play and Restart should preserve the clock. Reduced-motion mode must start paused with the static SVG visible. Without JavaScript, the unchanged SVG remains a meaningful static overview. Geometry, static mathematical mappings and covariance tiles do not animate.

SOLARIS website has no declared repository license in GitHub metadata. Reuse is specifically requested by the SOLARIS maintainer; retain source attribution and do not imply an unrelated third-party license.

## Original paper figures

All figures below are copied byte-for-byte from the arXiv HTML rendition of [v2](https://arxiv.org/html/2604.09331v2), dated 18 September 2026. No curves, labels, axes, intervals, legends or results were redrawn. The paper is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); credit the paper authors and link the paper when displaying figures.

| Local filename in static/figures | Source | Dimensions (pixels or SVG viewBox) | SHA-256 |
|---|---|---|---|
| `fig2-training.svg` | [arXiv v2](https://arxiv.org/html/2604.09331v2/kl_l1_split_curve.svg) | 0 0 407.52674 175.30937 | `a654e29a7e82c04cb503fc0ab74de17ab83c11c3c96d8ce4a948d6c63126e80f` |
| `fig3-covariance.png` | [arXiv v2](https://arxiv.org/html/2604.09331v2/Figures/Cov_comp.png) | 1153 × 464 | `11d5e926c2e7e8d2c504d119423e357a01c8e73b4beea84e1de1b4033c421eca` |
| `fig4-prior-posterior.svg` | [arXiv v2](https://arxiv.org/html/2604.09331v2/evaluate_mse_var_0590.svg) | 0 0 408.41178 177.19313 | `d24bc9bb380d0071b80c4c0b0a6293f10f8d0dea4e42ceb6f044c0a884b9678f` |
| `fig5-ablation.png` | [arXiv v2](https://arxiv.org/html/2604.09331v2/Figures/Ablation1.png) | 1702 × 904 | `93d19024a14d4f15d0006a6c555768596fe5df03a51279417902e5f2edd49ac6` |
| `fig6-segp-posterior.png` | [arXiv v2](https://arxiv.org/html/2604.09331v2/Figures/evaluate_paper_0590_posterior.png) | 1200 × 800 | `09f428ce0d3ee2f65efa77a123d93cfcb8651128a669bb45001a412c79aaf8f0` |
| `fig7-mlp2-posterior.png` | [arXiv v2](https://arxiv.org/html/2604.09331v2/Figures/MLP.png) | 1200 × 800 | `addde4805978c1b4fe90d3eb8e74c16090b2a49ed39f2d6557552ae78455abcc` |
| `fig8-pegp-posterior.png` | [arXiv v2](https://arxiv.org/html/2604.09331v2/Figures/nostab.png) | 1200 × 800 | `947f9f05919e23b7c420bcc83fde4a05486fed1ac4c7ee9a5d283914fbeb6c19` |
| `fig9-nreg-posterior.png` | [arXiv v2](https://arxiv.org/html/2604.09331v2/Figures/noreg.png) | 1200 × 800 | `391d11529243cfbbe12b71b7b37f522ab8a4f3ce0e2ad41e56e46657c7f15f54` |
| `fig10-reconstruction.png` | [arXiv v2](https://arxiv.org/html/2604.09331v2/evaluate_paper_0590.png) | 922 × 562 | `3a3626b5ecf61d70c86fd5602189ec980f25db6215d3a015fd8ff0dae7093a1a` |

Figure 2: training KL divergence and L1 norm. Figure 3: learned prior covariance matrices. Figure 4: test-set-averaged angular absolute error and variance for SEGP prior/posterior. Figure 5: corresponding ablation comparisons. Figures 6–9: sampled latent trajectory with prior/posterior predictions and source 95% CI labels. Figure 10: test videos, latent true/predicted paths, and reconstructed videos. The webpage intentionally selects informative figures rather than reproducing the entire paper.

## Social and fallback previews

- static/abstract/graphical-abstract-preview.png: 1520 × 784 rasterization of the exact static SVG.
- static/abstract/social-preview.png: 1200 × 630 version with small white margins and no cropping of the diagram.
- scripts/render-social-preview.mjs uses ImageMagick 7, a legitimate SVG renderer. For that renderer only, a temporary SVG adds the xlink namespace and aliases href glyph references to xlink:href. This fixes its legacy SVG support without changing any geometry or labels. The source/public SVG remains byte-for-byte unchanged.
- These are explanatory diagram previews, not newly generated scientific results.

## Verification

Visually inspected the static SVG raster with labels, Figures 5, 6 and 10, and Figure 4's vector raster. The diagram labels are clear and non-overlapping at native size. Figures preserve full scientific axes and legends. The social preview script executed successfully. Browser playback and page layout checks are recorded separately by the website validation process.

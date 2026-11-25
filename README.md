# Stability Enhanced Gaussian Process Variational Autoencoders

Dedicated SOLARIS research page for the paper by Carl R. Richardson, Jichen Zhang, Ethan King, and Ján Drgoňa. The website follows **arXiv:2604.09331v2** and the official CDC 2026 program.

[Website](https://solaris-jhu.github.io/SEGP-VAE-webpage/) · [Paper](https://arxiv.org/abs/2604.09331) · [Research code](https://github.com/pnnl/COPIP) · [Conference](https://css.paperplaza.net/conferences/conferences/CDC26/program/CDC26_ContentListWeb_3.html#webt7_02)

The research implementation remains in **pnnl/COPIP**. This repository contains only the project website and its maintenance records.

## Organization

- `index.html`, `style.css`, `main.js`: buildless static page, styles, citation copying, and accessible playback controls.
- `static/abstract/`: existing SOLARIS v13 graphical abstract, exact animation updater, and static fallback.
- `static/figures/`: original paper figures; the public page uses Figures 5, 6, and 10.
- `static/fonts/`, `static/logos/`, `static/vendor/`: locally hosted fonts, verified institutional marks, and KaTeX with their license records.
- `research/source-map.md`: claim-to-source record. Companion audits document paper versions, code differences, design, and asset provenance.
- `scripts/validate.mjs`: validates references, metadata, equations, SVGs, and animation updates.
- `scripts/build.mjs`: prepares the public `_site` directory without a framework or dependency installation.
- `.github/workflows/pages.yml`: validates, packages, and deploys to GitHub Pages.

## Preview and maintenance

Ask a coding assistant to serve this directory with a local static HTTP server and open `index.html`. Use HTTP rather than opening the file directly, so the same-origin SVG animation can initialize. There is no build step or package installation for preview. Node.js 20 or later runs the validation and packaging scripts.

Before publishing an edit, ask the assistant to run the validator and JavaScript syntax checks, review the page at desktop and narrow mobile widths, and check playback, reduced-motion behavior, citation copying, and keyboard navigation. The main-branch workflow validates and packages the site. Publish the validated `_site` contents to the `gh-pages` branch using an authenticated user-origin commit; GitHub Pages builds that branch. Retain `.github/workflows/pages.yml` and the validation/build scripts on that branch so a manually dispatched workflow can also validate and deploy from the configured publishing branch. The deployment job intentionally skips `main`, which is not the publishing branch.

Keep relative asset paths: the page is served below `/SEGP-VAE-webpage/`. When updating paper content, recheck the source map and scientific version. Retain the distinction between semi-contraction and strict contraction, between the general formulation and the specialized particle encoder, and between simulated results and deployment.

For a new paper version, update the article metadata, downloadable citation, visible BibTeX, source map, and affected figures together. Do not infer unreported training statistics or transfer code defaults into paper experiment claims.

## Attribution

The visual foundation is [TQPNet](https://github.com/SOLARIS-JHU/TQPNet/tree/main/website), adapted through the SOLARIS Battery-MI-DPC page. Website code is under Apache-2.0; see `LICENSE` and `NOTICE`. Paper figures are credited to Richardson et al., arXiv:2604.09331v2, CC BY 4.0. Third-party fonts, KaTeX, logos, and the existing SOLARIS abstract retain their original notices and rights. See `research/asset-provenance.md` and `research/design-audit.md`.

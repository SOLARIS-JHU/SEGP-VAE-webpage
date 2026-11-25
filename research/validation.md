# Validation record

Published 25 November 2026.

## Completed

- Complete arXiv v2 and Appendix A read; author order, equal contribution, affiliations, numerical table, scope and equations audited.
- CDC acceptance verified against the official conference program. Bibliography cites the preprint because no final proceedings DOI was verified.
- Released code reviewed at commit `5839ee5f572b7ab8f65a69609b06e1159afc4632`; discrepancies recorded internally.
- Existing SOLARIS v13 abstract reused unchanged with its exact animation updater, static fallback, playback controls, reduced-motion preference, and background-tab pause logic.
- Original figures visually inspected; no curves or axes regenerated.
- Local validation passes for 20 mathematical expressions, SVG IDs/references, local asset paths, scholarly/social metadata, matching BibTeX, accessibility hooks and finite/changing animation attributes.
- JavaScript syntax checked. Static packaging succeeds.
- Responsive source review checks grid collapse, math/table scrolling, image aspect ratios, flexible controls, alt text, headings, keyboard focus styles and skip navigation.
- Oxford logo repaired only by removing unused duplicate IDs; visual geometry unchanged.

## Publication

- Repository: https://github.com/SOLARIS-JHU/SEGP-VAE-webpage
- Live website: https://solaris-jhu.github.io/SEGP-VAE-webpage/
- Validated source commit: `3cf1eb1f41b2ff460096d838c31f20233cf00fbc`.
- Main validation workflow succeeded: https://github.com/SOLARIS-JHU/SEGP-VAE-webpage/actions/runs/45691068844
- Publishing branch: `gh-pages`, commit `f7845e409b540f081e820fb018f326f624d2e4cb`.
- GitHub Pages build/deployment succeeded: https://github.com/SOLARIS-JHU/SEGP-VAE-webpage/actions/runs/45691091940
- Live HTML returned HTTP 200 and matched the validated local page exactly.
- All 40 local assets directly referenced by HTML/CSS returned HTTP 200 and matched local SHA-256 hashes, including the graphical abstract SVG, animation updater, main script, original result figures, fonts and KaTeX.
- Canonical and social URLs use `/SEGP-VAE-webpage/`; no obsolete `/COPIP-webpage/` public URL remains.

Main pushes run validation and package the site. The built-in Pages workflow publishes authenticated user-origin updates to `gh-pages`. The included custom deployment job is available when manually dispatched from the publishing branch; it intentionally skips `main` to respect the Pages environment's branch policy.

## Remaining verification limitation

No supported browser-control tool was available in this session. Desktop/mobile visual rendering, browser-console inspection, and end-to-end keyboard/clipboard/playback interaction checks remain unverified. Source checks, image inspection, animation-function tests and live HTTP/hash checks do not replace those browser checks.

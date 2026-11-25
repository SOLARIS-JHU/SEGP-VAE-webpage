# Validation record

Prepared 25 November 2026.

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

## Pending environment-dependent checks

- Desktop/mobile browser rendering, browser-console inspection and end-to-end keyboard/clipboard/playback checks: no supported browser-control tool is available in this session. Static/source checks do not replace these.
- The user created the public `SOLARIS-JHU/SEGP-VAE-webpage` repository. Upload and deployment are being completed using the existing GitHub connection. No live deployment is claimed until its workflow and live assets have been verified.

After publication, record the deployment commit/run and verify the actual live HTML and referenced assets. A source commit alone is not deployment success.

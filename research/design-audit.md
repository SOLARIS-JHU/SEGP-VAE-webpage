# Design foundation and affiliation assets

Reviewed 25 November 2026. The reference sites provide design guidance, not scientific evidence for SEGP-VAE. All nine reference pages and their main custom stylesheets returned HTTP 200 and were inspected as source. Browser rendering and interactive inspection were unavailable in this environment; this record does not assert screenshot-based validation.

## One coherent foundation: TQPNet

- Published reference: https://solaris-jhu.github.io/TQPNet/
- Source: https://github.com/SOLARIS-JHU/TQPNet/tree/main/website
- Published stylesheet: https://solaris-jhu.github.io/TQPNet/style.css
- Retrieved stylesheet SHA-256: `7a075a6154b657e78d03eaafa94cc398ad8ffd27731ed88f97da8c6e8b4ebba2`.
- Repository LICENSE: Apache-2.0, blob `9af26733803db7bc5df30233b591b62c2066ccfd`.

| Element | Reference value |
|---|---|
| Body typography | Inter 400/500/600; 1.125rem, line-height 1.6; system sans fallback |
| Headings | Fraunces 600; line-height 1.15; letter-spacing -0.01em |
| Page background / text | `#fbfbfd` / `#1a1f2b` |
| Muted text / borders | `#5b6470` / `#dfe3ea` |
| Accent | JHU Heritage Blue `#002d72` |
| Soft accent | `rgba(0,45,114,.08)` |
| Cards | White; 14px radius; 1px border; 1.25rem 1.35rem padding |
| Content width | `min(100% - 2.5rem, 1100px)` |
| Hero title | `clamp(1.9rem,3.7vw,2.7rem)`; centered, balanced text |
| Section heading | `clamp(1.6rem,2.8vw,2.2rem)`; accent color |
| Section spacing | `clamp(2.5rem,5vw,4rem)` |
| Resource links | Pill buttons; radius 999px; padding .6rem 1.15rem; gap .6rem |
| Captions | .92rem; muted; line-height 1.45 |
| Logo strip | Centered flex wrap; gap 1.5rem 3.5rem; top border; 44px tall rectangular marks, 60px square marks |
| Logo interaction | Grayscale/70% opacity at rest; full color on hover and keyboard focus |
| Narrow layout | Two-column content collapses at 900px; body becomes 1rem below 560px |
| Small-screen logo sizes | 34px rectangular / 46px square; gap 1rem 2rem |
| Accessibility | Visible 3px focus outline, skip link, locally scrollable equations/tables, reduced-motion support |

TQPNet also has a dark palette. A consistently light adaptation preserves the white backgrounds and original colors of the scientific artwork, matching the preceding SOLARIS battery page. Avoid inverting paper plots. The existing graphical abstract should occupy a full-width row rather than a narrow hero column; the method text should explain that abstract without duplicating it in another diagram.

## Other requested references

| Reference | Observed design and useful pattern |
|---|---|
| https://solaris-jhu.github.io/MI-DPC-UPHES/ | Same Inter/Fraunces foundation; application-to-method narrative |
| https://solaris-jhu.github.io/SD-DPC-website/ | Compact method/results; Academic Project Page Template credit and CC BY-SA 4.0 |
| https://xboldocky.github.io/midpc-web/ | Bulma/Nerfies; Noto Sans/Google Sans; mathematical problem and numerical examples |
| https://centrum-intelliphysics.github.io/PDEControl_DPC_website/ | Inter/Bulma; explicit training/inference explanation; Academic Project Page Template / CC BY-SA 4.0 |
| https://solaris-jhu.github.io/CINOC-website/ | Inter/Bulma; prominent graphical abstract and large research visuals; Academic Project Page Template / CC BY-SA 4.0 |
| https://solaris-jhu.github.io/score-website/ | Inter/Bulma; formulation, method, results, tutorials; Academic Project Page Template credit |
| https://xboldocky.github.io/chiller-plant-MIDPC/ | Bulma/Nerfies; Noto Sans/Google Sans; explicit simulation context |
| https://drgona.github.io/NeuralDAEs/ | Bulma/Nerfies; Noto Sans/Google Sans; clear method and application examples |

No CSS or source from the alternative template families is copied. The publication title and all scientific content come from the paper and official records, not the design references.

## Locally hosted fonts

`static/fonts/fonts.css` declares Inter 400/500/600 and Fraunces 500/600. Latin and Latin Extended WOFF2 subsets are included so the author name Ján Drgoňa is rendered by the selected typeface. The binaries were downloaded from Google Fonts, with exact URLs in `static/fonts/sources.json`. SIL Open Font License notices are retained in `inter-OFL.txt` and `fraunces-OFL.txt`; these notices were copied from the preceding SOLARIS project asset collection.

The Google Fonts stylesheet used to resolve current subset URLs was:
https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&display=swap

## Affiliation and lab marks

The paper lists Oxford Engineering Science, PNNL, and Johns Hopkins University. These marks represent those verified affiliations, with SOLARIS as the host laboratory. Preserve native proportions and meaningful alternative text.

| Local file | Source | Geometry / display |
|---|---|---|
| `static/logos/oxford-engineering.svg` | https://eng.ox.ac.uk/images/logo.svg | Official Oxford Engineering Science homepage header; 297×90; rectangular |
| `static/logos/pnnl.svg` | https://www.pnnl.gov/themes/gesso/images/pnnl-logo.svg | Official PNNL homepage mark; 400×400; square |
| `static/logos/jhu-whiting.svg` | https://github.com/SOLARIS-JHU/TQPNet/blob/main/website/static/logos/jhu-whiting.svg | Existing verified SOLARIS institutional mark; 240×64; rectangular |
| `static/logos/solaris.png` | https://github.com/SOLARIS-JHU/TQPNet/blob/main/website/static/logos/solaris.png | Existing SOLARIS lab mark; 240×199; square treatment |

The PNNL homepage https://www.pnnl.gov/ resolves its header mark through `.site-name` in `/themes/gesso/css/styles.css`, which explicitly references the SVG above. Oxford's Engineering Science homepage https://eng.ox.ac.uk/ explicitly references `/images/logo.svg` as its department header logo. The main ox.ac.uk homepage denied automated access; the accessible official department resource establishes provenance. The department's similarly named footer logo is not an additional affiliation mark and is not used.

### SHA-256

| File | SHA-256 |
|---|---|
| `jhu-whiting.svg` | `7c1b851676bd96350679ba05acf78e3297f37839ee7bed45c9a83d31cf64bccd` |
| `solaris.png` | `5e805bfb79701b704b7b41a306d306c708921b788dcd56f64774891de1600f20` |
| `oxford-engineering.svg` | `e595c38bb065f7325ebf4c7bfa45a196868f157a9ccaf9b5bd29771fdace492b` |
| `pnnl.svg` | `104d42bb45dc63cbb65913f010dfccae7b1189b4e3722c086f482c4feb2040cb` |

Institutional marks retain their copyright and trademark rights and are not relicensed as website code. Use them to identify affiliation; do not imply a separate institutional endorsement.

## Attribution to preserve

Include the TQPNet Apache-2.0 LICENSE and an adaptation notice; mark modified source files as adapted. A brief public footer can link TQPNet and state that the website is adapted from it. Keep font OFL and math-renderer license notices beside the corresponding local assets. Paper figures and institutional marks retain their own rights; the website code license must not purport to replace those rights. Do not copy TQPNet's paper-specific author list, funding text, or scientific claims.

## Presentation recommendation

Use the exact paper title in the header and identify the method as SEGP-VAE; COPIP is the requested repository name, not an acronym expanded by the paper. Put the verified author order, equal-contribution note, affiliations, and resource pills above a full-width animated abstract. Follow with a concise accessible problem statement, the encoder → structured GP → decoder explanation, the semi-contraction parameterization with its qualifications, original case-study plots, scope, and citation. Quantitative evidence should be adjacent to the original experimental setting, not shown as unsupported speed or generalization claims.

## SVG identifier hygiene

The Oxford Engineering Science source SVG repeats the unused `id="Shape"` identifier 103 times. The local copy retains the first and removes the remaining 102 duplicates. No element references `Shape`; the only referenced definition is `linearGradient-1`, which remains unchanged. Path data, polygons, colors, geometry and gradients are byte-for-byte unchanged after ignoring those removed attributes. The original downloaded file SHA-256 was `c1eab83102a6bed2784b8af17789fe7cefc73d8ae28cafe82920e2b495cb6128`; the table above records the sanitized local file.

## Source-level layout review

Reviewed the generated index.html and style.css after implementation. Both two-column content and theory panels use minmax(0,1fr), and the theory grid collapses at 900px. The method list, settings, and cards collapse at 600px; top navigation also stacks. Scientific figures preserve intrinsic aspect ratios and scale to their containers. Equations and result tables have local horizontal scrolling; the mobile result table minimum width is contained by .table-wrap. The graphical abstract has a fixed 760:392 aspect ratio and a 100% width. Resource controls and institutional marks wrap. Keyboard focus styles, skip navigation, image alternative text, table captions/row headers, a live copy status, and reduced-motion CSS are present. No definite source-level layout blocker was found. SVG labels at narrow screen sizes still require visual browser inspection; no rendered desktop/mobile or keyboard interaction check was available.

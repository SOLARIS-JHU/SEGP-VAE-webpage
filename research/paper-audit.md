# COPIP / SEGP-VAE scientific audit

Reviewed 25 November 2026. This is a maintenance record, not public-page prose.

## Primary sources and publication status

- **P2**: [arXiv:2604.09331v2](https://arxiv.org/abs/2604.09331v2), revised 18 September 2026; [HTML](https://arxiv.org/html/2604.09331v2), [PDF](https://arxiv.org/pdf/2604.09331v2), [original TeX/source archive](https://arxiv.org/src/2604.09331v2). Read complete manuscript, including Appendix A and references. The original TeX was also checked against HTML for equations, numerical values, figure captions and experimental context. ArXiv lists CC BY 4.0.
- **C**: [pnnl/COPIP](https://github.com/pnnl/COPIP), default branch master. README explicitly identifies this paper as the companion publication. Implementation details require the separately recorded code audit.
- **V**: [Official IEEE CDC 2026 program, paper WeBT7.2](https://css.paperplaza.net/conferences/conferences/CDC26/program/CDC26_ContentListWeb_3.html#webt7_02). Directly retrieved successfully; record lists exact paper title, four authors in the manuscript order, Oxford/Oxford/PNNL/JHU affiliations and 13:45–14:00 on Wednesday 16 December 2026.
- **A**: SOLARIS papers page and data/research.yml identify the existing animated graphical abstract. This is a design/asset source, not evidence for scientific claims.

Publication wording as of this review: **IEEE CDC 2026 — accepted / scheduled**. The official program supports conference acceptance and scheduled presentation. The event is still in the future; do not say “presented” or invent proceedings pages/DOI. No IEEE Xplore proceedings record or publisher DOI for this paper was verified. Cite arXiv v2 on the website, with a separate conference-program link if desired.

The supplied unversioned arXiv URL resolves to v2, so v2 is the primary scientific source. Do not mix v1 experimental architecture or numbers into the page.

## Identity

Exact title: **Stability Enhanced Gaussian Process Variational Autoencoders**

Authors, in order:

1. Carl R. Richardson* — Department of Engineering Science, University of Oxford.
2. Jichen Zhang* — Department of Engineering Science, University of Oxford.
3. Ethan King — Pacific Northwest National Laboratory.
4. Ján Drgoňa — Johns Hopkins University.

*Richardson and Zhang contributed equally.* The arXiv metadata and official conference record establish order. The manuscript gives Oxford departmental affiliation but only institutional affiliations for King/Drgoňa; do not invent their departments. The conference spells the names Carl Robert Richardson and Jan Drgona; use the paper/arXiv display spelling above.

Acknowledgments: UKRI Centre for Doctoral Training in Machine Intelligence for Nano-electronic Devices and Systems, grant EP/S024298/1; PNNL AT SCALE initiative through LDRD. PNNL operated for DOE by Battelle under DE-AC05-76RL0-1830.

## Problem and essential computational structure

P2 Sections I–III, V, VI-B; Figure 1:

The goal is to infer a low-dimensional latent dynamical process from high-dimensional video without supervising training with latent-state labels. A variational autoencoder (VAE) supplies a nonlinear image/latent mapping. Its Gaussian-process (GP) prior derives its mean and covariance from a linear time-invariant (LTI) state-space model, so the latent model has interpretable dynamics and a probabilistic description.

Preserve these stages:

1. Frames enter the encoder. It provides Gaussian latent pseudo-observations: a mean and positive diagonal observation covariance for every frame.
2. An LTI-derived GP prior uses system matrices, known input GP statistics and Gaussian initial-state statistics.
3. Condition this GP on encoded pseudo-observations. The resulting Gaussian is a **variational approximation** to the true image-conditioned posterior, because the Bernoulli image likelihood itself is not conjugate.
4. Sample the variational posterior with the reparameterization trick; decode latent samples to Bernoulli pixel probabilities and reconstruct video.
5. Joint offline training updates encoder, decoder and SEGP parameters using reconstruction, KL and task-dependent regularization. Semi-contraction is built into the state-matrix parameterization, not imposed by a soft penalty.
6. Once learned, the model can encode a new video, condition the prior, estimate latent trajectories/uncertainty and reconstruct frames. No online control deployment is demonstrated.

For the **spiralling-particle experiment**, the encoder is not generic: three CNN layers, spatial softmax, Cartesian-to-polar conversion, temporal angle unwrapping, and a learned affine transform are essential. Variance comes from learned log-variance parameters, clamped for numerical stability. The decoder is a two-layer MLP with 500 hidden units and BatchNorm/ReLU. The known B, C, D matrices are held fixed; A is learned.

Do not collapse “encoder → GP conditioning → posterior samples → decoder” to “encoder → stable dynamics → decoder” without explaining conditioning and the approximate posterior.

## Mathematical content suitable for the page

### Latent model and GP prior

P2 Eq. (6), Theorem 1, Eqs. (7)–(9):

\[
\dot{\mathbf{x}}(t)=A\mathbf{x}(t)+B\mathbf{u}(t),\qquad
\mathbf{y}(t)=C\mathbf{x}(t)+D\mathbf{u}(t).
\]

The input is a GP with **known mean/covariance functions**, and the initial condition is Gaussian. Theorem 1's proof also assumes input and initial condition are independent. The output is a GP with moments obtained by propagating both through the linear system. The general result accommodates nonzero input mean, uncertain initial conditions and direct feedthrough D.

A compact illustrative formula is the mean (Eq. 8):

\[
\boldsymbol{\mu}_y(t)=Ce^{At}\boldsymbol{\mu}_{x0}
+\int_0^t Ce^{A(t-s)}B\boldsymbol{\mu}_u(s)\,ds
+D\boldsymbol{\mu}_u(t).
\]

The covariance has initial-condition, propagated-input, direct-feedthrough and cross terms. Do not omit these while presenting a simplified covariance as the full general formula. The page can explain the covariance in prose rather than print its long expression.

### Semi-contraction by construction

P2 Theorems 2–3, Eqs. (10)–(12), Appendix A:

\[
P=V_1V_1^\top\succ0,\qquad
A=P^{-1}\!\left(-\tfrac12V_2V_2^\top+V_3\right),\qquad V_3^\top=-V_3.
\]

Here V1 is lower triangular with positive diagonal and V2 lower triangular with nonnegative diagonal. The identity is

\[
PA+A^\top P=-V_2V_2^\top\preceq0.
\]

Thus for two trajectories with the **same input**, their squared distance in the constant P-metric is nonincreasing:

\[
\frac{d}{dt}(\delta\mathbf{x}^\top P\delta\mathbf{x})
=\delta\mathbf{x}^\top(PA+A^\top P)\delta\mathbf{x}\le0.
\]

The theorem parameterizes all LTI systems that admit this positive-definite metric condition. It is not a guarantee of arbitrary system recovery, optimization convergence or calibrated uncertainty.

### Variational conditioning

P2 Eq. (14):

\[
Q_{\phi,\psi}(\mathbf{y}\mid\mathbf{v})
\propto P_\psi(\mathbf{y})
\prod_i \mathcal{N}\!\left(\mathbf{y}_i;
\boldsymbol{\mu}_\phi(\mathbf{v}_i),\Sigma_\phi(\mathbf{v}_i)\right).
\]

This cleanly explains the graphical abstract's GP update. The Gaussian conditioning calculation is analytic for this approximate posterior; the exact Bernoulli-likelihood posterior is not analytically available.

### Objective notation caution

P2 Eq. (15) literally prints expected **positive log likelihood plus** beta KL(P_prior || Q_posterior); the text calls the first term reconstruction error and discusses minimizing a loss. This is not the conventional maximized ELBO (which has a minus KL(Q || P)), nor conventional negative ELBO as printed. The TeX source confirms the signs and KL ordering; this is not merely an HTML conversion issue.

Do not silently “correct” the paper and present a conventional objective as its exact equation. Prefer public prose: “Joint training balances reconstruction, a KL term coupling the prior and approximate posterior, and L1 regularization of A.” Implementation-specific loss should follow the code audit and be explicitly distinguished. Eq. (16), the weighted added regularizer, is straightforward once the base objective is treated qualitatively.

## Theory qualifications that must survive simplification

- “Semi-contracting” means nonexpansion in a **learned P-metric**, for the same forcing. It does not mean Euclidean distances always decrease.
- The LMI is non-strict, so eigenvalues may have zero real part. Do not claim that A is strictly Hurwitz, exponentially contracting, asymptotically stable in every case, or that all modes decay.
- The manuscript repeatedly attributes trouble to “non-Hurwitz A” and says trajectories will be bounded. Its own test system A=diag(-0.6,0) is not Hurwitz. The supported benefit is exclusion of expansive homogeneous dynamics; the structural condition does not establish bounded forced trajectories/covariances for all inputs and all time. The angular mode in the case study integrates input uncertainty.
- The theorem does not prove training convergence, recovery of the physical coordinates, correctness for arbitrary nonlinear systems, or closed-loop stability of a controller.
- In this example the system is observable but uncontrollable. Transfer-function fit alone cannot identify its internal realization. Good physical-coordinate recovery also depended on the application-specific encoder and L1 regularization.
- RGB likelihoods, nonlinear Koopman extensions, sparse GP computational improvements and downstream control design are possibilities/future work, not demonstrated experiments.

## Exact experimental record

P2 Section VI-A:

| Quantity | Reported value / setting |
|---|---|
| Data type | Simulated spiralling-particle videos; not physical recordings |
| Number of generated videos | 40,000 |
| Duration | 3 s |
| Integration | Euler, 0.01 s step |
| Sampling period | 0.12 s |
| Frames per video | 25 |
| Frame size | 40 × 40 binary pixels |
| Rendered particle radius | 2 pixels |
| Latent state | radius r and angle theta |
| True A | diag(-0.6, 0) |
| True B | [0, 1]^T |
| True C / D | Identity / zero |
| Input GP mean | 0.4 pi t |
| Input GP covariance | exp[-0.5(t-t')^2] |
| Initial-state mean | [1.5, 0]^T |
| Initial-state standard deviation | 0.2 independently in both coordinates |
| Added trajectory measurement-noise variance | 0.001 in both coordinates |

The manuscript says 40,000 videos were generated and refers to training/test sets, but **does not give their numerical split, batch size, CPU/GPU, memory, wall-clock training time, inference time, number of seeds or uncertainty over independent training runs**. Do not fill those gaps from code defaults as if they were paper experimental conditions. A code-derived split may be documented separately and attributed to a specific code version.

P2 Sections VI-C/D:

| Training quantity | Reported setting |
|---|---|
| Epochs | 600 |
| Optimizer | AdamW |
| Learning rate | 0.005 |
| Weight decay | 0.00001 |
| L1 coefficient schedule | 0.025 → 0.3 |
| L1 definition | Sum of absolute entries of A |
| KL coefficient beta | Tuned to balance reconstruction; no numerical value given |
| Initial V1 / V3 | Identity / zero |
| Initial V2 entries | Zero-mean Gaussian, standard deviation 0.001 |
| Encoder spatial-softmax temperature | 1.0 |
| Decoder hidden units | 500 |
| Known matrices in this experiment | B, C, D |

Hyperparameters were not rigorously tuned. Prior/posterior moments are normalized by maximum training-set radius/angle when computing KL.

### Main numerical comparison: Table I

Metric: matrix spectral norm, \(\|\hat A-A_i\|_2\), between true and learned state matrices. These are **absolute matrix errors**, not percentages, trajectory errors or normalized errors.

| Model | Ablation | Reported 2-norm error |
|---|---|---:|
| SEGP | Full model | 0.02 |
| PEGP | Remove stability parameterization; retain specialized encoder | 0.63 |
| MLP2 | Replace specialized encoder with vanilla MLP | 0.63 |
| NREG | Remove L1 regularization | 2.53 |

Keep the comparison tied to the single synthetic particle task. No confidence intervals, seed count or statistical significance are given for this table. No hardware-dependent speed comparison is reported.

Recovered matrices, rounded by the paper to two decimal places:

- SEGP: [[-0.62, 0.00], [-0.00, -0.00]].
- PEGP: [[0.00, 0.00], [-0.17, 0.00]].
- MLP2: [[-0.00, 0.00], [-0.18, -0.00]].
- NREG: [[-0.21, 0.04], [2.42, -0.63]].

The PEGP diagonal entries before rounding are reported as 0.00088 and 0.00011; the paper reports the recovered system as marginally unstable. Do not infer exact zeros or exact structural sparsity from the rounded matrices.

### Other results

- Figure 2: unweighted KL and L1 norm over training. The manuscript reports no observed overfitting in monitored curves and no posterior collapse; these are empirical observations, not universal guarantees.
- PEGP frequently encountered numerical trouble during training; no failure percentage/run count is supplied.
- Figures 4–5: test-set-averaged angular absolute error and predictive variance, as functions of time. Preserve axes/units/legend; do not invent summary RMSEs or percentages from the plot.
- Figure 6: a randomly sampled test latent trajectory, with SEGP prior and posterior mean/uncertainty, radius and angle.
- Figures 7–9: analogous samples for MLP2, PEGP, NREG.
- Figure 10: example test videos, latent trajectories/posterior means, and reconstructions. The images overlay frames across time; do not represent them as a physical-video deployment or an extrapolation benchmark.

## Recommended result presentation

Lead with the qualitative contribution: “Learn stable, interpretable latent dynamics from video.” Keep stability explicitly tied to the LTI prior/metric theorem.

Use Table I and the original Figure 6 or Figure 10. A compact result sentence can state: “On synthetic particle videos, the full model recovered the state matrix with a 2-norm error of 0.02; the three ablations ranged from 0.63 to 2.53.” This is supported by Table I and VI-D2, but avoid derived superiority factors or broad state-of-the-art claims.

Explain the scientific takeaway: stability structure admits nonexpanding dynamics; regularization and the state-aligned encoder help identify the coordinates. Reconstruction quality alone or an accurate transfer function does not demonstrate correct internal dynamics.

## Original figure inventory

Original source files are inside https://arxiv.org/src/2604.09331v2:

| Paper figure | Archive path | Suggested role |
|---|---|---|
| 1 | Figures/GP_VAE.pdf | Algorithm reference; avoid duplicating user's SOLARIS abstract on public page |
| 2 | Figures/kl_l1_split_curve.pdf | Training evidence if needed |
| 3 | Figures/Cov_comp.png | Covariance comparison |
| 4 | Figures/evaluate_mse_var_0590.pdf | Prior/posterior angular error and variance |
| 5 | Figures/Ablation1.png | Angular comparison across ablations |
| 6 | Figures/evaluate_paper_0590_posterior.png | Main latent-state result |
| 7 | Figures/MLP.png | MLP2 sample |
| 8 | Figures/nostab.png | PEGP sample |
| 9 | Figures/noreg.png | NREG sample |
| 10 | Figures/evaluate_paper_0590.pdf | Video → latent process → reconstruction result |

Retain original axes/legends, distinguish model variance from uncertainty over runs, and attribute figures to Richardson et al., arXiv:2604.09331v2, CC BY 4.0. No new benchmark curves need to be generated.

## Citation

Use arXiv citation until final proceedings metadata is verified:

~~~bibtex
@misc{richardson2026stability,
  title         = {Stability Enhanced Gaussian Process Variational Autoencoders},
  author        = {Carl R. Richardson and Jichen Zhang and Ethan King and J{\'a}n Drgo{\v{n}}a},
  year          = {2026},
  eprint        = {2604.09331},
  archivePrefix = {arXiv},
  primaryClass  = {cs.LG},
  doi           = {10.48550/arXiv.2604.09331},
  url           = {https://arxiv.org/abs/2604.09331v2},
  note          = {Accepted for IEEE CDC 2026}
}
~~~

The arXiv DOI identifies the work rather than an IEEE proceedings article; the version-specific URL records the scientific version used. Conference acceptance is independently verified by V.

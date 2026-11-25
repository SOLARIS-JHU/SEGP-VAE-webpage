# Released-code audit

Reviewed 25 November 2026 for the COPIP project website. The public page reports the manuscript's experiments; this is a source inspection, not a training or evaluation rerun.

## Version and scope

Repository: [pnnl/COPIP](https://github.com/pnnl/COPIP). Default branch: `master`. Inspected commit: [5839ee5f572b7ab8f65a69609b06e1159afc4632](https://github.com/pnnl/COPIP/tree/5839ee5f572b7ab8f65a69609b06e1159afc4632) (commit metadata: 29 April 2026, “Update README.md”). The README names **Stability Enhanced Gaussian Process Variational Autoencoders** and links arXiv:2604.09331; COPIP is the repository name, not an expansion supplied by the paper.

The comparison source is [arXiv:2604.09331v2](https://arxiv.org/abs/2604.09331v2), revised 18 September 2026. Do not silently combine the released script defaults and the manuscript's experiment settings.

All seven Python source files and the README were inspected. The recursive repository tree and the contents of the two small released ZIP archives were also inspected. No research code was changed, no model was trained, and no untrusted pickle/checkpoint was deserialized.

## Implementation map

Line numbers below refer to the pinned commit.

| Scientific component | Code location | Implementation |
|---|---|---|
| Simulated particle trajectories and videos | `Code/DataGeneration/DataGeneration_Particle.py`: `sample_SE_input`, `sample_init`, `solve_particle`, `transform_coords`, `traj_2_vid`, `main` | Samples a squared-exponential GP input, integrates radius/angle dynamics, adds noise, converts to Cartesian coordinates and renders binary 40-by-40 frames. |
| Parametrized state matrix | `Code/SEGP/SEGP.py` lines 14–45, 86–97, 131–144 | Lower-triangular positive-diagonal factors and a skew-symmetric factor construct A. |
| LTI-derived GP prior | `SEGP.py` lines 148–397, 523–563 | Matrix exponentials and Green's functions; mean and covariance integrals are approximated by trapezoidal quadrature. Input kernel is squared exponential. A small covariance jitter is added. |
| Gaussian conditioning | `SEGP.py` lines 401–494 | Cholesky solves give posterior and predictive mean/covariance. |
| Encoder | `Code/SEGP_VAE/VAE.py` lines 61–266 | Three convolutions, GroupNorm/ReLU, spatial softmax, coordinate scaling, Cartesian-to-polar map, separate affine transforms, and positive clamped variance parameters. |
| Angle unwrapping | `VAE.py` lines 16–58; `Code/SEGP_VAE/Train_VAE.py` lines 315–318 and 379–381 | Applied across time after encoder output to avoid phase jumps. |
| Decoder | `VAE.py` lines 471–512 | MLP with one hidden layer, BatchNorm and ReLU, returning Bernoulli logits. |
| Joint training | `Train_VAE.py` lines 289–353 | Encode observations, scale GP quantities, condition the prior, unscale posterior, sample, decode, and backpropagate the reconstruction/KL objective plus an L1 penalty on A. |
| Case-study structural information | `Train_VAE.py` lines 604–630 | Learns A; B, C and D are fixed. This matches paper Section VI-B3 and must not be presented as an experiment learning arbitrary A/B/C/D. |
| Training configuration | `Train_VAE.py` lines 489, 547–558, 640–651, 690 | 600 epochs; nominal 100 batches of 800 with 10% test fraction; AdamW, learning rate 0.005, weight decay 0.00001; KL weight 2.5; increasing L1 weight 0.025 to 0.3. Batch size is adjusted to supplied dataset size. |
| Direct observed-state GP training/evaluation | `Code/SEGP/Train_GP.py`, `Code/SEGP/Evaluate_GP.py` | Separate GP experiments fit observed latent trajectories directly. Their archived plots should not be labeled as the paper's video-trained VAE results. |
| Plotting and scaling | `Code/Utils/Utils.py` | Two-dimensional scaling and plots of latent states, reconstructed videos and nominal two-standard-deviation bands. |

## Important source distinctions

1. **Matrix parametrization.** Paper Theorem 3 permits a nonnegative diagonal in V2, including semidefinite boundary cases. The released `SEGP.__init__` applies `L_plus` to V2, enforcing a strictly positive diagonal with a 0.001 offset. This is a stricter implementation choice. In `get_AP`, the inverse uses `V1 + 0.001 I`, while the stored P uses V1 alone; the effective metric in the A construction is therefore the shifted-factor metric. Do not claim bit-for-bit identity with the theorem's formula.

2. **Other state-space matrices.** When B or D is learned, the generic class makes its entries nonnegative, whereas the theoretical parametrization leaves B/C/D unconstrained. The VAE example fixes B/C/D, so this additional generic-class restriction is inactive there.

3. **Objective formula.** Manuscript Eq. (15) prints a positive KL term with arguments prior then posterior. The code computes KL(posterior || prior) from the prior Cholesky factor and subtracts it in its ELBO, then minimizes the negative ELBO plus an L1 penalty. Some code comments incorrectly describe the algebraic orientation, but the executed operations identify it. The website should describe reconstruction, KL regularization and L1 regularization in words, or explicitly identify any implementation-based formula, rather than silently repair the printed manuscript equation.

4. **Sampling.** `SEGP.sample` uses the diagonal variances, not a joint correlated GP draw, and defaults to three independent marginal samples. `Train_VAE.py` averages those latent samples before applying the nonlinear decoder. This is not identical to averaging the decoder's reconstruction loss over full correlated posterior trajectories.

5. **Dataset defaults.** The generator has M = 80,000, Q = 1 and initial standard deviation 0.001. Paper v2 reports 40,000 videos and initial standard deviation 0.2. The generator draws Q initial conditions once and reuses them across M external-input samples. The website's dataset size and distribution must follow the manuscript, not these script defaults.

6. **Integration and timing grid.** The manuscript specifies Euler simulation with a 0.01-second step. The generator calls SciPy `odeint` and constructs 300 equally spaced time points including both endpoints from 0 to 3 seconds (step 3/299), retaining every twelfth point. The GP's mean/covariance integrals use trapezoidal quadrature.

7. **Initialization.** The manuscript's Section VI-C3 specifies V2 initialization standard deviation 0.001; `SEGP.__init__` uses 0.2. V1 identity and V3 zero match.

8. **Initial-condition covariance.** The generator treats `sigma` as a standard deviation; the train/evaluate scripts set `covar_x0 = sigma * I` instead of `sigma**2 * I`. This is a concrete script-level distinction, not evidence for a different reported experiment.

9. **Feature scaling.** The VAE training script computes scale factors from the stored latent-coordinate arrays before splitting the video dataset. The paper describes scaling using maxima from the training dataset. Ground-truth latent coordinates are not a target in the reconstruction/KL loss, but the released scaling path does use them; do not describe this example as having no prior coordinate/scaling information.

10. **Split construction.** The helper samples test-batch indices with NumPy `integers` (with replacement), then removes these indices from training. The nominal 10% test fraction therefore need not imply exactly 10% distinct held-out batches. This audit does not infer the manuscript's actual split from the script.

## Reproducibility and released artifacts

The repository contains:

- [Data-generation script](https://github.com/pnnl/COPIP/blob/5839ee5f572b7ab8f65a69609b06e1159afc4632/Code/DataGeneration/DataGeneration_Particle.py).
- [SEGP implementation](https://github.com/pnnl/COPIP/blob/5839ee5f572b7ab8f65a69609b06e1159afc4632/Code/SEGP/SEGP.py).
- [VAE model classes](https://github.com/pnnl/COPIP/blob/5839ee5f572b7ab8f65a69609b06e1159afc4632/Code/SEGP_VAE/VAE.py) and [training script](https://github.com/pnnl/COPIP/blob/5839ee5f572b7ab8f65a69609b06e1159afc4632/Code/SEGP_VAE/Train_VAE.py).
- [VAE checkpoint](https://github.com/pnnl/COPIP/blob/5839ee5f572b7ab8f65a69609b06e1159afc4632/Models/SEGP_VAE/Exp_001/epoch0590.pth), 9,921,338 bytes.
- [Direct-GP checkpoints](https://github.com/pnnl/COPIP/blob/5839ee5f572b7ab8f65a69609b06e1159afc4632/Models/SEGP/Exp_004_ABCD/Checkpoints.zip), containing epochs 0000–0049.
- [Direct-GP experiment archive](https://github.com/pnnl/COPIP/blob/5839ee5f572b7ab8f65a69609b06e1159afc4632/Models/SEGP/Exp_004_ABCD/Data.zip), containing settings, stats.csv, and seven PNG plots of training loss, learned/true priors, covariance, posterior and samples.

The root `Data/` directory contains only a placeholder; the generated video dataset is not packaged. No requirements/environment lockfile, license file, VAE evaluation script, or complete set of ablation checkpoints was present in the inspected tree. README instructions require users to install dependencies, set paths and copy manuscript settings. In particular:

- The generator converts `mean_U` and `mean_dU` to NumPy, then later attempts `.cpu().numpy()` when saving them; this path requires correction for a successful fresh run.
- The bundled VAE checkpoint is directly in `Exp_001/`, whereas the script's load path expects `Exp_001/Checkpoints/`; settings files needed by load mode are not bundled alongside it.
- The default fresh VAE run targets the already-existing `Exp_001/` and intentionally raises rather than overwriting it.
- The standalone GP train/evaluate defaults and provided `Exp_004_ABCD` archive do not align automatically.
- No runtime/hardware claim should be derived from scripts choosing CUDA opportunistically.

No repo plots were copied into the website: their direct-observed-GP setting differs from the VAE figures emphasized by the manuscript. Prefer the original paper's figures, with their published captions and license, and link the repository as an implementation resource. Detailed implementation issues belong in this maintenance audit, not in the public research narrative.

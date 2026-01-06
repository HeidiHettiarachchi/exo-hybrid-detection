import os
import imageio
from astropy.io import fits
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Circle
from scipy.ndimage import median_filter
from scipy.signal import fftconvolve

# ===============================
# Paths
# ===============================
OUTPUT_DIR = "backend/data/outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ===============================
# PSF kernel (from your Colab)
# ===============================
x = np.linspace(-3, 3, 9)
xx, yy = np.meshgrid(x, x)
psf = np.exp(-(xx**2 + yy**2) / 2.0)
psf /= psf.sum()

# ===============================
# Likelihood Ratio Map
# ===============================
def likelihood_ratio(snr_map):
    mu = np.mean(snr_map)
    sigma = np.std(snr_map) + 1e-6
    lr = np.exp((snr_map - mu) / sigma)
    return lr / lr.max()

# ===============================
# Exoplanet Detection (FIXED)
# ===============================
def detect_exoplanets_from_snr(fits_file):
    """
    Returns:
      snr_map (np.ndarray)
      lr_map  (np.ndarray)
      detections (list of dicts, JSON-safe)
      snr_png (str)
      lr_png  (str)
    """

    # --- Load FITS ---
    with fits.open(fits_file) as hdul:
        data = hdul[0].data.astype(float)
        hdr = hdul[0].header

    xc = int(hdr.get("XCENTER", data.shape[1] // 2))
    yc = int(hdr.get("YCENTER", data.shape[0] // 2))
    pixscale = float(hdr.get("PIXSCALE", 1.0))

    # --- Background subtraction ---
    bkg = median_filter(data, size=11)
    res = data - bkg

    # --- Matched filtering + SNR ---
    mf = fftconvolve(res, psf[::-1, ::-1], mode="same")
    sigma = np.std(mf)
    snr_map = mf / (sigma + 1e-12)

    # --- Threshold ---
    max_snr = float(np.max(snr_map))
    thresh = max(5.0, 0.2 * max_snr)
    cands = np.argwhere(snr_map > thresh)

    # --- Filter detections ---
    detections = []
    for (y, x) in cands:
        rho_pix = np.hypot(x - xc, y - yc)
        if rho_pix > 8:
            rho_mas = rho_pix * pixscale
            detections.append({
                "x": int(x),
                "y": int(y),
                "snr": float(snr_map[y, x]),
                "sep_mas": float(rho_mas)
            })

    # Keep top 3
    detections = sorted(detections, key=lambda d: d["snr"], reverse=True)[:3]

    # --- LR map ---
    lr_map = likelihood_ratio(snr_map)

    # ===============================
    # Save SNR PNG
    # ===============================
    snr_png = os.path.join(
        OUTPUT_DIR,
        os.path.basename(fits_file).replace(".fits", "_snr.png")
    )

    plt.figure(figsize=(5, 5))
    plt.imshow(snr_map, cmap="inferno", origin="lower")
    plt.plot(xc, yc, "r+", markersize=10)

    for d in detections:
        circ = Circle((d["x"], d["y"]), radius=4,
                      edgecolor="lime", facecolor="none", lw=1.5)
        plt.gca().add_patch(circ)

    plt.colorbar(label="SNR")
    plt.title(os.path.basename(fits_file))
    plt.tight_layout()
    plt.savefig(snr_png, dpi=120)
    plt.close()

    # ===============================
    # Save LR PNG
    # ===============================
    lr_png = os.path.join(
        OUTPUT_DIR,
        os.path.basename(fits_file).replace(".fits", "_lr.png")
    )

    plt.figure(figsize=(5, 5))
    plt.imshow(lr_map, cmap="viridis", origin="lower")
    plt.colorbar(label="LR")
    plt.title(os.path.basename(fits_file))
    plt.tight_layout()
    plt.savefig(lr_png, dpi=120)
    plt.close()

    return snr_map, lr_map, detections, snr_png, lr_png

# ===============================
# Full Pipeline
# ===============================
def run_pipeline(fits_files, job_id=None, JOBS=None):
    """
    Returns:
      outputs (list of dicts)
      output_file (str)
      output_type (gif|mp4)
    """

    total = len(fits_files)

    if JOBS is not None and job_id is not None:
        JOBS[job_id]["total"] = total
        JOBS[job_id]["done"] = 0

    outputs = []

    for f in fits_files:
        snr_map, lr_map, detections, snr_png, lr_png = detect_exoplanets_from_snr(f)

        outputs.append({
            "frame": os.path.basename(f),
            "snr": float(np.max(snr_map)),
            "detections": detections,
            "snr_png": os.path.basename(snr_png),
            "lr_png": os.path.basename(lr_png)
        })

        if JOBS is not None and job_id is not None:
            JOBS[job_id]["done"] += 1

    # ===============================
    # GIF or MP4 generation
    # ===============================
    frames = [
        imageio.imread(os.path.join(OUTPUT_DIR, o["snr_png"]))
        for o in outputs
    ]

    if len(fits_files) <= 50:
        output_type = "gif"
        output_file = os.path.join(OUTPUT_DIR, "exoplanet.gif")
        imageio.mimsave(output_file, frames, fps=3)
    else:
        output_type = "mp4"
        output_file = os.path.join(OUTPUT_DIR, "exoplanet.mp4")
        imageio.mimsave(output_file, frames, fps=3)

    return outputs, output_file, output_type

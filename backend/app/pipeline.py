import os
import cv2
import imageio
import zipfile
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from astropy.io import fits
from pathlib import Path

from .utils import (
    gaussian_psf,
    background_subtract,
    matched_filter_snr,
    likelihood_ratio,
    mask_artifacts,
    detect_candidates,
)

BASE_DIR   = Path(__file__).resolve().parent.parent
DATA_DIR   = BASE_DIR / "data"
OUTPUT_DIR = DATA_DIR / "outputs"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def _set_step(JOBS, job_id, step):
    if JOBS is not None and job_id is not None:
        JOBS[job_id]["step"] = step


def _load_fits(fits_file):
    with fits.open(fits_file) as hdul:
        if hdul[0].data is not None:
            return hdul[0].data.astype(float), hdul[0].header
        return hdul[1].data.astype(float), hdul[1].header


def generate_raw_preview(fits_file):
    data, _ = _load_fits(fits_file)
    raw_png = OUTPUT_DIR / os.path.basename(fits_file).replace(".fits", "_raw.png")
    fig, ax = plt.subplots(figsize=(5, 5))
    v1, v2 = np.percentile(data, [1, 99])
    ax.imshow(data, cmap="gray", origin="lower", vmin=v1, vmax=v2)
    ax.set_title(os.path.basename(fits_file), fontsize=8)
    ax.axis("off")
    plt.tight_layout()
    plt.savefig(raw_png, dpi=120)
    plt.close()
    return str(raw_png)


def detect_exoplanets_from_snr(fits_file, params, JOBS=None, job_id=None):
    BKG_FILTER_SIZE  = int(params.get("bkg_filter_size", 101))
    PSF_SIGMA        = float(params.get("psf_sigma", 2.0))
    PSF_SIZE         = int(params.get("psf_size", 9))
    SNR_THRESHOLD    = float(params.get("snr_threshold", 5.0))
    THRESH_FRACTION  = float(params.get("thresh_fraction", 0.2))
    MIN_SEP_PIX      = int(params.get("min_sep_pix", 30))
    CIRCLE_RADIUS    = int(params.get("circle_radius", 30))
    CIRCLE_COLOR     = str(params.get("circle_color", "lime"))
    SNR_CMAP         = str(params.get("snr_cmap", "inferno"))
    EDGE_CROP        = int(params.get("edge_crop", 25))
    TOP_N            = int(params.get("top_n", 1))  


    base = os.path.basename(fits_file).replace(".fits", "")

    _set_step(JOBS, job_id, f"[{base}] Reading FITS file...")
    data, hdr = _load_fits(fits_file)

    _set_step(JOBS, job_id, f"[{base}] Cropping border artifacts...")
    c    = EDGE_CROP
    data = data[c:-c, c:-c]
    xc   = data.shape[1] // 2
    yc   = data.shape[0] // 2
    pixscale = float(hdr.get("PIXSCALE", 1.0))

    _set_step(JOBS, job_id, f"[{base}] Subtracting background noise...")
    clean, _ = background_subtract(data, filter_size=BKG_FILTER_SIZE)

    _set_step(JOBS, job_id, f"[{base}] Masking artifact columns & rows...")
    clean = mask_artifacts(clean)

    _set_step(JOBS, job_id, f"[{base}] Masking coronagraph center...")
    yy_g, xx_g = np.mgrid[0:clean.shape[0], 0:clean.shape[1]]
    clean[np.hypot(xx_g - xc, yy_g - yc) < MIN_SEP_PIX] = 0

    _set_step(JOBS, job_id, f"[{base}] Enhancing image contrast...")
    vmin     = np.percentile(clean, 90)
    vmax     = np.percentile(clean, 99.9)
    enhanced = np.clip(clean, vmin, vmax)
    enhanced = (enhanced - vmin) / (vmax - vmin + 1e-12)

    _set_step(JOBS, job_id, f"[{base}] Building PSF kernel & running matched filter...")
    psf     = gaussian_psf(size=PSF_SIZE, sigma=PSF_SIGMA)
    snr_map = matched_filter_snr(clean, psf)

    _set_step(JOBS, job_id, f"[{base}] Computing likelihood ratio map...")
    lr_map = likelihood_ratio(snr_map)

    _set_step(JOBS, job_id, f"[{base}] Detecting planet candidates...")
    detections = detect_candidates(
        snr_map, xc, yc, pixscale=pixscale,
        snr_threshold=SNR_THRESHOLD,
        thresh_fraction=THRESH_FRACTION,
        min_sep_pix=MIN_SEP_PIX,
        circle_radius=CIRCLE_RADIUS,
        edge_crop=EDGE_CROP,
        top_n=TOP_N,
    )

    _set_step(JOBS, job_id, f"[{base}] Rendering output images...")

    # Save RAW PNG
    raw_png = OUTPUT_DIR / f"{base}_raw.png"
    raw_data, _ = _load_fits(fits_file)
    fig, ax = plt.subplots(figsize=(5, 5))
    v1, v2 = np.percentile(raw_data, [1, 99])
    ax.imshow(raw_data, cmap="gray", origin="lower", vmin=v1, vmax=v2)
    ax.set_title(f"Raw — {base}", fontsize=8)
    ax.axis("off")
    plt.tight_layout()
    plt.savefig(raw_png, dpi=120, bbox_inches="tight")
    plt.close()

    # Save ENHANCED PNG
    enhanced_png = OUTPUT_DIR / f"{base}_enhanced.png"
    fig, ax = plt.subplots(figsize=(5, 5))
    ax.imshow(enhanced, cmap="gray", origin="lower")
    ax.set_title(f"Enhanced — {base}", fontsize=8)
    ax.axis("off")
    plt.tight_layout()
    plt.savefig(enhanced_png, dpi=120, bbox_inches="tight")
    plt.close()

    # Save SNR PNG
    snr_png = OUTPUT_DIR / f"{base}_snr.png"
    fig, ax = plt.subplots(figsize=(5, 5))
    snr_vmax = np.percentile(snr_map, 99.5)
    im = ax.imshow(snr_map, cmap=SNR_CMAP, origin="lower", vmin=-3, vmax=snr_vmax)
    ax.plot(xc, yc, "r+", markersize=10, markeredgewidth=2)
    for d in detections:
        ax.add_patch(Circle((d["x"], d["y"]), radius=CIRCLE_RADIUS,
                             edgecolor=CIRCLE_COLOR, facecolor="none", lw=1.5))
        ax.text(d["x"] + CIRCLE_RADIUS + 2, d["y"],
                f"SNR={d['snr']:.1f}", color=CIRCLE_COLOR, fontsize=7)
    plt.colorbar(im, ax=ax, label="SNR")
    ax.set_title(f"SNR Map — {base}", fontsize=8)
    ax.axis("off")
    plt.tight_layout()
    plt.savefig(snr_png, dpi=120, bbox_inches="tight")
    plt.close()

    # Save LR PNG
    lr_png = OUTPUT_DIR / f"{base}_lr.png"
    fig, ax = plt.subplots(figsize=(5, 5))
    im2 = ax.imshow(lr_map, cmap="viridis", origin="lower")
    for d in detections:
        ax.add_patch(Circle((d["x"], d["y"]), radius=CIRCLE_RADIUS,
                             edgecolor=CIRCLE_COLOR, facecolor="none", lw=1.5))
    plt.colorbar(im2, ax=ax, label="LR")
    ax.set_title(f"LR Map — {base}", fontsize=8)
    ax.axis("off")
    plt.tight_layout()
    plt.savefig(lr_png, dpi=120, bbox_inches="tight")
    plt.close()

    return {
        "raw_png":      str(raw_png),
        "enhanced_png": str(enhanced_png),
        "snr_png":      str(snr_png),
        "lr_png":       str(lr_png),
        "snr_map":      snr_map,
        "detections":   detections,
    }


def _make_gif_mp4(png_list, out_path, fps=3):
    frames_raw = [imageio.imread(p) for p in png_list if os.path.exists(p)]
    if not frames_raw:
        return
    h, w = frames_raw[0].shape[:2]
    frames = [cv2.resize(f, (w, h)) for f in frames_raw]
    imageio.mimsave(str(out_path), frames, fps=fps)


def _make_zip(png_list, zip_path):
    with zipfile.ZipFile(zip_path, "w") as zf:
        for p in png_list:
            if os.path.exists(p):
                zf.write(p, os.path.basename(p))


def run_pipeline(fits_files, params=None, job_id=None, JOBS=None):
    if params is None:
        params = {}

    fps  = int(params.get("animation_fps", 3))
    anim = "gif" if len(fits_files) <= 50 else "mp4"

    if JOBS is not None and job_id is not None:
        JOBS[job_id] = {"done": 0, "total": len(fits_files), "step": "Starting..."}

    outputs       = []
    raw_pngs      = []
    enhanced_pngs = []
    snr_pngs      = []
    lr_pngs       = []

    for f in fits_files:
        result = detect_exoplanets_from_snr(f, params, JOBS=JOBS, job_id=job_id)
        raw_pngs.append(result["raw_png"])
        enhanced_pngs.append(result["enhanced_png"])
        snr_pngs.append(result["snr_png"])
        lr_pngs.append(result["lr_png"])

        outputs.append({
            "frame":        os.path.basename(f),
            "snr":          float(np.max(result["snr_map"])),
            "detections":   result["detections"],
            "raw_png":      os.path.basename(result["raw_png"]),
            "enhanced_png": os.path.basename(result["enhanced_png"]),
            "snr_png":      os.path.basename(result["snr_png"]),
            "lr_png":       os.path.basename(result["lr_png"]),
        })

        if JOBS is not None and job_id is not None:
            JOBS[job_id]["done"] += 1

    _set_step(JOBS, job_id, "Building animations...")
    for label, pngs in [("raw", raw_pngs), ("enhanced", enhanced_pngs),
                         ("snr", snr_pngs), ("lr", lr_pngs)]:
        _make_gif_mp4(pngs, OUTPUT_DIR / f"exoplanet_{label}.{anim}", fps=fps)

    _set_step(JOBS, job_id, "Packaging ZIP downloads...")
    for label, pngs in [("raw", raw_pngs), ("enhanced", enhanced_pngs),
                         ("snr", snr_pngs), ("lr", lr_pngs)]:
        _make_zip(pngs, str(OUTPUT_DIR / f"exoplanet_{label}.zip"))

    _set_step(JOBS, job_id, "Done!")
    return outputs, anim
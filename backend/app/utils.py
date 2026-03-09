import numpy as np
from scipy.signal import fftconvolve
from scipy.ndimage import median_filter

def gaussian_psf(size=9, sigma=2.0):
    ax = np.linspace(-(size // 2), size // 2, size)
    xx, yy = np.meshgrid(ax, ax)
    psf = np.exp(-(xx**2 + yy**2) / (2 * sigma**2))
    return psf / psf.sum()

def background_subtract(image, filter_size=101):
    bkg = median_filter(image, size=filter_size)
    clean = image - bkg
    return clean, bkg

# def matched_filter_snr(image, psf):
#     mf = fftconvolve(image, psf[::-1, ::-1], mode="same")
#     sigma = np.std(mf)
#     return mf / (sigma + 1e-12)

def matched_filter_snr(image, psf):
    mf = fftconvolve(image, psf[::-1, ::-1], mode="same")
    # Use only background pixels (faint 90%) for sigma — avoids bright sources inflating noise estimate
    background_mask = mf < np.percentile(mf, 90)
    sigma = np.std(mf[background_mask]) + 1e-6
    return mf / sigma

def likelihood_ratio(snr_map):
    mu = np.mean(snr_map)
    sigma = np.std(snr_map) + 1e-6
    lr = np.exp((snr_map - mu) / sigma)
    return lr / lr.max()

def mask_artifacts(clean):
    col_means = np.mean(clean, axis=0)
    row_means = np.mean(clean, axis=1)
    col_thresh = np.mean(col_means) + 3 * np.std(col_means)
    row_thresh = np.mean(row_means) + 3 * np.std(row_means)
    bad_cols = np.where(col_means > col_thresh)[0]
    bad_rows = np.where(row_means > row_thresh)[0]
    for col in bad_cols:
        clean[:, max(0, col - 3):col + 4] = 0
    for row in bad_rows:
        clean[max(0, row - 3):row + 4, :] = 0
    return clean

# def detect_candidates(snr_map, xc, yc, pixscale=1.0,
#                       snr_threshold=5.0, thresh_fraction=0.5,
#                       min_sep_pix=55, circle_radius=30, edge_crop=25):

#     h, w = snr_map.shape
#     yy_g, xx_g = np.mgrid[0:h, 0:w]
#     rho_map = np.hypot(xx_g - xc, yy_g - yc)

#     # Annulus-adaptive threshold (sigma-clipped per ring)
#     annulus_width = 5
#     adaptive_thresh_map = np.zeros_like(snr_map)
#     for r in range(0, int(rho_map.max()), annulus_width):
#         mask = (rho_map >= r) & (rho_map < r + annulus_width)
#         if mask.sum() < 10:
#             continue
#         ring_vals = snr_map[mask]
#         ring_vals_clipped = ring_vals[ring_vals < np.percentile(ring_vals, 90)]
#         ring_mu  = np.mean(ring_vals_clipped)
#         ring_std = np.std(ring_vals_clipped) + 1e-6
#         adaptive_thresh_map[mask] = ring_mu + snr_threshold * ring_std

#     # Also apply thresh_fraction * global max as a floor
#     global_adaptive = thresh_fraction * np.max(snr_map)
#     adaptive_thresh_map = np.maximum(adaptive_thresh_map, global_adaptive)

#     cands = np.argwhere(snr_map > adaptive_thresh_map)
#     margin = edge_crop + 15

#     raw_detections = []
#     for (y, x) in cands:
#         rho_pix = float(rho_map[y, x])
#         if not (rho_pix > min_sep_pix and
#                 x > margin and x < w - margin and
#                 y > margin and y < h - margin):
#             continue

#         r = 5
#         y1, y2 = max(0, y - r), min(h, y + r + 1)
#         x1, x2 = max(0, x - r), min(w, x + r + 1)
#         patch = snr_map[y1:y2, x1:x2]
#         peak  = snr_map[y, x]

#         col_profile = patch[:, patch.shape[1] // 2]
#         row_profile = patch[patch.shape[0] // 2, :]
#         col_falloff = (peak - np.mean(col_profile)) / (peak + 1e-6)
#         row_falloff = (peak - np.mean(row_profile)) / (peak + 1e-6)
#         if col_falloff < 0.3 or row_falloff < 0.3:
#             continue

#         patch_yy, patch_xx = np.mgrid[0:patch.shape[0], 0:patch.shape[1]]
#         patch_cy = (patch.shape[0] - 1) / 2
#         patch_cx = (patch.shape[1] - 1) / 2
#         left  = patch[patch_xx <  patch_cx]
#         right = patch[patch_xx >= patch_cx]
#         top   = patch[patch_yy <  patch_cy]
#         bot   = patch[patch_yy >= patch_cy]
#         h_sym = abs(np.mean(left) - np.mean(right)) / (peak + 1e-6)
#         v_sym = abs(np.mean(top)  - np.mean(bot))   / (peak + 1e-6)
#         if h_sym > 0.4 or v_sym > 0.4:
#             continue

#         raw_detections.append({
#             "x": int(x),
#             "y": int(y),
#             "snr": float(peak),
#             "sep_pix": rho_pix,
#             "sep_mas": rho_pix * pixscale
#         })

#     raw_detections = sorted(raw_detections, key=lambda d: d["snr"], reverse=True)
#     detections = []
#     for cand in raw_detections:
#         too_close = False
#         for kept in detections:
#             if np.hypot(cand["x"] - kept["x"], cand["y"] - kept["y"]) < circle_radius:
#                 too_close = True
#                 break
#         if not too_close:
#             detections.append(cand)

#     return detections


def detect_candidates(snr_map, xc, yc, pixscale=1.0,
                      snr_threshold=5.0, thresh_fraction=0.5,
                      min_sep_pix=55, circle_radius=30, edge_crop=25, top_n=5):

    h, w = snr_map.shape
    yy_g, xx_g = np.mgrid[0:h, 0:w]
    rho_map = np.hypot(xx_g - xc, yy_g - yc)

    max_snr = float(np.max(snr_map))
    thresh  = max(snr_threshold, thresh_fraction * max_snr)
    cands   = np.argwhere(snr_map > thresh)

    # annulus_width = 5
    # adaptive_thresh_map = np.zeros_like(snr_map)
    # for r in range(0, int(rho_map.max()), annulus_width):
    #     mask = (rho_map >= r) & (rho_map < r + annulus_width)
    #     if mask.sum() < 10:
    #         continue
    #     ring_vals = snr_map[mask]
    #     ring_vals_clipped = ring_vals[ring_vals < np.percentile(ring_vals, 90)]
    #     ring_mu  = np.mean(ring_vals_clipped)
    #     ring_std = np.std(ring_vals_clipped) + 1e-6
    #     adaptive_thresh_map[mask] = ring_mu + snr_threshold * ring_std

    # global_adaptive = thresh_fraction * np.max(snr_map)
    # adaptive_thresh_map = np.maximum(adaptive_thresh_map, global_adaptive)

    # cands = np.argwhere(snr_map > adaptive_thresh_map)
    margin = edge_crop + 40  # ← increased from 15 to 40 to exclude detector borders

    # raw_detections = []
    # for (y, x) in cands:
    #     rho_pix = float(rho_map[y, x])
    #     if not (rho_pix > min_sep_pix and
    #             x > margin and x < w - margin and
    #             y > margin and y < h - margin):
    #         continue

    #     r = 5
    #     y1, y2 = max(0, y - r), min(h, y + r + 1)
    #     x1, x2 = max(0, x - r), min(w, x + r + 1)
    #     patch = snr_map[y1:y2, x1:x2]
    #     peak  = snr_map[y, x]

    #     col_profile = patch[:, patch.shape[1] // 2]
    #     row_profile = patch[patch.shape[0] // 2, :]
    #     col_falloff = (peak - np.mean(col_profile)) / (peak + 1e-6)
    #     row_falloff = (peak - np.mean(row_profile)) / (peak + 1e-6)
    #     if col_falloff < 0.3 or row_falloff < 0.3:
    #         continue

    #     patch_yy, patch_xx = np.mgrid[0:patch.shape[0], 0:patch.shape[1]]
    #     patch_cy = (patch.shape[0] - 1) / 2
    #     patch_cx = (patch.shape[1] - 1) / 2
    #     left  = patch[patch_xx <  patch_cx]
    #     right = patch[patch_xx >= patch_cx]
    #     top   = patch[patch_yy <  patch_cy]
    #     bot   = patch[patch_yy >= patch_cy]
    #     h_sym = abs(np.mean(left) - np.mean(right)) / (peak + 1e-6)
    #     v_sym = abs(np.mean(top)  - np.mean(bot))   / (peak + 1e-6)
    #     if h_sym > 0.4 or v_sym > 0.4:
    #         continue

    #     raw_detections.append({
    #         "x": int(x),
    #         "y": int(y),
    #         "snr": float(peak),
    #         "sep_pix": rho_pix,
    #         "sep_mas": rho_pix * pixscale
    #     })

    raw_detections = []
    for (y, x) in cands:
        rho_pix = float(rho_map[y, x])
        if not (rho_pix > min_sep_pix and
                x > margin and x < w - margin and
                y > margin and y < h - margin):
            continue

        raw_detections.append({
            "x": int(x),
            "y": int(y),
            "snr": float(snr_map[y, x]),
            "sep_pix": rho_pix,
            "sep_mas": rho_pix * pixscale
        })

    raw_detections = sorted(raw_detections, key=lambda d: d["snr"], reverse=True)
    detections = []
    for cand in raw_detections:
        too_close = False
        for kept in detections:
            if np.hypot(cand["x"] - kept["x"], cand["y"] - kept["y"]) < circle_radius:
                too_close = True
                break
        if not too_close:
            detections.append(cand)
        if len(detections) >= top_n:  # ← top_n now actually applied
            break

    return detections
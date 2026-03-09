# # # # # # # # # import numpy as np
# # # # # # # # # from .preprocess import normalize_flux
# # # # # # # # # from .bls import run_bls

# # # # # # # # # def run_transit_pipeline(df, max_planets=2):
   

# # # # # # # # #     # Extract raw data
# # # # # # # # #     time = df["TIME"].values
# # # # # # # # #     raw_flux = df["PDCSAP_FLUX"].values

# # # # # # # # #     # Drop NaNs 
# # # # # # # # #     mask = np.isfinite(time) & np.isfinite(raw_flux)
# # # # # # # # #     time = time[mask]
# # # # # # # # #     raw_flux = raw_flux[mask]

# # # # # # # # #     # Normalize ONLY 
# # # # # # # # #     flux = normalize_flux(raw_flux)

# # # # # # # # #     detections = []
# # # # # # # # #     residual_flux = flux.copy()

# # # # # # # # #     for _ in range(max_planets):
# # # # # # # # #         result = run_bls(time, residual_flux)

# # # # # # # # #         # Empirical detection threshold
# # # # # # # # #         if result["bls_power"] < 8:
# # # # # # # # #             break

# # # # # # # # #         detections.append(result)

# # # # # # # # #         # Mask detected transit
# # # # # # # # #         phase = ((time - result["t0"]) % result["period"]) / result["period"]
# # # # # # # # #         in_transit = phase < (result["duration"] / result["period"])
# # # # # # # # #         residual_flux[in_transit] = np.median(residual_flux)

# # # # # # # # #     return {
# # # # # # # # #         "num_planets": len(detections),
# # # # # # # # #         "planets": detections,

# # # # # # # # #         # Raw light curve for plotting
# # # # # # # # #         "light_curve": [
# # # # # # # # #             {"time": float(t), "flux": float(f)}
# # # # # # # # #             for t, f in zip(time, raw_flux)
# # # # # # # # #         ]
# # # # # # # # #     }

# # # # # # # # import numpy as np
# # # # # # # # from .preprocess import normalize_flux, load_flexible_csv
# # # # # # # # from .bls import run_bls


# # # # # # # # def run_transit_pipeline(df, max_planets=2):
# # # # # # # #     """
# # # # # # # #     Accepts a DataFrame that already has 'time' and 'flux' columns
# # # # # # # #     (output of load_flexible_csv), OR the raw uploaded DataFrame.
# # # # # # # #     """
# # # # # # # #     # If coming straight from the file upload, normalise columns first
# # # # # # # #     if "time" not in df.columns or "flux" not in df.columns:
# # # # # # # #         from io import StringIO
# # # # # # # #         df = load_flexible_csv(StringIO(df.to_csv(index=False)))

# # # # # # # #     time = df["time"].values
# # # # # # # #     raw_flux = df["flux"].values

# # # # # # # #     mask = np.isfinite(time) & np.isfinite(raw_flux)
# # # # # # # #     time = time[mask]
# # # # # # # #     raw_flux = raw_flux[mask]

# # # # # # # #     flux = normalize_flux(raw_flux)

# # # # # # # #     detections = []
# # # # # # # #     residual_flux = flux.copy()

# # # # # # # #     for _ in range(max_planets):
# # # # # # # #         result = run_bls(time, residual_flux)

# # # # # # # #         if result["bls_power"] < 8:
# # # # # # # #             break

# # # # # # # #         detections.append(result)

# # # # # # # #         phase = ((time - result["t0"]) % result["period"]) / result["period"]
# # # # # # # #         in_transit = phase < (result["duration"] / result["period"])
# # # # # # # #         residual_flux[in_transit] = np.median(residual_flux)

# # # # # # # #     return {
# # # # # # # #         "num_planets": len(detections),
# # # # # # # #         "planets": detections,
# # # # # # # #         "light_curve": [
# # # # # # # #             {"time": float(t), "flux": float(f)}
# # # # # # # #             for t, f in zip(time, raw_flux)
# # # # # # # #         ]
# # # # # # # #     }

# # # # # # # import numpy as np
# # # # # # # from .preprocess import normalize_flux, parse_light_curve
# # # # # # # from .bls import run_bls


# # # # # # # def run_transit_pipeline(file_content: bytes, filename: str, max_planets: int = 3):
# # # # # # #     """
# # # # # # #     Full transit detection pipeline.
# # # # # # #     Accepts raw file bytes + filename, auto-parses format,
# # # # # # #     runs iterative BLS, and returns confirmed detections only.
# # # # # # #     """
# # # # # # #     # --- 1. Parse (handles .tbl and .csv) ---
# # # # # # #     df = parse_light_curve(file_content, filename)

# # # # # # #     time     = df["TIME"].values
# # # # # # #     raw_flux = df["PDCSAP_FLUX"].values

# # # # # # #     # --- 2. Normalise ---
# # # # # # #     flux = normalize_flux(raw_flux)

# # # # # # #     detections     = []
# # # # # # #     residual_flux  = flux.copy()

# # # # # # #     # --- 3. Iterative BLS ---
# # # # # # #     for _ in range(max_planets):
# # # # # # #         result = run_bls(time, residual_flux)

# # # # # # #         # Only keep statistically confirmed detections
# # # # # # #         if not result["confirmed"]:
# # # # # # #             break

# # # # # # #         detections.append(result)

# # # # # # #         # Mask this transit out so next iteration finds the next planet
# # # # # # #         phase      = ((time - result["t0"]) % result["period"]) / result["period"]
# # # # # # #         in_transit = phase < (result["duration"] / result["period"])
# # # # # # #         residual_flux[in_transit] = np.median(residual_flux)

# # # # # # #     return {
# # # # # # #         "num_planets":      len(detections),
# # # # # # #         "planets":          detections,
# # # # # # #         "transit_detected": len(detections) > 0,

# # # # # # #         # Raw (un-normalised) light curve for plotting
# # # # # # #         "light_curve": [
# # # # # # #             {"time": float(t), "flux": float(f)}
# # # # # # #             for t, f in zip(time, raw_flux)
# # # # # # #         ],
# # # # # # #     }

# # # # # # import numpy as np
# # # # # # from .preprocess import normalize_flux, parse_upload
# # # # # # from .bls import run_bls


# # # # # # def run_transit_pipeline(df, max_planets=3):
# # # # # #     time = df["TIME"].values
# # # # # #     raw_flux = df["PDCSAP_FLUX"].values

# # # # # #     mask = np.isfinite(time) & np.isfinite(raw_flux)
# # # # # #     time = time[mask]
# # # # # #     raw_flux = raw_flux[mask]

# # # # # #     flux = normalize_flux(raw_flux)
# # # # # #     detections = []
# # # # # #     residual_flux = flux.copy()

# # # # # #     for _ in range(max_planets):
# # # # # #         result = run_bls(time, residual_flux)

# # # # # #         if result["bls_power"] < 8:
# # # # # #             break

# # # # # #         detections.append(result)

# # # # # #         # Mask out detected transit for next iteration
# # # # # #         phase = ((time - result["t0"]) % result["period"]) / result["period"]
# # # # # #         in_transit = phase < (result["duration"] / result["period"])
# # # # # #         residual_flux[in_transit] = np.median(residual_flux)

# # # # # #     return {
# # # # # #         "num_planets": len(detections),
# # # # # #         "planets": detections,
# # # # # #         "light_curve": [
# # # # # #             {"time": float(t), "flux": float(f)}
# # # # # #             for t, f in zip(time, raw_flux)
# # # # # #         ]
# # # # # #     }


# # # # # # def run_transit_pipeline_from_upload(file_bytes: bytes, filename: str, max_planets=3):
# # # # # #     """Entry point that handles file parsing before running the pipeline."""
# # # # # #     df = parse_upload(file_bytes, filename)
# # # # # #     return run_transit_pipeline(df, max_planets=max_planets)

# # # # # # pipeline.py
# # # # # import numpy as np
# # # # # from .preprocess import normalize_flux
# # # # # from .bls import run_bls

# # # # # # Minimum points required to attempt BLS
# # # # # MIN_POINTS = 50

# # # # # def run_transit_pipeline(df, max_planets=3):

# # # # #     time     = df["TIME"].values.astype(float)
# # # # #     raw_flux = df["PDCSAP_FLUX"].values.astype(float)

# # # # #     # Drop NaNs / infs
# # # # #     mask = np.isfinite(time) & np.isfinite(raw_flux)
# # # # #     time     = time[mask]
# # # # #     raw_flux = raw_flux[mask]

# # # # #     if len(time) < MIN_POINTS:
# # # # #         return {
# # # # #             "num_planets": 0,
# # # # #             "planets": [],
# # # # #             "light_curve": [{"time": float(t), "flux": float(f)} for t, f in zip(time, raw_flux)],
# # # # #             "error": f"Too few valid data points ({len(time)}). Need at least {MIN_POINTS}."
# # # # #         }

# # # # #     flux = normalize_flux(raw_flux)

# # # # #     detections    = []
# # # # #     residual_flux = flux.copy()
# # # # #     residual_time = time.copy()

# # # # #     for _ in range(max_planets):

# # # # #         if len(residual_time) < MIN_POINTS:
# # # # #             break  # ← prevents the zero-size crash

# # # # #         result = run_bls(residual_time, residual_flux)

# # # # #         if result is None:
# # # # #             break

# # # # #         # ── Detection thresholds ─────────────────────────────────
# # # # #         BLS_POWER_MIN = 8.0      # statistical significance
# # # # #         DEPTH_MIN     = 1e-4     # at least 0.01% dip
# # # # #         DEPTH_MAX     = 0.5      # not a stellar eclipse (>50%)

# # # # #         if result["bls_power"] < BLS_POWER_MIN:
# # # # #             break
# # # # #         if not (DEPTH_MIN < result["depth"] < DEPTH_MAX):
# # # # #             break

# # # # #         # SNR estimate
# # # # #         in_transit_mask = (
# # # # #             (((residual_time - result["t0"]) % result["period"]) / result["period"])
# # # # #             < (result["duration"] / result["period"])
# # # # #         )
# # # # #         n_transits = in_transit_mask.sum()

# # # # #         if n_transits == 0:
# # # # #             break

# # # # #         transit_flux = residual_flux[in_transit_mask]
# # # # #         out_flux     = residual_flux[~in_transit_mask]

# # # # #         noise = np.std(out_flux) if len(out_flux) > 1 else 1.0
# # # # #         snr   = (np.median(out_flux) - np.median(transit_flux)) / noise if noise > 0 else 0

# # # # #         result["snr"]          = float(snr)
# # # # #         result["n_transits"]   = int(n_transits)
# # # # #         result["transit_detected"] = snr >= 3.0  # ≥3σ = detection

# # # # #         detections.append(result)

# # # # #         # Mask out detected transit points entirely (not just flatten)
# # # # #         keep = ~in_transit_mask
# # # # #         residual_time = residual_time[keep]
# # # # #         residual_flux = residual_flux[keep]

# # # # #     return {
# # # # #         "num_planets":       len(detections),
# # # # #         "planets":           detections,
# # # # #         "transit_detected":  any(d["transit_detected"] for d in detections),
# # # # #         "light_curve": [
# # # # #             {"time": float(t), "flux": float(f)}
# # # # #             for t, f in zip(time, raw_flux)
# # # # #         ]
# # # # #     }
# # # # import numpy as np
# # # # from .preprocess import normalize_flux
# # # # from .bls import run_bls


# # # # # Minimum BLS power to count as a real detection
# # # # BLS_POWER_THRESHOLD = 8.0

# # # # # Minimum transit depth (relative flux drop) — filters noise
# # # # MIN_DEPTH = 1e-4

# # # # # Signal-to-noise on depth
# # # # MIN_SNR = 5.0


# # # # def _compute_snr(time, flux, result):
# # # #     """
# # # #     Estimate SNR of a detected transit by comparing in-transit vs out-of-transit flux.
# # # #     """
# # # #     phase = ((time - result["t0"]) % result["period"]) / result["period"]
# # # #     in_transit = phase < (result["duration"] / result["period"])

# # # #     if in_transit.sum() < 3 or (~in_transit).sum() < 3:
# # # #         return 0.0

# # # #     in_flux = flux[in_transit]
# # # #     out_flux = flux[~in_transit]

# # # #     depth = np.median(out_flux) - np.median(in_flux)
# # # #     noise = np.std(out_flux)

# # # #     if noise == 0:
# # # #         return 0.0

# # # #     return float(depth / noise)


# # # # def run_transit_pipeline(df, max_planets=3):
# # # #     # Extract raw data
# # # #     time = df["TIME"].values
# # # #     raw_flux = df["PDCSAP_FLUX"].values

# # # #     # Drop NaNs
# # # #     mask = np.isfinite(time) & np.isfinite(raw_flux)
# # # #     time = time[mask]
# # # #     raw_flux = raw_flux[mask]

# # # #     # Normalize flux
# # # #     flux = normalize_flux(raw_flux)

# # # #     detections = []
# # # #     residual_flux = flux.copy()

# # # #     for _ in range(max_planets):
# # # #         result = run_bls(time, residual_flux)

# # # #         # --- Gate 1: BLS power ---
# # # #         if result["bls_power"] < BLS_POWER_THRESHOLD:
# # # #             break

# # # #         # --- Gate 2: Transit depth must be physically meaningful ---
# # # #         if abs(result["depth"]) < MIN_DEPTH:
# # # #             break

# # # #         # --- Gate 3: SNR check ---
# # # #         snr = _compute_snr(time, residual_flux, result)
# # # #         if snr < MIN_SNR:
# # # #             break

# # # #         result["snr"] = round(snr, 2)
# # # #         result["transit_detected"] = True
# # # #         detections.append(result)

# # # #         # Mask this transit out so next iteration finds the next planet
# # # #         phase = ((time - result["t0"]) % result["period"]) / result["period"]
# # # #         in_transit = phase < (result["duration"] / result["period"])
# # # #         residual_flux[in_transit] = np.median(residual_flux)

# # # #     return {
# # # #         "num_planets": len(detections),
# # # #         "transit_detected": len(detections) > 0,
# # # #         "planets": detections,
# # # #         "light_curve": [
# # # #             {"time": float(t), "flux": float(f)}
# # # #             for t, f in zip(time, raw_flux)
# # # #         ],
# # # #     }

# # # import numpy as np
# # # from app.transit.preprocess import normalize_flux
# # # from app.transit.bls import run_bls

# # # # Thresholds
# # # BLS_POWER_THRESHOLD = 8.0
# # # MIN_DEPTH_PPM = 100  # 100 ppm minimum transit depth

# # # def run_transit_pipeline(df, max_planets=3):
# # #     time = df["TIME"].values
# # #     raw_flux = df["PDCSAP_FLUX"].values

# # #     # Drop NaNs
# # #     mask = np.isfinite(time) & np.isfinite(raw_flux)
# # #     time = time[mask]
# # #     raw_flux = raw_flux[mask]

# # #     if len(time) < 50:
# # #         return {"num_planets": 0, "planets": [], "light_curve": []}

# # #     flux = normalize_flux(raw_flux)

# # #     detections = []
# # #     residual_flux = flux.copy()

# # #     for _ in range(max_planets):
# # #         result = run_bls(time, residual_flux)

# # #         # Dual threshold: BLS power AND minimum depth
# # #         depth_ppm = result["depth"] * 1e6
# # #         if result["bls_power"] < BLS_POWER_THRESHOLD:
# # #             break
# # #         if depth_ppm < MIN_DEPTH_PPM:
# # #             break

# # #         # Signal-to-noise check on depth
# # #         noise = np.std(residual_flux)
# # #         snr = result["depth"] / noise if noise > 0 else 0
# # #         if snr < 3.0:
# # #             break

# # #         result["depth_ppm"] = depth_ppm
# # #         result["snr"] = round(snr, 2)
# # #         result["confirmed"] = (
# # #             result["bls_power"] > 50 and snr > 7.0
# # #         )
# # #         detections.append(result)

# # #         # Mask transit for next iteration
# # #         phase = ((time - result["t0"]) % result["period"]) / result["period"]
# # #         in_transit = phase < (result["duration"] / result["period"])
# # #         residual_flux[in_transit] = np.median(residual_flux)

# # #     return {
# # #         "num_planets": len(detections),
# # #         "planets": detections,
# # #         "transit_detected": len(detections) > 0,
# # #         "light_curve": [
# # #             {"time": float(t), "flux": float(f)}
# # #             for t, f in zip(time, raw_flux)
# # #         ]
# # #     }

# import numpy as np
# from .preprocess import normalize_flux, detrend_flux
# from .bls import run_bls

# def run_transit_pipeline(df, max_planets=3):
#     time = df["TIME"].values
#     raw_flux = df["PDCSAP_FLUX"].values

#     mask = np.isfinite(time) & np.isfinite(raw_flux)
#     time = time[mask]
#     raw_flux = raw_flux[mask]

#     # Normalize then detrend to flatten stellar variability
#     flux_norm = normalize_flux(raw_flux)
#     flux = detrend_flux(time, flux_norm)

#     detections = []
#     residual_flux = flux.copy()

#     for _ in range(max_planets):
#         result = run_bls(time, residual_flux)

#         # TWO conditions must both be satisfied:
#         # 1. BLS power strong enough
#         # 2. Transit depth > 100 ppm (real dip)
#         if result["bls_power"] < 8 or result["depth"] < 1e-4:
#             break

#         # Find all transit times (not just t0)
#         period = result["period"]
#         t0 = result["t0"]
#         duration = result["duration"]

#         # Generate all expected transit centers within the time range
#         n_min = int((time.min() - t0) / period)
#         n_max = int((time.max() - t0) / period) + 1
#         transit_centers = [t0 + n * period for n in range(n_min, n_max)
#                           if time.min() <= t0 + n * period <= time.max()]

#         # Compute SNR: depth / scatter
#         scatter = np.std(residual_flux)
#         snr = result["depth"] / scatter if scatter > 0 else 0

#         result["transit_centers"] = transit_centers
#         result["snr"] = float(snr)
#         result["transit_detected"] = True
#         detections.append(result)

#         # Mask this transit out of residuals
#         phase = ((time - t0) % period) / period
#         half_dur = (duration / period) / 2
#         in_transit = (phase < half_dur) | (phase > 1 - half_dur)
#         residual_flux[in_transit] = np.median(residual_flux)

#     return {
#         "num_planets": len(detections),
#         "planets": detections,
#         "transit_detected": len(detections) > 0,
#         "light_curve": [
#             {"time": float(t), "flux": float(f), "flux_raw": float(r)}
#             for t, f, r in zip(time, flux, raw_flux)
#         ]
#     }

import numpy as np
from scipy.signal import savgol_filter
from .preprocess import normalize_flux
from .bls import run_bls
from .lstm_model import get_detector


# def detect_periodic_dips(time, flux):
#     """
#     Pure-numpy periodic dip detection — mirrors the JS frontend logic exactly.
#     Condition 1: flux drops below median - 2.5σ
#     Condition 2: at least 2 dips share consistent spacing (= period candidate)
#     """
#     median = np.nanmedian(flux)
#     std    = np.nanstd(flux)
#     threshold = median - 2.5 * std

#     local_dips = []
#     for i in range(2, len(flux) - 2):
#         f = flux[i]
#         if (f < threshold and
#                 f <= flux[i-1] and f <= flux[i-2] and
#                 f <= flux[i+1] and f <= flux[i+2]):
#             if not local_dips or i - local_dips[-1]["idx"] > 10:
#                 local_dips.append({"idx": i, "time": float(time[i]), "flux": float(f)})

#     if len(local_dips) < 2:
#         return []

#     results, used = [], set()
#     for a in range(len(local_dips)):
#         if a in used: continue
#         for b in range(a + 1, len(local_dips)):
#             if b in used: continue
#             candidate_period = local_dips[b]["time"] - local_dips[a]["time"]
#             if candidate_period < 0.3: continue
#             group = [local_dips[a], local_dips[b]]
#             for c in range(b + 1, len(local_dips)):
#                 spacing = local_dips[c]["time"] - group[-1]["time"]
#                 if abs(spacing - candidate_period) / candidate_period < 0.12:
#                     group.append(local_dips[c])
#             if len(group) >= 2:
#                 avg_depth = float(np.mean([median - d["flux"] for d in group]))
#                 results.append({
#                     "period":     candidate_period,
#                     "t0":         group[0]["time"],
#                     "depth":      avg_depth,
#                     "duration":   candidate_period * 0.05,
#                     "n_transits": len(group),
#                     "source":     "periodic_dip",
#                     "bls_power":  0.0,
#                 })
#                 for item in group:
#                     used.add(local_dips.index(item))
#                 break
#     return results


def denoise_flux(flux):
    if len(flux) < 101:
        return flux.copy()
    return savgol_filter(flux, window_length=101, polyorder=3)


def remove_outliers(time, flux, sigma=4.0):
    median = np.nanmedian(flux)
    std    = np.nanstd(flux)
    mask   = np.abs(flux - median) < sigma * std
    return time[mask], flux[mask]


def run_transit_pipeline(df, max_planets=3):
    # 1. Extract & clean
    time     = df["TIME"].values.astype(float)
    raw_flux = df["PDCSAP_FLUX"].values.astype(float)
    mask     = np.isfinite(time) & np.isfinite(raw_flux)
    time     = time[mask]
    raw_flux = raw_flux[mask]

    if len(time) < 50:
        return {
            "num_planets": 0, "planets": [], "lstm_score": 0.0,
            "denoised": False, "outliers_removed": False,
            "light_curve": [], "denoised_curve": [],
            "message": f"Only {len(time)} valid points — need at least 50."
        }

    # 2. Outlier removal
    time, raw_flux = remove_outliers(time, raw_flux)

    # 3. Denoise + normalize
    flux_denoised = denoise_flux(raw_flux)
    flux_norm     = normalize_flux(flux_denoised)

    # 4a. BLS detection — threshold lowered from 8 → 5
    bls_detections = []
    residual_flux  = flux_norm.copy()
    for _ in range(max_planets):
        result = run_bls(time, residual_flux)
        if result["bls_power"] < 5.0:
            break
        result["source"] = "bls"
        bls_detections.append(result)
        phase      = ((time - result["t0"]) % result["period"]) / result["period"]
        in_transit = phase < (result["duration"] / result["period"])
        residual_flux[in_transit] = np.median(residual_flux)

    # 4b. Periodic dip detection (same 2-condition logic as JS frontend)
    dip_detections = detect_periodic_dips(time, flux_norm)

    # 4c. Merge: keep BLS first, add non-overlapping dip detections
    detections = list(bls_detections)
    for dip in dip_detections:
        if len(detections) >= max_planets:
            break
        overlap = any(
            abs(dip["period"] - b["period"]) / max(b["period"], 0.001) < 0.20
            for b in bls_detections
        )
        if not overlap:
            detections.append(dip)

    # 5. LSTM scoring
    detector = get_detector()
    if detections:
        detector.train_on_lightcurve(time, flux_norm, detections, epochs=30)

    for det in detections:
        period = det["period"]
        t0     = det["t0"]
        dur    = det.get("duration", period * 0.05)
        phase  = ((time - t0) % period) / period
        phase[phase > 0.5] -= 1.0
        in_transit = np.abs(phase) < (dur / period * 3)
        win_idx    = np.where(in_transit)[0]

        if len(win_idx) > 10:
            start  = max(0, win_idx[0] - 30)
            end    = min(len(flux_norm), win_idx[-1] + 30)
            lstm_pred = detector.predict(flux_norm[start:end])
        else:
            lstm_pred = detector.predict(flux_norm[:256])

        det["lstm_transit_prob"]    = lstm_pred["transit_prob"]
        det["lstm_period_hint"]     = lstm_pred["period_hint"]
        det["lstm_depth_hint"]      = lstm_pred["depth_hint"]
        det["lstm_duration_hint"]   = lstm_pred["duration_hint"]
        bls_pwr = det.get("bls_power") or 0.0
        det["detection_confidence"] = round(
            0.5 * min(bls_pwr / 20.0, 1.0) + 0.5 * lstm_pred["transit_prob"], 4
        )

    lstm_score = (
        detections[0]["lstm_transit_prob"] if detections
        else float(detector.predict(flux_norm[:512] if len(flux_norm) > 512 else flux_norm)["transit_prob"])
    )

    # Denoised curve — safe alignment
    n = len(time)
    fd_aligned = flux_denoised[:n] if len(flux_denoised) >= n else flux_denoised
    denoised_curve = [
        {"time": float(time[i]), "flux": float(fd_aligned[i])}
        for i in range(min(n, len(fd_aligned)))
    ]

    return {
        "num_planets":      len(detections),
        "planets":          detections,
        "lstm_score":       lstm_score,
        "denoised":         True,
        "outliers_removed": True,
        "light_curve":  [{"time": float(t), "flux": float(f)} for t, f in zip(time, raw_flux)],
        "denoised_curve": denoised_curve,
    }
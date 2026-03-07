# # # import numpy as np
# # # from astropy.timeseries import BoxLeastSquares

# # # def run_bls(time, flux):
# # #     """
# # #     Run Box Least Squares transit search
# # #     """

# # #     bls = BoxLeastSquares(time, flux)

# # #     # Period grid (days)
# # #     periods = np.linspace(0.5, 30.0, 3000)

# # #     durations = np.linspace(
# # #         0.01,   # ~15 minutes
# # #         0.15,   # ~3.6 hours
# # #         20
# # #     )

# # #     result = bls.power(periods, durations)

# # #     idx = np.argmax(result.power)

# # #     return {
# # #         "period": float(result.period[idx]),
# # #         "depth": float(result.depth[idx]),
# # #         "bls_power": float(result.power[idx]),
# # #         "t0": float(result.transit_time[idx]),
# # #         "duration": float(result.duration[idx])
# # #     }

# # import numpy as np
# # from astropy.timeseries import BoxLeastSquares

# # # Tuned thresholds
# # BLS_POWER_THRESHOLD = 8.0      # minimum BLS power to flag a signal
# # DEPTH_THRESHOLD     = 1e-3     # minimum fractional depth (~0.1%)
# # SNR_THRESHOLD       = 5.0      # signal-to-noise ratio on transit depth


# # def compute_snr(depth, depth_err):
# #     """SNR of the transit depth measurement."""
# #     if depth_err is None or depth_err <= 0:
# #         return 0.0
# #     return float(depth / depth_err)


# # def run_bls(time, flux):
# #     """
# #     Run Box Least Squares transit search and return detection result
# #     with a confirmed flag based on multi-criteria thresholding.
# #     """
# #     bls    = BoxLeastSquares(time, flux)
# #     periods   = np.linspace(0.5, 30.0, 3000)
# #     durations = np.linspace(0.01, 0.15, 20)

# #     result = bls.power(periods, durations)
# #     idx    = np.argmax(result.power)

# #     period   = float(result.period[idx])
# #     depth    = float(result.depth[idx])
# #     power    = float(result.power[idx])
# #     t0       = float(result.transit_time[idx])
# #     duration = float(result.duration[idx])

# #     # --- depth uncertainty via BLS stats ---
# #     try:
# #         stats     = bls.compute_stats(period, duration, t0)
# #         depth_err = float(stats["depth"][1])   # (depth, depth_err)
# #     except Exception:
# #         depth_err = None

# #     snr = compute_snr(depth, depth_err)

# #     # --- Multi-criteria detection decision ---
# #     confirmed = (
# #         power    >= BLS_POWER_THRESHOLD and
# #         depth    >= DEPTH_THRESHOLD     and
# #         snr      >= SNR_THRESHOLD
# #     )

# #     return {
# #         "period":    period,
# #         "depth":     depth,
# #         "depth_err": depth_err,
# #         "bls_power": power,
# #         "t0":        t0,
# #         "duration":  duration,
# #         "snr":       snr,
# #         "confirmed": confirmed,   # ← NEW: True only when all thresholds pass
# #     }

# bls.py
import numpy as np
from astropy.timeseries import BoxLeastSquares

def run_bls(time, flux):
    """
    Run Box Least Squares transit search.
    Returns None if not enough data.
    """
    if len(time) < 50:
        return None  # ← fixes the crash

    bls = BoxLeastSquares(time, flux)

    periods = np.linspace(0.5, 30.0, 3000)
    durations = np.linspace(0.01, 0.15, 20)

    result = bls.power(periods, durations)
    idx = np.argmax(result.power)

    return {
        "period":    float(result.period[idx]),
        "depth":     float(result.depth[idx]),
        "bls_power": float(result.power[idx]),
        "t0":        float(result.transit_time[idx]),
        "duration":  float(result.duration[idx])
    }

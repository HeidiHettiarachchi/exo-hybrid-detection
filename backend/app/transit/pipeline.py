import numpy as np
from .preprocess import normalize_flux
from .bls import run_bls

def run_transit_pipeline(df, max_planets=2):
    """
    Full transit detection pipeline
    """

    # Extract raw data
    time = df["TIME"].values
    raw_flux = df["PDCSAP_FLUX"].values

    # Drop NaNs (critical)
    mask = np.isfinite(time) & np.isfinite(raw_flux)
    time = time[mask]
    raw_flux = raw_flux[mask]

    # Normalize ONLY (no denoising)
    flux = normalize_flux(raw_flux)

    detections = []
    residual_flux = flux.copy()

    for _ in range(max_planets):
        result = run_bls(time, residual_flux)

        # Empirical detection threshold
        if result["bls_power"] < 8:
            break

        detections.append(result)

        # Mask detected transit
        phase = ((time - result["t0"]) % result["period"]) / result["period"]
        in_transit = phase < (result["duration"] / result["period"])
        residual_flux[in_transit] = np.median(residual_flux)

    return {
        "num_planets": len(detections),
        "planets": detections,

        # Raw light curve for plotting
        "light_curve": [
            {"time": float(t), "flux": float(f)}
            for t, f in zip(time, raw_flux)
        ]
    }

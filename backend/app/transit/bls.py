import numpy as np
from astropy.timeseries import BoxLeastSquares

def run_bls(time, flux):
    """
    Run Box Least Squares transit search
    """

    bls = BoxLeastSquares(time, flux)

    # Period grid (days)
    periods = np.linspace(0.5, 30.0, 3000)

    # Physically realistic transit durations (days)
    durations = np.linspace(
        0.01,   # ~15 minutes
        0.15,   # ~3.6 hours
        20
    )

    result = bls.power(periods, durations)

    idx = np.argmax(result.power)

    return {
        "period": float(result.period[idx]),
        "depth": float(result.depth[idx]),
        "bls_power": float(result.power[idx]),
        "t0": float(result.transit_time[idx]),
        "duration": float(result.duration[idx])
    }

import numpy as np
from scipy.signal import savgol_filter

def normalize_flux(flux):
    return flux / np.nanmedian(flux)

def denoise_flux(flux):
    return savgol_filter(flux, window_length=101, polyorder=2)



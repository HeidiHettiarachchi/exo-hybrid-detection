import numpy as np
from scipy.signal import fftconvolve
from scipy.ndimage import median_filter

def gaussian_psf(size=9, sigma=1.5):
    ax = np.linspace(-(size//2), size//2, size)
    xx, yy = np.meshgrid(ax, ax)
    psf = np.exp(-(xx**2 + yy**2) / (2*sigma**2))
    return psf / psf.sum()

def matched_filter_snr(image, psf):
    mf = fftconvolve(image, psf[::-1, ::-1], mode="same")
    sigma = np.std(mf)
    return mf / (sigma + 1e-12)

def background_subtract(image):
    return image - median_filter(image, size=11)

def likelihood_ratio(snr_map):
    mu = np.mean(snr_map)
    sigma = np.std(snr_map) + 1e-6
    lr = np.exp((snr_map - mu) / sigma)
    return lr / lr.max()

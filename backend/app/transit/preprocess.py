# # # # # # # # # # # # import numpy as np
# # # # # # # # # # # # from scipy.signal import savgol_filter

# # # # # # # # # # # # def normalize_flux(flux):
# # # # # # # # # # # #     return flux / np.nanmedian(flux)

# # # # # # # # # # # # def denoise_flux(flux):
# # # # # # # # # # # #     return savgol_filter(flux, window_length=101, polyorder=2)


# # # # # # # # # # # import numpy as np
# # # # # # # # # # # import pandas as pd
# # # # # # # # # # # from scipy.signal import savgol_filter

# # # # # # # # # # # # Column name aliases
# # # # # # # # # # # TIME_ALIASES = ["time", "bjd", "t", "cadenceno", "cadence_no", "cadence",
# # # # # # # # # # #                 "jd", "hjd", "btjd", "bkjd", "#time"]
# # # # # # # # # # # FLUX_ALIASES = ["pdcsap_flux", "flux", "sap_flux", "ap_flux",
# # # # # # # # # # #                 "detrended_flux", "kspsap_flux", "corrected_flux"]


# # # # # # # # # # # def _match_col(df_cols, aliases):
# # # # # # # # # # #     lower_map = {c.lower().strip(): c for c in df_cols}
# # # # # # # # # # #     for alias in aliases:
# # # # # # # # # # #         if alias.lower() in lower_map:
# # # # # # # # # # #             return lower_map[alias.lower()]
# # # # # # # # # # #     return None


# # # # # # # # # # # def load_flexible_csv(filepath_or_buffer):
# # # # # # # # # # #     """
# # # # # # # # # # #     Load any CSV or TBL light-curve file.
# # # # # # # # # # #     Returns a DataFrame with columns: time, flux
# # # # # # # # # # #     """
# # # # # # # # # # #     try:
# # # # # # # # # # #         df = pd.read_csv(filepath_or_buffer, comment="#", sep=None,
# # # # # # # # # # #                          engine="python", on_bad_lines="skip")
# # # # # # # # # # #     except Exception:
# # # # # # # # # # #         df = pd.read_csv(filepath_or_buffer, comment="#", sep=r"\s+",
# # # # # # # # # # #                          engine="python", on_bad_lines="skip")

# # # # # # # # # # #     df.columns = [str(c).strip() for c in df.columns]

# # # # # # # # # # #     time_col = _match_col(df.columns, TIME_ALIASES)
# # # # # # # # # # #     flux_col = _match_col(df.columns, FLUX_ALIASES)

# # # # # # # # # # #     if time_col is None:
# # # # # # # # # # #         raise ValueError(
# # # # # # # # # # #             f"No time column found. Expected one of: {TIME_ALIASES}. "
# # # # # # # # # # #             f"Got: {list(df.columns)}"
# # # # # # # # # # #         )
# # # # # # # # # # #     if flux_col is None:
# # # # # # # # # # #         raise ValueError(
# # # # # # # # # # #             f"No flux column found. Expected one of: {FLUX_ALIASES}. "
# # # # # # # # # # #             f"Got: {list(df.columns)}"
# # # # # # # # # # #         )

# # # # # # # # # # #     out = pd.DataFrame({
# # # # # # # # # # #         "time": pd.to_numeric(df[time_col], errors="coerce"),
# # # # # # # # # # #         "flux": pd.to_numeric(df[flux_col], errors="coerce"),
# # # # # # # # # # #     })

# # # # # # # # # # #     out = out[np.isfinite(out["time"]) & np.isfinite(out["flux"])].reset_index(drop=True)

# # # # # # # # # # #     if len(out) < 10:
# # # # # # # # # # #         raise ValueError(f"Only {len(out)} valid rows after parsing — too few to analyse.")

# # # # # # # # # # #     return out


# # # # # # # # # # # def normalize_flux(flux):
# # # # # # # # # # #     return flux / np.nanmedian(flux)


# # # # # # # # # # # def denoise_flux(flux):
# # # # # # # # # # #     return savgol_filter(flux, window_length=101, polyorder=2)

# # # # # # # # # # import numpy as np
# # # # # # # # # # import pandas as pd
# # # # # # # # # # from scipy.signal import savgol_filter
# # # # # # # # # # import io


# # # # # # # # # # def normalize_flux(flux):
# # # # # # # # # #     return flux / np.nanmedian(flux)


# # # # # # # # # # def denoise_flux(flux):
# # # # # # # # # #     return savgol_filter(flux, window_length=101, polyorder=2)


# # # # # # # # # # def parse_tbl(content: str) -> pd.DataFrame:
# # # # # # # # # #     """Parse IPAC .tbl format with pipe-delimited headers."""
# # # # # # # # # #     lines = content.splitlines()
# # # # # # # # # #     col_line = None
# # # # # # # # # #     type_line_idx = None
# # # # # # # # # #     data_lines = []

# # # # # # # # # #     for i, line in enumerate(lines):
# # # # # # # # # #         stripped = line.strip()
# # # # # # # # # #         if stripped.startswith("|") and col_line is None and "TIME" in stripped.upper():
# # # # # # # # # #             col_line = stripped
# # # # # # # # # #             type_line_idx = i + 1
# # # # # # # # # #         elif col_line is not None and type_line_idx is not None and i > type_line_idx:
# # # # # # # # # #             if stripped and not stripped.startswith("|") and not stripped.startswith("\\"):
# # # # # # # # # #                 data_lines.append(stripped)

# # # # # # # # # #     if col_line is None:
# # # # # # # # # #         raise ValueError("Could not find column header row in .tbl file.")

# # # # # # # # # #     cols = [c.strip() for c in col_line.strip("|").split("|")]

# # # # # # # # # #     records = []
# # # # # # # # # #     for line in data_lines:
# # # # # # # # # #         parts = line.split()
# # # # # # # # # #         if len(parts) >= len(cols):
# # # # # # # # # #             offset = len(parts) - len(cols)
# # # # # # # # # #             vals = parts[offset:]
# # # # # # # # # #             record = {}
# # # # # # # # # #             for col, val in zip(cols, vals):
# # # # # # # # # #                 try:
# # # # # # # # # #                     record[col] = float(val)
# # # # # # # # # #                 except ValueError:
# # # # # # # # # #                     record[col] = np.nan
# # # # # # # # # #             records.append(record)

# # # # # # # # # #     return pd.DataFrame(records)


# # # # # # # # # # def parse_csv(content: str) -> pd.DataFrame:
# # # # # # # # # #     """
# # # # # # # # # #     Parse tab- or comma-separated CSV.
# # # # # # # # # #     Supports TIME+PDCSAP_FLUX or cadenceno+flux column layouts.
# # # # # # # # # #     """
# # # # # # # # # #     try:
# # # # # # # # # #         df = pd.read_csv(io.StringIO(content), sep="\t", comment="#")
# # # # # # # # # #         if df.shape[1] < 2:
# # # # # # # # # #             raise ValueError()
# # # # # # # # # #     except Exception:
# # # # # # # # # #         df = pd.read_csv(io.StringIO(content), sep=",", comment="#")

# # # # # # # # # #     df.columns = [c.strip().lower() for c in df.columns]
# # # # # # # # # #     col_map = {}

# # # # # # # # # #     # --- Time column ---
# # # # # # # # # #     for candidate in ["time", "cadenceno", "bjd"]:
# # # # # # # # # #         if candidate in df.columns:
# # # # # # # # # #             col_map["time"] = candidate
# # # # # # # # # #             break
# # # # # # # # # #     if "time" not in col_map:
# # # # # # # # # #         numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
# # # # # # # # # #         if numeric_cols:
# # # # # # # # # #             col_map["time"] = numeric_cols[0]

# # # # # # # # # #     # --- Flux column ---
# # # # # # # # # #     for candidate in ["pdcsap_flux", "sap_flux", "flux"]:
# # # # # # # # # #         if candidate in df.columns:
# # # # # # # # # #             col_map["flux"] = candidate
# # # # # # # # # #             break
# # # # # # # # # #     if "flux" not in col_map:
# # # # # # # # # #         numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
# # # # # # # # # #         candidates = [c for c in numeric_cols if c != col_map.get("time")]
# # # # # # # # # #         if candidates:
# # # # # # # # # #             col_map["flux"] = candidates[0]

# # # # # # # # # #     if "time" not in col_map or "flux" not in col_map:
# # # # # # # # # #         raise ValueError(f"Could not find time/flux columns. Found: {list(df.columns)}")

# # # # # # # # # #     return pd.DataFrame({
# # # # # # # # # #         "TIME": pd.to_numeric(df[col_map["time"]], errors="coerce"),
# # # # # # # # # #         "PDCSAP_FLUX": pd.to_numeric(df[col_map["flux"]], errors="coerce"),
# # # # # # # # # #     })


# # # # # # # # # # def parse_light_curve(file_content: bytes, filename: str) -> pd.DataFrame:
# # # # # # # # # #     """
# # # # # # # # # #     Auto-detect .tbl or .csv/.txt format and return normalised DataFrame
# # # # # # # # # #     with columns TIME and PDCSAP_FLUX.
# # # # # # # # # #     """
# # # # # # # # # #     content = file_content.decode("utf-8", errors="replace")
# # # # # # # # # #     ext = filename.lower().rsplit(".", 1)[-1]

# # # # # # # # # #     df = parse_tbl(content) if ext == "tbl" else parse_csv(content)

# # # # # # # # # #     df.columns = [c.upper() for c in df.columns]

# # # # # # # # # #     missing = {"TIME", "PDCSAP_FLUX"} - set(df.columns)
# # # # # # # # # #     if missing:
# # # # # # # # # #         raise ValueError(f"Parsed file missing columns: {missing}. Got: {list(df.columns)}")

# # # # # # # # # #     df = df.dropna(subset=["TIME", "PDCSAP_FLUX"])
# # # # # # # # # #     df = df.sort_values("TIME").reset_index(drop=True)

# # # # # # # # # #     if len(df) < 10:
# # # # # # # # # #         raise ValueError("Not enough valid data points after parsing.")

# # # # # # # # # #     return df

# # # # # # # # # import numpy as np
# # # # # # # # # import pandas as pd
# # # # # # # # # from scipy.signal import savgol_filter
# # # # # # # # # import io


# # # # # # # # # def parse_upload(file_bytes: bytes, filename: str) -> pd.DataFrame:
# # # # # # # # #     """Auto-detect and parse both CSV and .tbl formats."""
# # # # # # # # #     text = file_bytes.decode("utf-8", errors="replace")
# # # # # # # # #     if filename.endswith(".tbl") or ("\\fixlen" in text or ("|" in text and "double" in text)):
# # # # # # # # #         return _parse_tbl(text)
# # # # # # # # #     else:
# # # # # # # # #         return _parse_csv(text)


# # # # # # # # # def _parse_tbl(text: str) -> pd.DataFrame:
# # # # # # # # #     lines = text.splitlines()
# # # # # # # # #     col_names = None
# # # # # # # # #     data_lines = []
# # # # # # # # #     for line in lines:
# # # # # # # # #         stripped = line.strip()
# # # # # # # # #         if not stripped or stripped.startswith("\\"):
# # # # # # # # #             continue
# # # # # # # # #         if stripped.startswith("|"):
# # # # # # # # #             if col_names is None:
# # # # # # # # #                 col_names = [c.strip() for c in stripped.split("|") if c.strip()]
# # # # # # # # #             continue
# # # # # # # # #         data_lines.append(stripped.split())

# # # # # # # # #     if not col_names or not data_lines:
# # # # # # # # #         raise ValueError("Could not parse .tbl file.")

# # # # # # # # #     df = pd.DataFrame(data_lines, columns=col_names[:len(data_lines[0])])
# # # # # # # # #     df = df.apply(pd.to_numeric, errors="coerce")
# # # # # # # # #     return _normalize_columns(df)


# # # # # # # # # def _parse_csv(text: str) -> pd.DataFrame:
# # # # # # # # #     delimiter = "\t" if "\t" in text.splitlines()[0] else ","
# # # # # # # # #     df = pd.read_csv(io.StringIO(text), delimiter=delimiter, comment="#", on_bad_lines="skip")
# # # # # # # # #     df.columns = [c.strip().upper() for c in df.columns]
# # # # # # # # #     df = df.apply(pd.to_numeric, errors="coerce")
# # # # # # # # #     return _normalize_columns(df)


# # # # # # # # # def _normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
# # # # # # # # #     df.columns = [c.strip().upper() for c in df.columns]

# # # # # # # # #     # TIME column
# # # # # # # # #     if "TIME" not in df.columns:
# # # # # # # # #         if "CADENCENO" in df.columns:
# # # # # # # # #             df["TIME"] = df["CADENCENO"].astype(float)
# # # # # # # # #         else:
# # # # # # # # #             df["TIME"] = np.arange(len(df), dtype=float)

# # # # # # # # #     # FLUX column
# # # # # # # # #     if "PDCSAP_FLUX" not in df.columns:
# # # # # # # # #         if "FLUX" in df.columns:
# # # # # # # # #             df["PDCSAP_FLUX"] = df["FLUX"].astype(float)
# # # # # # # # #         else:
# # # # # # # # #             numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
# # # # # # # # #             non_time = [c for c in numeric_cols if c != "TIME"]
# # # # # # # # #             if not non_time:
# # # # # # # # #                 raise ValueError("No usable flux column found in file.")
# # # # # # # # #             df["PDCSAP_FLUX"] = df[non_time[0]].astype(float)

# # # # # # # # #     return df[["TIME", "PDCSAP_FLUX"]].dropna()


# # # # # # # # # def normalize_flux(flux: np.ndarray) -> np.ndarray:
# # # # # # # # #     return flux / np.nanmedian(flux)


# # # # # # # # # def denoise_flux(flux: np.ndarray) -> np.ndarray:
# # # # # # # # #     wl = min(101, len(flux) if len(flux) % 2 == 1 else len(flux) - 1)
# # # # # # # # #     wl = max(wl, 5)
# # # # # # # # #     from scipy.signal import savgol_filter
# # # # # # # # #     return savgol_filter(flux, window_length=wl, polyorder=2)

# # # # # # # # # preprocess.py
# # # # # # # # import numpy as np
# # # # # # # # import pandas as pd
# # # # # # # # from scipy.signal import savgol_filter
# # # # # # # # import re

# # # # # # # # def normalize_flux(flux):
# # # # # # # #     return flux / np.nanmedian(flux)

# # # # # # # # def denoise_flux(flux):
# # # # # # # #     return savgol_filter(flux, window_length=101, polyorder=2)

# # # # # # # # def parse_uploaded_file(filepath: str) -> pd.DataFrame:
# # # # # # # #     """
# # # # # # # #     Auto-detects and parses both CSV and .tbl (IPAC) formats.
# # # # # # # #     Returns a DataFrame always with TIME and PDCSAP_FLUX columns.
# # # # # # # #     """
# # # # # # # #     with open(filepath, "r") as f:
# # # # # # # #         raw = f.read()

# # # # # # # #     # ── TBL / IPAC format ──────────────────────────────────────────
# # # # # # # #     if "|" in raw[:500]:
# # # # # # # #         lines = raw.splitlines()
# # # # # # # #         header_line = None
# # # # # # # #         col_names = []
# # # # # # # #         data_lines = []

# # # # # # # #         for i, line in enumerate(lines):
# # # # # # # #             line = line.strip()
# # # # # # # #             if line.startswith("|") and header_line is None:
# # # # # # # #                 # first pipe line = column names
# # # # # # # #                 col_names = [c.strip() for c in line.strip("|").split("|")]
# # # # # # # #                 header_line = i
# # # # # # # #             elif line.startswith("|"):
# # # # # # # #                 continue  # type/unit rows — skip
# # # # # # # #             elif header_line is not None and line and not line.startswith("\\"):
# # # # # # # #                 data_lines.append(re.split(r"\s+", line.strip()))

# # # # # # # #         df = pd.DataFrame(data_lines, columns=col_names[:len(data_lines[0])] if data_lines else col_names)
# # # # # # # #         df = df.apply(pd.to_numeric, errors="coerce")

# # # # # # # #         # Rename to standard columns if needed
# # # # # # # #         col_map = {}
# # # # # # # #         for c in df.columns:
# # # # # # # #             if c.upper() == "TIME":       col_map[c] = "TIME"
# # # # # # # #             if c.upper() == "PDCSAP_FLUX": col_map[c] = "PDCSAP_FLUX"
# # # # # # # #         df.rename(columns=col_map, inplace=True)

# # # # # # # #     # ── CSV format ──────────────────────────────────────────────────
# # # # # # # #     else:
# # # # # # # #         df = pd.read_csv(filepath, sep=None, engine="python", comment="#")
# # # # # # # #         df.columns = [c.strip() for c in df.columns]

# # # # # # # #         # If no TIME column, use cadenceno or row index
# # # # # # # #         if "TIME" not in df.columns:
# # # # # # # #             if "cadenceno" in df.columns:
# # # # # # # #                 df["TIME"] = df["cadenceno"].astype(float)
# # # # # # # #             else:
# # # # # # # #                 df["TIME"] = np.arange(len(df), dtype=float)

# # # # # # # #         # If no PDCSAP_FLUX, use flux column
# # # # # # # #         if "PDCSAP_FLUX" not in df.columns:
# # # # # # # #             if "flux" in df.columns:
# # # # # # # #                 df["PDCSAP_FLUX"] = df["flux"].astype(float)
# # # # # # # #             else:
# # # # # # # #                 raise ValueError("Cannot find flux column in CSV.")

# # # # # # # #     # Final sanity check
# # # # # # # #     if "TIME" not in df.columns or "PDCSAP_FLUX" not in df.columns:
# # # # # # # #         raise ValueError(f"Parsed columns: {list(df.columns)} — missing TIME or PDCSAP_FLUX")

# # # # # # # #     return df[["TIME", "PDCSAP_FLUX"]].copy()

# # # # # # # import numpy as np
# # # # # # # import pandas as pd
# # # # # # # import re
# # # # # # # from scipy.signal import savgol_filter
# # # # # # # from pathlib import Path


# # # # # # # def normalize_flux(flux):
# # # # # # #     return flux / np.nanmedian(flux)


# # # # # # # def denoise_flux(flux):
# # # # # # #     return savgol_filter(flux, window_length=101, polyorder=2)


# # # # # # # def parse_uploaded_file(path: str) -> pd.DataFrame:
# # # # # # #     """
# # # # # # #     Auto-detect and parse both .tbl (IPAC) and .csv light curve formats.
# # # # # # #     Always returns a DataFrame with columns: TIME, PDCSAP_FLUX
# # # # # # #     """
# # # # # # #     suffix = Path(path).suffix.lower()

# # # # # # #     if suffix == ".tbl":
# # # # # # #         return _parse_tbl(path)
# # # # # # #     elif suffix == ".csv":
# # # # # # #         return _parse_csv(path)
# # # # # # #     else:
# # # # # # #         # Try both
# # # # # # #         try:
# # # # # # #             return _parse_tbl(path)
# # # # # # #         except Exception:
# # # # # # #             return _parse_csv(path)


# # # # # # # def _parse_tbl(path: str) -> pd.DataFrame:
# # # # # # #     """
# # # # # # #     Parse IPAC .tbl format:
# # # # # # #     Lines starting with | are headers or type rows — skip them.
# # # # # # #     Data rows start with a number (the SET column).
# # # # # # #     """
# # # # # # #     rows = []
# # # # # # #     with open(path, "r") as f:
# # # # # # #         for line in f:
# # # # # # #             line = line.strip()
# # # # # # #             # Skip blank lines, comments, header/type rows
# # # # # # #             if not line or line.startswith("\\") or line.startswith("|"):
# # # # # # #                 continue
# # # # # # #             parts = line.split()
# # # # # # #             if len(parts) >= 3:
# # # # # # #                 try:
# # # # # # #                     time = float(parts[1])
# # # # # # #                     flux = float(parts[2])
# # # # # # #                     rows.append({"TIME": time, "PDCSAP_FLUX": flux})
# # # # # # #                 except ValueError:
# # # # # # #                     continue

# # # # # # #     if not rows:
# # # # # # #         raise ValueError("Could not parse .tbl file — no valid data rows found.")

# # # # # # #     df = pd.DataFrame(rows).dropna()
# # # # # # #     return df


# # # # # # # def _parse_csv(path: str) -> pd.DataFrame:
# # # # # # #     """
# # # # # # #     Parse CSV format. Handles two cases:
# # # # # # #     1. Has TIME column explicitly
# # # # # # #     2. Has flux + cadenceno columns (use cadenceno as time proxy)
# # # # # # #     """
# # # # # # #     df = pd.read_csv(path, comment="#", on_bad_lines="skip")

# # # # # # #     # Normalize column names
# # # # # # #     df.columns = [c.strip().upper() for c in df.columns]

# # # # # # #     # Case 1: already has TIME and PDCSAP_FLUX
# # # # # # #     if "TIME" in df.columns and "PDCSAP_FLUX" in df.columns:
# # # # # # #         return df[["TIME", "PDCSAP_FLUX"]].dropna()

# # # # # # #     # Case 2: has FLUX and CADENCENO (use cadenceno as time)
# # # # # # #     flux_col = None
# # # # # # #     for candidate in ["FLUX", "PDCSAP_FLUX", "SAP_FLUX"]:
# # # # # # #         if candidate in df.columns:
# # # # # # #             flux_col = candidate
# # # # # # #             break

# # # # # # #     time_col = None
# # # # # # #     for candidate in ["TIME", "CADENCENO", "CADENCE"]:
# # # # # # #         if candidate in df.columns:
# # # # # # #             time_col = candidate
# # # # # # #             break

# # # # # # #     if flux_col is None or time_col is None:
# # # # # # #         raise ValueError(
# # # # # # #             f"CSV must have TIME/CADENCENO and FLUX columns. "
# # # # # # #             f"Found columns: {list(df.columns)}"
# # # # # # #         )

# # # # # # #     result = df[[time_col, flux_col]].copy()
# # # # # # #     result.columns = ["TIME", "PDCSAP_FLUX"]
# # # # # # #     return result.dropna()

# # # # # # import numpy as np
# # # # # # import pandas as pd
# # # # # # from scipy.signal import savgol_filter

# # # # # # def parse_uploaded_file(path: str) -> pd.DataFrame:
# # # # # #     """Auto-detect and parse .csv or .tbl light curve files."""
    
# # # # # #     with open(path, "r") as f:
# # # # # #         raw = f.read()

# # # # # #     # --- .tbl format (IPAC table with | delimiters) ---
# # # # # #     if "|" in raw[:500]:
# # # # # #         lines = raw.splitlines()
# # # # # #         data_lines = [l for l in lines if not l.strip().startswith("|") 
# # # # # #                       and not l.strip().startswith("\\") 
# # # # # #                       and l.strip()]
        
# # # # # #         rows = []
# # # # # #         for line in data_lines:
# # # # # #             parts = line.split()
# # # # # #             if len(parts) >= 3:
# # # # # #                 try:
# # # # # #                     rows.append({
# # # # # #                         "TIME": float(parts[1]),
# # # # # #                         "PDCSAP_FLUX": float(parts[2])
# # # # # #                     })
# # # # # #                 except ValueError:
# # # # # #                     continue
        
# # # # # #         df = pd.DataFrame(rows)

# # # # # #     # --- CSV format ---
# # # # # #     else:
# # # # # #         df = pd.read_csv(path, comment="#", on_bad_lines="skip")
# # # # # #         df.columns = [c.strip().upper() for c in df.columns]

# # # # # #         # Map time column
# # # # # #         if "TIME" not in df.columns:
# # # # # #             for candidate in ["CADENCENO", "CADENCE", "T", "BJD"]:
# # # # # #                 if candidate in df.columns:
# # # # # #                     df = df.rename(columns={candidate: "TIME"})
# # # # # #                     break
# # # # # #             else:
# # # # # #                 df["TIME"] = np.arange(len(df), dtype=float)

# # # # # #         # Map flux column
# # # # # #         if "PDCSAP_FLUX" not in df.columns:
# # # # # #             for candidate in ["FLUX", "SAP_FLUX", "FLUX_CORR"]:
# # # # # #                 if candidate in df.columns:
# # # # # #                     df = df.rename(columns={candidate: "PDCSAP_FLUX"})
# # # # # #                     break

# # # # # #     if "TIME" not in df.columns or "PDCSAP_FLUX" not in df.columns:
# # # # # #         raise ValueError("Could not find TIME and FLUX columns in uploaded file.")

# # # # # #     df = df[["TIME", "PDCSAP_FLUX"]].dropna()
# # # # # #     return df


# # # # # # def normalize_flux(flux):
# # # # # #     return flux / np.nanmedian(flux)

# # # # # # def denoise_flux(flux):
# # # # # #     return savgol_filter(flux, window_length=101, polyorder=2)

# # # # # import numpy as np
# # # # # import pandas as pd
# # # # # import re
# # # # # from scipy.signal import savgol_filter

# # # # # def normalize_flux(flux):
# # # # #     return flux / np.nanmedian(flux)

# # # # # def denoise_flux(flux):
# # # # #     return savgol_filter(flux, window_length=101, polyorder=2)

# # # # # def parse_uploaded_file(path: str) -> pd.DataFrame:
# # # # #     """
# # # # #     Auto-detects and parses:
# # # # #       - .tbl  (IPAC/TESS pipe-delimited table)
# # # # #       - .csv  (flux/cadenceno format OR TIME/PDCSAP_FLUX format)
# # # # #     Returns a DataFrame with columns: TIME, PDCSAP_FLUX
# # # # #     """
# # # # #     suffix = path.lower().split(".")[-1]

# # # # #     if suffix == "tbl":
# # # # #         return _parse_tbl(path)
# # # # #     else:
# # # # #         return _parse_csv(path)


# # # # # def _parse_tbl(path: str) -> pd.DataFrame:
# # # # #     rows = []
# # # # #     with open(path, "r") as f:
# # # # #         lines = f.readlines()

# # # # #     # Find header line (starts with |set| or |TIME| etc.)
# # # # #     header_line = None
# # # # #     data_start = 0
# # # # #     for i, line in enumerate(lines):
# # # # #         if line.strip().startswith("|") and "TIME" in line.upper():
# # # # #             header_line = i
# # # # #             data_start = i + 3  # skip header, type row, and null row
# # # # #             break

# # # # #     if header_line is None:
# # # # #         raise ValueError("Could not find header in .tbl file")

# # # # #     # Parse column names from header
# # # # #     cols = [c.strip() for c in lines[header_line].split("|") if c.strip()]

# # # # #     for line in lines[data_start:]:
# # # # #         line = line.strip()
# # # # #         if not line or line.startswith("|") or line.startswith("\\"):
# # # # #             continue
# # # # #         vals = line.split()
# # # # #         if len(vals) >= len(cols):
# # # # #             rows.append(vals[:len(cols)])

# # # # #     df = pd.DataFrame(rows, columns=cols)

# # # # #     # Find TIME and FLUX columns flexibly
# # # # #     time_col = next((c for c in df.columns if "TIME" in c.upper()), None)
# # # # #     flux_col = next((c for c in df.columns if "PDCSAP" in c.upper() or "FLUX" in c.upper()), None)

# # # # #     if not time_col or not flux_col:
# # # # #         raise ValueError(f"Could not find TIME/FLUX columns. Found: {list(df.columns)}")

# # # # #     df = df[[time_col, flux_col]].rename(columns={time_col: "TIME", flux_col: "PDCSAP_FLUX"})
# # # # #     df["TIME"] = pd.to_numeric(df["TIME"], errors="coerce")
# # # # #     df["PDCSAP_FLUX"] = pd.to_numeric(df["PDCSAP_FLUX"], errors="coerce")
# # # # #     return df.dropna()


# # # # # def _parse_csv(path: str) -> pd.DataFrame:
# # # # #     df = pd.read_csv(path, comment="#", on_bad_lines="skip")
# # # # #     df.columns = [c.strip().lower() for c in df.columns]

# # # # #     # Case 1: already has time and pdcsap_flux
# # # # #     if "time" in df.columns and "pdcsap_flux" in df.columns:
# # # # #         df = df[["time", "pdcsap_flux"]].rename(columns={"time": "TIME", "pdcsap_flux": "PDCSAP_FLUX"})

# # # # #     # Case 2: has flux + cadenceno (use cadenceno as time proxy)
# # # # #     elif "flux" in df.columns and "cadenceno" in df.columns:
# # # # #         df = df[["cadenceno", "flux"]].rename(columns={"cadenceno": "TIME", "flux": "PDCSAP_FLUX"})

# # # # #     # Case 3: has flux only — use row index
# # # # #     elif "flux" in df.columns:
# # # # #         df = df[["flux"]].copy()
# # # # #         df.insert(0, "TIME", np.arange(len(df), dtype=float))
# # # # #         df = df.rename(columns={"flux": "PDCSAP_FLUX"})

# # # # #     else:
# # # # #         raise ValueError(f"Unrecognized CSV columns: {list(df.columns)}")

# # # # #     df["TIME"] = pd.to_numeric(df["TIME"], errors="coerce")
# # # # #     df["PDCSAP_FLUX"] = pd.to_numeric(df["PDCSAP_FLUX"], errors="coerce")
# # # # #     return df.dropna()

# # # # import numpy as np
# # # # import pandas as pd
# # # # from scipy.signal import savgol_filter

# # # # def parse_uploaded_file(path: str) -> pd.DataFrame:
# # # #     """Auto-detect .csv or .tbl and return DataFrame with TIME and PDCSAP_FLUX."""
# # # #     if path.endswith(".tbl"):
# # # #         return _parse_tbl(path)
# # # #     else:
# # # #         return _parse_csv(path)

# # # # def _parse_tbl(path):
# # # #     rows = []
# # # #     with open(path) as f:
# # # #         for line in f:
# # # #             line = line.strip()
# # # #             if not line or line.startswith("\\") or line.startswith("|"):
# # # #                 continue
# # # #             parts = line.split()
# # # #             if len(parts) >= 3:
# # # #                 try:
# # # #                     rows.append({"TIME": float(parts[1]), "PDCSAP_FLUX": float(parts[2])})
# # # #                 except ValueError:
# # # #                     continue
# # # #     df = pd.DataFrame(rows).dropna()
# # # #     return df

# # # # def _parse_csv(path):
# # # #     df = pd.read_csv(path, comment="#", on_bad_lines="skip")
# # # #     df.columns = [c.strip().upper() for c in df.columns]

# # # #     # Map time column
# # # #     time_col = next((c for c in df.columns if "TIME" in c), None)
# # # #     if time_col is None and "CADENCENO" in df.columns:
# # # #         df["TIME"] = df["CADENCENO"].astype(float)
# # # #         time_col = "TIME"

# # # #     # Map flux column
# # # #     flux_col = next((c for c in df.columns if "PDCSAP_FLUX" in c or c == "FLUX"), None)

# # # #     if time_col is None or flux_col is None:
# # # #         raise ValueError(f"Could not find TIME or FLUX columns. Found: {list(df.columns)}")

# # # #     df = df[[time_col, flux_col]].rename(columns={time_col: "TIME", flux_col: "PDCSAP_FLUX"})
# # # #     return df.dropna()

# # # # def normalize_flux(flux):
# # # #     return flux / np.nanmedian(flux)

# # # # def detrend_flux(time, flux):
# # # #     """Remove long-term stellar trend using Savitzky-Golay filter."""
# # # #     window = min(len(flux) - 1 if len(flux) % 2 == 0 else len(flux), 401)
# # # #     if window < 5:
# # # #         return flux
# # # #     if window % 2 == 0:
# # # #         window -= 1
# # # #     trend = savgol_filter(flux, window_length=window, polyorder=2)
# # # #     return flux / trend

# import numpy as np
# import pandas as pd
# from scipy.signal import savgol_filter

# def parse_uploaded_file(path: str) -> pd.DataFrame:
#     """
#     Auto-detect .csv or .tbl and return a DataFrame with TIME and PDCSAP_FLUX columns.
#     """
#     ext = path.lower().split(".")[-1]

#     if ext == "tbl":
#         # IPAC .tbl format — pipe-delimited header, whitespace-separated data
#         rows = []
#         with open(path) as f:
#             for line in f:
#                 line = line.strip()
#                 if not line or line.startswith("\\") or line.startswith("|"):
#                     continue
#                 parts = line.split()
#                 if len(parts) >= 3:
#                     try:
#                         rows.append({"TIME": float(parts[1]), "PDCSAP_FLUX": float(parts[2])})
#                     except ValueError:
#                         continue
#         df = pd.DataFrame(rows)

#     elif ext == "csv":
#         df = pd.read_csv(path, comment="#", on_bad_lines="skip")
#         df.columns = df.columns.str.strip()

#         # Map time column: prefer TIME, fall back to cadenceno, then index
#         if "TIME" in df.columns:
#             df = df.rename(columns={"TIME": "TIME"})
#         elif "cadenceno" in df.columns:
#             df = df.rename(columns={"cadenceno": "TIME"})
#         else:
#             df["TIME"] = np.arange(len(df))

#         # Map flux column
#         if "PDCSAP_FLUX" in df.columns:
#             pass
#         elif "flux" in df.columns:
#             df = df.rename(columns={"flux": "PDCSAP_FLUX"})
#         else:
#             raise ValueError("No flux column found. Expected 'PDCSAP_FLUX' or 'flux'.")

#     else:
#         raise ValueError(f"Unsupported file type: .{ext}")

#     df = df[["TIME", "PDCSAP_FLUX"]].dropna()
#     df = df[np.isfinite(df["TIME"]) & np.isfinite(df["PDCSAP_FLUX"])]
#     return df.reset_index(drop=True)


# def normalize_flux(flux):
#     return flux / np.nanmedian(flux)

# def denoise_flux(flux):
#     return savgol_filter(flux, window_length=101, polyorder=2)

import numpy as np
import pandas as pd
from scipy.signal import savgol_filter

def parse_uploaded_file(path: str) -> pd.DataFrame:
    """
    Auto-detect .csv or .tbl and return a DataFrame with TIME and PDCSAP_FLUX columns.
    """
    ext = path.lower().split(".")[-1]

    if ext == "tbl":
        # IPAC .tbl format — pipe-delimited header, whitespace-separated data
        rows = []
        with open(path) as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("\\") or line.startswith("|"):
                    continue
                parts = line.split()
                if len(parts) >= 3:
                    try:
                        rows.append({"TIME": float(parts[1]), "PDCSAP_FLUX": float(parts[2])})
                    except ValueError:
                        continue
        df = pd.DataFrame(rows)

    elif ext == "csv":
        df = pd.read_csv(path, comment="#", on_bad_lines="skip")
        df.columns = df.columns.str.strip()

        # Map time column: prefer TIME, fall back to cadenceno, then index
        if "TIME" in df.columns:
            df = df.rename(columns={"TIME": "TIME"})
        elif "cadenceno" in df.columns:
            df = df.rename(columns={"cadenceno": "TIME"})
        else:
            df["TIME"] = np.arange(len(df))

        # Map flux column
        if "PDCSAP_FLUX" in df.columns:
            pass
        elif "flux" in df.columns:
            df = df.rename(columns={"flux": "PDCSAP_FLUX"})
        else:
            raise ValueError("No flux column found. Expected 'PDCSAP_FLUX' or 'flux'.")

    else:
        raise ValueError(f"Unsupported file type: .{ext}")

    df = df[["TIME", "PDCSAP_FLUX"]].dropna()
    df = df[np.isfinite(df["TIME"]) & np.isfinite(df["PDCSAP_FLUX"])]
    return df.reset_index(drop=True)


def normalize_flux(flux):
    return flux / np.nanmedian(flux)

def denoise_flux(flux):
    return savgol_filter(flux, window_length=101, polyorder=2)

def detrend_flux(time, flux):
    """Remove long-term stellar trend using Savitzky-Golay filter."""
    window = min(len(flux) - 1 if len(flux) % 2 == 0 else len(flux), 401)
    if window < 5:
        return flux
    if window % 2 == 0:
        window -= 1
    trend = savgol_filter(flux, window_length=window, polyorder=2)
    return flux / trend
# """
# hybrid_pipeline.py
# ==================
# ExoSynergy Hybrid Detection Framework

# Fuses results from two independent detection arms:
#   1. Direct Imaging  — SNR-mapped coronagraphic FITS analysis
#   2. Transit Photometry — BLS + LSTM light curve analysis

# Outputs a unified candidate list where every entry is tagged by source
# (direct / transit / both) and carries a combined confidence score.

# Combined Confidence Score Formula
# -----------------------------------
# Each arm independently produces a normalised signal strength [0, 1]:

#   direct_score  = clip(peak_snr / SNR_SCALE, 0, 1)
#                   where SNR_SCALE = 15.0  (SNR ≥ 15 → score = 1.0)

#   transit_score = clip(bls_power / BLS_SCALE, 0, 1) * lstm_prob
#                   where BLS_SCALE = 500.0

# Fusion:
#   If detected by BOTH arms:
#       confidence = 1 - (1 - direct_score) * (1 - transit_score)   [probabilistic OR]
#       source     = "both"

#   If detected by direct only:
#       confidence = direct_score * DIRECT_WEIGHT
#       source     = "direct"

#   If detected by transit only:
#       confidence = transit_score * TRANSIT_WEIGHT
#       source     = "transit"

# Cross-validation flag:
#   cross_validated = True  iff  source == "both"
#                               AND direct_score  >= DIRECT_MIN
#                               AND transit_score >= TRANSIT_MIN
# """

# import numpy as np
# from typing import Optional

# # ── Tunable fusion constants ──────────────────────────────────────────────────
# SNR_SCALE      = 15.0   # direct imaging SNR at which score saturates to 1.0
# BLS_SCALE      = 500.0  # BLS power at which transit score saturates to 1.0
# DIRECT_WEIGHT  = 0.85   # solo direct-imaging confidence ceiling
# TRANSIT_WEIGHT = 0.80   # solo transit confidence ceiling
# DIRECT_MIN     = 0.30   # minimum direct score for cross-validation badge
# TRANSIT_MIN    = 0.25   # minimum transit score for cross-validation badge


# # ── Score helpers ─────────────────────────────────────────────────────────────

# def _direct_score(peak_snr: float) -> float:
#     """Normalise peak SNR from direct imaging arm to [0, 1]."""
#     return float(np.clip(peak_snr / SNR_SCALE, 0.0, 1.0))


# def _transit_score(bls_power: float, lstm_prob: float) -> float:
#     """Normalise BLS power × LSTM probability to [0, 1]."""
#     bls_norm = float(np.clip(bls_power / BLS_SCALE, 0.0, 1.0))
#     return float(np.clip(bls_norm * lstm_prob, 0.0, 1.0))


# def _fuse(ds: float, ts: float, source: str) -> float:
#     """Probabilistic OR fusion for 'both'; weighted cap for single-arm."""
#     if source == "both":
#         return float(1.0 - (1.0 - ds) * (1.0 - ts))
#     if source == "direct":
#         return float(ds * DIRECT_WEIGHT)
#     return float(ts * TRANSIT_WEIGHT)


# def _confidence_label(score: float) -> str:
#     if score >= 0.75:
#         return "HIGH"
#     if score >= 0.45:
#         return "MEDIUM"
#     return "LOW"


# # ── Main fusion function ──────────────────────────────────────────────────────

# def run_hybrid_pipeline(
#     direct_result: Optional[dict],
#     transit_result: Optional[dict],
# ) -> dict:
#     """
#     Parameters
#     ----------
#     direct_result : dict | None
#         Output from run_pipeline() — contains 'detections' list where each
#         frame dict has 'snr' (peak SNR) and 'detections' (candidate list).
#         Pass None if direct imaging was not run.

#     transit_result : dict | None
#         Output from run_transit_pipeline() — contains 'planets' list, each
#         with 'bls_power', 'period', 'depth', 'duration', 't0', and the top-
#         level 'lstm_score'.  Pass None if transit was not run.

#     Returns
#     -------
#     dict with keys:
#         candidates      : list of unified candidate dicts (see below)
#         summary         : high-level stats dict
#         direct_ran      : bool
#         transit_ran     : bool
#         cross_validated : list of candidate IDs confirmed by both arms
#     """

#     direct_ran  = direct_result  is not None
#     transit_ran = transit_result is not None

#     candidates = []
#     cand_id    = 0

#     # ── 1. Ingest direct imaging detections ──────────────────────────────────
#     direct_candidates = []
#     if direct_ran:
#         for frame in (direct_result.get("detections") or []):
#             frame_snr  = float(frame.get("snr", 0))
#             frame_name = frame.get("frame", "unknown")
#             for det in (frame.get("detections") or []):
#                 ds = _direct_score(float(det.get("snr", frame_snr)))
#                 direct_candidates.append({
#                     "id":           cand_id,
#                     "source":       "direct",
#                     "frame":        frame_name,
#                     "x":            det.get("x"),
#                     "y":            det.get("y"),
#                     "snr":          float(det.get("snr", frame_snr)),
#                     "sep_pix":      det.get("sep_pix"),
#                     "sep_mas":      det.get("sep_mas"),
#                     "direct_score": ds,
#                     "transit_score": None,
#                     "confidence":   _fuse(ds, 0, "direct"),
#                     "confidence_label": _confidence_label(_fuse(ds, 0, "direct")),
#                     "cross_validated": False,
#                     # transit fields — filled during fusion
#                     "period":       None,
#                     "depth":        None,
#                     "duration":     None,
#                     "bls_power":    None,
#                     "lstm_prob":    None,
#                 })
#                 cand_id += 1

#     # ── 2. Ingest transit detections ─────────────────────────────────────────
#     transit_candidates = []
#     if transit_ran:
#         lstm_prob = float(transit_result.get("lstm_score", 0))
#         for planet in (transit_result.get("planets") or []):
#             bls  = float(planet.get("bls_power", 0))
#             ts   = _transit_score(bls, lstm_prob)
#             transit_candidates.append({
#                 "id":            cand_id,
#                 "source":        "transit",
#                 "frame":         None,
#                 "x":             None,
#                 "y":             None,
#                 "snr":           None,
#                 "sep_pix":       None,
#                 "sep_mas":       None,
#                 "direct_score":  None,
#                 "transit_score": ts,
#                 "confidence":    _fuse(0, ts, "transit"),
#                 "confidence_label": _confidence_label(_fuse(0, ts, "transit")),
#                 "cross_validated": False,
#                 "period":        planet.get("period"),
#                 "depth":         planet.get("depth"),
#                 "duration":      planet.get("duration"),
#                 "bls_power":     bls,
#                 "lstm_prob":     lstm_prob,
#             })
#             cand_id += 1

#     # ── 3. Cross-validate: both arms ran ─────────────────────────────────────
#     # Strategy: if BOTH arms have detections we create a "both" entry fusing
#     # the best direct candidate with every transit candidate.
#     # (For direct imaging we pick the highest-SNR candidate per frame.)

#     both_candidates = []
#     if direct_ran and transit_ran and direct_candidates and transit_candidates:
#         # Best direct candidate (highest SNR)
#         best_direct = max(direct_candidates, key=lambda c: c["snr"] or 0)

#         for tc in transit_candidates:
#             ds = best_direct["direct_score"]
#             ts = tc["transit_score"]
#             conf = _fuse(ds, ts, "both")
#             cross_val = (ds >= DIRECT_MIN and ts >= TRANSIT_MIN)

#             both_candidates.append({
#                 "id":            cand_id,
#                 "source":        "both",
#                 "frame":         best_direct["frame"],
#                 "x":             best_direct["x"],
#                 "y":             best_direct["y"],
#                 "snr":           best_direct["snr"],
#                 "sep_pix":       best_direct["sep_pix"],
#                 "sep_mas":       best_direct["sep_mas"],
#                 "direct_score":  ds,
#                 "transit_score": ts,
#                 "confidence":    conf,
#                 "confidence_label": _confidence_label(conf),
#                 "cross_validated": cross_val,
#                 "period":        tc["period"],
#                 "depth":         tc["depth"],
#                 "duration":      tc["duration"],
#                 "bls_power":     tc["bls_power"],
#                 "lstm_prob":     tc["lstm_prob"],
#             })
#             cand_id += 1

#     # ── 4. Assemble final list ────────────────────────────────────────────────
#     # Priority: both > direct > transit, then sort by confidence desc
#     candidates = sorted(
#         both_candidates + direct_candidates + transit_candidates,
#         key=lambda c: c["confidence"],
#         reverse=True,
#     )

#     # ── 5. Summary ────────────────────────────────────────────────────────────
#     cross_validated_ids = [c["id"] for c in candidates if c["cross_validated"]]

#     n_both    = sum(1 for c in candidates if c["source"] == "both")
#     n_direct  = sum(1 for c in candidates if c["source"] == "direct")
#     n_transit = sum(1 for c in candidates if c["source"] == "transit")

#     top_conf  = candidates[0]["confidence"] if candidates else 0.0

#     # Overall system confidence: best fused score, or best single-arm score
#     system_confidence = top_conf

#     summary = {
#         "total_candidates":    len(candidates),
#         "direct_only":         n_direct,
#         "transit_only":        n_transit,
#         "both_arms":           n_both,
#         "cross_validated":     len(cross_validated_ids),
#         "system_confidence":   round(system_confidence, 4),
#         "confidence_label":    _confidence_label(system_confidence),
#         "direct_ran":          direct_ran,
#         "transit_ran":         transit_ran,
#         # Pass-through top-level stats for UI
#         "peak_direct_snr":     max((c["snr"] for c in candidates if c["snr"] is not None), default=None),
#         "top_bls_power":       max((c["bls_power"] for c in candidates if c["bls_power"] is not None), default=None),
#         "top_lstm_prob":       max((c["lstm_prob"] for c in candidates if c["lstm_prob"] is not None), default=None),
#         "top_period":          next((c["period"] for c in candidates if c["period"] is not None), None),
#     }

#     return {
#         "candidates":       candidates,
#         "summary":          summary,
#         "direct_ran":       direct_ran,
#         "transit_ran":      transit_ran,
#         "cross_validated_ids": cross_validated_ids,
#     }

"""
hybrid_pipeline.py
==================
ExoSynergy Hybrid Detection Framework — Full AI Pipeline

AI layers:
  1. LSTM   — transit probability from trained LSTMTransitDetector
  2. RF     — planet candidate score from trained RandomForest (transit_model.pkl)
  3. Claude — natural language interpretation report via Anthropic API

Place this file at: backend/app/hybrid_pipeline.py
"""

import os, json
import numpy as np
from typing import Optional

# ── Constants ─────────────────────────────────────────────────────────────────
SNR_SCALE      = 15.0
BLS_SCALE      = 500.0
DIRECT_WEIGHT  = 0.85
TRANSIT_WEIGHT = 0.80
DIRECT_MIN     = 0.30
TRANSIT_MIN    = 0.25
RF_MODEL_PATH  = os.path.join(os.path.dirname(__file__), "transit", "transit_model.pkl")
RF_FEATURES    = ["pl_orbper", "pl_trandurh", "pl_trandep", "pl_rade", "st_rad"]

_rf_model = None
_rf_feats = None


# ── RF loader ─────────────────────────────────────────────────────────────────

def _load_rf():
    global _rf_model, _rf_feats
    if _rf_model is not None:
        return _rf_model, _rf_feats
    if not os.path.exists(RF_MODEL_PATH):
        return None, None
    try:
        import cloudpickle
        with open(RF_MODEL_PATH, "rb") as f:
            _rf_model = cloudpickle.load(f)
    except Exception:
        try:
            import joblib
            _rf_model = joblib.load(RF_MODEL_PATH)
        except Exception:
            return None, None
    _rf_feats = (list(_rf_model.feature_names_in_)
                 if hasattr(_rf_model, "feature_names_in_") else RF_FEATURES)
    return _rf_model, _rf_feats


# ── Scoring helpers ───────────────────────────────────────────────────────────

def _direct_score(snr):
    return float(np.clip(snr / SNR_SCALE, 0, 1))

def _transit_score(bls_power, lstm_prob):
    return float(np.clip((bls_power / BLS_SCALE) * lstm_prob, 0, 1))

def _rf_score(period, depth, duration):
    rf, feats = _load_rf()
    if rf is None:
        return None
    try:
        import pandas as pd
        row = {
            "pl_orbper":   period   or 5.0,
            "pl_trandurh": (duration * 24) if duration else 2.5,
            "pl_trandep":  depth    or 0.005,
            "pl_rade":     2.5,
            "st_rad":      1.0,
        }
        X = pd.DataFrame([[row.get(f, 0.0) for f in feats]], columns=feats)
        p = rf.predict_proba(X)[0]
        return float(p[1]) if len(p) > 1 else float(p[0])
    except Exception:
        return None

def _fuse(ds, ts, source):
    if source == "both":    return float(1 - (1-ds)*(1-ts))
    if source == "direct":  return float(ds * DIRECT_WEIGHT)
    return float(ts * TRANSIT_WEIGHT)

def _final(fused, rf):
    return float(0.5*fused + 0.5*rf) if rf is not None else fused

def _label(s):
    return "HIGH" if s >= 0.75 else "MEDIUM" if s >= 0.45 else "LOW"


# ── Claude API report ─────────────────────────────────────────────────────────

def generate_ai_report(candidates, summary):
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return {
            "verdict": "Set ANTHROPIC_API_KEY environment variable to enable AI report.",
            "interpretation": "",
            "candidates_summary": [],
            "reliability_note": "",
            "recommended_followup": "",
            "ai_available": False,
        }

    lines = []
    for i, c in enumerate(candidates[:5]):
        l = (f"#{i+1} source={c['source']} conf={c['confidence']:.2f}({c['confidence_label']})"
             f" xval={c['cross_validated']}")
        if c.get("snr"):        l += f" SNR={c['snr']:.1f}"
        if c.get("period"):     l += f" period={c['period']:.3f}d"
        if c.get("depth"):      l += f" depth={c['depth']:.5f}"
        if c.get("lstm_prob"):  l += f" LSTM={c['lstm_prob']:.2f}"
        if c.get("rf_score") is not None: l += f" RF={c['rf_score']:.2f}"
        lines.append(l)

    prompt = f"""You are an expert exoplanet scientist reviewing results from the ExoSynergy hybrid AI detection framework.

SUMMARY:
- Candidates: {summary['total_candidates']} total, {summary['cross_validated']} cross-validated
- Direct imaging: {summary['direct_ran']} | Transit photometry: {summary['transit_ran']}
- System confidence: {summary['system_confidence']:.2f} ({summary['confidence_label']})
- Peak SNR: {summary.get('peak_direct_snr','N/A')} | BLS power: {summary.get('top_bls_power','N/A')}
- LSTM prob: {summary.get('top_lstm_prob','N/A')} | Best period: {summary.get('top_period','N/A')} days
- AI layers: LSTM={summary['ai_layers_active']['lstm']} RF={summary['ai_layers_active']['rf']} Claude=True

TOP CANDIDATES:
{chr(10).join(lines) if lines else 'None detected'}

Respond ONLY with this JSON, no markdown:
{{
  "verdict": "one sentence overall verdict",
  "interpretation": "2-3 sentence scientific interpretation mentioning which AI methods contributed",
  "candidates_summary": [{{"rank": 1, "assessment": "one sentence", "planet_type_hint": "e.g. hot Jupiter / super-Earth / false positive / uncertain"}}],
  "reliability_note": "one sentence on result reliability",
  "recommended_followup": "one sentence on confirmatory followup observations"
}}"""

    try:
        import urllib.request
        body = json.dumps({
            "model":      "claude-sonnet-4-20250514",
            "max_tokens": 1000,
            "messages":   [{"role": "user", "content": prompt}],
        }).encode()
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages", data=body,
            headers={"Content-Type": "application/json",
                     "x-api-key": api_key,
                     "anthropic-version": "2023-06-01"},
            method="POST")
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read())
        text = data["content"][0]["text"].strip()
        if text.startswith("```"):
            text = text.split("\n",1)[1].rsplit("```",1)[0].strip()
        parsed = json.loads(text)
        parsed["ai_available"] = True
        return parsed
    except Exception as e:
        return {"verdict": f"Report error: {e}", "interpretation": "",
                "candidates_summary": [], "reliability_note": "",
                "recommended_followup": "", "ai_available": False}


# ── Main ──────────────────────────────────────────────────────────────────────

def run_hybrid_pipeline(direct_result, transit_result, generate_report=True):
    direct_ran  = direct_result  is not None
    transit_ran = transit_result is not None
    cand_id     = 0

    # Direct imaging candidates
    direct_cands = []
    if direct_ran:
        for frame in (direct_result.get("detections") or []):
            for det in (frame.get("detections") or []):
                ds = _direct_score(float(det.get("snr", 0)))
                direct_cands.append({
                    "id": cand_id, "source": "direct",
                    "frame": frame.get("frame"), "x": det.get("x"), "y": det.get("y"),
                    "snr": float(det.get("snr", 0)), "sep_pix": det.get("sep_pix"),
                    "sep_mas": det.get("sep_mas"), "direct_score": ds,
                    "transit_score": None, "rf_score": None,
                    "period": None, "depth": None, "duration": None,
                    "bls_power": None, "lstm_prob": None, "cross_validated": False,
                })
                cand_id += 1

    # Transit candidates — LSTM + RF scoring
    transit_cands = []
    if transit_ran:
        lstm_prob = float(transit_result.get("lstm_score", 0))
        for planet in (transit_result.get("planets") or []):
            bls = float(planet.get("bls_power", 0))
            ts  = _transit_score(bls, lstm_prob)
            rfs = _rf_score(planet.get("period"), planet.get("depth"), planet.get("duration"))
            transit_cands.append({
                "id": cand_id, "source": "transit",
                "frame": None, "x": None, "y": None, "snr": None,
                "sep_pix": None, "sep_mas": None, "direct_score": None,
                "transit_score": ts, "rf_score": rfs,
                "period": planet.get("period"), "depth": planet.get("depth"),
                "duration": planet.get("duration"), "bls_power": bls,
                "lstm_prob": lstm_prob, "cross_validated": False,
            })
            cand_id += 1

    # Both-arm cross-validated candidates
    both_cands = []
    if direct_ran and transit_ran and direct_cands and transit_cands:
        best = max(direct_cands, key=lambda c: c["snr"] or 0)
        for tc in transit_cands:
            ds, ts, rfs = best["direct_score"], tc["transit_score"], tc["rf_score"]
            conf = _final(_fuse(ds, ts, "both"), rfs)
            both_cands.append({
                "id": cand_id, "source": "both",
                "frame": best["frame"], "x": best["x"], "y": best["y"],
                "snr": best["snr"], "sep_pix": best["sep_pix"], "sep_mas": best["sep_mas"],
                "direct_score": ds, "transit_score": ts, "rf_score": rfs,
                "confidence": conf, "confidence_label": _label(conf),
                "cross_validated": (ds >= DIRECT_MIN and ts >= TRANSIT_MIN),
                "period": tc["period"], "depth": tc["depth"], "duration": tc["duration"],
                "bls_power": tc["bls_power"], "lstm_prob": tc["lstm_prob"],
            })
            cand_id += 1

    # Apply confidence to single-arm candidates
    for c in direct_cands:
        f = _fuse(c["direct_score"], 0, "direct")
        c["confidence"] = _final(f, None); c["confidence_label"] = _label(c["confidence"])
    for c in transit_cands:
        f = _fuse(0, c["transit_score"], "transit")
        c["confidence"] = _final(f, c["rf_score"]); c["confidence_label"] = _label(c["confidence"])

    all_cands = sorted(both_cands + direct_cands + transit_cands,
                       key=lambda c: c["confidence"], reverse=True)

    top_conf = all_cands[0]["confidence"] if all_cands else 0.0
    rf_ok    = _load_rf()[0] is not None

    summary = {
        "total_candidates": len(all_cands),
        "direct_only":      sum(1 for c in all_cands if c["source"]=="direct"),
        "transit_only":     sum(1 for c in all_cands if c["source"]=="transit"),
        "both_arms":        sum(1 for c in all_cands if c["source"]=="both"),
        "cross_validated":  sum(1 for c in all_cands if c["cross_validated"]),
        "system_confidence": round(top_conf, 4),
        "confidence_label": _label(top_conf),
        "direct_ran": direct_ran, "transit_ran": transit_ran,
        "rf_available": rf_ok, "lstm_available": transit_ran,
        "peak_direct_snr": max((c["snr"]   for c in all_cands if c["snr"]  is not None), default=None),
        "top_bls_power":   max((c["bls_power"] for c in all_cands if c["bls_power"] is not None), default=None),
        "top_lstm_prob":   max((c["lstm_prob"] for c in all_cands if c["lstm_prob"] is not None), default=None),
        "top_period":      next((c["period"] for c in all_cands if c["period"] is not None), None),
        "ai_layers_active": {
            "lstm":   transit_ran,
            "rf":     rf_ok and transit_ran,
            "claude": bool(os.environ.get("ANTHROPIC_API_KEY")),
        },
    }

    ai_report = generate_ai_report(all_cands, summary) if generate_report else None

    return {
        "candidates":          all_cands,
        "summary":             summary,
        "ai_report":           ai_report,
        "cross_validated_ids": [c["id"] for c in all_cands if c["cross_validated"]],
        "direct_ran":          direct_ran,
        "transit_ran":         transit_ran,
    }
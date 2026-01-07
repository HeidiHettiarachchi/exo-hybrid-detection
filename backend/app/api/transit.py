# from fastapi import APIRouter, UploadFile, File
# import pandas as pd

# from app.transit.pipeline import run_transit_pipeline

# router = APIRouter(tags=["Transit Detection"])

# # @router.post("/detect")
# # async def detect_transit(file: UploadFile = File(...)):
# #     """
# #     Load TESS .tbl light curve and run transit detection
# #     """

# #     df = pd.read_csv(
# #         file.file,
# #         sep=r"\s+",
# #         comment="|",
# #         skiprows=2,
# #         header=None,
# #         engine="python"
# #     )

# #     # Assign expected columns
# #     df.columns = ["SET", "TIME", "PDCSAP_FLUX"]

# #     # Keep only required columns
# #     df = df[["TIME", "PDCSAP_FLUX"]]

# #     # Drop NaNs early
# #     df = df.dropna()

# #     return run_transit_pipeline(df)

# @router.post("/detect")
# async def detect_transit(file: UploadFile = File(...)):
#     df = pd.read_csv(
#         file.file,
#         sep=r"\s+",
#         skiprows=3,
#         names=["SET", "TIME", "PDCSAP_FLUX"],
#         engine="python"
#     ).dropna()

#     time = df["TIME"].values
#     flux = df["PDCSAP_FLUX"].values

#     return {
#         "light_curve": [
#             {"time": float(t), "flux": float(f)}
#             for t, f in zip(time, flux)
#         ]
#     }

# app/api/transit.py
from fastapi import APIRouter, UploadFile, File
import pandas as pd
import numpy as np
import io
import joblib
from app.transit.pipeline import run_transit_pipeline  # your BLS pipeline

router = APIRouter(tags=["Transit Detection"])
import cloudpickle
from pathlib import Path

# Load the model at startup
import os


from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

import joblib

router = APIRouter(tags=["Transit Detection"])

MODEL_PATH = "app/transit/transit_model.pkl"
model = None
FEATURE_COLS = None


# ---------------------------
# Endpoint 1: existing light curve pipeline
# ---------------------------
@router.post("/detect")
async def detect_transit(file: UploadFile = File(...)):
    df = pd.read_csv(
        file.file,
        sep=r"\s+",
        skiprows=3,
        names=["SET", "TIME", "PDCSAP_FLUX"],
        engine="python"
    ).dropna()

    time = df["TIME"].values
    flux = df["PDCSAP_FLUX"].values

    # Return raw light curve for plotting
    return run_transit_pipeline(df)

# --------------------------------------------------
# 2️⃣ Train model FROM UPLOADED CSV
# --------------------------------------------------
@router.post("/generate-model")
async def generate_model(file: UploadFile = File(...)):
    global model, FEATURE_COLS

    contents = await file.read()

    # Read CSV safely
    df = pd.read_csv(io.BytesIO(contents), comment="#", on_bad_lines="skip")

    # Clean HTML junk
    for col in df.select_dtypes(include="object").columns:
        df[col] = df[col].astype(str).str.replace(r"<.*?>", "", regex=True)

    # Detect label column (PC / FP)
    label_col = None
    for col in df.columns:
        if df[col].astype(str).str.contains("PC|FP").any():
            label_col = col
            break

    if label_col is None:
        return {"error": "No column containing PC / FP labels found"}

    # Map labels
    df["label"] = df[label_col].map({"PC": 1, "FP": 0})
    df = df.dropna(subset=["label"])
    df["label"] = df["label"].astype(int)

    # Parse ± values
    def parse_plusminus(val):
        if pd.isna(val):
            return np.nan
        val = str(val)
        if "±" in val:
            return float(val.split("±")[0])
        if "&plusmn;" in val:
            return float(val.split("&plusmn;")[0])
        try:
            return float(val)
        except:
            return np.nan

    for col in df.columns:
        if col != "label":
            df[col] = df[col].apply(parse_plusminus)

    df = df.fillna(df.mean())

    # Feature selection
    possible_features = [
        "pl_orbper",
        "pl_trandurh",
        "pl_trandep",
        "pl_rade",
        "st_rad",
    ]

    FEATURE_COLS = [c for c in possible_features if c in df.columns]
    if not FEATURE_COLS:
        FEATURE_COLS = df.select_dtypes(include=np.number).columns[:5].tolist()

    X = df[FEATURE_COLS]
    y = df["label"]

    # Train model
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)

    os.makedirs("app/transit", exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    return {
        "message": "Model trained from uploaded file",
        "accuracy": accuracy_score(y_test, y_pred),
        "features_used": FEATURE_COLS,
        "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
        "classification_report": classification_report(y_test, y_pred),
    }


# --------------------------------------------------
# 3️⃣ Predict FROM UPLOADED CSV
# --------------------------------------------------
@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    global model, FEATURE_COLS

    if model is None:
        if not os.path.exists(MODEL_PATH):
            return {"error": "Model not trained yet"}
        model = joblib.load(MODEL_PATH)

    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents), comment="#", on_bad_lines="skip")

    # Clean HTML
    for col in df.select_dtypes(include="object").columns:
        df[col] = df[col].astype(str).str.replace(r"<.*?>", "", regex=True)

    # Parse ± values
    def parse_plusminus(val):
        if pd.isna(val):
            return np.nan
        val = str(val)
        if "±" in val:
            return float(val.split("±")[0])
        if "&plusmn;" in val:
            return float(val.split("&plusmn;")[0])
        try:
            return float(val)
        except:
            return np.nan

    for col in df.columns:
        df[col] = df[col].apply(parse_plusminus)

    df = df.fillna(df.mean())

    if not FEATURE_COLS:
        return {"error": "Feature list missing. Train model first."}

    X = df[FEATURE_COLS]
    preds = model.predict(X)

    return {
        "total_samples": len(preds),
        "planet_candidates": int(np.sum(preds)),
        "false_positives": int(len(preds) - np.sum(preds)),
        # "predictions": preds.tolist(),
    }
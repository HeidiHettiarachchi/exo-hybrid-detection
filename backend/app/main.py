# # import os
# # from pathlib import Path
# # from uuid import uuid4
# # from fastapi import FastAPI, UploadFile, File
# # from fastapi.middleware.cors import CORSMiddleware
# # from fastapi.responses import FileResponse
# # from fastapi.staticfiles import StaticFiles

# # from app.api.transit import router as transit_router
# # from .pipeline import run_pipeline
# # from .jobs import JOBS

# # # ----------------------------
# # # Paths
# # # ----------------------------
# # BASE_DIR = Path(__file__).resolve().parent.parent
# # DATA_DIR = BASE_DIR / "data"
# # UPLOAD_DIR = DATA_DIR / "uploads"
# # OUTPUT_DIR = DATA_DIR / "outputs"

# # UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
# # OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# # # ----------------------------
# # # FastAPI App
# # # ----------------------------
# # app = FastAPI(title="Exoplanet Detection API")

# # # CORS
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_methods=["*"],
# #     allow_headers=["*"]
# # )

# # # Include transit router
# # app.include_router(transit_router, prefix="/api/transit")

# # # Static files
# # app.mount("/outputs", StaticFiles(directory=str(OUTPUT_DIR)), name="outputs")

# # # ----------------------------
# # # Direct Imaging Upload
# # # ----------------------------
# # @app.post("/upload")
# # async def upload(files: list[UploadFile] = File(...)):
# #     job_id = str(uuid4())
# #     JOBS[job_id] = {"done": 0, "total": len(files)}

# #     paths = []
# #     for f in files:
# #         path = os.path.join(UPLOAD_DIR, f.filename)
# #         with open(path, "wb") as out:
# #             out.write(await f.read())
# #         paths.append(path)

# #     detections, output_file, output_type = run_pipeline(paths, job_id=job_id, JOBS=JOBS)

# #     for d in detections:
# #         d["snr_image"] = f"/outputs/{d['snr_png']}"
# #         d["lr_image"] = f"/outputs/{d['lr_png']}"

# #     return {
# #         "job_id": job_id,
# #         "detections": detections,
# #         "output_type": output_type,
# #         "preview_url": f"/outputs/exoplanet.{output_type}",
# #         "download_url": f"/outputs/exoplanet.{output_type}"
# #     }

# # #job status
# # @app.get("/status/{job_id}")
# # def status(job_id: str):
# #     return JOBS.get(job_id, {})


# # #download
# # @app.get("/download/{file_type}")
# # def download(file_type: str):
# #     path = os.path.join(OUTPUT_DIR, f"exoplanet.{file_type}")
# #     if not os.path.exists(path):
# #         return {"error": "File not found"}
# #     return FileResponse(path, media_type="application/octet-stream", filename=f"exoplanet.{file_type}")

# # # ---------------------------------
# # # Show RAW Image (first upload only)
# # # ---------------------------------
# # @app.post("/show-raw")
# # async def show_raw(file: UploadFile = File(...)):
# #     path = os.path.join(UPLOAD_DIR, file.filename)

# #     with open(path, "wb") as out:
# #         out.write(await file.read())

# #     from .pipeline import generate_raw_preview

# #     raw_png = generate_raw_preview(path)

# #     return {
# #         "raw_image": f"/outputs/{os.path.basename(raw_png)}"
# #     }

# import os
# from pathlib import Path
# from uuid import uuid4
# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse
# from fastapi.staticfiles import StaticFiles

# from app.api.transit import router as transit_router
# from .pipeline import run_pipeline, generate_raw_preview
# from .jobs import JOBS

# # ----------------------------
# # Paths
# # ----------------------------
# BASE_DIR   = Path(__file__).resolve().parent.parent
# DATA_DIR   = BASE_DIR / "data"
# UPLOAD_DIR = DATA_DIR / "uploads"
# OUTPUT_DIR = DATA_DIR / "outputs"

# UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
# OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# # ----------------------------
# # FastAPI App
# # ----------------------------
# app = FastAPI(title="Exoplanet Detection API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(transit_router, prefix="/api/transit")
# app.mount("/outputs", StaticFiles(directory=str(OUTPUT_DIR)), name="outputs")


# # ----------------------------
# # Direct Imaging Upload
# # ----------------------------
# @app.post("/upload")
# async def upload(files: list[UploadFile] = File(...)):
#     job_id = str(uuid4())
#     JOBS[job_id] = {"done": 0, "total": len(files)}

#     paths = []
#     for f in files:
#         path = os.path.join(UPLOAD_DIR, f.filename)
#         with open(path, "wb") as out:
#             out.write(await f.read())
#         paths.append(path)

#     detections, output_file, output_type = run_pipeline(paths, job_id=job_id, JOBS=JOBS)

#     for d in detections:
#         d["snr_image"] = f"/outputs/{d['snr_png']}"
#         d["lr_image"]  = f"/outputs/{d['lr_png']}"

#     return {
#         "job_id":       job_id,
#         "detections":   detections,
#         "output_type":  output_type,
#         "preview_url":  f"/outputs/exoplanet.{output_type}",
#         "download_url": f"/outputs/exoplanet.{output_type}",
#     }


# # ----------------------------
# # Job status
# # ----------------------------
# @app.get("/status/{job_id}")
# def status(job_id: str):
#     return JOBS.get(job_id, {})


# # ----------------------------
# # Download
# # ----------------------------
# @app.get("/download/{file_type}")
# def download(file_type: str):
#     path = os.path.join(OUTPUT_DIR, f"exoplanet.{file_type}")
#     if not os.path.exists(path):
#         return {"error": "File not found"}
#     return FileResponse(
#         path,
#         media_type="application/octet-stream",
#         filename=f"exoplanet.{file_type}",
#     )


# # ----------------------------
# # Show RAW image preview
# # ----------------------------
# @app.post("/show-raw")
# async def show_raw(file: UploadFile = File(...)):
#     path = os.path.join(UPLOAD_DIR, file.filename)
#     with open(path, "wb") as out:
#         out.write(await file.read())

#     raw_png = generate_raw_preview(path)
#     return {"raw_image": f"/outputs/{os.path.basename(raw_png)}"}

import os
from pathlib import Path
from uuid import uuid4
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import json

from app.api.transit import router as transit_router
from .pipeline import run_pipeline, generate_raw_preview
from .jobs import JOBS

BASE_DIR   = Path(__file__).resolve().parent.parent
DATA_DIR   = BASE_DIR / "data"
UPLOAD_DIR = DATA_DIR / "uploads"
OUTPUT_DIR = DATA_DIR / "outputs"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="Exoplanet Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transit_router, prefix="/api/transit")
app.mount("/outputs", StaticFiles(directory=str(OUTPUT_DIR)), name="outputs")


@app.post("/upload")
async def upload(
    files: list[UploadFile] = File(...),
    params: str = Form(default="{}")
):
    job_id = str(uuid4())
    parsed_params = json.loads(params)

    paths = []
    for f in files:
        path = os.path.join(UPLOAD_DIR, f.filename)
        with open(path, "wb") as out:
            out.write(await f.read())
        paths.append(path)

    outputs, anim = run_pipeline(paths, parsed_params, job_id=job_id, JOBS=JOBS)

    for d in outputs:
        d["raw_image"]      = f"/outputs/{d['raw_png']}"
        d["enhanced_image"] = f"/outputs/{d['enhanced_png']}"
        d["snr_image"]      = f"/outputs/{d['snr_png']}"
        d["lr_image"]       = f"/outputs/{d['lr_png']}"

    return {
        "job_id":      job_id,
        "detections":  outputs,
        "output_type": anim,
        "animations": {
            "raw":      f"/outputs/exoplanet_raw.{anim}",
            "enhanced": f"/outputs/exoplanet_enhanced.{anim}",
            "snr":      f"/outputs/exoplanet_snr.{anim}",
            "lr":       f"/outputs/exoplanet_lr.{anim}",
        },
        "zips": {
            "raw":      "/outputs/exoplanet_raw.zip",
            "enhanced": "/outputs/exoplanet_enhanced.zip",
            "snr":      "/outputs/exoplanet_snr.zip",
            "lr":       "/outputs/exoplanet_lr.zip",
        }
    }


@app.get("/status/{job_id}")
def status(job_id: str):
    return JOBS.get(job_id, {})


@app.get("/download/{filename}")
def download(filename: str):
    path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(path):
        return {"error": "File not found"}
    return FileResponse(path, media_type="application/octet-stream", filename=filename)


@app.post("/show-raw")
async def show_raw(file: UploadFile = File(...)):
    path = os.path.join(UPLOAD_DIR, file.filename)
    with open(path, "wb") as out:
        out.write(await file.read())
    raw_png = generate_raw_preview(path)
    return {"raw_image": f"/outputs/{os.path.basename(raw_png)}"}

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.api import transit

# app = FastAPI(title="Exoplanet Detection API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000", "http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(transit.router, prefix="/api/transit")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.transit import router as transit_router

app = FastAPI(title="Exoplanet Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transit_router, prefix="/api/transit")
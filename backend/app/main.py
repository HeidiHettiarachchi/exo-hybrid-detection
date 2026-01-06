import os
import shutil
from uuid import uuid4

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from pathlib import Path

from .pipeline import run_pipeline

UPLOAD_DIR = "backend/data/uploads"
# OUTPUT_DIR = "backend/data/outputs"
OUTPUT_DIR = Path("backend/data/outputs")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

from .jobs import JOBS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/outputs", StaticFiles(directory=OUTPUT_DIR), name="outputs")


@app.post("/upload")
async def upload(files: list[UploadFile] = File(...)):
    job_id = str(uuid4())
    JOBS[job_id] = {"done": 0, "total": 1}

    paths = []
    for f in files:
        path = os.path.join(UPLOAD_DIR, f.filename)
        with open(path, "wb") as out:
            out.write(await f.read())
        paths.append(path)

    # 👇 IMPORTANT: total known BEFORE processing
    JOBS[job_id]["total"] = len(paths)
    JOBS[job_id]["done"] = 0

    detections, output_file, output_type = run_pipeline(
        paths, job_id=job_id, JOBS=JOBS
    )

    for d in detections:
        d["snr_image"] = f"/outputs/{d['snr_png']}"
        d["lr_image"] = f"/outputs/{d['lr_png']}"

    return {
        "job_id": job_id,
        "detections": detections,
        "output_type": output_type,
        "preview_url": f"/outputs/exoplanet.{output_type}",
        "download_url": f"/outputs/exoplanet.{output_type}"
    }




@app.get("/status/{job_id}")
def status(job_id: str):
    return JOBS.get(job_id, {})



# @app.get("/download/{file_type}")
# def download(file_type: str):
#     path = f"{OUTPUT_DIR}/exoplanet.{file_type}"
#     return FileResponse(
#         path,
#         media_type="application/octet-stream",
#         filename=f"exoplanet.{file_type}"
#     )

@app.get("/download/{file_type}")
def download(file_type: str):
    path = os.path.join(OUTPUT_DIR, f"exoplanet.{file_type}")
    if not os.path.exists(path):
        return {"error": "File not found"}
    return FileResponse(
        path,
        media_type="application/octet-stream",
        filename=f"exoplanet.{file_type}"
    )


# @app.get("/download/{filename}")
# def download_file(filename: str):
#     file_path = OUTPUT_DIR / filename
#     if not file_path.exists():
#         return {"error": "File not found"}
#     return FileResponse(file_path, media_type="application/octet-stream", filename=filename)


app.mount(
    "/outputs",
    StaticFiles(directory="backend/data/outputs"),
    name="outputs"
)

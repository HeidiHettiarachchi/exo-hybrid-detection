import { useState, useRef, useEffect } from "react";
import { api } from "./api";
import { Link } from "react-router-dom";


// const BACKEND_URL = "http://localhost:8000";

export default function HomeView({ results, setResults }) {
  const [files, setFiles] = useState([]);
  // const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [viewMode, setViewMode] = useState("snr");
  const BACKEND_URL = "http://localhost:8000";


  // ---- Upload Handler ----
  // const handleUpload = async (e) => {
  //   const data = new FormData();
  //   [...e.target.files].forEach((f) => data.append("files", f));
  //   setFiles([...e.target.files]);

  //   try {
  //     const res = await api.post("/upload", data);
  //     setResults(res.data);
  //     setJobId(res.data.job_id);
  //     setProgress(0);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Upload or processing failed!");
  //   }
  // };

  const handleUpload = async (e) => {
  const fileList = e.target.files;
  if (!fileList.length) return;

  const data = new FormData();
  for (let f of fileList) data.append("files", f); // matches backend list[UploadFile]

  try {
    const res = await api.post("/upload", data);
    setResults(res.data);
    setJobId(res.data.job_id);
    setProgress(0);
  } catch (err) {
    console.error(err.response ?? err);
    alert("Upload or processing failed! Check console.");
  }
};


  // ---- Progress Polling ----
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/status/${jobId}`);
        if (res.data.total) {
          setProgress(Math.round((res.data.done / res.data.total) * 100));
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  // ---- Canvas Viewer ----
  function ImageViewer({ src }) {
    const canvasRef = useRef();
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

   useEffect(() => {
  if (!src) return;
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Fit image into canvas
    const scaleX = canvasRef.current.width / img.width;
    const scaleY = canvasRef.current.height / img.height;
    const fitScale = Math.min(scaleX, scaleY) * scale; // include zoom
    ctx.setTransform(fitScale, 0, 0, fitScale, offset.x, offset.y);
    ctx.drawImage(img, 0, 0);
  };
}, [src, scale, offset]);


    return (
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: "1px solid black" }}
        onWheel={(e) => setScale((s) => Math.max(0.5, s - e.deltaY * 0.001))}
        onMouseMove={(e) =>
          e.buttons === 1 &&
          setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))
        }
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
<h1 style={{ fontSize: "20px" }}>
  Exoplanet Detection Direct Imaging
</h1>
<br />
      {/* ---- Upload Input ---- */}
      <input type="file" multiple onChange={handleUpload} />

      {/* ---- Progress Bar ---- */}
      {progress > 0 && progress < 100 && (
        <div>
          <progress value={progress} max="100" />
          <p>{progress}% processed</p>
        </div>
      )}

      {results && (
  <div style={{ marginTop: 20 }}>
    <h2>Processed Results</h2>

    {/* ---- GIF / MP4 Preview ---- */}
{results.output_type === "gif" && results.preview_url && (
  <div style={{ marginBottom: 20 }}>
    <h3>GIF Preview</h3>
    <img
      src={`${BACKEND_URL}${results.preview_url}`}
      width={400}
      alt="Exoplanet GIF"
    />
  </div>
)}


    {/* ---- Download link ---- */}
    <br />
    <a
      href={`http://localhost:8000/download/${results.output_type}`}
      download={`exoplanet.${results.output_type}`}
    >
      Download {results.output_type.toUpperCase()}
    </a>




    {/* ---- Toggle Buttons SNR / LR ---- */}
    <div style={{ marginTop: 10 }}>
      <button onClick={() => setViewMode("snr")}>SNR Map</button>
      <button onClick={() => setViewMode("lr")}>LR Map</button>
    </div>

    {/* ---- Image Grid ---- */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      {results.detections.map((d, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 5 }}>
          <p>{d.frame}</p>
          <p>SNR: {d.snr.toFixed(2)}</p>
          <ImageViewer
            src={`http://localhost:8000${viewMode === "snr" ? d.snr_image : d.lr_image}`}
          />
        </div>
      ))}
    </div>
  </div>
)}


     
    </div>
  );
}

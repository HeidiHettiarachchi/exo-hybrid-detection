// // // // // import { useState, useRef, useEffect } from "react";
// // // // // import { api } from "./api";
// // // // // import { Link } from "react-router-dom";


// // // // // // const BACKEND_URL = "import.meta.env.VITE_API_URL";

// // // // // export default function HomeView({ results, setResults }) {
// // // // //   const [files, setFiles] = useState([]);
// // // // //   // const [results, setResults] = useState(null);
// // // // //   const [progress, setProgress] = useState(0);
// // // // //   const [jobId, setJobId] = useState(null);
// // // // //   const [viewMode, setViewMode] = useState("snr");
// // // // //   const BACKEND_URL = "import.meta.env.VITE_API_URL";
// // // // //   const [rawImage, setRawImage] = useState(null);


// // // // //   // ---- Upload Handler ----
// // // // //   // const handleUpload = async (e) => {
// // // // //   //   const data = new FormData();
// // // // //   //   [...e.target.files].forEach((f) => data.append("files", f));
// // // // //   //   setFiles([...e.target.files]);

// // // // //   //   try {
// // // // //   //     const res = await api.post("/upload", data);
// // // // //   //     setResults(res.data);
// // // // //   //     setJobId(res.data.job_id);
// // // // //   //     setProgress(0);
// // // // //   //   } catch (err) {
// // // // //   //     console.error(err);
// // // // //   //     alert("Upload or processing failed!");
// // // // //   //   }
// // // // //   // };

// // // // //   // const handleUpload = async (e) => {
// // // // //   // const fileList = e.target.files;
// // // // //   // if (!fileList.length) return;

// // // // //   const handleUpload = async (e) => {
// // // // //   const fileList = e.target.files;
// // // // //   if (!fileList.length) return;

// // // // //   setFiles([...fileList]);   // <--- ADD THIS

// // // // //   const data = new FormData();
// // // // //   for (let f of fileList) data.append("files", f);

// // // // //   try {
// // // // //     const res = await api.post("/upload", data);
// // // // //     setResults(res.data);
// // // // //     setJobId(res.data.job_id);
// // // // //     setProgress(0);
// // // // //   } catch (err) {
// // // // //     console.error(err.response ?? err);
// // // // //     alert("Upload or processing failed! Check console.");
// // // // //   }
// // // // // };

// // // // //   const handleShowRaw = async () => {
// // // // //   if (!files.length) {
// // // // //     alert("Please select at least one FITS file first.");
// // // // //     return;
// // // // //   }

// // // // //   const data = new FormData();
// // // // //   data.append("file", files[0]); // only FIRST file

// // // // //   try {
// // // // //     const res = await api.post("/show-raw", data);
// // // // //     setRawImage(`${BACKEND_URL}${res.data.raw_image}`);
// // // // //   } catch (err) {
// // // // //     console.error(err.response ?? err);
// // // // //     alert("Raw image loading failed.");
// // // // //   }
// // // // // };

// // // // //   const data = new FormData();
// // // // //   for (let f of fileList) data.append("files", f); // matches backend list[UploadFile]

// // // // //   try {
// // // // //     const res = await api.post("/upload", data);
// // // // //     setResults(res.data);
// // // // //     setJobId(res.data.job_id);
// // // // //     setProgress(0);
// // // // //   } catch (err) {
// // // // //     console.error(err.response ?? err);
// // // // //     alert("Upload or processing failed! Check console.");
// // // // //   }
// // // // // };


// // // // //   // ---- Progress Polling ----
// // // // //   useEffect(() => {
// // // // //     if (!jobId) return;

// // // // //     const interval = setInterval(async () => {
// // // // //       try {
// // // // //         const res = await api.get(`/status/${jobId}`);
// // // // //         if (res.data.total) {
// // // // //           setProgress(Math.round((res.data.done / res.data.total) * 100));
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error(err);
// // // // //       }
// // // // //     }, 2000);

// // // // //     return () => clearInterval(interval);
// // // // //   }, [jobId]);

// // // // //   // ---- Canvas Viewer ----
// // // // //   function ImageViewer({ src }) {
// // // // //     const canvasRef = useRef();
// // // // //     const [scale, setScale] = useState(1);
// // // // //     const [offset, setOffset] = useState({ x: 0, y: 0 });

// // // // //    useEffect(() => {
// // // // //   if (!src) return;
// // // // //   const img = new Image();
// // // // //   img.src = src;
// // // // //   img.onload = () => {
// // // // //     const ctx = canvasRef.current.getContext("2d");
// // // // //     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

// // // // //     // Fit image into canvas
// // // // //     const scaleX = canvasRef.current.width / img.width;
// // // // //     const scaleY = canvasRef.current.height / img.height;
// // // // //     const fitScale = Math.min(scaleX, scaleY) * scale; // include zoom
// // // // //     ctx.setTransform(fitScale, 0, 0, fitScale, offset.x, offset.y);
// // // // //     ctx.drawImage(img, 0, 0);
// // // // //   };
// // // // // }, [src, scale, offset]);


// // // // //     return (
// // // // //       <canvas
// // // // //         ref={canvasRef}
// // // // //         width={400}
// // // // //         height={400}
// // // // //         style={{ border: "1px solid black" }}
// // // // //         onWheel={(e) => setScale((s) => Math.max(0.5, s - e.deltaY * 0.001))}
// // // // //         onMouseMove={(e) =>
// // // // //           e.buttons === 1 &&
// // // // //           setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))
// // // // //         }
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div style={{ padding: 20 }}>
// // // // // <h1 style={{ fontSize: "20px" }}>
// // // // //   Exoplanet Detection Direct Imaging
// // // // // </h1>
// // // // // <br />
// // // // //       {/* ---- Upload Input ---- */}
// // // // //       <input type="file" multiple onChange={handleUpload} />

// // // // //       {/* ---- Progress Bar ---- */}
// // // // //       {progress > 0 && progress < 100 && (
// // // // //         <div>
// // // // //           <progress value={progress} max="100" />
// // // // //           <p>{progress}% processed</p>
// // // // //         </div>
// // // // //       )}

// // // // //       {results && (
// // // // //   <div style={{ marginTop: 20 }}>
// // // // //     <h2>Processed Results</h2>

// // // // //     {/* ---- GIF / MP4 Preview ---- */}
// // // // // {results.output_type === "gif" && results.preview_url && (
// // // // //   <div style={{ marginBottom: 20 }}>
// // // // //     <h3>GIF Preview</h3>
// // // // //     <img
// // // // //       src={`${BACKEND_URL}${results.preview_url}`}
// // // // //       width={400}
// // // // //       alt="Exoplanet GIF"
// // // // //     />
// // // // //   </div>
// // // // // )}


// // // // //     {/* ---- Download link ---- */}
// // // // //     <br />
// // // // //     <a
// // // // //       href={`import.meta.env.VITE_API_URL/download/${results.output_type}`}
// // // // //       download={`exoplanet.${results.output_type}`}
// // // // //     >
// // // // //       Download {results.output_type.toUpperCase()}
// // // // //     </a>




// // // // //     {/* ---- Toggle Buttons SNR / LR ---- */}
// // // // //     <div style={{ marginTop: 10 }}>
// // // // //       <button onClick={() => setViewMode("snr")}>SNR Map</button>
// // // // //       <button onClick={() => setViewMode("lr")}>LR Map</button>
// // // // //       <input type="file" multiple onChange={handleUpload} />

// // // // // <br /><br />

// // // // // <button onClick={handleShowRaw}>
// // // // //   Show Raw Image
// // // // // </button>
      
// // // // //     </div>

// // // // //     {/* ---- Image Grid ---- */}
// // // // //     <div
// // // // //       style={{
// // // // //         display: "flex",
// // // // //         flexWrap: "wrap",
// // // // //         gap: "10px",
// // // // //         marginTop: "10px",
// // // // //       }}
// // // // //     >
// // // // //       {results.detections.map((d, i) => (
// // // // //         <div key={i} style={{ border: "1px solid #ccc", padding: 5 }}>
// // // // //           <p>{d.frame}</p>
// // // // //           <p>SNR: {d.snr.toFixed(2)}</p>
// // // // //           <ImageViewer
// // // // //             src={`import.meta.env.VITE_API_URL${viewMode === "snr" ? d.snr_image : d.lr_image}`}
// // // // //           />
// // // // //         </div>
// // // // //       ))}
// // // // //     </div>
// // // // //   </div>
// // // // // )}


     
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // {rawImage && (
// // // // //   <div style={{ marginTop: 20 }}>
// // // // //     <h2>Raw FITS Preview</h2>
// // // // //     <ImageViewer src={rawImage} />
// // // // //   </div>
// // // // // )}
// // // // import { useState, useRef, useEffect } from "react";
// // // // import { api } from "./api";

// // // // export default function HomeView({ results, setResults }) {
// // // //   const [files, setFiles] = useState([]);
// // // //   const [progress, setProgress] = useState(0);
// // // //   const [jobId, setJobId] = useState(null);
// // // //   const [viewMode, setViewMode] = useState("snr");
// // // //   const [rawImage, setRawImage] = useState(null);

// // // //   const BACKEND_URL = "import.meta.env.VITE_API_URL";

// // // //   // ---------------- Upload Handler ----------------
// // // //   const handleUpload = async (e) => {
// // // //     const fileList = e.target.files;
// // // //     if (!fileList.length) return;

// // // //     setFiles([...fileList]);

// // // //     const data = new FormData();
// // // //     for (let f of fileList) data.append("files", f);

// // // //     try {
// // // //       const res = await api.post("/upload", data);
// // // //       setResults(res.data);
// // // //       setJobId(res.data.job_id);
// // // //       setProgress(0);
// // // //     } catch (err) {
// // // //       console.error(err.response ?? err);
// // // //       alert("Upload or processing failed!");
// // // //     }
// // // //   };

// // // //   // ---------------- RAW Preview ----------------
// // // //   const handleShowRaw = async () => {
// // // //     if (!files.length) {
// // // //       alert("Select at least one FITS file first.");
// // // //       return;
// // // //     }

// // // //     const data = new FormData();
// // // //     data.append("file", files[0]);

// // // //     try {
// // // //       const res = await api.post("/show-raw", data);
// // // //       setRawImage(`${BACKEND_URL}${res.data.raw_image}`);
// // // //     } catch (err) {
// // // //       console.error(err.response ?? err);
// // // //       alert("Raw preview failed.");
// // // //     }
// // // //   };

// // // //   // ---------------- Progress Polling ----------------
// // // //   useEffect(() => {
// // // //     if (!jobId) return;

// // // //     const interval = setInterval(async () => {
// // // //       try {
// // // //         const res = await api.get(`/status/${jobId}`);
// // // //         if (res.data.total) {
// // // //           setProgress(
// // // //             Math.round((res.data.done / res.data.total) * 100)
// // // //           );
// // // //         }
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //       }
// // // //     }, 2000);

// // // //     return () => clearInterval(interval);
// // // //   }, [jobId]);

// // // //   // ---------------- Canvas Viewer ----------------
// // // //   function ImageViewer({ src }) {
// // // //     const canvasRef = useRef();
// // // //     const [scale, setScale] = useState(1);
// // // //     const [offset, setOffset] = useState({ x: 0, y: 0 });

// // // //     useEffect(() => {
// // // //       if (!src) return;
// // // //       const img = new Image();
// // // //       img.src = src;
// // // //       img.onload = () => {
// // // //         const ctx = canvasRef.current.getContext("2d");
// // // //         ctx.clearRect(0, 0, 400, 400);

// // // //         const scaleX = 400 / img.width;
// // // //         const scaleY = 400 / img.height;
// // // //         const fitScale = Math.min(scaleX, scaleY) * scale;

// // // //         ctx.setTransform(fitScale, 0, 0, fitScale, offset.x, offset.y);
// // // //         ctx.drawImage(img, 0, 0);
// // // //       };
// // // //     }, [src, scale, offset]);

// // // //     return (
// // // //       <canvas
// // // //         ref={canvasRef}
// // // //         width={400}
// // // //         height={400}
// // // //         style={{ border: "1px solid black" }}
// // // //         onWheel={(e) =>
// // // //           setScale((s) => Math.max(0.5, s - e.deltaY * 0.001))
// // // //         }
// // // //         onMouseMove={(e) =>
// // // //           e.buttons === 1 &&
// // // //           setOffset((o) => ({
// // // //             x: o.x + e.movementX,
// // // //             y: o.y + e.movementY,
// // // //           }))
// // // //         }
// // // //       />
// // // //     );
// // // //   }

// // // //   // ---------------- UI ----------------
// // // //   return (
// // // //     <div style={{ padding: 20 }}>
// // // //       <h1>Exoplanet Detection Direct Imaging</h1>

// // // //       <input type="file" multiple onChange={handleUpload} />

// // // //       <br /><br />

// // // //       <button onClick={handleShowRaw}>
// // // //         Show Raw Image
// // // //       </button>

// // // //       {/* RAW Preview */}
// // // //       {rawImage && (
// // // //         <div style={{ marginTop: 20 }}>
// // // //           <h2>Raw FITS Preview</h2>
// // // //           <ImageViewer src={rawImage} />
// // // //         </div>
// // // //       )}

// // // //       {/* Progress */}
// // // //       {progress > 0 && progress < 100 && (
// // // //         <div>
// // // //           <progress value={progress} max="100" />
// // // //           <p>{progress}% processed</p>
// // // //         </div>
// // // //       )}

// // // //       {/* Processed Results */}
// // // //       {results && (
// // // //         <div style={{ marginTop: 20 }}>
// // // //           <h2>Processed Results</h2>

// // // //           {results.output_type === "gif" && (
// // // //             <img
// // // //               src={`${BACKEND_URL}${results.preview_url}`}
// // // //               width={400}
// // // //               alt="GIF"
// // // //             />
// // // //           )}

// // // //           <br />

// // // //           <a
// // // //             href={`${BACKEND_URL}/download/${results.output_type}`}
// // // //             download
// // // //           >
// // // //             Download {results.output_type.toUpperCase()}
// // // //           </a>

// // // //           <div style={{ marginTop: 10 }}>
// // // //             <button onClick={() => setViewMode("snr")}>
// // // //               SNR Map
// // // //             </button>
// // // //             <button onClick={() => setViewMode("lr")}>
// // // //               LR Map
// // // //             </button>
// // // //           </div>

// // // //           <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
// // // //             {results.detections.map((d, i) => (
// // // //               <div key={i}>
// // // //                 <p>{d.frame}</p>
// // // //                 <p>SNR: {d.snr.toFixed(2)}</p>
// // // //                 <ImageViewer
// // // //                   src={`${BACKEND_URL}${viewMode === "snr"
// // // //                     ? d.snr_image
// // // //                     : d.lr_image}`}
// // // //                 />
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState, useRef, useEffect } from "react";
// // // import { api } from "./api";

// // // const BACKEND_URL = "import.meta.env.VITE_API_URL";

// // // const DEFAULT_PARAMS = {
// // //   bkg_filter_size: 101,
// // //   psf_sigma: 2.0,
// // //   psf_size: 9,
// // //   snr_threshold: 5.0,
// // //   thresh_fraction: 0.5,
// // //   min_sep_pix: 55,
// // //   circle_radius: 30,
// // //   circle_color: "lime",
// // //   snr_cmap: "inferno",
// // //   animation_fps: 3,
// // //   edge_crop: 25,
// // // };

// // // const CIRCLE_COLORS = ["lime", "red", "white", "orange", "yellow", "cyan", "magenta"];
// // // const SNR_CMAPS     = ["inferno", "viridis", "plasma", "magma", "coolwarm", "RdYlBu_r", "seismic", "gray"];
// // // const VIEW_MODES    = ["raw", "enhanced", "snr", "lr"];
// // // const VIEW_LABELS   = { raw: "Raw Image", enhanced: "Enhanced Image", snr: "SNR Map", lr: "LR Map" };

// // // // ── Canvas image viewer with zoom + pan ──────────────────────────────────────
// // // function ImageViewer({ src }) {
// // //   const canvasRef = useRef();
// // //   const [scale, setScale]   = useState(1);
// // //   const [offset, setOffset] = useState({ x: 0, y: 0 });

// // //   useEffect(() => {
// // //     if (!src || !canvasRef.current) return;
// // //     const img = new Image();
// // //     img.src = src;
// // //     img.onload = () => {
// // //       const ctx = canvasRef.current.getContext("2d");
// // //       ctx.clearRect(0, 0, 400, 400);
// // //       const fit = Math.min(400 / img.width, 400 / img.height) * scale;
// // //       ctx.setTransform(fit, 0, 0, fit, offset.x, offset.y);
// // //       ctx.drawImage(img, 0, 0);
// // //     };
// // //   }, [src, scale, offset]);

// // //   return (
// // //     <canvas
// // //       ref={canvasRef}
// // //       width={400}
// // //       height={400}
// // //       style={{ border: "1px solid #444", background: "#000", cursor: "grab" }}
// // //       onWheel={(e) => setScale((s) => Math.max(0.3, Math.min(8, s - e.deltaY * 0.001)))}
// // //       onMouseMove={(e) =>
// // //         e.buttons === 1 &&
// // //         setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))
// // //       }
// // //     />
// // //   );
// // // }

// // // // ── Main component ────────────────────────────────────────────────────────────
// // // export default function HomeView({ results, setResults }) {
// // //   const [files, setFiles]     = useState([]);
// // //   const [progress, setProgress] = useState(0);
// // //   const [jobId, setJobId]     = useState(null);
// // //   const [viewMode, setViewMode] = useState("snr");
// // //   const [params, setParams]   = useState(DEFAULT_PARAMS);
// // //   const [loading, setLoading] = useState(false);

// // //   // ── param change helper ───────────────────────────────────────────────────
// // //   const setParam = (key, val) =>
// // //     setParams((p) => ({ ...p, [key]: val }));

// // //   // ── upload ────────────────────────────────────────────────────────────────
// // //   const handleUpload = async (e) => {
// // //     const fileList = e.target.files;
// // //     if (!fileList.length) return;
// // //     setFiles([...fileList]);
// // //     setLoading(true);
// // //     setProgress(0);

// // //     const data = new FormData();
// // //     for (let f of fileList) data.append("files", f);
// // //     data.append("params", JSON.stringify(params));

// // //     try {
// // //       const res = await api.post("/upload", data);
// // //       setResults(res.data);
// // //       setJobId(res.data.job_id);
// // //     } catch (err) {
// // //       console.error(err.response ?? err);
// // //       alert("Upload or processing failed!");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ── progress polling ──────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!jobId) return;
// // //     const interval = setInterval(async () => {
// // //       try {
// // //         const res = await api.get(`/status/${jobId}`);
// // //         if (res.data.total)
// // //           setProgress(Math.round((res.data.done / res.data.total) * 100));
// // //       } catch {}
// // //     }, 2000);
// // //     return () => clearInterval(interval);
// // //   }, [jobId]);

// // //   // ── helpers ───────────────────────────────────────────────────────────────
// // //   const imageKey = { raw: "raw_image", enhanced: "enhanced_image", snr: "snr_image", lr: "lr_image" };

// // //   const downloadFile = (url, name) => {
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = name;
// // //     a.click();
// // //   };

// // //   // ── styles ────────────────────────────────────────────────────────────────
// // //   const s = {
// // //     page:    { padding: 24, fontFamily: "sans-serif", background: "#111", color: "#eee", minHeight: "100vh" },
// // //     card:    { background: "#1e1e1e", borderRadius: 8, padding: 16, marginBottom: 16 },
// // //     label:   { fontSize: 12, color: "#aaa", marginBottom: 4, display: "block" },
// // //     input:   { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
// // //                 padding: "4px 8px", width: "100%", boxSizing: "border-box" },
// // //     select:  { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
// // //                 padding: "4px 8px", width: "100%" },
// // //     btn:     { padding: "6px 14px", borderRadius: 4, border: "none", cursor: "pointer",
// // //                 fontWeight: "bold", fontSize: 13 },
// // //     tabActive:   { background: "#4a9eff", color: "#fff" },
// // //     tabInactive: { background: "#333", color: "#bbb" },
// // //     dlBtn:   { background: "#2a6e2a", color: "#fff", fontSize: 11, padding: "3px 8px",
// // //                 borderRadius: 3, border: "none", cursor: "pointer", marginLeft: 4 },
// // //     grid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 16 },
// // //     imgCard: { background: "#1a1a1a", borderRadius: 6, padding: 12 },
// // //     row:     { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
// // //   };

// // //   // ── parameter panel ───────────────────────────────────────────────────────
// // //   const ParamRow = ({ label, paramKey, type = "number", step = 1, min = 0 }) => (
// // //     <div style={{ minWidth: 150 }}>
// // //       <label style={s.label}>{label}</label>
// // //       <input
// // //         type={type}
// // //         step={step}
// // //         min={min}
// // //         value={params[paramKey]}
// // //         style={s.input}
// // //         onChange={(e) =>
// // //           setParam(paramKey, type === "number" ? parseFloat(e.target.value) : e.target.value)
// // //         }
// // //       />
// // //     </div>
// // //   );

// // //   // ── render ────────────────────────────────────────────────────────────────
// // //   return (
// // //     <div style={s.page}>
// // //       <h1 style={{ marginBottom: 20, fontSize: 22 }}>🔭 Exoplanet Direct Imaging Detection</h1>

// // //       {/* ── PARAMETERS ── */}
// // //       <div style={s.card}>
// // //         <h3 style={{ marginTop: 0, marginBottom: 12 }}>Parameters</h3>
// // //         <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// // //           <ParamRow label="BKG Filter Size"  paramKey="bkg_filter_size" />
// // //           <ParamRow label="PSF Sigma"        paramKey="psf_sigma"       step={0.1} />
// // //           <ParamRow label="PSF Size"         paramKey="psf_size"        />
// // //           <ParamRow label="SNR Threshold"    paramKey="snr_threshold"   step={0.5} />
// // //           <ParamRow label="Thresh Fraction" paramKey="thresh_fraction" step={0.05} min={0} />
// // //           <ParamRow label="Min Sep (px)"     paramKey="min_sep_pix"     />
// // //           <ParamRow label="Circle Radius"    paramKey="circle_radius"   />
// // //           <ParamRow label="Edge Crop"        paramKey="edge_crop"       />
// // //           <ParamRow label="Animation FPS"    paramKey="animation_fps"   />

// // //           {/* Circle colour dropdown */}
// // //           <div style={{ minWidth: 150 }}>
// // //             <label style={s.label}>Circle Colour</label>
// // //             <select style={s.select} value={params.circle_color}
// // //               onChange={(e) => setParam("circle_color", e.target.value)}>
// // //               {CIRCLE_COLORS.map((c) => (
// // //                 <option key={c} value={c}>{c}</option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           {/* SNR cmap dropdown */}
// // //           <div style={{ minWidth: 150 }}>
// // //             <label style={s.label}>SNR Colormap</label>
// // //             <select style={s.select} value={params.snr_cmap}
// // //               onChange={(e) => setParam("snr_cmap", e.target.value)}>
// // //               {SNR_CMAPS.map((c) => (
// // //                 <option key={c} value={c}>{c}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         </div>

// // //         <div style={{ marginTop: 12 }}>
// // //           <button style={{ ...s.btn, background: "#555", color: "#eee" }}
// // //             onClick={() => setParams(DEFAULT_PARAMS)}>
// // //             Reset to Defaults
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* ── UPLOAD ── */}
// // //       <div style={s.card}>
// // //         <h3 style={{ marginTop: 0, marginBottom: 8 }}>Upload FITS Files</h3>
// // //         <input type="file" multiple accept=".fits,.fit,.fts"
// // //           onChange={handleUpload} style={{ color: "#eee" }} />
// // //         {loading && <p style={{ color: "#4a9eff" }}>⏳ Processing...</p>}
// // //         {progress > 0 && progress < 100 && (
// // //           <div style={{ marginTop: 8 }}>
// // //             <progress value={progress} max="100" style={{ width: "100%" }} />
// // //             <p style={{ fontSize: 12, color: "#aaa" }}>{progress}% done</p>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* ── RESULTS ── */}
// // //       {results && (
// // //         <div>
// // //           {/* ── VIEW MODE TABS ── */}
// // //           <div style={{ ...s.row, marginBottom: 16 }}>
// // //             {VIEW_MODES.map((mode) => (
// // //               <button key={mode}
// // //                 style={{ ...s.btn, ...(viewMode === mode ? s.tabActive : s.tabInactive) }}
// // //                 onClick={() => setViewMode(mode)}>
// // //                 {VIEW_LABELS[mode]}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* ── PER-MODE DOWNLOAD BUTTONS ── */}
// // //           <div style={{ ...s.card, ...s.row }}>
// // //             <span style={{ fontWeight: "bold", marginRight: 8 }}>
// // //               {VIEW_LABELS[viewMode]} Downloads:
// // //             </span>
// // //             <button style={{ ...s.btn, background: "#2a5c8a", color: "#fff" }}
// // //               onClick={() => downloadFile(
// // //                 `${BACKEND_URL}/download/exoplanet_${viewMode}.${results.output_type}`,
// // //                 `exoplanet_${viewMode}.${results.output_type}`
// // //               )}>
// // //               ⬇ {results.output_type.toUpperCase()} ({VIEW_LABELS[viewMode]})
// // //             </button>
// // //             <button style={{ ...s.btn, background: "#2a6e2a", color: "#fff" }}
// // //               onClick={() => downloadFile(
// // //                 `${BACKEND_URL}/download/exoplanet_${viewMode}.zip`,
// // //                 `exoplanet_${viewMode}.zip`
// // //               )}>
// // //               ⬇ ZIP ({VIEW_LABELS[viewMode]})
// // //             </button>
// // //           </div>

// // //           {/* ── ANIMATION PREVIEW ── */}
// // //           {results.output_type === "gif" && results.animations?.[viewMode] && (
// // //             <div style={{ ...s.card, textAlign: "center" }}>
// // //               <p style={{ marginBottom: 8, fontWeight: "bold" }}>
// // //                 {VIEW_LABELS[viewMode]} — Animation Preview
// // //               </p>
// // //               <img
// // //                 src={`${BACKEND_URL}${results.animations[viewMode]}?t=${Date.now()}`}
// // //                 style={{ maxWidth: "100%", borderRadius: 4 }}
// // //                 alt={`${viewMode} animation`}
// // //               />
// // //             </div>
// // //           )}

// // //           {/* ── IMAGE GRID ── */}
// // //           <div style={s.grid}>
// // //             {results.detections.map((d, i) => {
// // //               const imgSrc = `${BACKEND_URL}${d[imageKey[viewMode]]}`;
// // //               return (
// // //                 <div key={i} style={s.imgCard}>
// // //                   <div style={{ ...s.row, marginBottom: 6 }}>
// // //                     <span style={{ fontWeight: "bold", flex: 1, fontSize: 13 }}>
// // //                       {d.frame}
// // //                     </span>
// // //                     {/* Per-image download button */}
// // //                     <button style={s.dlBtn}
// // //                       onClick={() => downloadFile(
// // //                         `${BACKEND_URL}/download/${d[imageKey[viewMode].replace("_image", "_png")]}`,
// // //                         d[imageKey[viewMode].replace("_image", "_png")]
// // //                       )}>
// // //                       ⬇ PNG
// // //                     </button>
// // //                   </div>

// // //                   <p style={{ fontSize: 12, color: "#aaa", margin: "4px 0" }}>
// // //                     Peak SNR: <b style={{ color: "#fff" }}>{d.snr.toFixed(2)}</b>
// // //                     {" · "}Candidates: <b style={{ color: "#4aff7f" }}>{d.detections.length}</b>
// // //                   </p>

// // //                   {d.detections.length > 0 && (
// // //                     <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>
// // //                       {d.detections.map((det, j) => (
// // //                         <div key={j}>
// // //                           #{j + 1} x={det.x} y={det.y} SNR={det.snr.toFixed(1)} sep={det.sep_pix.toFixed(1)}px
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   )}

// // //                   <ImageViewer src={imgSrc} />
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import { useState, useRef, useEffect } from "react";
// // import { api } from "./api";

// // const BACKEND_URL = "import.meta.env.VITE_API_URL";

// // const DEFAULT_PARAMS = {
// //   bkg_filter_size: 101,
// //   psf_sigma: 2.0,
// //   psf_size: 9,
// //   snr_threshold: 5.0,
// //   thresh_fraction: 0.5,
// //   min_sep_pix: 55,
// //   circle_radius: 30,
// //   circle_color: "lime",
// //   snr_cmap: "inferno",
// //   animation_fps: 3,
// //   edge_crop: 25,
// // };

// // const CIRCLE_COLORS = ["lime", "red", "white", "orange", "yellow", "cyan", "magenta"];
// // const SNR_CMAPS     = ["inferno", "viridis", "plasma", "magma", "coolwarm", "RdYlBu_r", "seismic", "gray"];
// // const VIEW_MODES    = ["raw", "enhanced", "snr", "lr"];
// // const VIEW_LABELS   = { raw: "Raw Image", enhanced: "Enhanced Image", snr: "SNR Map", lr: "LR Map" };

// // // Loading steps that cycle while processing
// // const LOADING_STEPS = [
// //   "Reading FITS file headers...",
// //   "Cropping border artifacts...",
// //   "Subtracting background noise...",
// //   "Masking artifact columns & rows...",
// //   "Masking coronagraph center...",
// //   "Enhancing image contrast (90–99.9th percentile)...",
// //   "Building Gaussian PSF kernel...",
// //   "Running matched filter (SNR conversion)...",
// //   "Computing likelihood ratio map...",
// //   "Detecting planet candidates...",
// //   "Applying non-maximum suppression...",
// //   "Rendering output images...",
// //   "Building animation frames...",
// //   "Packaging ZIP downloads...",
// //   "Almost done...",
// // ];

// // // Parse backend error into human-readable message
// // function parseError(err) {
// //   const status = err?.response?.status;
// //   const detail = err?.response?.data?.detail || err?.response?.data || err?.message || "";

// //   if (status === 422) {
// //     return {
// //       title: "Invalid Parameters",
// //       message: "One or more parameters are out of range or the wrong type. Check values like PSF Size, SNR Threshold, or BKG Filter Size and try again.",
// //     };
// //   }
// //   if (status === 413 || String(detail).toLowerCase().includes("size")) {
// //     return {
// //       title: "File Too Large",
// //       message: "One or more FITS files exceed the upload size limit. Try uploading fewer files at once or smaller files.",
// //     };
// //   }
// //   if (String(detail).toLowerCase().includes("fits") || String(detail).toLowerCase().includes("hdu")) {
// //     return {
// //       title: "Invalid FITS File",
// //       message: "One of the uploaded files could not be read as a valid FITS image. Make sure all files are proper .fits/.fit/.fts telescope data files.",
// //     };
// //   }
// //   if (String(detail).toLowerCase().includes("crop") || String(detail).toLowerCase().includes("edge")) {
// //     return {
// //       title: "Edge Crop Too Large",
// //       message: "The Edge Crop value is too large for the image size. Try reducing it (default is 25 pixels).",
// //     };
// //   }
// //   if (status === 500) {
// //     return {
// //       title: "Processing Error",
// //       message: `The server encountered an error while processing your images. This may be caused by unusual image dimensions, corrupt FITS data, or an extreme parameter value. Technical detail: ${String(detail).slice(0, 200)}`,
// //     };
// //   }
// //   if (!navigator.onLine || String(detail).toLowerCase().includes("network")) {
// //     return {
// //       title: "Connection Error",
// //       message: "Could not reach the backend server. Make sure uvicorn is running on import.meta.env.VITE_API_URL.",
// //     };
// //   }
// //   return {
// //     title: "Something Went Wrong",
// //     message: detail
// //       ? `The server returned: "${String(detail).slice(0, 300)}"`
// //       : "An unexpected error occurred. Please check that your FITS files are valid and your parameters are reasonable.",
// //   };
// // }

// // // ── Error Dialog ─────────────────────────────────────────────────────────────
// // function ErrorDialog({ error, onClose }) {
// //   if (!error) return null;
// //   return (
// //     <div style={{
// //       position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
// //       display: "flex", alignItems: "center", justifyContent: "center",
// //       zIndex: 1000, backdropFilter: "blur(4px)",
// //     }}>
// //       <div style={{
// //         background: "#1a1a1a", border: "1px solid #c0392b",
// //         borderRadius: 12, padding: 32, maxWidth: 480, width: "90%",
// //         boxShadow: "0 0 40px rgba(192,57,43,0.3)",
// //       }}>
// //         {/* Icon + Title */}
// //         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
// //           <span style={{ fontSize: 28 }}>⚠️</span>
// //           <h2 style={{ margin: 0, color: "#e74c3c", fontSize: 18, fontFamily: "monospace" }}>
// //             {error.title}
// //           </h2>
// //         </div>

// //         {/* Message */}
// //         <p style={{
// //           color: "#ccc", fontSize: 14, lineHeight: 1.6,
// //           margin: "0 0 24px 0", fontFamily: "sans-serif",
// //         }}>
// //           {error.message}
// //         </p>

// //         {/* Suggestions */}
// //         <div style={{
// //           background: "#111", borderRadius: 8, padding: 12,
// //           marginBottom: 24, borderLeft: "3px solid #e67e22",
// //         }}>
// //           <p style={{ color: "#e67e22", fontSize: 12, margin: "0 0 6px 0", fontWeight: "bold" }}>
// //             💡 What to try:
// //           </p>
// //           <ul style={{ color: "#aaa", fontSize: 12, margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
// //             <li>Confirm your files are valid FITS telescope images</li>
// //             <li>Try resetting parameters to defaults</li>
// //             <li>Reduce Edge Crop if images are small</li>
// //             <li>Make sure uvicorn is running on port 8000</li>
// //           </ul>
// //         </div>

// //         <button
// //           onClick={onClose}
// //           style={{
// //             width: "100%", padding: "10px 0", background: "#c0392b",
// //             color: "#fff", border: "none", borderRadius: 6,
// //             fontWeight: "bold", fontSize: 14, cursor: "pointer",
// //             letterSpacing: 1,
// //           }}
// //         >
// //           DISMISS
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Loading Overlay ───────────────────────────────────────────────────────────
// // function LoadingOverlay({ fileCount, stepIndex, progress }) {
// //   const step = LOADING_STEPS[stepIndex % LOADING_STEPS.length];
// //   return (
// //     <div style={{
// //       background: "#111", border: "1px solid #333",
// //       borderRadius: 10, padding: "20px 24px", marginTop: 16,
// //     }}>
// //       {/* Spinner row */}
// //       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
// //         <span style={{ fontSize: 20, animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</span>
// //         <span style={{ color: "#4a9eff", fontWeight: "bold", fontSize: 14 }}>
// //           Processing {fileCount} file{fileCount !== 1 ? "s" : ""}...
// //         </span>
// //       </div>

// //       {/* Current step — italic */}
// //       <p style={{
// //         color: "#aaa", fontSize: 13, fontStyle: "italic",
// //         margin: "0 0 14px 0", fontFamily: "monospace",
// //         borderLeft: "2px solid #4a9eff", paddingLeft: 10,
// //       }}>
// //         Loading... {step}
// //       </p>

// //       {/* Progress bar */}
// //       {progress > 0 && (
// //         <>
// //           <div style={{
// //             background: "#222", borderRadius: 4, height: 6,
// //             overflow: "hidden", marginBottom: 6,
// //           }}>
// //             <div style={{
// //               height: "100%", width: `${progress}%`,
// //               background: "linear-gradient(90deg, #4a9eff, #7b61ff)",
// //               borderRadius: 4, transition: "width 0.4s ease",
// //             }} />
// //           </div>
// //           <p style={{ color: "#555", fontSize: 11, margin: 0, textAlign: "right" }}>
// //             {progress}% complete
// //           </p>
// //         </>
// //       )}

// //       <style>{`
// //         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// //       `}</style>
// //     </div>
// //   );
// // }

// // // ── Canvas image viewer with zoom + pan ──────────────────────────────────────
// // function ImageViewer({ src }) {
// //   const canvasRef = useRef();
// //   const [scale, setScale]   = useState(1);
// //   const [offset, setOffset] = useState({ x: 0, y: 0 });

// //   useEffect(() => {
// //     if (!src || !canvasRef.current) return;
// //     const img = new Image();
// //     img.src = src;
// //     img.onload = () => {
// //       const ctx = canvasRef.current.getContext("2d");
// //       ctx.clearRect(0, 0, 400, 400);
// //       const fit = Math.min(400 / img.width, 400 / img.height) * scale;
// //       ctx.setTransform(fit, 0, 0, fit, offset.x, offset.y);
// //       ctx.drawImage(img, 0, 0);
// //     };
// //   }, [src, scale, offset]);

// //   return (
// //     <canvas
// //       ref={canvasRef}
// //       width={400} height={400}
// //       style={{ border: "1px solid #444", background: "#000", cursor: "grab", borderRadius: 4 }}
// //       onWheel={(e) => setScale((s) => Math.max(0.3, Math.min(8, s - e.deltaY * 0.001)))}
// //       onMouseMove={(e) =>
// //         e.buttons === 1 &&
// //         setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))
// //       }
// //     />
// //   );
// // }

// // // ── Main component ────────────────────────────────────────────────────────────
// // export default function HomeView({ results, setResults }) {
// //   const [files, setFiles]       = useState([]);
// //   const [progress, setProgress] = useState(0);
// //   const [jobId, setJobId]       = useState(null);
// //   const [viewMode, setViewMode] = useState("snr");
// //   const [params, setParams]     = useState(DEFAULT_PARAMS);
// //   const [loading, setLoading]   = useState(false);
// //   const [stepIndex, setStepIndex] = useState(0);
// //   const [error, setError]       = useState(null);

// //   const setParam = (key, val) => setParams((p) => ({ ...p, [key]: val }));

// //   // Cycle loading steps while processing
// //   useEffect(() => {
// //     if (!loading) return;
// //     const interval = setInterval(() => {
// //       setStepIndex((i) => i + 1);
// //     }, 1800);
// //     return () => clearInterval(interval);
// //   }, [loading]);

// //   // Progress polling
// //   useEffect(() => {
// //     if (!jobId) return;
// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await api.get(`/status/${jobId}`);
// //         if (res.data.total)
// //           setProgress(Math.round((res.data.done / res.data.total) * 100));
// //       } catch {}
// //     }, 2000);
// //     return () => clearInterval(interval);
// //   }, [jobId]);

// //   const handleUpload = async (e) => {
// //     const fileList = e.target.files;
// //     if (!fileList.length) return;
// //     setFiles([...fileList]);
// //     setLoading(true);
// //     setStepIndex(0);
// //     setProgress(0);
// //     setError(null);
// //     setResults(null);

// //     const data = new FormData();
// //     for (let f of fileList) data.append("files", f);
// //     data.append("params", JSON.stringify(params));

// //     try {
// //       const res = await api.post("/upload", data);
// //       setResults(res.data);
// //       setJobId(res.data.job_id);
// //     } catch (err) {
// //       setError(parseError(err));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const imageKey = { raw: "raw_image", enhanced: "enhanced_image", snr: "snr_image", lr: "lr_image" };

// //   const downloadFile = (url, name) => {
// //     const a = document.createElement("a");
// //     a.href = url; a.download = name; a.click();
// //   };

// //   const s = {
// //     page:    { padding: 24, fontFamily: "sans-serif", background: "#111", color: "#eee", minHeight: "100vh" },
// //     card:    { background: "#1e1e1e", borderRadius: 8, padding: 16, marginBottom: 16 },
// //     label:   { fontSize: 12, color: "#aaa", marginBottom: 4, display: "block" },
// //     input:   { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
// //                padding: "4px 8px", width: "100%", boxSizing: "border-box" },
// //     select:  { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
// //                padding: "4px 8px", width: "100%" },
// //     btn:     { padding: "6px 14px", borderRadius: 4, border: "none", cursor: "pointer",
// //                fontWeight: "bold", fontSize: 13 },
// //     tabActive:   { background: "#4a9eff", color: "#fff" },
// //     tabInactive: { background: "#333", color: "#bbb" },
// //     dlBtn:   { background: "#2a6e2a", color: "#fff", fontSize: 11, padding: "3px 8px",
// //                borderRadius: 3, border: "none", cursor: "pointer", marginLeft: 4 },
// //     grid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 16 },
// //     imgCard: { background: "#1a1a1a", borderRadius: 6, padding: 12 },
// //     row:     { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
// //   };

// //   const ParamRow = ({ label, paramKey, type = "number", step = 1, min = 0 }) => (
// //     <div style={{ minWidth: 150 }}>
// //       <label style={s.label}>{label}</label>
// //       <input
// //         type={type} step={step} min={min}
// //         value={params[paramKey]} style={s.input}
// //         onChange={(e) =>
// //           setParam(paramKey, type === "number" ? parseFloat(e.target.value) : e.target.value)
// //         }
// //       />
// //     </div>
// //   );

// //   return (
// //     <div style={s.page}>
// //       {/* Error dialog */}
// //       <ErrorDialog error={error} onClose={() => setError(null)} />

// //       <h1 style={{ marginBottom: 20, fontSize: 22 }}>🔭 Exoplanet Direct Imaging Detection</h1>

// //       {/* Parameters */}
// //       <div style={s.card}>
// //         <h3 style={{ marginTop: 0, marginBottom: 12 }}>Parameters</h3>
// //         <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// //           <ParamRow label="BKG Filter Size"   paramKey="bkg_filter_size" />
// //           <ParamRow label="PSF Sigma"         paramKey="psf_sigma"       step={0.1} />
// //           <ParamRow label="PSF Size"          paramKey="psf_size" />
// //           <ParamRow label="SNR Threshold"     paramKey="snr_threshold"   step={0.5} />
// //           <ParamRow label="Thresh Fraction"   paramKey="thresh_fraction" step={0.05} />
// //           <ParamRow label="Min Sep (px)"      paramKey="min_sep_pix" />
// //           <ParamRow label="Circle Radius"     paramKey="circle_radius" />
// //           <ParamRow label="Edge Crop"         paramKey="edge_crop" />
// //           <ParamRow label="Animation FPS"     paramKey="animation_fps" />
// //           <div style={{ minWidth: 150 }}>
// //             <label style={s.label}>Circle Colour</label>
// //             <select style={s.select} value={params.circle_color}
// //               onChange={(e) => setParam("circle_color", e.target.value)}>
// //               {CIRCLE_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
// //             </select>
// //           </div>
// //           <div style={{ minWidth: 150 }}>
// //             <label style={s.label}>SNR Colormap</label>
// //             <select style={s.select} value={params.snr_cmap}
// //               onChange={(e) => setParam("snr_cmap", e.target.value)}>
// //               {SNR_CMAPS.map((c) => <option key={c} value={c}>{c}</option>)}
// //             </select>
// //           </div>
// //         </div>
// //         <div style={{ marginTop: 12 }}>
// //           <button style={{ ...s.btn, background: "#555", color: "#eee" }}
// //             onClick={() => setParams(DEFAULT_PARAMS)}>
// //             Reset to Defaults
// //           </button>
// //         </div>
// //       </div>

// //       {/* Upload */}
// //       <div style={s.card}>
// //         <h3 style={{ marginTop: 0, marginBottom: 8 }}>Upload FITS Files</h3>
// //         <input type="file" multiple accept=".fits,.fit,.fts"
// //           onChange={handleUpload} style={{ color: "#eee" }} />

// //         {loading && (
// //           <LoadingOverlay
// //             fileCount={files.length}
// //             stepIndex={stepIndex}
// //             progress={progress}
// //           />
// //         )}
// //       </div>

// //       {/* Results */}
// //       {results && (
// //         <div>
// //           <div style={{ ...s.row, marginBottom: 16 }}>
// //             {VIEW_MODES.map((mode) => (
// //               <button key={mode}
// //                 style={{ ...s.btn, ...(viewMode === mode ? s.tabActive : s.tabInactive) }}
// //                 onClick={() => setViewMode(mode)}>
// //                 {VIEW_LABELS[mode]}
// //               </button>
// //             ))}
// //           </div>

// //           <div style={{ ...s.card, ...s.row }}>
// //             <span style={{ fontWeight: "bold", marginRight: 8 }}>
// //               {VIEW_LABELS[viewMode]} Downloads:
// //             </span>
// //             <button style={{ ...s.btn, background: "#2a5c8a", color: "#fff" }}
// //               onClick={() => downloadFile(
// //                 `${BACKEND_URL}/download/exoplanet_${viewMode}.${results.output_type}`,
// //                 `exoplanet_${viewMode}.${results.output_type}`
// //               )}>
// //               ⬇ {results.output_type.toUpperCase()} ({VIEW_LABELS[viewMode]})
// //             </button>
// //             <button style={{ ...s.btn, background: "#2a6e2a", color: "#fff" }}
// //               onClick={() => downloadFile(
// //                 `${BACKEND_URL}/download/exoplanet_${viewMode}.zip`,
// //                 `exoplanet_${viewMode}.zip`
// //               )}>
// //               ⬇ ZIP ({VIEW_LABELS[viewMode]})
// //             </button>
// //           </div>

// //           {results.output_type === "gif" && results.animations?.[viewMode] && (
// //             <div style={{ ...s.card, textAlign: "center" }}>
// //               <p style={{ marginBottom: 8, fontWeight: "bold" }}>
// //                 {VIEW_LABELS[viewMode]} — Animation Preview
// //               </p>
// //               <img
// //                 src={`${BACKEND_URL}${results.animations[viewMode]}?t=${Date.now()}`}
// //                 style={{ maxWidth: "100%", borderRadius: 4 }}
// //                 alt={`${viewMode} animation`}
// //               />
// //             </div>
// //           )}

// //           <div style={s.grid}>
// //             {results.detections.map((d, i) => {
// //               const imgSrc = `${BACKEND_URL}${d[imageKey[viewMode]]}`;
// //               return (
// //                 <div key={i} style={s.imgCard}>
// //                   <div style={{ ...s.row, marginBottom: 6 }}>
// //                     <span style={{ fontWeight: "bold", flex: 1, fontSize: 13 }}>{d.frame}</span>
// //                     <button style={s.dlBtn}
// //                       onClick={() => downloadFile(
// //                         `${BACKEND_URL}/download/${d[imageKey[viewMode].replace("_image", "_png")]}`,
// //                         d[imageKey[viewMode].replace("_image", "_png")]
// //                       )}>
// //                       ⬇ PNG
// //                     </button>
// //                   </div>
// //                   <p style={{ fontSize: 12, color: "#aaa", margin: "4px 0" }}>
// //                     Peak SNR: <b style={{ color: "#fff" }}>{d.snr.toFixed(2)}</b>
// //                     {" · "}Candidates: <b style={{ color: "#4aff7f" }}>{d.detections.length}</b>
// //                   </p>
// //                   {d.detections.length > 0 && (
// //                     <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>
// //                       {d.detections.map((det, j) => (
// //                         <div key={j}>
// //                           #{j+1} x={det.x} y={det.y} SNR={det.snr.toFixed(1)} sep={det.sep_pix.toFixed(1)}px
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                   <ImageViewer src={imgSrc} />
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useRef, useEffect } from "react";
// import { api } from "./api";

// const BACKEND_URL = "import.meta.env.VITE_API_URL";

// const DEFAULT_PARAMS = {
//   bkg_filter_size: 101,
//   psf_sigma: 2.0,
//   psf_size: 9,
//   snr_threshold: 5.0,
//   thresh_fraction: 0.5,
//   min_sep_pix: 55,
//   circle_radius: 30,
//   circle_color: "lime",
//   snr_cmap: "inferno",
//   animation_fps: 3,
//   edge_crop: 25,
// };

// const CIRCLE_COLORS = ["lime", "red", "white", "orange", "yellow", "cyan", "magenta"];
// const SNR_CMAPS     = ["inferno", "viridis", "plasma", "magma", "coolwarm", "RdYlBu_r", "seismic", "gray"];
// const VIEW_MODES    = ["raw", "enhanced", "snr", "lr"];
// const VIEW_LABELS   = { raw: "Raw Image", enhanced: "Enhanced Image", snr: "SNR Map", lr: "LR Map" };

// function parseError(err) {
//   const status = err?.response?.status;
//   const detail = err?.response?.data?.detail || err?.response?.data || err?.message || "";

//   if (status === 422)
//     return { title: "Invalid Parameters", message: "One or more parameters are out of range or the wrong type. Check values like PSF Size, SNR Threshold, or BKG Filter Size and try again." };
//   if (status === 413 || String(detail).toLowerCase().includes("size"))
//     return { title: "File Too Large", message: "One or more FITS files exceed the upload size limit. Try uploading fewer files at once or smaller files." };
//   if (String(detail).toLowerCase().includes("fits") || String(detail).toLowerCase().includes("hdu"))
//     return { title: "Invalid FITS File", message: "One of the uploaded files could not be read as a valid FITS image. Make sure all files are proper .fits / .fit / .fts telescope data files." };
//   if (String(detail).toLowerCase().includes("crop") || String(detail).toLowerCase().includes("edge"))
//     return { title: "Edge Crop Too Large", message: "The Edge Crop value is too large for the image size. Try reducing it (default is 25 pixels)." };
//   if (status === 500)
//     return { title: "Processing Error", message: `The server encountered an error while processing your images. This may be caused by unusual image dimensions, corrupt FITS data, or an extreme parameter value.\n\nDetail: ${String(detail).slice(0, 200)}` };
//   if (!navigator.onLine)
//     return { title: "Connection Error", message: "Could not reach the backend server. Make sure uvicorn is running on import.meta.env.VITE_API_URL." };
//   return {
//     title: "Something Went Wrong",
//     message: detail ? `The server returned: "${String(detail).slice(0, 300)}"` : "An unexpected error occurred. Please check that your FITS files are valid and your parameters are reasonable.",
//   };
// }

// // ── Error Dialog ──────────────────────────────────────────────────────────────
// function ErrorDialog({ error, onClose }) {
//   if (!error) return null;
//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex",
//                   alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
//       <div style={{ background: "#1a1a1a", border: "1px solid #c0392b", borderRadius: 12,
//                     padding: 32, maxWidth: 480, width: "90%", boxShadow: "0 0 40px rgba(192,57,43,0.3)" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
//           <span style={{ fontSize: 28 }}>⚠️</span>
//           <h2 style={{ margin: 0, color: "#e74c3c", fontSize: 18, fontFamily: "monospace" }}>{error.title}</h2>
//         </div>
//         <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px 0", whiteSpace: "pre-line" }}>
//           {error.message}
//         </p>
//         <div style={{ background: "#111", borderRadius: 8, padding: 12, marginBottom: 24, borderLeft: "3px solid #e67e22" }}>
//           <p style={{ color: "#e67e22", fontSize: 12, margin: "0 0 6px 0", fontWeight: "bold" }}>💡 What to try:</p>
//           <ul style={{ color: "#aaa", fontSize: 12, margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
//             <li>Confirm your files are valid FITS telescope images</li>
//             <li>Try resetting parameters to defaults</li>
//             <li>Reduce Edge Crop if images are small</li>
//             <li>Make sure uvicorn is running on port 8000</li>
//           </ul>
//         </div>
//         <button onClick={onClose}
//           style={{ width: "100%", padding: "10px 0", background: "#c0392b", color: "#fff",
//                    border: "none", borderRadius: 6, fontWeight: "bold", fontSize: 14,
//                    cursor: "pointer", letterSpacing: 1 }}>
//           DISMISS
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Loading Overlay — shows REAL step from backend ────────────────────────────
// function LoadingOverlay({ fileCount, currentStep, done, total }) {
//   const pct = total > 0 ? Math.round((done / total) * 100) : null;
//   return (
//     <div style={{ background: "#111", border: "1px solid #333", borderRadius: 10,
//                   padding: "20px 24px", marginTop: 16 }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
//         <span style={{ fontSize: 20, display: "inline-block", animation: "spin 1.2s linear infinite" }}>⚙️</span>
//         <span style={{ color: "#4a9eff", fontWeight: "bold", fontSize: 14 }}>
//           Processing {fileCount} file{fileCount !== 1 ? "s" : ""}
//           {total > 0 && ` — ${done} / ${total} done`}
//         </span>
//       </div>

//       {/* Real-time step from backend */}
//       <p style={{ color: "#aaa", fontSize: 13, fontStyle: "italic", margin: "0 0 14px 0",
//                   fontFamily: "monospace", borderLeft: "2px solid #4a9eff", paddingLeft: 10,
//                   minHeight: 20, transition: "all 0.2s" }}>
//         {currentStep || "Initialising..."}
//       </p>

//       {/* Progress bar — only shown when multi-file */}
//       {pct !== null && (
//         <>
//           <div style={{ background: "#222", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 6 }}>
//             <div style={{ height: "100%", width: `${pct}%`,
//                           background: "linear-gradient(90deg, #4a9eff, #7b61ff)",
//                           borderRadius: 4, transition: "width 0.4s ease" }} />
//           </div>
//           <p style={{ color: "#555", fontSize: 11, margin: 0, textAlign: "right" }}>{pct}%</p>
//         </>
//       )}

//       <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
//     </div>
//   );
// }

// // ── Canvas viewer ─────────────────────────────────────────────────────────────
// function ImageViewer({ src }) {
//   const canvasRef = useRef();
//   const [scale, setScale]   = useState(1);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     if (!src || !canvasRef.current) return;
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, 400, 400);
//       const fit = Math.min(400 / img.width, 400 / img.height) * scale;
//       ctx.setTransform(fit, 0, 0, fit, offset.x, offset.y);
//       ctx.drawImage(img, 0, 0);
//     };
//   }, [src, scale, offset]);

//   return (
//     <canvas ref={canvasRef} width={400} height={400}
//       style={{ border: "1px solid #444", background: "#000", cursor: "grab", borderRadius: 4 }}
//       onWheel={(e) => setScale((s) => Math.max(0.3, Math.min(8, s - e.deltaY * 0.001)))}
//       onMouseMove={(e) => e.buttons === 1 &&
//         setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))}
//     />
//   );
// }

// // ── Main ──────────────────────────────────────────────────────────────────────
// export default function HomeView({ results, setResults }) {
//   const [files, setFiles]         = useState([]);
//   const [jobId, setJobId]         = useState(null);
//   const [viewMode, setViewMode]   = useState("snr");
//   const [params, setParams]       = useState(DEFAULT_PARAMS);
//   const [loading, setLoading]     = useState(false);
//   const [error, setError]         = useState(null);
//   const [currentStep, setCurrentStep] = useState("");
//   const [done, setDone]           = useState(0);
//   const [total, setTotal]         = useState(0);

//   const setParam = (key, val) => setParams((p) => ({ ...p, [key]: val }));

//   // Poll /status for real step text
//   useEffect(() => {
//     if (!jobId || !loading) return;
//     const interval = setInterval(async () => {
//       try {
//         const res = await api.get(`/status/${jobId}`);
//         if (res.data.step)  setCurrentStep(res.data.step);
//         if (res.data.done  !== undefined) setDone(res.data.done);
//         if (res.data.total !== undefined) setTotal(res.data.total);
//       } catch {}
//     }, 600);  // poll every 600ms for snappy updates
//     return () => clearInterval(interval);
//   }, [jobId, loading]);

//   const handleUpload = async (e) => {
//     const fileList = e.target.files;
//     if (!fileList.length) return;
//     setFiles([...fileList]);
//     setLoading(true);
//     setCurrentStep("Uploading files...");
//     setDone(0); setTotal(0);
//     setError(null);
//     setResults(null);

//     const data = new FormData();
//     for (let f of fileList) data.append("files", f);
//     data.append("params", JSON.stringify(params));

//     try {
//       const res = await api.post("/upload", data);
//       setResults(res.data);
//       setJobId(res.data.job_id);
//     } catch (err) {
//       setError(parseError(err));
//     } finally {
//       setLoading(false);
//       setCurrentStep("");
//     }
//   };

//   const imageKey = { raw: "raw_image", enhanced: "enhanced_image", snr: "snr_image", lr: "lr_image" };
//   const downloadFile = (url, name) => { const a = document.createElement("a"); a.href = url; a.download = name; a.click(); };

//   const s = {
//     page:        { padding: 24, fontFamily: "sans-serif", background: "#111", color: "#eee", minHeight: "100vh" },
//     card:        { background: "#1e1e1e", borderRadius: 8, padding: 16, marginBottom: 16 },
//     label:       { fontSize: 12, color: "#aaa", marginBottom: 4, display: "block" },
//     input:       { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4, padding: "4px 8px", width: "100%", boxSizing: "border-box" },
//     select:      { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4, padding: "4px 8px", width: "100%" },
//     btn:         { padding: "6px 14px", borderRadius: 4, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: 13 },
//     tabActive:   { background: "#4a9eff", color: "#fff" },
//     tabInactive: { background: "#333", color: "#bbb" },
//     dlBtn:       { background: "#2a6e2a", color: "#fff", fontSize: 11, padding: "3px 8px", borderRadius: 3, border: "none", cursor: "pointer", marginLeft: 4 },
//     grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 16 },
//     imgCard:     { background: "#1a1a1a", borderRadius: 6, padding: 12 },
//     row:         { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
//   };

//   const ParamRow = ({ label, paramKey, step = 1, min = 0 }) => (
//     <div style={{ minWidth: 150 }}>
//       <label style={s.label}>{label}</label>
//       <input type="number" step={step} min={min} value={params[paramKey]} style={s.input}
//         onChange={(e) => setParam(paramKey, parseFloat(e.target.value))} />
//     </div>
//   );

//   return (
//     <div style={s.page}>
//       <ErrorDialog error={error} onClose={() => setError(null)} />

//       <h1 style={{ marginBottom: 20, fontSize: 22 }}>🔭 Exoplanet Direct Imaging Detection</h1>

//       {/* Parameters */}
//       <div style={s.card}>
//         <h3 style={{ marginTop: 0, marginBottom: 12 }}>Parameters</h3>
//         <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//           <ParamRow label="BKG Filter Size"  paramKey="bkg_filter_size" />
//           <ParamRow label="PSF Sigma"        paramKey="psf_sigma"       step={0.1} />
//           <ParamRow label="PSF Size"         paramKey="psf_size" />
//           <ParamRow label="SNR Threshold"    paramKey="snr_threshold"   step={0.5} />
//           <ParamRow label="Thresh Fraction"  paramKey="thresh_fraction" step={0.05} />
//           <ParamRow label="Min Sep (px)"     paramKey="min_sep_pix" />
//           <ParamRow label="Circle Radius"    paramKey="circle_radius" />
//           <ParamRow label="Edge Crop"        paramKey="edge_crop" />
//           <ParamRow label="Animation FPS"    paramKey="animation_fps" />
//           <div style={{ minWidth: 150 }}>
//             <label style={s.label}>Circle Colour</label>
//             <select style={s.select} value={params.circle_color}
//               onChange={(e) => setParam("circle_color", e.target.value)}>
//               {CIRCLE_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>
//           <div style={{ minWidth: 150 }}>
//             <label style={s.label}>SNR Colormap</label>
//             <select style={s.select} value={params.snr_cmap}
//               onChange={(e) => setParam("snr_cmap", e.target.value)}>
//               {SNR_CMAPS.map((c) => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>
//         </div>
//         <div style={{ marginTop: 12 }}>
//           <button style={{ ...s.btn, background: "#555", color: "#eee" }}
//             onClick={() => setParams(DEFAULT_PARAMS)}>Reset to Defaults</button>
//         </div>
//       </div>

//       {/* Upload */}
//       <div style={s.card}>
//         <h3 style={{ marginTop: 0, marginBottom: 8 }}>Upload FITS Files</h3>
//         <input type="file" multiple accept=".fits,.fit,.fts" onChange={handleUpload} style={{ color: "#eee" }} />
//         {loading && <LoadingOverlay fileCount={files.length} currentStep={currentStep} done={done} total={total} />}
//       </div>

//       {/* Results */}
//       {results && (
//         <div>
//           <div style={{ ...s.row, marginBottom: 16 }}>
//             {VIEW_MODES.map((mode) => (
//               <button key={mode} style={{ ...s.btn, ...(viewMode === mode ? s.tabActive : s.tabInactive) }}
//                 onClick={() => setViewMode(mode)}>{VIEW_LABELS[mode]}</button>
//             ))}
//           </div>

//           <div style={{ ...s.card, ...s.row }}>
//             <span style={{ fontWeight: "bold", marginRight: 8 }}>{VIEW_LABELS[viewMode]} Downloads:</span>
//             <button style={{ ...s.btn, background: "#2a5c8a", color: "#fff" }}
//               onClick={() => downloadFile(`${BACKEND_URL}/download/exoplanet_${viewMode}.${results.output_type}`,
//                 `exoplanet_${viewMode}.${results.output_type}`)}>
//               ⬇ {results.output_type.toUpperCase()} ({VIEW_LABELS[viewMode]})
//             </button>
//             <button style={{ ...s.btn, background: "#2a6e2a", color: "#fff" }}
//               onClick={() => downloadFile(`${BACKEND_URL}/download/exoplanet_${viewMode}.zip`,
//                 `exoplanet_${viewMode}.zip`)}>
//               ⬇ ZIP ({VIEW_LABELS[viewMode]})
//             </button>
//           </div>

//           {results.output_type === "gif" && results.animations?.[viewMode] && (
//             <div style={{ ...s.card, textAlign: "center" }}>
//               <p style={{ marginBottom: 8, fontWeight: "bold" }}>{VIEW_LABELS[viewMode]} — Animation Preview</p>
//               <img src={`${BACKEND_URL}${results.animations[viewMode]}?t=${Date.now()}`}
//                 style={{ maxWidth: "100%", borderRadius: 4 }} alt={`${viewMode} animation`} />
//             </div>
//           )}

//           <div style={s.grid}>
//             {results.detections.map((d, i) => {
//               const imgSrc = `${BACKEND_URL}${d[imageKey[viewMode]]}`;
//               return (
//                 <div key={i} style={s.imgCard}>
//                   <div style={{ ...s.row, marginBottom: 6 }}>
//                     <span style={{ fontWeight: "bold", flex: 1, fontSize: 13 }}>{d.frame}</span>
//                     <button style={s.dlBtn}
//                       onClick={() => downloadFile(
//                         `${BACKEND_URL}/download/${d[imageKey[viewMode].replace("_image","_png")]}`,
//                         d[imageKey[viewMode].replace("_image","_png")])}>⬇ PNG</button>
//                   </div>
//                   <p style={{ fontSize: 12, color: "#aaa", margin: "4px 0" }}>
//                     Peak SNR: <b style={{ color: "#fff" }}>{d.snr.toFixed(2)}</b>
//                     {" · "}Candidates: <b style={{ color: "#4aff7f" }}>{d.detections.length}</b>
//                   </p>
//                   {d.detections.length > 0 && (
//                     <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>
//                       {d.detections.map((det, j) => (
//                         <div key={j}>#{j+1} x={det.x} y={det.y} SNR={det.snr.toFixed(1)} sep={det.sep_pix.toFixed(1)}px</div>
//                       ))}
//                     </div>
//                   )}
//                   <ImageViewer src={imgSrc} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // // // import { useState, useRef, useEffect } from "react";
// // // // import { api } from "./api";
// // // // import { Link } from "react-router-dom";


// // // // // const BACKEND_URL = "import.meta.env.VITE_API_URL";

// // // // export default function HomeView({ results, setResults }) {
// // // //   const [files, setFiles] = useState([]);
// // // //   // const [results, setResults] = useState(null);
// // // //   const [progress, setProgress] = useState(0);
// // // //   const [jobId, setJobId] = useState(null);
// // // //   const [viewMode, setViewMode] = useState("snr");
// // // //   const BACKEND_URL = "import.meta.env.VITE_API_URL";
// // // //   const [rawImage, setRawImage] = useState(null);


// // // //   // ---- Upload Handler ----
// // // //   // const handleUpload = async (e) => {
// // // //   //   const data = new FormData();
// // // //   //   [...e.target.files].forEach((f) => data.append("files", f));
// // // //   //   setFiles([...e.target.files]);

// // // //   //   try {
// // // //   //     const res = await api.post("/upload", data);
// // // //   //     setResults(res.data);
// // // //   //     setJobId(res.data.job_id);
// // // //   //     setProgress(0);
// // // //   //   } catch (err) {
// // // //   //     console.error(err);
// // // //   //     alert("Upload or processing failed!");
// // // //   //   }
// // // //   // };

// // // //   // const handleUpload = async (e) => {
// // // //   // const fileList = e.target.files;
// // // //   // if (!fileList.length) return;

// // // //   const handleUpload = async (e) => {
// // // //   const fileList = e.target.files;
// // // //   if (!fileList.length) return;

// // // //   setFiles([...fileList]);   // <--- ADD THIS

// // // //   const data = new FormData();
// // // //   for (let f of fileList) data.append("files", f);

// // // //   try {
// // // //     const res = await api.post("/upload", data);
// // // //     setResults(res.data);
// // // //     setJobId(res.data.job_id);
// // // //     setProgress(0);
// // // //   } catch (err) {
// // // //     console.error(err.response ?? err);
// // // //     alert("Upload or processing failed! Check console.");
// // // //   }
// // // // };

// // // //   const handleShowRaw = async () => {
// // // //   if (!files.length) {
// // // //     alert("Please select at least one FITS file first.");
// // // //     return;
// // // //   }

// // // //   const data = new FormData();
// // // //   data.append("file", files[0]); // only FIRST file

// // // //   try {
// // // //     const res = await api.post("/show-raw", data);
// // // //     setRawImage(`${BACKEND_URL}${res.data.raw_image}`);
// // // //   } catch (err) {
// // // //     console.error(err.response ?? err);
// // // //     alert("Raw image loading failed.");
// // // //   }
// // // // };

// // // //   const data = new FormData();
// // // //   for (let f of fileList) data.append("files", f); // matches backend list[UploadFile]

// // // //   try {
// // // //     const res = await api.post("/upload", data);
// // // //     setResults(res.data);
// // // //     setJobId(res.data.job_id);
// // // //     setProgress(0);
// // // //   } catch (err) {
// // // //     console.error(err.response ?? err);
// // // //     alert("Upload or processing failed! Check console.");
// // // //   }
// // // // };


// // // //   // ---- Progress Polling ----
// // // //   useEffect(() => {
// // // //     if (!jobId) return;

// // // //     const interval = setInterval(async () => {
// // // //       try {
// // // //         const res = await api.get(`/status/${jobId}`);
// // // //         if (res.data.total) {
// // // //           setProgress(Math.round((res.data.done / res.data.total) * 100));
// // // //         }
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //       }
// // // //     }, 2000);

// // // //     return () => clearInterval(interval);
// // // //   }, [jobId]);

// // // //   // ---- Canvas Viewer ----
// // // //   function ImageViewer({ src }) {
// // // //     const canvasRef = useRef();
// // // //     const [scale, setScale] = useState(1);
// // // //     const [offset, setOffset] = useState({ x: 0, y: 0 });

// // // //    useEffect(() => {
// // // //   if (!src) return;
// // // //   const img = new Image();
// // // //   img.src = src;
// // // //   img.onload = () => {
// // // //     const ctx = canvasRef.current.getContext("2d");
// // // //     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

// // // //     // Fit image into canvas
// // // //     const scaleX = canvasRef.current.width / img.width;
// // // //     const scaleY = canvasRef.current.height / img.height;
// // // //     const fitScale = Math.min(scaleX, scaleY) * scale; // include zoom
// // // //     ctx.setTransform(fitScale, 0, 0, fitScale, offset.x, offset.y);
// // // //     ctx.drawImage(img, 0, 0);
// // // //   };
// // // // }, [src, scale, offset]);


// // // //     return (
// // // //       <canvas
// // // //         ref={canvasRef}
// // // //         width={400}
// // // //         height={400}
// // // //         style={{ border: "1px solid black" }}
// // // //         onWheel={(e) => setScale((s) => Math.max(0.5, s - e.deltaY * 0.001))}
// // // //         onMouseMove={(e) =>
// // // //           e.buttons === 1 &&
// // // //           setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))
// // // //         }
// // // //       />
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div style={{ padding: 20 }}>
// // // // <h1 style={{ fontSize: "20px" }}>
// // // //   Exoplanet Detection Direct Imaging
// // // // </h1>
// // // // <br />
// // // //       {/* ---- Upload Input ---- */}
// // // //       <input type="file" multiple onChange={handleUpload} />

// // // //       {/* ---- Progress Bar ---- */}
// // // //       {progress > 0 && progress < 100 && (
// // // //         <div>
// // // //           <progress value={progress} max="100" />
// // // //           <p>{progress}% processed</p>
// // // //         </div>
// // // //       )}

// // // //       {results && (
// // // //   <div style={{ marginTop: 20 }}>
// // // //     <h2>Processed Results</h2>

// // // //     {/* ---- GIF / MP4 Preview ---- */}
// // // // {results.output_type === "gif" && results.preview_url && (
// // // //   <div style={{ marginBottom: 20 }}>
// // // //     <h3>GIF Preview</h3>
// // // //     <img
// // // //       src={`${BACKEND_URL}${results.preview_url}`}
// // // //       width={400}
// // // //       alt="Exoplanet GIF"
// // // //     />
// // // //   </div>
// // // // )}


// // // //     {/* ---- Download link ---- */}
// // // //     <br />
// // // //     <a
// // // //       href={`import.meta.env.VITE_API_URL/download/${results.output_type}`}
// // // //       download={`exoplanet.${results.output_type}`}
// // // //     >
// // // //       Download {results.output_type.toUpperCase()}
// // // //     </a>




// // // //     {/* ---- Toggle Buttons SNR / LR ---- */}
// // // //     <div style={{ marginTop: 10 }}>
// // // //       <button onClick={() => setViewMode("snr")}>SNR Map</button>
// // // //       <button onClick={() => setViewMode("lr")}>LR Map</button>
// // // //       <input type="file" multiple onChange={handleUpload} />

// // // // <br /><br />

// // // // <button onClick={handleShowRaw}>
// // // //   Show Raw Image
// // // // </button>
      
// // // //     </div>

// // // //     {/* ---- Image Grid ---- */}
// // // //     <div
// // // //       style={{
// // // //         display: "flex",
// // // //         flexWrap: "wrap",
// // // //         gap: "10px",
// // // //         marginTop: "10px",
// // // //       }}
// // // //     >
// // // //       {results.detections.map((d, i) => (
// // // //         <div key={i} style={{ border: "1px solid #ccc", padding: 5 }}>
// // // //           <p>{d.frame}</p>
// // // //           <p>SNR: {d.snr.toFixed(2)}</p>
// // // //           <ImageViewer
// // // //             src={`import.meta.env.VITE_API_URL${viewMode === "snr" ? d.snr_image : d.lr_image}`}
// // // //           />
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   </div>
// // // // )}


     
// // // //     </div>
// // // //   );
// // // // }

// // // // {rawImage && (
// // // //   <div style={{ marginTop: 20 }}>
// // // //     <h2>Raw FITS Preview</h2>
// // // //     <ImageViewer src={rawImage} />
// // // //   </div>
// // // // )}
// // // import { useState, useRef, useEffect } from "react";
// // // import { api } from "./api";

// // // export default function HomeView({ results, setResults }) {
// // //   const [files, setFiles] = useState([]);
// // //   const [progress, setProgress] = useState(0);
// // //   const [jobId, setJobId] = useState(null);
// // //   const [viewMode, setViewMode] = useState("snr");
// // //   const [rawImage, setRawImage] = useState(null);

// // //   const BACKEND_URL = "import.meta.env.VITE_API_URL";

// // //   // ---------------- Upload Handler ----------------
// // //   const handleUpload = async (e) => {
// // //     const fileList = e.target.files;
// // //     if (!fileList.length) return;

// // //     setFiles([...fileList]);

// // //     const data = new FormData();
// // //     for (let f of fileList) data.append("files", f);

// // //     try {
// // //       const res = await api.post("/upload", data);
// // //       setResults(res.data);
// // //       setJobId(res.data.job_id);
// // //       setProgress(0);
// // //     } catch (err) {
// // //       console.error(err.response ?? err);
// // //       alert("Upload or processing failed!");
// // //     }
// // //   };

// // //   // ---------------- RAW Preview ----------------
// // //   const handleShowRaw = async () => {
// // //     if (!files.length) {
// // //       alert("Select at least one FITS file first.");
// // //       return;
// // //     }

// // //     const data = new FormData();
// // //     data.append("file", files[0]);

// // //     try {
// // //       const res = await api.post("/show-raw", data);
// // //       setRawImage(`${BACKEND_URL}${res.data.raw_image}`);
// // //     } catch (err) {
// // //       console.error(err.response ?? err);
// // //       alert("Raw preview failed.");
// // //     }
// // //   };

// // //   // ---------------- Progress Polling ----------------
// // //   useEffect(() => {
// // //     if (!jobId) return;

// // //     const interval = setInterval(async () => {
// // //       try {
// // //         const res = await api.get(`/status/${jobId}`);
// // //         if (res.data.total) {
// // //           setProgress(
// // //             Math.round((res.data.done / res.data.total) * 100)
// // //           );
// // //         }
// // //       } catch (err) {
// // //         console.error(err);
// // //       }
// // //     }, 2000);

// // //     return () => clearInterval(interval);
// // //   }, [jobId]);

// // //   // ---------------- Canvas Viewer ----------------
// // //   function ImageViewer({ src }) {
// // //     const canvasRef = useRef();
// // //     const [scale, setScale] = useState(1);
// // //     const [offset, setOffset] = useState({ x: 0, y: 0 });

// // //     useEffect(() => {
// // //       if (!src) return;
// // //       const img = new Image();
// // //       img.src = src;
// // //       img.onload = () => {
// // //         const ctx = canvasRef.current.getContext("2d");
// // //         ctx.clearRect(0, 0, 400, 400);

// // //         const scaleX = 400 / img.width;
// // //         const scaleY = 400 / img.height;
// // //         const fitScale = Math.min(scaleX, scaleY) * scale;

// // //         ctx.setTransform(fitScale, 0, 0, fitScale, offset.x, offset.y);
// // //         ctx.drawImage(img, 0, 0);
// // //       };
// // //     }, [src, scale, offset]);

// // //     return (
// // //       <canvas
// // //         ref={canvasRef}
// // //         width={400}
// // //         height={400}
// // //         style={{ border: "1px solid black" }}
// // //         onWheel={(e) =>
// // //           setScale((s) => Math.max(0.5, s - e.deltaY * 0.001))
// // //         }
// // //         onMouseMove={(e) =>
// // //           e.buttons === 1 &&
// // //           setOffset((o) => ({
// // //             x: o.x + e.movementX,
// // //             y: o.y + e.movementY,
// // //           }))
// // //         }
// // //       />
// // //     );
// // //   }

// // //   // ---------------- UI ----------------
// // //   return (
// // //     <div style={{ padding: 20 }}>
// // //       <h1>Exoplanet Detection Direct Imaging</h1>

// // //       <input type="file" multiple onChange={handleUpload} />

// // //       <br /><br />

// // //       <button onClick={handleShowRaw}>
// // //         Show Raw Image
// // //       </button>

// // //       {/* RAW Preview */}
// // //       {rawImage && (
// // //         <div style={{ marginTop: 20 }}>
// // //           <h2>Raw FITS Preview</h2>
// // //           <ImageViewer src={rawImage} />
// // //         </div>
// // //       )}

// // //       {/* Progress */}
// // //       {progress > 0 && progress < 100 && (
// // //         <div>
// // //           <progress value={progress} max="100" />
// // //           <p>{progress}% processed</p>
// // //         </div>
// // //       )}

// // //       {/* Processed Results */}
// // //       {results && (
// // //         <div style={{ marginTop: 20 }}>
// // //           <h2>Processed Results</h2>

// // //           {results.output_type === "gif" && (
// // //             <img
// // //               src={`${BACKEND_URL}${results.preview_url}`}
// // //               width={400}
// // //               alt="GIF"
// // //             />
// // //           )}

// // //           <br />

// // //           <a
// // //             href={`${BACKEND_URL}/download/${results.output_type}`}
// // //             download
// // //           >
// // //             Download {results.output_type.toUpperCase()}
// // //           </a>

// // //           <div style={{ marginTop: 10 }}>
// // //             <button onClick={() => setViewMode("snr")}>
// // //               SNR Map
// // //             </button>
// // //             <button onClick={() => setViewMode("lr")}>
// // //               LR Map
// // //             </button>
// // //           </div>

// // //           <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
// // //             {results.detections.map((d, i) => (
// // //               <div key={i}>
// // //                 <p>{d.frame}</p>
// // //                 <p>SNR: {d.snr.toFixed(2)}</p>
// // //                 <ImageViewer
// // //                   src={`${BACKEND_URL}${viewMode === "snr"
// // //                     ? d.snr_image
// // //                     : d.lr_image}`}
// // //                 />
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import { useState, useRef, useEffect } from "react";
// // import { api } from "./api";

// // const BACKEND_URL = "import.meta.env.VITE_API_URL";

// // const DEFAULT_PARAMS = {
// //   bkg_filter_size: 101,
// //   psf_sigma: 2.0,
// //   psf_size: 9,
// //   snr_threshold: 5.0,
// //   thresh_fraction: 0.5,
// //   min_sep_pix: 55,
// //   circle_radius: 30,
// //   circle_color: "lime",
// //   snr_cmap: "inferno",
// //   animation_fps: 3,
// //   edge_crop: 25,
// // };

// // const CIRCLE_COLORS = ["lime", "red", "white", "orange", "yellow", "cyan", "magenta"];
// // const SNR_CMAPS     = ["inferno", "viridis", "plasma", "magma", "coolwarm", "RdYlBu_r", "seismic", "gray"];
// // const VIEW_MODES    = ["raw", "enhanced", "snr", "lr"];
// // const VIEW_LABELS   = { raw: "Raw Image", enhanced: "Enhanced Image", snr: "SNR Map", lr: "LR Map" };

// // // ── Canvas image viewer with zoom + pan ──────────────────────────────────────
// // function ImageViewer({ src }) {
// //   const canvasRef = useRef();
// //   const [scale, setScale]   = useState(1);
// //   const [offset, setOffset] = useState({ x: 0, y: 0 });

// //   useEffect(() => {
// //     if (!src || !canvasRef.current) return;
// //     const img = new Image();
// //     img.src = src;
// //     img.onload = () => {
// //       const ctx = canvasRef.current.getContext("2d");
// //       ctx.clearRect(0, 0, 400, 400);
// //       const fit = Math.min(400 / img.width, 400 / img.height) * scale;
// //       ctx.setTransform(fit, 0, 0, fit, offset.x, offset.y);
// //       ctx.drawImage(img, 0, 0);
// //     };
// //   }, [src, scale, offset]);

// //   return (
// //     <canvas
// //       ref={canvasRef}
// //       width={400}
// //       height={400}
// //       style={{ border: "1px solid #444", background: "#000", cursor: "grab" }}
// //       onWheel={(e) => setScale((s) => Math.max(0.3, Math.min(8, s - e.deltaY * 0.001)))}
// //       onMouseMove={(e) =>
// //         e.buttons === 1 &&
// //         setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))
// //       }
// //     />
// //   );
// // }

// // // ── Main component ────────────────────────────────────────────────────────────
// // export default function HomeView({ results, setResults }) {
// //   const [files, setFiles]     = useState([]);
// //   const [progress, setProgress] = useState(0);
// //   const [jobId, setJobId]     = useState(null);
// //   const [viewMode, setViewMode] = useState("snr");
// //   const [params, setParams]   = useState(DEFAULT_PARAMS);
// //   const [loading, setLoading] = useState(false);

// //   // ── param change helper ───────────────────────────────────────────────────
// //   const setParam = (key, val) =>
// //     setParams((p) => ({ ...p, [key]: val }));

// //   // ── upload ────────────────────────────────────────────────────────────────
// //   const handleUpload = async (e) => {
// //     const fileList = e.target.files;
// //     if (!fileList.length) return;
// //     setFiles([...fileList]);
// //     setLoading(true);
// //     setProgress(0);

// //     const data = new FormData();
// //     for (let f of fileList) data.append("files", f);
// //     data.append("params", JSON.stringify(params));

// //     try {
// //       const res = await api.post("/upload", data);
// //       setResults(res.data);
// //       setJobId(res.data.job_id);
// //     } catch (err) {
// //       console.error(err.response ?? err);
// //       alert("Upload or processing failed!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ── progress polling ──────────────────────────────────────────────────────
// //   useEffect(() => {
// //     if (!jobId) return;
// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await api.get(`/status/${jobId}`);
// //         if (res.data.total)
// //           setProgress(Math.round((res.data.done / res.data.total) * 100));
// //       } catch {}
// //     }, 2000);
// //     return () => clearInterval(interval);
// //   }, [jobId]);

// //   // ── helpers ───────────────────────────────────────────────────────────────
// //   const imageKey = { raw: "raw_image", enhanced: "enhanced_image", snr: "snr_image", lr: "lr_image" };

// //   const downloadFile = (url, name) => {
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = name;
// //     a.click();
// //   };

// //   // ── styles ────────────────────────────────────────────────────────────────
// //   const s = {
// //     page:    { padding: 24, fontFamily: "sans-serif", background: "#111", color: "#eee", minHeight: "100vh" },
// //     card:    { background: "#1e1e1e", borderRadius: 8, padding: 16, marginBottom: 16 },
// //     label:   { fontSize: 12, color: "#aaa", marginBottom: 4, display: "block" },
// //     input:   { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
// //                 padding: "4px 8px", width: "100%", boxSizing: "border-box" },
// //     select:  { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
// //                 padding: "4px 8px", width: "100%" },
// //     btn:     { padding: "6px 14px", borderRadius: 4, border: "none", cursor: "pointer",
// //                 fontWeight: "bold", fontSize: 13 },
// //     tabActive:   { background: "#4a9eff", color: "#fff" },
// //     tabInactive: { background: "#333", color: "#bbb" },
// //     dlBtn:   { background: "#2a6e2a", color: "#fff", fontSize: 11, padding: "3px 8px",
// //                 borderRadius: 3, border: "none", cursor: "pointer", marginLeft: 4 },
// //     grid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 16 },
// //     imgCard: { background: "#1a1a1a", borderRadius: 6, padding: 12 },
// //     row:     { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
// //   };

// //   // ── parameter panel ───────────────────────────────────────────────────────
// //   const ParamRow = ({ label, paramKey, type = "number", step = 1, min = 0 }) => (
// //     <div style={{ minWidth: 150 }}>
// //       <label style={s.label}>{label}</label>
// //       <input
// //         type={type}
// //         step={step}
// //         min={min}
// //         value={params[paramKey]}
// //         style={s.input}
// //         onChange={(e) =>
// //           setParam(paramKey, type === "number" ? parseFloat(e.target.value) : e.target.value)
// //         }
// //       />
// //     </div>
// //   );

// //   // ── render ────────────────────────────────────────────────────────────────
// //   return (
// //     <div style={s.page}>
// //       <h1 style={{ marginBottom: 20, fontSize: 22 }}>🔭 Exoplanet Direct Imaging Detection</h1>

// //       {/* ── PARAMETERS ── */}
// //       <div style={s.card}>
// //         <h3 style={{ marginTop: 0, marginBottom: 12 }}>Parameters</h3>
// //         <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// //           <ParamRow label="BKG Filter Size"  paramKey="bkg_filter_size" />
// //           <ParamRow label="PSF Sigma"        paramKey="psf_sigma"       step={0.1} />
// //           <ParamRow label="PSF Size"         paramKey="psf_size"        />
// //           <ParamRow label="SNR Threshold"    paramKey="snr_threshold"   step={0.5} />
// //           <ParamRow label="Thresh Fraction" paramKey="thresh_fraction" step={0.05} min={0} />
// //           <ParamRow label="Min Sep (px)"     paramKey="min_sep_pix"     />
// //           <ParamRow label="Circle Radius"    paramKey="circle_radius"   />
// //           <ParamRow label="Edge Crop"        paramKey="edge_crop"       />
// //           <ParamRow label="Animation FPS"    paramKey="animation_fps"   />

// //           {/* Circle colour dropdown */}
// //           <div style={{ minWidth: 150 }}>
// //             <label style={s.label}>Circle Colour</label>
// //             <select style={s.select} value={params.circle_color}
// //               onChange={(e) => setParam("circle_color", e.target.value)}>
// //               {CIRCLE_COLORS.map((c) => (
// //                 <option key={c} value={c}>{c}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* SNR cmap dropdown */}
// //           <div style={{ minWidth: 150 }}>
// //             <label style={s.label}>SNR Colormap</label>
// //             <select style={s.select} value={params.snr_cmap}
// //               onChange={(e) => setParam("snr_cmap", e.target.value)}>
// //               {SNR_CMAPS.map((c) => (
// //                 <option key={c} value={c}>{c}</option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>

// //         <div style={{ marginTop: 12 }}>
// //           <button style={{ ...s.btn, background: "#555", color: "#eee" }}
// //             onClick={() => setParams(DEFAULT_PARAMS)}>
// //             Reset to Defaults
// //           </button>
// //         </div>
// //       </div>

// //       {/* ── UPLOAD ── */}
// //       <div style={s.card}>
// //         <h3 style={{ marginTop: 0, marginBottom: 8 }}>Upload FITS Files</h3>
// //         <input type="file" multiple accept=".fits,.fit,.fts"
// //           onChange={handleUpload} style={{ color: "#eee" }} />
// //         {loading && <p style={{ color: "#4a9eff" }}>⏳ Processing...</p>}
// //         {progress > 0 && progress < 100 && (
// //           <div style={{ marginTop: 8 }}>
// //             <progress value={progress} max="100" style={{ width: "100%" }} />
// //             <p style={{ fontSize: 12, color: "#aaa" }}>{progress}% done</p>
// //           </div>
// //         )}
// //       </div>

// //       {/* ── RESULTS ── */}
// //       {results && (
// //         <div>
// //           {/* ── VIEW MODE TABS ── */}
// //           <div style={{ ...s.row, marginBottom: 16 }}>
// //             {VIEW_MODES.map((mode) => (
// //               <button key={mode}
// //                 style={{ ...s.btn, ...(viewMode === mode ? s.tabActive : s.tabInactive) }}
// //                 onClick={() => setViewMode(mode)}>
// //                 {VIEW_LABELS[mode]}
// //               </button>
// //             ))}
// //           </div>

// //           {/* ── PER-MODE DOWNLOAD BUTTONS ── */}
// //           <div style={{ ...s.card, ...s.row }}>
// //             <span style={{ fontWeight: "bold", marginRight: 8 }}>
// //               {VIEW_LABELS[viewMode]} Downloads:
// //             </span>
// //             <button style={{ ...s.btn, background: "#2a5c8a", color: "#fff" }}
// //               onClick={() => downloadFile(
// //                 `${BACKEND_URL}/download/exoplanet_${viewMode}.${results.output_type}`,
// //                 `exoplanet_${viewMode}.${results.output_type}`
// //               )}>
// //               ⬇ {results.output_type.toUpperCase()} ({VIEW_LABELS[viewMode]})
// //             </button>
// //             <button style={{ ...s.btn, background: "#2a6e2a", color: "#fff" }}
// //               onClick={() => downloadFile(
// //                 `${BACKEND_URL}/download/exoplanet_${viewMode}.zip`,
// //                 `exoplanet_${viewMode}.zip`
// //               )}>
// //               ⬇ ZIP ({VIEW_LABELS[viewMode]})
// //             </button>
// //           </div>

// //           {/* ── ANIMATION PREVIEW ── */}
// //           {results.output_type === "gif" && results.animations?.[viewMode] && (
// //             <div style={{ ...s.card, textAlign: "center" }}>
// //               <p style={{ marginBottom: 8, fontWeight: "bold" }}>
// //                 {VIEW_LABELS[viewMode]} — Animation Preview
// //               </p>
// //               <img
// //                 src={`${BACKEND_URL}${results.animations[viewMode]}?t=${Date.now()}`}
// //                 style={{ maxWidth: "100%", borderRadius: 4 }}
// //                 alt={`${viewMode} animation`}
// //               />
// //             </div>
// //           )}

// //           {/* ── IMAGE GRID ── */}
// //           <div style={s.grid}>
// //             {results.detections.map((d, i) => {
// //               const imgSrc = `${BACKEND_URL}${d[imageKey[viewMode]]}`;
// //               return (
// //                 <div key={i} style={s.imgCard}>
// //                   <div style={{ ...s.row, marginBottom: 6 }}>
// //                     <span style={{ fontWeight: "bold", flex: 1, fontSize: 13 }}>
// //                       {d.frame}
// //                     </span>
// //                     {/* Per-image download button */}
// //                     <button style={s.dlBtn}
// //                       onClick={() => downloadFile(
// //                         `${BACKEND_URL}/download/${d[imageKey[viewMode].replace("_image", "_png")]}`,
// //                         d[imageKey[viewMode].replace("_image", "_png")]
// //                       )}>
// //                       ⬇ PNG
// //                     </button>
// //                   </div>

// //                   <p style={{ fontSize: 12, color: "#aaa", margin: "4px 0" }}>
// //                     Peak SNR: <b style={{ color: "#fff" }}>{d.snr.toFixed(2)}</b>
// //                     {" · "}Candidates: <b style={{ color: "#4aff7f" }}>{d.detections.length}</b>
// //                   </p>

// //                   {d.detections.length > 0 && (
// //                     <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>
// //                       {d.detections.map((det, j) => (
// //                         <div key={j}>
// //                           #{j + 1} x={det.x} y={det.y} SNR={det.snr.toFixed(1)} sep={det.sep_pix.toFixed(1)}px
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}

// //                   <ImageViewer src={imgSrc} />
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useRef, useEffect } from "react";
// import { api } from "./api";

// const BACKEND_URL = "import.meta.env.VITE_API_URL";

// const DEFAULT_PARAMS = {
//   bkg_filter_size: 101,
//   psf_sigma: 2.0,
//   psf_size: 9,
//   snr_threshold: 5.0,
//   thresh_fraction: 0.5,
//   min_sep_pix: 55,
//   circle_radius: 30,
//   circle_color: "lime",
//   snr_cmap: "inferno",
//   animation_fps: 3,
//   edge_crop: 25,
// };

// const CIRCLE_COLORS = ["lime", "red", "white", "orange", "yellow", "cyan", "magenta"];
// const SNR_CMAPS     = ["inferno", "viridis", "plasma", "magma", "coolwarm", "RdYlBu_r", "seismic", "gray"];
// const VIEW_MODES    = ["raw", "enhanced", "snr", "lr"];
// const VIEW_LABELS   = { raw: "Raw Image", enhanced: "Enhanced Image", snr: "SNR Map", lr: "LR Map" };

// // Loading steps that cycle while processing
// const LOADING_STEPS = [
//   "Reading FITS file headers...",
//   "Cropping border artifacts...",
//   "Subtracting background noise...",
//   "Masking artifact columns & rows...",
//   "Masking coronagraph center...",
//   "Enhancing image contrast (90–99.9th percentile)...",
//   "Building Gaussian PSF kernel...",
//   "Running matched filter (SNR conversion)...",
//   "Computing likelihood ratio map...",
//   "Detecting planet candidates...",
//   "Applying non-maximum suppression...",
//   "Rendering output images...",
//   "Building animation frames...",
//   "Packaging ZIP downloads...",
//   "Almost done...",
// ];

// // Parse backend error into human-readable message
// function parseError(err) {
//   const status = err?.response?.status;
//   const detail = err?.response?.data?.detail || err?.response?.data || err?.message || "";

//   if (status === 422) {
//     return {
//       title: "Invalid Parameters",
//       message: "One or more parameters are out of range or the wrong type. Check values like PSF Size, SNR Threshold, or BKG Filter Size and try again.",
//     };
//   }
//   if (status === 413 || String(detail).toLowerCase().includes("size")) {
//     return {
//       title: "File Too Large",
//       message: "One or more FITS files exceed the upload size limit. Try uploading fewer files at once or smaller files.",
//     };
//   }
//   if (String(detail).toLowerCase().includes("fits") || String(detail).toLowerCase().includes("hdu")) {
//     return {
//       title: "Invalid FITS File",
//       message: "One of the uploaded files could not be read as a valid FITS image. Make sure all files are proper .fits/.fit/.fts telescope data files.",
//     };
//   }
//   if (String(detail).toLowerCase().includes("crop") || String(detail).toLowerCase().includes("edge")) {
//     return {
//       title: "Edge Crop Too Large",
//       message: "The Edge Crop value is too large for the image size. Try reducing it (default is 25 pixels).",
//     };
//   }
//   if (status === 500) {
//     return {
//       title: "Processing Error",
//       message: `The server encountered an error while processing your images. This may be caused by unusual image dimensions, corrupt FITS data, or an extreme parameter value. Technical detail: ${String(detail).slice(0, 200)}`,
//     };
//   }
//   if (!navigator.onLine || String(detail).toLowerCase().includes("network")) {
//     return {
//       title: "Connection Error",
//       message: "Could not reach the backend server. Make sure uvicorn is running on import.meta.env.VITE_API_URL.",
//     };
//   }
//   return {
//     title: "Something Went Wrong",
//     message: detail
//       ? `The server returned: "${String(detail).slice(0, 300)}"`
//       : "An unexpected error occurred. Please check that your FITS files are valid and your parameters are reasonable.",
//   };
// }

// // ── Error Dialog ─────────────────────────────────────────────────────────────
// function ErrorDialog({ error, onClose }) {
//   if (!error) return null;
//   return (
//     <div style={{
//       position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       zIndex: 1000, backdropFilter: "blur(4px)",
//     }}>
//       <div style={{
//         background: "#1a1a1a", border: "1px solid #c0392b",
//         borderRadius: 12, padding: 32, maxWidth: 480, width: "90%",
//         boxShadow: "0 0 40px rgba(192,57,43,0.3)",
//       }}>
//         {/* Icon + Title */}
//         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
//           <span style={{ fontSize: 28 }}>⚠️</span>
//           <h2 style={{ margin: 0, color: "#e74c3c", fontSize: 18, fontFamily: "monospace" }}>
//             {error.title}
//           </h2>
//         </div>

//         {/* Message */}
//         <p style={{
//           color: "#ccc", fontSize: 14, lineHeight: 1.6,
//           margin: "0 0 24px 0", fontFamily: "sans-serif",
//         }}>
//           {error.message}
//         </p>

//         {/* Suggestions */}
//         <div style={{
//           background: "#111", borderRadius: 8, padding: 12,
//           marginBottom: 24, borderLeft: "3px solid #e67e22",
//         }}>
//           <p style={{ color: "#e67e22", fontSize: 12, margin: "0 0 6px 0", fontWeight: "bold" }}>
//             💡 What to try:
//           </p>
//           <ul style={{ color: "#aaa", fontSize: 12, margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
//             <li>Confirm your files are valid FITS telescope images</li>
//             <li>Try resetting parameters to defaults</li>
//             <li>Reduce Edge Crop if images are small</li>
//             <li>Make sure uvicorn is running on port 8000</li>
//           </ul>
//         </div>

//         <button
//           onClick={onClose}
//           style={{
//             width: "100%", padding: "10px 0", background: "#c0392b",
//             color: "#fff", border: "none", borderRadius: 6,
//             fontWeight: "bold", fontSize: 14, cursor: "pointer",
//             letterSpacing: 1,
//           }}
//         >
//           DISMISS
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Loading Overlay ───────────────────────────────────────────────────────────
// function LoadingOverlay({ fileCount, stepIndex, progress }) {
//   const step = LOADING_STEPS[stepIndex % LOADING_STEPS.length];
//   return (
//     <div style={{
//       background: "#111", border: "1px solid #333",
//       borderRadius: 10, padding: "20px 24px", marginTop: 16,
//     }}>
//       {/* Spinner row */}
//       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
//         <span style={{ fontSize: 20, animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</span>
//         <span style={{ color: "#4a9eff", fontWeight: "bold", fontSize: 14 }}>
//           Processing {fileCount} file{fileCount !== 1 ? "s" : ""}...
//         </span>
//       </div>

//       {/* Current step — italic */}
//       <p style={{
//         color: "#aaa", fontSize: 13, fontStyle: "italic",
//         margin: "0 0 14px 0", fontFamily: "monospace",
//         borderLeft: "2px solid #4a9eff", paddingLeft: 10,
//       }}>
//         Loading... {step}
//       </p>

//       {/* Progress bar */}
//       {progress > 0 && (
//         <>
//           <div style={{
//             background: "#222", borderRadius: 4, height: 6,
//             overflow: "hidden", marginBottom: 6,
//           }}>
//             <div style={{
//               height: "100%", width: `${progress}%`,
//               background: "linear-gradient(90deg, #4a9eff, #7b61ff)",
//               borderRadius: 4, transition: "width 0.4s ease",
//             }} />
//           </div>
//           <p style={{ color: "#555", fontSize: 11, margin: 0, textAlign: "right" }}>
//             {progress}% complete
//           </p>
//         </>
//       )}

//       <style>{`
//         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }

// // ── Canvas image viewer with zoom + pan ──────────────────────────────────────
// function ImageViewer({ src }) {
//   const canvasRef = useRef();
//   const [scale, setScale]   = useState(1);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     if (!src || !canvasRef.current) return;
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, 400, 400);
//       const fit = Math.min(400 / img.width, 400 / img.height) * scale;
//       ctx.setTransform(fit, 0, 0, fit, offset.x, offset.y);
//       ctx.drawImage(img, 0, 0);
//     };
//   }, [src, scale, offset]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={400} height={400}
//       style={{ border: "1px solid #444", background: "#000", cursor: "grab", borderRadius: 4 }}
//       onWheel={(e) => setScale((s) => Math.max(0.3, Math.min(8, s - e.deltaY * 0.001)))}
//       onMouseMove={(e) =>
//         e.buttons === 1 &&
//         setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))
//       }
//     />
//   );
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export default function HomeView({ results, setResults }) {
//   const [files, setFiles]       = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [jobId, setJobId]       = useState(null);
//   const [viewMode, setViewMode] = useState("snr");
//   const [params, setParams]     = useState(DEFAULT_PARAMS);
//   const [loading, setLoading]   = useState(false);
//   const [stepIndex, setStepIndex] = useState(0);
//   const [error, setError]       = useState(null);

//   const setParam = (key, val) => setParams((p) => ({ ...p, [key]: val }));

//   // Cycle loading steps while processing
//   useEffect(() => {
//     if (!loading) return;
//     const interval = setInterval(() => {
//       setStepIndex((i) => i + 1);
//     }, 1800);
//     return () => clearInterval(interval);
//   }, [loading]);

//   // Progress polling
//   useEffect(() => {
//     if (!jobId) return;
//     const interval = setInterval(async () => {
//       try {
//         const res = await api.get(`/status/${jobId}`);
//         if (res.data.total)
//           setProgress(Math.round((res.data.done / res.data.total) * 100));
//       } catch {}
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [jobId]);

//   const handleUpload = async (e) => {
//     const fileList = e.target.files;
//     if (!fileList.length) return;
//     setFiles([...fileList]);
//     setLoading(true);
//     setStepIndex(0);
//     setProgress(0);
//     setError(null);
//     setResults(null);

//     const data = new FormData();
//     for (let f of fileList) data.append("files", f);
//     data.append("params", JSON.stringify(params));

//     try {
//       const res = await api.post("/upload", data);
//       setResults(res.data);
//       setJobId(res.data.job_id);
//     } catch (err) {
//       setError(parseError(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const imageKey = { raw: "raw_image", enhanced: "enhanced_image", snr: "snr_image", lr: "lr_image" };

//   const downloadFile = (url, name) => {
//     const a = document.createElement("a");
//     a.href = url; a.download = name; a.click();
//   };

//   const s = {
//     page:    { padding: 24, fontFamily: "sans-serif", background: "#111", color: "#eee", minHeight: "100vh" },
//     card:    { background: "#1e1e1e", borderRadius: 8, padding: 16, marginBottom: 16 },
//     label:   { fontSize: 12, color: "#aaa", marginBottom: 4, display: "block" },
//     input:   { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
//                padding: "4px 8px", width: "100%", boxSizing: "border-box" },
//     select:  { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4,
//                padding: "4px 8px", width: "100%" },
//     btn:     { padding: "6px 14px", borderRadius: 4, border: "none", cursor: "pointer",
//                fontWeight: "bold", fontSize: 13 },
//     tabActive:   { background: "#4a9eff", color: "#fff" },
//     tabInactive: { background: "#333", color: "#bbb" },
//     dlBtn:   { background: "#2a6e2a", color: "#fff", fontSize: 11, padding: "3px 8px",
//                borderRadius: 3, border: "none", cursor: "pointer", marginLeft: 4 },
//     grid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 16 },
//     imgCard: { background: "#1a1a1a", borderRadius: 6, padding: 12 },
//     row:     { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
//   };

//   const ParamRow = ({ label, paramKey, type = "number", step = 1, min = 0 }) => (
//     <div style={{ minWidth: 150 }}>
//       <label style={s.label}>{label}</label>
//       <input
//         type={type} step={step} min={min}
//         value={params[paramKey]} style={s.input}
//         onChange={(e) =>
//           setParam(paramKey, type === "number" ? parseFloat(e.target.value) : e.target.value)
//         }
//       />
//     </div>
//   );

//   return (
//     <div style={s.page}>
//       {/* Error dialog */}
//       <ErrorDialog error={error} onClose={() => setError(null)} />

//       <h1 style={{ marginBottom: 20, fontSize: 22 }}>🔭 Exoplanet Direct Imaging Detection</h1>

//       {/* Parameters */}
//       <div style={s.card}>
//         <h3 style={{ marginTop: 0, marginBottom: 12 }}>Parameters</h3>
//         <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//           <ParamRow label="BKG Filter Size"   paramKey="bkg_filter_size" />
//           <ParamRow label="PSF Sigma"         paramKey="psf_sigma"       step={0.1} />
//           <ParamRow label="PSF Size"          paramKey="psf_size" />
//           <ParamRow label="SNR Threshold"     paramKey="snr_threshold"   step={0.5} />
//           <ParamRow label="Thresh Fraction"   paramKey="thresh_fraction" step={0.05} />
//           <ParamRow label="Min Sep (px)"      paramKey="min_sep_pix" />
//           <ParamRow label="Circle Radius"     paramKey="circle_radius" />
//           <ParamRow label="Edge Crop"         paramKey="edge_crop" />
//           <ParamRow label="Animation FPS"     paramKey="animation_fps" />
//           <div style={{ minWidth: 150 }}>
//             <label style={s.label}>Circle Colour</label>
//             <select style={s.select} value={params.circle_color}
//               onChange={(e) => setParam("circle_color", e.target.value)}>
//               {CIRCLE_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>
//           <div style={{ minWidth: 150 }}>
//             <label style={s.label}>SNR Colormap</label>
//             <select style={s.select} value={params.snr_cmap}
//               onChange={(e) => setParam("snr_cmap", e.target.value)}>
//               {SNR_CMAPS.map((c) => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>
//         </div>
//         <div style={{ marginTop: 12 }}>
//           <button style={{ ...s.btn, background: "#555", color: "#eee" }}
//             onClick={() => setParams(DEFAULT_PARAMS)}>
//             Reset to Defaults
//           </button>
//         </div>
//       </div>

//       {/* Upload */}
//       <div style={s.card}>
//         <h3 style={{ marginTop: 0, marginBottom: 8 }}>Upload FITS Files</h3>
//         <input type="file" multiple accept=".fits,.fit,.fts"
//           onChange={handleUpload} style={{ color: "#eee" }} />

//         {loading && (
//           <LoadingOverlay
//             fileCount={files.length}
//             stepIndex={stepIndex}
//             progress={progress}
//           />
//         )}
//       </div>

//       {/* Results */}
//       {results && (
//         <div>
//           <div style={{ ...s.row, marginBottom: 16 }}>
//             {VIEW_MODES.map((mode) => (
//               <button key={mode}
//                 style={{ ...s.btn, ...(viewMode === mode ? s.tabActive : s.tabInactive) }}
//                 onClick={() => setViewMode(mode)}>
//                 {VIEW_LABELS[mode]}
//               </button>
//             ))}
//           </div>

//           <div style={{ ...s.card, ...s.row }}>
//             <span style={{ fontWeight: "bold", marginRight: 8 }}>
//               {VIEW_LABELS[viewMode]} Downloads:
//             </span>
//             <button style={{ ...s.btn, background: "#2a5c8a", color: "#fff" }}
//               onClick={() => downloadFile(
//                 `${BACKEND_URL}/download/exoplanet_${viewMode}.${results.output_type}`,
//                 `exoplanet_${viewMode}.${results.output_type}`
//               )}>
//               ⬇ {results.output_type.toUpperCase()} ({VIEW_LABELS[viewMode]})
//             </button>
//             <button style={{ ...s.btn, background: "#2a6e2a", color: "#fff" }}
//               onClick={() => downloadFile(
//                 `${BACKEND_URL}/download/exoplanet_${viewMode}.zip`,
//                 `exoplanet_${viewMode}.zip`
//               )}>
//               ⬇ ZIP ({VIEW_LABELS[viewMode]})
//             </button>
//           </div>

//           {results.output_type === "gif" && results.animations?.[viewMode] && (
//             <div style={{ ...s.card, textAlign: "center" }}>
//               <p style={{ marginBottom: 8, fontWeight: "bold" }}>
//                 {VIEW_LABELS[viewMode]} — Animation Preview
//               </p>
//               <img
//                 src={`${BACKEND_URL}${results.animations[viewMode]}?t=${Date.now()}`}
//                 style={{ maxWidth: "100%", borderRadius: 4 }}
//                 alt={`${viewMode} animation`}
//               />
//             </div>
//           )}

//           <div style={s.grid}>
//             {results.detections.map((d, i) => {
//               const imgSrc = `${BACKEND_URL}${d[imageKey[viewMode]]}`;
//               return (
//                 <div key={i} style={s.imgCard}>
//                   <div style={{ ...s.row, marginBottom: 6 }}>
//                     <span style={{ fontWeight: "bold", flex: 1, fontSize: 13 }}>{d.frame}</span>
//                     <button style={s.dlBtn}
//                       onClick={() => downloadFile(
//                         `${BACKEND_URL}/download/${d[imageKey[viewMode].replace("_image", "_png")]}`,
//                         d[imageKey[viewMode].replace("_image", "_png")]
//                       )}>
//                       ⬇ PNG
//                     </button>
//                   </div>
//                   <p style={{ fontSize: 12, color: "#aaa", margin: "4px 0" }}>
//                     Peak SNR: <b style={{ color: "#fff" }}>{d.snr.toFixed(2)}</b>
//                     {" · "}Candidates: <b style={{ color: "#4aff7f" }}>{d.detections.length}</b>
//                   </p>
//                   {d.detections.length > 0 && (
//                     <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>
//                       {d.detections.map((det, j) => (
//                         <div key={j}>
//                           #{j+1} x={det.x} y={det.y} SNR={det.snr.toFixed(1)} sep={det.sep_pix.toFixed(1)}px
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   <ImageViewer src={imgSrc} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { api } from "./api";

const BACKEND_URL = "import.meta.env.VITE_API_URL";

const DEFAULT_PARAMS = {
  bkg_filter_size: 101,
  psf_sigma: 2.0,
  psf_size: 9,
  snr_threshold: 5.0,
  thresh_fraction: 0.5,
  min_sep_pix: 55,
  circle_radius: 30,
  circle_color: "lime",
  snr_cmap: "inferno",
  animation_fps: 3,
  edge_crop: 25,
  top_n: 1,
};

const CIRCLE_COLORS = ["lime", "red", "white", "orange", "yellow", "cyan", "magenta"];
const SNR_CMAPS     = ["inferno", "viridis", "plasma", "magma", "coolwarm", "RdYlBu_r", "seismic", "gray"];
const VIEW_MODES    = ["raw", "enhanced", "snr", "lr"];
const VIEW_LABELS   = { raw: "Raw Image", enhanced: "Enhanced Image", snr: "SNR Map", lr: "LR Map" };

function parseError(err) {
  const status = err?.response?.status;
  const detail = err?.response?.data?.detail || err?.response?.data || err?.message || "";

  if (status === 422)
    return { title: "Invalid Parameters", message: "One or more parameters are out of range or the wrong type. Check values like PSF Size, SNR Threshold, or BKG Filter Size and try again." };
  if (status === 413 || String(detail).toLowerCase().includes("size"))
    return { title: "File Too Large", message: "One or more FITS files exceed the upload size limit. Try uploading fewer files at once or smaller files." };
  if (String(detail).toLowerCase().includes("fits") || String(detail).toLowerCase().includes("hdu"))
    return { title: "Invalid FITS File", message: "One of the uploaded files could not be read as a valid FITS image. Make sure all files are proper .fits / .fit / .fts telescope data files." };
  if (String(detail).toLowerCase().includes("crop") || String(detail).toLowerCase().includes("edge"))
    return { title: "Edge Crop Too Large", message: "The Edge Crop value is too large for the image size. Try reducing it (default is 25 pixels)." };
  if (status === 500)
    return { title: "Processing Error", message: `The server encountered an error while processing your images. This may be caused by unusual image dimensions, corrupt FITS data, or an extreme parameter value.\n\nDetail: ${String(detail).slice(0, 200)}` };
  if (!navigator.onLine)
    return { title: "Connection Error", message: "Could not reach the backend server. Make sure uvicorn is running on import.meta.env.VITE_API_URL." };
  return {
    title: "Something Went Wrong",
    message: detail ? `The server returned: "${String(detail).slice(0, 300)}"` : "An unexpected error occurred. Please check that your FITS files are valid and your parameters are reasonable.",
  };
}

// ── Error Dialog ──────────────────────────────────────────────────────────────
function ErrorDialog({ error, onClose }) {
  if (!error) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex",
                  alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #c0392b", borderRadius: 12,
                    padding: 32, maxWidth: 480, width: "90%", boxShadow: "0 0 40px rgba(192,57,43,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>⚠️</span>
          <h2 style={{ margin: 0, color: "#e74c3c", fontSize: 18, fontFamily: "monospace" }}>{error.title}</h2>
        </div>
        <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px 0", whiteSpace: "pre-line" }}>
          {error.message}
        </p>
        <div style={{ background: "#111", borderRadius: 8, padding: 12, marginBottom: 24, borderLeft: "3px solid #e67e22" }}>
          <p style={{ color: "#e67e22", fontSize: 12, margin: "0 0 6px 0", fontWeight: "bold" }}>💡 What to try:</p>
          <ul style={{ color: "#aaa", fontSize: 12, margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Confirm your files are valid FITS telescope images</li>
            <li>Try resetting parameters to defaults</li>
            <li>Reduce Edge Crop if images are small</li>
            <li>Make sure uvicorn is running on port 8000</li>
          </ul>
        </div>
        <button onClick={onClose}
          style={{ width: "100%", padding: "10px 0", background: "#c0392b", color: "#fff",
                   border: "none", borderRadius: 6, fontWeight: "bold", fontSize: 14,
                   cursor: "pointer", letterSpacing: 1 }}>
          DISMISS
        </button>
      </div>
    </div>
  );
}

// ── Loading Overlay — shows REAL step from backend ────────────────────────────
function LoadingOverlay({ fileCount, currentStep, done, total }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : null;
  return (
    <div style={{ background: "#111", border: "1px solid #333", borderRadius: 10,
                  padding: "20px 24px", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 20, display: "inline-block", animation: "spin 1.2s linear infinite" }}>⚙️</span>
        <span style={{ color: "#4a9eff", fontWeight: "bold", fontSize: 14 }}>
          Processing {fileCount} file{fileCount !== 1 ? "s" : ""}
          {total > 0 && ` — ${done} / ${total} done`}
        </span>
      </div>

      {/* Real-time step from backend */}
      <p style={{ color: "#aaa", fontSize: 13, fontStyle: "italic", margin: "0 0 14px 0",
                  fontFamily: "monospace", borderLeft: "2px solid #4a9eff", paddingLeft: 10,
                  minHeight: 20, transition: "all 0.2s" }}>
        {currentStep || "Initialising..."}
      </p>

      {/* Progress bar — only shown when multi-file */}
      {pct !== null && (
        <>
          <div style={{ background: "#222", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", width: `${pct}%`,
                          background: "linear-gradient(90deg, #4a9eff, #7b61ff)",
                          borderRadius: 4, transition: "width 0.4s ease" }} />
          </div>
          <p style={{ color: "#555", fontSize: 11, margin: 0, textAlign: "right" }}>{pct}%</p>
        </>
      )}

      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
    </div>
  );
}

// ── Canvas viewer ─────────────────────────────────────────────────────────────
function ImageViewer({ src }) {
  const canvasRef = useRef();
  const [scale, setScale]   = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!src || !canvasRef.current) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 400, 400);
      const fit = Math.min(400 / img.width, 400 / img.height) * scale;
      ctx.setTransform(fit, 0, 0, fit, offset.x, offset.y);
      ctx.drawImage(img, 0, 0);
    };
  }, [src, scale, offset]);

  return (
    <canvas ref={canvasRef} width={400} height={400}
      style={{ border: "1px solid #444", background: "#000", cursor: "grab", borderRadius: 4 }}
      onWheel={(e) => setScale((s) => Math.max(0.3, Math.min(8, s - e.deltaY * 0.001)))}
      onMouseMove={(e) => e.buttons === 1 &&
        setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }))}
    />
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HomeView({ results, setResults }) {
  const [files, setFiles]         = useState([]);
  const [jobId, setJobId]         = useState(null);
  const [viewMode, setViewMode]   = useState("snr");
  const [params, setParams]       = useState(DEFAULT_PARAMS);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [currentStep, setCurrentStep] = useState("");
  const [done, setDone]           = useState(0);
  const [total, setTotal]         = useState(0);

  const setParam = (key, val) => setParams((p) => ({ ...p, [key]: val }));

  // Poll /status for real step text
  useEffect(() => {
    if (!jobId || !loading) return;
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/status/${jobId}`);
        if (res.data.step)  setCurrentStep(res.data.step);
        if (res.data.done  !== undefined) setDone(res.data.done);
        if (res.data.total !== undefined) setTotal(res.data.total);
      } catch {}
    }, 600);  // poll every 600ms for snappy updates
    return () => clearInterval(interval);
  }, [jobId, loading]);

  const handleUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList.length) return;
    setFiles([...fileList]);
    setLoading(true);
    setCurrentStep("Uploading files...");
    setDone(0); setTotal(0);
    setError(null);
    setResults(null);

    const data = new FormData();
    for (let f of fileList) data.append("files", f);
    data.append("params", JSON.stringify(params));

    try {
      const res = await api.post("/upload", data);
      setResults(res.data);
      setJobId(res.data.job_id);
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
      setCurrentStep("");
    }
  };

  const imageKey = { raw: "raw_image", enhanced: "enhanced_image", snr: "snr_image", lr: "lr_image" };
  const downloadFile = (url, name) => { const a = document.createElement("a"); a.href = url; a.download = name; a.click(); };

  const s = {
    page:        { padding: 24, fontFamily: "sans-serif", background: "#111", color: "#eee", minHeight: "100vh" },
    card:        { background: "#1e1e1e", borderRadius: 8, padding: 16, marginBottom: 16 },
    label:       { fontSize: 12, color: "#aaa", marginBottom: 4, display: "block" },
    input:       { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4, padding: "4px 8px", width: "100%", boxSizing: "border-box" },
    select:      { background: "#333", color: "#eee", border: "1px solid #555", borderRadius: 4, padding: "4px 8px", width: "100%" },
    btn:         { padding: "6px 14px", borderRadius: 4, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: 13 },
    tabActive:   { background: "#4a9eff", color: "#fff" },
    tabInactive: { background: "#333", color: "#bbb" },
    dlBtn:       { background: "#2a6e2a", color: "#fff", fontSize: 11, padding: "3px 8px", borderRadius: 3, border: "none", cursor: "pointer", marginLeft: 4 },
    grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 16 },
    imgCard:     { background: "#1a1a1a", borderRadius: 6, padding: 12 },
    row:         { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  };

  const ParamRow = ({ label, paramKey, step = 1, min = 0 }) => (
    <div style={{ minWidth: 150 }}>
      <label style={s.label}>{label}</label>
      <input type="number" step={step} min={min} value={params[paramKey]} style={s.input}
        onChange={(e) => setParam(paramKey, parseFloat(e.target.value))} />
    </div>
  );

  return (
    <div style={s.page}>
      <ErrorDialog error={error} onClose={() => setError(null)} />

      <h1 style={{ marginBottom: 20, fontSize: 22 }}>🔭 Exoplanet Direct Imaging Detection</h1>

      {/* Parameters */}
      <div style={s.card}>
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>Parameters</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ParamRow label="BKG Filter Size"  paramKey="bkg_filter_size" />
          <ParamRow label="PSF Sigma"        paramKey="psf_sigma"       step={0.1} />
          <ParamRow label="PSF Size"         paramKey="psf_size" />
          <ParamRow label="SNR Threshold"    paramKey="snr_threshold"   step={0.5} />
          <ParamRow label="Thresh Fraction"  paramKey="thresh_fraction" step={0.05} />
          <ParamRow label="Min Sep (px)"     paramKey="min_sep_pix" />
          <ParamRow label="Circle Radius"    paramKey="circle_radius" />
          <ParamRow label="Edge Crop"        paramKey="edge_crop" />
          <ParamRow label="Animation FPS"    paramKey="animation_fps" />
          <ParamRow label="Top N Candidates (0=all)" paramKey="top_n" min={0} />
          <div style={{ minWidth: 150 }}>
            <label style={s.label}>Circle Colour</label>
            <select style={s.select} value={params.circle_color}
              onChange={(e) => setParam("circle_color", e.target.value)}>
              {CIRCLE_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ minWidth: 150 }}>
            <label style={s.label}>SNR Colormap</label>
            <select style={s.select} value={params.snr_cmap}
              onChange={(e) => setParam("snr_cmap", e.target.value)}>
              {SNR_CMAPS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <button style={{ ...s.btn, background: "#555", color: "#eee" }}
            onClick={() => setParams(DEFAULT_PARAMS)}>Reset to Defaults</button>
        </div>
      </div>

      {/* Upload */}
      <div style={s.card}>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Upload FITS Files</h3>
        <input type="file" multiple accept=".fits,.fit,.fts" onChange={handleUpload} style={{ color: "#eee" }} />
        {loading && <LoadingOverlay fileCount={files.length} currentStep={currentStep} done={done} total={total} />}
      </div>

      {/* Results */}
      {results && (
        <div>
          <div style={{ ...s.row, marginBottom: 16 }}>
            {VIEW_MODES.map((mode) => (
              <button key={mode} style={{ ...s.btn, ...(viewMode === mode ? s.tabActive : s.tabInactive) }}
                onClick={() => setViewMode(mode)}>{VIEW_LABELS[mode]}</button>
            ))}
          </div>

          <div style={{ ...s.card, ...s.row }}>
            <span style={{ fontWeight: "bold", marginRight: 8 }}>{VIEW_LABELS[viewMode]} Downloads:</span>
            <button style={{ ...s.btn, background: "#2a5c8a", color: "#fff" }}
              onClick={() => downloadFile(`${BACKEND_URL}/download/exoplanet_${viewMode}.${results.output_type}`,
                `exoplanet_${viewMode}.${results.output_type}`)}>
              ⬇ {results.output_type.toUpperCase()} ({VIEW_LABELS[viewMode]})
            </button>
            <button style={{ ...s.btn, background: "#2a6e2a", color: "#fff" }}
              onClick={() => downloadFile(`${BACKEND_URL}/download/exoplanet_${viewMode}.zip`,
                `exoplanet_${viewMode}.zip`)}>
              ⬇ ZIP ({VIEW_LABELS[viewMode]})
            </button>
          </div>

          {results.output_type === "gif" && results.animations?.[viewMode] && (
            <div style={{ ...s.card, textAlign: "center" }}>
              <p style={{ marginBottom: 8, fontWeight: "bold" }}>{VIEW_LABELS[viewMode]} — Animation Preview</p>
              <img src={`${BACKEND_URL}${results.animations[viewMode]}?t=${Date.now()}`}
                style={{ maxWidth: "100%", borderRadius: 4 }} alt={`${viewMode} animation`} />
            </div>
          )}

          <div style={s.grid}>
            {results.detections.map((d, i) => {
              const imgSrc = `${BACKEND_URL}${d[imageKey[viewMode]]}`;
              return (
                <div key={i} style={s.imgCard}>
                  <div style={{ ...s.row, marginBottom: 6 }}>
                    <span style={{ fontWeight: "bold", flex: 1, fontSize: 13 }}>{d.frame}</span>
                    <button style={s.dlBtn}
                      onClick={() => downloadFile(
                        `${BACKEND_URL}/download/${d[imageKey[viewMode].replace("_image","_png")]}`,
                        d[imageKey[viewMode].replace("_image","_png")])}>⬇ PNG</button>
                  </div>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "4px 0" }}>
                    Peak SNR: <b style={{ color: "#fff" }}>{d.snr.toFixed(2)}</b>
                    {" · "}Candidates: <b style={{ color: "#4aff7f" }}>{d.detections.length}</b>
                  </p>
                  {d.detections.length > 0 && (
                    <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>
                      {d.detections.map((det, j) => (
                        <div key={j}>#{j+1} x={det.x} y={det.y} SNR={det.snr.toFixed(1)} sep={det.sep_pix.toFixed(1)}px</div>
                      ))}
                    </div>
                  )}
                  <ImageViewer src={imgSrc} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
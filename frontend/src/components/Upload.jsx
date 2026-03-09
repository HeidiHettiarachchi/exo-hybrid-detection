// // // // // // // export default function Upload({ setData, setResults }) {
// // // // // // //   const upload = async (e) => {
// // // // // // //     const file = e.target.files[0];
// // // // // // //     const text = await file.text();

// // // // // // //     const rows = text.trim().split("\n").slice(1);
// // // // // // //     const parsed = rows.map(r => {
// // // // // // //       const [t, f] = r.split(",");
// // // // // // //       return { time: +t, flux: +f };
// // // // // // //     });

// // // // // // //     setData(parsed);

// // // // // // //     const form = new FormData();
// // // // // // //     form.append("file", file);

// // // // // // //     const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect", {
// // // // // // //       method: "POST",
// // // // // // //       body: form
// // // // // // //     });

// // // // // // //     setResults(await res.json());
// // // // // // //   };

// // // // // // //   return <input type="file" onChange={upload} />;
// // // // // // // }

// // // // // // // export default function Upload({ setResults }) {
// // // // // // //   const upload = async (e) => {
// // // // // // //     const file = e.target.files[0];

// // // // // // //     const form = new FormData();
// // // // // // //     form.append("file", file);

// // // // // // //     const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect", {
// // // // // // //       method: "POST",
// // // // // // //       body: form
// // // // // // //     });

// // // // // // //     const data = await res.json();
// // // // // // //     setResults(data); // <-- now results comes from backend
// // // // // // //   };

// // // // // // //   return <input type="file" onChange={upload} />;
// // // // // // // }


// // // // // // // export default function Upload({ setResults, setLightCurve }) {
// // // // // // //   const upload = async (e) => {
// // // // // // //     const file = e.target.files[0];
// // // // // // //     if (!file) return;

// // // // // // //     const form = new FormData();
// // // // // // //     form.append("file", file);

// // // // // // //     const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect", {
// // // // // // //       method: "POST",
// // // // // // //       body: form
// // // // // // //     });

// // // // // // //     const json = await res.json();

// // // // // // //     setResults(json);
// // // // // // //     setLightCurve(json.light_curve);
// // // // // // //   };

// // // // // // //   return <input type="file" onChange={upload} />;
// // // // // // // }



// // // // // // export default function Upload({ setResults, setLightCurve }) {
// // // // // //   const upload = async (e) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (!file) return;

// // // // // //     try {
// // // // // //       const form = new FormData();
// // // // // //       form.append("file", file);

// // // // // //       const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect", {
// // // // // //         method: "POST",
// // // // // //         body: form
// // // // // //       });

// // // // // //       const json = await res.json();

// // // // // //       if (!json.light_curve) {
// // // // // //         console.error("Backend response:", json);
// // // // // //         alert("Backend error. Check console.");
// // // // // //         return;
// // // // // //       }

// // // // // //       setResults(json);
// // // // // //       setLightCurve(json.light_curve);

// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       alert("Upload failed. Check console.");
// // // // // //     }
// // // // // //   };

// // // // // //   return <input type="file" onChange={upload} />;
// // // // // // }
// // // // // export default function Upload({ setResults, setLightCurve }) {
// // // // //   const parseCSV = (text) => {
// // // // //     const lines = text.trim().split("\n");
// // // // //     const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
// // // // //     const timeIdx = headers.findIndex(h => h.includes("time"));
// // // // //     const fluxIdx = headers.findIndex(h => h.includes("flux"));

// // // // //     if (timeIdx === -1 || fluxIdx === -1) {
// // // // //       alert("CSV must have 'time' and 'flux' columns.");
// // // // //       return null;
// // // // //     }

// // // // //     return lines.slice(1)
// // // // //       .map(row => {
// // // // //         const cols = row.split(",");
// // // // //         return { time: parseFloat(cols[timeIdx]), flux: parseFloat(cols[fluxIdx]) };
// // // // //       })
// // // // //       .filter(row => !isNaN(row.time) && !isNaN(row.flux));
// // // // //   };

// // // // //   const parseXML = (text) => {
// // // // //     const parser = new DOMParser();
// // // // //     const xml = parser.parseFromString(text, "application/xml");

// // // // //     // Try common XML formats: <row time="..." flux="..."> or <time>...</time><flux>...</flux>
// // // // //     const rows = xml.querySelectorAll("row, record, tr, datapoint, point, ROW");

// // // // //     if (rows.length > 0) {
// // // // //       const parsed = Array.from(rows).map(row => {
// // // // //         // Try attributes first
// // // // //         let time = parseFloat(row.getAttribute("time") || row.getAttribute("TIME"));
// // // // //         let flux = parseFloat(row.getAttribute("flux") || row.getAttribute("FLUX"));

// // // // //         // Fall back to child elements
// // // // //         if (isNaN(time)) time = parseFloat(row.querySelector("time, TIME, t, T")?.textContent);
// // // // //         if (isNaN(flux)) flux = parseFloat(row.querySelector("flux, FLUX, f, F")?.textContent);

// // // // //         return { time, flux };
// // // // //       }).filter(r => !isNaN(r.time) && !isNaN(r.flux));

// // // // //       if (parsed.length > 0) return parsed;
// // // // //     }

// // // // //     // Try VOTable format (used by MAST/NASA)
// // // // //     const fields = Array.from(xml.querySelectorAll("FIELD")).map(f =>
// // // // //       (f.getAttribute("name") || f.getAttribute("ID") || "").toLowerCase()
// // // // //     );
// // // // //     const timeIdx = fields.findIndex(f => f.includes("time"));
// // // // //     const fluxIdx = fields.findIndex(f => f.includes("flux"));

// // // // //     if (timeIdx !== -1 && fluxIdx !== -1) {
// // // // //       const tdElements = xml.querySelectorAll("TR");
// // // // //       return Array.from(tdElements).map(tr => {
// // // // //         const tds = tr.querySelectorAll("TD");
// // // // //         return {
// // // // //           time: parseFloat(tds[timeIdx]?.textContent),
// // // // //           flux: parseFloat(tds[fluxIdx]?.textContent)
// // // // //         };
// // // // //       }).filter(r => !isNaN(r.time) && !isNaN(r.flux));
// // // // //     }

// // // // //     alert("Could not parse XML. Expected <row time='' flux=''> or VOTable format.");
// // // // //     return null;
// // // // //   };

// // // // //   const parseTBL = (text) => {
// // // // //     const lines = text.trim().split("\n");

// // // // //     // TBL/IPAC format: lines starting with | are headers or separators, \ are comments
// // // // //     const headerLine = lines.find(l => l.startsWith("|") && !l.match(/^[|\-\s]+$/));
// // // // //     if (headerLine) {
// // // // //       const headers = headerLine.split("|").map(h => h.trim().toLowerCase()).filter(Boolean);
// // // // //       const timeIdx = headers.findIndex(h => h.includes("time"));
// // // // //       const fluxIdx = headers.findIndex(h => h.includes("flux"));

// // // // //       if (timeIdx === -1 || fluxIdx === -1) {
// // // // //         alert("TBL file must have 'time' and 'flux' columns.");
// // // // //         return null;
// // // // //       }

// // // // //       return lines
// // // // //         .filter(l => !l.startsWith("|") && !l.startsWith("\\") && l.trim())
// // // // //         .map(row => {
// // // // //           const cols = row.trim().split(/\s+/);
// // // // //           return { time: parseFloat(cols[timeIdx]), flux: parseFloat(cols[fluxIdx]) };
// // // // //         })
// // // // //         .filter(r => !isNaN(r.time) && !isNaN(r.flux));
// // // // //     }

// // // // //     // Plain whitespace-delimited table (no | headers)
// // // // //     const commentLines = lines.filter(l => l.startsWith("#"));
// // // // //     const headerFallback = commentLines[commentLines.length - 1]
// // // // //       ?.replace("#", "").trim().split(/\s+/).map(h => h.toLowerCase());

// // // // //     const timeIdx2 = headerFallback?.findIndex(h => h.includes("time")) ?? -1;
// // // // //     const fluxIdx2 = headerFallback?.findIndex(h => h.includes("flux")) ?? -1;

// // // // //     if (timeIdx2 !== -1 && fluxIdx2 !== -1) {
// // // // //       return lines
// // // // //         .filter(l => !l.startsWith("#") && l.trim())
// // // // //         .map(row => {
// // // // //           const cols = row.trim().split(/\s+/);
// // // // //           return { time: parseFloat(cols[timeIdx2]), flux: parseFloat(cols[fluxIdx2]) };
// // // // //         })
// // // // //         .filter(r => !isNaN(r.time) && !isNaN(r.flux));
// // // // //     }

// // // // //     // Last resort: assume first two columns are time and flux
// // // // //     return lines
// // // // //       .filter(l => !l.startsWith("#") && l.trim())
// // // // //       .map(row => {
// // // // //         const cols = row.trim().split(/\s+/);
// // // // //         return { time: parseFloat(cols[0]), flux: parseFloat(cols[1]) };
// // // // //       })
// // // // //       .filter(r => !isNaN(r.time) && !isNaN(r.flux));
// // // // //   };

// // // // //   const upload = async (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (!file) return;

// // // // //     const name = file.name.toLowerCase();
// // // // //     const isCSV  = name.endsWith(".csv");
// // // // //     const isXML  = name.endsWith(".xml") || name.endsWith(".vot");
// // // // //     const isTBL  = name.endsWith(".tbl") || name.endsWith(".ipac") || name.endsWith(".txt");
// // // // //     const isFITS = name.endsWith(".fits") || name.endsWith(".fit");

// // // // //     try {
// // // // //       let lightCurve = null;

// // // // //       if (isCSV || isXML || isTBL) {
// // // // //         const text = await file.text();
// // // // //         if (isCSV)       lightCurve = parseCSV(text);
// // // // //         else if (isXML)  lightCurve = parseXML(text);
// // // // //         else if (isTBL)  lightCurve = parseTBL(text);

// // // // //         if (!lightCurve || lightCurve.length === 0) {
// // // // //           alert("Could not parse file or no valid data found.");
// // // // //           return;
// // // // //         }

// // // // //         console.log(`✅ Parsed ${lightCurve.length} rows from ${file.name}`);

// // // // //         const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect/csv", {
// // // // //           method: "POST",
// // // // //           headers: { "Content-Type": "application/json" },
// // // // //           body: JSON.stringify({ light_curve: lightCurve })
// // // // //         });

// // // // //         const json = await res.json();
// // // // //         if (!json.light_curve) { console.error(json); alert("Backend error."); return; }

// // // // //         setResults(json);
// // // // //         setLightCurve(json.light_curve);

// // // // //       } else if (isFITS) {
// // // // //         const form = new FormData();
// // // // //         form.append("file", file);

// // // // //         const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect", {
// // // // //           method: "POST",
// // // // //           body: form
// // // // //         });

// // // // //         const json = await res.json();
// // // // //         if (!json.light_curve) { console.error(json); alert("Backend error."); return; }

// // // // //         setResults(json);
// // // // //         setLightCurve(json.light_curve);

// // // // //       } else {
// // // // //         alert("Unsupported file type. Please upload .fits, .csv, .xml, .vot, or .tbl");
// // // // //       }

// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("Upload failed. Check console.");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <input
// // // // //       type="file"
// // // // //       accept=".fits,.fit,.csv,.xml,.vot,.tbl,.ipac,.txt"
// // // // //       onChange={upload}
// // // // //     />
// // // // //   );
// // // // // }

// // // // import { useState } from "react";

// // // // export default function Upload({ setResults, setLightCurve }) {
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError]   = useState(null);

// // // //   const upload = async (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;

// // // //     setLoading(true);
// // // //     setError(null);

// // // //     try {
// // // //       const form = new FormData();
// // // //       form.append("file", file);

// // // //       const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect", {
// // // //         method: "POST",
// // // //         body: form,
// // // //       });

// // // //       const json = await res.json();

// // // //       if (!res.ok || !json.light_curve) {
// // // //         throw new Error(json.detail || json.error || "Backend returned an unexpected response.");
// // // //       }

// // // //       setResults(json);
// // // //       setLightCurve(json.light_curve);

// // // //     } catch (err) {
// // // //       setError(err.message || "Upload failed. Please check your file and try again.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //       e.target.value = "";
// // // //     }
// // // //   };

// // // export default function Upload({ setResults, setLightCurve, setRawLightCurve }) {
// // //   const upload = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;
// // //     try {
// // //       const form = new FormData();
// // //       form.append("file", file);
// // //       const res = await fetch("import.meta.env.VITE_API_URL/api/transit/detect", {
// // //         method: "POST", body: form
// // //       });
// // //       const json = await res.json();
// // //       if (!json.light_curve) { alert("Backend error. Check console."); return; }
// // //       setResults(json);
// // //       setLightCurve(json.light_curve);           // detrended — for phase fold
// // //       setRawLightCurve(json.raw_light_curve);    // normalized raw — for display
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Upload failed.");
// // //     }
// // //   };
// // //   return <input type="file" accept=".csv,.tbl" onChange={upload} />;
// // // }


// // //   return (
// // //     <div style={{ position: "relative" }}>
// // //       {/* ---------- FILE INPUT ---------- */}
// // //       <label style={{
// // //         display: "inline-block",
// // //         padding: "10px 20px",
// // //         background: loading ? "#aaa" : "#1a73e8",
// // //         color: "#fff",
// // //         borderRadius: 8,
// // //         cursor: loading ? "not-allowed" : "pointer",
// // //         fontWeight: 600,
// // //         fontSize: 14,
// // //         transition: "background 0.2s"
// // //       }}>
// // //         {loading ? "Analysing…" : "Upload Light Curve (.csv / .tbl)"}
// // //         <input
// // //           type="file"
// // //           accept=".csv,.tbl,.txt"
// // //           onChange={upload}
// // //           disabled={loading}
// // //           style={{ display: "none" }}
// // //         />
// // //       </label>

// // //       {/* ---------- SPINNER ---------- */}
// // //       {loading && (
// // //         <div style={{
// // //           display: "flex", alignItems: "center", gap: 10,
// // //           marginTop: 14, color: "#555", fontSize: 14
// // //         }}>
// // //           <div style={{
// // //             width: 20, height: 20, border: "3px solid #ddd",
// // //             borderTop: "3px solid #1a73e8", borderRadius: "50%",
// // //             animation: "spin 0.8s linear infinite"
// // //           }} />
// // //           Running BLS transit detection…
// // //           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// // //         </div>
// // //       )}

// // //       {/* ---------- ERROR POPUP ---------- */}
// // //       {error && (
// // //         <div style={{
// // //           position: "fixed", top: 30, left: "50%", transform: "translateX(-50%)",
// // //           background: "#fff", border: "1px solid #f5c2c7",
// // //           borderLeft: "5px solid #dc3545",
// // //           borderRadius: 10, padding: "18px 24px",
// // //           boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
// // //           zIndex: 9999, maxWidth: 420, width: "90%",
// // //           display: "flex", flexDirection: "column", gap: 10
// // //         }}>
// // //           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //             <span style={{ fontSize: 22 }}>⚠️</span>
// // //             <strong style={{ color: "#dc3545", fontSize: 15 }}>Upload Error</strong>
// // //           </div>
// // //           <p style={{ margin: 0, color: "#444", fontSize: 14, lineHeight: 1.5 }}>{error}</p>
// // //           <button
// // //             onClick={() => setError(null)}
// // //             style={{
// // //               alignSelf: "flex-end", background: "#dc3545", color: "#fff",
// // //               border: "none", borderRadius: 6, padding: "6px 16px",
// // //               cursor: "pointer", fontSize: 13, fontWeight: 600
// // //             }}
// // //           >
// // //             Dismiss
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


import { useState } from "react";

export default function Upload({ setResults, setLightCurve, setRawLightCurve }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);

    // const res = await fetch("http://localhost:8000/api/transit/detect", {
    //   method: "POST",
    //   body: form,
    // });

      const res = await fetch("https://exo-hybrid-detection-backend.onrender.com/api/transit/detect", {
        method: "POST",
        body: form,
    });

      const json = await res.json();

      if (!res.ok || !json.light_curve) {
        throw new Error(json.detail || json.error || "Backend returned an unexpected response.");
      }

      setResults(json);
      setLightCurve(json.light_curve);
      if (setRawLightCurve) setRawLightCurve(json.raw_light_curve ?? json.light_curve);

    } catch (err) {
      setError(err.message || "Upload failed. Please check your file and try again.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <label style={{
        display: "inline-block",
        padding: "10px 20px",
        background: loading ? "#aaa" : "#1a73e8",
        color: "#fff",
        borderRadius: 8,
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: 600,
        fontSize: 14,
      }}>
        {loading ? "Analysing…" : "Upload Light Curve (.csv / .tbl)"}
        <input
          type="file"
          accept=".csv,.tbl,.txt"
          onChange={upload}
          disabled={loading}
          style={{ display: "none" }}
        />
      </label>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, color: "#555", fontSize: 14 }}>
          <div style={{
            width: 20, height: 20, border: "3px solid #ddd",
            borderTop: "3px solid #1a73e8", borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }} />
          Running BLS transit detection…
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {error && (
        <div style={{
          position: "fixed", top: 30, left: "50%", transform: "translateX(-50%)",
          background: "#fff", border: "1px solid #f5c2c7",
          borderLeft: "5px solid #dc3545",
          borderRadius: 10, padding: "18px 24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          zIndex: 9999, maxWidth: 420, width: "90%",
          display: "flex", flexDirection: "column", gap: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>⚠️</span>
            <strong style={{ color: "#dc3545", fontSize: 15 }}>Upload Error</strong>
          </div>
          <p style={{ margin: 0, color: "#444", fontSize: 14, lineHeight: 1.5 }}>{error}</p>
          <button
            onClick={() => setError(null)}
            style={{
              alignSelf: "flex-end", background: "#dc3545", color: "#fff",
              border: "none", borderRadius: 6, padding: "6px 16px",
              cursor: "pointer", fontSize: 13, fontWeight: 600
            }}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

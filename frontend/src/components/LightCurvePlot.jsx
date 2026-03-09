// // // // // // // // // // // // export default function LightCurvePlot({ data }) {
// // // // // // // // // // // //   // ---------- GUARDS ----------
// // // // // // // // // // // //   if (!Array.isArray(data) || data.length < 10) {
// // // // // // // // // // // //     return <p>Not enough data to plot.</p>;
// // // // // // // // // // // //   }

// // // // // // // // // // // //   // ---------- DOWNSAMPLING ----------
// // // // // // // // // // // //   const MAX_POINTS = 10000;
// // // // // // // // // // // //   const stride = Math.ceil(data.length / MAX_POINTS);
// // // // // // // // // // // //   const plotData = data.filter((_, i) => i % stride === 0);

// // // // // // // // // // // //   // ---------- SVG SETUP ----------
// // // // // // // // // // // //   const width = 1000;
// // // // // // // // // // // //   const height = 420;
// // // // // // // // // // // //   const margin = { top: 20, right: 20, bottom: 60, left: 90 };

// // // // // // // // // // // //   const innerW = width - margin.left - margin.right;
// // // // // // // // // // // //   const innerH = height - margin.top - margin.bottom;

// // // // // // // // // // // //   // ---------- DATA ----------
// // // // // // // // // // // //   const times = plotData.map(d => d.time).filter(Number.isFinite);
// // // // // // // // // // // //   const fluxes = plotData.map(d => d.flux).filter(Number.isFinite);

// // // // // // // // // // // //   if (times.length < 10 || fluxes.length < 10) {
// // // // // // // // // // // //     return <p>Invalid time or flux values.</p>;
// // // // // // // // // // // //   }

// // // // // // // // // // // //   const tMin = Math.min(...times);
// // // // // // // // // // // //   const tMax = Math.max(...times);

// // // // // // // // // // // //   // Robust flux range (median ± 3%)
// // // // // // // // // // // //   const sortedFlux = [...fluxes].sort((a, b) => a - b);
// // // // // // // // // // // //   const fMedian = sortedFlux[Math.floor(sortedFlux.length / 2)];
// // // // // // // // // // // //   const fMin = fMedian * 0.97;
// // // // // // // // // // // //   const fMax = fMedian * 1.03;

// // // // // // // // // // // //   // ---------- SCALES ----------
// // // // // // // // // // // //   const x = t =>
// // // // // // // // // // // //     margin.left + ((t - tMin) / (tMax - tMin)) * innerW;

// // // // // // // // // // // //   const y = f =>
// // // // // // // // // // // //     margin.top + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// // // // // // // // // // //   // ---------- AXIS TICKS ----------
  
// // // // // // // // // // //   export default function LightCurvePlot({ data }) {
// // // // // // // // // // //   if (!Array.isArray(data) || data.length === 0) {
// // // // // // // // // // //     return <p>No data to plot.</p>;
// // // // // // // // // // //   }

// // // // // // // // // // //   // ---------- DOWNSAMPLING ----------
// // // // // // // // // // //   const MAX_POINTS = 50000;
// // // // // // // // // // //   const stride = data.length > 100 ? Math.ceil(data.length / MAX_POINTS) : 1;
// // // // // // // // // // //   const plotData = data.filter((_, i) => i % stride === 0);

// // // // // // // // // // //   // ---------- SVG SETUP ----------
// // // // // // // // // // //   const width = 1000;
// // // // // // // // // // //   const height = 420;
// // // // // // // // // // //   const margin = { top: 20, right: 20, bottom: 60, left: 90 };
// // // // // // // // // // //   const innerW = width - margin.left - margin.right;
// // // // // // // // // // //   const innerH = height - margin.top - margin.bottom;

// // // // // // // // // // //   // ---------- DATA ----------
// // // // // // // // // // //   const times = plotData.map(d => d.time).filter(Number.isFinite);
// // // // // // // // // // //   const fluxes = plotData.map(d => d.flux).filter(Number.isFinite);

// // // // // // // // // // //   if (times.length < 2 || fluxes.length < 2) {
// // // // // // // // // // //     return <p>Not enough valid time or flux points to plot.</p>;
// // // // // // // // // // //   }

// // // // // // // // // // //   const tMin = Math.min(...times);
// // // // // // // // // // //   const tMax = Math.max(...times);

// // // // // // // // // // //   // Flux range: small datasets use min/max instead of ±3%
// // // // // // // // // // //   let fMin, fMax;
// // // // // // // // // // //   if (data.length < 100) {
// // // // // // // // // // //     fMin = Math.min(...fluxes) * 0.999; // tiny buffer
// // // // // // // // // // //     fMax = Math.max(...fluxes) * 1.001;
// // // // // // // // // // //   } else {
// // // // // // // // // // //     const sortedFlux = [...fluxes].sort((a, b) => a - b);
// // // // // // // // // // //     const fMedian = sortedFlux[Math.floor(sortedFlux.length / 2)];
// // // // // // // // // // //     fMin = fMedian * 0.97;
// // // // // // // // // // //     fMax = fMedian * 1.03;
// // // // // // // // // // //   }

// // // // // // // // // // //   const x = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
// // // // // // // // // // //   const y = f => margin.top + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// // // // // // // // // // //   const xTicks = 6;
// // // // // // // // // // //   const yTicks = 6;

// // // // // // // // // // //   const xTickVals = Array.from({ length: xTicks }, (_, i) =>
// // // // // // // // // // //     tMin + (i / (xTicks - 1)) * (tMax - tMin)
// // // // // // // // // // //   );

// // // // // // // // // // //   const yTickVals = Array.from({ length: yTicks }, (_, i) =>
// // // // // // // // // // //     fMin + (i / (yTicks - 1)) * (fMax - fMin)
// // // // // // // // // // //   );

// // // // // // // // // // //   return (
// // // // // // // // // // //     <svg
// // // // // // // // // // //       width={width}
// // // // // // // // // // //       height={height}
// // // // // // // // // // //       style={{ background: "#fff", border: "1px solid #ccc" }}
// // // // // // // // // // //     >
// // // // // // // // // // //       {/* ---------- AXES ---------- */}
// // // // // // // // // // //       <line
// // // // // // // // // // //         x1={margin.left}
// // // // // // // // // // //         y1={margin.top + innerH}
// // // // // // // // // // //         x2={margin.left + innerW}
// // // // // // // // // // //         y2={margin.top + innerH}
// // // // // // // // // // //         stroke="black"
// // // // // // // // // // //       />
// // // // // // // // // // //       <line
// // // // // // // // // // //         x1={margin.left}
// // // // // // // // // // //         y1={margin.top}
// // // // // // // // // // //         x2={margin.left}
// // // // // // // // // // //         y2={margin.top + innerH}
// // // // // // // // // // //         stroke="black"
// // // // // // // // // // //       />

// // // // // // // // // // //       {/* ---------- X AXIS TICKS ---------- */}
// // // // // // // // // // //       {xTickVals.map((t, i) => (
// // // // // // // // // // //         <g key={i}>
// // // // // // // // // // //           <line
// // // // // // // // // // //             x1={x(t)}
// // // // // // // // // // //             y1={margin.top + innerH}
// // // // // // // // // // //             x2={x(t)}
// // // // // // // // // // //             y2={margin.top + innerH + 6}
// // // // // // // // // // //             stroke="black"
// // // // // // // // // // //           />
// // // // // // // // // // //           <text
// // // // // // // // // // //             x={x(t)}
// // // // // // // // // // //             y={margin.top + innerH + 20}
// // // // // // // // // // //             textAnchor="middle"
// // // // // // // // // // //             fontSize="11"
// // // // // // // // // // //           >
// // // // // // // // // // //             {t.toFixed(2)}
// // // // // // // // // // //           </text>
// // // // // // // // // // //         </g>
// // // // // // // // // // //       ))}

// // // // // // // // // // //       {/* ---------- Y AXIS TICKS ---------- */}
// // // // // // // // // // //       {yTickVals.map((f, i) => (
// // // // // // // // // // //         <g key={i}>
// // // // // // // // // // //           <line
// // // // // // // // // // //             x1={margin.left - 6}
// // // // // // // // // // //             y1={y(f)}
// // // // // // // // // // //             x2={margin.left}
// // // // // // // // // // //             y2={y(f)}
// // // // // // // // // // //             stroke="black"
// // // // // // // // // // //           />
// // // // // // // // // // //           <text
// // // // // // // // // // //             x={margin.left - 10}
// // // // // // // // // // //             y={y(f) + 4}
// // // // // // // // // // //             textAnchor="end"
// // // // // // // // // // //             fontSize="11"
// // // // // // // // // // //           >
// // // // // // // // // // //             {f.toExponential(2)}
// // // // // // // // // // //           </text>
// // // // // // // // // // //         </g>
// // // // // // // // // // //       ))}

// // // // // // // // // // //       {/* ---------- POINTS ---------- */}
// // // // // // // // // // //       {plotData.map((d, i) =>
// // // // // // // // // // //         Number.isFinite(d.time) && Number.isFinite(d.flux) ? (
// // // // // // // // // // //           <circle
// // // // // // // // // // //             key={i}
// // // // // // // // // // //             cx={x(d.time)}
// // // // // // // // // // //             cy={y(d.flux)}
// // // // // // // // // // //             r="0.6"
// // // // // // // // // // //             fill="black"
// // // // // // // // // // //           />
// // // // // // // // // // //         ) : null
// // // // // // // // // // //       )}

// // // // // // // // // // //       {/* ---------- LABELS ---------- */}
// // // // // // // // // // //       <text
// // // // // // // // // // //         x={width / 2}
// // // // // // // // // // //         y={height - 15}
// // // // // // // // // // //         textAnchor="middle"
// // // // // // // // // // //         fontSize="13"
// // // // // // // // // // //       >
// // // // // // // // // // //         Time (BJD)
// // // // // // // // // // //       </text>

// // // // // // // // // // //       <text
// // // // // // // // // // //         x={20}
// // // // // // // // // // //         y={height / 2}
// // // // // // // // // // //         textAnchor="middle"
// // // // // // // // // // //         fontSize="13"
// // // // // // // // // // //         transform={`rotate(-90 20 ${height / 2})`}
// // // // // // // // // // //       >
// // // // // // // // // // //         PDCSAP Flux (e⁻/s)
// // // // // // // // // // //       </text>
// // // // // // // // // // //     </svg>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // export default function LightCurvePlot({ data, planets = [] }) {
// // // // // // // // // //   if (!Array.isArray(data) || data.length < 10) return <p>No data to plot.</p>;

// // // // // // // // // //   const MAX_POINTS = 15000;
// // // // // // // // // //   const stride = Math.ceil(data.length / MAX_POINTS);
// // // // // // // // // //   const plotData = data.filter((_, i) => i % stride === 0);

// // // // // // // // // //   const width = 1000, height = 380;
// // // // // // // // // //   const margin = { top: 30, right: 30, bottom: 60, left: 80 };
// // // // // // // // // //   const innerW = width - margin.left - margin.right;
// // // // // // // // // //   const innerH = height - margin.top - margin.bottom;

// // // // // // // // // //   const times = plotData.map(d => d.time).filter(Number.isFinite);
// // // // // // // // // //   const fluxes = plotData.map(d => d.flux).filter(Number.isFinite);

// // // // // // // // // //   const tMin = Math.min(...times), tMax = Math.max(...times);
// // // // // // // // // //   const sorted = [...fluxes].sort((a, b) => a - b);
// // // // // // // // // //   const fMedian = sorted[Math.floor(sorted.length / 2)];
// // // // // // // // // //   // Tight range around 1.0 (normalized)
// // // // // // // // // //   const fMin = Math.min(...fluxes, fMedian * 0.990);
// // // // // // // // // //   const fMax = Math.max(...fluxes, fMedian * 1.002);

// // // // // // // // // //   const x = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
// // // // // // // // // //   const y = f => margin.top + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// // // // // // // // // //   // Build SVG polyline path
// // // // // // // // // //   const linePath = plotData
// // // // // // // // // //     .filter(d => Number.isFinite(d.time) && Number.isFinite(d.flux))
// // // // // // // // // //     .map((d, i) => `${i === 0 ? "M" : "L"}${x(d.time).toFixed(1)},${y(d.flux).toFixed(1)}`)
// // // // // // // // // //     .join(" ");

// // // // // // // // // //   const xTicks = 8;
// // // // // // // // // //   const xTickVals = Array.from({ length: xTicks }, (_, i) =>
// // // // // // // // // //     tMin + (i / (xTicks - 1)) * (tMax - tMin));
// // // // // // // // // //   const yTicks = 6;
// // // // // // // // // //   const yTickVals = Array.from({ length: yTicks }, (_, i) =>
// // // // // // // // // //     fMin + (i / (yTicks - 1)) * (fMax - fMin));

// // // // // // // // // //   // Collect all transit circle positions
// // // // // // // // // //   const transitMarkers = [];
// // // // // // // // // //   planets.forEach((p, pi) => {
// // // // // // // // // //     (p.transit_centers || []).forEach((tc, ti) => {
// // // // // // // // // //       if (tc >= tMin && tc <= tMax) {
// // // // // // // // // //         transitMarkers.push({ cx: x(tc), cy: y(fMedian * 0.995), pi, ti });
// // // // // // // // // //       }
// // // // // // // // // //     });
// // // // // // // // // //   });

// // // // // // // // // //   return (
// // // // // // // // // //     <svg width={width} height={height} style={{ background: "#fff", fontFamily: "monospace" }}>
// // // // // // // // // //       {/* Grid lines */}
// // // // // // // // // //       {yTickVals.map((f, i) => (
// // // // // // // // // //         <line key={i} x1={margin.left} y1={y(f)} x2={margin.left + innerW} y2={y(f)}
// // // // // // // // // //           stroke="#eee" strokeWidth="1" />
// // // // // // // // // //       ))}

// // // // // // // // // //       {/* Light curve line */}
// // // // // // // // // //       <path d={linePath} fill="none" stroke="#222" strokeWidth="0.8" />

// // // // // // // // // //       {/* Transit dip circles */}
// // // // // // // // // //       {transitMarkers.map((m, i) => (
// // // // // // // // // //         <circle key={i} cx={m.cx} cy={m.cy} r="10"
// // // // // // // // // //           fill="none" stroke="red" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8" />
// // // // // // // // // //       ))}

// // // // // // // // // //       {/* Axes */}
// // // // // // // // // //       <line x1={margin.left} y1={margin.top + innerH}
// // // // // // // // // //         x2={margin.left + innerW} y2={margin.top + innerH} stroke="#333" strokeWidth="1.5" />
// // // // // // // // // //       <line x1={margin.left} y1={margin.top}
// // // // // // // // // //         x2={margin.left} y2={margin.top + innerH} stroke="#333" strokeWidth="1.5" />

// // // // // // // // // //       {/* X ticks */}
// // // // // // // // // //       {xTickVals.map((t, i) => (
// // // // // // // // // //         <g key={i}>
// // // // // // // // // //           <line x1={x(t)} y1={margin.top + innerH} x2={x(t)} y2={margin.top + innerH + 5} stroke="#333" />
// // // // // // // // // //           <text x={x(t)} y={margin.top + innerH + 18} textAnchor="middle" fontSize="10" fill="#333">
// // // // // // // // // //             {t.toFixed(1)}
// // // // // // // // // //           </text>
// // // // // // // // // //         </g>
// // // // // // // // // //       ))}

// // // // // // // // // //       {/* Y ticks */}
// // // // // // // // // //       {yTickVals.map((f, i) => (
// // // // // // // // // //         <g key={i}>
// // // // // // // // // //           <line x1={margin.left - 5} y1={y(f)} x2={margin.left} y2={y(f)} stroke="#333" />
// // // // // // // // // //           <text x={margin.left - 8} y={y(f) + 4} textAnchor="end" fontSize="10" fill="#333">
// // // // // // // // // //             {f.toFixed(4)}
// // // // // // // // // //           </text>
// // // // // // // // // //         </g>
// // // // // // // // // //       ))}

// // // // // // // // // //       {/* Axis labels */}
// // // // // // // // // //       <text x={width / 2} y={height - 8} textAnchor="middle" fontSize="12" fill="#333">
// // // // // // // // // //         Time (BJD)
// // // // // // // // // //       </text>
// // // // // // // // // //       <text x={16} y={height / 2} textAnchor="middle" fontSize="12" fill="#333"
// // // // // // // // // //         transform={`rotate(-90 16 ${height / 2})`}>
// // // // // // // // // //         Normalized Flux (e⁻/s)
// // // // // // // // // //       </text>

// // // // // // // // // //       {/* Planet labels */}
// // // // // // // // // //       {planets.map((p, i) => (
// // // // // // // // // //         <text key={i} x={margin.left + 10 + i * 180} y={margin.top - 10}
// // // // // // // // // //           fontSize="11" fill="red" fontWeight="bold">
// // // // // // // // // //           Planet {i + 1}: P={p.period?.toFixed(3)}d  SNR={p.snr?.toFixed(1)}
// // // // // // // // // //         </text>
// // // // // // // // // //       ))}
// // // // // // // // // //     </svg>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // export default function LightCurvePlot({ data, planets = [] }) {
// // // // // //   if (!Array.isArray(data) || data.length === 0) return <p>No data to plot.</p>;

// // // // // //   const MAX_POINTS = 50000;
// // // // // //   const stride = data.length > MAX_POINTS ? Math.ceil(data.length / MAX_POINTS) : 1;
// // // // // //   const plotData = data.filter((_, i) => i % stride === 0);

// // // // // //   const width = 1000, height = 420;
// // // // // //   const margin = { top: 20, right: 20, bottom: 60, left: 90 };
// // // // // //   const innerW = width - margin.left - margin.right;
// // // // // //   const innerH = height - margin.top - margin.bottom;

// // // // // //   const times = plotData.map(d => d.time).filter(Number.isFinite);
// // // // // //   const fluxes = plotData.map(d => d.flux).filter(Number.isFinite);
// // // // // //   if (times.length < 2) return <p>Not enough valid points.</p>;

// // // // // //   const tMin = Math.min(...times), tMax = Math.max(...times);
// // // // // //   const sorted = [...fluxes].sort((a, b) => a - b);
// // // // // //   const fMedian = sorted[Math.floor(sorted.length / 2)];
// // // // // //   const fMin = fMedian * 0.97, fMax = fMedian * 1.03;

// // // // // //   const x = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
// // // // // //   const y = f => margin.top + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// // // // // //   const xTicks = Array.from({ length: 6 }, (_, i) => tMin + (i / 5) * (tMax - tMin));
// // // // // //   const yTicks = Array.from({ length: 6 }, (_, i) => fMin + (i / 5) * (fMax - fMin));

// // // // // //   // Planet colors
// // // // // //   const colors = ["#ff4444", "#44aaff", "#44ff88", "#ffaa00"];

// // // // // //   // Find transit times for each planet and mark them
// // // // // //   const transitMarkers = [];
// // // // // //   planets.forEach((planet, pi) => {
// // // // // //     if (!planet?.period || !planet?.t0) return;
// // // // // //     let t = planet.t0;
// // // // // //     while (t <= tMax) {
// // // // // //       if (t >= tMin) {
// // // // // //         transitMarkers.push({ t, color: colors[pi % colors.length], pi });
// // // // // //       }
// // // // // //       t += planet.period;
// // // // // //     }
// // // // // //   });

// // // // // //   const svgId = "lightcurve-svg";

// // // // // //   const handleDownload = () => {
// // // // // //     const svgEl = document.getElementById(svgId);
// // // // // //     const serializer = new XMLSerializer();
// // // // // //     const svgStr = serializer.serializeToString(svgEl);
// // // // // //     const blob = new Blob([svgStr], { type: "image/svg+xml" });
// // // // // //     const url = URL.createObjectURL(blob);
// // // // // //     const a = document.createElement("a");
// // // // // //     a.href = url;
// // // // // //     a.download = "light_curve.svg";
// // // // // //     a.click();
// // // // // //     URL.revokeObjectURL(url);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <button
// // // // // //         onClick={handleDownload}
// // // // // //         style={{
// // // // // //           marginBottom: 8, padding: "4px 14px", fontSize: 13,
// // // // // //           background: "#2563eb", color: "#fff", border: "none",
// // // // // //           borderRadius: 5, cursor: "pointer"
// // // // // //         }}
// // // // // //       >
// // // // // //         ⬇ Download Chart
// // // // // //       </button>

// // // // // //       <svg id={svgId} width={width} height={height} style={{ background: "#fff", border: "1px solid #ccc" }}>
// // // // // //         {/* Axes */}
// // // // // //         <line x1={margin.left} y1={margin.top + innerH} x2={margin.left + innerW} y2={margin.top + innerH} stroke="black" />
// // // // // //         <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + innerH} stroke="black" />

// // // // // //         {/* X ticks */}
// // // // // //         {xTicks.map((t, i) => (
// // // // // //           <g key={i}>
// // // // // //             <line x1={x(t)} y1={margin.top + innerH} x2={x(t)} y2={margin.top + innerH + 6} stroke="black" />
// // // // // //             <text x={x(t)} y={margin.top + innerH + 20} textAnchor="middle" fontSize="11">{t.toFixed(1)}</text>
// // // // // //           </g>
// // // // // //         ))}

// // // // // //         {/* Y ticks */}
// // // // // //         {yTicks.map((f, i) => (
// // // // // //           <g key={i}>
// // // // // //             <line x1={margin.left - 6} y1={y(f)} x2={margin.left} y2={y(f)} stroke="black" />
// // // // // //             <text x={margin.left - 10} y={y(f) + 4} textAnchor="end" fontSize="11">{f.toFixed(4)}</text>
// // // // // //           </g>
// // // // // //         ))}

// // // // // //         {/* Data points */}
// // // // // //         {plotData.map((d, i) =>
// // // // // //           Number.isFinite(d.time) && Number.isFinite(d.flux) ? (
// // // // // //             <circle key={i} cx={x(d.time)} cy={y(d.flux)} r="0.6" fill="#333" />
// // // // // //           ) : null
// // // // // //         )}

// // // // // //         {/* Transit markers — vertical lines + circles */}
// // // // // //         {transitMarkers.map((m, i) => (
// // // // // //           <g key={`tm-${i}`}>
// // // // // //             <line
// // // // // //               x1={x(m.t)} y1={margin.top}
// // // // // //               x2={x(m.t)} y2={margin.top + innerH}
// // // // // //               stroke={m.color} strokeWidth="1" strokeDasharray="4,3" opacity="0.7"
// // // // // //             />
// // // // // //             <circle
// // // // // //               cx={x(m.t)} cy={margin.top + innerH / 2}
// // // // // //               r="7" fill="none"
// // // // // //               stroke={m.color} strokeWidth="1.5" opacity="0.85"
// // // // // //             />
// // // // // //           </g>
// // // // // //         ))}

// // // // // //         {/* Legend */}
// // // // // //         {planets.map((p, i) => (
// // // // // //           <g key={`leg-${i}`}>
// // // // // //             <circle cx={margin.left + 20 + i * 160} cy={margin.top + 12} r="5"
// // // // // //               fill="none" stroke={colors[i % colors.length]} strokeWidth="1.5" />
// // // // // //             <text x={margin.left + 30 + i * 160} y={margin.top + 16} fontSize="11" fill={colors[i % colors.length]}>
// // // // // //               Planet {i + 1}: P={p.period?.toFixed(2)}d SNR={p.snr ?? "—"}
// // // // // //             </text>
// // // // // //           </g>
// // // // // //         ))}

// // // // // //         {/* Axis labels */}
// // // // // //         <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="13">Time (BJD)</text>
// // // // // //         <text x={20} y={height / 2} textAnchor="middle" fontSize="13"
// // // // // //           transform={`rotate(-90 20 ${height / 2})`}>Normalized Flux</text>
// // // // // //       </svg>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // /**
// // // // //  * LightCurvePlot.jsx
// // // // //  * - Draws a CLEAN LINE chart (not dots)
// // // // //  * - Detects periodic flux dips from the data itself (no BLS needed)
// // // // //  *   Condition 1: flux drops below median - 2.5σ
// // // // //  *   Condition 2: at least 2 dips are found with consistent spacing (period)
// // // // //  * - Draws a circle around each confirmed periodic transit dip
// // // // //  */
// // // // // export default function LightCurvePlot({ data, planets = [] }) {
// // // // //   if (!Array.isArray(data) || data.length < 10) return <p>No data to plot.</p>;

// // // // //   // ── 1. Downsample for performance ──────────────────────────────────────────
// // // // //   const MAX_POINTS = 8000;
// // // // //   const stride = data.length > MAX_POINTS ? Math.ceil(data.length / MAX_POINTS) : 1;
// // // // //   const plotData = data
// // // // //     .filter((_, i) => i % stride === 0)
// // // // //     .filter(d => Number.isFinite(d.time) && Number.isFinite(d.flux));

// // // // //   if (plotData.length < 2) return <p>Not enough valid points.</p>;

// // // // //   // ── 2. SVG layout ──────────────────────────────────────────────────────────
// // // // //   const width  = 1000;
// // // // //   const height = 420;
// // // // //   const margin = { top: 40, right: 24, bottom: 62, left: 80 };
// // // // //   const innerW = width  - margin.left - margin.right;
// // // // //   const innerH = height - margin.top  - margin.bottom;

// // // // //   // ── 3. Data range ──────────────────────────────────────────────────────────
// // // // //   const times  = plotData.map(d => d.time);
// // // // //   const fluxes = plotData.map(d => d.flux);

// // // // //   const tMin = Math.min(...times);
// // // // //   const tMax = Math.max(...times);

// // // // //   // Tight y-range: 1st–99th percentile with small padding
// // // // //   const sortedF = [...fluxes].sort((a, b) => a - b);
// // // // //   const p01     = sortedF[Math.floor(sortedF.length * 0.01)];
// // // // //   const p99     = sortedF[Math.floor(sortedF.length * 0.99)];
// // // // //   const pad     = (p99 - p01) * 0.15 || 0.002;
// // // // //   const fMin    = p01 - pad;
// // // // //   const fMax    = p99 + pad;

// // // // //   // ── 4. Scale helpers ───────────────────────────────────────────────────────
// // // // //   const sx = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
// // // // //   const sy = f => margin.top  + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// // // // //   // ── 5. Build SVG polyline path ─────────────────────────────────────────────
// // // // //   // Split into segments at big time gaps (data gaps become line breaks)
// // // // //   const segments = [];
// // // // //   let seg = [plotData[0]];
// // // // //   const medianDt = (() => {
// // // // //     const dts = [];
// // // // //     for (let i = 1; i < Math.min(plotData.length, 500); i++)
// // // // //       dts.push(plotData[i].time - plotData[i - 1].time);
// // // // //     dts.sort((a, b) => a - b);
// // // // //     return dts[Math.floor(dts.length / 2)] || 1;
// // // // //   })();

// // // // //   for (let i = 1; i < plotData.length; i++) {
// // // // //     const gap = plotData[i].time - plotData[i - 1].time;
// // // // //     if (gap > medianDt * 20) {
// // // // //       segments.push(seg);
// // // // //       seg = [];
// // // // //     }
// // // // //     seg.push(plotData[i]);
// // // // //   }
// // // // //   segments.push(seg);

// // // // //   const pathStr = segments.map(s =>
// // // // //     s.map((d, i) => `${i === 0 ? "M" : "L"}${sx(d.time).toFixed(1)},${sy(d.flux).toFixed(1)}`).join(" ")
// // // // //   ).join(" ");

// // // // //   // ── 6. Periodic dip detection (pure JS — no backend needed) ───────────────
// // // // //   const median = sortedF[Math.floor(sortedF.length / 2)];
// // // // //   const std    = Math.sqrt(
// // // // //     fluxes.reduce((acc, f) => acc + (f - median) ** 2, 0) / fluxes.length
// // // // //   );
// // // // //   const DIP_THRESHOLD = median - 2.5 * std;

// // // // //   // Find local minima that are below the threshold
// // // // //   const localDips = [];
// // // // //   for (let i = 2; i < plotData.length - 2; i++) {
// // // // //     const f = plotData[i].flux;
// // // // //     if (
// // // // //       f < DIP_THRESHOLD &&
// // // // //       f <= plotData[i - 1].flux &&
// // // // //       f <= plotData[i - 2].flux &&
// // // // //       f <= plotData[i + 1].flux &&
// // // // //       f <= plotData[i + 2].flux
// // // // //     ) {
// // // // //       // Avoid duplicates within 10 points
// // // // //       if (!localDips.length || i - localDips[localDips.length - 1].idx > 10) {
// // // // //         localDips.push({ idx: i, time: plotData[i].time, flux: plotData[i].flux });
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   // Condition 2: find pairs/groups with consistent spacing → period
// // // // //   const periodicGroups = []; // each group = { period, dips: [...] }
// // // // //   const used = new Set();

// // // // //   for (let a = 0; a < localDips.length; a++) {
// // // // //     if (used.has(a)) continue;
// // // // //     for (let b = a + 1; b < localDips.length; b++) {
// // // // //       if (used.has(b)) continue;
// // // // //       const candidatePeriod = localDips[b].time - localDips[a].time;
// // // // //       if (candidatePeriod < 0.3) continue; // min 0.3-day period

// // // // //       // Look for a third dip that matches this period (within 10%)
// // // // //       const group = [localDips[a], localDips[b]];
// // // // //       for (let c = b + 1; c < localDips.length; c++) {
// // // // //         const spacing = localDips[c].time - localDips[b].time;
// // // // //         if (Math.abs(spacing - candidatePeriod) / candidatePeriod < 0.12) {
// // // // //           group.push(localDips[c]);
// // // // //         }
// // // // //       }

// // // // //       if (group.length >= 2) {
// // // // //         // Only keep groups with ≥2 confirmed periodic dips
// // // // //         periodicGroups.push({ period: candidatePeriod, dips: group });
// // // // //         group.forEach((_, gi) => {
// // // // //           const idx = localDips.indexOf(group[gi]);
// // // // //           if (idx >= 0) used.add(idx);
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   // Also include planets passed in from backend
// // // // //   const backendTransits = [];
// // // // //   planets.forEach((p, pi) => {
// // // // //     if (!p?.period || !p?.t0) return;
// // // // //     let t = p.t0;
// // // // //     while (t <= tMax) {
// // // // //       if (t >= tMin) backendTransits.push({ time: t, planetIdx: pi });
// // // // //       t += p.period;
// // // // //     }
// // // // //   });

// // // // //   // ── 7. Tick values ─────────────────────────────────────────────────────────
// // // // //   const xTicks = Array.from({ length: 7 }, (_, i) => tMin + (i / 6) * (tMax - tMin));
// // // // //   const yTicks = Array.from({ length: 6 }, (_, i) => fMin + (i / 5) * (fMax - fMin));

// // // // //   const COLORS = ["#ff4444", "#44aaff", "#44ff88", "#ffaa00", "#cc44ff"];

// // // // //   // ── 8. Render ──────────────────────────────────────────────────────────────
// // // // //   return (
// // // // //     <div style={{ overflowX: "auto" }}>
// // // // //       <svg
// // // // //         width={width}
// // // // //         height={height}
// // // // //         style={{ background: "#fff", display: "block", fontFamily: "sans-serif" }}
// // // // //       >
// // // // //         {/* ── Grid lines ── */}
// // // // //         {yTicks.map((f, i) => (
// // // // //           <line key={`yg${i}`}
// // // // //             x1={margin.left} y1={sy(f)}
// // // // //             x2={margin.left + innerW} y2={sy(f)}
// // // // //             stroke="#e8e8e8" strokeWidth="1"
// // // // //           />
// // // // //         ))}
// // // // //         {xTicks.map((t, i) => (
// // // // //           <line key={`xg${i}`}
// // // // //             x1={sx(t)} y1={margin.top}
// // // // //             x2={sx(t)} y2={margin.top + innerH}
// // // // //             stroke="#e8e8e8" strokeWidth="1"
// // // // //           />
// // // // //         ))}

// // // // //         {/* ── Median reference line ── */}
// // // // //         <line
// // // // //           x1={margin.left} y1={sy(median)}
// // // // //           x2={margin.left + innerW} y2={sy(median)}
// // // // //           stroke="#aaa" strokeWidth="0.8" strokeDasharray="6,4"
// // // // //         />

// // // // //         {/* ── Dip threshold line ── */}
// // // // //         {DIP_THRESHOLD > fMin && (
// // // // //           <line
// // // // //             x1={margin.left} y1={sy(DIP_THRESHOLD)}
// // // // //             x2={margin.left + innerW} y2={sy(DIP_THRESHOLD)}
// // // // //             stroke="#ffaaaa" strokeWidth="0.8" strokeDasharray="4,3"
// // // // //           />
// // // // //         )}

// // // // //         {/* ── THE LINE ── */}
// // // // //         <path
// // // // //           d={pathStr}
// // // // //           fill="none"
// // // // //           stroke="#1a1a1a"
// // // // //           strokeWidth="0.9"
// // // // //           strokeLinejoin="round"
// // // // //         />

// // // // //         {/* ── Periodic dip circles (detected from data) ── */}
// // // // //         {periodicGroups.map((grp, gi) =>
// // // // //           grp.dips.map((dip, di) => (
// // // // //             <g key={`dip-${gi}-${di}`}>
// // // // //               {/* Outer circle */}
// // // // //               <circle
// // // // //                 cx={sx(dip.time)} cy={sy(dip.flux)}
// // // // //                 r="14"
// // // // //                 fill="none"
// // // // //                 stroke={COLORS[gi % COLORS.length]}
// // // // //                 strokeWidth="2"
// // // // //               />
// // // // //               {/* Center dot */}
// // // // //               <circle
// // // // //                 cx={sx(dip.time)} cy={sy(dip.flux)}
// // // // //                 r="2.5"
// // // // //                 fill={COLORS[gi % COLORS.length]}
// // // // //               />
// // // // //               {/* Label above first in group */}
// // // // //               {di === 0 && (
// // // // //                 <text
// // // // //                   x={sx(dip.time)} y={sy(dip.flux) - 20}
// // // // //                   textAnchor="middle"
// // // // //                   fontSize="10"
// // // // //                   fontWeight="bold"
// // // // //                   fill={COLORS[gi % COLORS.length]}
// // // // //                 >
// // // // //                   P≈{grp.period.toFixed(2)}d
// // // // //                 </text>
// // // // //               )}
// // // // //             </g>
// // // // //           ))
// // // // //         )}

// // // // //         {/* ── Backend transit markers ── */}
// // // // //         {backendTransits.map((bt, i) => (
// // // // //           <g key={`bt-${i}`}>
// // // // //             <line
// // // // //               x1={sx(bt.time)} y1={margin.top}
// // // // //               x2={sx(bt.time)} y2={margin.top + innerH}
// // // // //               stroke={COLORS[(bt.planetIdx + periodicGroups.length) % COLORS.length]}
// // // // //               strokeWidth="1"
// // // // //               strokeDasharray="4,3"
// // // // //               opacity="0.5"
// // // // //             />
// // // // //           </g>
// // // // //         ))}

// // // // //         {/* ── Axes ── */}
// // // // //         <line
// // // // //           x1={margin.left} y1={margin.top + innerH}
// // // // //           x2={margin.left + innerW} y2={margin.top + innerH}
// // // // //           stroke="#333" strokeWidth="1.5"
// // // // //         />
// // // // //         <line
// // // // //           x1={margin.left} y1={margin.top}
// // // // //           x2={margin.left} y2={margin.top + innerH}
// // // // //           stroke="#333" strokeWidth="1.5"
// // // // //         />

// // // // //         {/* ── X ticks ── */}
// // // // //         {xTicks.map((t, i) => (
// // // // //           <g key={`xt${i}`}>
// // // // //             <line
// // // // //               x1={sx(t)} y1={margin.top + innerH}
// // // // //               x2={sx(t)} y2={margin.top + innerH + 5}
// // // // //               stroke="#333"
// // // // //             />
// // // // //             <text
// // // // //               x={sx(t)} y={margin.top + innerH + 18}
// // // // //               textAnchor="middle" fontSize="11" fill="#333"
// // // // //             >
// // // // //               {t.toFixed(1)}
// // // // //             </text>
// // // // //           </g>
// // // // //         ))}

// // // // //         {/* ── Y ticks ── */}
// // // // //         {yTicks.map((f, i) => (
// // // // //           <g key={`yt${i}`}>
// // // // //             <line
// // // // //               x1={margin.left - 5} y1={sy(f)}
// // // // //               x2={margin.left} y2={sy(f)}
// // // // //               stroke="#333"
// // // // //             />
// // // // //             <text
// // // // //               x={margin.left - 8} y={sy(f) + 4}
// // // // //               textAnchor="end" fontSize="11" fill="#333"
// // // // //             >
// // // // //               {f.toFixed(4)}
// // // // //             </text>
// // // // //           </g>
// // // // //         ))}

// // // // //         {/* ── Axis labels ── */}
// // // // //         <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="13" fill="#333">
// // // // //           Time (BJD)
// // // // //         </text>
// // // // //         <text
// // // // //           x={16} y={height / 2}
// // // // //           textAnchor="middle" fontSize="13" fill="#333"
// // // // //           transform={`rotate(-90 16 ${height / 2})`}
// // // // //         >
// // // // //           Normalized Flux
// // // // //         </text>

// // // // //         {/* ── Legend ── */}
// // // // //         {periodicGroups.length > 0 && (
// // // // //           <g>
// // // // //             {periodicGroups.map((grp, gi) => (
// // // // //               <g key={`leg${gi}`}>
// // // // //                 <circle
// // // // //                   cx={margin.left + 16 + gi * 180}
// // // // //                   cy={margin.top - 18}
// // // // //                   r="6"
// // // // //                   fill="none"
// // // // //                   stroke={COLORS[gi % COLORS.length]}
// // // // //                   strokeWidth="1.8"
// // // // //                 />
// // // // //                 <text
// // // // //                   x={margin.left + 28 + gi * 180}
// // // // //                   y={margin.top - 14}
// // // // //                   fontSize="11"
// // // // //                   fill={COLORS[gi % COLORS.length]}
// // // // //                   fontWeight="bold"
// // // // //                 >
// // // // //                   Candidate {gi + 1} — P={grp.period.toFixed(3)} d ({grp.dips.length} transits)
// // // // //                 </text>
// // // // //               </g>
// // // // //             ))}
// // // // //           </g>
// // // // //         )}

// // // // //         {periodicGroups.length === 0 && localDips.length === 0 && (
// // // // //           <text x={width / 2} y={margin.top - 16} textAnchor="middle" fontSize="11" fill="#888">
// // // // //             No periodic transit signal detected
// // // // //           </text>
// // // // //         )}
// // // // //       </svg>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // /**
// // // //  * LightCurvePlot.jsx
// // // //  * Props:
// // // //  *   data        — array of {time, flux}
// // // //  *   planets     — backend planet detections (optional)
// // // //  *   showCircles — boolean: whether to draw the periodic-dip circles
// // // //  */
// // // // export default function LightCurvePlot({ data, planets = [], showCircles = true, dipSigma = 2.5, minPeriod = 0.3 }) {
// // // //   if (!Array.isArray(data) || data.length < 10) return <p>No data to plot.</p>;

// // // //   // ── 1. Downsample ──────────────────────────────────────────────────────────
// // // //   const MAX_POINTS = 8000;
// // // //   const stride = data.length > MAX_POINTS ? Math.ceil(data.length / MAX_POINTS) : 1;
// // // //   const raw = data
// // // //     .filter((_, i) => i % stride === 0)
// // // //     .filter(d => Number.isFinite(d.time) && Number.isFinite(d.flux));

// // // //   if (raw.length < 2) return <p>Not enough valid points.</p>;

// // // //   // ── 2. Inline normalise + detrend (divides by median, removes polynomial trend)
// // // //   //    This ensures dip detection works regardless of whether backend normalised.
// // // //   const rawFluxes = raw.map(d => d.flux);
// // // //   const sorted0   = [...rawFluxes].sort((a, b) => a - b);
// // // //   const fluxMedian = sorted0[Math.floor(sorted0.length / 2)];

// // // //   // Normalise to ~1.0
// // // //   let plotData = raw.map(d => ({ time: d.time, flux: d.flux / fluxMedian }));

// // // //   // Detrend: fit linear baseline over 20 equal bins, subtract it
// // // //   const tAll  = plotData.map(d => d.time);
// // // //   const tMin0 = Math.min(...tAll);
// // // //   const tMax0 = Math.max(...tAll);
// // // //   const N_BINS = 20;
// // // //   const bins  = Array.from({ length: N_BINS }, () => ({ sum: 0, n: 0 }));
// // // //   plotData.forEach(d => {
// // // //     const bi = Math.min(N_BINS - 1, Math.floor((d.time - tMin0) / (tMax0 - tMin0 + 1e-9) * N_BINS));
// // // //     bins[bi].sum += d.flux; bins[bi].n++;
// // // //   });
// // // //   const binMeds = bins.map((b, i) => ({
// // // //     t: tMin0 + (i + 0.5) / N_BINS * (tMax0 - tMin0),
// // // //     f: b.n > 0 ? b.sum / b.n : 1.0,
// // // //   }));
// // // //   // Simple linear fit through bin medians
// // // //   const bx = binMeds.map(b => b.t), by = binMeds.map(b => b.f);
// // // //   const bxm = bx.reduce((a,v)=>a+v,0)/bx.length, bym = by.reduce((a,v)=>a+v,0)/by.length;
// // // //   const slope = bx.reduce((a,v,i)=>a+(v-bxm)*(by[i]-bym),0) /
// // // //                 bx.reduce((a,v)=>a+(v-bxm)**2,0);
// // // //   const intercept = bym - slope * bxm;
// // // //   plotData = plotData.map(d => ({
// // // //     time: d.time,
// // // //     flux: d.flux / (slope * d.time + intercept), // divide to flatten trend
// // // //   }));

// // // //   // ── 3. SVG layout ──────────────────────────────────────────────────────────
// // // //   const width  = 1000;
// // // //   const height = 420;
// // // //   const margin = { top: 40, right: 24, bottom: 62, left: 80 };
// // // //   const innerW = width  - margin.left - margin.right;
// // // //   const innerH = height - margin.top  - margin.bottom;

// // // //   const times  = plotData.map(d => d.time);
// // // //   const fluxes = plotData.map(d => d.flux);
// // // //   const tMin = Math.min(...times);
// // // //   const tMax = Math.max(...times);

// // // //   const sortedF = [...fluxes].sort((a, b) => a - b);
// // // //   const p01  = sortedF[Math.floor(sortedF.length * 0.01)];
// // // //   const p99  = sortedF[Math.floor(sortedF.length * 0.99)];
// // // //   const pad  = (p99 - p01) * 0.15 || 0.002;
// // // //   const fMin = p01 - pad;
// // // //   const fMax = p99 + pad;

// // // //   const sx = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
// // // //   const sy = f => margin.top  + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// // // //   // ── 4. Line path with gap-breaking ─────────────────────────────────────────
// // // //   const medianDt = (() => {
// // // //     const dts = [];
// // // //     for (let i = 1; i < Math.min(plotData.length, 500); i++)
// // // //       dts.push(plotData[i].time - plotData[i-1].time);
// // // //     dts.sort((a,b) => a-b);
// // // //     return dts[Math.floor(dts.length/2)] || 1;
// // // //   })();

// // // //   let pathStr = "";
// // // //   for (let i = 0; i < plotData.length; i++) {
// // // //     const cmd = (i === 0 || plotData[i].time - plotData[i-1].time > medianDt * 20) ? "M" : "L";
// // // //     pathStr += `${cmd}${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
// // // //   }

// // // //   // ── 5. Dip detection (only when showCircles=true) ──────────────────────────
// // // //   const median = sortedF[Math.floor(sortedF.length / 2)];
// // // //   const std    = Math.sqrt(fluxes.reduce((a,f) => a + (f-median)**2, 0) / fluxes.length);
// // // //   const DIP_THRESHOLD = median - dipSigma * std;

// // // //   let periodicGroups = [];

// // // //   if (showCircles) {
// // // //     const localDips = [];
// // // //     for (let i = 2; i < plotData.length - 2; i++) {
// // // //       const f = plotData[i].flux;
// // // //       if (f < DIP_THRESHOLD &&
// // // //           f <= plotData[i-1].flux && f <= plotData[i-2].flux &&
// // // //           f <= plotData[i+1].flux && f <= plotData[i+2].flux) {
// // // //         if (!localDips.length || i - localDips[localDips.length-1].idx > 5)
// // // //           localDips.push({ idx: i, time: plotData[i].time, flux: plotData[i].flux });
// // // //       }
// // // //     }

// // // //     // Score all candidate periods
// // // //     const candidates = [];
// // // //     for (let a = 0; a < localDips.length; a++) {
// // // //       for (let b = a + 1; b < localDips.length; b++) {
// // // //         const P = localDips[b].time - localDips[a].time;
// // // //         if (P < minPeriod) continue;
// // // //         const explained = localDips.filter(d => {
// // // //           const phase = ((d.time - localDips[a].time) % P + P) % P;
// // // //           return phase < P * 0.08 || phase > P * 0.92;
// // // //         });
// // // //         if (explained.length >= 2)
// // // //           candidates.push({ period: P, anchor: localDips[a], dips: explained });
// // // //       }
// // // //     }
// // // //     candidates.sort((a, b) => b.dips.length - a.dips.length || a.period - b.period);

// // // //     // Keep non-harmonic candidates, max 2
// // // //     const usedDips = new Set();
// // // //     for (const cand of candidates) {
// // // //       const newDips = cand.dips.filter(d => !usedDips.has(d.idx));
// // // //       if (newDips.length < 2) continue;
// // // //       const isHarmonic = periodicGroups.some(g => {
// // // //         const r = cand.period / g.period, n = Math.round(r);
// // // //         const r2 = g.period / cand.period, n2 = Math.round(r2);
// // // //         return (n >= 1 && Math.abs(r-n) < 0.15) || (n2 >= 2 && Math.abs(r2-n2) < 0.15);
// // // //       });
// // // //       if (isHarmonic) continue;
// // // //       periodicGroups.push({ period: cand.period, dips: newDips });
// // // //       newDips.forEach(d => usedDips.add(d.idx));
// // // //       if (periodicGroups.length >= 2) break;
// // // //     }
// // // //   }

// // // //   // ── 6. Backend transit markers ─────────────────────────────────────────────
// // // //   const backendTransits = [];
// // // //   if (showCircles) {
// // // //     planets.forEach((p, pi) => {
// // // //       if (!p?.period || !p?.t0) return;
// // // //       let t = p.t0;
// // // //       while (t <= tMax) {
// // // //         if (t >= tMin) backendTransits.push({ time: t, planetIdx: pi });
// // // //         t += p.period;
// // // //       }
// // // //     });
// // // //   }

// // // //   // ── 7. Ticks ───────────────────────────────────────────────────────────────
// // // //   const xTicks = Array.from({ length: 7 }, (_, i) => tMin + (i/6)*(tMax-tMin));
// // // //   const yTicks = Array.from({ length: 6 }, (_, i) => fMin + (i/5)*(fMax-fMin));
// // // //   const COLORS = ["#ff4444", "#44aaff", "#44ff88", "#ffaa00", "#cc44ff"];

// // // //   // ── 8. Render ──────────────────────────────────────────────────────────────
// // // //   return (
// // // //     <div style={{ overflowX: "auto" }}>
// // // //       <svg width={width} height={height}
// // // //         style={{ background: "#fff", display: "block", fontFamily: "sans-serif" }}>

// // // //         {/* Grid */}
// // // //         {yTicks.map((f, i) => (
// // // //           <line key={`yg${i}`} x1={margin.left} y1={sy(f)}
// // // //             x2={margin.left+innerW} y2={sy(f)} stroke="#ebebeb" strokeWidth="1" />
// // // //         ))}
// // // //         {xTicks.map((t, i) => (
// // // //           <line key={`xg${i}`} x1={sx(t)} y1={margin.top}
// // // //             x2={sx(t)} y2={margin.top+innerH} stroke="#ebebeb" strokeWidth="1" />
// // // //         ))}

// // // //         {/* Median reference */}
// // // //         <line x1={margin.left} y1={sy(median)} x2={margin.left+innerW} y2={sy(median)}
// // // //           stroke="#bbb" strokeWidth="0.8" strokeDasharray="6,4" />

// // // //         {/* Dip threshold (only when circles shown) */}
// // // //         {showCircles && DIP_THRESHOLD > fMin && (
// // // //           <line x1={margin.left} y1={sy(DIP_THRESHOLD)}
// // // //             x2={margin.left+innerW} y2={sy(DIP_THRESHOLD)}
// // // //             stroke="#ffaaaa" strokeWidth="0.8" strokeDasharray="4,3" />
// // // //         )}

// // // //         {/* The line */}
// // // //         <path d={pathStr} fill="none" stroke="#1a1a1a" strokeWidth="0.9" strokeLinejoin="round" />

// // // //         {/* Periodic dip circles */}
// // // //         {periodicGroups.map((grp, gi) =>
// // // //           grp.dips.map((dip, di) => (
// // // //             <g key={`dip-${gi}-${di}`}>
// // // //               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="14"
// // // //                 fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="2" />
// // // //               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="2.5"
// // // //                 fill={COLORS[gi % COLORS.length]} />
// // // //               {di === 0 && (
// // // //                 <text x={sx(dip.time)} y={sy(dip.flux)-20}
// // // //                   textAnchor="middle" fontSize="10" fontWeight="bold"
// // // //                   fill={COLORS[gi % COLORS.length]}>
// // // //                   P≈{grp.period.toFixed(2)}d
// // // //                 </text>
// // // //               )}
// // // //             </g>
// // // //           ))
// // // //         )}

// // // //         {/* Backend transit lines */}
// // // //         {backendTransits.map((bt, i) => (
// // // //           <line key={`bt-${i}`} x1={sx(bt.time)} y1={margin.top}
// // // //             x2={sx(bt.time)} y2={margin.top+innerH}
// // // //             stroke={COLORS[(bt.planetIdx + periodicGroups.length) % COLORS.length]}
// // // //             strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
// // // //         ))}

// // // //         {/* Axes */}
// // // //         <line x1={margin.left} y1={margin.top+innerH}
// // // //           x2={margin.left+innerW} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />
// // // //         <line x1={margin.left} y1={margin.top}
// // // //           x2={margin.left} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />

// // // //         {/* X ticks */}
// // // //         {xTicks.map((t, i) => (
// // // //           <g key={`xt${i}`}>
// // // //             <line x1={sx(t)} y1={margin.top+innerH} x2={sx(t)} y2={margin.top+innerH+5} stroke="#333" />
// // // //             <text x={sx(t)} y={margin.top+innerH+18} textAnchor="middle" fontSize="11" fill="#333">
// // // //               {t.toFixed(1)}
// // // //             </text>
// // // //           </g>
// // // //         ))}

// // // //         {/* Y ticks */}
// // // //         {yTicks.map((f, i) => (
// // // //           <g key={`yt${i}`}>
// // // //             <line x1={margin.left-5} y1={sy(f)} x2={margin.left} y2={sy(f)} stroke="#333" />
// // // //             <text x={margin.left-8} y={sy(f)+4} textAnchor="end" fontSize="11" fill="#333">
// // // //               {f.toFixed(4)}
// // // //             </text>
// // // //           </g>
// // // //         ))}

// // // //         {/* Axis labels */}
// // // //         <text x={width/2} y={height-10} textAnchor="middle" fontSize="13" fill="#333">
// // // //           Time (BJD)
// // // //         </text>
// // // //         <text x={16} y={height/2} textAnchor="middle" fontSize="13" fill="#333"
// // // //           transform={`rotate(-90 16 ${height/2})`}>
// // // //           Normalized Flux
// // // //         </text>

// // // //         {/* Legend */}
// // // //         {showCircles && periodicGroups.length > 0 && (
// // // //           <g>
// // // //             {periodicGroups.map((grp, gi) => (
// // // //               <g key={`leg${gi}`}>
// // // //                 <circle cx={margin.left + 16 + gi*190} cy={margin.top-18} r="6"
// // // //                   fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="1.8" />
// // // //                 <text x={margin.left + 28 + gi*190} y={margin.top-14}
// // // //                   fontSize="11" fill={COLORS[gi % COLORS.length]} fontWeight="bold">
// // // //                   Candidate {gi+1} — P={grp.period.toFixed(3)} d ({grp.dips.length} transits)
// // // //                 </text>
// // // //               </g>
// // // //             ))}
// // // //           </g>
// // // //         )}

// // // //         {showCircles && periodicGroups.length === 0 && (
// // // //           <text x={width/2} y={margin.top-16} textAnchor="middle" fontSize="11" fill="#aaa">
// // // //             No periodic transit signal detected above threshold
// // // //           </text>
// // // //         )}
// // // //       </svg>
// // // //     </div>
// // // //   );
// // // // }

// // // /**
// // //  * LightCurvePlot.jsx
// // //  * Props:
// // //  *   data        — array of {time, flux}
// // //  *   planets     — backend planet detections (optional)
// // //  *   showCircles — boolean: whether to draw the periodic-dip circles
// // //  */
// // // export default function LightCurvePlot({ data, planets = [], showCircles = true, dipSigma = 2.5, minPeriod = 0.3 }) {
// // //   if (!Array.isArray(data) || data.length < 10) return <p>No data to plot.</p>;

// // //   // ── 1. Downsample ──────────────────────────────────────────────────────────
// // //   const MAX_POINTS = 8000;
// // //   const stride = data.length > MAX_POINTS ? Math.ceil(data.length / MAX_POINTS) : 1;
// // //   const raw = data
// // //     .filter((_, i) => i % stride === 0)
// // //     .filter(d => Number.isFinite(d.time) && Number.isFinite(d.flux));

// // //   if (raw.length < 2) return <p>Not enough valid points.</p>;

// // //   // ── 2. Inline normalise + detrend (divides by median, removes polynomial trend)
// // //   //    This ensures dip detection works regardless of whether backend normalised.
// // //   const rawFluxes = raw.map(d => d.flux);
// // //   const sorted0   = [...rawFluxes].sort((a, b) => a - b);
// // //   const fluxMedian = sorted0[Math.floor(sorted0.length / 2)];

// // //   // Normalise to ~1.0
// // //   let plotData = raw.map(d => ({ time: d.time, flux: d.flux / fluxMedian }));

// // //   // Detrend: fit linear baseline over 20 equal bins, subtract it
// // //   const tAll  = plotData.map(d => d.time);
// // //   const tMin0 = Math.min(...tAll);
// // //   const tMax0 = Math.max(...tAll);
// // //   const N_BINS = 20;
// // //   const bins  = Array.from({ length: N_BINS }, () => ({ sum: 0, n: 0 }));
// // //   plotData.forEach(d => {
// // //     const bi = Math.min(N_BINS - 1, Math.floor((d.time - tMin0) / (tMax0 - tMin0 + 1e-9) * N_BINS));
// // //     bins[bi].sum += d.flux; bins[bi].n++;
// // //   });
// // //   const binMeds = bins.map((b, i) => ({
// // //     t: tMin0 + (i + 0.5) / N_BINS * (tMax0 - tMin0),
// // //     f: b.n > 0 ? b.sum / b.n : 1.0,
// // //   }));
// // //   // Simple linear fit through bin medians
// // //   const bx = binMeds.map(b => b.t), by = binMeds.map(b => b.f);
// // //   const bxm = bx.reduce((a,v)=>a+v,0)/bx.length, bym = by.reduce((a,v)=>a+v,0)/by.length;
// // //   const slope = bx.reduce((a,v,i)=>a+(v-bxm)*(by[i]-bym),0) /
// // //                 bx.reduce((a,v)=>a+(v-bxm)**2,0);
// // //   const intercept = bym - slope * bxm;
// // //   plotData = plotData.map(d => ({
// // //     time: d.time,
// // //     flux: d.flux / (slope * d.time + intercept), // divide to flatten trend
// // //   }));

// // //   // ── 3. SVG layout ──────────────────────────────────────────────────────────
// // //   const width  = 1000;
// // //   const height = 420;
// // //   const margin = { top: 40, right: 24, bottom: 62, left: 80 };
// // //   const innerW = width  - margin.left - margin.right;
// // //   const innerH = height - margin.top  - margin.bottom;

// // //   const times  = plotData.map(d => d.time);
// // //   const fluxes = plotData.map(d => d.flux);
// // //   const tMin = Math.min(...times);
// // //   const tMax = Math.max(...times);

// // //   const sortedF = [...fluxes].sort((a, b) => a - b);
// // //   const p01  = sortedF[Math.floor(sortedF.length * 0.01)];
// // //   const p99  = sortedF[Math.floor(sortedF.length * 0.99)];
// // //   const pad  = (p99 - p01) * 0.15 || 0.002;
// // //   const fMin = p01 - pad;
// // //   const fMax = p99 + pad;

// // //   const sx = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
// // //   const sy = f => margin.top  + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// // //   // ── 4. Line path with gap-breaking ─────────────────────────────────────────
// // //   const medianDt = (() => {
// // //     const dts = [];
// // //     for (let i = 1; i < Math.min(plotData.length, 500); i++)
// // //       dts.push(plotData[i].time - plotData[i-1].time);
// // //     dts.sort((a,b) => a-b);
// // //     return dts[Math.floor(dts.length/2)] || 1;
// // //   })();

// // //   let pathStr = "";
// // //   for (let i = 0; i < plotData.length; i++) {
// // //     const cmd = (i === 0 || plotData[i].time - plotData[i-1].time > medianDt * 20) ? "M" : "L";
// // //     pathStr += `${cmd}${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
// // //   }

// // //   // ── 5. Dip detection (only when showCircles=true) ──────────────────────────
// // //   const median = sortedF[Math.floor(sortedF.length / 2)];
// // //   const std    = Math.sqrt(fluxes.reduce((a,f) => a + (f-median)**2, 0) / fluxes.length);
// // //   const DIP_THRESHOLD = median - dipSigma * std;

// // //   let periodicGroups = [];

// // //   if (showCircles) {
// // //     // Estimate cadence from median time step
// // //     const dtMedian = (() => {
// // //       const dts = [];
// // //       for (let i = 1; i < Math.min(plotData.length, 200); i++)
// // //         dts.push(plotData[i].time - plotData[i-1].time);
// // //       dts.sort((a, b) => a - b);
// // //       return dts[Math.floor(dts.length / 2)] || 0.02;
// // //     })();
// // //     // Minimum real-time separation between dips: minPeriod / 4 (or at least 10 cadences)
// // //     const MIN_DIP_TIME_SEP = Math.max(minPeriod * 0.25, dtMedian * 10);

// // //     const localDips = [];
// // //     for (let i = 3; i < plotData.length - 3; i++) {
// // //       const f = plotData[i].flux;
// // //       if (f < DIP_THRESHOLD &&
// // //           f <= plotData[i-1].flux && f <= plotData[i-2].flux && f <= plotData[i-3].flux &&
// // //           f <= plotData[i+1].flux && f <= plotData[i+2].flux && f <= plotData[i+3].flux) {
// // //         const lastTime = localDips.length ? localDips[localDips.length-1].time : -Infinity;
// // //         // Enforce minimum time separation in real BJD days
// // //         if (plotData[i].time - lastTime > MIN_DIP_TIME_SEP)
// // //           localDips.push({ idx: i, time: plotData[i].time, flux: plotData[i].flux });
// // //       }
// // //     }

// // //     // Score all candidate periods using real BJD time differences
// // //     const candidates = [];
// // //     for (let a = 0; a < localDips.length; a++) {
// // //       for (let b = a + 1; b < localDips.length; b++) {
// // //         const P = localDips[b].time - localDips[a].time;
// // //         if (P < minPeriod) continue;
// // //         // A dip matches if its phase is within 8% of the period from 0
// // //         const explained = localDips.filter(d => {
// // //           const phase = ((d.time - localDips[a].time) % P + P) % P;
// // //           return phase < P * 0.08 || phase > P * 0.92;
// // //         });
// // //         // Require ≥3 matching dips — eliminates most noise coincidences
// // //         if (explained.length >= 3)
// // //           candidates.push({ period: P, anchor: localDips[a], dips: explained });
// // //       }
// // //     }
// // //     candidates.sort((a, b) => b.dips.length - a.dips.length || a.period - b.period);

// // //     // Deduplicate periods within 5% of each other (keep highest-scoring)
// // //     const deduped = [];
// // //     for (const cand of candidates) {
// // //       if (!deduped.some(d => Math.abs(d.period - cand.period) / d.period < 0.05))
// // //         deduped.push(cand);
// // //     }

// // //     // Keep non-harmonic candidates, max 2
// // //     const usedDips = new Set();
// // //     for (const cand of deduped) {
// // //       const newDips = cand.dips.filter(d => !usedDips.has(d.idx));
// // //       if (newDips.length < 3) continue;
// // //       const isHarmonic = periodicGroups.some(g => {
// // //         const r = cand.period / g.period, n = Math.round(r);
// // //         const r2 = g.period / cand.period, n2 = Math.round(r2);
// // //         return (n >= 1 && Math.abs(r-n) < 0.12) || (n2 >= 2 && Math.abs(r2-n2) < 0.12);
// // //       });
// // //       if (isHarmonic) continue;
// // //       periodicGroups.push({ period: cand.period, dips: newDips });
// // //       newDips.forEach(d => usedDips.add(d.idx));
// // //       if (periodicGroups.length >= 2) break;
// // //     }
// // //   }

// // //   // ── 6. Backend transit markers ─────────────────────────────────────────────
// // //   const backendTransits = [];
// // //   if (showCircles) {
// // //     planets.forEach((p, pi) => {
// // //       if (!p?.period || !p?.t0) return;
// // //       let t = p.t0;
// // //       while (t <= tMax) {
// // //         if (t >= tMin) backendTransits.push({ time: t, planetIdx: pi });
// // //         t += p.period;
// // //       }
// // //     });
// // //   }

// // //   // ── 7. Ticks ───────────────────────────────────────────────────────────────
// // //   const xTicks = Array.from({ length: 7 }, (_, i) => tMin + (i/6)*(tMax-tMin));
// // //   const yTicks = Array.from({ length: 6 }, (_, i) => fMin + (i/5)*(fMax-fMin));
// // //   const COLORS = ["#ff4444", "#44aaff", "#44ff88", "#ffaa00", "#cc44ff"];

// // //   // ── 8. Render ──────────────────────────────────────────────────────────────
// // //   return (
// // //     <div style={{ overflowX: "auto" }}>
// // //       <svg width={width} height={height}
// // //         style={{ background: "#fff", display: "block", fontFamily: "sans-serif" }}>

// // //         {/* Grid */}
// // //         {yTicks.map((f, i) => (
// // //           <line key={`yg${i}`} x1={margin.left} y1={sy(f)}
// // //             x2={margin.left+innerW} y2={sy(f)} stroke="#ebebeb" strokeWidth="1" />
// // //         ))}
// // //         {xTicks.map((t, i) => (
// // //           <line key={`xg${i}`} x1={sx(t)} y1={margin.top}
// // //             x2={sx(t)} y2={margin.top+innerH} stroke="#ebebeb" strokeWidth="1" />
// // //         ))}

// // //         {/* Median reference */}
// // //         <line x1={margin.left} y1={sy(median)} x2={margin.left+innerW} y2={sy(median)}
// // //           stroke="#bbb" strokeWidth="0.8" strokeDasharray="6,4" />

// // //         {/* Dip threshold (only when circles shown) */}
// // //         {showCircles && DIP_THRESHOLD > fMin && (
// // //           <line x1={margin.left} y1={sy(DIP_THRESHOLD)}
// // //             x2={margin.left+innerW} y2={sy(DIP_THRESHOLD)}
// // //             stroke="#ffaaaa" strokeWidth="0.8" strokeDasharray="4,3" />
// // //         )}

// // //         {/* The line */}
// // //         <path d={pathStr} fill="none" stroke="#1a1a1a" strokeWidth="0.9" strokeLinejoin="round" />

// // //         {/* Periodic dip circles */}
// // //         {periodicGroups.map((grp, gi) =>
// // //           grp.dips.map((dip, di) => (
// // //             <g key={`dip-${gi}-${di}`}>
// // //               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="14"
// // //                 fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="2" />
// // //               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="2.5"
// // //                 fill={COLORS[gi % COLORS.length]} />
// // //               {di === 0 && (
// // //                 <text x={sx(dip.time)} y={sy(dip.flux)-20}
// // //                   textAnchor="middle" fontSize="10" fontWeight="bold"
// // //                   fill={COLORS[gi % COLORS.length]}>
// // //                   P≈{grp.period.toFixed(2)}d
// // //                 </text>
// // //               )}
// // //             </g>
// // //           ))
// // //         )}

// // //         {/* Backend transit lines */}
// // //         {backendTransits.map((bt, i) => (
// // //           <line key={`bt-${i}`} x1={sx(bt.time)} y1={margin.top}
// // //             x2={sx(bt.time)} y2={margin.top+innerH}
// // //             stroke={COLORS[(bt.planetIdx + periodicGroups.length) % COLORS.length]}
// // //             strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
// // //         ))}

// // //         {/* Axes */}
// // //         <line x1={margin.left} y1={margin.top+innerH}
// // //           x2={margin.left+innerW} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />
// // //         <line x1={margin.left} y1={margin.top}
// // //           x2={margin.left} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />

// // //         {/* X ticks */}
// // //         {xTicks.map((t, i) => (
// // //           <g key={`xt${i}`}>
// // //             <line x1={sx(t)} y1={margin.top+innerH} x2={sx(t)} y2={margin.top+innerH+5} stroke="#333" />
// // //             <text x={sx(t)} y={margin.top+innerH+18} textAnchor="middle" fontSize="11" fill="#333">
// // //               {t.toFixed(1)}
// // //             </text>
// // //           </g>
// // //         ))}

// // //         {/* Y ticks */}
// // //         {yTicks.map((f, i) => (
// // //           <g key={`yt${i}`}>
// // //             <line x1={margin.left-5} y1={sy(f)} x2={margin.left} y2={sy(f)} stroke="#333" />
// // //             <text x={margin.left-8} y={sy(f)+4} textAnchor="end" fontSize="11" fill="#333">
// // //               {f.toFixed(4)}
// // //             </text>
// // //           </g>
// // //         ))}

// // //         {/* Axis labels */}
// // //         <text x={width/2} y={height-10} textAnchor="middle" fontSize="13" fill="#333">
// // //           Time (BJD)
// // //         </text>
// // //         <text x={16} y={height/2} textAnchor="middle" fontSize="13" fill="#333"
// // //           transform={`rotate(-90 16 ${height/2})`}>
// // //           Normalized Flux
// // //         </text>

// // //         {/* Legend */}
// // //         {showCircles && periodicGroups.length > 0 && (
// // //           <g>
// // //             {periodicGroups.map((grp, gi) => (
// // //               <g key={`leg${gi}`}>
// // //                 <circle cx={margin.left + 16 + gi*190} cy={margin.top-18} r="6"
// // //                   fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="1.8" />
// // //                 <text x={margin.left + 28 + gi*190} y={margin.top-14}
// // //                   fontSize="11" fill={COLORS[gi % COLORS.length]} fontWeight="bold">
// // //                   Candidate {gi+1} — P={grp.period.toFixed(3)} d ({grp.dips.length} transits)
// // //                 </text>
// // //               </g>
// // //             ))}
// // //           </g>
// // //         )}

// // //         {showCircles && periodicGroups.length === 0 && (
// // //           <text x={width/2} y={margin.top-16} textAnchor="middle" fontSize="11" fill="#aaa">
// // //             No periodic transit signal detected above threshold
// // //           </text>
// // //         )}
// // //       </svg>
// // //     </div>
// // //   );
// // // }

// // /**
// //  * LightCurvePlot.jsx
// //  * Props:
// //  *   data        — array of {time, flux}
// //  *   planets     — backend planet detections (optional)
// //  *   showCircles — boolean: whether to draw the periodic-dip circles
// //  */
// // export default function LightCurvePlot({ data, planets = [], showCircles = true, dipSigma = 2.5, minPeriod = 0.3 }) {
// //   if (!Array.isArray(data) || data.length < 10) return <p>No data to plot.</p>;

// //   // ── 1. Downsample ──────────────────────────────────────────────────────────
// //   const MAX_POINTS = 8000;
// //   const stride = data.length > MAX_POINTS ? Math.ceil(data.length / MAX_POINTS) : 1;
// //   const raw = data
// //     .filter((_, i) => i % stride === 0)
// //     .filter(d => Number.isFinite(d.time) && Number.isFinite(d.flux));

// //   if (raw.length < 2) return <p>Not enough valid points.</p>;

// //   // ── 2. Inline normalise + detrend (divides by median, removes polynomial trend)
// //   //    This ensures dip detection works regardless of whether backend normalised.
// //   const rawFluxes = raw.map(d => d.flux);
// //   const sorted0   = [...rawFluxes].sort((a, b) => a - b);
// //   const fluxMedian = sorted0[Math.floor(sorted0.length / 2)];

// //   // Normalise to ~1.0
// //   let plotData = raw.map(d => ({ time: d.time, flux: d.flux / fluxMedian }));

// //   // Detrend: fit linear baseline over 20 equal bins, subtract it
// //   const tAll  = plotData.map(d => d.time);
// //   const tMin0 = Math.min(...tAll);
// //   const tMax0 = Math.max(...tAll);
// //   const N_BINS = 20;
// //   const bins  = Array.from({ length: N_BINS }, () => ({ sum: 0, n: 0 }));
// //   plotData.forEach(d => {
// //     const bi = Math.min(N_BINS - 1, Math.floor((d.time - tMin0) / (tMax0 - tMin0 + 1e-9) * N_BINS));
// //     bins[bi].sum += d.flux; bins[bi].n++;
// //   });
// //   const binMeds = bins.map((b, i) => ({
// //     t: tMin0 + (i + 0.5) / N_BINS * (tMax0 - tMin0),
// //     f: b.n > 0 ? b.sum / b.n : 1.0,
// //   }));
// //   // Simple linear fit through bin medians
// //   const bx = binMeds.map(b => b.t), by = binMeds.map(b => b.f);
// //   const bxm = bx.reduce((a,v)=>a+v,0)/bx.length, bym = by.reduce((a,v)=>a+v,0)/by.length;
// //   const slope = bx.reduce((a,v,i)=>a+(v-bxm)*(by[i]-bym),0) /
// //                 bx.reduce((a,v)=>a+(v-bxm)**2,0);
// //   const intercept = bym - slope * bxm;
// //   plotData = plotData.map(d => ({
// //     time: d.time,
// //     flux: d.flux / (slope * d.time + intercept), // divide to flatten trend
// //   }));

// //   // ── 3. SVG layout ──────────────────────────────────────────────────────────
// //   const width  = 1000;
// //   const height = 420;
// //   const margin = { top: 40, right: 24, bottom: 62, left: 80 };
// //   const innerW = width  - margin.left - margin.right;
// //   const innerH = height - margin.top  - margin.bottom;

// //   const times  = plotData.map(d => d.time);
// //   const fluxes = plotData.map(d => d.flux);
// //   const tMin = Math.min(...times);
// //   const tMax = Math.max(...times);

// //   const sortedF = [...fluxes].sort((a, b) => a - b);
// //   const p01  = sortedF[Math.floor(sortedF.length * 0.01)];
// //   const p99  = sortedF[Math.floor(sortedF.length * 0.99)];
// //   const pad  = (p99 - p01) * 0.15 || 0.002;
// //   const fMin = p01 - pad;
// //   const fMax = p99 + pad;

// //   const sx = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
// //   const sy = f => margin.top  + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

// //   // ── 4. Line path with gap-breaking ─────────────────────────────────────────
// //   const medianDt = (() => {
// //     const dts = [];
// //     for (let i = 1; i < Math.min(plotData.length, 500); i++)
// //       dts.push(plotData[i].time - plotData[i-1].time);
// //     dts.sort((a,b) => a-b);
// //     return dts[Math.floor(dts.length/2)] || 1;
// //   })();

// //   // Build two paths:
// //   // 1. solidPath  — connected line, breaks only at very large gaps (> 50 cadences)
// //   // 2. gapPath    — faint dashed bridge across medium gaps (5–50 cadences)
// //   let solidPath = "";
// //   let gapBridges = []; // [{x1,y1,x2,y2}]
// //   let lastSolidEnd = null;

// //   for (let i = 0; i < plotData.length; i++) {
// //     const dt = i === 0 ? 0 : plotData[i].time - plotData[i-1].time;
// //     const isLargeGap  = dt > medianDt * 50;   // true data gap → break line
// //     const isMediumGap = dt > medianDt * 5 && !isLargeGap; // sector gap → bridge

// //     if (i === 0 || isLargeGap) {
// //       solidPath += `M${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
// //       if (isLargeGap && lastSolidEnd) {
// //         // Draw a faint bridge connecting the two sectors
// //         gapBridges.push({
// //           x1: lastSolidEnd.x, y1: lastSolidEnd.y,
// //           x2: sx(plotData[i].time), y2: sy(plotData[i].flux)
// //         });
// //       }
// //     } else {
// //       solidPath += `L${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
// //     }
// //     lastSolidEnd = { x: sx(plotData[i].time), y: sy(plotData[i].flux) };
// //   }

// //   // ── 5. Dip detection (only when showCircles=true) ──────────────────────────
// //   const median = sortedF[Math.floor(sortedF.length / 2)];
// //   const std    = Math.sqrt(fluxes.reduce((a,f) => a + (f-median)**2, 0) / fluxes.length);
// //   const DIP_THRESHOLD = median - dipSigma * std;

// //   let periodicGroups = [];

// //   if (showCircles) {
// //     // Estimate cadence from median time step
// //     const dtMedian = (() => {
// //       const dts = [];
// //       for (let i = 1; i < Math.min(plotData.length, 200); i++)
// //         dts.push(plotData[i].time - plotData[i-1].time);
// //       dts.sort((a, b) => a - b);
// //       return dts[Math.floor(dts.length / 2)] || 0.02;
// //     })();
// //     // Minimum real-time separation between dips: minPeriod / 4 (or at least 10 cadences)
// //     const MIN_DIP_TIME_SEP = Math.max(minPeriod * 0.25, dtMedian * 10);

// //     const localDips = [];
// //     for (let i = 3; i < plotData.length - 3; i++) {
// //       const f = plotData[i].flux;
// //       if (f < DIP_THRESHOLD &&
// //           f <= plotData[i-1].flux && f <= plotData[i-2].flux && f <= plotData[i-3].flux &&
// //           f <= plotData[i+1].flux && f <= plotData[i+2].flux && f <= plotData[i+3].flux) {
// //         const lastTime = localDips.length ? localDips[localDips.length-1].time : -Infinity;
// //         // Enforce minimum time separation in real BJD days
// //         if (plotData[i].time - lastTime > MIN_DIP_TIME_SEP)
// //           localDips.push({ idx: i, time: plotData[i].time, flux: plotData[i].flux });
// //       }
// //     }

// //     // Score all candidate periods using real BJD time differences
// //     const candidates = [];
// //     for (let a = 0; a < localDips.length; a++) {
// //       for (let b = a + 1; b < localDips.length; b++) {
// //         const P = localDips[b].time - localDips[a].time;
// //         if (P < minPeriod) continue;
// //         // A dip matches if its phase is within 8% of the period from 0
// //         const explained = localDips.filter(d => {
// //           const phase = ((d.time - localDips[a].time) % P + P) % P;
// //           return phase < P * 0.08 || phase > P * 0.92;
// //         });
// //         // Require ≥3 matching dips — eliminates most noise coincidences
// //         if (explained.length >= 3)
// //           candidates.push({ period: P, anchor: localDips[a], dips: explained });
// //       }
// //     }
// //     candidates.sort((a, b) => b.dips.length - a.dips.length || a.period - b.period);

// //     // Deduplicate periods within 5% of each other (keep highest-scoring)
// //     const deduped = [];
// //     for (const cand of candidates) {
// //       if (!deduped.some(d => Math.abs(d.period - cand.period) / d.period < 0.05))
// //         deduped.push(cand);
// //     }

// //     // Keep non-harmonic candidates, max 2
// //     const usedDips = new Set();
// //     for (const cand of deduped) {
// //       const newDips = cand.dips.filter(d => !usedDips.has(d.idx));
// //       if (newDips.length < 3) continue;
// //       const isHarmonic = periodicGroups.some(g => {
// //         const r = cand.period / g.period, n = Math.round(r);
// //         const r2 = g.period / cand.period, n2 = Math.round(r2);
// //         return (n >= 1 && Math.abs(r-n) < 0.12) || (n2 >= 2 && Math.abs(r2-n2) < 0.12);
// //       });
// //       if (isHarmonic) continue;
// //       periodicGroups.push({ period: cand.period, dips: newDips });
// //       newDips.forEach(d => usedDips.add(d.idx));
// //       if (periodicGroups.length >= 2) break;
// //     }
// //   }

// //   // ── 6. Backend transit markers ─────────────────────────────────────────────
// //   const backendTransits = [];
// //   if (showCircles) {
// //     planets.forEach((p, pi) => {
// //       if (!p?.period || !p?.t0) return;
// //       let t = p.t0;
// //       while (t <= tMax) {
// //         if (t >= tMin) backendTransits.push({ time: t, planetIdx: pi });
// //         t += p.period;
// //       }
// //     });
// //   }

// //   // ── 7. Ticks ───────────────────────────────────────────────────────────────
// //   const xTicks = Array.from({ length: 7 }, (_, i) => tMin + (i/6)*(tMax-tMin));
// //   const yTicks = Array.from({ length: 6 }, (_, i) => fMin + (i/5)*(fMax-fMin));
// //   const COLORS = ["#ff4444", "#44aaff", "#44ff88", "#ffaa00", "#cc44ff"];

// //   // ── 8. Render ──────────────────────────────────────────────────────────────
// //   return (
// //     <div style={{ overflowX: "auto" }}>
// //       <svg width={width} height={height}
// //         style={{ background: "#fff", display: "block", fontFamily: "sans-serif" }}>

// //         {/* Grid */}
// //         {yTicks.map((f, i) => (
// //           <line key={`yg${i}`} x1={margin.left} y1={sy(f)}
// //             x2={margin.left+innerW} y2={sy(f)} stroke="#ebebeb" strokeWidth="1" />
// //         ))}
// //         {xTicks.map((t, i) => (
// //           <line key={`xg${i}`} x1={sx(t)} y1={margin.top}
// //             x2={sx(t)} y2={margin.top+innerH} stroke="#ebebeb" strokeWidth="1" />
// //         ))}

// //         {/* Median reference */}
// //         <line x1={margin.left} y1={sy(median)} x2={margin.left+innerW} y2={sy(median)}
// //           stroke="#bbb" strokeWidth="0.8" strokeDasharray="6,4" />

// //         {/* Dip threshold (only when circles shown) */}
// //         {showCircles && DIP_THRESHOLD > fMin && (
// //           <line x1={margin.left} y1={sy(DIP_THRESHOLD)}
// //             x2={margin.left+innerW} y2={sy(DIP_THRESHOLD)}
// //             stroke="#ffaaaa" strokeWidth="0.8" strokeDasharray="4,3" />
// //         )}

// //         {/* Gap bridges — faint dashed line connecting sectors */}
// //         {gapBridges.map((b, i) => (
// //           <line key={`gap${i}`} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
// //             stroke="#bbb" strokeWidth="0.7" strokeDasharray="4,4" />
// //         ))}

// //         {/* The main line */}
// //         <path d={solidPath} fill="none" stroke="#1a1a1a" strokeWidth="0.9" strokeLinejoin="round" />

// //         {/* Periodic dip circles */}
// //         {periodicGroups.map((grp, gi) =>
// //           grp.dips.map((dip, di) => (
// //             <g key={`dip-${gi}-${di}`}>
// //               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="14"
// //                 fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="2" />
// //               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="2.5"
// //                 fill={COLORS[gi % COLORS.length]} />
// //               {di === 0 && (
// //                 <text x={sx(dip.time)} y={sy(dip.flux)-20}
// //                   textAnchor="middle" fontSize="10" fontWeight="bold"
// //                   fill={COLORS[gi % COLORS.length]}>
// //                   P≈{grp.period.toFixed(2)}d
// //                 </text>
// //               )}
// //             </g>
// //           ))
// //         )}

// //         {/* Backend transit lines */}
// //         {backendTransits.map((bt, i) => (
// //           <line key={`bt-${i}`} x1={sx(bt.time)} y1={margin.top}
// //             x2={sx(bt.time)} y2={margin.top+innerH}
// //             stroke={COLORS[(bt.planetIdx + periodicGroups.length) % COLORS.length]}
// //             strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
// //         ))}

// //         {/* Axes */}
// //         <line x1={margin.left} y1={margin.top+innerH}
// //           x2={margin.left+innerW} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />
// //         <line x1={margin.left} y1={margin.top}
// //           x2={margin.left} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />

// //         {/* X ticks */}
// //         {xTicks.map((t, i) => (
// //           <g key={`xt${i}`}>
// //             <line x1={sx(t)} y1={margin.top+innerH} x2={sx(t)} y2={margin.top+innerH+5} stroke="#333" />
// //             <text x={sx(t)} y={margin.top+innerH+18} textAnchor="middle" fontSize="11" fill="#333">
// //               {t.toFixed(1)}
// //             </text>
// //           </g>
// //         ))}

// //         {/* Y ticks */}
// //         {yTicks.map((f, i) => (
// //           <g key={`yt${i}`}>
// //             <line x1={margin.left-5} y1={sy(f)} x2={margin.left} y2={sy(f)} stroke="#333" />
// //             <text x={margin.left-8} y={sy(f)+4} textAnchor="end" fontSize="11" fill="#333">
// //               {f.toFixed(4)}
// //             </text>
// //           </g>
// //         ))}

// //         {/* Axis labels */}
// //         <text x={width/2} y={height-10} textAnchor="middle" fontSize="13" fill="#333">
// //           Time (BJD)
// //         </text>
// //         <text x={16} y={height/2} textAnchor="middle" fontSize="13" fill="#333"
// //           transform={`rotate(-90 16 ${height/2})`}>
// //           Normalized Flux
// //         </text>

// //         {/* Legend */}
// //         {showCircles && periodicGroups.length > 0 && (
// //           <g>
// //             {periodicGroups.map((grp, gi) => (
// //               <g key={`leg${gi}`}>
// //                 <circle cx={margin.left + 16 + gi*190} cy={margin.top-18} r="6"
// //                   fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="1.8" />
// //                 <text x={margin.left + 28 + gi*190} y={margin.top-14}
// //                   fontSize="11" fill={COLORS[gi % COLORS.length]} fontWeight="bold">
// //                   Candidate {gi+1} — P={grp.period.toFixed(3)} d ({grp.dips.length} transits)
// //                 </text>
// //               </g>
// //             ))}
// //           </g>
// //         )}

// //         {showCircles && periodicGroups.length === 0 && (
// //           <text x={width/2} y={margin.top-16} textAnchor="middle" fontSize="11" fill="#aaa">
// //             No periodic transit signal detected above threshold
// //           </text>
// //         )}
// //       </svg>
// //     </div>
// //   );
// // }

// /**
//  * LightCurvePlot.jsx
//  * Props:
//  *   data        — array of {time, flux}
//  *   planets     — backend planet detections (optional)
//  *   showCircles — boolean: whether to draw the periodic-dip circles
//  */
// export default function LightCurvePlot({ data, planets = [], showCircles = true, dipSigma = 2.5, minPeriod = 0.3 }) {
//   if (!Array.isArray(data) || data.length < 10) return <p>No data to plot.</p>;

//   // ── 1. Downsample ──────────────────────────────────────────────────────────
//   const MAX_POINTS = 8000;
//   const stride = data.length > MAX_POINTS ? Math.ceil(data.length / MAX_POINTS) : 1;
//   const raw = data
//     .filter((_, i) => i % stride === 0)
//     .filter(d => Number.isFinite(d.time) && Number.isFinite(d.flux));

//   if (raw.length < 2) return <p>Not enough valid points.</p>;

//   // ── 2. Inline normalise + detrend (divides by median, removes polynomial trend)
//   //    This ensures dip detection works regardless of whether backend normalised.
//   const rawFluxes = raw.map(d => d.flux);
//   const sorted0   = [...rawFluxes].sort((a, b) => a - b);
//   const fluxMedian = sorted0[Math.floor(sorted0.length / 2)];

//   // Normalise to ~1.0
//   let plotData = raw.map(d => ({ time: d.time, flux: d.flux / fluxMedian }));

//   // Detrend: fit linear baseline over 20 equal bins, subtract it
//   const tAll  = plotData.map(d => d.time);
//   const tMin0 = Math.min(...tAll);
//   const tMax0 = Math.max(...tAll);
//   const N_BINS = 20;
//   const bins  = Array.from({ length: N_BINS }, () => ({ sum: 0, n: 0 }));
//   plotData.forEach(d => {
//     const bi = Math.min(N_BINS - 1, Math.floor((d.time - tMin0) / (tMax0 - tMin0 + 1e-9) * N_BINS));
//     bins[bi].sum += d.flux; bins[bi].n++;
//   });
//   const binMeds = bins.map((b, i) => ({
//     t: tMin0 + (i + 0.5) / N_BINS * (tMax0 - tMin0),
//     f: b.n > 0 ? b.sum / b.n : 1.0,
//   }));
//   // Simple linear fit through bin medians
//   const bx = binMeds.map(b => b.t), by = binMeds.map(b => b.f);
//   const bxm = bx.reduce((a,v)=>a+v,0)/bx.length, bym = by.reduce((a,v)=>a+v,0)/by.length;
//   const slope = bx.reduce((a,v,i)=>a+(v-bxm)*(by[i]-bym),0) /
//                 bx.reduce((a,v)=>a+(v-bxm)**2,0);
//   const intercept = bym - slope * bxm;
//   plotData = plotData.map(d => ({
//     time: d.time,
//     flux: d.flux / (slope * d.time + intercept), // divide to flatten trend
//   }));

//   // ── 3. SVG layout ──────────────────────────────────────────────────────────
//   const width  = 1000;
//   const height = 420;
//   const margin = { top: 40, right: 24, bottom: 62, left: 80 };
//   const innerW = width  - margin.left - margin.right;
//   const innerH = height - margin.top  - margin.bottom;

//   const times  = plotData.map(d => d.time);
//   const fluxes = plotData.map(d => d.flux);
//   const tMin = Math.min(...times);
//   const tMax = Math.max(...times);

//   const sortedF = [...fluxes].sort((a, b) => a - b);
//   const p01  = sortedF[Math.floor(sortedF.length * 0.01)];
//   const p99  = sortedF[Math.floor(sortedF.length * 0.99)];
//   const pad  = (p99 - p01) * 0.15 || 0.002;
//   const fMin = p01 - pad;
//   const fMax = p99 + pad;

//   const sx = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
//   const sy = f => margin.top  + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

//   // ── 4. Line path with gap-breaking ─────────────────────────────────────────
//   const medianDt = (() => {
//     const dts = [];
//     for (let i = 1; i < Math.min(plotData.length, 500); i++)
//       dts.push(plotData[i].time - plotData[i-1].time);
//     dts.sort((a,b) => a-b);
//     return dts[Math.floor(dts.length/2)] || 1;
//   })();

//   // Build two paths:
//   // 1. solidPath  — connected line, breaks only at very large gaps (> 50 cadences)
//   // 2. gapPath    — faint dashed bridge across medium gaps (5–50 cadences)
//   let solidPath = "";
//   let gapBridges = []; // [{x1,y1,x2,y2}]
//   let lastSolidEnd = null;

//   for (let i = 0; i < plotData.length; i++) {
//     const dt = i === 0 ? 0 : plotData[i].time - plotData[i-1].time;
//     const isLargeGap  = dt > medianDt * 50;   // true data gap → break line
//     const isMediumGap = dt > medianDt * 5 && !isLargeGap; // sector gap → bridge

//     if (i === 0 || isLargeGap) {
//       solidPath += `M${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
//       if (isLargeGap && lastSolidEnd) {
//         // Draw a faint bridge connecting the two sectors
//         gapBridges.push({
//           x1: lastSolidEnd.x, y1: lastSolidEnd.y,
//           x2: sx(plotData[i].time), y2: sy(plotData[i].flux)
//         });
//       }
//     } else {
//       solidPath += `L${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
//     }
//     lastSolidEnd = { x: sx(plotData[i].time), y: sy(plotData[i].flux) };
//   }

//   // ── 5. Dip detection (only when showCircles=true) ──────────────────────────
//   const median = sortedF[Math.floor(sortedF.length / 2)];
//   const std    = Math.sqrt(fluxes.reduce((a,f) => a + (f-median)**2, 0) / fluxes.length);
//   const DIP_THRESHOLD = median - dipSigma * std;

//   let periodicGroups = [];

//   if (showCircles) {
//     // Estimate cadence from median time step
//     const dtMedian = (() => {
//       const dts = [];
//       for (let i = 1; i < Math.min(plotData.length, 200); i++)
//         dts.push(plotData[i].time - plotData[i-1].time);
//       dts.sort((a, b) => a - b);
//       return dts[Math.floor(dts.length / 2)] || 0.02;
//     })();
//     // Minimum real-time separation between dips: minPeriod / 4 (or at least 10 cadences)
//     const MIN_DIP_TIME_SEP = Math.max(minPeriod * 0.25, dtMedian * 10);

//     const localDips = [];
//     for (let i = 3; i < plotData.length - 3; i++) {
//       const f = plotData[i].flux;
//       if (f < DIP_THRESHOLD &&
//           f <= plotData[i-1].flux && f <= plotData[i-2].flux && f <= plotData[i-3].flux &&
//           f <= plotData[i+1].flux && f <= plotData[i+2].flux && f <= plotData[i+3].flux) {
//         const lastTime = localDips.length ? localDips[localDips.length-1].time : -Infinity;
//         // Enforce minimum time separation in real BJD days
//         if (plotData[i].time - lastTime > MIN_DIP_TIME_SEP)
//           localDips.push({ idx: i, time: plotData[i].time, flux: plotData[i].flux });
//       }
//     }

//     // ── Only use ADJACENT dip pairs to estimate period ──────────────────────
//     // This prevents measuring a long "first-to-last" span as the period.
//     // We collect spacings between consecutive dips, find the most common one.
//     const adjSpacings = [];
//     for (let i = 1; i < localDips.length; i++) {
//       const dt = localDips[i].time - localDips[i-1].time;
//       if (dt >= minPeriod && dt < (tMax - tMin) * 0.25) // cap at 25% of total span
//         adjSpacings.push({ period: dt, anchor: localDips[i-1] });
//     }

//     // Cluster adjacent spacings — group ones within 15% of each other
//     const clusters = [];
//     for (const sp of adjSpacings) {
//       const existing = clusters.find(c => Math.abs(c.period - sp.period) / c.period < 0.15);
//       if (existing) {
//         existing.periods.push(sp.period);
//         existing.period = existing.periods.reduce((a,b) => a+b) / existing.periods.length;
//         existing.count++;
//       } else {
//         clusters.push({ period: sp.period, periods: [sp.period], count: 1, anchor: sp.anchor });
//       }
//     }
//     // Best period = most common adjacent spacing
//     clusters.sort((a, b) => b.count - a.count);

//     // Score candidates using the clustered periods (not all pairs)
//     const candidates = [];
//     for (const cl of clusters.slice(0, 5)) { // only top 5 clusters
//       const P = cl.period;
//       const anchor = cl.anchor;
//       const explained = localDips.filter(d => {
//         const phase = ((d.time - anchor.time) % P + P) % P;
//         return phase < P * 0.12 || phase > P * 0.88;
//       });
//       if (explained.length >= 3)
//         candidates.push({ period: P, anchor, dips: explained, count: cl.count });
//     }
//     candidates.sort((a, b) => b.dips.length - a.dips.length || a.period - b.period);

//     // Deduplicate periods within 10% of each other
//     const deduped = [];
//     for (const cand of candidates) {
//       if (!deduped.some(d => Math.abs(d.period - cand.period) / d.period < 0.10))
//         deduped.push(cand);
//     }

//     // Keep non-harmonic candidates, max 2
//     const usedDips = new Set();
//     for (const cand of deduped) {
//       const newDips = cand.dips.filter(d => !usedDips.has(d.idx));
//       if (newDips.length < 3) continue;
//       const isHarmonic = periodicGroups.some(g => {
//         const r = cand.period / g.period, n = Math.round(r);
//         const r2 = g.period / cand.period, n2 = Math.round(r2);
//         return (n >= 1 && Math.abs(r-n) < 0.12) || (n2 >= 2 && Math.abs(r2-n2) < 0.12);
//       });
//       if (isHarmonic) continue;
//       periodicGroups.push({ period: cand.period, dips: newDips });
//       newDips.forEach(d => usedDips.add(d.idx));
//       if (periodicGroups.length >= 2) break;
//     }
//   }

//   // ── 6. Backend transit markers ─────────────────────────────────────────────
//   const backendTransits = [];
//   if (showCircles) {
//     planets.forEach((p, pi) => {
//       if (!p?.period || !p?.t0) return;
//       let t = p.t0;
//       while (t <= tMax) {
//         if (t >= tMin) backendTransits.push({ time: t, planetIdx: pi });
//         t += p.period;
//       }
//     });
//   }

//   // ── 7. Ticks ───────────────────────────────────────────────────────────────
//   const xTicks = Array.from({ length: 7 }, (_, i) => tMin + (i/6)*(tMax-tMin));
//   const yTicks = Array.from({ length: 6 }, (_, i) => fMin + (i/5)*(fMax-fMin));
//   const COLORS = ["#ff4444", "#44aaff", "#44ff88", "#ffaa00", "#cc44ff"];

//   // ── 8. Render ──────────────────────────────────────────────────────────────
//   return (
//     <div style={{ overflowX: "auto" }}>
//       <svg width={width} height={height}
//         style={{ background: "#fff", display: "block", fontFamily: "sans-serif" }}>

//         {/* Grid */}
//         {yTicks.map((f, i) => (
//           <line key={`yg${i}`} x1={margin.left} y1={sy(f)}
//             x2={margin.left+innerW} y2={sy(f)} stroke="#ebebeb" strokeWidth="1" />
//         ))}
//         {xTicks.map((t, i) => (
//           <line key={`xg${i}`} x1={sx(t)} y1={margin.top}
//             x2={sx(t)} y2={margin.top+innerH} stroke="#ebebeb" strokeWidth="1" />
//         ))}

//         {/* Median reference */}
//         <line x1={margin.left} y1={sy(median)} x2={margin.left+innerW} y2={sy(median)}
//           stroke="#bbb" strokeWidth="0.8" strokeDasharray="6,4" />

//         {/* Dip threshold (only when circles shown) */}
//         {showCircles && DIP_THRESHOLD > fMin && (
//           <line x1={margin.left} y1={sy(DIP_THRESHOLD)}
//             x2={margin.left+innerW} y2={sy(DIP_THRESHOLD)}
//             stroke="#ffaaaa" strokeWidth="0.8" strokeDasharray="4,3" />
//         )}

//         {/* Gap bridges — faint dashed line connecting sectors */}
//         {gapBridges.map((b, i) => (
//           <line key={`gap${i}`} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
//             stroke="#bbb" strokeWidth="0.7" strokeDasharray="4,4" />
//         ))}

//         {/* The main line */}
//         <path d={solidPath} fill="none" stroke="#1a1a1a" strokeWidth="0.9" strokeLinejoin="round" />

//         {/* Periodic dip circles */}
//         {periodicGroups.map((grp, gi) =>
//           grp.dips.map((dip, di) => (
//             <g key={`dip-${gi}-${di}`}>
//               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="14"
//                 fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="2" />
//               <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="2.5"
//                 fill={COLORS[gi % COLORS.length]} />
//               {di === 0 && (
//                 <text x={sx(dip.time)} y={sy(dip.flux)-20}
//                   textAnchor="middle" fontSize="10" fontWeight="bold"
//                   fill={COLORS[gi % COLORS.length]}>
//                   P≈{grp.period.toFixed(2)}d
//                 </text>
//               )}
//             </g>
//           ))
//         )}

//         {/* Backend transit lines */}
//         {backendTransits.map((bt, i) => (
//           <line key={`bt-${i}`} x1={sx(bt.time)} y1={margin.top}
//             x2={sx(bt.time)} y2={margin.top+innerH}
//             stroke={COLORS[(bt.planetIdx + periodicGroups.length) % COLORS.length]}
//             strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
//         ))}

//         {/* Axes */}
//         <line x1={margin.left} y1={margin.top+innerH}
//           x2={margin.left+innerW} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />
//         <line x1={margin.left} y1={margin.top}
//           x2={margin.left} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />

//         {/* X ticks */}
//         {xTicks.map((t, i) => (
//           <g key={`xt${i}`}>
//             <line x1={sx(t)} y1={margin.top+innerH} x2={sx(t)} y2={margin.top+innerH+5} stroke="#333" />
//             <text x={sx(t)} y={margin.top+innerH+18} textAnchor="middle" fontSize="11" fill="#333">
//               {t.toFixed(1)}
//             </text>
//           </g>
//         ))}

//         {/* Y ticks */}
//         {yTicks.map((f, i) => (
//           <g key={`yt${i}`}>
//             <line x1={margin.left-5} y1={sy(f)} x2={margin.left} y2={sy(f)} stroke="#333" />
//             <text x={margin.left-8} y={sy(f)+4} textAnchor="end" fontSize="11" fill="#333">
//               {f.toFixed(4)}
//             </text>
//           </g>
//         ))}

//         {/* Axis labels */}
//         <text x={width/2} y={height-10} textAnchor="middle" fontSize="13" fill="#333">
//           Time (BJD)
//         </text>
//         <text x={16} y={height/2} textAnchor="middle" fontSize="13" fill="#333"
//           transform={`rotate(-90 16 ${height/2})`}>
//           Normalized Flux
//         </text>

//         {/* Legend */}
//         {showCircles && periodicGroups.length > 0 && (
//           <g>
//             {periodicGroups.map((grp, gi) => (
//               <g key={`leg${gi}`}>
//                 <circle cx={margin.left + 16 + gi*190} cy={margin.top-18} r="6"
//                   fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="1.8" />
//                 <text x={margin.left + 28 + gi*190} y={margin.top-14}
//                   fontSize="11" fill={COLORS[gi % COLORS.length]} fontWeight="bold">
//                   Candidate {gi+1} — P={grp.period.toFixed(3)} d ({grp.dips.length} transits)
//                 </text>
//               </g>
//             ))}
//           </g>
//         )}

//         {showCircles && periodicGroups.length === 0 && (
//           <text x={width/2} y={margin.top-16} textAnchor="middle" fontSize="11" fill="#aaa">
//             No periodic transit signal detected above threshold
//           </text>
//         )}
//       </svg>
//     </div>
//   );
// }

/**
 * LightCurvePlot.jsx  (fixed)
 * Fixes:
 *   1. clipPath on all plotted content — nothing leaks outside the axes
 *   2. viewBox + preserveAspectRatio makes the SVG responsive
 *   3. backend transit lines are also clipped
 */
export default function LightCurvePlot({ data, planets = [], showCircles = true, dipSigma = 2.5, minPeriod = 0.3 }) {
  if (!Array.isArray(data) || data.length < 10) return <p>No data to plot.</p>;

  // ── 1. Downsample ──────────────────────────────────────────────────────────
  const MAX_POINTS = 8000;
  const stride = data.length > MAX_POINTS ? Math.ceil(data.length / MAX_POINTS) : 1;
  const raw = data
    .filter((_, i) => i % stride === 0)
    .filter(d => Number.isFinite(d.time) && Number.isFinite(d.flux));

  if (raw.length < 2) return <p>Not enough valid points.</p>;

  // ── 2. Normalise + detrend ─────────────────────────────────────────────────
  const rawFluxes = raw.map(d => d.flux);
  const sorted0   = [...rawFluxes].sort((a, b) => a - b);
  const fluxMedian = sorted0[Math.floor(sorted0.length / 2)];

  let plotData = raw.map(d => ({ time: d.time, flux: d.flux / fluxMedian }));

  const tAll  = plotData.map(d => d.time);
  const tMin0 = Math.min(...tAll);
  const tMax0 = Math.max(...tAll);
  const N_BINS = 20;
  const bins  = Array.from({ length: N_BINS }, () => ({ sum: 0, n: 0 }));
  plotData.forEach(d => {
    const bi = Math.min(N_BINS - 1, Math.floor((d.time - tMin0) / (tMax0 - tMin0 + 1e-9) * N_BINS));
    bins[bi].sum += d.flux; bins[bi].n++;
  });
  const binMeds = bins.map((b, i) => ({
    t: tMin0 + (i + 0.5) / N_BINS * (tMax0 - tMin0),
    f: b.n > 0 ? b.sum / b.n : 1.0,
  }));
  const bx = binMeds.map(b => b.t), by = binMeds.map(b => b.f);
  const bxm = bx.reduce((a,v)=>a+v,0)/bx.length, bym = by.reduce((a,v)=>a+v,0)/by.length;
  const slope = bx.reduce((a,v,i)=>a+(v-bxm)*(by[i]-bym),0) /
                bx.reduce((a,v)=>a+(v-bxm)**2,0);
  const intercept = bym - slope * bxm;
  plotData = plotData.map(d => ({
    time: d.time,
    flux: d.flux / (slope * d.time + intercept),
  }));

  // ── 3. SVG layout ──────────────────────────────────────────────────────────
  const width  = 1000;
  const height = 420;
  const margin = { top: 40, right: 24, bottom: 62, left: 80 };
  const innerW = width  - margin.left - margin.right;
  const innerH = height - margin.top  - margin.bottom;
  const CLIP_ID = "lc-plot-clip";

  const times  = plotData.map(d => d.time);
  const fluxes = plotData.map(d => d.flux);
  const tMin = Math.min(...times);
  const tMax = Math.max(...times);

  const sortedF = [...fluxes].sort((a, b) => a - b);
  const p01  = sortedF[Math.floor(sortedF.length * 0.01)];
  const p99  = sortedF[Math.floor(sortedF.length * 0.99)];
  const pad  = (p99 - p01) * 0.15 || 0.002;
  const fMin = p01 - pad;
  const fMax = p99 + pad;

  const sx = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
  const sy = f => margin.top  + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

  // ── 4. Line path with gap-breaking ─────────────────────────────────────────
  const medianDt = (() => {
    const dts = [];
    for (let i = 1; i < Math.min(plotData.length, 500); i++)
      dts.push(plotData[i].time - plotData[i-1].time);
    dts.sort((a,b) => a-b);
    return dts[Math.floor(dts.length/2)] || 1;
  })();

  let solidPath = "";
  let gapBridges = [];
  let lastSolidEnd = null;

  for (let i = 0; i < plotData.length; i++) {
    const dt = i === 0 ? 0 : plotData[i].time - plotData[i-1].time;
    const isLargeGap = dt > medianDt * 50;

    if (i === 0 || isLargeGap) {
      solidPath += `M${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
      if (isLargeGap && lastSolidEnd) {
        gapBridges.push({
          x1: lastSolidEnd.x, y1: lastSolidEnd.y,
          x2: sx(plotData[i].time), y2: sy(plotData[i].flux)
        });
      }
    } else {
      solidPath += `L${sx(plotData[i].time).toFixed(1)},${sy(plotData[i].flux).toFixed(1)} `;
    }
    lastSolidEnd = { x: sx(plotData[i].time), y: sy(plotData[i].flux) };
  }

  // ── 5. Dip detection ───────────────────────────────────────────────────────
  const median = sortedF[Math.floor(sortedF.length / 2)];
  const std    = Math.sqrt(fluxes.reduce((a,f) => a + (f-median)**2, 0) / fluxes.length);
  const DIP_THRESHOLD = median - dipSigma * std;

  let periodicGroups = [];

  if (showCircles) {
    const dtMedian = (() => {
      const dts = [];
      for (let i = 1; i < Math.min(plotData.length, 200); i++)
        dts.push(plotData[i].time - plotData[i-1].time);
      dts.sort((a, b) => a - b);
      return dts[Math.floor(dts.length / 2)] || 0.02;
    })();
    const MIN_DIP_TIME_SEP = Math.max(minPeriod * 0.25, dtMedian * 10);

    const localDips = [];
    for (let i = 3; i < plotData.length - 3; i++) {
      const f = plotData[i].flux;
      if (f < DIP_THRESHOLD &&
          f <= plotData[i-1].flux && f <= plotData[i-2].flux && f <= plotData[i-3].flux &&
          f <= plotData[i+1].flux && f <= plotData[i+2].flux && f <= plotData[i+3].flux) {
        const lastTime = localDips.length ? localDips[localDips.length-1].time : -Infinity;
        if (plotData[i].time - lastTime > MIN_DIP_TIME_SEP)
          localDips.push({ idx: i, time: plotData[i].time, flux: plotData[i].flux });
      }
    }

    const adjSpacings = [];
    for (let i = 1; i < localDips.length; i++) {
      const dt = localDips[i].time - localDips[i-1].time;
      if (dt >= minPeriod && dt < (tMax - tMin) * 0.25)
        adjSpacings.push({ period: dt, anchor: localDips[i-1] });
    }

    const clusters = [];
    for (const sp of adjSpacings) {
      const existing = clusters.find(c => Math.abs(c.period - sp.period) / c.period < 0.15);
      if (existing) {
        existing.periods.push(sp.period);
        existing.period = existing.periods.reduce((a,b) => a+b) / existing.periods.length;
        existing.count++;
      } else {
        clusters.push({ period: sp.period, periods: [sp.period], count: 1, anchor: sp.anchor });
      }
    }
    clusters.sort((a, b) => b.count - a.count);

    const candidates = [];
    for (const cl of clusters.slice(0, 5)) {
      const P = cl.period;
      const anchor = cl.anchor;
      const explained = localDips.filter(d => {
        const phase = ((d.time - anchor.time) % P + P) % P;
        return phase < P * 0.12 || phase > P * 0.88;
      });
      if (explained.length >= 3)
        candidates.push({ period: P, anchor, dips: explained, count: cl.count });
    }
    candidates.sort((a, b) => b.dips.length - a.dips.length || a.period - b.period);

    const deduped = [];
    for (const cand of candidates) {
      if (!deduped.some(d => Math.abs(d.period - cand.period) / d.period < 0.10))
        deduped.push(cand);
    }

    const usedDips = new Set();
    for (const cand of deduped) {
      const newDips = cand.dips.filter(d => !usedDips.has(d.idx));
      if (newDips.length < 3) continue;
      const isHarmonic = periodicGroups.some(g => {
        const r = cand.period / g.period, n = Math.round(r);
        const r2 = g.period / cand.period, n2 = Math.round(r2);
        return (n >= 1 && Math.abs(r-n) < 0.12) || (n2 >= 2 && Math.abs(r2-n2) < 0.12);
      });
      if (isHarmonic) continue;
      periodicGroups.push({ period: cand.period, dips: newDips });
      newDips.forEach(d => usedDips.add(d.idx));
      if (periodicGroups.length >= 2) break;
    }
  }

  // ── 6. Backend transit markers ─────────────────────────────────────────────
  const backendTransits = [];
  if (showCircles) {
    planets.forEach((p, pi) => {
      if (!p?.period || !p?.t0) return;
      let t = p.t0;
      while (t <= tMax) {
        if (t >= tMin) backendTransits.push({ time: t, planetIdx: pi });
        t += p.period;
      }
    });
  }

  // ── 7. Ticks ───────────────────────────────────────────────────────────────
  const xTicks = Array.from({ length: 7 }, (_, i) => tMin + (i/6)*(tMax-tMin));
  const yTicks = Array.from({ length: 6 }, (_, i) => fMin + (i/5)*(fMax-fMin));
  const COLORS = ["#ff4444", "#44aaff", "#44ff88", "#ffaa00", "#cc44ff"];

  // ── 8. Render ──────────────────────────────────────────────────────────────
  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", maxWidth: width, display: "block", fontFamily: "sans-serif", background: "#fff" }}
      >
        {/* ── CLIP PATH — keeps everything inside the plot area ── */}
        <defs>
          <clipPath id={CLIP_ID}>
            <rect x={margin.left} y={margin.top} width={innerW} height={innerH} />
          </clipPath>
        </defs>

        {/* Grid — drawn inside clip */}
        <g clipPath={`url(#${CLIP_ID})`}>
          {yTicks.map((f, i) => (
            <line key={`yg${i}`} x1={margin.left} y1={sy(f)}
              x2={margin.left+innerW} y2={sy(f)} stroke="#ebebeb" strokeWidth="1" />
          ))}
          {xTicks.map((t, i) => (
            <line key={`xg${i}`} x1={sx(t)} y1={margin.top}
              x2={sx(t)} y2={margin.top+innerH} stroke="#ebebeb" strokeWidth="1" />
          ))}

          {/* Median reference */}
          <line x1={margin.left} y1={sy(median)} x2={margin.left+innerW} y2={sy(median)}
            stroke="#bbb" strokeWidth="0.8" strokeDasharray="6,4" />

          {/* Dip threshold */}
          {showCircles && DIP_THRESHOLD > fMin && (
            <line x1={margin.left} y1={sy(DIP_THRESHOLD)}
              x2={margin.left+innerW} y2={sy(DIP_THRESHOLD)}
              stroke="#ffaaaa" strokeWidth="0.8" strokeDasharray="4,3" />
          )}

          {/* Gap bridges */}
          {gapBridges.map((b, i) => (
            <line key={`gap${i}`} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
              stroke="#bbb" strokeWidth="0.7" strokeDasharray="4,4" />
          ))}

          {/* Main light curve line */}
          <path d={solidPath} fill="none" stroke="#1a1a1a" strokeWidth="0.9" strokeLinejoin="round" />

          {/* Periodic dip circles */}
          {periodicGroups.map((grp, gi) =>
            grp.dips.map((dip, di) => (
              <g key={`dip-${gi}-${di}`}>
                <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="14"
                  fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="2" />
                <circle cx={sx(dip.time)} cy={sy(dip.flux)} r="2.5"
                  fill={COLORS[gi % COLORS.length]} />
                {di === 0 && (
                  <text x={sx(dip.time)} y={sy(dip.flux)-20}
                    textAnchor="middle" fontSize="10" fontWeight="bold"
                    fill={COLORS[gi % COLORS.length]}>
                    P≈{grp.period.toFixed(2)}d
                  </text>
                )}
              </g>
            ))
          )}

          {/* Backend transit lines — clipped so they don't poke out */}
          {backendTransits.map((bt, i) => (
            <line key={`bt-${i}`} x1={sx(bt.time)} y1={margin.top}
              x2={sx(bt.time)} y2={margin.top+innerH}
              stroke={COLORS[(bt.planetIdx + periodicGroups.length) % COLORS.length]}
              strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
          ))}
        </g>

        {/* ── Axes (drawn OUTSIDE clip so borders are fully visible) ── */}
        <line x1={margin.left} y1={margin.top+innerH}
          x2={margin.left+innerW} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />
        <line x1={margin.left} y1={margin.top}
          x2={margin.left} y2={margin.top+innerH} stroke="#333" strokeWidth="1.5" />

        {/* X ticks */}
        {xTicks.map((t, i) => (
          <g key={`xt${i}`}>
            <line x1={sx(t)} y1={margin.top+innerH} x2={sx(t)} y2={margin.top+innerH+5} stroke="#333" />
            <text x={sx(t)} y={margin.top+innerH+18} textAnchor="middle" fontSize="11" fill="#333">
              {t.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Y ticks */}
        {yTicks.map((f, i) => (
          <g key={`yt${i}`}>
            <line x1={margin.left-5} y1={sy(f)} x2={margin.left} y2={sy(f)} stroke="#333" />
            <text x={margin.left-8} y={sy(f)+4} textAnchor="end" fontSize="11" fill="#333">
              {f.toFixed(4)}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={width/2} y={height-10} textAnchor="middle" fontSize="13" fill="#333">
          Time (BJD)
        </text>
        <text x={16} y={height/2} textAnchor="middle" fontSize="13" fill="#333"
          transform={`rotate(-90 16 ${height/2})`}>
          Normalized Flux
        </text>

        {/* Legend */}
        {showCircles && periodicGroups.length > 0 && (
          <g>
            {periodicGroups.map((grp, gi) => (
              <g key={`leg${gi}`}>
                <circle cx={margin.left + 16 + gi*190} cy={margin.top-18} r="6"
                  fill="none" stroke={COLORS[gi % COLORS.length]} strokeWidth="1.8" />
                <text x={margin.left + 28 + gi*190} y={margin.top-14}
                  fontSize="11" fill={COLORS[gi % COLORS.length]} fontWeight="bold">
                  Candidate {gi+1} — P={grp.period.toFixed(3)} d ({grp.dips.length} transits)
                </text>
              </g>
            ))}
          </g>
        )}

        {showCircles && periodicGroups.length === 0 && (
          <text x={width/2} y={margin.top-16} textAnchor="middle" fontSize="11" fill="#aaa">
            No periodic transit signal detected above threshold
          </text>
        )}
      </svg>
    </div>
  );
}
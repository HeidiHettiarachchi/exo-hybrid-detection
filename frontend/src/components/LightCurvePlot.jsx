// export default function LightCurvePlot({ data }) {
//   // ---------- GUARDS ----------
//   if (!Array.isArray(data) || data.length < 10) {
//     return <p>Not enough data to plot.</p>;
//   }

//   // ---------- DOWNSAMPLING ----------
//   const MAX_POINTS = 10000;
//   const stride = Math.ceil(data.length / MAX_POINTS);
//   const plotData = data.filter((_, i) => i % stride === 0);

//   // ---------- SVG SETUP ----------
//   const width = 1000;
//   const height = 420;
//   const margin = { top: 20, right: 20, bottom: 60, left: 90 };

//   const innerW = width - margin.left - margin.right;
//   const innerH = height - margin.top - margin.bottom;

//   // ---------- DATA ----------
//   const times = plotData.map(d => d.time).filter(Number.isFinite);
//   const fluxes = plotData.map(d => d.flux).filter(Number.isFinite);

//   if (times.length < 10 || fluxes.length < 10) {
//     return <p>Invalid time or flux values.</p>;
//   }

//   const tMin = Math.min(...times);
//   const tMax = Math.max(...times);

//   // Robust flux range (median ± 3%)
//   const sortedFlux = [...fluxes].sort((a, b) => a - b);
//   const fMedian = sortedFlux[Math.floor(sortedFlux.length / 2)];
//   const fMin = fMedian * 0.97;
//   const fMax = fMedian * 1.03;

//   // ---------- SCALES ----------
//   const x = t =>
//     margin.left + ((t - tMin) / (tMax - tMin)) * innerW;

//   const y = f =>
//     margin.top + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

  // ---------- AXIS TICKS ----------
  
  export default function LightCurvePlot({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data to plot.</p>;
  }

  // ---------- DOWNSAMPLING ----------
  const MAX_POINTS = 50000;
  const stride = data.length > 100 ? Math.ceil(data.length / MAX_POINTS) : 1;
  const plotData = data.filter((_, i) => i % stride === 0);

  // ---------- SVG SETUP ----------
  const width = 1000;
  const height = 420;
  const margin = { top: 20, right: 20, bottom: 60, left: 90 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  // ---------- DATA ----------
  const times = plotData.map(d => d.time).filter(Number.isFinite);
  const fluxes = plotData.map(d => d.flux).filter(Number.isFinite);

  if (times.length < 2 || fluxes.length < 2) {
    return <p>Not enough valid time or flux points to plot.</p>;
  }

  const tMin = Math.min(...times);
  const tMax = Math.max(...times);

  // Flux range: small datasets use min/max instead of ±3%
  let fMin, fMax;
  if (data.length < 100) {
    fMin = Math.min(...fluxes) * 0.999; // tiny buffer
    fMax = Math.max(...fluxes) * 1.001;
  } else {
    const sortedFlux = [...fluxes].sort((a, b) => a - b);
    const fMedian = sortedFlux[Math.floor(sortedFlux.length / 2)];
    fMin = fMedian * 0.97;
    fMax = fMedian * 1.03;
  }

  const x = t => margin.left + ((t - tMin) / (tMax - tMin)) * innerW;
  const y = f => margin.top + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

  const xTicks = 6;
  const yTicks = 6;

  const xTickVals = Array.from({ length: xTicks }, (_, i) =>
    tMin + (i / (xTicks - 1)) * (tMax - tMin)
  );

  const yTickVals = Array.from({ length: yTicks }, (_, i) =>
    fMin + (i / (yTicks - 1)) * (fMax - fMin)
  );

  return (
    <svg
      width={width}
      height={height}
      style={{ background: "#fff", border: "1px solid #ccc" }}
    >
      {/* ---------- AXES ---------- */}
      <line
        x1={margin.left}
        y1={margin.top + innerH}
        x2={margin.left + innerW}
        y2={margin.top + innerH}
        stroke="black"
      />
      <line
        x1={margin.left}
        y1={margin.top}
        x2={margin.left}
        y2={margin.top + innerH}
        stroke="black"
      />

      {/* ---------- X AXIS TICKS ---------- */}
      {xTickVals.map((t, i) => (
        <g key={i}>
          <line
            x1={x(t)}
            y1={margin.top + innerH}
            x2={x(t)}
            y2={margin.top + innerH + 6}
            stroke="black"
          />
          <text
            x={x(t)}
            y={margin.top + innerH + 20}
            textAnchor="middle"
            fontSize="11"
          >
            {t.toFixed(2)}
          </text>
        </g>
      ))}

      {/* ---------- Y AXIS TICKS ---------- */}
      {yTickVals.map((f, i) => (
        <g key={i}>
          <line
            x1={margin.left - 6}
            y1={y(f)}
            x2={margin.left}
            y2={y(f)}
            stroke="black"
          />
          <text
            x={margin.left - 10}
            y={y(f) + 4}
            textAnchor="end"
            fontSize="11"
          >
            {f.toExponential(2)}
          </text>
        </g>
      ))}

      {/* ---------- POINTS ---------- */}
      {plotData.map((d, i) =>
        Number.isFinite(d.time) && Number.isFinite(d.flux) ? (
          <circle
            key={i}
            cx={x(d.time)}
            cy={y(d.flux)}
            r="0.6"
            fill="black"
          />
        ) : null
      )}

      {/* ---------- LABELS ---------- */}
      <text
        x={width / 2}
        y={height - 15}
        textAnchor="middle"
        fontSize="13"
      >
        Time (BJD)
      </text>

      <text
        x={20}
        y={height / 2}
        textAnchor="middle"
        fontSize="13"
        transform={`rotate(-90 20 ${height / 2})`}
      >
        PDCSAP Flux (e⁻/s)
      </text>
    </svg>
  );
}

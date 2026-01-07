export default function PhaseFoldPlot({ data, period, t0 }) {
  if (!Array.isArray(data) || data.length < 10 || !period || !t0) {
  return <p>Cannot phase-fold light curve.</p>;
}

  const folded = data.map(d => ({
    phase: ((d.time - t0) % period) / period,
    flux: d.flux
  }));

  const width = 900;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 70 };

  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const fluxes = folded.map(d => d.flux);
  const median = fluxes.sort((a, b) => a - b)[Math.floor(fluxes.length / 2)];
  const fMin = median * 0.98;
  const fMax = median * 1.02;

  const x = p => margin.left + p * innerW;
  const y = f => margin.top + innerH - ((f - fMin) / (fMax - fMin)) * innerH;

  return (
    <svg width={width} height={height} style={{ background: "#fff", border: "1px solid #ccc" }}>
      <line x1={margin.left} y1={margin.top + innerH} x2={margin.left + innerW} y2={margin.top + innerH} stroke="black" />
      <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + innerH} stroke="black" />

      {folded.map((d, i) => (
        <circle key={i} cx={x(d.phase)} cy={y(d.flux)} r="0.6" fill="black" />
      ))}

      <text x={width / 2} y={height - 5} textAnchor="middle">PHASE</text>
      <text x={15} y={height / 2} textAnchor="middle" transform={`rotate(-90 15 ${height / 2})`}>
        Flux
      </text>
    </svg>
  );
}

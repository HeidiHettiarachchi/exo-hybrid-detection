import { useState } from "react";
import Upload from "./components/Upload";      // light curve uploader
import Results from "./components/Results";
import UploadCSV from "./components/UploadCSV"; // ML uploader

export default function TransitView() {
  const [results, setResults] = useState(null);       // BLS/light curve results
  const [lightCurve, setLightCurve] = useState(null); // raw light curve
  const [modelResults, setModelResults] = useState(null); // ML predictions
  const [modelStats, setModelStats] = useState(null);     // training stats

  // Determine total exoplanets
  const numExoplanets = results?.num_planets ?? 0;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: "30px" }}>Transit & ML Exoplanet Detection</h1>
      <br/>
      <p style={{ fontSize: "15px" }}>Upload a TESS light curve to detect exoplanet transits and/or a CSV for ML predictions.</p>

     <br/>


      <h2 style={{ fontSize: "20px" }}>Transit Detection (BLS)</h2>
      <br/>
      <Upload setResults={setResults} setLightCurve={setLightCurve} />

      {results && (
        <div style={{ marginTop: 20 }}>
          <p><b>Exoplanets detected:</b> {numExoplanets}</p>
        </div>
      )}

     
       <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontSize: "20px" }}>Generate ML Model from CSV</h2>
      <br/>
      <UploadCSV setModelResults={setModelResults} />

      <hr style={{ margin: "20px 0" }} />

      <Results
        results={results}
        lightCurve={lightCurve}
        modelResults={modelResults}
      />
    </div>
  );
}
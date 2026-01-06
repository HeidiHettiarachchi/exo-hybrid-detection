import { useState } from "react";
import Upload from "./components/Upload";
import Results from "./components/Results";

export default function App() {
  const [results, setResults] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Exoplanet Detection Framework</h1>
      <Upload setResults={setResults} />
      <Results results={results} />
    </div>
  );
}

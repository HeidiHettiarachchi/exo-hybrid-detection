import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeView from "./HomeView";
import TransitView from "./TransitView";
import "./App.css";
import logo from "../assets/logo.png";


export default function App() {
  const [results, setResults] = useState(null);

  return (
    <Router>

      <div className="space-background">
        <div className="stars"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>


      <div className="app-background" style={{ padding: 20 }} >
           <div className="logo-container">
          <img src={logo} alt="Exoplanet Logo" className="app-logo" />
           <h1 className="mheading">Exoplanet Detection Framework</h1> </div> 

        {/* ---- Navigation Links ---- */}
        <nav style={{ marginBottom: 20 }}>
            <ul className="nav-list">
    <li>
          <Link to="/" className="nav-link" style={{ marginRight: 10 }} title="Image">Image</Link>
          </li>
    <li>
          <Link to="/transit" className="nav-link" title="Transit">Transit</Link>
        </li>
  </ul>
</nav>
        {/* ---- Routes ---- */}
        <Routes>
          <Route path="/" element={<HomeView results={results} setResults={setResults} />} />
          <Route path="/transit" element={<TransitView results={results} />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

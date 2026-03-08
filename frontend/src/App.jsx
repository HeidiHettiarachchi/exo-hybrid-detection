// // // import { useState } from "react";
// // // import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// // // import HomeView from "./HomeView";
// // // import TransitView from "./TransitView";
// // // import "./App.css";
// // // import logo from "../assets/logo.png";


// // // export default function App() {
// // //   const [results, setResults] = useState(null);

// // //   return (
// // //     <Router>

// // //       <div className="space-background">
// // //         <div className="stars"></div>
// // //         <div className="shooting-star"></div>
// // //         <div className="shooting-star"></div>
// // //         <div className="shooting-star"></div>
// // //         <div className="shooting-star"></div>
// // //         <div className="shooting-star"></div>


// // //       <div className="app-background" style={{ padding: 20 }} >
// // //            <div className="logo-container">
// // //           <img src={logo} alt="Exoplanet Logo" className="app-logo" />
// // //            <h1 className="mheading">Exoplanet Detection Framework</h1> </div> 

// // //         {/* ---- Navigation Links ---- */}
// // //         <nav style={{ marginBottom: 20 }}>
// // //             <ul className="nav-list">
// // //     <li>
// // //           <Link to="/" className="nav-link" style={{ marginRight: 10 }} title="Image">Image</Link>
// // //           </li>
// // //     <li>
// // //           <Link to="/transit" className="nav-link" title="Transit">Transit</Link>
// // //         </li>
// // //   </ul>
// // // </nav>
// // //         {/* ---- Routes ---- */}
// // //         <Routes>
// // //           <Route path="/" element={<HomeView results={results} setResults={setResults} />} />
// // //           <Route path="/transit" element={<TransitView results={results} />} />
// // //         </Routes>
// // //       </div>
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // import { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// // import HomeView from "./HomeView";
// // import TransitView from "./TransitView";
// // import HybridView from "./HybridView";
// // import "./App.css";
// // import logo from "../assets/logo.png";

// // export default function App() {
// //   const [results, setResults] = useState(null);

// //   return (
// //     <Router>
// //       <div className="space-bg">
// //         <div className="stars" />
// //         <div className="shooting-star" />
// //         <div className="shooting-star" />
// //         <div className="shooting-star" />
// //         <div className="shooting-star" />

// //         {/* ── Header ── */}
// //         <header className="site-header">
// //           <div className="header-inner">
// //             <div className="logo-group">
// //               <img src={logo} alt="ExoSynergy Logo" className="app-logo" />
// //               <div>
// //                 <div className="logo-title">EXO<span className="accent">SYNERGY</span></div>
// //                 <div className="logo-sub">AI HYBRID EXOPLANET DETECTION FRAMEWORK</div>
// //               </div>
// //             </div>

// //             <nav className="main-nav">
// //               <NavLink to="/" end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
// //                 <span className="nav-icon">◎</span> Direct Imaging
// //               </NavLink>
// //               <NavLink to="/transit" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
// //                 <span className="nav-icon">⌇</span> Transit
// //               </NavLink>
// //               <NavLink to="/hybrid" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
// //                 style={({ isActive }) => isActive ? { color: "#4ade80", background: "rgba(74,222,128,0.12)", borderColor: "rgba(74,222,128,0.35)" } : {}}>
// //                 <span className="nav-icon">⊕</span> Hybrid
// //               </NavLink>
// //             </nav>
// //           </div>
// //         </header>

// //         {/* ── Content ── */}
// //         <main className="site-main">
// //           <Routes>
// //             <Route path="/" element={<HomeView results={results} setResults={setResults} />} />
// //             <Route path="/transit" element={<TransitView />} />
// //             <Route path="/hybrid" element={<HybridView />} />
// //           </Routes>
// //         </main>
// //       </div>
// //     </Router>
// //   );
// // }

// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// import HomeView from "./HomeView";
// import TransitView from "./TransitView";
// import HybridView from "./HybridView";
// import "./App.css";
// import logo from "../assets/logo.png";

// export default function App() {
//   const [results, setResults] = useState(null);

//   return (
//     <Router>
//       <div className="space-bg">
//         <div className="stars" />
//         <div className="shooting-star" />
//         <div className="shooting-star" />
//         <div className="shooting-star" />
//         <div className="shooting-star" />

//         {/* ── Header ── */}
//         <header className="site-header">
//           <div className="header-inner">
//             <div className="logo-group">
//               <img src={logo} alt="ExoSynergy Logo" className="app-logo" />
//               <div>
//                 <div className="logo-title">EXO<span className="accent">SYNERGY</span></div>
//                 <div className="logo-sub">AI HYBRID EXOPLANET DETECTION FRAMEWORK</div>
//               </div>
//             </div>

//             <nav className="main-nav">
//               <NavLink to="/" end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
//                 <span className="nav-icon">◎</span> Direct Imaging
//               </NavLink>
//               <NavLink to="/transit" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
//                 <span className="nav-icon">⌇</span> Transit
//               </NavLink>
//               <NavLink to="/hybrid" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
//                 style={({ isActive }) => isActive ? { color: "#4ade80", background: "rgba(74,222,128,0.12)", borderColor: "rgba(74,222,128,0.35)" } : {}}>
//                 <span className="nav-icon">⊕</span> Hybrid
//               </NavLink>
//             </nav>
//           </div>
//         </header>

//         {/* ── Content ── */}
//         <main className="site-main">
//           <Routes>
//             <Route path="/" element={<HomeView results={results} setResults={setResults} />} />
//             <Route path="/transit" element={<TransitView />} />
//             <Route path="/hybrid" element={<HybridView />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// // import { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// // import HomeView from "./HomeView";
// // import TransitView from "./TransitView";
// // import "./App.css";
// // import logo from "../assets/logo.png";


// // export default function App() {
// //   const [results, setResults] = useState(null);

// //   return (
// //     <Router>

// //       <div className="space-background">
// //         <div className="stars"></div>
// //         <div className="shooting-star"></div>
// //         <div className="shooting-star"></div>
// //         <div className="shooting-star"></div>
// //         <div className="shooting-star"></div>
// //         <div className="shooting-star"></div>


// //       <div className="app-background" style={{ padding: 20 }} >
// //            <div className="logo-container">
// //           <img src={logo} alt="Exoplanet Logo" className="app-logo" />
// //            <h1 className="mheading">Exoplanet Detection Framework</h1> </div> 

// //         {/* ---- Navigation Links ---- */}
// //         <nav style={{ marginBottom: 20 }}>
// //             <ul className="nav-list">
// //     <li>
// //           <Link to="/" className="nav-link" style={{ marginRight: 10 }} title="Image">Image</Link>
// //           </li>
// //     <li>
// //           <Link to="/transit" className="nav-link" title="Transit">Transit</Link>
// //         </li>
// //   </ul>
// // </nav>
// //         {/* ---- Routes ---- */}
// //         <Routes>
// //           <Route path="/" element={<HomeView results={results} setResults={setResults} />} />
// //           <Route path="/transit" element={<TransitView results={results} />} />
// //         </Routes>
// //       </div>
// //       </div>
// //     </Router>
// //   );
// // }

// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// import HomeView from "./HomeView";
// import TransitView from "./TransitView";
// import HybridView from "./HybridView";
// import "./App.css";
// import logo from "../assets/logo.png";

// export default function App() {
//   const [results, setResults] = useState(null);

//   return (
//     <Router>
//       <div className="space-bg">
//         <div className="stars" />
//         <div className="shooting-star" />
//         <div className="shooting-star" />
//         <div className="shooting-star" />
//         <div className="shooting-star" />

//         {/* ── Header ── */}
//         <header className="site-header">
//           <div className="header-inner">
//             <div className="logo-group">
//               <img src={logo} alt="ExoSynergy Logo" className="app-logo" />
//               <div>
//                 <div className="logo-title">EXO<span className="accent">SYNERGY</span></div>
//                 <div className="logo-sub">AI HYBRID EXOPLANET DETECTION FRAMEWORK</div>
//               </div>
//             </div>

//             <nav className="main-nav">
//               <NavLink to="/" end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
//                 <span className="nav-icon">◎</span> Direct Imaging
//               </NavLink>
//               <NavLink to="/transit" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
//                 <span className="nav-icon">⌇</span> Transit
//               </NavLink>
//               <NavLink to="/hybrid" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
//                 style={({ isActive }) => isActive ? { color: "#4ade80", background: "rgba(74,222,128,0.12)", borderColor: "rgba(74,222,128,0.35)" } : {}}>
//                 <span className="nav-icon">⊕</span> Hybrid
//               </NavLink>
//             </nav>
//           </div>
//         </header>

//         {/* ── Content ── */}
//         <main className="site-main">
//           <Routes>
//             <Route path="/" element={<HomeView results={results} setResults={setResults} />} />
//             <Route path="/transit" element={<TransitView />} />
//             <Route path="/hybrid" element={<HybridView />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomeView from "./HomeView";
import TransitView from "./TransitView";
import HybridView from "./HybridView";
import "./App.css";
import logo from "../assets/logo.png";

export default function App() {
  const [results, setResults] = useState(null);

  return (
    <Router>
      <div className="space-bg">
        <div className="stars" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />

        {/* ── Header ── */}
        <header className="site-header">
          <div className="header-inner">
            <div className="logo-group">
              <a href="https://exosynergy.onrender.com/" target="_blank" rel="noopener noreferrer" title="ExoSynergy on Render" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                <img src={logo} alt="ExoSynergy Logo" className="app-logo" style={{ height: 32, width: "auto", objectFit: "contain" }} />
              </a>
              <div>
                <div className="logo-title">EXO<span className="accent">SYNERGY</span></div>
                <div className="logo-sub">AI HYBRID EXOPLANET DETECTION FRAMEWORK</div>
              </div>
            </div>

            <nav className="main-nav">
              <NavLink to="/" end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
                <span className="nav-icon">◎</span> Direct Imaging
              </NavLink>
              <NavLink to="/transit" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
                <span className="nav-icon">⌇</span> Transit
              </NavLink>
              <NavLink to="/hybrid" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
                style={({ isActive }) => isActive ? { color: "#4ade80", background: "rgba(74,222,128,0.12)", borderColor: "rgba(74,222,128,0.35)" } : {}}>
                <span className="nav-icon">⊕</span> Hybrid
              </NavLink>
            </nav>
          </div>
        </header>

        {/* ── Content ── */}
        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomeView results={results} setResults={setResults} />} />
            <Route path="/transit" element={<TransitView />} />
            <Route path="/hybrid" element={<HybridView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
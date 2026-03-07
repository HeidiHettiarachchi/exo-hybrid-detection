// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";

// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     port: 3000 
// //   }
// // });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       "/api": {
//         target: "https://exo-hybrid-detection.onrender.com",
//         changeOrigin: true,
//       },
//     },
//   },
//   define: {
//     __API_BASE__: JSON.stringify(
//       process.env.NODE_ENV === "production"
//         ? "https://exo-hybrid-detection.onrender.com"
//         : "http://localhost:8000"
//     ),
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ["exoplanet-hybrid-detection-frontend.onrender.com"],
    proxy: {
      "/api": {
        target: "https://exo-hybrid-detection.onrender.com",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: ["exoplanet-hybrid-detection-frontend.onrender.com"],
  },
  define: {
    __API_BASE__: JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "https://exo-hybrid-detection.onrender.com"
        : "http://localhost:8000"
    ),
  },
});
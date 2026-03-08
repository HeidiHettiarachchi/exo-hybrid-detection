import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ["exoplanet-detection-sp06.onrender.com"],
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
    allowedHosts: ["exoplanet-detection-sp06.onrender.com"],
  },
  ddefine: {
  __API_BASE__: JSON.stringify("https://exo-hybrid-detection.onrender.com"),
},
});
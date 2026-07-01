import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to local FastAPI backend during development
    // so you don't need CORS headers locally
    proxy: {
      "/chat":        "http://localhost:7860",
      "/transcribe":  "http://localhost:7860",
      "/health":      "http://localhost:7860",
    },
  },
  build: {
    outDir: "dist",
  },
});

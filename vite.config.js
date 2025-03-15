// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://stem-api.istad.co", // The external API
        changeOrigin: true, // Changes the origin of the request to match the target
        secure: false, // Ignores SSL verification (useful for dev)
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Keeps "/api" in the URL
      },
    },
  },
});
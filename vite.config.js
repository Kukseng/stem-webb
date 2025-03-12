// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stem-api.istad.co',
        changeOrigin: true, // Ensures the Host header matches the target
        // Remove rewrite to keep /api/ in the path
      },
    },
  },
});
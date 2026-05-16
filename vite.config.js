// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // Vite + React + Tailwind v4 config; Tailwind plugin injects new compiler.
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   // Allow setting a base path for GitHub Pages or CDN deploys via env: VITE_BASE_PATH=/your-subdir/
//   base: process.env.VITE_BASE_PATH || '/',
//   server: {
//     port: 5173,
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite + React + Tailwind v4 config; Tailwind plugin injects new compiler.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Allow setting a base path for GitHub Pages or CDN deploys via env: VITE_BASE_PATH=/your-subdir/
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    port: 5173,
  },
})
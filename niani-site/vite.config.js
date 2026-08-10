import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from two places with different roots:
//   nianidesigns.com          -> '/'        (default, primary)
//   GitHub Pages /niani/      -> '/niani/'  (set via VITE_BASE in the workflow)
// BrowserRouter derives its basename from import.meta.env.BASE_URL, so routing
// follows this value automatically.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
